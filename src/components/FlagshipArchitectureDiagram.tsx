import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Cpu, Database, Cloud, Sparkles, Terminal } from 'lucide-react';

type Mode = 'flow' | 'recovery' | 'observability';

export const FlagshipArchitectureDiagram = () => {
    const [activeMode, setActiveMode] = useState<Mode>('flow');

    return (
        <div className="mt-8 bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 text-white shadow-xl">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
                <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <Terminal size={14} /> Interactive Systems Topology
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">
                        Autonomous Platform Architecture & Concurrency Model
                    </h3>
                </div>

                {/* View Mode Selector */}
                <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs font-medium">
                    <button
                        onClick={() => setActiveMode('flow')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                            activeMode === 'flow'
                                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Data Streaming Flow
                    </button>
                    <button
                        onClick={() => setActiveMode('recovery')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                            activeMode === 'recovery'
                                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        ACID Crash Recovery
                    </button>
                    <button
                        onClick={() => setActiveMode('observability')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                            activeMode === 'observability'
                                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Telemetry & Gemini AI
                    </button>
                </div>
            </div>

            {/* Architecture Node Visualizer */}
            <div className="py-8 grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch relative">
                {/* Node 1: Ingestion Layer */}
                <motion.div
                    animate={{
                        borderColor: activeMode === 'flow' ? '#3b82f6' : '#334155',
                        backgroundColor: activeMode === 'flow' ? 'rgba(30, 58, 138, 0.25)' : 'rgba(15, 23, 42, 0.6)'
                    }}
                    className="p-5 rounded-xl border flex flex-col justify-between transition-colors relative"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            01 · Ingestion Layer
                        </span>
                        <Cloud size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-100 mb-1.5">
                            WebSocket Feeds
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Non-blocking async tick feeds ingested via Python <code className="text-blue-300">asyncio</code> and <code className="text-blue-300">websockets</code>.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                        ⚡ Sub-millisecond dispatch
                    </div>
                </motion.div>

                {/* Flow Arrow */}
                <div className="hidden lg:flex items-center justify-center -mx-2 z-10">
                    <ArrowRight size={18} className="text-slate-600" />
                </div>

                {/* Node 2: Concurrency & State Machine */}
                <motion.div
                    animate={{
                        borderColor: activeMode === 'recovery' || activeMode === 'flow' ? '#3b82f6' : '#334155',
                        backgroundColor: activeMode === 'recovery' ? 'rgba(30, 58, 138, 0.35)' : 'rgba(15, 23, 42, 0.6)'
                    }}
                    className="p-5 rounded-xl border flex flex-col justify-between transition-colors relative"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            02 · Core Engine & FSM
                        </span>
                        <Cpu size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-100 mb-1.5">
                            ACID State Machine
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Circular buffers calculate rolling metrics in RAM; states atomically journaled to <code className="text-blue-300">SQLite WAL</code>.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-blue-400">
                        🛡️ Zero-orphan hot recovery
                    </div>
                </motion.div>

                {/* Flow Arrow */}
                <div className="hidden lg:flex items-center justify-center -mx-2 z-10">
                    <ArrowRight size={18} className="text-slate-600" />
                </div>

                {/* Node 3: Shadow Sandbox & Execution */}
                <motion.div
                    animate={{
                        borderColor: activeMode === 'flow' ? '#3b82f6' : '#334155',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)'
                    }}
                    className="p-5 rounded-xl border flex flex-col justify-between transition-colors relative"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            03 · Shadow Incubator
                        </span>
                        <ShieldCheck size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-100 mb-1.5">
                            Dynamic Execution
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Dual-daemon setup running an isolated shadow process under <code className="text-blue-300">systemd</code> to forward-test models safely.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400">
                        🔒 Isolated staging canary
                    </div>
                </motion.div>

                {/* Flow Arrow */}
                <div className="hidden lg:flex items-center justify-center -mx-2 z-10">
                    <ArrowRight size={18} className="text-slate-600" />
                </div>

                {/* Node 4: Observability & GenAI */}
                <motion.div
                    animate={{
                        borderColor: activeMode === 'observability' ? '#3b82f6' : '#334155',
                        backgroundColor: activeMode === 'observability' ? 'rgba(30, 58, 138, 0.35)' : 'rgba(15, 23, 42, 0.6)'
                    }}
                    className="p-5 rounded-xl border flex flex-col justify-between transition-colors relative"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            04 · Telemetry & GenAI
                        </span>
                        <Sparkles size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-100 mb-1.5">
                            Prometheus & Gemini
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Embedded <code className="text-blue-300">/metrics</code> HTTP exporter (&lt;5MB RAM) + Google Gemini API automated risk digest.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
                        📊 Sub-ms cosine distance
                    </div>
                </motion.div>
            </div>

            {/* Mode Explanation Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0 mt-0.5">
                            {activeMode === 'flow' && <Activity size={18} />}
                            {activeMode === 'recovery' && <Database size={18} />}
                            {activeMode === 'observability' && <Sparkles size={18} />}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-200">
                                {activeMode === 'flow' && "Real-Time Pipeline Highlights:"}
                                {activeMode === 'recovery' && "ACID Hot-Recovery Guarantees:"}
                                {activeMode === 'observability' && "Zero-Overhead Metrics & LLM Synthesis:"}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                                {activeMode === 'flow' && "Asynchronous Python event loop with in-memory ring buffers computes rolling VWAP and distribution metrics without external Redis or cache latency."}
                                {activeMode === 'recovery' && "SQLite in WAL mode allows immediate atomic state replay. In the event of network disruption or process restart, the state machine restores in <100ms without orphan positions."}
                                {activeMode === 'observability' && "Custom embedded HTTP metrics exporter serves Prometheus scrape endpoints directly in-process with <5MB RAM footprint, while Google Gemini 3.8 Flash synthesizes end-of-run executive risk reports."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
