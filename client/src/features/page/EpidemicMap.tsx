export default function EpidemicMap() {
    return (
        <div className="pt-12 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Breadcrumb / Section ID */}
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Surveillance</span>
                <span className="text-slate-300 text-xs text-[10px]">•</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Geospatial Data</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                        แผนที่พื้นที่เสี่ยงโรคระบาด
                    </h1>
                    <p className="text-slate-500 font-medium max-w-xl text-lg">
                        National Risk Assessment Interface. Data is integrated directly from provincial cluster reports and hospital admissions.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
                        <span className="text-emerald-600 text-sm font-bold">Operational</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined">sensors</span>
                    </div>
                </div>
            </div>

            <div className="group relative bg-[#f8fafc] border border-slate-200 rounded-[40px] shadow-2xl shadow-emerald-900/5 overflow-hidden min-h-[650px] flex flex-col items-center justify-center">
                {/* Subtle Background Pattern for Placeholder */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

                <div className="relative z-10 p-12 flex flex-col items-center text-center gap-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full animate-pulse"></div>
                        <div className="relative w-28 h-28 rounded-[35%] bg-white border border-emerald-100 shadow-2xl text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-[56px]">public</span>
                        </div>
                    </div>

                    <div className="max-w-md">
                        <h3 className="text-2xl font-black text-slate-900 mb-3 font-heading">Map Engine Initialized</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            The national geospatial platform is ready for layer injection.
                            Please implement `react-leaflet` or `google-maps` logic here.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:-translate-y-1 transition-all">
                            Activate Live Layers
                        </button>
                        <button className="px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all">
                            Configure View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
