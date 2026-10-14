import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, GitBranch, CheckCircle, Server, RefreshCw } from 'lucide-react';

type MigrationStep = 1 | 2 | 3 | 4;

export const MainframeMigrationDiagram = () => {
    const [step, setStep] = useState<MigrationStep>(1);

    const steps = [
        {
            num: 1,
            title: "1. Dual-Write Ingestion",
            subtitle: "Concurrent Legacy & Kafka Execution",
            desc: "Every transaction (~12M/day) was written to both the IBM Z-Series mainframe and the newly architected multi-region Spring Boot + Kafka clusters simultaneously. The legacy mainframe remained the authoritative source of truth while the new pipeline was verified under full production load.",
            metrics: "12M records/day · Zero production downtime"
        },
        {
            num: 2,
            title: "2. Reconciliation Mesh",
            subtitle: "Automated Parity & UPC Correction",
            desc: "Designed and deployed a Financial Reconciliation Mesh ingesting from 5 disparate event streams. It audited outputs from both systems, auto-corrected UPC inconsistencies, and flagged any schema evolution drifts using Apache Avro before traffic was shifted.",
            metrics: "100.0% data parity · 5 ingested streams"
        },
        {
            num: 3,
            title: "3. Phased Canary Cutover",
            subtitle: "Automated Rollback Gates & xMatters Alerting",
            desc: "Traffic was shifted incrementally (1% → 10% → 50% → 100%) across regions. Automated rollback tripwires monitored xMatters alerting and error rates. If any parity invariant failed, traffic instantly reverted back to the mainframe with zero transaction loss.",
            metrics: "Billions in US transaction volume safeguarded"
        },
        {
            num: 4,
            title: "4. Full Cutover & Decommission",
            subtitle: "10–15 Microservices Operating Cloud-Native",
            desc: "With 100% parity proven and all downstream consumers consuming the Kafka/Avro pipeline, the IBM Z-Series financial integration was safely decoupled. The system was recognized with the 2021 Top Performer award for seamless zero-downtime execution.",
            metrics: "10–15 microservices · Top Performer Award 2021"
        }
    ];

    const currentStepData = steps.find(s => s.num === step)!;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-white my-4 shadow-lg">
            {/* Header & Step Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-slate-800">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                        <GitBranch size={13} /> Architecture Case Study
                    </span>
                    <h4 className="text-base font-bold text-slate-100 mt-0.5">
                        Walmart Mainframe-to-Microservices Dual-Write Migration
                    </h4>
                </div>

                {/* Step Pills */}
                <div className="flex bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 text-xs">
                    {steps.map(s => (
                        <button
                            key={s.num}
                            onClick={() => setStep(s.num as MigrationStep)}
                            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                                step === s.num
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Step {s.num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Architecture Pipeline Visualizer */}
            <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center relative">
                    {/* Block 1: Ingestion */}
                    <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                            <span>Ingestion</span>
                            <Server size={14} className="text-blue-400" />
                        </div>
                        <div className="font-bold text-sm text-slate-100">
                            ~12M Records/Day
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                            High-volume US store & ecommerce POS financial transactions
                        </p>
                        <div className="mt-3 text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded w-fit border border-blue-900/60">
                            Dual-Write Split
                        </div>
                    </div>

                    {/* Block 2: Dual Execution Paths */}
                    <div className="space-y-2">
                        {/* Legacy Path */}
                        <motion.div
                            animate={{
                                opacity: step === 4 ? 0.35 : 1,
                                borderColor: step === 1 ? '#3b82f6' : '#475569',
                                scale: step === 1 ? 1.02 : 1
                            }}
                            className="p-2.5 rounded-lg bg-slate-800/90 border transition-all"
                        >
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                                    <Database size={12} className="text-amber-400" /> IBM Z-Series
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                                    {step === 4 ? "Decommissioned" : "Mainframe"}
                                </span>
                            </div>
                        </motion.div>

                        {/* Modernized Kafka Path */}
                        <motion.div
                            animate={{
                                opacity: 1,
                                borderColor: step >= 2 ? '#3b82f6' : '#475569',
                                scale: step >= 2 ? 1.02 : 1
                            }}
                            className="p-2.5 rounded-lg bg-blue-950/40 border transition-all"
                        >
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-blue-300 flex items-center gap-1.5">
                                    <Cpu size={12} className="text-blue-400" /> Kafka + Spring Boot
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-mono">
                                    10–15 Services
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Block 3: Reconciliation Mesh & Rollback Gates */}
                    <motion.div
                        animate={{
                            borderColor: step === 2 || step === 3 ? '#3b82f6' : '#334155',
                            backgroundColor: step === 2 || step === 3 ? 'rgba(30, 58, 138, 0.3)' : 'rgba(15, 23, 42, 0.6)'
                        }}
                        className="p-3.5 rounded-lg border flex flex-col justify-between h-full"
                    >
                        <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                            <span>Audit & Gates</span>
                            <RefreshCw size={14} className="text-blue-400" />
                        </div>
                        <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                            Reconciliation Mesh
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                            5-stream parity validator, UPC corrections & Avro schema evolution
                        </p>
                        <div className="mt-3 text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded w-fit border border-emerald-900/60">
                            {step >= 2 ? "100.0% Parity Gate" : "Standby Audit"}
                        </div>
                    </motion.div>

                    {/* Block 4: Consumers & Cutover */}
                    <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                            <span>Downstream</span>
                            <CheckCircle size={14} className="text-emerald-400" />
                        </div>
                        <div className="font-bold text-sm text-slate-100">
                            {step === 4 ? "100% Modernized" : "Canary Migration"}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                            Enterprise financial ledger, SOX reporting, and downstream services
                        </p>
                        <div className="mt-3 text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded w-fit border border-purple-900/60">
                            {step === 1 && "Traffic: 0% Cloud"}
                            {step === 2 && "Traffic: Shadow Canary"}
                            {step === 3 && "Traffic: 1% → 100% Shifting"}
                            {step === 4 && "Zero Downtime Achieved"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Step Explanation Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                        <h5 className="font-bold text-sm text-blue-300 flex items-center gap-2">
                            <span>{currentStepData.title}:</span>
                            <span className="text-slate-200 font-medium">{currentStepData.subtitle}</span>
                        </h5>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60 w-fit">
                            {currentStepData.metrics}
                        </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        {currentStepData.desc}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
