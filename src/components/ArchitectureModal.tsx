import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Repository } from '../types';
import { CASE_STUDIES } from '../constants/constants';

interface ArchitectureModalProps {
    project: Repository | null;
    onClose: () => void;
}

export const ArchitectureModal = ({ project, onClose }: ArchitectureModalProps) => {
    if (!project) return null;

    const study = CASE_STUDIES[project.html_url];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <h3 className="text-xl font-bold text-slate-800">
                        {project.customTitle || project.name} Architecture
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Content / Image Area */}
                <div className="p-8 bg-slate-50 flex justify-center items-center overflow-auto">
                    {/* 3. CONDITIONAL RENDER USING THE LOOKUP */}
                    {study?.architectureImage ? (
                        <img
                            src={study.architectureImage}
                            alt={`${study.title || project.name} Architecture Diagram`}
                            className="rounded-lg shadow-lg border border-slate-200 max-h-[70vh] w-auto object-contain"
                        />
                    ) : (
                        <div className="text-slate-400 py-10 flex flex-col items-center">
                            <span className="text-lg">No architecture diagram available.</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};