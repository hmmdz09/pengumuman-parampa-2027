/**
 * REAL-TIME WAVING FLAG SIMULATION (BENDERA RESMI PARAMPA 2026-2027 DI TIANG KAPAL)
 * Mengibarkan bendera resmi PARAMPA di tiang kapal bajak laut secara real-time 60 FPS.
 */

class WavingFlag {
  constructor(canvasId, logoSrc, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.logo = new Image();
    this.logo.src = logoSrc;
    this.logoLoaded = false;
    this.hasPole = options.hasPole ?? false; // Jika di tiang kapal asli, tiang kayu buatan tidak digambar
    
    this.logo.onload = () => {
      this.logoLoaded = true;
      this.prepareOffscreenFlag();
    };

    this.windGust = 1.0;
    this.targetGust = 1.0;
    this.time = 0;

    this.flagWidth = 320;
    this.flagHeight = 190;
    this.canvasWidth = 360;
    this.canvasHeight = 220;

    this.initCanvasSize();
    this.initEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : (this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 360);
    const height = rect.height > 0 ? rect.height : Math.round(width * 0.62);

    this.canvasWidth = width;
    this.canvasHeight = height;
    
    // Sesuaikan proporsi bendera dengan kanvas
    if (this.hasPole) {
      this.flagWidth = width * 0.78;
      this.flagHeight = height * 0.76;
    } else {
      this.flagWidth = width * 0.90;
      this.flagHeight = height * 0.82;
    }

    this.canvas.width = this.canvasWidth * dpr;
    this.canvas.height = this.canvasHeight * dpr;
    this.ctx.scale(dpr, dpr);

    if (this.logoLoaded) {
      this.prepareOffscreenFlag();
    }
  }

  prepareOffscreenFlag() {
    this.offscreen = document.createElement('canvas');
    this.offscreen.width = this.flagWidth;
    this.offscreen.height = this.flagHeight;
    const octx = this.offscreen.getContext('2d');

    // 1. Kain Bendera Bajak Laut (Midnight Navy / Black Pirate Cloth)
    const bgGrad = octx.createLinearGradient(0, 0, this.flagWidth, this.flagHeight);
    bgGrad.addColorStop(0, '#090e18');
    bgGrad.addColorStop(0.5, '#111c30');
    bgGrad.addColorStop(1, '#050911');
    octx.fillStyle = bgGrad;
    octx.fillRect(0, 0, this.flagWidth, this.flagHeight);

    // 2. Tekstur Tenun Halus Serat Kain
    octx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let x = 0; x < this.flagWidth; x += 3) {
      octx.fillRect(x, 0, 1, this.flagHeight);
    }
    for (let y = 0; y < this.flagHeight; y += 3) {
      octx.fillRect(0, y, this.flagWidth, 1);
    }

    // 3. Lis Ganda Emas Berornamen Maritim
    octx.strokeStyle = '#eab308';
    octx.lineWidth = 3.5;
    octx.strokeRect(6, 6, this.flagWidth - 12, this.flagHeight - 12);

    octx.strokeStyle = '#78350f';
    octx.lineWidth = 1.5;
    octx.strokeRect(10, 10, this.flagWidth - 20, this.flagHeight - 20);

    // 4. Bintang Emas di 4 Sudut Bendera
    const stars = [
      [18, 18],
      [this.flagWidth - 18, 18],
      [18, this.flagHeight - 18],
      [this.flagWidth - 18, this.flagHeight - 18]
    ];
    octx.fillStyle = '#fed766';
    stars.forEach(([cx, cy]) => {
      this.drawStar(octx, cx, cy, 4, 6, 2.5);
    });

    // 5. Logo Resmi PARAMPA yang Melingkar di Pusat Bendera
    if (this.logoLoaded) {
      const logoSize = Math.round(this.flagHeight * 0.60);
      const lx = (this.flagWidth - logoSize) / 2;
      const ly = (this.flagHeight - logoSize) / 2 - 4;

      // Efek Pijar Aura Emas di Belakang Logo
      const glowGrad = octx.createRadialGradient(
        this.flagWidth / 2, ly + logoSize / 2, 20,
        this.flagWidth / 2, ly + logoSize / 2, logoSize * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.4)');
      glowGrad.addColorStop(0.8, 'rgba(2, 132, 199, 0.2)');
      glowGrad.addColorStop(1, 'transparent');
      octx.fillStyle = glowGrad;
      octx.beginPath();
      octx.arc(this.flagWidth / 2, ly + logoSize / 2, logoSize * 0.65, 0, Math.PI * 2);
      octx.fill();

      // Gambar Logo PARAMPA
      octx.drawImage(this.logo, lx, ly, logoSize, logoSize);

      // Cincin Emas Melingkari Logo
      octx.strokeStyle = '#eab308';
      octx.lineWidth = 2.5;
      octx.beginPath();
      octx.arc(this.flagWidth / 2, ly + logoSize / 2, logoSize / 2 + 2, 0, Math.PI * 2);
      octx.stroke();
    }

    // 6. Label Tulisan Emas Resmi Armada
    octx.fillStyle = '#fed766';
    octx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
    octx.textAlign = 'center';
    octx.letterSpacing = '2px';
    octx.fillText("PARAMPA 2026-2027", this.flagWidth / 2, this.flagHeight - 16);
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
    // Interaksi hembusan angin dinamis pada kontainer bendera latar belakang atau canvas
    const interactiveTarget = this.canvas.closest('.bg-mast-flag-container') || this.canvas;

    interactiveTarget.addEventListener('mouseenter', () => {
      this.targetGust = 1.9;
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
    if (heroSec) {
      let lastMove = 0;
      heroSec.addEventListener('mousemove', () => {
        const now = Date.now();
        if (now - lastMove > 250) {
          lastMove = now;
          this.targetGust = Math.min(2.2, this.targetGust + 0.18);
          clearTimeout(this._gustTimer);
          this._gustTimer = setTimeout(() => {
            this.targetGust = 1.0;
          }, 1400);
        }
      });
    }

    window.addEventListener('resize', () => {
      this.initCanvasSize();
    });
  }

  animate() {
    this.time += 0.042 * this.windGust;
    this.windGust += (this.targetGust - this.windGust) * 0.06;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.offscreen) {
      this.renderWavingFlag();
    }

    requestAnimationFrame(this.animate);
  }

  renderWavingFlag() {
    const ctx = this.ctx;
    const startX = this.hasPole ? 34 : 14;
    const startY = 16;
    const slices = 80;
    const sliceWidth = this.flagWidth / slices;

    // 1. Gambar Tiang Kayu jika diminta
    if (this.hasPole) {
      this.drawFlagpole(ctx, startX - 14, 6);
    }

    // 2. Simulasi Kibaran Gelombang Kain Per Vertikal Slice
    for (let i = 0; i < slices; i++) {
      const x = i * sliceWidth;
      const progress = x / this.flagWidth; // 0 = di tiang kapal, 1 = di ujung kibaran

      // Persamaan gelombang multi-harmonik angin laut
      const wave1 = Math.sin(progress * 6.2 - this.time * 4.2) * Math.pow(progress, 1.15) * (18 * this.windGust);
      const wave2 = Math.cos(progress * 11 - this.time * 6.8 + 0.5) * progress * (6 * this.windGust);
      const wave3 = Math.sin(this.time * 1.8) * progress * 3;

      const yOffset = wave1 + wave2 + wave3;

      // Turunan kemiringan gelombang untuk menghitung shading bayangan & highlight
      const nextProgress = (x + sliceWidth) / this.flagWidth;
      const nextWave1 = Math.sin(nextProgress * 6.2 - this.time * 4.2) * Math.pow(nextProgress, 1.15) * (18 * this.windGust);
      const slope = (nextWave1 - wave1) / sliceWidth;

      const scaleY = 1 - Math.abs(slope) * 0.03;

      const destX = startX + x;
      const destY = startY + yOffset + (this.flagHeight * (1 - scaleY)) / 2;
      const destH = this.flagHeight * scaleY;

      // Gambar irisan kain
      ctx.drawImage(
        this.offscreen,
        x, 0, sliceWidth + 0.6, this.flagHeight,
        destX, destY, sliceWidth + 0.6, destH
      );

      // Pencahayaan Realtime: Highlight & Shadow Lipatan Kain
      if (slope > 0) {
        // Puncak lipatan terkena sinar matahari (Highlight cerah)
        const alpha = Math.min(0.25, slope * 0.16);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.6, destH);
      } else {
        // Lembah lipatan berada dalam bayangan (Shadow gelap)
        const alpha = Math.min(0.40, -slope * 0.22);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.6, destH);
      }
    }

    // 3. Tali Tambang Pengikat Bendera ke Tiang Kapal
    this.drawRopes(ctx, startX, startY);
  }

  drawFlagpole(ctx, px, py) {
    const poleH = this.canvasHeight;

    // Bayangan tiang kayu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(px + 4, py + 6, 12, poleH);

    // Batang tiang kayu bertekstur maritim
    const poleGrad = ctx.createLinearGradient(px, 0, px + 12, 0);
    poleGrad.addColorStop(0, '#2b1408');
    poleGrad.addColorStop(0.35, '#854d0e');
    poleGrad.addColorStop(0.7, '#b45309');
    poleGrad.addColorStop(1, '#1c0d06');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(px, py + 8, 11, poleH);

    // Ring penguat tiang emas
    ctx.fillStyle = '#eab308';
    ctx.fillRect(px - 1, py + 20, 13, 3.5);
    ctx.fillRect(px - 1, py + this.flagHeight + 22, 13, 3.5);

    // Bola emas di ujung tiang
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px + 5.5, py + 6, 8.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  drawRopes(ctx, fx, fy) {
    // Grommet atas & tali tambang maritim
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 2, fy + 8, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(fx - 12, fy + 8);
    ctx.lineTo(fx + 2, fy + 8);
    ctx.stroke();

    // Grommet bawah & tali
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 2, fy + this.flagHeight - 8, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(fx - 12, fy + this.flagHeight - 8);
    ctx.lineTo(fx + 2, fy + this.flagHeight - 8);
    ctx.stroke();
  }
}

// Inisialisasi bendera pada tiang kapal utama
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shipMastFlagCanvas')) {
    window.shipMastFlagInstance = new WavingFlag('shipMastFlagCanvas', 'assets/parampa-logo.png', { hasPole: true });
  } else if (document.getElementById('parampaFlagCanvas')) {
    window.parampaFlagInstance = new WavingFlag('parampaFlagCanvas', 'assets/parampa-logo.png', { hasPole: true });
  }
});

window.addEventListener('load', () => {
  if (window.shipMastFlagInstance) {
    window.shipMastFlagInstance.initCanvasSize();
  }
});
