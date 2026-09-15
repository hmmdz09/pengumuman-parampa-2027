/**
 * APLIKASI WEB PENGUMUMAN OPREC PARAMPA 2026-2027
 * Logika pencarian, validasi, modal boarding pass, canvas image generator, dan audio maritim.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProdiDropdown();
  initSearchForm();
  initAutocomplete();
  initDirectoryTabs();
  initAudioSystem();
  initAmbientParticles();
  initFAQAccordion();
  initEntranceScreen();
  initYouTubeAudio();
});

/* ==========================================================
   1. INISIALISASI DROPDOWN PRODI
   ========================================================== */
function initProdiDropdown() {
  const prodiSelect = document.getElementById('searchProdi');
  if (!prodiSelect) return;

  // Urutkan alfabetis prodi
  PRODI_LIST.sort().forEach(prodi => {
    const opt = document.createElement('option');
    opt.value = prodi;
    opt.textContent = prodi;
    prodiSelect.appendChild(opt);
  });
}

/* ==========================================================
   2. PENCARIAN DAN AUTOCOMPLETE
   ========================================================== */
let activeCandidate = null;

function normalizeString(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findStaff(nameQuery, nimQuery, prodiQuery) {
  const cleanName = (nameQuery || '').trim().toLowerCase();
  const cleanNim = (nimQuery || '').trim();
  const cleanProdi = (prodiQuery || '').trim();

  // 1. Cari exact NIM terlebih dahulu (identitas paling akurat)
  if (cleanNim) {
    const byNim = STAFF_MEMBERS.find(m => m.nim === cleanNim);
    if (byNim) return byNim;
  }

  // 2. Cari kombinasi Nama & NIM / Prodi
  if (cleanName) {
    const byName = STAFF_MEMBERS.find(m => {
      const staffName = m.name.toLowerCase();
      const matchName = staffName.includes(cleanName) || cleanName.includes(staffName);
      const matchProdi = !cleanProdi || m.prodi.toLowerCase() === cleanProdi.toLowerCase();
      return matchName && matchProdi;
    });
    if (byName) return byName;
  }

  // 3. Fuzzy search nama jika ada sedikit typo
  if (cleanName.length >= 4) {
    const normalizedQuery = normalizeString(cleanName);
    const byNormalized = STAFF_MEMBERS.find(m => {
      const normStaffName = normalizeString(m.name);
      return normStaffName.includes(normalizedQuery) || normalizedQuery.includes(normStaffName);
    });
    if (byNormalized) return byNormalized;
  }

  return null;
}

function initAutocomplete() {
  const nameInput = document.getElementById('searchName');
  const autocompleteList = document.getElementById('autocompleteList');
  const nimInput = document.getElementById('searchNim');
  const prodiSelect = document.getElementById('searchProdi');

  if (!nameInput || !autocompleteList) return;

  nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';
    
    if (val.length < 2) {
      autocompleteList.style.display = 'none';
      return;
    }

    const matches = STAFF_MEMBERS.filter(m => m.name.toLowerCase().includes(val)).slice(0, 6);

    if (matches.length === 0) {
      autocompleteList.style.display = 'none';
      return;
    }

    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'autocomplete-item';
      div.innerHTML = `
        <span><strong>${highlightMatch(item.name, val)}</strong> (${item.prodi})</span>
        <span class="item-nim">${item.nim}</span>
      `;
      div.addEventListener('click', () => {
        nameInput.value = item.name;
        if (nimInput) nimInput.value = item.nim;
        if (prodiSelect) prodiSelect.value = item.prodi;
        autocompleteList.style.display = 'none';
        // Putar suara klik pelaut
        playSfx('click');
      });
      autocompleteList.appendChild(div);
    });

    autocompleteList.style.display = 'block';
  });

  // Sembunyikan ketika klik di luar
  document.addEventListener('click', (e) => {
    if (!nameInput.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.style.display = 'none';
    }
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span style="color: #fed766; text-decoration: underline;">$1</span>');
}

function initSearchForm() {
  const form = document.getElementById('parampaSearchForm');
  const resetBtn = document.getElementById('btnResetSearch');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('searchName').value;
    const nimVal = document.getElementById('searchNim').value;
    const prodiVal = document.getElementById('searchProdi').value;

    if (!nameVal.trim() && !nimVal.trim()) {
      alert("Silakan masukkan Nama Lengkap atau NIM Anda untuk mengecek hasil pengumuman.");
      document.getElementById('searchName').focus();
      return;
    }

    // Eksekusi pencarian
    const result = findStaff(nameVal, nimVal, prodiVal);
    displayAnnouncementResult(result, { nameVal, nimVal, prodiVal });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      playSfx('click');
    });
  }
}

/* ==========================================================
   3. MODAL HASIL PENGUMUMAN (BOARDING PASS)
   ========================================================== */
function displayAnnouncementResult(staff, queryData) {
  const modal = document.getElementById('resultModal');
  const modalContent = document.getElementById('modalContent');
  if (!modal || !modalContent) return;

  activeCandidate = staff;

  if (staff) {
    // KANDIDAT DITERIMA!
    const divInfo = DIVISIONS[staff.division] || {
      name: staff.division,
      badge: "⚓ Sailor Crew",
      description: "Bagian dari awak kru petualangan armada PARAMPA 2026-2027.",
      coordinator: { name: "Koordinator Divisi", phone: "6281234567890" }
    };

    // Buat pesan WhatsApp otomatis
    const waGreeting = encodeURIComponent(
      `Halo Kak ${divInfo.coordinator.name}, perkenalkan saya ${staff.name} (NIM: ${staff.nim}) dari Program Studi ${staff.prodi}.\n\nBerdasarkan pengumuman resmi, saya dinyatakan LOLOS seleksi staf divisi ${divInfo.name} di PARAMPA 2026-2027. Mohon izin bergabung dan arahan untuk langkah selanjutnya. Terima kasih! 🏴‍☠️⚓`
    );
    const waCoordinatorUrl = `https://wa.me/${divInfo.coordinator.phone}?text=${waGreeting}`;

    modalContent.innerHTML = `
      <div class="boarding-pass-card">
        <button class="modal-close-btn" onclick="closeResultModal()" title="Tutup">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="pass-header">
          <div class="pass-seal">
            <i class="fa-solid fa-anchor"></i>
          </div>
          <span class="pass-badge">SURAT KEPUTUSAN RESMI • PARAMPA 2026-2027</span>
          <h2 class="pass-title">PIRATE FLEET BOARDING PASS</h2>
          <p class="pass-subtitle">FPMIPA Universitas Pendidikan Indonesia</p>
        </div>

        <div class="status-banner">
          <div>
            <div class="status-text">SELAMAT! ANDA DINYATAKAN LOLOS SELEKSI</div>
            <div style="font-size: 0.85rem; opacity: 0.95;">Resmi diterima sebagai Kru Kapal PARAMPA 2026-2027</div>
          </div>
          <div class="status-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>

        <div class="pass-details-grid">
          <div class="pass-detail-item">
            <span class="detail-label">Nama Lengkap</span>
            <span class="detail-value">${staff.name}</span>
          </div>

          <div class="pass-detail-item">
            <span class="detail-label">Nomor Induk Mahasiswa (NIM)</span>
            <span class="detail-value" style="font-family: monospace; letter-spacing: 1px;">${staff.nim}</span>
          </div>

          <div class="pass-detail-item">
            <span class="detail-label">Program Studi</span>
            <span class="detail-value">${staff.prodi}</span>
          </div>

          <div class="pass-detail-item">
            <span class="detail-label">Fakultas</span>
            <span class="detail-value">FPMIPA UPI</span>
          </div>

          <div class="pass-detail-item full-width">
            <span class="detail-label">Divisi Penempatan Terpilih</span>
            <div>
              <span class="detail-division-badge">
                <i class="fa-solid ${divInfo.icon || 'fa-flag'}"></i>
                ${divInfo.name}
              </span>
              <span style="font-size: 0.85rem; color: #785a44; margin-left: 10px; font-weight: 600;">
                ${divInfo.badge}
              </span>
            </div>
          </div>
        </div>

        <div class="division-description-box">
          <div style="font-weight: 700; margin-bottom: 4px; color: #1a0f0a;">
            <i class="fa-solid fa-compass" style="color: #b45309;"></i> Amanah & Peran Divisi:
          </div>
          ${divInfo.description}
        </div>

        <div class="pass-actions">
          <div class="action-row">
            <a href="${waCoordinatorUrl}" target="_blank" class="btn-pass btn-whatsapp" onclick="playSfx('click')">
              <i class="fa-brands fa-whatsapp"></i> Hubungi Koordinator Divisi
            </a>
            <a href="${PARAMPA_CONFIG.waGroupGeneral}" target="_blank" class="btn-pass btn-group-wa" onclick="playSfx('click')">
              <i class="fa-solid fa-users"></i> Gabung Grup Kru Kapal
            </a>
          </div>

          <button class="btn-pass btn-download-pass" onclick="generateAndDownloadCard()" title="Download kartu untuk story media sosial">
            <i class="fa-solid fa-download"></i> Unduh Boarding Pass (Kartu Story IG/WA)
          </button>
        </div>
      </div>
    `;

    // Efek Selebrasi
    triggerConfetti();
    playSfx('fanfare');

  } else {
    // KANDIDAT TIDAK DITEMUKAN
    modalContent.innerHTML = `
      <div class="boarding-pass-card">
        <button class="modal-close-btn" onclick="closeResultModal()" title="Tutup">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="pass-header">
          <div class="pass-seal" style="background: radial-gradient(circle, #e11d48 0%, #881337 100%);">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <span class="pass-badge" style="background: #9f1239; color: #fff;">HASIL PENCARIAN DATA</span>
          <h2 class="pass-title">DATA TIDAK DITEMUKAN</h2>
          <p class="pass-subtitle">PARAMPA 2026-2027 • FPMIPA UPI</p>
        </div>

        <div class="status-banner not-found">
          <div>
            <div class="status-text">MOHON PERIKSA KEMBALI DATA ANDA</div>
            <div style="font-size: 0.85rem; opacity: 0.95;">Nama atau NIM yang Anda masukkan belum terdaftar dalam berkas lolos</div>
          </div>
          <div class="status-icon">
            <i class="fa-solid fa-circle-exclamation"></i>
          </div>
        </div>

        <div class="not-found-content">
          <div class="not-found-title">Pencarian untuk "${queryData.nameVal || queryData.nimVal}"</div>
          <p class="not-found-text">
            Jangan berkecil hati pelaut muda! Kemungkinan terjadi kesalahan ketik pada ejaan nama atau digit NIM. Silakan periksa kembali daftar nama pada tabel direktori kru di bawah ini, atau hubungi pusat bantuan panitia.
          </p>

          <div class="pass-actions">
            <div class="action-row">
              <button class="btn-pass btn-download-pass" onclick="closeResultModal(); document.getElementById('searchName').focus();">
                <i class="fa-solid fa-rotate-left"></i> Coba Cari Lagi
              </button>
              <a href="https://wa.me/${PARAMPA_CONFIG.helpdesk.phone}?text=Halo%20Helpdesk%20PARAMPA,%20saya%20ingin%20mengonfirmasi%20data%20hasil%20seleksi%20atas%20nama%20${encodeURIComponent(queryData.nameVal || '')}%20(NIM:%20${encodeURIComponent(queryData.nimVal || '')})" target="_blank" class="btn-pass btn-whatsapp">
                <i class="fa-brands fa-whatsapp"></i> Hubungi Helpdesk
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    playSfx('notfound');
  }

  modal.classList.add('show');
}

function closeResultModal() {
  const modal = document.getElementById('resultModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Tutup saat tekan tombol ESC atau klik backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeResultModal();
});

const resultModal = document.getElementById('resultModal');
if (resultModal) {
  resultModal.addEventListener('click', (e) => {
    if (e.target === resultModal) closeResultModal();
  });
}

/* ==========================================================
   4. DIREKTORI SELURUH KRU (TABS & LIVE FILTER)
   ========================================================== */
let currentDivisionFilter = 'ALL';

function initDirectoryTabs() {
  const tabsContainer = document.getElementById('divisionTabs');
  const staffGrid = document.getElementById('staffGrid');
  const dirSearch = document.getElementById('dirSearchInput');
  const divInfoCard = document.getElementById('divisionInfoCard');

  if (!tabsContainer || !staffGrid) return;

  // Render Tabs
  tabsContainer.innerHTML = '';

  // Tab Semua
  const allBtn = document.createElement('button');
  allBtn.className = 'tab-btn active';
  allBtn.innerHTML = `
    <i class="fa-solid fa-users"></i> Semua Kru
    <span class="tab-count">${STAFF_MEMBERS.length}</span>
  `;
  allBtn.addEventListener('click', () => switchDivisionTab('ALL', allBtn));
  tabsContainer.appendChild(allBtn);

  // Tabs per divisi
  Object.keys(DIVISIONS).forEach(divKey => {
    const div = DIVISIONS[divKey];
    const count = STAFF_MEMBERS.filter(m => m.division === divKey).length;
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.innerHTML = `
      <i class="fa-solid ${div.icon || 'fa-flag'}"></i> ${div.name}
      <span class="tab-count">${count}</span>
    `;
    btn.addEventListener('click', () => switchDivisionTab(divKey, btn));
    tabsContainer.appendChild(btn);
  });

  // Render awal semua staf
  renderStaffList();

  // Live filter pencarian dalam direktori
  if (dirSearch) {
    dirSearch.addEventListener('input', () => {
      renderStaffList();
    });
  }
}

function switchDivisionTab(divKey, activeBtn) {
  currentDivisionFilter = divKey;

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (activeBtn) activeBtn.classList.add('active');

  playSfx('click');
  updateDivisionInfoCard();
  renderStaffList();
}

function updateDivisionInfoCard() {
  const divInfoCard = document.getElementById('divisionInfoCard');
  if (!divInfoCard) return;

  if (currentDivisionFilter === 'ALL') {
    divInfoCard.innerHTML = `
      <div class="div-info-left">
        <h3><i class="fa-solid fa-ship text-gold"></i> Seluruh Kru Armada PARAMPA 2026-2027</h3>
        <p>Total ${STAFF_MEMBERS.length} mahasiswa hebat FPMIPA UPI yang siap berlayar dan menyukseskan petualangan akbar PARAMPA.</p>
      </div>
      <div class="div-contact-badge">
        <a href="https://wa.me/${PARAMPA_CONFIG.helpdesk.phone}" target="_blank">
          <i class="fa-brands fa-whatsapp"></i> Hubungi Helpdesk Utama
        </a>
      </div>
    `;
  } else {
    const div = DIVISIONS[currentDivisionFilter];
    if (!div) return;

    divInfoCard.innerHTML = `
      <div class="div-info-left">
        <h3><i class="fa-solid ${div.icon || 'fa-flag'} text-gold"></i> Divisi ${div.name}</h3>
        <p>${div.description}</p>
      </div>
      <div class="div-contact-badge">
        <a href="https://wa.me/${div.coordinator.phone}?text=Halo%20Kak%20${encodeURIComponent(div.coordinator.name)},%20saya%20staf%20divisi%20${encodeURIComponent(div.name)}%20PARAMPA%202026-2027" target="_blank">
          <i class="fa-brands fa-whatsapp"></i> CP Divisi: ${div.coordinator.name}
        </a>
      </div>
    `;
  }
}

function renderStaffList() {
  const staffGrid = document.getElementById('staffGrid');
  const dirSearch = document.getElementById('dirSearchInput');
  const countDisplay = document.getElementById('dirShowingCount');
  if (!staffGrid) return;

  const searchQuery = (dirSearch ? dirSearch.value : '').toLowerCase().trim();

  let filtered = STAFF_MEMBERS;

  if (currentDivisionFilter !== 'ALL') {
    filtered = filtered.filter(m => m.division === currentDivisionFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(searchQuery) ||
      m.nim.includes(searchQuery) ||
      m.prodi.toLowerCase().includes(searchQuery)
    );
  }

  if (countDisplay) {
    countDisplay.textContent = `Menampilkan ${filtered.length} dari ${STAFF_MEMBERS.length} staf`;
  }

  if (filtered.length === 0) {
    staffGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-ghost" style="font-size: 2.5rem; color: var(--gold-500); margin-bottom: 12px; display: block;"></i>
        Tidak ada staf yang sesuai dengan kata kunci "${searchQuery}".
      </div>
    `;
    return;
  }

  staffGrid.innerHTML = filtered.map((staff, index) => {
    const div = DIVISIONS[staff.division] || { color: '#eab308', name: staff.division };
    return `
      <div class="staff-card" onclick="viewStaffCard('${staff.nim}')">
        <div class="staff-number-pill">${index + 1}</div>
        <div class="staff-info">
          <div class="staff-name" title="${staff.name}">${staff.name}</div>
          <div class="staff-meta">
            <span class="nim-badge">${staff.nim}</span>
            <span class="staff-prodi" title="${staff.prodi}">${staff.prodi}</span>
          </div>
          <div style="font-size: 0.72rem; color: ${div.color}; margin-top: 4px; font-weight: 600;">
            <i class="fa-solid fa-tag"></i> ${staff.division}
          </div>
        </div>
        <i class="fa-solid fa-chevron-right" style="color: var(--gold-500); font-size: 0.8rem; opacity: 0.6;"></i>
      </div>
    `;
  }).join('');
}

function viewStaffCard(nim) {
  const staff = STAFF_MEMBERS.find(m => m.nim === nim);
  if (staff) {
    displayAnnouncementResult(staff, { nameVal: staff.name, nimVal: staff.nim, prodiVal: staff.prodi });
  }
}

/* ==========================================================
   5. GENERATOR GAMBAR KARTU STORY (CANVAS HTML5)
   ========================================================== */
function generateAndDownloadCard() {
  if (!activeCandidate) return;

  const staff = activeCandidate;
  const divInfo = DIVISIONS[staff.division] || { name: staff.division };

  playSfx('click');

  // Buat canvas resolusi tinggi (1080 x 1920 Instagram Story format)
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // Background Gradien Samudera & Emas Kuno
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#060e1a');
  bgGrad.addColorStop(0.3, '#0b1e36');
  bgGrad.addColorStop(0.7, '#122b49');
  bgGrad.addColorStop(1, '#050a12');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Border Emas Berornamen
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, 1000, 1840);

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, 960, 1800);

  // Sudut-sudut ornamen
  drawCornerAccents(ctx);

  // Kartu Perkamen Tengah
  const pGrad = ctx.createLinearGradient(120, 420, 960, 1450);
  pGrad.addColorStop(0, '#fcf6e5');
  pGrad.addColorStop(1, '#f3ebd0');
  ctx.fillStyle = pGrad;
  roundRect(ctx, 100, 400, 880, 1180, 40, true, false);

  // Garis Border Perkamen
  ctx.strokeStyle = '#d4a359';
  ctx.lineWidth = 6;
  roundRect(ctx, 100, 400, 880, 1180, 40, false, true);

  // Header Title
  ctx.textAlign = 'center';

  // Badge atas
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("OFFICIAL ANNOUNCEMENT • PIRATE EXPEDITION", 540, 180);

  // Judul Besar
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 82px "Cinzel Decorative", "Plus Jakarta Sans", serif';
  ctx.fillText("PARAMPA", 540, 280);

  ctx.fillStyle = '#fed766';
  ctx.font = 'bold 44px "Cinzel Decorative", serif';
  ctx.fillText("2026 - 2027", 540, 340);

  // Status Pita
  ctx.fillStyle = '#10b981';
  roundRect(ctx, 180, 460, 720, 100, 20, true, false);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("⚓ RESMI DITERIMA SEBAGAI KRU KAPAL ⚓", 540, 525);

  // Nama Staf
  ctx.fillStyle = '#78350f';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("NAMA LENGKAP", 540, 650);

  ctx.fillStyle = '#1e1b18';
  ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
  // Wrap text jika nama sangat panjang
  wrapText(ctx, staff.name.toUpperCase(), 540, 720, 800, 60);

  // Pembatas Garis
  ctx.strokeStyle = '#d4a359';
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(200, 840);
  ctx.lineTo(880, 840);
  ctx.stroke();
  ctx.setLineDash([]);

  // Detail NIM & Prodi
  ctx.fillStyle = '#78350f';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("NOMOR INDUK MAHASISWA", 540, 910);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 44px monospace';
  ctx.fillText(staff.nim, 540, 970);

  ctx.fillStyle = '#78350f';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("PROGRAM STUDI", 540, 1050);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 38px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(staff.prodi + " • FPMIPA UPI", 540, 1110);

  // Kotak Penempatan Divisi
  ctx.fillStyle = '#1c1917';
  roundRect(ctx, 160, 1200, 760, 180, 24, true, false);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 4;
  roundRect(ctx, 160, 1200, 760, 180, 24, false, true);

  ctx.fillStyle = '#fed766';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("DIVISI PENEMPATAN", 540, 1250);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(divInfo.name.toUpperCase(), 540, 1325);

  // Makna / Kutipan
  ctx.fillStyle = '#451a03';
  ctx.font = 'italic 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('"Berlayar bersama menuju puncak kejayaan maritim!"', 540, 1460);

  // Stempel Cap Panitia
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(820, 1480, 65, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#b91c1c';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("VERIFIED", 820, 1475);
  ctx.fillText("PARAMPA 2027", 820, 1495);

  // Footer Instagram Story
  ctx.fillStyle = '#94a3b8';
  ctx.font = '30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("FPMIPA • UNIVERSITAS PENDIDIKAN INDONESIA", 540, 1720);
  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 36px "Cinzel Decorative", serif';
  ctx.fillText("#PARAMPA2027 #WEREBACK #PIRATEEXPEDITION", 540, 1780);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `Boarding_Pass_PARAMPA_${staff.name.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function drawCornerAccents(ctx) {
  const corners = [
    { x: 80, y: 80 },
    { x: 1000, y: 80 },
    { x: 80, y: 1840 },
    { x: 1000, y: 1840 }
  ];
  ctx.fillStyle = '#eab308';
  corners.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 14, 0, Math.PI * 2);
    ctx.fill();
  });
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

/* ==========================================================
   6. SISTEM EFEK SUARA & AUDIO (WEB AUDIO API)
   ========================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioSystem() {
  const toggleBtn = document.getElementById('audioToggleBtn');
  if (!toggleBtn) return;

  // Cek localStorage
  const savedState = localStorage.getItem('parampa_sound_enabled');
  if (savedState !== null) {
    soundEnabled = savedState === 'true';
  }
  updateAudioButtonUI();

  toggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('parampa_sound_enabled', soundEnabled);
    updateAudioButtonUI();
    if (soundEnabled) {
      playSfx('click');
    }
  });
}

function updateAudioButtonUI() {
  const toggleBtn = document.getElementById('audioToggleBtn');
  if (!toggleBtn) return;

  if (soundEnabled) {
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Suara: ON</span>';
    toggleBtn.style.color = 'var(--gold-400)';
    toggleBtn.style.borderColor = 'rgba(234, 179, 8, 0.4)';
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Suara: OFF</span>';
    toggleBtn.style.color = 'var(--text-muted)';
    toggleBtn.style.borderColor = 'rgba(148, 163, 184, 0.3)';
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSfx(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (type === 'click') {
      // Suara ketukan kayu / pelaut halus
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);

    } else if (type === 'fanfare') {
      // Akor kemenangan maritim berurutan
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.55);
      });

    } else if (type === 'notfound') {
      // Suara nada rendah simpatik
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    }
  } catch (err) {
    console.log("Audio SFX notice:", err);
  }
}

/* ==========================================================
   7. SELEBRASI CONFETTI EMAS
   ========================================================== */
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#eab308', '#fed766', '#0284c7', '#38bdf8', '#ffffff']
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d97706', '#f59e0b', '#38bdf8']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d97706', '#f59e0b', '#38bdf8']
      });
    }, 250);
  }
}

/* ==========================================================
   8. AMBIENT PARTICLES (BUBBLES & GOLD SPARKLES)
   ========================================================== */
function initAmbientParticles() {
  const container = document.getElementById('oceanAmbient');
  if (!container) return;

  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';
    const size = Math.random() * 8 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(particle);
  }
}

/* ==========================================================
   9. ACCORDION FAQ
   ========================================================== */
function initFAQAccordion() {
  const faqContainer = document.getElementById('faqList');
  if (!faqContainer) return;

  faqContainer.innerHTML = FAQS.map(faq => `
    <div class="faq-card">
      <div class="faq-question">
        <i class="fa-solid fa-compass"></i>
        <span>${faq.q}</span>
      </div>
      <div class="faq-answer">
        ${faq.a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================
   10. MODERN ENTRANCE SCREEN & NATIVE AUDIO CONTROLLER
   Audio: assets/pirate-anthem.m4a (Cinematic Pirates + Celtic)
   Source: https://www.youtube.com/watch?v=XvwR86MvFf0
   ========================================================== */
let isAudioPlaying = false;

function initEntranceScreen() {
  const overlay = document.getElementById('entranceOverlay');
  const btnStartVoyage = document.getElementById('btnStartVoyage');
  const btnSkipAudio = document.getElementById('btnSkipAudio');

  if (!overlay) return;

  if (btnStartVoyage) {
    btnStartVoyage.addEventListener('click', () => {
      // Sembunyikan overlay dengan transisi halus
      overlay.classList.add('hidden-entrance');
      playSfx('click');

      // Putar musik latar bajak laut
      startPirateSoundtrack();

      // Luncurkan confetti selamat datang
      triggerConfetti();
    });
  }

  if (btnSkipAudio) {
    btnSkipAudio.addEventListener('click', () => {
      overlay.classList.add('hidden-entrance');
      playSfx('click');
    });
  }
}

function startPirateSoundtrack() {
  const widget = document.getElementById('musicFloatingWidget');
  if (widget) {
    widget.classList.add('active-widget');
  }

  const audio = document.getElementById('pirateAudio');
  if (audio) {
    audio.volume = 0.75;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioPlaying = true;
          updateMusicWidgetUI(true);
        })
        .catch(err => {
          console.warn("Autoplay notice:", err);
          updateMusicWidgetUI(false);
        });
    }
  }
}

function initYouTubeAudio() {
  const audio = document.getElementById('pirateAudio');
  const btnToggleMusic = document.getElementById('btnToggleMusic');
  const btnMuteMusic = document.getElementById('btnMuteMusic');
  const volSlider = document.getElementById('musicVolumeSlider');

  if (audio) {
    audio.addEventListener('play', () => {
      isAudioPlaying = true;
      updateMusicWidgetUI(true);
    });
    audio.addEventListener('pause', () => {
      isAudioPlaying = false;
      updateMusicWidgetUI(false);
    });
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }

  if (btnToggleMusic) {
    btnToggleMusic.addEventListener('click', () => {
      if (!audio) return;
      if (audio.paused) {
        audio.play().then(() => {
          isAudioPlaying = true;
          updateMusicWidgetUI(true);
        }).catch(() => {});
      } else {
        audio.pause();
        isAudioPlaying = false;
        updateMusicWidgetUI(false);
      }
    });
  }

  if (btnMuteMusic) {
    btnMuteMusic.addEventListener('click', () => {
      if (!audio) return;
      audio.muted = !audio.muted;
      if (audio.muted) {
        btnMuteMusic.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        btnMuteMusic.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      if (!audio) return;
      const vol = parseInt(e.target.value, 10);
      audio.volume = vol / 100;
      if (vol === 0) {
        audio.muted = true;
        if (btnMuteMusic) btnMuteMusic.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        audio.muted = false;
        if (btnMuteMusic) btnMuteMusic.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  }
}

function updateMusicWidgetUI(isPlaying) {
  const eq = document.getElementById('equalizerBars');
  const playIcon = document.getElementById('musicPlayPauseIcon');

  if (eq) {
    if (isPlaying) {
      eq.classList.add('playing');
    } else {
      eq.classList.remove('playing');
    }
  }

  if (playIcon) {
    if (isPlaying) {
      playIcon.className = 'fa-solid fa-pause';
    } else {
      playIcon.className = 'fa-solid fa-play';
    }
  }
}

