// 100% Offline Web Audio API Synthesizer
// Zero external asset downloads, zero network latency, ~0KB footprint

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Arpeggio chime
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {}
  }

  playStar() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  playArrowRelease() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // White-noise whoosh followed by snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  playMicBeep(type: 'start' | 'stop') {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      if (type === 'start') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      } else {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
      }
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  playPraiseChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Joyous upward major triad arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.18, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    } catch {}
  }

  playTryAgain() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Gentle warm descending chime
      const notes = [440, 392];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.25);
      });
    } catch {}
  }

  // --- AUTHENTIC TRIBAL PERCUSSION & INSTRUMENT SYNTHESIZERS ---
  
  // 1. Mandar (मांदर / Dumang): Deep clay two-headed drum with pitch bend
  playMandar(isBass: boolean = true) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const startFreq = isBass ? 110 : 180;
      const endFreq = isBass ? 55 : 90;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.25);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  // 2. Dama / Nagara (नगाड़ा): Sharp resonant kettle drum crack
  playDama() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  // 3. Tamak (टमाक): Heavy low-end tribal bass punch
  playTamak() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {}
  }

  // 4. Rutu (रूतू / बांसुरी): Melodic bamboo flute note with breath
  playRutu(pitchOffset: number = 0) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 587.33; // D5 folk key
      const scale = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66];
      const freq = scale[Math.abs(pitchOffset) % scale.length] || baseFreq;
      osc.frequency.setValueAtTime(freq, now);
      // vibrato
      osc.frequency.linearRampToValueAtTime(freq + 6, now + 0.2);
      osc.frequency.linearRampToValueAtTime(freq, now + 0.4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  // 5. Ghungroo (घुंघरू): Shimmering metallic ankle bells
  playGhungroo() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [2400, 3100, 4200].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      });
    } catch {}
  }

  // 6. Kati Wood Strike (काटी खेल): Crisp hardwood disc impact
  playWoodHit() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  // 7. Stilt Step (गेदी एनांग): Bamboo footstep on dirt
  playStiltStep(isRight: boolean = false) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isRight ? 210 : 185, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // 8. Board Game Move (कुल-मेरोम)
  playBoardMove() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  // 9. Board Game Capture (बाघ शिकार / बकरी घिराव)
  playBoardCapture() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  // 10. Ambient Forest Bird / Nature for Folklore
  playForestAmbience() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // High pleasant chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.linearRampToValueAtTime(2349, now + 0.06);
      osc.frequency.linearRampToValueAtTime(1975, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // 11. Classroom Instruction Audio Cue (Warm pedagogical chime)
  playClassroomAudioCue() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Gentle warm chime: E5 -> A5 (folk interval)
      [659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.12, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.28);
      });
    } catch {}
  }

  // 12. Pedagogical Vocal Fallback Chant (Synthesizes spoken syllable rhythm using Web Audio)
  playPedagogicalChant(syllables: number = 4) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const count = Math.min(Math.max(syllables, 3), 8);
      // Melodic speech contour frequencies (pedagogical reading pitch: ~220Hz - 330Hz)
      const pitches = [261.63, 293.66, 329.63, 293.66, 261.63, 349.23, 329.63, 261.63];
      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const formant = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Human vocal formant simulation (formant filter around 800Hz / 1200Hz for vowels)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitches[i % pitches.length], now + i * 0.18);

        formant.type = 'bandpass';
        formant.frequency.setValueAtTime(900 + (i % 3) * 200, now + i * 0.18);
        formant.Q.setValueAtTime(4.0, now + i * 0.18);

        gain.gain.setValueAtTime(0.01, now + i * 0.18);
        gain.gain.linearRampToValueAtTime(0.16, now + i * 0.18 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.16);

        osc.connect(formant);
        formant.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 0.16);
      }
    } catch {}
  }

  private ttsCache = new Map<string, string>();
  private activeTtsSource: AudioBufferSourceNode | null = null;

  private async playCachedPcm(base64Data: string, playbackRate: number = 1.0): Promise<boolean> {
    try {
      const ctx = this.getContext();
      if (!ctx) return false;
      if (this.activeTtsSource) {
        try { this.activeTtsSource.stop(); } catch {}
        this.activeTtsSource = null;
      }

      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const samplesCount = Math.floor(bytes.byteLength / 2);
      const alignedBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + samplesCount * 2);
      const int16 = new Int16Array(alignedBuffer);

      const buffer = ctx.createBuffer(1, samplesCount, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < samplesCount; i++) {
        channelData[i] = int16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      source.connect(ctx.destination);
      this.activeTtsSource = source;

      return new Promise((resolve) => {
        let finished = false;
        const done = () => {
          if (!finished) {
            finished = true;
            if (this.activeTtsSource === source) this.activeTtsSource = null;
            resolve(true);
          }
        };
        source.onended = done;
        setTimeout(done, Math.max(1200, ((samplesCount / 24000) / playbackRate) * 1000 + 400));
        source.start();
      });
    } catch {
      return false;
    }
  }

  speakTribalWord(text: string, slow: boolean = false) {
    const cleanText = (text || '').trim();
    if (!cleanText) return;

    this.playClassroomAudioCue();

    const speakWithBrowserImmediate = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
          }
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          const utt = new SpeechSynthesisUtterance(cleanText);
          const voices = window.speechSynthesis.getVoices() || [];
          const hindiVoice = voices.find(
            (v) => (v.lang || '').toLowerCase().startsWith('hi') || (v.name || '').toLowerCase().includes('hindi')
          );
          const indianVoice = voices.find(
            (v) => (v.lang || '').toLowerCase().startsWith('en-in') || (v.name || '').toLowerCase().includes('india')
          );
          if (hindiVoice) {
            utt.voice = hindiVoice;
            utt.lang = hindiVoice.lang || 'hi-IN';
          } else if (indianVoice) {
            utt.voice = indianVoice;
            utt.lang = indianVoice.lang || 'en-IN';
          } else {
            utt.lang = 'hi-IN';
          }
          utt.rate = slow ? 0.68 : 0.86;
          let started = false;
          utt.onstart = () => {
            started = true;
          };
          utt.onerror = () => {
            if (!started) {
              this.playPedagogicalChant(Math.min(cleanText.split(' ').length + 1, 6));
            }
          };
          setTimeout(() => {
            if (!started && !window.speechSynthesis.speaking) {
              this.playPedagogicalChant(Math.min(cleanText.split(' ').length + 1, 6));
            }
          }, 300);
          window.speechSynthesis.speak(utt);
          return;
        } catch {}
      }
      this.playPedagogicalChant(Math.min(cleanText.split(' ').length + 1, 6));
    };

    const cacheKey = `Kore_${cleanText}`;
    const cached = this.ttsCache.get(cacheKey);
    if (cached) {
      void this.playCachedPcm(cached, slow ? 0.82 : 1.0).then((ok) => {
        if (!ok) speakWithBrowserImmediate();
      });
      return;
    }

    // Warm TTS cache in background for subsequent plays
    if (typeof window !== 'undefined' && navigator.onLine) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3200);
      fetch('/api/tts/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          speakerVoice: 'Kore',
          targetLang: 'Santhali',
        }),
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          clearTimeout(timeoutId);
          if (json && json.success && typeof json.audioBase64 === 'string') {
            this.ttsCache.set(cacheKey, json.audioBase64);
          }
        })
        .catch(() => {
          clearTimeout(timeoutId);
        });
    }

    // Speak immediately on the very first press!
    speakWithBrowserImmediate();
  }
}

export const gameAudio = new SoundEngine();

