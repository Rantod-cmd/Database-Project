export default function ContactUs() {
    return (
        <div className="pt-12 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Column: Contact Info */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Connect With Us</span>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1] font-heading">
                            How can we <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-4">assist</span> your agency?
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                            Our specialized team provides 24/7 technical support and administrative guidance for the national epidemic surveillance network.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">location_on</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">MOPH Headquarters</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Building 1, Tiwanon Road, Mueang District,<br />
                                    Nonthaburi 11000, Thailand
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">call</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Direct Assistance</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Support Line: +66 (0) 2590 1000<br />
                                    Emergency Hotline: 1422
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">mail</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Electronic Mail</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    General: info@moph.go.th<br />
                                    Reporting: disease.control@ddc.mail.go.th
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-white h-72 relative group">
                        <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-emerald-900/0 transition-colors duration-500 z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"
                            alt="MOPH Location"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-2xl animate-bounce">
                                <span className="material-symbols-outlined text-white text-[24px]">location_on</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="relative">
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-100 rounded-full blur-[100px] opacity-20"></div>
                    <div className="relative z-10 p-10 md:p-14 bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white shadow-2xl shadow-emerald-900/10">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-black text-slate-900 font-heading tracking-tight">Send a Dispatch</h2>
                                <p className="text-slate-500 text-sm font-medium">Please provide accurate details for official logging.</p>
                            </div>

                            <form className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Dr. Somchai Doe"
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Agency / Dept.</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Bamrasnaradura"
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Data verification request..."
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Describe your inquiry in detail..."
                                        className="w-full px-6 py-5 rounded-3xl bg-white border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-medium text-slate-700 resize-none"
                                    ></textarea>
                                </div>

                                <button className="mt-4 w-full py-5 rounded-2xl bg-emerald-600 text-white font-black shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                                    Submit Official Dispatch
                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
