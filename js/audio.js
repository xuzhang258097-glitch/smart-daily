class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    this.ctx = null;
    this.init();
  }

  init() {
    document.addEventListener('click', () => {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }, { once: true });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled);
    return this.enabled;
  }

  playTone(freq, duration, type = 'sine', volume = 0.08) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  hover() { this.playTone(523, 0.06, 'sine', 0.03); }
  click() { this.playTone(659, 0.1, 'sine', 0.05); this.playTone(784, 0.1, 'sine', 0.05); }
  success() { this.playTone(523, 0.1, 'sine', 0.06); this.playTone(659, 0.1, 'sine', 0.06); this.playTone(784, 0.15, 'sine', 0.06); }
  favorite() { this.playTone(880, 0.08, 'sine', 0.05); this.playTone(1100, 0.12, 'sine', 0.05); }
  switch() { this.playTone(440, 0.05, 'sine', 0.04); }
  word() { this.playTone(392, 0.08, 'triangle', 0.04); this.playTone(523, 0.12, 'triangle', 0.04); }
  download() { this.playTone(330, 0.08, 'sine', 0.05); this.playTone(440, 0.08, 'sine', 0.05); this.playTone(550, 0.12, 'sine', 0.05); }
  notify() { this.playTone(600, 0.1, 'sine', 0.06); this.playTone(800, 0.15, 'sine', 0.06); }
}

const audioManager = new AudioManager();
