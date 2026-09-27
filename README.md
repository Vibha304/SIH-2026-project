# PALASH MTB-MLE — Mother Tongue-Based Multilingual Education Platform

**PALASH MTB-MLE** is an offline-first educational platform designed for primary school teachers across Jharkhand under the **NIPUN Bharat** Foundational Literacy and Numeracy (FLN) mission. It empowers Hindi- and English-speaking educators to bridge the classroom language gap and deliver interactive instruction in **Santhali** (*Ol Chiki*), **Ho** (*Warang Chiti*), and **Mundari** (*Devanagari / Mundari Bani*).

---

## Key Features

### 1. Real-Time Voice & Text Translator (`< 3s` Offline Pipeline)
- **Bidirectional Translation:** Translate classroom instructions, conversational phrases, and FLN concepts between **Hindi / English** and **Santhali, Ho, and Mundari**.
- **Authentic Script & Phonetics:** Displays translations in native scripts (**Ol Chiki**, **Warang Chiti**, **Devanagari**) alongside phonetic Romanization and Hindi pronunciation guides for teachers.
- **Native Audio Synthesis & Recording:** Listen to natural pronunciation with adjustable playback speeds or use live speech recognition to translate spoken classroom prompts on the fly.
- **1-Click Worksheet Generation:** Turn any translated classroom phrase directly into a printable, bilingual student practice worksheet.

### 2. NIPUN Bharat FLN Assessment Dashboard
- **Competency Tracking:** Monitor student progress across core Foundational Literacy and Numeracy (FLN) skills—Oral Language Development, Phonological Awareness, Decoding, Reading Comprehension, and Foundational Numeracy.
- **Multilingual Student Profiles:** Track each student's mother tongue, L1-to-L2 transition readiness, attendance, and individualized competency milestones.
- **Interactive Evaluation:** Update student skill levels directly from the classroom tablet with instant visual analytics.

### 3. Auto-Generated Bilingual Worksheets
- **NIPUN-Aligned Templates:** Generate and customize bilingual worksheets for Grade 1–3 Literacy and Numeracy (Vocabulary Matching, Picture-Word Association, Fill-in-the-Blanks, and Counting with local cultural objects).
- **Multi-Script Support:** Side-by-side Hindi/English and Tribal language prompts with script-accurate rendering.
- **Interactive Preview & Print:** Preview interactive exercises on-screen or export print-ready A4 worksheets for offline classroom distribution.

### 4. Advanced Teacher Support Suite
- **Bilingual Lesson Planner:** Structured 40-minute MTB-MLE lesson plans transitioning smoothly from the child's home language (L1) to the school language (L2).
- **Pronunciation Coach & Visual Flashcards:** Interactive visual flashcards with native audio to help teachers master classroom greetings, numbers, nature terms, and action verbs.
- **Contextual Pedagogy Guide:** Culturally grounded teaching analogies using Jharkhand's local flora, fauna, festivals (*Sohrai*, *Baha*, *Mage Parab*, *Sarhul*), and daily life.

### 5. Offline Cultural Library & Indigenous Games
- **Folktales & Action Songs:** Bilingual interactive storybooks and traditional songs (*Baha Serenj*, *Jadur Durang*) with karaoke-style synchronized highlighting and audio playback.
- **Indigenous Educational Games:**
  - **Bagh-Chal / Kul Merom (Tigers & Goats):** Traditional asymmetric strategy board game teaching spatial reasoning and counting.
  - **Kati Disc Strike:** Physics-based indigenous bamboo-disc game reinforcing arithmetic and angles.
  - **Gedi Stilt Race:** Traditional stilt-walking rhythm and vocabulary challenge.

---

## Edge AI & Low-Memory System Architecture (`800 MB` RAM Budget)

Designed specifically for low-cost Android 9+ government school tablets with **2 GB total RAM** (~800 MB available to the application):

| Layer | Technology | Memory Footprint | Details |
| :--- | :--- | :--- | :--- |
| **ASR (Speech-to-Text)** | `whisper.cpp` (`ggml-tiny-int8`) | `~110 MB` | Quantized INT8 inference via native C++ JNI |
| **NMT (Translation)** | `CTranslate2` / `ONNX Runtime` | `~210 MB` | Pruned INT8 Indic-Tribal transformer + SQLite trie dictionary |
| **TTS (Voice Synthesis)** | `Piper TTS` (ONNX VITS) | `~65 MB` | Low-latency 22.05kHz neural speech synthesis |
| **Local Storage** | `SQLite` + Indexed Assets | `~45 MB` | Offline lexicon, student FLN records, and cultural stories |

- **Zero Java GC Pauses:** Heavy ML workloads are architected for execution in native C++ via Android JNI using `mmap` weight loading and sequential model hot-swapping.
- **100% Offline Capable:** Core translation lexicons, worksheets, stories, games, and teacher guides run without internet connectivity.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Lucide Icons, Motion
- **Backend / Dev Server:** Node.js, Express, Vite
- **Audio & Speech:** Web Speech API, Web Audio API (offline formant/melodic synthesis & native TTS)

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
