import React from 'react';

interface PaginationProps {
    page: number; 
    totalPages: number; 
    onPageChange: (newPage: number) => void;
}

const Pagination:React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-wrap items-center justify-between gap-6 p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm mt-8">
            <span className="text-sm font-bold text-slate-400 min-w-max">
                แสดงหน้า <strong className="text-slate-900">{page}</strong> จากทั้งหมด <strong className="text-slate-900">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none transition-all outline-none"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <div className="flex items-center gap-2 px-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                        if (totalPages > 7) {
                            const isEdge = p === 1 || p === totalPages;
                            const isNear = p >= page - 1 && p <= page + 1;
                            const isEllipsis = p === page - 2 || p === page + 2;

                            if (!isEdge && !isNear) {
                                if (isEllipsis) return <span key={`dots-${p}`} className="text-slate-300">...</span>;
                                return null;
                            }
                        }

                        return (
                            <button
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                                    page === p
                                        ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 -translate-y-1"
                                        : "text-slate-400 hover:bg-slate-50"
                                }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none transition-all outline-none"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;