# ⚓ Portal Pengumuman Hasil Open Recruitment Panitia PARAMPA 2026-2027

Website resmi pengumuman hasil seleksi open recruitment panitia **PARAMPA 2026-2027** Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam (FPMIPA), Universitas Pendidikan Indonesia (UPI).

Dirancang dengan tema visual **Petualangan Bajak Laut & Maritim (Pirate Maritime Adventure)** yang dipadukan dengan grafis modern, interaksi dinamis, orkestra latar belakang YouTube, serta kartu kelulusan digital siap unduh.

---

## 🏴‍☠️ Fitur Utama

- **Layar Sambutan Modern (*Cinematic Entrance Overlay*)**:
  - Pertanyaan interaktif: *"Apakah Kamu Sudah Bersiap Untuk Berlayar?"*
  - Kemudi kapal bercahaya neon berputar perlahan dengan efek *glassmorphism* dan partikel samudra mengambang.
  - Opsi: *Ya, Angkat Jangkar & Putar Musik!* atau *Masuk Tanpa Musik*.
- **Integrasi Musik Latar Orkestra Bajak Laut**:
  - Musik tema: [Cinematic Pirates + Celtic - Bajak Laut](https://www.youtube.com/watch?v=XvwR86MvFf0) (`XvwR86MvFf0`).
  - Pemutar audio latar YouTube IFrame API tanpa jeda.
  - Floating modern controller dengan **Equalizer Visualizer Bars**, Play/Pause, Mute, dan Volume Slider.
- **Pencarian Data Staf Cerdas**:
  - Verifikasi kelulusan dengan input **Nama Lengkap**, **NIM (7 digit)**, dan pilihan **Program Studi**.
  - *Smart Autocomplete*: Menampilkan saran nama dan NIM otomatis saat mengetik.
  - Pencarian fleksibel (mendukung pencarian hanya dengan NIM atau Nama).
- **Pirate Fleet Boarding Pass (Surat Keputusan Resmi)**:
  - Kartu kelulusan bergaya perkamen kuno bertabur segel emas maritim.
  - Selebrasi animasi *confetti* emas.
  - **Tombol WhatsApp Koordinator**: Membuka percakapan WhatsApp secara langsung dengan draf pesan perkenalan otomatis.
  - **Grup WhatsApp Kru**: Akses langsung bergabung ke grup armada panitia.
  - **Unduh Kartu Story (1080x1920)**: Mengunduh gambar piagam kelulusan digital via HTML5 Canvas untuk dibagikan ke Instagram Story atau WhatsApp Status.
- **Direktori Kru Kapal (148 Anggota Terdaftar)**:
  - Tab navigasi per divisi (*Sekretaris, Bendahara, Acara Perlombaan, Opening & Closing, Humas, Medis, Spektator Logistik, Sponsor Danus, PDDD*).
  - Kolom pencarian instan (*live search*) di dalam tabel divisi.
- **Peta Rute Agenda (Timeline) & FAQ Helpdesk**:
  - Garis waktu dari rilis pengumuman, First Gathering akbar, hingga hari-H acara.
  - Pusat kontak bantuan Helpdesk dan Ketua Pelaksana.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** (Semantik, SEO-friendly, Open Graph)
- **Vanilla CSS3** (Custom Properties, Glassmorphism, Google Fonts *Cinzel Decorative*, *Pirata One*, *Plus Jakarta Sans*)
- **Vanilla JavaScript (ES6+)** (DOM Manipulation, Canvas API untuk rendering story card, Web Audio API)
- **YouTube IFrame Player API** (Streaming musik latar tanpa batas)
- **Canvas Confetti** (Efek selebrasi visual)
- **Font Awesome 6** (Ikonografi maritim & sosial media)

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/hmmdz09/pengumuman-parampa-2027.git
   cd pengumuman-parampa-2027
   ```

2. **Jalankan local server** (pilih salah satu):
   - Menggunakan Python:
     ```bash
     python -m http.server 8085
     ```
   - Menggunakan Node.js `serve` / `npx`:
     ```bash
     npx -y serve .
     ```

3. **Buka di browser**:
   Akses `http://localhost:8085/` (atau port yang tertera).

---

## 📄 Lisensi & Hak Cipta

© 2026 Panitia Pelaksana PARAMPA • Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam (FPMIPA), Universitas Pendidikan Indonesia.
