import { Terminal, Eye } from 'lucide-react';

interface FlagshipArchitectureDiagramProps {
    onViewDiagram: () => void;
}

export const FlagshipArchitectureDiagram = ({ onViewDiagram }: FlagshipArchitectureDiagramProps) => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                    <Terminal size={18} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-800">
                        System Architecture Topology
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                        End-to-end data flow: WebSocket ingestion, SQLite WAL state machine, and telemetry
                    </p>
                </div>
            </div>

            <button
                onClick={onViewDiagram}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs w-fit shrink-0 cursor-pointer"
            >
                <Eye size={14} /> View Architecture Diagram
            </button>
        </div>
    );
};
