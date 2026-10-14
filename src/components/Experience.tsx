import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, GraduationCap, Terminal, Award, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { PROFESSIONAL_EXPERIENCE, EDUCATION } from '../constants/constants';

type FilterCategory = 'all' | 'distributed' | 'java-kafka' | 'python-async' | 'finops-sre' | 'ai';

export const Experience = () => {
    const [filter, setFilter] = useState<FilterCategory>('all');
    const [expandedDeepDive, setExpandedDeepDive] = useState(false);

    const filterLabels: { key: FilterCategory; label: string }[] = [
        { key: 'all', label: 'All Roles (15 Yrs)' },
        { key: 'distributed', label: 'Distributed Systems & Cloud' },
        { key: 'java-kafka', label: 'Java & Kafka' },
        { key: 'python-async', label: 'Python & Async' },
        { key: 'finops-sre', label: 'FinOps & Resilience' },
        { key: 'ai', label: 'AI & GenAI' }
    ];

    const isMatch = (job: typeof PROFESSIONAL_EXPERIENCE[0]) => {
        if (filter === 'all') return true;
        const envStr = (job.environment || []).join(' ').toLowerCase();
        const highlightStr = job.highlights.map(h => `${h.title} ${h.description}`).join(' ').toLowerCase();
        const content = `${envStr} ${highlightStr}`;

        if (filter === 'distributed') return content.includes('distributed') || content.includes('cloud') || content.includes('aws') || content.includes('kubernetes');
        if (filter === 'java-kafka') return content.includes('java') || content.includes('kafka') || content.includes('spring');
        if (filter === 'python-async') return content.includes('python') || content.includes('async');
        if (filter === 'finops-sre') return content.includes('finops') || content.includes('resilience') || content.includes('prometheus') || content.includes('cost') || content.includes('alerting');
        if (filter === 'ai') return content.includes('gemini') || content.includes('ai') || content.includes('vector') || content.includes('copilot');
        return true;
    };

    return (
        <section id="experience" className="mb-24 scroll-mt-20">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-1 bg-blue-600 rounded-full" />
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Professional Experience
                        </h2>
                    </div>
                    <p className="text-slate-500 text-sm ml-4">
                        15 years architecting enterprise distributed systems, cloud transformations, and event streaming
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs">
                    {filterLabels.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                                filter === key
                                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
                {PROFESSIONAL_EXPERIENCE.map((job, index) => {
                    const matched = isMatch(job);
                    const isWalmartTransformation = job.company.includes('Walmart') && job.role.includes('Software Engineer 2');

                    return (
                        <motion.div
                            key={`${job.company}-${job.role}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className={`relative group transition-opacity duration-300 ${matched ? 'opacity-100' : 'opacity-40'}`}
                        >
                            {/* Timeline Node Icon */}
                            <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center shadow-xs transition-all ${
                                matched ? 'border-blue-600 group-hover:bg-blue-600 text-blue-600 group-hover:text-white' : 'border-slate-300 text-slate-400'
                            }`}>
                                <Briefcase size={12} />
                            </div>

                            {/* Experience Card */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-blue-200 transition-all">
                                {/* Card Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {job.role}
                                            </h3>
                                            <span className="text-slate-400 font-light hidden sm:inline">|</span>
                                            <span className="text-lg font-semibold text-blue-600">
                                                {job.company}
                                            </span>
                                        </div>
                                        {job.location && (
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                                <MapPin size={13} className="text-slate-400" />
                                                <span>{job.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
                                        <Calendar size={13} className="text-blue-600" />
                                        <span>{job.period}</span>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <ul className="space-y-3 mb-6">
                                    {job.highlights.map((highlight, hIdx) => (
                                        <li key={hIdx} className="text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                                            <span className="text-blue-500 font-bold mt-1 shrink-0">•</span>
                                            <div>
                                                <strong className="text-slate-800 font-semibold">{highlight.title}:</strong>{' '}
                                                <span>{highlight.description}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Deep-Dive Architecture Accordion for Mainframe-to-Microservices */}
                                {isWalmartTransformation && (
                                    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/50 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedDeepDive(!expandedDeepDive)}
                                            className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-blue-700 hover:bg-blue-100/50 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Layers size={15} /> System Design: Dual-Write Zero-Downtime Cutover Architecture (~12M/Day)
                                            </span>
                                            {expandedDeepDive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>

                                        <AnimatePresence>
                                            {expandedDeepDive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-4 pb-4 pt-1 text-xs text-slate-700 border-t border-blue-100 space-y-2"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                                        <div className="bg-white p-3 rounded border border-blue-100">
                                                            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                                                                <CheckCircle2 size={13} className="text-blue-600" /> 1. Dual-Write Ingestion
                                                            </div>
                                                            <p className="text-slate-600 text-[11px] leading-relaxed">
                                                                Synchronous mainframe writes mirrored into Kafka topics, running both pipelines concurrently in production.
                                                            </p>
                                                        </div>
                                                        <div className="bg-white p-3 rounded border border-blue-100">
                                                            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                                                                <CheckCircle2 size={13} className="text-blue-600" /> 2. Reconciliation Mesh
                                                            </div>
                                                            <p className="text-slate-600 text-[11px] leading-relaxed">
                                                                Automated audit mesh validating 100% financial data integrity and UPC parity across IBM Z-Series and cloud databases.
                                                            </p>
                                                        </div>
                                                        <div className="bg-white p-3 rounded border border-blue-100">
                                                            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                                                                <CheckCircle2 size={13} className="text-blue-600" /> 3. Canary Traffic Shift
                                                            </div>
                                                            <p className="text-slate-600 text-[11px] leading-relaxed">
                                                                Phased region-by-region cutover (1% → 10% → 100%) with automated rollback gates ensuring zero loss across billions in volume.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}

                                {/* Environment Tags */}
                                {job.environment && job.environment.length > 0 && (
                                    <div className="pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            <Terminal size={13} className="text-blue-600" />
                                            <span>Environment</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.environment.map((envItem) => (
                                                <span
                                                    key={envItem}
                                                    className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                                                >
                                                    {envItem}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Education Section */}
            <div className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-7 w-1 bg-blue-600 rounded-full" />
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <GraduationCap className="text-blue-600" size={24} />
                        Education
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EDUCATION.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                                        {edu.degree}
                                    </h4>
                                    <Award size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                </div>
                                <p className="text-sm font-semibold text-blue-600 mb-2">
                                    {edu.institution}
                                </p>
                            </div>
                            <p className="text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
                                {edu.details}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
