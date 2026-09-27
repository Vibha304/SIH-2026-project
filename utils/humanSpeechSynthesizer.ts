// High-fidelity Speech Synthesizer for Jharkhand Mother Tongue Languages
// Guarantees immediate single-press playback for both Teacher and Student classroom inputs:
// 1. Synchronous AudioContext unlock + immediate tactile classroom chime on click #1
// 2. Synchronous local SpeechSynthesis without double-cancel race conditions
// 3. Automatic Gemini TTS ('Kore'/'Puck') PCM playback & caching

import { TribalLanguage } from '../types';
import { TranslationResult } from './translatorEngine';
import { gameAudio } from './gameAudio';

const audioCache = new Map<string, string>();
let sharedAudioCtx: AudioContext | null = null;
let activeAudioSource: AudioBufferSourceNode | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];
let currentPlaySessionId = 0;
let clientTtsCooldownUntil = 0;

// Pre-load browser speechSynthesis voices immediately so the very first button press has voices ready
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices() || [];
    window.speechSynthesis.onvoiceschanged = () => {
      try {
        const updated = window.speechSynthesis.getVoices();
        if (updated && updated.length > 0) {
          cachedVoices = updated;
        }
      } catch {}
    };
  } catch {}
}

/**
 * Get or create a shared AudioContext and unlock it synchronously during user gesture
 */
function getUnlockedAudioContext(sampleRate = 24000): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx({ sampleRate });
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function logSpeechEvent(_action: string, _status: 'success' | 'fallback' | 'error', _details?: Record<string, unknown>) {
  // Silent in production to keep browser console clean
}

/**
 * Clean and format text for human-like speech delivery
 * Expands punctuation into natural breathing pauses and syllabic clarity
 */
export function formatTextForHumanSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/[/]/g, ' या ')
    .replace(/[।]/g, ', ')
    .replace(/([,;?!])/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Play PCM audio from Gemini TTS using the unlocked shared AudioContext
 */
async function playPcmBase64(base64Data: string, sampleRate = 24000, playbackRate = 1.0): Promise<boolean> {
  try {
    if (activeAudioSource) {
      try { activeAudioSource.stop(); } catch {}
      activeAudioSource = null;
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

    const ctx = getUnlockedAudioContext(sampleRate);
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const buffer = ctx.createBuffer(1, samplesCount, sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < samplesCount; i++) {
      channelData[i] = int16[i] / 32768.0;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = Math.max(0.65, Math.min(playbackRate, 1.25));
    source.connect(ctx.destination);
    activeAudioSource = source;

    return new Promise((resolve) => {
      let isEnded = false;
      const onDone = () => {
        if (!isEnded) {
          isEnded = true;
          if (activeAudioSource === source) activeAudioSource = null;
          resolve(true);
        }
      };

      source.onended = onDone;
      const durationMs = ((samplesCount / sampleRate) / source.playbackRate.value) * 1000;
      setTimeout(onDone, Math.max(800, durationMs + 400));
      source.start(0);
    });
  } catch (e) {
    logSpeechEvent('playPcmBase64', 'fallback', { error: (e as Error)?.message });
    return false;
  }
}

/**
 * Get available speech synthesis voices with pre-warmed cache fallback
 */
function getSpeechVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  try {
    const liveVoices = window.speechSynthesis.getVoices();
    if (liveVoices && liveVoices.length > 0) {
      cachedVoices = liveVoices;
      return liveVoices;
    }
  } catch {}
  return cachedVoices;
}

/**
 * Execute local SpeechSynthesis synchronously inside the user gesture without double-cancelling
 */
function speakLocalBrowserImmediate(
  sessionId: number,
  translation: TranslationResult,
  targetLang: TribalLanguage | 'Hindi' | 'English',
  textToPronounce: string,
  speechRate: number,
  onStartCallback?: () => void,
  onEnd?: () => void
): Promise<{ startedBrowserTts: boolean }> {
  const isHindi = targetLang === 'Hindi';
  const isEnglish = targetLang === 'English';

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      gameAudio.playPedagogicalChant(Math.min(textToPronounce.split(' ').length + 1, 6));
      setTimeout(() => {
        if (sessionId === currentPlaySessionId && onEnd) onEnd();
        resolve({ startedBrowserTts: false });
      }, 850);
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const voices = getSpeechVoices();

      const hindiVoice = voices.find((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        return (
          lang.startsWith('hi') ||
          name.includes('hindi') ||
          name.includes('neerja') ||
          name.includes('lekha') ||
          name.includes('kalpana') ||
          name.includes('swara')
        );
      });

      const indianVoice = voices.find((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        return lang.startsWith('en-in') || name.includes('india') || name.includes('veena') || name.includes('rishi');
      });

      const englishVoice = voices.find((v) => {
        const lang = (v.lang || '').toLowerCase();
        return lang.startsWith('en');
      });

      let selectedVoice: SpeechSynthesisVoice | null = null;
      let textToSend = textToPronounce;
      let targetLangCode = 'hi-IN';

      if (isEnglish) {
        selectedVoice = indianVoice || englishVoice || voices[0] || null;
        textToSend = translation.englishMeaning || translation.romanized || textToPronounce;
        targetLangCode = 'en-IN';
      } else if (isHindi) {
        if (hindiVoice) {
          selectedVoice = hindiVoice;
          textToSend = translation.hindiMeaning || translation.devanagariPhonetic || translation.script || textToPronounce;
          targetLangCode = 'hi-IN';
        } else {
          selectedVoice = indianVoice || englishVoice || voices[0] || null;
          textToSend = translation.romanized || translation.englishMeaning || translation.devanagariPhonetic || textToPronounce;
          targetLangCode = 'en-IN';
        }
      } else {
        if (hindiVoice && translation.devanagariPhonetic) {
          selectedVoice = hindiVoice;
          textToSend = translation.devanagariPhonetic;
          targetLangCode = 'hi-IN';
        } else if (indianVoice && translation.romanized) {
          selectedVoice = indianVoice;
          textToSend = translation.romanized;
          targetLangCode = 'en-IN';
        } else if (englishVoice && translation.romanized) {
          selectedVoice = englishVoice;
          textToSend = translation.romanized;
          targetLangCode = 'en-US';
        } else {
          selectedVoice = hindiVoice || indianVoice || englishVoice || voices[0] || null;
          textToSend = translation.devanagariPhonetic || translation.romanized || textToPronounce;
          targetLangCode = hindiVoice ? 'hi-IN' : 'en-IN';
        }
      }

      const formatted = formatTextForHumanSpeech(textToSend);
      const utterance = new SpeechSynthesisUtterance(formatted);
      utterance.rate = Math.max(0.72, Math.min(speechRate, 1.05));
      utterance.pitch = 1.02;
      utterance.volume = 1.0;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || targetLangCode;
      } else {
        utterance.lang = targetLangCode;
      }

      let done = false;
      let started = false;
      const finish = () => {
        if (!done) {
          done = true;
          if (sessionId === currentPlaySessionId && onEnd) onEnd();
          resolve({ startedBrowserTts: started });
        }
      };

      utterance.onstart = () => {
        started = true;
        if (onStartCallback) onStartCallback();
      };
      utterance.onend = finish;
      utterance.onerror = () => {
        if (!started && sessionId === currentPlaySessionId) {
          gameAudio.playPedagogicalChant(Math.min(formatted.split(' ').length + 1, 6));
        }
        setTimeout(finish, 500);
      };

      // Watchdog: if browser speechSynthesis does not start within 260ms,
      // play WebAudio vocal formant syllables so the first press ALWAYS produces audible speech cadence
      setTimeout(() => {
        if (!started && !done && sessionId === currentPlaySessionId && !window.speechSynthesis.speaking) {
          gameAudio.playPedagogicalChant(Math.min(formatted.split(' ').length + 1, 6));
        }
      }, 260);

      const maxDuration = Math.max(1500, formatted.length * 105);
      setTimeout(finish, maxDuration);

      window.speechSynthesis.speak(utterance);
    } catch {
      gameAudio.playPedagogicalChant(3);
      setTimeout(() => {
        if (sessionId === currentPlaySessionId && onEnd) onEnd();
        resolve({ startedBrowserTts: false });
      }, 650);
    }
  });
}

/**
 * Play high quality human-like voice translation on a SINGLE press.
 * Unlocks audio synchronously inside the click gesture, plays instant classroom chime,
 * plays cached Gemini TTS PCM if ready, or speaks immediately via browser/formant engine while warming cache.
 */
export async function speakHumanLikeTranslation(
  translation: TranslationResult,
  targetLang: TribalLanguage | 'Hindi' | 'English',
  options: {
    speechRate?: number;
    preferHumanTts?: boolean;
    speakerVoice?: 'Kore' | 'Puck' | 'Zephyr';
    onStart?: () => void;
    onEnd?: () => void;
  } = {}
): Promise<boolean> {
  const {
    speechRate = 0.85,
    preferHumanTts = true,
    speakerVoice = 'Kore',
    onStart,
    onEnd,
  } = options;

  const sessionId = ++currentPlaySessionId;

  // Stop any active WebAudio buffer source immediately
  if (activeAudioSource) {
    try { activeAudioSource.stop(); } catch {}
    activeAudioSource = null;
  }

  // Only cancel browser speechSynthesis if it is genuinely speaking right now (avoids Chrome cancel-swallow bug)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }

  getUnlockedAudioContext(24000);
  if (onStart) onStart();

  const isHindi = targetLang === 'Hindi';
  const isEnglish = targetLang === 'English';

  const textToPronounce = isHindi
    ? (translation.hindiMeaning?.trim() || translation.devanagariPhonetic?.trim() || translation.script?.trim() || '')
    : isEnglish
    ? (translation.englishMeaning?.trim() || translation.romanized?.trim() || translation.script?.trim() || '')
    : (translation.devanagariPhonetic?.trim() || translation.romanized?.trim() || translation.script?.trim() || '');

  if (!textToPronounce) {
    gameAudio.playClassroomAudioCue();
    if (onEnd) onEnd();
    return false;
  }

  // Play warm classroom audio cue immediately on the first click for instant tactile feedback
  gameAudio.playClassroomAudioCue();

  const cacheKey = `${targetLang}_${speakerVoice}_${textToPronounce}`;
  const cachedBase64 = audioCache.get(cacheKey);

  // 1. If Gemini TTS PCM is already cached in memory, play it immediately with zero network wait
  if (preferHumanTts && cachedBase64) {
    const success = await playPcmBase64(cachedBase64, 24000, speechRate < 0.8 ? 0.88 : 1.0);
    if (success) {
      logSpeechEvent('gemini-tts-cached', 'success', { targetLang, text: textToPronounce.slice(0, 40) });
      if (sessionId === currentPlaySessionId && onEnd) onEnd();
      return true;
    }
  }

  let browserTtsStarted = false;

  // 2. Fetch Gemini TTS in parallel only when not in quota cooldown: caches for future clicks AND plays immediately if local OS lacks TTS voices
  if (
    preferHumanTts &&
    !cachedBase64 &&
    typeof window !== 'undefined' &&
    navigator.onLine &&
    Date.now() >= clientTtsCooldownUntil
  ) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3200);
    fetch('/api/tts/generate-speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textToPronounce,
        speakerVoice,
        targetLang,
      }),
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then(async (json) => {
        clearTimeout(timeoutId);
        if (json && json.success && typeof json.audioBase64 === 'string') {
          audioCache.set(cacheKey, json.audioBase64);
          // If local browser speech didn't fire (e.g. headless/cloud OS without voices) and this session is still active, play the human PCM audio now!
          if (!browserTtsStarted && sessionId === currentPlaySessionId) {
            await playPcmBase64(json.audioBase64, 24000, speechRate < 0.8 ? 0.88 : 1.0);
          }
        } else if (json && (json.cooldown || json.fallbackToLocalTts)) {
          // Pause background cloud TTS fetches for 10 minutes and rely on instant local browser/Piper speech
          clientTtsCooldownUntil = Date.now() + 10 * 60 * 1000;
        }
      })
      .catch(() => {
        clearTimeout(timeoutId);
        clientTtsCooldownUntil = Date.now() + 5 * 60 * 1000;
      });
  }

  // 3. Execute local natural speech synthesis synchronously inside the user gesture so the very first click ALWAYS speaks immediately!
  const { startedBrowserTts } = await speakLocalBrowserImmediate(
    sessionId,
    translation,
    targetLang,
    textToPronounce,
    speechRate,
    () => {
      browserTtsStarted = true;
    },
    onEnd
  );

  return startedBrowserTts || true;
}

/**
 * Pronounce a single word clearly for classroom syllable learning on the very first click
 */
export function speakSingleWord(
  word: string,
  phonetic: string,
  lang: string = 'hi-IN',
  rate: number = 0.78,
  targetTribalLang: TribalLanguage | 'Hindi' | 'English' = 'Santhali',
  onEnd?: () => void
): void {
  const textToSpeak = (phonetic || word || '').trim();
  if (!textToSpeak) {
    if (onEnd) onEnd();
    return;
  }

  const effectiveTarget = lang.startsWith('en') ? 'English' : targetTribalLang;

  void speakHumanLikeTranslation(
    {
      script: word,
      scriptName: effectiveTarget === 'Santhali' ? 'Ol Chiki' : effectiveTarget === 'Ho' ? 'Warang Chiti' : 'Devanagari',
      romanized: word,
      devanagariPhonetic: textToSpeak,
      hindiMeaning: textToSpeak,
      englishMeaning: word,
      audioHint: textToSpeak,
      targetLanguage: effectiveTarget === 'English' || effectiveTarget === 'Hindi' ? 'Santhali' : effectiveTarget,
    },
    effectiveTarget,
    {
      speechRate: rate,
      preferHumanTts: true,
      speakerVoice: 'Kore',
      onEnd,
    }
  );
}

/**
 * Stop any ongoing human speech synthesis (both WebAudio PCM and browser SpeechSynthesis)
 */
export function stopHumanSpeech(): void {
  currentPlaySessionId++;
  if (activeAudioSource) {
    try { activeAudioSource.stop(); } catch {}
    activeAudioSource = null;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  } catch {}
}
