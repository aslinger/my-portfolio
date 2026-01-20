import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Repository } from '../types';

interface ArchitectureModalProps {
    project: Repository | null;
    onClose: () => void;
}

export const ArchitectureModal = ({ project, onClose }: ArchitectureModalProps) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">
                        {project.customTitle || project.name} Architecture
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 bg-slate-50 flex justify-center">
                    <img
                        src={`/diagrams/${project.name}.svg`}
                        alt="Architecture Diagram"
                        className="max-h-[60vh] object-contain"
                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x400?text=Architecture+Diagram+Coming+Soon")}
                    />
                </div>
            </motion.div>
        </div>
    );
};