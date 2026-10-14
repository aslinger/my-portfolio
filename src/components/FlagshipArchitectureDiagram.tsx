export const FlagshipArchitectureDiagram = () => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    System Architecture &amp; Data Flow
                </h4>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 sm:p-4 overflow-x-auto shadow-xs">
                <img
                    src="/diagrams/autonomous-platform.svg"
                    alt="Autonomous Platform Architecture Diagram"
                    className="w-full h-auto min-w-[650px] max-h-[450px] object-contain rounded-lg mx-auto"
                />
            </div>
        </div>
    );
};
