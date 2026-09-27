export type TribalLanguage = 'Ho' | 'Mundari' | 'Santhali';
export type SourceLanguage = 'Hindi' | 'English';
export type TargetLanguage = TribalLanguage;

export type FLNLevel = 'beginner' | 'intermediate' | 'advanced';

export type FLNSkillStage = 'Foundational' | 'Emerging' | 'Proficient';

export interface StudentWorksheetAssignment {
  id: string;
  title: string;
  titleHindi?: string;
  skillLevel: FLNSkillStage;
  subject: 'Literacy' | 'Numeracy';
  status: 'completed' | 'in_progress' | 'pending';
  assignedDate: string;
  completedDate?: string;
  score?: number;
}

export interface Student {
  id: string;
  name: string;
  avatarLetter: string;
  language: TribalLanguage;
  grade: string;
  flnLevel: FLNLevel;
  avgScore: number;
  assessmentsCompleted: number;
  motherTongueProficiency: number; // 0-100%
  hindiBridgeProficiency: number; // 0-100%
  lastAssessed: string;
  notes?: string;
  assignedWorksheets?: StudentWorksheetAssignment[];
}

export interface FLNSkillMetric {
  id: string;
  name: string;
  hindiName: string;
  category: 'literacy' | 'numeracy';
  averageScore: number;
  targetBenchmark: number;
  studentsAtGradeLevel: number;
  totalStudents: number;
}

export interface WorksheetItem {
  id: string;
  title: string;
  titleHindi?: string;
  grade: string;
  description: string;
  languages: TribalLanguage[];
  subject: 'Literacy' | 'Numeracy';
  type: 'tracing' | 'matching' | 'fill-blank' | 'math-visual' | 'story-riddle';
  status: 'assigned' | 'in_progress' | 'completed';
  assignedCount: number;
  completedCount: number;
  script: string;
  topicDomain?: 'wildlife' | 'market' | 'festivals' | 'classroom' | 'body' | 'numeracy' | 'instruments' | 'shapes' | 'custom';
  customExercisePayload?: any;
}

export interface CulturalStory {
  id: string;
  titleHindi: string;
  titleTribal: string;
  titleEnglish: string;
  subtitle: string;
  language: TribalLanguage;
  type: 'Story' | 'Song' | 'Folklore' | 'Game' | 'Tradition';
  duration: string;
  colorTheme: 'green' | 'orange' | 'amber' | 'emerald';
  isDownloaded: boolean;
  contentHindi: string;
  contentTribalScript: string;
  contentTribalRoman: string;
  contentEnglish: string;
  audioDurationSec: number;
  customScenes?: Array<{
    sceneNum: number;
    sceneTitleHindi: string;
    sceneTitleTribal: string;
    illustrationIcon: string;
    paragraphScript: string;
    paragraphRoman: string;
    paragraphHindi: string;
    paragraphEnglish: string;
    keyVocabulary: Array<{ word: string; roman: string; meaning: string }>;
  }>;
  customQuiz?: Array<{
    questionHindi: string;
    questionEnglish: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  customMoralLesson?: string;
  customCulturalInsight?: string;
  customVerses?: Array<{
    lineNum: number;
    scriptText: string;
    romanText: string;
    hindiText: string;
    englishText: string;
  }>;
  customInstrumentTip?: string;
}

export interface LatencyBreakdown {
  asrTimeMs: number;
  nmtTimeMs: number;
  ttsTimeMs: number;
  totalTimeMs: number;
}

export interface MemoryBudgetMetric {
  component: string;
  allocatedMb: number;
  maxLimitMb: number;
  status: 'optimal' | 'warning' | 'critical';
  description: string;
}

export interface TranslationRecord {
  id: string;
  timestamp: string;
  sourceText: string;
  sourceLanguage: SourceLanguage;
  targetLanguage: TribalLanguage;
  translatedText: string;
  tribalScriptText: string;
  scriptName: string;
  romanizedText: string;
  latencyMs: number;
  audioGenerated: boolean;
}

export type FlashcardCategory = 
  | 'Wildlife'
  | 'Nature'
  | 'Instruments'
  | 'Numbers'
  | 'Classroom'
  | 'Body'
  | 'Food'
  | 'Greetings'
  | 'Festivals';

export interface TribalFlashcard {
  id: string;
  language: TribalLanguage;
  category: FlashcardCategory;
  termScript: string;
  scriptName: string; // 'Ol Chiki' | 'Warang Chiti' | 'Devanagari'
  termRoman: string;
  termDevanagariPhonetic: string;
  syllables: string[];
  meaningHindi: string;
  meaningEnglish: string;
  culturalContext: string;
  phoneticTip: string;
  exampleSentenceScript: string;
  exampleSentenceHindi: string;
  visualIcon: string;
  difficulty: 'Level 1' | 'Level 2' | 'Level 3';
  audioText: string;
}

export interface PronunciationEvaluation {
  score: number; // 0 to 100
  verdict: 'excellent' | 'good' | 'needs_practice';
  transcribedText: string;
  feedbackHindi: string;
  feedbackEnglish: string;
  syllableMatches: boolean[];
  latencyMs: number;
  engine: string;
}

export interface CulturalGroundedData {
  summary: string;
  historicalSignificance: string;
  pedagogicalValue: string;
  culturalSymbols: string[];
  classroomActivities: string[];
  sources: Array<{ title: string; url: string }>;
  searchQueries?: string[];
}

export interface WorksheetGroundedData {
  contextSummary: string;
  recommendedVocabulary: Array<{
    wordHindi: string;
    wordTribal: string;
    wordEnglish: string;
    pronunciation: string;
    culturalNote: string;
  }>;
  mathScenario?: {
    title: string;
    description: string;
    problem: string;
    answer: string;
  };
  searchSources?: Array<{ title: string; snippet: string }>;
}

export interface VideoStoryboardScene {
  sceneNumber: number;
  captionTribalScript: string;
  captionRoman: string;
  captionHindi: string;
  captionEnglish: string;
  visualEmoji: string;
  bgGradient: [string, string];
  accentColor: string;
}

export interface EducationalVideoItem {
  id: string;
  title: string;
  titleHindi: string;
  prompt: string;
  language: TribalLanguage | 'All';
  category: 'Folk Dance' | 'Forest Nature' | 'Classroom FLN' | 'Craft & Art';
  status: 'idle' | 'generating' | 'ready' | 'error';
  operationName?: string;
  videoBlobUrl?: string;
  aspectRatio: '16:9' | '9:16';
  durationDesc: string;
  culturalNotes: string;
  storyboardScenes?: VideoStoryboardScene[];
  narrationHindi?: string;
  narrationTribal?: string;
  renderEngine?: 'veo-3.1' | 'palash-hd-synthesizer';
}

export interface WordBreakdownItem {
  word: string;
  romanized: string;
  phonetic: string;
  meaning: string;
}

export interface DialogueTurn {
  id: string;
  speaker: 'teacher' | 'student';
  speakerName: string;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatedScript: string;
  scriptName: string;
  romanized: string;
  devanagariPhonetic: string;
  meaning: string;
  latencyMs: number;
  timestamp: string;
  wordsBreakdown?: WordBreakdownItem[];
}

export interface ClassroomDialogueScenario {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Greeting' | 'Numeracy' | 'Literacy' | 'Care' | 'Praise';
  teacherPromptHindi: string;
  teacherPromptEnglish: string;
  expectedStudentReplyHindi: string;
  expectedStudentReplyEnglish: string;
  dialoguePairs: Array<{
    speaker: 'teacher' | 'student';
    hindi: string;
    english: string;
    santhali: { script: string; roman: string; phonetic: string };
    ho: { script: string; roman: string; phonetic: string };
    mundari: { script: string; roman: string; phonetic: string };
  }>;
}

export interface LessonPlanStep {
  title: string;
  titleHindi: string;
  durationMinutes: number;
  description: string;
  teacherScriptBilingual: string;
  studentResponseTribal: string;
  phoneticAid: string;
  pedagogicalTip: string;
}

export interface TeacherLessonPlan {
  id: string;
  title: string;
  titleHindi: string;
  grade: string;
  subject: 'Literacy' | 'Numeracy';
  targetLanguage: TribalLanguage;
  duration: '45-Minute Daily' | '5-Day Weekly Flow';
  nipunOutcomes: string[];
  nipunOutcomesHindi: string[];
  culturalTheme: string;
  keyVocabulary: Array<{
    hindi: string;
    tribal: string;
    script: string;
    phonetic: string;
  }>;
  steps: LessonPlanStep[];
  diagnosticCheckHindi: string;
  diagnosticCheckEnglish: string;
}

export interface ContextualExampleData {
  id: string;
  concept: string;
  conceptHindi: string;
  targetLanguage: TribalLanguage;
  culturalAnalogy: string;
  culturalAnalogyHindi: string;
  classroomMicroStory: {
    title: string;
    titleHindi: string;
    storyHindi: string;
    tribalPhrases: Array<{
      tribal: string;
      script: string;
      phonetic: string;
      meaning: string;
    }>;
  };
  classroomActivity: {
    title: string;
    titleHindi: string;
    materialsNeeded: string;
    stepByStepHindi: string[];
  };
}

export interface PronunciationPracticeWord {
  id: string;
  hindiMeaning: string;
  englishMeaning: string;
  category: 'Greetings' | 'Numbers' | 'Classroom' | 'Nature' | 'Glottal Stops';
  language: TribalLanguage;
  script: string;
  scriptName: string;
  romanized: string;
  devanagariPhonetic: string;
  audioPronunciationText: string;
  phoneticCoachingTip: string;
  phoneticCoachingTipHindi: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  sampleAudioPitch: number[];
}

export interface CrossLanguageDictionaryEntry {
  id: string;
  hindi: string;
  english: string;
  category: 'Classroom' | 'Numbers' | 'Nature' | 'Body' | 'Family' | 'Food' | 'Animals' | 'Actions';
  santhali: {
    script: string; // Ol Chiki
    roman: string;
    phonetic: string;
  };
  ho: {
    script: string; // Warang Chiti
    roman: string;
    phonetic: string;
  };
  mundari: {
    script: string;
    roman: string;
    phonetic: string;
  };
  culturalUsageNoteHindi: string;
  culturalUsageNoteEnglish: string;
}

