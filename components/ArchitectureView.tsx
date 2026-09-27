import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Smartphone, 
  AlertCircle,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';
import { MEMORY_BUDGET_METRICS } from '../data/mockData';

interface ArchitectureViewProps {
  uiLang: 'en' | 'hi';
  onClose?: () => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ uiLang, onClose }) => {
  const totalAllocatedMb = MEMORY_BUDGET_METRICS.reduce((acc, m) => acc + m.allocatedMb, 0);
  const maxBudgetMb = 800;
  const headroomMb = maxBudgetMb - totalAllocatedMb;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header section */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Offline Edge ML
              </span>
              <span className="text-xs text-slate-400">Android 9+ Tablet Specification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5">
              800MB RAM Budget & Native JNI Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Strictly engineered for low-cost 2GB RAM school tablets in rural Jharkhand (KGBV schools). Zero cloud dependencies, zero Java Garbage Collection stutter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800 text-center border border-slate-700 min-w-24">
              <div className="text-xs text-slate-400 font-medium">Device RAM</div>
              <div className="text-lg font-bold text-white">2.0 GB</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 text-center border border-slate-700 min-w-24">
              <div className="text-xs text-slate-400 font-medium">OS Overhead</div>
              <div className="text-lg font-bold text-slate-300">~1.0 GB</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-center min-w-28">
              <div className="text-xs text-emerald-400 font-medium">Max App Budget</div>
              <div className="text-lg font-extrabold text-emerald-300">800 MB</div>
            </div>
          </div>
        </div>

        {/* Live Memory Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            <span className="text-slate-300">Current App + ML Memory Footprint:</span>
            <span className="text-emerald-400 font-mono font-bold">
              {totalAllocatedMb} MB / {maxBudgetMb} MB ({headroomMb} MB safety margin)
            </span>
          </div>

          {/* Segmented memory bar */}
          <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden flex p-0.5 gap-0.5 border border-slate-700">
            {/* whisper.cpp: 138MB */}
            <div 
              className="h-full bg-emerald-500 rounded-l-full" 
              style={{ width: `${(138 / maxBudgetMb) * 100}%` }}
              title="whisper.cpp ASR: 138MB"
            />
            {/* CTranslate2: 184MB */}
            <div 
              className="h-full bg-sky-500" 
              style={{ width: `${(184 / maxBudgetMb) * 100}%` }}
              title="CTranslate2 NMT: 184MB"
            />
            {/* Piper TTS: 62MB */}
            <div 
              className="h-full bg-amber-500" 
              style={{ width: `${(62 / maxBudgetMb) * 100}%` }}
              title="Piper TTS: 62MB"
            />
            {/* App + SQLite: 76MB */}
            <div 
              className="h-full bg-purple-500 rounded-r-full" 
              style={{ width: `${(76 / maxBudgetMb) * 100}%` }}
              title="App + SQLite: 76MB"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              whisper.cpp (138MB)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              CTranslate2 (184MB)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Piper TTS (62MB)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              App & SQLite (76MB)
            </span>
            <span className="text-emerald-400 font-bold ml-auto">
              ✓ Low-Memory-Killer (LMK) Safe
            </span>
          </div>
        </div>
      </div>

      {/* Component Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {MEMORY_BUDGET_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Subsystem {idx + 1}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {metric.allocatedMb} MB / {metric.maxLimitMb} MB
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-2">
                {metric.component}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {metric.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> JNI Zero-Copy Mmap
              </span>
              <span className="font-mono">Sub-1s Latency</span>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Stack Architecture Details */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          Technical Stack & Architectural Decisions
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              1. Native C++ (JNI) Execution Layer
            </h4>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Standard Android Java / Kotlin heap causes frequent stop-the-world Garbage Collection (GC) pauses on 2GB RAM devices, leading to audio dropouts during translation. All heavy ML inference (ASR, NMT, TTS) runs in pure C++ native libraries linked via JNI, allocating direct unmanaged memory to protect the JVM heap.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              2. Sub-3-Second Voice Pipeline Breakdown
            </h4>
            <p className="mt-1 text-slate-600 leading-relaxed">
              <strong>whisper.cpp tiny (INT8):</strong> Audio chunked in 3-second streaming buffers (~680ms).<br />
              <strong>CTranslate2 INT8:</strong> Autoregressive beam search with INT8 quantization (~340ms).<br />
              <strong>Piper TTS (VITS):</strong> Lightweight indigenous phoneme synthesis (~420ms).<br />
              <strong>Total Round-Trip:</strong> ~1.44s &mdash; comfortably beating the sub-3-second constraint.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              3. Local Persistence via Embedded SQLite
            </h4>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Student roster records, FLN competency metrics, cultural story audio packages, and pre-generated worksheet templates are persisted locally in SQLite with WAL (Write-Ahead Logging) enabled. No external internet or cloud server is queried at any point during classroom instruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
