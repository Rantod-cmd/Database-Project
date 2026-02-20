import { useState, useMemo } from 'react';
import './FormStyles.css';

interface Disease {
    n: string;
    c: number;
}

interface ProvinceData {
    name: string;
    region: string;
    sev: 'n' | 'w' | 'e';
    total: number;
    delta: string;
    diseases: Disease[];
}

const DATA: ProvinceData[] = [
    { name: 'กรุงเทพมหานคร', region: 'กลาง', sev: 'e', total: 8420, delta: '+12%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 2840 }, { n: 'COVID-19', c: 1620 }, { n: 'ไข้เลือดออก', c: 980 }] },
    { name: 'เชียงใหม่', region: 'เหนือ', sev: 'e', total: 5640, delta: '+8%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 2100 }, { n: 'ไข้เลือดออก', c: 1240 }, { n: 'มาลาเรีย', c: 430 }] },
    { name: 'เชียงราย', region: 'เหนือ', sev: 'e', total: 4320, delta: '+15%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 1870 }, { n: 'มาลาเรีย', c: 820 }, { n: 'ไข้เลือดออก', c: 560 }] },
    { name: 'ขอนแก่น', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3980, delta: '+5%', diseases: [{ n: 'ไข้เลือดออก', c: 1540 }, { n: 'โรคมือเท้าปาก', c: 890 }, { n: 'ไข้หวัดใหญ่ B', c: 620 }] },
    { name: 'นครราชสีมา', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3760, delta: '+3%', diseases: [{ n: 'ไข้เลือดออก', c: 1380 }, { n: 'ไข้หวัดใหญ่ A', c: 960 }, { n: 'อุจจาระร่วง', c: 540 }] },
    { name: 'อุดรธานี', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 3210, delta: '-2%', diseases: [{ n: 'ไข้เลือดออก', c: 1210 }, { n: 'โรคมือเท้าปาก', c: 780 }, { n: 'ไข้หวัดใหญ่ A', c: 490 }] },
    { name: 'สงขลา', region: 'ใต้', sev: 'w', total: 2980, delta: '+4%', diseases: [{ n: 'ไข้เลือดออก', c: 1120 }, { n: 'ชิคุนกุนยา', c: 640 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }] },
    { name: 'นนทบุรี', region: 'กลาง', sev: 'w', total: 2840, delta: '+9%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 840 }, { n: 'COVID-19', c: 620 }, { n: 'ไข้เลือดออก', c: 420 }] },
    { name: 'ปทุมธานี', region: 'กลาง', sev: 'w', total: 2240, delta: '+7%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 780 }, { n: 'COVID-19', c: 540 }, { n: 'ไข้เลือดออก', c: 380 }] },
    { name: 'สุราษฎร์ธานี', region: 'ใต้', sev: 'w', total: 2640, delta: '+1%', diseases: [{ n: 'ไข้เลือดออก', c: 980 }, { n: 'ชิคุนกุนยา', c: 540 }, { n: 'โรคมือเท้าปาก', c: 320 }] },
    { name: 'ชลบุรี', region: 'ตะวันออก', sev: 'w', total: 2380, delta: '+6%', diseases: [{ n: 'ไข้เลือดออก', c: 840 }, { n: 'ไข้หวัดใหญ่ A', c: 720 }, { n: 'อาหารเป็นพิษ', c: 290 }] },
    { name: 'ตาก', region: 'ตะวันตก', sev: 'w', total: 1880, delta: '+6%', diseases: [{ n: 'มาลาเรีย', c: 820 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'ไข้หวัดใหญ่ A', c: 280 }] },
    { name: 'แม่ฮ่องสอน', region: 'เหนือ', sev: 'w', total: 1640, delta: '+4%', diseases: [{ n: 'มาลาเรีย', c: 740 }, { n: 'ไข้เลือดออก', c: 420 }, { n: 'ไข้หวัดใหญ่ A', c: 220 }] },
    { name: 'สมุทรปราการ', region: 'กลาง', sev: 'w', total: 1980, delta: '+5%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 720 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'โรคมือเท้าปาก', c: 320 }] },
    { name: 'อยุธยา', region: 'กลาง', sev: 'n', total: 1160, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 420 }, { n: 'ไข้หวัดใหญ่ A', c: 360 }, { n: 'อุจจาระร่วง', c: 180 }] },
    { name: 'ภูเก็ต', region: 'ใต้', sev: 'n', total: 1940, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 680 }, { n: 'ชิคุนกุนยา', c: 420 }, { n: 'อาหารเป็นพิษ', c: 240 }] },
    { name: 'นครปฐม', region: 'กลาง', sev: 'n', total: 1420, delta: '+2%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 540 }, { n: 'ไข้เลือดออก', c: 380 }, { n: 'โรคมือเท้าปาก', c: 220 }] },
    { name: 'นครศรีธรรมราช', region: 'ใต้', sev: 'n', total: 1820, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 720 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }, { n: 'โรคมือเท้าปาก', c: 210 }] },
    { name: 'กาญจนบุรี', region: 'ตะวันตก', sev: 'n', total: 1680, delta: '-3%', diseases: [{ n: 'มาลาเรีย', c: 640 }, { n: 'ไข้เลือดออก', c: 480 }, { n: 'ไข้หวัดใหญ่ A', c: 220 }] },
    { name: 'ราชบุรี', region: 'ตะวันตก', sev: 'n', total: 1540, delta: '+2%', diseases: [{ n: 'ไข้เลือดออก', c: 580 }, { n: 'ไข้หวัดใหญ่ A', c: 440 }, { n: 'อุจจาระร่วง', c: 180 }] },
    { name: 'ระยอง', region: 'ตะวันออก', sev: 'n', total: 1240, delta: '+1%', diseases: [{ n: 'ไข้หวัดใหญ่ A', c: 460 }, { n: 'ไข้เลือดออก', c: 380 }, { n: 'COVID-19', c: 180 }] },
    { name: 'ลำปาง', region: 'เหนือ', sev: 'n', total: 1180, delta: '-2%', diseases: [{ n: 'ไข้เลือดออก', c: 420 }, { n: 'มาลาเรีย', c: 310 }, { n: 'ไข้หวัดใหญ่ A', c: 240 }] },
    { name: 'อุบลราชธานี', region: 'ตะวันออกเฉียงเหนือ', sev: 'w', total: 2840, delta: '+3%', diseases: [{ n: 'ไข้เลือดออก', c: 1040 }, { n: 'โรคมือเท้าปาก', c: 680 }, { n: 'ไข้หวัดใหญ่ A', c: 440 }] },
    { name: 'กระบี่', region: 'ใต้', sev: 'n', total: 1040, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 380 }, { n: 'ชิคุนกุนยา', c: 280 }, { n: 'อาหารเป็นพิษ', c: 180 }] },
    { name: 'เลย', region: 'ตะวันออกเฉียงเหนือ', sev: 'n', total: 720, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 280 }, { n: 'มาลาเรีย', c: 200 }, { n: 'ไข้หวัดใหญ่ B', c: 140 }] },
    { name: 'เพชรบุรี', region: 'ตะวันตก', sev: 'n', total: 1320, delta: '-1%', diseases: [{ n: 'ไข้เลือดออก', c: 490 }, { n: 'ไข้หวัดใหญ่ B', c: 380 }, { n: 'อาหารเป็นพิษ', c: 150 }] },
    { name: 'สกลนคร', region: 'ตะวันออกเฉียงเหนือ', sev: 'n', total: 980, delta: '0%', diseases: [{ n: 'ไข้เลือดออก', c: 360 }, { n: 'โรคมือเท้าปาก', c: 280 }, { n: 'อุจจาระร่วง', c: 180 }] },
];

const PER_PAGE = 9;

const SEV_LABELS = { n: 'ปกติ', w: 'เฝ้าระวัง', e: 'ควบคุม' };
const REGION_LABELS: Record<string, string> = {
    'กลาง': 'ภาคกลาง', 'เหนือ': 'ภาคเหนือ',
    'ตะวันออกเฉียงเหนือ': 'ภาคอีสาน', 'ใต้': 'ภาคใต้',
    'ตะวันออก': 'ภาคตะวันออก', 'ตะวันตก': 'ภาคตะวันตก'
};

export default function Information() {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [sev, setSev] = useState<string>('all');
    const [min, setMin] = useState(0);
    const [sort, setSort] = useState('pd');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        let d = [...DATA];
        if (search) d = d.filter(p => p.name.includes(search.trim()));
        if (region) d = d.filter(p => p.region === region);
        if (sev !== 'all') d = d.filter(p => p.sev === sev);
        if (min > 0) d = d.filter(p => p.total >= min);

        d.sort((a, b) => {
            if (sort === 'pd') return b.total - a.total;
            if (sort === 'pa') return a.total - b.total;
            if (sort === 'na') return a.name.localeCompare(b.name, 'th');
            if (sort === 'nd') return b.name.localeCompare(a.name, 'th');
            return 0;
        });
        return d;
    }, [search, region, sev, min, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    // Reset page when filter changes
    useMemo(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

    const currentSlice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const range = useMemo(() => {
        const r: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) r.push(i);
        } else {
            r.push(1);
            if (page > 3) r.push('…');
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) r.push(i);
            if (page < totalPages - 2) r.push('…');
            r.push(totalPages);
        }
        return r;
    }, [page, totalPages]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--slate-100)', fontFamily: "'Sarabun', sans-serif" }}>

            <div className="wrap">
                <div className="page-eyebrow">สถิติระบาดวิทยา · 17 ก.พ. 2569</div>
                <h1 className="page-title">สถานการณ์โรครายจังหวัด</h1>
                <p className="page-sub">ผู้ป่วยสะสม 30 วันล่าสุด · แสดงสามโรคที่มีผู้ป่วยสูงสุดในแต่ละจังหวัด</p>

                {/* Filter Bar */}
                <div className="filter-bar">
                    <div className="search-wrap">
                        <span className="search-ico">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text" className="search" placeholder="ค้นหาจังหวัด…"
                            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>

                    <div className="fsep"></div>

                    <span className="flabel">ภาค</span>
                    <select className="fsel" value={region} onChange={e => { setRegion(e.target.value); setPage(1); }}>
                        <option value="">ทุกภาค</option>
                        <option value="กลาง">ภาคกลาง</option>
                        <option value="เหนือ">ภาคเหนือ</option>
                        <option value="ตะวันออกเฉียงเหนือ">ภาคอีสาน</option>
                        <option value="ใต้">ภาคใต้</option>
                        <option value="ตะวันออก">ภาคตะวันออก</option>
                        <option value="ตะวันตก">ภาคตะวันตก</option>
                    </select>

                    <div className="fsep"></div>

                    <span className="flabel">ผู้ป่วย</span>
                    <select className="fsel" value={min} onChange={e => { setMin(Number(e.target.value)); setPage(1); }}>
                        <option value="0">ทุกจำนวน</option>
                        <option value="500">500+ ราย</option>
                        <option value="1000">1,000+ ราย</option>
                        <option value="3000">3,000+ ราย</option>
                        <option value="5000">5,000+ ราย</option>
                    </select>

                    <div className="fsep"></div>

                    <span className="flabel">ระดับ</span>
                    <div className="chips">
                        <div className={`chip ${sev === 'all' ? 'on' : ''}`} onClick={() => { setSev('all'); setPage(1); }}>ทั้งหมด</div>
                        <div className={`chip ${sev === 'n' ? 'on' : ''}`} onClick={() => { setSev('n'); setPage(1); }}>ปกติ</div>
                        <div className={`chip ${sev === 'w' ? 'on w' : ''}`} onClick={() => { setSev('w'); setPage(1); }}>เฝ้าระวัง</div>
                        <div className={`chip ${sev === 'e' ? 'on e' : ''}`} onClick={() => { setSev('e'); setPage(1); }}>ฉุกเฉิน</div>
                    </div>
                </div>

                {/* Meta Row */}
                <div className="meta">
                    <span className="meta-count">แสดง <strong>{currentSlice.length}</strong> จาก <strong>{filtered.length}</strong> จังหวัด</span>
                    <div className="meta-sort">
                        <span className="meta-sort-label">เรียงตาม</span>
                        <select className="fsel" value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                            <option value="pd">ผู้ป่วยมาก → น้อย</option>
                            <option value="pa">ผู้ป่วยน้อย → มาก</option>
                            <option value="na">ชื่อ ก → ฮ</option>
                            <option value="nd">ชื่อ ฮ → ก</option>
                        </select>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid">
                    {currentSlice.length === 0 ? (
                        <div className="empty">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <p>ไม่พบจังหวัดที่ตรงกับเงื่อนไข</p>
                        </div>
                    ) : (
                        currentSlice.map((p, i) => (
                            <div key={p.name} className={`card-grid-item ${p.sev}`} style={{ animationDelay: `${i * 0.04}s` }}>
                                <div className="card-stripe"></div>
                                <div className="card-head">
                                    <div>
                                        <div className="card-region">{REGION_LABELS[p.region] || p.region}</div>
                                        <div className="card-name">{p.name}</div>
                                    </div>
                                    <span className={`sev ${p.sev}`}>
                                        <span className="dot"></span>
                                        {SEV_LABELS[p.sev]}
                                    </span>
                                </div>
                                <div className="card-stats">
                                    <span className="stat-lbl">ผู้ป่วยสะสม 30 วัน</span>
                                    <span className={`delta ${p.delta === '0%' ? 's' : p.delta.startsWith('+') ? 'u' : 'd'}`}>
                                        {p.delta === '0%' ? '→' : p.delta.startsWith('+') ? '↑' : '↓'} {p.delta}
                                    </span>
                                    <span className="stat-val">{p.total.toLocaleString()}</span>
                                </div>
                                <div className="diseases">
                                    {p.diseases.map((d, ri) => (
                                        <div key={ri} className="drow">
                                            <span className="drank">{ri + 1}</span>
                                            <div className="dbar-wrap">
                                                <div className="dname">{d.n}</div>
                                                <div className="dbar-bg">
                                                    <div
                                                        className={`dbar r${ri + 1}`}
                                                        style={{ width: `${Math.round(d.c / p.diseases[0].c * 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="dcount">{d.c.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <span className="pg-info">หน้า <strong>{page}</strong> จาก <strong>{totalPages}</strong></span>
                    <div className="pg-btns">
                        <button
                            className="pb" disabled={page === 1}
                            onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >‹</button>

                        {range.map((r, i) => (
                            r === '…' ? (
                                <span key={`dots-${i}`} className="pg-dots">…</span>
                            ) : (
                                <button
                                    key={r}
                                    className={`pb ${r === page ? 'on' : ''}`}
                                    onClick={() => { setPage(Number(r)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    {r}
                                </button>
                            )
                        ))}

                        <button
                            className="pb" disabled={page === totalPages}
                            onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >›</button>
                    </div>
                </div>

            </div>
        </div>
    );
}