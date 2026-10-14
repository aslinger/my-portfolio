import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, GraduationCap, Terminal, Award } from 'lucide-react';
import { PROFESSIONAL_EXPERIENCE, EDUCATION } from '../constants/constants';

export const Experience = () => {
    return (
        <section className="mb-24">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-10">
                <div className="h-8 w-1 bg-blue-600 rounded-full" />
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Professional Experience
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        15 years of architecting high-scale distributed systems and event-driven infrastructure
                    </p>
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
                {PROFESSIONAL_EXPERIENCE.map((job, index) => (
                    <motion.div
                        key={`${job.company}-${job.role}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        className="relative group"
                    >
                        {/* Timeline Node Icon */}
                        <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                            <Briefcase size={12} className="text-blue-600 group-hover:text-white transition-colors" />
                        </div>

                        {/* Experience Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
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
                ))}
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
                            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between"
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
