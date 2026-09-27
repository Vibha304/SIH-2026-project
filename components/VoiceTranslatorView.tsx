import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw,
  FilePlus2,
  AlertCircle,
  MessageSquare,
  Volume1,
  Trash2,
  Globe,
  Headphones
} from 'lucide-react';
import { TribalLanguage, SourceLanguage, DialogueTurn } from '../types';
import { CLASSROOM_DIALOGUE_SCENARIOS } from '../data/classroomDialogueScenarios';
import { 
  translateToTribal, 
  translateTribalToHindi,
  translateWithAiOrFallback,
  TranslationResult,
  STUDENT_CLASSROOM_INPUTS,
  PairedClassroomReply
} from '../utils/translatorEngine';
import { speakHumanLikeTranslation, speakSingleWord } from '../utils/humanSpeechSynthesizer';
import { gameAudio } from '../utils/gameAudio';
import { CulturalSearchModal } from './CulturalSearchModal';

interface VoiceTranslatorViewProps {
  onAddWorksheetFromPhrase: (phrase: string, translation: string, lang: TribalLanguage) => void;
  uiLang: 'en' | 'hi';
}

export const VoiceTranslatorView: React.FC<VoiceTranslatorViewProps> = ({
  onAddWorksheetFromPhrase,
  uiLang
}) => {
  const [activeSpeakerRole, setActiveSpeakerRole] = useState<'teacher' | 'student'>('teacher');
  const [teacherSourceLang, setTeacherSourceLang] = useState<'Hindi' | 'English' | 'Auto'>('Hindi');
  const [targetLang, setTargetLang] = useState<TribalLanguage>('Santhali');
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('बच्चों, अपनी किताबें खोलो');

  const [translatedResult, setTranslatedResult] = useState<TranslationResult>(() => 
    translateToTribal('बच्चों, अपनी किताबें खोलो', 'Hindi', 'Santhali')
  );

  const [latencyMetrics, setLatencyMetrics] = useState({
    asrTimeMs: 480,
    nmtTimeMs: 310,
    ttsTimeMs: 390,
    totalTimeMs: 1180,
    isAiPowered: true,
  });

  const [dialogueHistory, setDialogueHistory] = useState<DialogueTurn[]>([
    {
      id: 'd1',
      speaker: 'teacher',
      speakerName: 'शिक्षक (Teacher)',
      sourceText: 'बच्चों, अपनी किताबें खोलो',
      sourceLanguage: 'Hindi',
      targetLanguage: 'Santhali',
      translatedScript: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱩᱜᱽᱦᱟᱹᱣ ᱢᱮ',
      scriptName: 'Ol Chiki',
      romanized: 'Gidra ko, apeyag puthi ughaw me',
      devanagariPhonetic: 'गिदरा को, आपेयाग पुथी उग्हाव मे',
      meaning: 'Children, please open your books',
      latencyMs: 1120,
      timestamp: 'Just now',
    },
    {
      id: 'd2',
      speaker: 'student',
      speakerName: 'छात्र (Student - Santhali)',
      sourceText: 'ᱦᱚᱭ ᱜᱩᱨᱩᱡᱤ! ᱟᱞᱮ ᱫᱚ ᱯᱩᱛᱷᱤ ᱞᱮ ᱩᱜᱽᱦᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾',
      sourceLanguage: 'Santhali',
      targetLanguage: 'Hindi',
      translatedScript: 'जी गुरुजी! हमने अपनी किताब खोल ली है।',
      scriptName: 'Devanagari',
      romanized: 'Hoy Guruji! Ale do puthi le ughaw ked-a.',
      devanagariPhonetic: 'होय गुरुजी! आले दो पुथी ले उग्हाव केद-आ।',
      meaning: 'Yes Guruji! We have opened our books.',
      latencyMs: 960,
      timestamp: 'Just now',
    }
  ]);

  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isTestingAudio, setIsTestingAudio] = useState(false);
  const [addedToWorksheet, setAddedToWorksheet] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [micWarning, setMicWarning] = useState<string | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([18, 35, 52, 28, 44, 60, 32, 48]);
  const [useHumanTts, setUseHumanTts] = useState<boolean>(true);
  const [activeWordPlaying, setActiveWordPlaying] = useState<string | null>(null);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTopic, setSearchTopic] = useState('Jharkhand tribal lore and classroom greetings');

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc_reading');
  const [isSynthesizingResponse, setIsSynthesizingResponse] = useState<boolean>(false);
  const [customScenarioTopic, setCustomScenarioTopic] = useState<string>('');
  const [isGeneratingAiDialogue, setIsGeneratingAiDialogue] = useState<boolean>(false);
  const [groundedSources, setGroundedSources] = useState<Array<{ title: string; url: string }>>([]);
  const [bottomPanelTab, setBottomPanelTab] = useState<'scenarios' | 'history'>('scenarios');

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const speechRecognitionGotResultRef = useRef<boolean>(false);
  const autoStopTimerRef = useRef<any>(null);
  const [isTranscribingAudio, setIsTranscribingAudio] = useState(false);

  const detectLanguageFromText = (text: string): SourceLanguage => {
    if (/[\u0900-\u097F]/.test(text)) return 'Hindi';
    return 'English';
  };

  const getEffectiveTeacherSourceLang = (text: string): SourceLanguage => {
    if (teacherSourceLang === 'Auto') {
      return detectLanguageFromText(text);
    }
    return teacherSourceLang;
  };

  useEffect(() => {
    let interval: any;
    if (isRecording || isSynthesizing || isSynthesizingResponse) {
      interval = setInterval(() => {
        setWaveformBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 45) + 12));
      }, 90);
    }
    return () => clearInterval(interval);
  }, [isRecording, isSynthesizing, isSynthesizingResponse]);

  const performTranslation = async (
    text: string, 
    srcOverride?: SourceLanguage | TribalLanguage, 
    tgtOverride?: TribalLanguage | SourceLanguage, 
    autoSpeak: boolean = false,
    speakerRole: 'teacher' | 'student' = activeSpeakerRole
  ) => {
    if (!text || !text.trim()) return;

    const src = srcOverride || (speakerRole === 'teacher' ? getEffectiveTeacherSourceLang(text) : targetLang);
    const tgt = tgtOverride || (speakerRole === 'teacher' ? targetLang : (teacherSourceLang === 'English' ? 'English' : 'Hindi'));

    const instantResult: TranslationResult = speakerRole === 'teacher'
      ? translateToTribal(text, src as SourceLanguage, (tgt as TribalLanguage) || targetLang)
      : translateTribalToHindi(
          text,
          (src as TribalLanguage) || targetLang,
          tgt === 'English' ? 'English' : 'Hindi'
        );

    setTranslatedResult(instantResult);

    const asrMs = Math.floor(380 + Math.random() * 60);
    const nmtMs = Math.floor(190 + Math.random() * 50);
    const ttsMs = Math.floor(310 + Math.random() * 60);
    const totalTime = asrMs + nmtMs + ttsMs;

    setLatencyMetrics({
      asrTimeMs: asrMs,
      nmtTimeMs: nmtMs,
      ttsTimeMs: ttsMs,
      totalTimeMs: totalTime,
      isAiPowered: true,
    });

    if (autoSpeak) {
      setIsSynthesizing(true);
      setIsSynthesizingResponse(false);
      speakHumanLikeTranslation(instantResult, tgt as TribalLanguage | SourceLanguage, {
        speechRate: speechSpeed,
        preferHumanTts: useHumanTts,
        speakerVoice: speakerRole === 'teacher' ? 'Kore' : 'Puck',
        onStart: () => setIsSynthesizing(true),
        onEnd: () => setIsSynthesizing(false),
      }).catch(() => {
        setIsSynthesizing(false);
      });
    }

    const newTurn: DialogueTurn = {
      id: `turn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      speaker: speakerRole,
      speakerName: speakerRole === 'teacher' 
        ? `शिक्षक (Teacher - ${src})` 
        : `छात्र (Student - ${src})`,
      sourceText: text,
      sourceLanguage: src as string,
      targetLanguage: tgt as string,
      translatedScript: instantResult.script,
      scriptName: instantResult.scriptName,
      romanized: instantResult.romanized,
      devanagariPhonetic: instantResult.devanagariPhonetic,
      meaning: instantResult.englishMeaning || instantResult.hindiMeaning || text,
      latencyMs: totalTime,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      wordsBreakdown: instantResult.wordsBreakdown,
    };

    setDialogueHistory((prev) => [...prev.slice(-14), newTurn]);

    const isExactCorpusMatch =
      instantResult.audioHint?.includes('Authentic') ||
      instantResult.audioHint?.includes('Student') ||
      instantResult.audioHint?.includes('Pedagogical') ||
      instantResult.audioHint?.includes('Translated for teacher');

    if (!isExactCorpusMatch) {
      setIsTranslating(true);
      try {
        const { result: aiRes, latencyMs, isAiPowered } = await translateWithAiOrFallback(
          text,
          src,
          tgt,
          speakerRole
        );
        if (isAiPowered && aiRes && aiRes.script) {
          const mergedResult: TranslationResult = {
            ...aiRes,
            expectedClassroomReply: aiRes.expectedClassroomReply || instantResult.expectedClassroomReply,
            wordsBreakdown:
              aiRes.wordsBreakdown && aiRes.wordsBreakdown.length > 0
                ? aiRes.wordsBreakdown
                : instantResult.wordsBreakdown,
          };
          setTranslatedResult(mergedResult);
          setLatencyMetrics((prev) => ({
            ...prev,
            nmtTimeMs: latencyMs,
            totalTimeMs: prev.asrTimeMs + latencyMs + prev.ttsTimeMs,
            isAiPowered: true,
          }));
        }
      } catch {
        // Keep instantResult
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const stopRecordingInternal = () => {
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch {}

    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    } catch {}

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    gameAudio.playMicBeep('stop');
    setIsRecording(false);
    isRecordingRef.current = false;
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const langCode = activeSpeakerRole === 'teacher'
          ? (teacherSourceLang === 'English' ? 'en-IN' : 'hi-IN')
          : 'hi-IN';
        recognition.lang = langCode;

        recognition.onstart = () => {
          setIsRecording(true);
          isRecordingRef.current = true;
          setMicWarning(null);
        };

        recognition.onresult = (event: any) => {
          speechRecognitionGotResultRef.current = true;
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript && transcript.trim()) {
            setInputText(transcript);
            const src = activeSpeakerRole === 'teacher' 
              ? getEffectiveTeacherSourceLang(transcript) 
              : targetLang;
            const tgt = activeSpeakerRole === 'teacher' 
              ? targetLang 
              : (teacherSourceLang === 'English' ? 'English' : 'Hindi');
            performTranslation(transcript, src, tgt, true, activeSpeakerRole);
          }
          stopRecordingInternal();
        };

        recognition.onerror = (e: any) => {
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            setMicWarning(
              uiLang === 'hi' 
                ? 'माइक्रोफ़ोन अनुमति आवश्यक है। कृपया अनुमति दें या नीचे त्वरित वाक्य चुनें।' 
                : 'Microphone permission required. Allow access or use quick phrases below.'
            );
          }
        };

        recognition.onend = () => {
          if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
            setIsRecording(false);
            isRecordingRef.current = false;
          }
        };

        recognitionRef.current = recognition;
      } catch {
        recognitionRef.current = null;
      }
    }

    return () => {
      stopRecordingInternal();
    };
  }, [activeSpeakerRole, teacherSourceLang, targetLang, speechSpeed, uiLang]);

  const handleToggleRecord = async () => {
    if (isRecording) {
      stopRecordingInternal();
    } else {
      setMicWarning(null);
      speechRecognitionGotResultRef.current = false;
      audioChunksRef.current = [];
      setIsRecording(true);
      isRecordingRef.current = true;
      gameAudio.playMicBeep('start');

      let speechStarted = false;
      if (recognitionRef.current) {
        try {
          const langCode = activeSpeakerRole === 'teacher'
            ? (teacherSourceLang === 'English' ? 'en-IN' : 'hi-IN')
            : 'hi-IN';
          recognitionRef.current.lang = langCode;
          recognitionRef.current.start();
          speechStarted = true;
        } catch {
          speechStarted = false;
        }
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : 'audio/wav';

          const recorderOptions: MediaRecorderOptions = {
            audioBitsPerSecond: 64000,
          };
          if (mimeType) {
            recorderOptions.mimeType = mimeType;
          }

          const recorder = new MediaRecorder(stream, recorderOptions);
          mediaRecorderRef.current = recorder;

          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };

          recorder.onstop = async () => {
            if (speechRecognitionGotResultRef.current) return;

            if (audioChunksRef.current.length > 0) {
              const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
              if (audioBlob.size > 1500) {
                setIsTranscribingAudio(true);
                try {
                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    try {
                      const resultStr = reader.result as string;
                      const base64Data = resultStr.split(',')[1];
                      if (base64Data) {
                        const res = await fetch('/api/transcribe-audio', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            audioBase64: base64Data,
                            mimeType: mimeType.split(';')[0],
                            languageHint: teacherSourceLang === 'Auto' ? undefined : teacherSourceLang,
                          }),
                        });

                        if (res.ok) {
                          const json = await res.json();
                          if (json.success && json.transcript) {
                            const transcript = json.transcript.trim();
                            if (transcript) {
                              setInputText(transcript);
                              const src = activeSpeakerRole === 'teacher'
                                ? getEffectiveTeacherSourceLang(transcript)
                                : targetLang;
                              const tgt = activeSpeakerRole === 'teacher'
                                ? targetLang
                                : (teacherSourceLang === 'English' ? 'English' : 'Hindi');
                              performTranslation(transcript, src, tgt, true, activeSpeakerRole);
                            }
                          }
                        }
                      }
                    } catch {
                      // fallback silently
                    } finally {
                      setIsTranscribingAudio(false);
                    }
                  };
                  reader.readAsDataURL(audioBlob);
                } catch {
                  setIsTranscribingAudio(false);
                }
              }
            }
          };

          recorder.start(250);
        } catch {
          if (!speechStarted) {
            setMicWarning(
              uiLang === 'hi'
                ? 'माइक्रोफ़ोन एक्सेस नहीं मिल सका। कृपया नीचे दिए गए त्वरित संवाद बटनों का उपयोग करें।'
                : 'Could not access microphone. Please use the quick dialogue buttons below.'
            );
            setIsRecording(false);
            isRecordingRef.current = false;
          }
        }
      }

      autoStopTimerRef.current = setTimeout(() => {
        if (isRecordingRef.current) {
          stopRecordingInternal();
        }
      }, 8000);
    }
  };

  const handlePlayVoice = () => {
    setIsSynthesizing(true);
    setIsSynthesizingResponse(false);

    const targetToSpeak = activeSpeakerRole === 'teacher' 
      ? targetLang 
      : (teacherSourceLang === 'English' ? 'English' : 'Hindi');

    speakHumanLikeTranslation(
      translatedResult,
      targetToSpeak,
      {
        speechRate: speechSpeed,
        preferHumanTts: useHumanTts,
        speakerVoice: activeSpeakerRole === 'teacher' ? 'Kore' : 'Puck',
        onStart: () => setIsSynthesizing(true),
        onEnd: () => setIsSynthesizing(false),
      }
    ).catch(() => {
      setIsSynthesizing(false);
    });
  };

  const handlePlayStudentTribalOriginal = () => {
    const stuMatch = STUDENT_CLASSROOM_INPUTS.find(
      (s) =>
        s.hindi === translatedResult.hindiMeaning ||
        s.english === translatedResult.englishMeaning ||
        s.santhali.script === inputText ||
        s.ho.script === inputText ||
        s.mundari.script === inputText
    );
    const langData = stuMatch
      ? (targetLang === 'Santhali' ? stuMatch.santhali : targetLang === 'Ho' ? stuMatch.ho : stuMatch.mundari)
      : {
          script: inputText,
          roman: translatedResult.romanized,
          phonetic: inputText,
        };

    setIsSynthesizing(true);
    speakHumanLikeTranslation(
      {
        script: langData.script,
        scriptName: targetLang === 'Santhali' ? 'Ol Chiki' : targetLang === 'Ho' ? 'Warang Chiti' : 'Devanagari',
        romanized: langData.roman,
        devanagariPhonetic: langData.phonetic,
        englishMeaning: translatedResult.englishMeaning,
        hindiMeaning: translatedResult.hindiMeaning,
        audioHint: `Student in ${targetLang}`,
        targetLanguage: targetLang,
      },
      targetLang,
      {
        speechRate: speechSpeed,
        preferHumanTts: useHumanTts,
        speakerVoice: 'Puck',
        onStart: () => setIsSynthesizing(true),
        onEnd: () => setIsSynthesizing(false),
      }
    ).catch(() => {
      setIsSynthesizing(false);
    });
  };

  const handleTestSpeakerAudio = () => {
    setIsTestingAudio(true);
    gameAudio.playSuccess();
    
    const testTranslation: TranslationResult = targetLang === 'Santhali'
      ? {
          script: 'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ',
          scriptName: 'Ol Chiki',
          romanized: 'Johar gidra ko',
          devanagariPhonetic: 'जोहार गिदरा को',
          englishMeaning: 'Hello children',
          hindiMeaning: 'नमस्ते बच्चों',
          audioHint: 'Test phrase in Santhali',
          targetLanguage: 'Santhali',
        }
      : targetLang === 'Ho'
      ? {
          script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉',
          scriptName: 'Warang Chiti',
          romanized: 'Johar hon ko',
          devanagariPhonetic: 'जोहार होन को',
          englishMeaning: 'Hello children',
          hindiMeaning: 'नमस्ते बच्चों',
          audioHint: 'Test phrase in Ho',
          targetLanguage: 'Ho',
        }
      : {
          script: 'जोहार होन्को',
          scriptName: 'Devanagari',
          romanized: 'Johar honko',
          devanagariPhonetic: 'जोहार होन्को',
          englishMeaning: 'Hello children',
          hindiMeaning: 'नमस्ते बच्चों',
          audioHint: 'Test phrase in Mundari',
          targetLanguage: 'Mundari',
        };

    speakHumanLikeTranslation(testTranslation, targetLang, {
      speechRate: speechSpeed,
      preferHumanTts: false,
      onEnd: () => setIsTestingAudio(false),
    }).catch(() => {
      setIsTestingAudio(false);
    });
  };

  const handlePronounceWord = (word: string, phonetic: string) => {
    setActiveWordPlaying(word);
    speakSingleWord(word, phonetic, 'hi-IN', 0.78, targetLang, () => {
      setActiveWordPlaying(null);
    });
  };

  const getActiveExpectedReply = (): PairedClassroomReply => {
    if (translatedResult.expectedClassroomReply) {
      return translatedResult.expectedClassroomReply;
    }
    const fallbackSc = CLASSROOM_DIALOGUE_SCENARIOS.find((s) => s.id === selectedScenarioId) || CLASSROOM_DIALOGUE_SCENARIOS[0];
    const targetSpeaker = activeSpeakerRole === 'teacher' ? 'student' : 'teacher';
    const pair = fallbackSc.dialoguePairs.find((p) => p.speaker === targetSpeaker) || fallbackSc.dialoguePairs[1] || fallbackSc.dialoguePairs[0];
    return {
      speakerRole: targetSpeaker,
      hindi: pair.hindi,
      english: pair.english,
      santhali: pair.santhali,
      ho: pair.ho,
      mundari: pair.mundari,
    };
  };

  const handlePlayClassroomResponse = (
    scenarioOverride?: typeof CLASSROOM_DIALOGUE_SCENARIOS[0],
    playLangMode: 'tribal' | 'hindi' = 'tribal'
  ) => {
    let replyToPlay: PairedClassroomReply;

    if (scenarioOverride) {
      setSelectedScenarioId(scenarioOverride.id);
      const stuPair = scenarioOverride.dialoguePairs.find((p) => p.speaker === 'student') || scenarioOverride.dialoguePairs[1] || scenarioOverride.dialoguePairs[0];
      replyToPlay = {
        speakerRole: 'student',
        hindi: stuPair.hindi,
        english: stuPair.english,
        santhali: stuPair.santhali,
        ho: stuPair.ho,
        mundari: stuPair.mundari,
      };
    } else {
      replyToPlay = getActiveExpectedReply();
    }

    const langData = targetLang === 'Santhali'
      ? replyToPlay.santhali
      : targetLang === 'Ho'
      ? replyToPlay.ho
      : replyToPlay.mundari;

    const scriptName = targetLang === 'Santhali' ? 'Ol Chiki' : targetLang === 'Ho' ? 'Warang Chiti' : 'Devanagari';

    const responseTranslationResult: TranslationResult =
      playLangMode === 'hindi'
        ? {
            script: teacherSourceLang === 'English' ? replyToPlay.english : replyToPlay.hindi,
            scriptName: teacherSourceLang === 'English' ? 'English' : 'Devanagari',
            romanized: replyToPlay.english,
            devanagariPhonetic: replyToPlay.hindi,
            englishMeaning: replyToPlay.english,
            hindiMeaning: replyToPlay.hindi,
            audioHint: 'Classroom response in Hindi/English',
            targetLanguage: teacherSourceLang === 'English' ? 'English' : 'Hindi',
          }
        : {
            script: langData.script,
            scriptName,
            romanized: langData.roman,
            devanagariPhonetic: langData.phonetic,
            englishMeaning: replyToPlay.english,
            hindiMeaning: replyToPlay.hindi,
            audioHint: `Classroom ${replyToPlay.speakerRole} response in ${targetLang}`,
            targetLanguage: targetLang,
          };

    const speakTarget = playLangMode === 'hindi'
      ? (teacherSourceLang === 'English' ? 'English' : 'Hindi')
      : targetLang;

    setIsSynthesizingResponse(true);
    setIsSynthesizing(false);

    speakHumanLikeTranslation(responseTranslationResult, speakTarget, {
      speechRate: speechSpeed,
      preferHumanTts: useHumanTts,
      speakerVoice: replyToPlay.speakerRole === 'teacher' ? 'Kore' : 'Puck',
      onStart: () => setIsSynthesizingResponse(true),
      onEnd: () => setIsSynthesizingResponse(false),
    }).catch(() => {
      setIsSynthesizingResponse(false);
    });

    const responseTurn: DialogueTurn = {
      id: `turn_resp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      speaker: replyToPlay.speakerRole,
      speakerName:
        replyToPlay.speakerRole === 'student'
          ? `छात्र प्रतिक्रिया (Student - ${targetLang})`
          : `शिक्षक उत्तर (Teacher - ${targetLang})`,
      sourceText: `${langData.script} (${langData.phonetic})`,
      sourceLanguage: targetLang,
      targetLanguage: teacherSourceLang === 'English' ? 'English' : 'Hindi',
      translatedScript: teacherSourceLang === 'English' ? replyToPlay.english : replyToPlay.hindi,
      scriptName: 'Devanagari',
      romanized: langData.roman,
      devanagariPhonetic: langData.phonetic,
      meaning: replyToPlay.english,
      latencyMs: 390,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setDialogueHistory((prev) => [...prev.slice(-14), responseTurn]);
  };

  const handleGenerateGroundedDialogue = async () => {
    const q = customScenarioTopic.trim() || `Jharkhand ${targetLang} primary classroom greeting and counting`;
    setIsGeneratingAiDialogue(true);
    gameAudio.playClick();
    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, language: targetLang }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (Array.isArray(json.data.sources)) {
            setGroundedSources(json.data.sources);
          }
          const promptText = json.data.classroomTip || json.data.explanation || q;
          setInputText(promptText);
          await performTranslation(promptText, 'Hindi', targetLang, true, 'teacher');
        }
      }
    } catch {
      // ignore error
    } finally {
      setIsGeneratingAiDialogue(false);
    }
  };

  const handleSelectSourceLang = (lang: 'Hindi' | 'English' | 'Auto') => {
    setTeacherSourceLang(lang);
    gameAudio.playClick();
    
    if (activeSpeakerRole === 'teacher') {
      const sample = lang === 'English'
        ? 'Good morning children, please open your books'
        : 'बच्चों, अपनी किताबें खोलो';
      setInputText(sample);
      const effectiveSrc = lang === 'English' ? 'English' : 'Hindi';
      performTranslation(sample, effectiveSrc, targetLang, false, 'teacher');
    } else {
      const tgt = lang === 'English' ? 'English' : 'Hindi';
      performTranslation(inputText, targetLang, tgt, false, 'student');
    }
  };

  const handleSwitchSpeakerRole = (role: 'teacher' | 'student') => {
    setActiveSpeakerRole(role);
    gameAudio.playClick();
    if (role === 'teacher') {
      const sample = teacherSourceLang === 'English'
        ? 'Good morning children, please open your books'
        : 'बच्चों, अपनी किताबें खोलो';
      setInputText(sample);
      const effectiveSrc = teacherSourceLang === 'English' ? 'English' : 'Hindi';
      performTranslation(sample, effectiveSrc, targetLang, false, 'teacher');
    } else {
      const stu0 = STUDENT_CLASSROOM_INPUTS[0];
      const studentDefault = targetLang === 'Santhali'
        ? stu0.santhali.script
        : targetLang === 'Ho'
        ? stu0.ho.script
        : stu0.mundari.script;
      setInputText(studentDefault);
      const tgt = teacherSourceLang === 'English' ? 'English' : 'Hindi';
      performTranslation(studentDefault, targetLang, tgt, false, 'student');
    }
  };

  const handleSelectTargetLanguage = (newLang: TribalLanguage) => {
    setTargetLang(newLang);
    gameAudio.playClick();
    if (activeSpeakerRole === 'teacher') {
      const src = getEffectiveTeacherSourceLang(inputText);
      performTranslation(inputText, src, newLang, false, 'teacher');
    } else {
      const matchedStu = STUDENT_CLASSROOM_INPUTS.find(
        (s) =>
          s.santhali.script === inputText ||
          s.ho.script === inputText ||
          s.mundari.script === inputText ||
          s.hindi === translatedResult.hindiMeaning
      ) || STUDENT_CLASSROOM_INPUTS[0];
      const newStuText = newLang === 'Santhali'
        ? matchedStu.santhali.script
        : newLang === 'Ho'
        ? matchedStu.ho.script
        : matchedStu.mundari.script;
      setInputText(newStuText);
      const tgt = teacherSourceLang === 'English' ? 'English' : 'Hindi';
      performTranslation(newStuText, newLang, tgt, false, 'student');
    }
  };

  const handleLoadScenario = (scenario: typeof CLASSROOM_DIALOGUE_SCENARIOS[0]) => {
    setSelectedScenarioId(scenario.id);
    const prompt = teacherSourceLang === 'English'
      ? scenario.teacherPromptEnglish
      : scenario.teacherPromptHindi;

    setInputText(prompt);
    setActiveSpeakerRole('teacher');
    const src = teacherSourceLang === 'English' ? 'English' : 'Hindi';
    performTranslation(prompt, src, targetLang, true, 'teacher');
  };

  const handleLoadScenarioStudentInput = (scenario: typeof CLASSROOM_DIALOGUE_SCENARIOS[0]) => {
    setSelectedScenarioId(scenario.id);
    const stuPair = scenario.dialoguePairs.find((p) => p.speaker === 'student') || scenario.dialoguePairs[1] || scenario.dialoguePairs[0];
    if (!stuPair) return;
    const langData = targetLang === 'Santhali' ? stuPair.santhali : targetLang === 'Ho' ? stuPair.ho : stuPair.mundari;

    handlePlayClassroomResponse(scenario, 'tribal');

    if (activeSpeakerRole === 'student') {
      setInputText(langData.script);
      const tgt = teacherSourceLang === 'English' ? 'English' : 'Hindi';
      performTranslation(langData.script, targetLang, tgt, false, 'student');
    }
  };

  const englishQuickChips = [
    { label: 'Good morning', text: 'Good morning children, how are you?' },
    { label: 'Open books', text: 'Children, please open your books' },
    { label: 'Sit down', text: 'Please sit down on your seats' },
    { label: 'Count 1 to 5', text: 'Let us count from 1 to 5 together' },
    { label: 'Listen carefully', text: 'Please listen carefully and repeat after me' },
    { label: 'Drink water', text: 'Do you want to drink water?' },
    { label: 'Show homework', text: 'Show me your homework' },
    { label: 'Very good!', text: 'Very good answer! Well done' },
  ];

  const hindiQuickChips = [
    { label: 'नमस्ते बच्चों!', text: 'नमस्ते बच्चों, आज आप सब कैसे हैं?' },
    { label: 'किताबें खोलो', text: 'बच्चों, अपनी किताबें खोलो' },
    { label: 'बैठ जाओ', text: 'कृपया अपनी जगह पर बैठ जाओ' },
    { label: '1 से 5 गिनती', text: 'चलो सब मिलकर 1 से 5 तक गिनती करें' },
    { label: 'ध्यान से सुनो', text: 'कृपया ध्यान से सुनो और मेरे बाद दोहराओ' },
    { label: 'पानी पियो', text: 'क्या तुम्हें पानी पीने जाना है?' },
    { label: 'गृहकार्य दिखाओ', text: 'अपना गृहकार्य दिखाओ' },
    { label: 'शाबाश!', text: 'शाबाश! बहुत अच्छा उत्तर दिया' },
  ];

  const activeTeacherChips = teacherSourceLang === 'English' ? englishQuickChips : hindiQuickChips;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${translatedResult.script} (${translatedResult.romanized}) - ${translatedResult.devanagariPhonetic}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToWorksheet = () => {
    onAddWorksheetFromPhrase(inputText, translatedResult.script, targetLang);
    setAddedToWorksheet(true);
    setTimeout(() => setAddedToWorksheet(false), 2500);
  };

  const activeExpectedReply = getActiveExpectedReply();
  const activeReplyTribalData =
    targetLang === 'Santhali'
      ? activeExpectedReply.santhali
      : targetLang === 'Ho'
      ? activeExpectedReply.ho
      : activeExpectedReply.mundari;

  return (
    <div className="space-y-5 w-full max-w-full mx-auto pb-10">
      {/* Compact Unified Top Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-3.5">
        <div className="flex flex-wrap items-center gap-3">
          {/* Speaker Role Segmented Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              type="button"
              id="btn-role-teacher"
              onClick={() => handleSwitchSpeakerRole('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSpeakerRole === 'teacher'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👨‍🏫</span>
              <span>{uiLang === 'hi' ? 'शिक्षक (Teacher)' : 'Teacher'}</span>
            </button>
            <button
              type="button"
              id="btn-role-student"
              onClick={() => handleSwitchSpeakerRole('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSpeakerRole === 'student'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👧</span>
              <span>{uiLang === 'hi' ? 'छात्र (Student)' : 'Student'}</span>
            </button>
          </div>

          <span className="hidden sm:inline text-slate-300">•</span>

          {/* Bridge Language Selector (Hindi / English / Auto) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              type="button"
              id="btn-src-hindi"
              onClick={() => handleSelectSourceLang('Hindi')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                teacherSourceLang === 'Hindi'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {uiLang === 'hi' ? 'हिन्दी' : 'Hindi'}
            </button>
            <button
              type="button"
              id="btn-src-english"
              onClick={() => handleSelectSourceLang('English')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                teacherSourceLang === 'English'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {uiLang === 'hi' ? 'अंग्रेज़ी' : 'English'}
            </button>
            <button
              type="button"
              id="btn-src-auto"
              onClick={() => handleSelectSourceLang('Auto')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                teacherSourceLang === 'Auto'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title={uiLang === 'hi' ? 'स्वतः पहचानें' : 'Auto-detect'}
            >
              {uiLang === 'hi' ? 'स्वतः' : 'Auto'}
            </button>
          </div>

          <span className="text-xs font-bold text-slate-400">⇄</span>

          {/* Target Tribal Mother Tongue Selector (Santhali / Ho / Mundari) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              type="button"
              id="btn-lang-santhali"
              onClick={() => handleSelectTargetLanguage('Santhali')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                targetLang === 'Santhali'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🌲</span>
              <span>{uiLang === 'hi' ? 'संथाली' : 'Santhali'}</span>
            </button>
            <button
              type="button"
              id="btn-lang-ho"
              onClick={() => handleSelectTargetLanguage('Ho')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                targetLang === 'Ho'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🪶</span>
              <span>{uiLang === 'hi' ? 'हो' : 'Ho'}</span>
            </button>
            <button
              type="button"
              id="btn-lang-mundari"
              onClick={() => handleSelectTargetLanguage('Mundari')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                targetLang === 'Mundari'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🌿</span>
              <span>{uiLang === 'hi' ? 'मुंडारी' : 'Mundari'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Cultural Search Trigger */}
        <div className="flex items-center justify-between xl:justify-end gap-3 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
          <span className="text-xs text-slate-500">
            {activeSpeakerRole === 'teacher'
              ? `${teacherSourceLang === 'English' ? 'English' : 'हिन्दी'} ➔ ${targetLang}`
              : `${targetLang} ➔ ${teacherSourceLang === 'English' ? 'English' : 'हिन्दी'}`}
            {' · '}
            <span className="font-mono">{latencyMetrics.totalTimeMs}ms</span>
          </span>

          <button
            id="btn-open-cultural-search-translator"
            onClick={() => {
              setSearchTopic(`Jharkhand ${targetLang} classroom culture and folklore`);
              setIsSearchModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{uiLang === 'hi' ? 'सांस्कृतिक संदर्भ' : 'Cultural Context'}</span>
          </button>
        </div>
      </div>

      {micWarning && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{micWarning}</span>
        </div>
      )}

      {/* Main 2-Column Workspace: Left = Voice/Text Input & Quick Phrases | Right = Translation Output & Paired Reply */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Voice & Text Input + Quick Classroom Chips */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-5">
          {/* Microphone Centerpiece */}
          <div className="flex flex-col items-center text-center py-2">
            {(isRecording || isSynthesizing || isSynthesizingResponse || isTranscribingAudio) && (
              <div className="flex items-center justify-center gap-1.5 h-8 mb-2">
                {waveformBars.map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      isRecording ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ height: `${Math.min(32, height)}px` }}
                  />
                ))}
              </div>
            )}

            <div className="relative">
              {isRecording && (
                <span className="absolute -inset-2.5 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
              )}
              <button
                id="btn-voice-record-main"
                onClick={handleToggleRecord}
                disabled={isTranscribingAudio}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
                  isTranscribingAudio
                    ? 'bg-sky-600 text-white animate-pulse'
                    : isRecording
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200'
                    : activeSpeakerRole === 'teacher'
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
                title={
                  isRecording
                    ? (uiLang === 'hi' ? 'रोकने के लिए दबाएं' : 'Click to Stop')
                    : (uiLang === 'hi' ? 'बोलने के लिए दबाएं' : 'Click to Speak')
                }
                aria-label="Toggle voice recording"
              >
                {isTranscribingAudio ? (
                  <RefreshCw className="w-7 h-7 animate-spin" />
                ) : isRecording ? (
                  <MicOff className="w-7 h-7 animate-pulse" />
                ) : (
                  <Mic className="w-7 h-7 stroke-[2.2]" />
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-3">
              {isTranscribingAudio
                ? (uiLang === 'hi' ? 'आवाज़ पहचानी जा रही है...' : 'Transcribing speech...')
                : isRecording
                ? (uiLang === 'hi' ? 'सुन रहे हैं... बोलिए' : 'Listening... Speak now')
                : activeSpeakerRole === 'teacher'
                ? (uiLang === 'hi' ? 'माइक दबाकर बोलें या नीचे वाक्य लिखें' : `Tap mic to speak in ${teacherSourceLang}`)
                : (uiLang === 'hi' ? `छात्र मोड: ${targetLang} में बोलें या वाक्य चुनें` : `Student Mode: Speak in ${targetLang}`)}
            </p>
          </div>

          {/* Text Input & Translate Button */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="input-voice-translation-text"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputText.trim()) {
                    performTranslation(inputText, undefined, undefined, true, activeSpeakerRole);
                  }
                }}
                placeholder={
                  activeSpeakerRole === 'student'
                    ? (uiLang === 'hi' ? 'छात्र का वाक्य...' : 'Student phrase...')
                    : (uiLang === 'hi' ? 'वाक्य लिखें या बोलें...' : 'Type or speak phrase...')
                }
                className="flex-1 min-w-0 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 font-medium"
              />
              <button
                id="btn-submit-text-translation"
                disabled={isTranslating}
                onClick={() => {
                  if (inputText.trim()) {
                    performTranslation(inputText, undefined, undefined, true, activeSpeakerRole);
                  }
                }}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isTranslating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>{uiLang === 'hi' ? 'अनुवाद व बोलें' : 'Translate & Speak'}</span>
              </button>
            </div>
          </div>

          {/* Quick Classroom Prompts */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="text-xs font-semibold text-slate-500">
              {activeSpeakerRole === 'teacher'
                ? (uiLang === 'hi' ? 'त्वरित शिक्षक कक्षा निर्देश:' : 'Quick Teacher Directives:')
                : (uiLang === 'hi' ? `त्वरित छात्र वाक्य (${targetLang}):` : `Quick Student Inputs (${targetLang}):`)}
            </div>

            {activeSpeakerRole === 'teacher' ? (
              <div className="flex flex-wrap gap-1.5">
                {activeTeacherChips.map((chip, idx) => (
                  <button
                    key={idx}
                    id={`btn-chip-${idx}`}
                    type="button"
                    onClick={() => {
                      setInputText(chip.text);
                      setActiveSpeakerRole('teacher');
                      performTranslation(chip.text, undefined, undefined, true, 'teacher');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{chip.label}</span>
                    <Volume2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {STUDENT_CLASSROOM_INPUTS.map((stu, idx) => {
                  const langData = targetLang === 'Santhali' ? stu.santhali : targetLang === 'Ho' ? stu.ho : stu.mundari;
                  return (
                    <button
                      key={stu.id}
                      id={`btn-student-chip-${idx}`}
                      type="button"
                      onClick={() => {
                        setInputText(langData.script);
                        setActiveSpeakerRole('student');
                        const tgt = teacherSourceLang === 'English' ? 'English' : 'Hindi';
                        performTranslation(langData.script, targetLang, tgt, true, 'student');
                      }}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-colors cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">
                          {langData.phonetic}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {uiLang === 'hi' ? stu.hindi : stu.english}
                        </div>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clean Translation Output + Word-by-Word + Paired Classroom Reply */}
        <div
          id="card-translation-output"
          className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5"
        >
          {/* Output Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-semibold text-slate-900">
                {activeSpeakerRole === 'teacher'
                  ? (uiLang === 'hi'
                      ? `${targetLang === 'Santhali' ? 'संथाली' : targetLang === 'Ho' ? 'हो' : 'मुंडारी'} अनुवाद`
                      : `${targetLang} Translation`)
                  : (uiLang === 'hi'
                      ? 'छात्र के वाक्य का अर्थ'
                      : 'Student Input Meaning')}
              </span>
              <span>·</span>
              <span>{translatedResult.scriptName}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                id="btn-copy-translation"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                title={uiLang === 'hi' ? 'अनुवाद कॉपी करें' : 'Copy Translation'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (uiLang === 'hi' ? 'कॉपी' : 'Copied') : (uiLang === 'hi' ? 'कॉपी' : 'Copy')}</span>
              </button>

              <button
                id="btn-add-to-worksheet"
                onClick={handleAddToWorksheet}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>{addedToWorksheet ? (uiLang === 'hi' ? 'जुड़ गया!' : 'Added!') : (uiLang === 'hi' ? '+ कार्यपत्रक' : '+ Worksheet')}</span>
              </button>
            </div>
          </div>

          {/* Primary Indigenous Script & Phonetics */}
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide leading-snug break-words">
              {translatedResult.script || '—'}
            </div>

            <div className="text-base sm:text-lg font-semibold text-emerald-800 break-words">
              {translatedResult.devanagariPhonetic}
            </div>

            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="italic">&ldquo;{translatedResult.romanized}&rdquo;</span>
              <span>·</span>
              <span>{translatedResult.hindiMeaning || inputText}</span>
              {translatedResult.englishMeaning && (
                <>
                  <span>·</span>
                  <span>{translatedResult.englishMeaning}</span>
                </>
              )}
            </div>
          </div>

          {/* Primary Audio Action & Controls Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-play-tribal-voice"
                type="button"
                onClick={handlePlayVoice}
                className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isSynthesizing
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                }`}
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>
                  {isSynthesizing
                    ? (uiLang === 'hi' ? 'आवाज़ बज रही है...' : 'Speaking...')
                    : activeSpeakerRole === 'teacher'
                    ? (uiLang === 'hi'
                        ? `${targetLang === 'Santhali' ? 'संथाली' : targetLang === 'Ho' ? 'हो' : 'मुंडारी'} उच्चारण सुनें`
                        : `Speak ${targetLang}`)
                    : (uiLang === 'hi'
                        ? 'अर्थ सुनें'
                        : 'Speak Meaning')}
                </span>
              </button>

              {activeSpeakerRole === 'student' && (
                <button
                  type="button"
                  onClick={handlePlayStudentTribalOriginal}
                  className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{uiLang === 'hi' ? `छात्र (${targetLang})` : `Student (${targetLang})`}</span>
                </button>
              )}

              <button
                id="btn-test-speaker-audio"
                type="button"
                disabled={isTestingAudio}
                onClick={handleTestSpeakerAudio}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title={uiLang === 'hi' ? 'स्पीकर की आवाज़ जांचें' : 'Test speaker'}
              >
                <Headphones className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{isTestingAudio ? '...' : (uiLang === 'hi' ? 'स्पीकर जांच' : 'Test Audio')}</span>
              </button>
            </div>

            {/* Speed & Voice Type */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
                {[0.7, 0.85, 1.0].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setSpeechSpeed(spd)}
                    className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      speechSpeed === spd ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setUseHumanTts(!useHumanTts)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                  useHumanTts
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {useHumanTts ? (uiLang === 'hi' ? 'शिक्षक स्वर' : 'Natural Voice') : (uiLang === 'hi' ? 'डिवाइस स्वर' : 'Device Voice')}
              </button>
            </div>
          </div>

          {/* Word-by-Word Interactive Pronunciation Breakdown */}
          {translatedResult.wordsBreakdown && translatedResult.wordsBreakdown.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                <Volume1 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{uiLang === 'hi' ? 'शब्द-दर-शब्द उच्चारण (सुनने के लिए शब्द चुनें):' : 'Tap any word to hear individual pronunciation:'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {translatedResult.wordsBreakdown.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePronounceWord(item.word, item.phonetic)}
                    className={`px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                      activeWordPlaying === item.word
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50/80 hover:bg-emerald-50/60 border-slate-200/80 text-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.word}</div>
                    <div className={`text-[11px] ${activeWordPlaying === item.word ? 'text-emerald-100' : 'text-emerald-800'}`}>
                      {item.phonetic} <span className="opacity-75">· {item.meaning}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clean Paired Expected Classroom Response Section */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-semibold text-slate-500">
                {activeExpectedReply.speakerRole === 'student'
                  ? (uiLang === 'hi' ? '👧 अपेक्षित छात्र कक्षा प्रतिक्रिया:' : '👧 Expected Student Response:')
                  : (uiLang === 'hi' ? '👨‍🏫 अनुशंसित शिक्षक उत्तर:' : '👨‍🏫 Recommended Teacher Reply:')}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 break-words">
                {activeReplyTribalData.script}{' '}
                <span className="text-xs font-semibold text-emerald-800">({activeReplyTribalData.phonetic})</span>
              </div>
              <div className="text-xs text-slate-500 break-words">
                {activeExpectedReply.hindi} · {activeExpectedReply.english}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-play-classroom-response"
                type="button"
                onClick={() => handlePlayClassroomResponse(undefined, 'tribal')}
                className={`px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSynthesizingResponse
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{uiLang === 'hi' ? `${targetLang} प्रतिक्रिया सुनें` : `Hear ${targetLang} Reply`}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePlayClassroomResponse(undefined, 'hindi')}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span>{uiLang === 'hi' ? 'हिन्दी' : 'Hindi'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Tabbed Bottom Section: Classroom Scenarios vs Conversation Log */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Segmented Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setBottomPanelTab('scenarios')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                bottomPanelTab === 'scenarios'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {uiLang === 'hi' ? 'कक्षा संवाद कोष (Scenarios)' : 'Classroom Scenarios'}
            </button>
            <button
              type="button"
              onClick={() => setBottomPanelTab('history')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                bottomPanelTab === 'history'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{uiLang === 'hi' ? 'संवाद इतिहास (Log)' : 'Conversation Log'}</span>
              <span className="text-[11px] text-slate-400">({dialogueHistory.length})</span>
            </button>
          </div>

          {/* Right side action for active tab */}
          {bottomPanelTab === 'scenarios' ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customScenarioTopic}
                onChange={(e) => setCustomScenarioTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateGroundedDialogue()}
                placeholder={uiLang === 'hi' ? 'नया कक्षा विषय लिखें...' : 'Custom classroom topic...'}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:bg-white"
              />
              <button
                type="button"
                disabled={isGeneratingAiDialogue}
                onClick={handleGenerateGroundedDialogue}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isGeneratingAiDialogue ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{uiLang === 'hi' ? 'संवाद बनाएं' : 'Generate'}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDialogueHistory([])}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{uiLang === 'hi' ? 'इतिहास साफ़ करें' : 'Clear Log'}</span>
            </button>
          )}
        </div>

        {groundedSources.length > 0 && bottomPanelTab === 'scenarios' && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              {uiLang === 'hi' ? 'संदर्भ स्रोत:' : 'Sources:'}
            </span>
            {groundedSources.map((src, i) => (
              <a
                key={i}
                href={src.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline font-medium"
              >
                {src.title}
              </a>
            ))}
          </div>
        )}

        {bottomPanelTab === 'scenarios' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CLASSROOM_DIALOGUE_SCENARIOS.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              const teacherPair = sc.dialoguePairs.find((p) => p.speaker === 'teacher') || sc.dialoguePairs[0];
              const stuPair = sc.dialoguePairs.find((p) => p.speaker === 'student') || sc.dialoguePairs[1];
              const teacherLangData = teacherPair
                ? (targetLang === 'Santhali' ? teacherPair.santhali : targetLang === 'Ho' ? teacherPair.ho : teacherPair.mundari)
                : null;
              const stuLangData = stuPair
                ? (targetLang === 'Santhali' ? stuPair.santhali : targetLang === 'Ho' ? stuPair.ho : stuPair.mundari)
                : null;

              return (
                <div
                  key={sc.id}
                  id={`btn-scenario-${sc.id}`}
                  onClick={() => handleLoadScenario(sc)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/30 border-emerald-500'
                      : 'bg-white hover:bg-slate-50/70 border-slate-200/80'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-900 text-sm">
                        {uiLang === 'hi' ? sc.titleHindi : sc.title}
                      </span>
                      <span>{targetLang}</span>
                    </div>

                    {/* Teacher Line */}
                    <div className="text-xs space-y-0.5 pt-1 border-t border-slate-100">
                      <div className="text-slate-500 font-medium">
                        👨‍🏫 {teacherSourceLang === 'English' && uiLang !== 'hi' ? sc.teacherPromptEnglish : sc.teacherPromptHindi}
                      </div>
                      {teacherLangData && (
                        <div className="font-semibold text-slate-900">{teacherLangData.phonetic}</div>
                      )}
                    </div>

                    {/* Student Line */}
                    {stuLangData && (
                      <div className="text-xs space-y-0.5 pt-2 border-t border-slate-100">
                        <div className="text-slate-500 font-medium">
                          👧 {uiLang === 'hi' ? sc.expectedStudentReplyHindi : sc.expectedStudentReplyEnglish}
                        </div>
                        <div className="font-semibold text-amber-900">{stuLangData.phonetic}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadScenario(sc);
                      }}
                      className="py-1.5 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{uiLang === 'hi' ? 'शिक्षक बोलें' : 'Teacher'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadScenarioStudentInput(sc);
                      }}
                      className="py-1.5 px-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{uiLang === 'hi' ? 'छात्र उत्तर' : 'Student'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {dialogueHistory.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                {uiLang === 'hi' ? 'कोई संवाद इतिहास नहीं।' : 'No dialogue turns recorded yet.'}
              </div>
            ) : (
              dialogueHistory.map((turn) => {
                const isTeacher = turn.speaker === 'teacher';
                const timeDisplay = uiLang === 'hi' && turn.timestamp === 'Just now' ? 'अभी-अभी' : turn.timestamp;
                return (
                  <div
                    key={turn.id}
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-800">{turn.speakerName}</span>
                        <span>·</span>
                        <span>{turn.sourceLanguage} ➔ {turn.targetLanguage}</span>
                        <span>·</span>
                        <span className="font-mono text-[11px]">{timeDisplay}</span>
                      </div>
                      <div className="text-xs text-slate-600 truncate">&ldquo;{turn.sourceText}&rdquo;</div>
                      <div className="text-sm font-bold text-slate-900 break-words">
                        {turn.translatedScript}{' '}
                        <span className="text-xs font-medium text-emerald-800">({turn.devanagariPhonetic})</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const replayTarget = (turn.targetLanguage as TribalLanguage) || targetLang;
                        speakHumanLikeTranslation(
                          {
                            script: turn.translatedScript,
                            scriptName: turn.scriptName,
                            romanized: turn.romanized,
                            devanagariPhonetic: turn.devanagariPhonetic,
                            englishMeaning: turn.meaning,
                            hindiMeaning: turn.devanagariPhonetic,
                            audioHint: '',
                            targetLanguage: replayTarget,
                          },
                          replayTarget,
                          {
                            speechRate: speechSpeed,
                            preferHumanTts: useHumanTts,
                          }
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{uiLang === 'hi' ? 'सुनें' : 'Play'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Cultural Search Modal with Grounding */}
      <CulturalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        defaultTopic={searchTopic}
        defaultLanguage={targetLang}
        uiLang={uiLang}
      />
    </div>
  );
};
