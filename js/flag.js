/**
 * REAL-TIME WAVING FLAG SIMULATION (BENDERA RESMI PARAMPA 2026-2027 DI TIANG 2 KAPAL)
 * Mengibarkan bendera resmi PARAMPA di tiang kedua kapal bajak laut di latar belakang secara real-time 60 FPS.
 */

class WavingFlag {
  constructor(canvasId, logoSrc, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.logo = new Image();
    this.logo.src = logoSrc;
    this.logoLoaded = false;
    this.hasPole = options.hasPole ?? false; // Tiang kapal asli sudah ada di ilustrasi background
    this.isFleet = options.isFleet ?? false; // Variasi kapal 1 vs kapal 2
    
    this.logo.onload = () => {
      this.logoLoaded = true;
      this.prepareOffscreenFlag();
    };

    this.windGust = 1.0;
    this.targetGust = 1.0;
    this.time = Math.random() * 10; // Phase shift agar kedua kapal berkibar dinamis natural

    this.flagWidth = 100;
    this.flagHeight = 65;
    this.canvasWidth = 110;
    this.canvasHeight = 70;

    this.initCanvasSize();
    this.initEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : (this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 110);
    const height = rect.height > 0 ? rect.height : Math.round(width * 0.65);

    this.canvasWidth = width;
    this.canvasHeight = height;
    
    // Sesuaikan proporsi bendera dengan kanvas
    if (this.hasPole) {
      this.flagWidth = width * 0.78;
      this.flagHeight = height * 0.76;
    } else {
      this.flagWidth = width * 0.88;
      this.flagHeight = height * 0.84;
    }

    this.canvas.width = Math.round(this.canvasWidth * dpr);
    this.canvas.height = Math.round(this.canvasHeight * dpr);
    this.ctx.scale(dpr, dpr);

    if (this.logoLoaded) {
      this.prepareOffscreenFlag();
    }
  }

  prepareOffscreenFlag() {
    this.offscreen = document.createElement('canvas');
    this.offscreen.width = Math.max(10, Math.round(this.flagWidth));
    this.offscreen.height = Math.max(10, Math.round(this.flagHeight));
    const octx = this.offscreen.getContext('2d');
    const w = this.flagWidth;
    const h = this.flagHeight;

    // 1. Kain Bendera Bajak Laut (Midnight Navy / Black Pirate Cloth)
    const bgGrad = octx.createLinearGradient(0, 0, w, h);
    if (this.isFleet) {
      bgGrad.addColorStop(0, '#04070d');
      bgGrad.addColorStop(0.5, '#0c1524');
      bgGrad.addColorStop(1, '#03050a');
    } else {
      bgGrad.addColorStop(0, '#090e18');
      bgGrad.addColorStop(0.5, '#111c30');
      bgGrad.addColorStop(1, '#050911');
    }
    octx.fillStyle = bgGrad;
    octx.fillRect(0, 0, w, h);

    // 2. Tekstur Tenun Halus Serat Kain
    octx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let x = 0; x < w; x += 3) {
      octx.fillRect(x, 0, 1, h);
    }
    for (let y = 0; y < h; y += 3) {
      octx.fillRect(0, y, w, 1);
    }

    // 3. Lis Ganda Emas Berornamen Maritim Proporsional
    const inset1 = Math.max(2, Math.round(h * 0.05));
    const inset2 = Math.max(4, Math.round(h * 0.10));
    const lw1 = Math.max(1.2, h * 0.03);
    const lw2 = Math.max(0.8, h * 0.018);

    octx.strokeStyle = '#eab308';
    octx.lineWidth = lw1;
    octx.strokeRect(inset1, inset1, w - inset1 * 2, h - inset1 * 2);

    octx.strokeStyle = '#78350f';
    octx.lineWidth = lw2;
    octx.strokeRect(inset2, inset2, w - inset2 * 2, h - inset2 * 2);

    // 4. Bintang Emas di 4 Sudut Bendera
    const starOffset = Math.max(inset2 + 3, Math.round(h * 0.14));
    const starR1 = Math.max(2, h * 0.045);
    const starR2 = Math.max(1, h * 0.02);
    const stars = [
      [starOffset, starOffset],
      [w - starOffset, starOffset],
      [starOffset, h - starOffset],
      [w - starOffset, h - starOffset]
    ];
    octx.fillStyle = '#fed766';
    stars.forEach(([cx, cy]) => {
      this.drawStar(octx, cx, cy, 4, starR1, starR2);
    });

    // 5. Logo Resmi PARAMPA yang Melingkar di Pusat Bendera
    if (this.logoLoaded) {
      const logoSize = Math.round(h * 0.60);
      const lx = (w - logoSize) / 2;
      const ly = (h - logoSize) / 2 - (h > 60 ? 2 : 0);

      // Efek Pijar Aura Emas di Belakang Logo
      const glowGrad = octx.createRadialGradient(
        w / 2, ly + logoSize / 2, Math.max(4, logoSize * 0.2),
        w / 2, ly + logoSize / 2, logoSize * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.45)');
      glowGrad.addColorStop(0.8, 'rgba(2, 132, 199, 0.2)');
      glowGrad.addColorStop(1, 'transparent');
      octx.fillStyle = glowGrad;
      octx.beginPath();
      octx.arc(w / 2, ly + logoSize / 2, logoSize * 0.65, 0, Math.PI * 2);
      octx.fill();

      // Gambar Logo PARAMPA
      octx.drawImage(this.logo, lx, ly, logoSize, logoSize);

      // Cincin Emas Melingkari Logo
      octx.strokeStyle = '#eab308';
      octx.lineWidth = Math.max(1, h * 0.025);
      octx.beginPath();
      octx.arc(w / 2, ly + logoSize / 2, logoSize / 2 + 1.5, 0, Math.PI * 2);
      octx.stroke();
    }

    // 6. Label Tulisan Emas Resmi Armada (Jika ukuran memungkinkan)
    if (h >= 55) {
      octx.fillStyle = '#fed766';
      octx.font = 'bold ' + Math.max(6.5, Math.round(h * 0.11)) + 'px "Plus Jakarta Sans", sans-serif';
      octx.textAlign = 'center';
      octx.letterSpacing = '1px';
      octx.fillText("PARAMPA 2026-2027", w / 2, h - Math.max(3, h * 0.07));
    }
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  initEvents() {
    // Interaksi hembusan angin dinamis pada kanvas atau kontainer kapal
    const interactiveTarget = this.canvas.closest('.ship-flag-mount') || this.canvas;

    interactiveTarget.addEventListener('mouseenter', () => {
      this.targetGust = 2.0;
    });
    interactiveTarget.addEventListener('mouseleave', () => {
      this.targetGust = 1.0;
    });
    interactiveTarget.addEventListener('click', () => {
      this.targetGust = 2.8;
      setTimeout(() => { this.targetGust = 1.0; }, 1400);
      if (typeof playSfx === 'function') {
        playSfx('click');
      }
    });

    // Interaksi hembus angin saat kursor digerakkan di sekitar hero section
    const heroSec = document.getElementById('hero');
    if (heroSec && !heroSec._breezeListener) {
      heroSec._breezeListener = true;
      let lastMove = 0;
      heroSec.addEventListener('mousemove', () => {
        const now = Date.now();
        if (now - lastMove > 180) {
          lastMove = now;
          if (window.ship1Flag) window.ship1Flag.targetGust = Math.min(2.3, window.ship1Flag.targetGust + 0.16);
          if (window.ship2Flag) window.ship2Flag.targetGust = Math.min(2.3, window.ship2Flag.targetGust + 0.16);
          clearTimeout(heroSec._gustTimer);
          heroSec._gustTimer = setTimeout(() => {
            if (window.ship1Flag) window.ship1Flag.targetGust = 1.0;
            if (window.ship2Flag) window.ship2Flag.targetGust = 1.0;
          }, 1400);
        }
      });
    }

    window.addEventListener('resize', () => {
      this.initCanvasSize();
    });
  }

  animate() {
    this.time += 0.045 * this.windGust;
    this.windGust += (this.targetGust - this.windGust) * 0.06;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.offscreen) {
      this.renderWavingFlag();
    }

    requestAnimationFrame(this.animate);
  }

  renderWavingFlag() {
    const ctx = this.ctx;
    const startX = this.hasPole ? 18 : 6;
    const startY = 4;
    const slices = 50;
    const sliceWidth = this.flagWidth / slices;

    // 1. Gambar Tiang Kayu jika diminta
    if (this.hasPole) {
      this.drawFlagpole(ctx, startX - 10, 2);
    }

    // 2. Simulasi Kibaran Gelombang Kain Per Vertikal Slice
    const amp1 = Math.max(3, this.flagHeight * 0.08) * this.windGust;
    const amp2 = Math.max(1, this.flagHeight * 0.03) * this.windGust;

    for (let i = 0; i < slices; i++) {
      const x = i * sliceWidth;
      const progress = x / this.flagWidth; // 0 = di tiang kapal, 1 = di ujung kibaran

      // Persamaan gelombang multi-harmonik angin laut
      const wave1 = Math.sin(progress * 6.2 - this.time * 4.2) * Math.pow(progress, 1.15) * amp1;
      const wave2 = Math.cos(progress * 11 - this.time * 6.8 + 0.5) * progress * amp2;
      const wave3 = Math.sin(this.time * 1.8) * progress * 1.5;

      const yOffset = wave1 + wave2 + wave3;

      // Turunan kemiringan gelombang untuk menghitung shading bayangan & highlight
      const nextProgress = (x + sliceWidth) / this.flagWidth;
      const nextWave1 = Math.sin(nextProgress * 6.2 - this.time * 4.2) * Math.pow(nextProgress, 1.15) * amp1;
      const slope = (nextWave1 - wave1) / sliceWidth;

      const scaleY = 1 - Math.abs(slope) * 0.03;

      const destX = startX + x;
      const destY = startY + yOffset + (this.flagHeight * (1 - scaleY)) / 2;
      const destH = this.flagHeight * scaleY;

      // Gambar irisan kain
      ctx.drawImage(
        this.offscreen,
        x, 0, sliceWidth + 0.5, this.flagHeight,
        destX, destY, sliceWidth + 0.5, destH
      );

      // Pencahayaan Realtime: Highlight & Shadow Lipatan Kain
      if (slope > 0) {
        // Puncak lipatan terkena sinar matahari (Highlight cerah)
        const alpha = Math.min(0.24, slope * 0.15);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.5, destH);
      } else {
        // Lembah lipatan berada dalam bayangan (Shadow gelap)
        const alpha = Math.min(0.38, -slope * 0.22);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.5, destH);
      }
    }

    // 3. Tali Tambang Pengikat Bendera ke Tiang Kapal
    this.drawRopes(ctx, startX, startY);
  }

  drawFlagpole(ctx, px, py) {
    const poleH = this.canvasHeight;

    // Bayangan tiang kayu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(px + 3, py + 4, 8, poleH);

    // Batang tiang kayu bertekstur maritim
    const poleGrad = ctx.createLinearGradient(px, 0, px + 8, 0);
    poleGrad.addColorStop(0, '#2b1408');
    poleGrad.addColorStop(0.35, '#854d0e');
    poleGrad.addColorStop(0.7, '#b45309');
    poleGrad.addColorStop(1, '#1c0d06');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(px, py + 4, 7, poleH);

    // Ring penguat tiang emas
    ctx.fillStyle = '#eab308';
    ctx.fillRect(px - 1, py + 12, 9, 2.5);
    ctx.fillRect(px - 1, py + this.flagHeight + 14, 9, 2.5);

    // Bola emas di ujung tiang
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px + 3.5, py + 4, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRopes(ctx, fx, fy) {
    const r = Math.max(1.5, this.flagHeight * 0.03);
    // Grommet atas & tali tambang maritim
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 1, fy + 5, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(fx - 6, fy + 5);
    ctx.lineTo(fx + 1, fy + 5);
    ctx.stroke();

    // Grommet bawah & tali
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 1, fy + this.flagHeight - 5, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(fx - 6, fy + this.flagHeight - 5);
    ctx.lineTo(fx + 1, fy + this.flagHeight - 5);
    ctx.stroke();
  }
}

// Inisialisasi bendera pada tiang kedua kapal bajak laut di latar belakang
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shipFlagCanvas1')) {
    window.ship1Flag = new WavingFlag('shipFlagCanvas1', 'assets/parampa-logo.png', { hasPole: false, isFleet: true });
  }
  if (document.getElementById('shipFlagCanvas2')) {
    window.ship2Flag = new WavingFlag('shipFlagCanvas2', 'assets/parampa-logo.png', { hasPole: false, isFleet: false });
  }

  // Kompatibilitas jika ada elemen legacy
  if (document.getElementById('shipMastFlagCanvas') && !window.shipMastFlagInstance) {
    window.shipMastFlagInstance = new WavingFlag('shipMastFlagCanvas', 'assets/parampa-logo.png', { hasPole: false });
  }
});

window.addEventListener('load', () => {
  if (window.ship1Flag) window.ship1Flag.initCanvasSize();
  if (window.ship2Flag) window.ship2Flag.initCanvasSize();
  if (window.shipMastFlagInstance) window.shipMastFlagInstance.initCanvasSize();
});
