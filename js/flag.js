/**
 * REAL-TIME WAVING FLAG SIMULATION (BENDERA RESMI PARAMPA 2026-2027)
 * Simulasi fisika kain berkibar 60 FPS pada HTML5 Canvas dengan efek hembusan angin interaktif.
 */

class WavingFlag {
  constructor(canvasId, logoSrc) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.logo = new Image();
    this.logo.src = logoSrc;
    this.logoLoaded = false;
    
    this.logo.onload = () => {
      this.logoLoaded = true;
      this.prepareOffscreenFlag();
    };

    this.windGust = 1.0;
    this.targetGust = 1.0;
    this.time = 0;

    this.flagWidth = 360;
    this.flagHeight = 225;
    this.canvasWidth = 460;
    this.canvasHeight = 280;

    this.initCanvasSize();
    this.initEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const container = this.canvas.parentElement;
    const width = container ? Math.min(container.clientWidth, 480) : 460;
    const height = Math.round(width * 0.62);

    this.canvasWidth = width;
    this.canvasHeight = height;
    this.flagWidth = width * 0.78;
    this.flagHeight = height * 0.76;

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

    // 1. Latar Belakang Kain Bendera Bajak Laut (Midnight Navy / Black Pirate Cloth)
    const bgGrad = octx.createLinearGradient(0, 0, this.flagWidth, this.flagHeight);
    bgGrad.addColorStop(0, '#090e18');
    bgGrad.addColorStop(0.5, '#111c30');
    bgGrad.addColorStop(1, '#050911');
    octx.fillStyle = bgGrad;
    octx.fillRect(0, 0, this.flagWidth, this.flagHeight);

    // 2. Tekstur Tenun Halus Serat Kain
    octx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let x = 0; x < this.flagWidth; x += 3) {
      octx.fillRect(x, 0, 1, this.flagHeight);
    }
    for (let y = 0; y < this.flagHeight; y += 3) {
      octx.fillRect(0, y, this.flagWidth, 1);
    }

    // 3. Lis Ganda Emas Berornamen Maritim
    octx.strokeStyle = '#eab308';
    octx.lineWidth = 4;
    octx.strokeRect(8, 8, this.flagWidth - 16, this.flagHeight - 16);

    octx.strokeStyle = '#78350f';
    octx.lineWidth = 2;
    octx.strokeRect(14, 14, this.flagWidth - 28, this.flagHeight - 28);

    // 4. Bintang Emas 4 Penjuru Mata Angin di Sudut
    const stars = [
      [22, 22],
      [this.flagWidth - 22, 22],
      [22, this.flagHeight - 22],
      [this.flagWidth - 22, this.flagHeight - 22]
    ];
    octx.fillStyle = '#fed766';
    stars.forEach(([cx, cy]) => {
      this.drawStar(octx, cx, cy, 4, 7, 3);
    });

    // 5. Logo Resmi PARAMPA yang Melingkar di Pusat Bendera
    if (this.logoLoaded) {
      const logoSize = Math.round(this.flagHeight * 0.58);
      const lx = (this.flagWidth - logoSize) / 2;
      const ly = (this.flagHeight - logoSize) / 2 - 6;

      // Efek Pijar Aura Emas di Belakang Logo
      const glowGrad = octx.createRadialGradient(
        this.flagWidth / 2, ly + logoSize / 2, 25,
        this.flagWidth / 2, ly + logoSize / 2, logoSize * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.35)');
      glowGrad.addColorStop(0.8, 'rgba(2, 132, 199, 0.15)');
      glowGrad.addColorStop(1, 'transparent');
      octx.fillStyle = glowGrad;
      octx.beginPath();
      octx.arc(this.flagWidth / 2, ly + logoSize / 2, logoSize * 0.65, 0, Math.PI * 2);
      octx.fill();

      // Gambar Logo PARAMPA
      octx.drawImage(this.logo, lx, ly, logoSize, logoSize);

      // Cincin Emas Melingkari Logo
      octx.strokeStyle = '#eab308';
      octx.lineWidth = 3;
      octx.beginPath();
      octx.arc(this.flagWidth / 2, ly + logoSize / 2, logoSize / 2 + 2, 0, Math.PI * 2);
      octx.stroke();
    }

    // 6. Label Tulisan Emas Resmi Armada
    octx.fillStyle = '#fed766';
    octx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    octx.textAlign = 'center';
    octx.letterSpacing = '2.5px';
    octx.fillText("PARAMPA 2026-2027", this.flagWidth / 2, this.flagHeight - 20);
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
    // Interaksi hembusan angin dinamis saat kursor mendekati bendera
    this.canvas.addEventListener('mouseenter', () => {
      this.targetGust = 1.7;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.targetGust = 1.0;
    });
    this.canvas.addEventListener('click', () => {
      this.targetGust = 2.4;
      setTimeout(() => { this.targetGust = 1.0; }, 1000);
      if (typeof playSfx === 'function') {
        playSfx('click');
      }
    });

    window.addEventListener('resize', () => {
      this.initCanvasSize();
    });
  }

  animate() {
    this.time += 0.038 * this.windGust;
    this.windGust += (this.targetGust - this.windGust) * 0.06;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.offscreen) {
      this.renderWavingFlag();
    }

    requestAnimationFrame(this.animate);
  }

  renderWavingFlag() {
    const ctx = this.ctx;
    const startX = 36;
    const startY = 24;
    const slices = 80;
    const sliceWidth = this.flagWidth / slices;

    // 1. Gambar Tiang Bendera Kayu Kapal (Wooden Mast)
    this.drawFlagpole(ctx, startX - 14, 8);

    // 2. Simulasi Kibaran Gelombang Kain Per Vertikal Slice
    for (let i = 0; i < slices; i++) {
      const x = i * sliceWidth;
      const progress = x / this.flagWidth; // 0 = di tiang kayu (terikat erat), 1 = di ujung kibaran

      // Persamaan gelombang multi-harmonik dengan angin maritim
      const wave1 = Math.sin(progress * 6.2 - this.time * 4) * Math.pow(progress, 1.15) * (18 * this.windGust);
      const wave2 = Math.cos(progress * 11 - this.time * 6.5 + 0.5) * progress * (6 * this.windGust);
      const wave3 = Math.sin(this.time * 1.6) * progress * 3;

      const yOffset = wave1 + wave2 + wave3;

      // Turunan kemiringan gelombang untuk menghitung shading bayangan & kilau cahaya matahari
      const nextProgress = (x + sliceWidth) / this.flagWidth;
      const nextWave1 = Math.sin(nextProgress * 6.2 - this.time * 4) * Math.pow(nextProgress, 1.15) * (18 * this.windGust);
      const slope = (nextWave1 - wave1) / sliceWidth;

      const scaleY = 1 - Math.abs(slope) * 0.025;

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
        // Puncak lipatan terkena sinar matahari (Highlight)
        const alpha = Math.min(0.22, slope * 0.14);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.6, destH);
      } else {
        // Lembah lipatan berada dalam bayangan (Shadow)
        const alpha = Math.min(0.36, -slope * 0.20);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(destX, destY, sliceWidth + 0.6, destH);
      }
    }

    // 3. Tali Tambang Pengikat Bendera ke Tiang
    this.drawRopes(ctx, startX, startY);
  }

  drawFlagpole(ctx, px, py) {
    const poleH = this.canvasHeight - 12;

    // Bayangan tiang kayu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(px + 3, py + 8, 14, poleH);

    // Batang tiang kayu bertekstur
    const poleGrad = ctx.createLinearGradient(px, 0, px + 12, 0);
    poleGrad.addColorStop(0, '#2b1408');
    poleGrad.addColorStop(0.35, '#854d0e');
    poleGrad.addColorStop(0.7, '#a16207');
    poleGrad.addColorStop(1, '#1c0d06');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(px, py + 14, 12, poleH);

    // Ring penguat tiang dari emas
    ctx.fillStyle = '#eab308';
    ctx.fillRect(px - 1, py + 26, 14, 3);
    ctx.fillRect(px - 1, py + this.flagHeight + 28, 14, 3);

    // Bola emas di ujung atas tiang (Brass Finial)
    const finialGrad = ctx.createRadialGradient(px + 4, py + 4, 1, px + 6, py + 6, 11);
    finialGrad.addColorStop(0, '#fef08a');
    finialGrad.addColorStop(0.4, '#eab308');
    finialGrad.addColorStop(0.85, '#a16207');
    finialGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = finialGrad;
    ctx.beginPath();
    ctx.arc(px + 6, py + 7, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  drawRopes(ctx, fx, fy) {
    // Grommet atas & tali
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 3, fy + 10, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(fx - 8, fy + 10);
    ctx.lineTo(fx + 3, fy + 10);
    ctx.stroke();

    // Grommet bawah & tali
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 3, fy + this.flagHeight - 10, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(fx - 8, fy + this.flagHeight - 10);
    ctx.lineTo(fx + 3, fy + this.flagHeight - 10);
    ctx.stroke();
  }
}

// Pasang saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('parampaFlagCanvas')) {
    window.parampaFlagInstance = new WavingFlag('parampaFlagCanvas', 'assets/parampa-logo.png');
  }
});
