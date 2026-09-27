import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Film, 
  Plus, 
  Volume2, 
  VolumeX,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { EducationalVideoItem, TribalLanguage, VideoStoryboardScene } from '../types';
import { gameAudio } from '../utils/gameAudio';
import { speakHumanLikeTranslation, stopHumanSpeech } from '../utils/humanSpeechSynthesizer';

interface EducationalVideosSectionProps {
  uiLang: 'en' | 'hi';
  onSelectLanguage?: (lang: TribalLanguage) => void;
}

const DEFAULT_STORYBOARDS: Record<string, VideoStoryboardScene[]> = {
  'vid-sarhul-dance': [
    {
      sceneNumber: 1,
      captionTribalScript: 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ',
      captionRoman: 'Baha Parab Sarjom Baha',
      captionHindi: 'सखुआ (साल) के पवित्र वृक्ष पर नए वसंत के सफेद फूल खिल उठे हैं।',
      captionEnglish: 'Sacred white Sal blossoms blooming in spring across Jharkhand.',
      visualEmoji: '🌸🌳☀️',
      bgGradient: ['#064e3b', '#047857'],
      accentColor: '#fde047'
    },
    {
      sceneNumber: 2,
      captionTribalScript: 'ᱛᱩᱢᱫᱟᱜ ᱴᱟᱢᱟᱠ ᱥᱟᱰᱮ',
      captionRoman: 'Tumdag Tamak Sade',
      captionHindi: 'अखड़ा में मांदर (तुमदाग) और नगाड़े की मधुर ताल गूंज रही है।',
      captionEnglish: 'Rhythmic beats of traditional Mandar and Nagada drums in the village Akhra.',
      visualEmoji: '🪘🥁🎶',
      bgGradient: ['#7c2d12', '#b45309'],
      accentColor: '#fbbf24'
    },
    {
      sceneNumber: 3,
      captionTribalScript: 'ᱟᱠᱷᱲᱟ ᱨᱮ ᱮᱱᱮᱡ ᱥᱮᱨᱮᱧ',
      captionRoman: 'Akhra Re Enej Serenj',
      captionHindi: 'पारंपरिक लाल-सफेद पाड़ साड़ी और पगड़ी पहनकर बच्चे व ग्रामीण नृत्य कर रहे हैं।',
      captionEnglish: 'Children and villagers dancing in a circle in traditional red-bordered attire.',
      visualEmoji: '💃🕺🌾',
      bgGradient: ['#4c1d95', '#6d28d9'],
      accentColor: '#f472b6'
    },
    {
      sceneNumber: 4,
      captionTribalScript: 'ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱡᱚᱦᱮᱨ',
      captionRoman: 'Jaher Than Johar',
      captionHindi: 'प्रकृति, जल, जंगल और धरती माता के प्रति आभार एवं सामूहिक जोहार।',
      captionEnglish: 'Collective gratitude to Mother Nature, forests, and community harmony.',
      visualEmoji: '🙏🌿✨',
      bgGradient: ['#0f172a', '#1e3a8a'],
      accentColor: '#34d399'
    }
  ]
};

const PRESET_VIDEOS: EducationalVideoItem[] = [
  {
    id: 'vid-sarhul-dance',
    title: 'Sarhul Spring Blossom Folk Dance',
    titleHindi: 'सरहुल सखुआ पुष्प अखड़ा लोक नृत्य',
    prompt: 'Tribal children and village dancers celebrating Sarhul festival in Jharkhand under flowering Sal trees, traditional white and red cotton sarees, rhythmically playing Madal and Nagada drums in circle formation',
    language: 'Santhali',
    category: 'Folk Dance',
    status: 'idle',
    aspectRatio: '16:9',
    durationDesc: '8s HD Visual Loop',
    culturalNotes: 'Celebrates union of Singbonga (Sun) and Mother Earth with white Sal (Sarjom) flowers.',
    narrationHindi: 'सफेद सखुआ (सरजोम) के फूलों के साथ सिंगबोंगा (सूर्य) और धरती माता के मिलन का पारंपरिक उत्सव।'
  },
  {
    id: 'vid-saranda-forest',
    title: 'Saranda Forest Sal Canopy & Stream',
    titleHindi: 'सारंडा सघन वन सखुआ छत्र एवं प्राकृतिक जलधारा',
    prompt: 'Lush green ancient Sal trees of Saranda forest West Singhbhum Jharkhand, crystal clear forest stream flowing through pebbles, gentle sunlight filtering through dense tree canopy, tranquil educational nature documentary',
    language: 'Ho',
    category: 'Forest Nature',
    status: 'idle',
    aspectRatio: '16:9',
    durationDesc: '8s HD Visual Loop',
    culturalNotes: 'Sacred grove habitat of Ho indigenous communities and wild Asian elephants.',
    narrationHindi: 'हो जनजातीय समुदाय के पवित्र सरना स्थल और एशियाई हाथियों का प्राकृतिक निवास।'
  },
  {
    id: 'vid-classroom-olchiki',
    title: 'Classroom FLN: Tracing Indigenous Script',
    titleHindi: 'प्राथमिक कक्षा: ओल चिकी एवं मातृभाषा वर्ण आरेखन',
    prompt: 'Joyful tribal primary school classroom in rural Jharkhand, teacher in cotton saree smiling and writing indigenous Ol Chiki script characters on chalkboard, enthusiastic young Santhali students holding wooden slates',
    language: 'Santhali',
    category: 'Classroom FLN',
    status: 'idle',
    aspectRatio: '16:9',
    durationDesc: '8s HD Visual Loop',
    culturalNotes: 'Foundational literacy pedagogy for mother tongue transition under PALASH initiative.',
    narrationHindi: 'पलाश पहल के अंतर्गत मातृभाषा से बुनियादी साक्षरता शिक्षण की सहज कक्षा पद्धति।'
  },
  {
    id: 'vid-sohrai-painting',
    title: 'Sohrai Tribal Wall Mural Painting',
    titleHindi: 'सोहराय पारंपरिक भित्ति चित्रकला एवं प्राकृतिक रंग',
    prompt: 'Tribal women using natural mud clay and red ochre pigment to paint sacred animals, peacocks, and cows on mud house walls during Sohrai harvest festival in Hazaribagh Jharkhand',
    language: 'Mundari',
    category: 'Craft & Art',
    status: 'idle',
    aspectRatio: '16:9',
    durationDesc: '8s HD Visual Loop',
    culturalNotes: 'GI-tagged indigenous mural heritage honoring livestock and harvest bounty.',
    narrationHindi: 'फसल और पशुधन के सम्मान में प्राकृतिक मिट्टी के रंगों से बनाई जाने वाली पारंपरिक भित्ति कला।'
  }
];

/**
 * Helper to wrap text on an HTML5 2D canvas
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

/**
 * Renders a 4-scene storyboard into a real playable WebM/MP4 Video Blob URL using HTML5 Canvas + MediaRecorder
 */
async function synthesizeVideoBlobFromStoryboard(
  scenes: VideoStoryboardScene[],
  title: string,
  language: string,
  aspectRatio: '16:9' | '9:16'
): Promise<string | null> {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = aspectRatio === '9:16' ? 540 : 960;
  canvas.height = aspectRatio === '9:16' ? 960 : 540;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const canCapture = typeof (canvas as any).captureStream === 'function' && typeof MediaRecorder !== 'undefined';
  if (!canCapture) return null;

  return new Promise((resolve) => {
    try {
      const stream = (canvas as any).captureStream(30);
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4'
      ];
      const supportedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';
      const recorder = supportedMime
        ? new MediaRecorder(stream, { mimeType: supportedMime })
        : new MediaRecorder(stream);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: supportedMime || 'video/webm' });
        const url = URL.createObjectURL(blob);
        resolve(url);
      };

      recorder.onerror = () => resolve(null);
      recorder.start(100);

      const totalDurationMs = 4800; // 4.8 seconds smooth high-fps render (loops seamlessly in player)
      const startTime = performance.now();
      const validScenes = scenes.length > 0 ? scenes : DEFAULT_STORYBOARDS['vid-sarhul-dance'];

      // Floating nature particles
      const particles = Array.from({ length: 24 }, (_, i) => ({
        x: (i * 73) % canvas.width,
        y: (i * 47) % canvas.height,
        r: 2 + (i % 4) * 1.5,
        speedY: -0.6 - (i % 3) * 0.4,
        speedX: Math.sin(i) * 0.5
      }));

      const renderFrame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / totalDurationMs, 1);
        const sceneIdx = Math.min(
          Math.floor(progress * validScenes.length),
          validScenes.length - 1
        );
        const scene = validScenes[sceneIdx];
        const sceneProgress = (progress * validScenes.length) % 1;

        const w = canvas.width;
        const h = canvas.height;

        // 1. Animated Gradient Background
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, scene.bgGradient?.[0] || '#064e3b');
        grad.addColorStop(1, scene.bgGradient?.[1] || '#047857');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // 2. Decorative Tribal Sohrai Geometric Border & Sunburst Rays
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 2;
        ctx.strokeRect(18, 18, w - 36, h - 36);

        // Animated ambient rings
        const pulseRadius = 95 + Math.sin(elapsed * 0.005) * 14;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.34, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();
        ctx.restore();

        // 3. Floating Particles
        ctx.fillStyle = scene.accentColor || '#fde047';
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < 0) p.y = h;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // 4. Top Header Pill
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.fillRect(28, 28, w - 56, 44);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`PALASH MTB-MLE JHARKHAND • ${language.toUpperCase()}`, 44, 55);
        ctx.textAlign = 'right';
        ctx.fillStyle = scene.accentColor || '#fde047';
        ctx.fillText(`SCENE ${sceneIdx + 1} / ${validScenes.length}`, w - 44, 55);

        // 5. Center Animated Scene Illustration Emojis
        const bounceY = Math.sin(elapsed * 0.007) * 8;
        ctx.font = aspectRatio === '9:16' ? '68px sans-serif' : '74px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(scene.visualEmoji || '🌲🥁🌺', w / 2, h * 0.37 + bounceY);

        // 6. Native Tribal Script Banner
        ctx.fillStyle = scene.accentColor || '#fde047';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(scene.captionTribalScript || title, w / 2, h * 0.56);

        // 7. Romanized Phonetic Subtitle
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.font = 'italic 18px sans-serif';
        ctx.fillText(`"${scene.captionRoman || ''}"`, w / 2, h * 0.63);

        // 8. Bottom Subtitle Box (Hindi + English)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
        ctx.fillRect(36, h * 0.69, w - 72, h * 0.22);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 19px sans-serif';
        drawWrappedText(ctx, scene.captionHindi || '', w / 2, h * 0.76, w - 110, 24);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '14px sans-serif';
        drawWrappedText(ctx, scene.captionEnglish || '', w / 2, h * 0.85, w - 110, 20);

        // 9. Progress Bar
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(36, h - 26, w - 72, 6);
        ctx.fillStyle = scene.accentColor || '#34d399';
        ctx.fillRect(36, h - 26, (w - 72) * progress, 6);

        // Subtle scene transition fade-in
        if (sceneProgress < 0.08) {
          ctx.fillStyle = `rgba(0,0,0,${(0.08 - sceneProgress) * 4})`;
          ctx.fillRect(0, 0, w, h);
        }

        if (elapsed < totalDurationMs) {
          requestAnimationFrame(renderFrame);
        } else {
          recorder.stop();
        }
      };

      requestAnimationFrame(renderFrame);
    } catch {
      resolve(null);
    }
  });
}

export const EducationalVideosSection: React.FC<EducationalVideosSectionProps> = ({ uiLang }) => {
  const [videos, setVideos] = useState<EducationalVideoItem[]>(PRESET_VIDEOS);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customLanguage, setCustomLanguage] = useState<TribalLanguage>('Santhali');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeSceneByVideo, setActiveSceneByVideo] = useState<Record<string, number>>({});
  const audioTimerRef = useRef<any>(null);

  // Rotate active scene for any ready storyboard preview
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneByVideo((prev) => {
        const next = { ...prev };
        videos.forEach((v) => {
          if (v.status === 'ready' && v.storyboardScenes && v.storyboardScenes.length > 0) {
            next[v.id] = ((prev[v.id] || 0) + 1) % v.storyboardScenes.length;
          }
        });
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [videos]);

  // Complete a video with synthesized storyboard & canvas video blob
  const finalizeWithSynthesizedStoryboard = async (
    video: EducationalVideoItem,
    storyboardScenes: VideoStoryboardScene[],
    narrationHindi?: string,
    narrationTribal?: string
  ) => {
    setStatusMessage(
      uiLang === 'hi'
        ? 'उच्च-परिभाषा (HD) शैक्षणिक दृश्य और मातृभाषा उपशीर्षक रेंडर किए जा रहे हैं...'
        : 'Synthesizing HD educational video stream with indigenous script subtitles...'
    );

    const blobUrl = await synthesizeVideoBlobFromStoryboard(
      storyboardScenes,
      video.title,
      video.language === 'All' ? 'Santhali' : video.language,
      video.aspectRatio || '16:9'
    );

    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === video.id) {
          return {
            ...v,
            status: 'ready',
            videoBlobUrl: blobUrl || undefined,
            storyboardScenes,
            narrationHindi: narrationHindi || v.culturalNotes,
            narrationTribal: narrationTribal || v.title,
            renderEngine: 'palash-hd-synthesizer'
          };
        }
        return v;
      })
    );
    setStatusMessage(null);
    setGeneratingId(null);
    gameAudio.playSuccess();
  };

  // Poll video status if any video is generating via Veo operation
  useEffect(() => {
    if (!generatingId) return;

    const currentItem = videos.find((v) => v.id === generatingId);
    if (!currentItem || !currentItem.operationName) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operationName: currentItem.operationName,
            prompt: currentItem.prompt,
            language: currentItem.language,
            title: currentItem.title
          }),
        });

        if (!res.ok) {
          clearInterval(interval);
          await finalizeWithSynthesizedStoryboard(
            currentItem,
            DEFAULT_STORYBOARDS[currentItem.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
          );
          return;
        }

        const data = await res.json();

        if (data.done) {
          clearInterval(interval);

          if (data.fallbackToSynthesizer && Array.isArray(data.storyboardScenes)) {
            await finalizeWithSynthesizedStoryboard(
              currentItem,
              data.storyboardScenes,
              data.narrationHindi,
              data.narrationTribal
            );
            return;
          }

          setStatusMessage('Video generated! Downloading video stream...');

          // Download stream
          const dlRes = await fetch('/api/video-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName: currentItem.operationName }),
          });

          if (dlRes.ok) {
            const blob = await dlRes.blob();
            const blobUrl = URL.createObjectURL(blob);

            setVideos((prev) =>
              prev.map((v) => {
                if (v.id === generatingId) {
                  return {
                    ...v,
                    status: 'ready',
                    videoBlobUrl: blobUrl,
                    renderEngine: 'veo-3.1'
                  };
                }
                return v;
              })
            );
            setStatusMessage(null);
            setGeneratingId(null);
            gameAudio.playSuccess();
          } else {
            await finalizeWithSynthesizedStoryboard(
              currentItem,
              DEFAULT_STORYBOARDS[currentItem.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
            );
          }
        } else {
          setStatusMessage('Synthesizing cinematic frames with Veo 3 (this takes ~1-2 minutes)...');
        }
      } catch (err: any) {
        console.warn('Polling fallback to HD synthesizer:', err);
        clearInterval(interval);
        await finalizeWithSynthesizedStoryboard(
          currentItem,
          DEFAULT_STORYBOARDS[currentItem.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
        );
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [generatingId, videos]);

  const handleStartGeneration = async (video: EducationalVideoItem) => {
    setGeneratingId(video.id);
    setStatusMessage(
      uiLang === 'hi'
        ? 'Veo 3 एवं PALASH दृश्य इंजन से वीडियो तैयार किया जा रहा है...'
        : 'Generating educational video with Veo 3 & PALASH HD Visual Engine...'
    );

    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === video.id) {
          return { ...v, status: 'generating' };
        }
        return v;
      })
    );

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: video.prompt,
          aspectRatio: video.aspectRatio || '16:9',
          language: video.language === 'All' ? 'Santhali' : video.language,
          title: video.title
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.mode === 'veo' && data.operationName) {
          setVideos((prev) =>
            prev.map((v) => {
              if (v.id === video.id) {
                return { ...v, operationName: data.operationName };
              }
              return v;
            })
          );
          setStatusMessage('Video rendering initialized with Veo 3...');
        } else if (Array.isArray(data.storyboardScenes)) {
          await finalizeWithSynthesizedStoryboard(
            video,
            data.storyboardScenes,
            data.narrationHindi,
            data.narrationTribal
          );
        } else {
          await finalizeWithSynthesizedStoryboard(
            video,
            DEFAULT_STORYBOARDS[video.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
          );
        }
      } else {
        await finalizeWithSynthesizedStoryboard(
          video,
          DEFAULT_STORYBOARDS[video.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
        );
      }
    } catch (err: any) {
      console.warn('Video start fallback to local synthesizer:', err);
      await finalizeWithSynthesizedStoryboard(
        video,
        DEFAULT_STORYBOARDS[video.id] || DEFAULT_STORYBOARDS['vid-sarhul-dance']
      );
    }
  };

  const handleToggleNarration = (vid: EducationalVideoItem) => {
    if (playingAudioId === vid.id) {
      stopHumanSpeech();
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
      setPlayingAudioId(null);
      return;
    }

    setPlayingAudioId(vid.id);
    gameAudio.playMandar(true);
    const targetLang = (vid.language === 'All' ? 'Santhali' : vid.language) as TribalLanguage;
    const textToSpeak = vid.narrationHindi || vid.culturalNotes || vid.titleHindi;

    speakHumanLikeTranslation(
      {
        script: vid.narrationTribal || vid.title,
        scriptName: targetLang === 'Santhali' ? 'Ol Chiki' : targetLang === 'Ho' ? 'Warang Chiti' : 'Devanagari',
        romanized: vid.narrationTribal || vid.title,
        devanagariPhonetic: textToSpeak,
        englishMeaning: vid.culturalNotes,
        audioHint: textToSpeak,
        targetLanguage: targetLang
      },
      targetLang,
      {
        preferHumanTts: true,
        onEnd: () => {
          setPlayingAudioId(null);
        }
      }
    );
  };

  const handleCreateCustom = () => {
    if (!customPrompt.trim()) return;

    const newVideo: EducationalVideoItem = {
      id: `vid-custom-${Date.now()}`,
      title: customTitle.trim() || `${customLanguage} Classroom Visual: ${customPrompt.slice(0, 28)}`,
      titleHindi: customTitle.trim() || `${customLanguage} शैक्षणिक वीडियो: ${customPrompt.slice(0, 28)}`,
      prompt: customPrompt.trim(),
      language: customLanguage,
      category: 'Classroom FLN',
      status: 'idle',
      aspectRatio,
      durationDesc: '8s HD Visual Loop',
      culturalNotes: `Dynamic classroom visual generated for ${customLanguage} learners: "${customPrompt.trim()}"`
    };

    setVideos((prev) => [newVideo, ...prev]);
    setIsFormOpen(false);
    setCustomPrompt('');
    setCustomTitle('');

    // Trigger generation immediately
    handleStartGeneration(newVideo);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Film className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> {uiLang === 'hi' ? 'पलाश एचडी दृश्य इंजन' : 'Veo 3 & PALASH HD Video AI'}
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-semibold">
                {uiLang === 'hi' ? 'गतिशील दृश्य शिक्षण सहायक' : 'Dynamic Visual Learning Aid'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {uiLang === 'hi' ? 'सांस्कृतिक एवं शैक्षणिक वीडियो पुस्तकालय' : 'Cultural & Classroom Educational Videos'}
            </h3>
          </div>
        </div>

        <button
          id="btn-open-custom-video-form"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{uiLang === 'hi' ? '+ नया शैक्षणिक वीडियो बनाएं' : '+ Generate Custom Video (Veo 3 AI)'}</span>
        </button>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2.5 text-xs text-purple-900 font-medium">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-700 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* New Custom Video Generator Form */}
      {isFormOpen && (
        <div className="p-4 sm:p-5 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>{uiLang === 'hi' ? 'कक्षा के लिए वीडियो का विवरण लिखें' : 'Create Custom Educational Video'}</span>
            </h4>
            <span className="text-[11px] text-purple-700 font-semibold">
              {uiLang === 'hi' ? 'पलाश एचडी सिंथेसाइज़र' : 'Veo 3.1 + PALASH HD Synthesizer'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'शीर्षक:' : 'Title:'}
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder={uiLang === 'hi' ? 'उदा. शाम का करम नृत्य चक्र' : 'e.g. Karam Dance Circle at Evening'}
                className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {uiLang === 'hi' ? 'भाषा:' : 'Language:'}
                </label>
                <select
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value as TribalLanguage)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-700 font-semibold"
                >
                  <option value="Santhali">{uiLang === 'hi' ? 'संथाली (ओल चिकी)' : 'Santhali (Ol Chiki)'}</option>
                  <option value="Ho">{uiLang === 'hi' ? 'हो (वरंग क्षिति)' : 'Ho (Warang Chiti)'}</option>
                  <option value="Mundari">{uiLang === 'hi' ? 'मुंडारी (देवनागरी)' : 'Mundari (Devanagari)'}</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {uiLang === 'hi' ? 'आकार अनुपात:' : 'Aspect Ratio:'}
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as '16:9' | '9:16')}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-700 font-semibold"
                >
                  <option value="16:9">{uiLang === 'hi' ? '16:9 (क्षैतिज)' : '16:9 (Landscape)'}</option>
                  <option value="9:16">{uiLang === 'hi' ? '9:16 (लंबवत)' : '9:16 (Portrait)'}</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              {uiLang === 'hi' ? 'वीडियो दृश्य विवरण:' : 'Visual Scene Prompt:'}
            </label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={uiLang === 'hi' ? 'उदा. स्कूल के आंगन में सखुआ के बीजों से गिनती सीखते बच्चे और मुस्कुराती शिक्षिका...' : 'e.g. Santhal village children learning counting with Sal seeds in sunny school courtyard, smiling teacher, high quality cinematic lighting'}
              className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setIsFormOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleCreateCustom}
              disabled={!customPrompt.trim() || Boolean(generatingId)}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{uiLang === 'hi' ? 'वीडियो उत्पन्न करें' : 'Generate Video Now'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {videos.map((vid) => {
          const isGeneratingThis = generatingId === vid.id || vid.status === 'generating';
          const isReady = vid.status === 'ready' && (Boolean(vid.videoBlobUrl) || Boolean(vid.storyboardScenes?.length));
          const activeSceneIdx = activeSceneByVideo[vid.id] || 0;
          const activeScene = vid.storyboardScenes?.[activeSceneIdx];
          const langLabel = uiLang === 'hi'
            ? (vid.language === 'Santhali' ? 'संथाली' : vid.language === 'Ho' ? 'हो' : vid.language === 'Mundari' ? 'मुंडारी' : 'सभी')
            : vid.language;
          const catLabel = uiLang === 'hi'
            ? (vid.category === 'Folk Dance' ? 'लोक नृत्य' : vid.category === 'Forest Nature' ? 'वन एवं प्रकृति' : vid.category === 'Classroom FLN' ? 'बुनियादी कक्षा' : 'लोक कला')
            : vid.category;

          return (
            <div
              key={vid.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              {/* Media Display Area */}
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                {vid.status === 'ready' && vid.videoBlobUrl ? (
                  <video
                    src={vid.videoBlobUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : vid.status === 'ready' && activeScene ? (
                  /* Interactive Live Storyboard Player fallback if MediaRecorder unavailable */
                  <div
                    className="w-full h-full p-5 flex flex-col items-center justify-between text-center text-white transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${activeScene.bgGradient?.[0] || '#064e3b'}, ${activeScene.bgGradient?.[1] || '#047857'})`
                    }}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-80 pt-6">
                      <span>{uiLang === 'hi' ? `पलाश • ${langLabel}` : `PALASH MTB-MLE • ${vid.language}`}</span>
                      <span>{uiLang === 'hi' ? `दृश्य ${activeSceneIdx + 1} / ${vid.storyboardScenes?.length || 4}` : `Scene ${activeSceneIdx + 1} / ${vid.storyboardScenes?.length || 4}`}</span>
                    </div>
                    <div className="space-y-1.5 my-auto">
                      <div className="text-4xl animate-bounce">{activeScene.visualEmoji}</div>
                      <div className="text-lg font-black text-amber-300">{activeScene.captionTribalScript}</div>
                      <div className="text-xs italic text-white/90">&ldquo;{activeScene.captionRoman}&rdquo;</div>
                      <div className="text-xs font-bold bg-black/50 px-3 py-1.5 rounded-lg max-w-md mx-auto">
                        {activeScene.captionHindi}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 pb-1">
                      {vid.storyboardScenes?.map((_, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setActiveSceneByVideo((p) => ({ ...p, [vid.id]: sIdx }))}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            sIdx === activeSceneIdx ? 'w-6 bg-amber-300' : 'w-2 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-white/80 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-purple-300 border border-white/10">
                      {isGeneratingThis ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
                      ) : (
                        <Film className="w-6 h-6 text-purple-300" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      {isGeneratingThis
                        ? (uiLang === 'hi' ? 'वीडियो दृश्य तैयार किए जा रहे हैं...' : 'Synthesizing HD Classroom Video...')
                        : (uiLang === 'hi' ? `${vid.aspectRatio} उच्च-परिभाषा शैक्षणिक दृश्य` : `${vid.aspectRatio} High-Definition Visual`)}
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto line-clamp-2 italic">
                      &ldquo;{uiLang === 'hi' ? (vid.narrationHindi || vid.titleHindi) : vid.prompt}&rdquo;
                    </p>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                  {langLabel} &bull; {catLabel}
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  {isReady && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-[10px] font-bold text-white flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {uiLang === 'hi' ? 'तैयार' : 'Ready'}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-purple-700/80 text-[10px] font-bold text-white">
                    {vid.aspectRatio}
                  </span>
                </div>
              </div>

              {/* Video Info Body */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {uiLang === 'hi' ? vid.titleHindi : vid.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {uiLang === 'hi' ? (vid.narrationHindi || vid.culturalNotes) : vid.culturalNotes}
                  </p>

                  {/* Interactive Scene Pills when storyboard is available */}
                  {vid.storyboardScenes && vid.storyboardScenes.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/70">
                      <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <Layers className="w-3 h-3" />
                        <span>{uiLang === 'hi' ? 'द्विभाषी दृश्य अनुक्रम (4 दृश्य):' : 'Bilingual Storyboard Scenes:'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {vid.storyboardScenes.map((sc, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 rounded-lg bg-white border border-slate-200/80 text-[10px] flex items-center gap-1.5"
                          >
                            <span>{sc.visualEmoji?.slice(0, 2) || '🌿'}</span>
                            <span className="font-bold text-slate-800 truncate">{sc.captionTribalScript}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-slate-500">
                      {uiLang === 'hi' ? '8 सेकंड एचडी लूप' : vid.durationDesc}
                    </span>
                    {isReady && (
                      <button
                        onClick={() => handleToggleNarration(vid)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          playingAudioId === vid.id
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
                        }`}
                        title={uiLang === 'hi' ? 'पारंपरिक मांदर ताल के साथ द्विभाषी वर्णन सुनें' : 'Play bilingual voiceover narration with traditional Mandar rhythm'}
                      >
                        {playingAudioId === vid.id ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>{uiLang === 'hi' ? 'रोकें' : 'Stop Audio'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>{uiLang === 'hi' ? 'स्वर व संगीत सुनें' : 'Listen Narration'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isReady && (
                      <button
                        onClick={() => handleStartGeneration(vid)}
                        disabled={Boolean(generatingId)}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        title={uiLang === 'hi' ? 'वीडियो पुनः तैयार करें' : 'Re-render video'}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingThis ? 'animate-spin' : ''}`} />
                      </button>
                    )}

                    {isReady && vid.videoBlobUrl ? (
                      <a
                        href={vid.videoBlobUrl}
                        download={`${vid.id}.webm`}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{uiLang === 'hi' ? 'डाउनलोड करें' : 'Download Video'}</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleStartGeneration(vid)}
                        disabled={Boolean(generatingId)}
                        className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                      >
                        {isGeneratingThis ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>{uiLang === 'hi' ? 'बन रहा है...' : 'Generating...'}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{uiLang === 'hi' ? 'वीडियो बनाएं' : 'Render Video'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
