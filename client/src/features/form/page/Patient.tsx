import { useState, useEffect, useRef } from 'react';
import './FormStyles.css';

const STORAGE_KEY = 'moph_facility_profile';

interface Facility {
    code: string;
    name: string;
}

export default function Patient() {
    const [facility, setFacility] = useState<Facility | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalCode, setModalCode] = useState('');
    const [modalName, setModalName] = useState('');
    const [modalErrors, setModalErrors] = useState({ code: false, name: false });
    const modalCodeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data: Facility = JSON.parse(raw);
                if (data.code && data.name) {
                    setFacility(data);
                    return;
                }
            }
        } catch { }
        // If no data, open modal after a short delay
        const t = setTimeout(() => openModal(), 350);
        return () => clearTimeout(t);
    }, []);

    const openModal = (prefill?: Facility | null) => {
        if (prefill) {
            setModalCode(prefill.code);
            setModalName(prefill.name);
        } else {
            setModalCode('');
            setModalName('');
        }
        setModalErrors({ code: false, name: false });
        setModalOpen(true);
        setTimeout(() => modalCodeRef.current?.focus(), 150);
    };

    const closeModal = () => setModalOpen(false);

    const saveAndApply = () => {
        const code = modalCode.trim();
        const name = modalName.trim();
        let valid = true;
        const newErrors = { code: false, name: false };

        if (!code) { newErrors.code = true; valid = false; }
        if (!name) { newErrors.name = true; valid = false; }

        setModalErrors(newErrors);

        if (!valid) return;

        const data = { code, name };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setFacility(data);
        closeModal();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') saveAndApply();
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--slate-100)', fontFamily: "'Sarabun', sans-serif" }}>
            <div className="card">

                {/* Header */}
                <div className="header">
                    <div className="header-inner">
                        <div className="logo-block">
                            <div className="logo-badge">สธ</div>
                            <div>
                                <div className="header-title">ระบบรายงานข้อมูลผู้ป่วย</div>
                                <div className="header-sub">กระทรวงสาธารณสุข · Ministry of Public Health</div>
                            </div>
                        </div>
                        <div className="doc-id-block">
                            <div className="doc-id-label">Document ID</div>
                            <div className="doc-id-val">MOPH-PAT-2026-00001</div>
                        </div>
                    </div>
                </div>

                {/* Notice */}
                <div className="notice">
                    <div className="notice-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                        </svg>
                    </div>
                    <p><strong>คำชี้แจง:</strong> ข้อมูลผู้ป่วยถือเป็นข้อมูลส่วนบุคคล กรุณาปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) และตรวจสอบความถูกต้องก่อนบันทึก</p>
                </div>

                {/* Form */}
                <form onSubmit={e => e.preventDefault()}>

                    {/* Section 1: หน่วยงาน */}
                    <div className="section">
                        <div className="section-title"><span className="section-num">1</span>ข้อมูลหน่วยงานผู้รายงาน</div>

                        {facility && (
                            <div className="facility-chip visible">
                                <div className="facility-chip-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <div className="facility-chip-text">
                                    <strong>{facility.name}</strong>
                                    <span>รหัส: <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{facility.code}</span></span>
                                </div>
                                <button type="button" className="facility-chip-edit" onClick={() => openModal(facility)}>
                                    ✎ แก้ไขข้อมูลหน่วยงาน
                                </button>
                            </div>
                        )}

                        <div className="grid-2">
                            <div>
                                <label>รหัสสถานพยาบาล <span className="required">*</span><span className="sublabel"> (5 หลัก)</span></label>
                                <input
                                    type="text" className="mono-input" placeholder="00000" maxLength={5}
                                    value={facility?.code || ''}
                                    readOnly={!!facility}
                                    style={facility ? { background: 'var(--green-tint)', color: 'var(--green-deep)', fontWeight: 500, cursor: 'default' } : {}}
                                />
                            </div>
                            <div>
                                <label>ชื่อหน่วยงาน <span className="required">*</span></label>
                                <input
                                    type="text" placeholder="โรงพยาบาล / รพ.สต. ..."
                                    value={facility?.name || ''}
                                    readOnly={!!facility}
                                    style={facility ? { background: 'var(--green-tint)', color: 'var(--green-deep)', fontWeight: 500, cursor: 'default' } : {}}
                                />
                            </div>
                            <div>
                                <label>จังหวัด</label>
                                <select defaultValue="">
                                    <option value="">— เลือกจังหวัด —</option>
                                    <option>กรุงเทพมหานคร</option>
                                    <option>เชียงใหม่</option>
                                    <option>ขอนแก่น</option>
                                    <option>สงขลา</option>
                                    <option>อื่นๆ</option>
                                </select>
                            </div>
                            <div>
                                <label>วันที่รายงาน <span className="required">*</span></label>
                                <input type="text" placeholder="วว/ดด/ปปปป" className="mono-input" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: ข้อมูลผู้ป่วย */}
                    <div className="section">
                        <div className="section-title"><span className="section-num">2</span>ข้อมูลผู้ป่วย</div>
                        <div className="grid-2">
                            <div>
                                <label>HN (Hospital Number) <span className="required">*</span></label>
                                <input type="text" className="mono-input" placeholder="เช่น 2026-00001" />
                            </div>
                            <div>
                                <label>เลขบัตรประชาชน <span className="sublabel">(13 หลัก)</span></label>
                                <input type="text" className="mono-input" placeholder="0 0000 00000 00 0" maxLength={13} />
                            </div>
                            <div>
                                <label>ชื่อ-นามสกุล <span className="required">*</span></label>
                                <input type="text" placeholder="ชื่อ นามสกุล" />
                            </div>
                            <div>
                                <label>เพศ <span className="required">*</span></label>
                                <select defaultValue="">
                                    <option value="">— เลือกเพศ —</option>
                                    <option>ชาย</option>
                                    <option>หญิง</option>
                                    <option>ไม่ระบุ</option>
                                </select>
                            </div>
                            <div>
                                <label>อายุ (ปี) <span className="required">*</span></label>
                                <input type="number" placeholder="0" min={0} max={150} />
                            </div>
                            <div>
                                <label>วันเริ่มป่วย</label>
                                <input type="text" placeholder="วว/ดด/ปปปป" className="mono-input" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: อาการและการวินิจฉัย */}
                    <div className="section">
                        <div className="section-title"><span className="section-num">3</span>อาการและการวินิจฉัย</div>
                        <div className="grid-2">
                            <div>
                                <label>การวินิจฉัยโรค <span className="required">*</span></label>
                                <input type="text" placeholder="เช่น ไข้เลือดออก, COVID-19 ..." />
                            </div>
                            <div>
                                <label>รหัสโรค ICD-10</label>
                                <input type="text" className="mono-input" placeholder="เช่น A90, J06.9 ..." />
                            </div>
                            <div className="col-span-2">
                                <label>อาการสำคัญ <span className="sublabel">(ถ้ามี)</span></label>
                                <textarea placeholder="บันทึกอาการสำคัญที่พบ ..." />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: ผลการรักษา */}
                    <div className="section">
                        <div className="section-title">
                            <span className="section-num">4</span>ผลการรักษาและระดับความรุนแรง
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>ระดับความรุนแรงของอาการ <span className="required">*</span></label>
                            <div className="radio-group">
                                <label className="radio-card rc-normal">
                                    <input type="radio" name="severity" value="mild" />
                                    <span className="rc-label"><span className="rc-dot"></span>เล็กน้อย</span>
                                    <span className="rc-sub">Mild — ผู้ป่วยนอก</span>
                                </label>
                                <label className="radio-card rc-watch">
                                    <input type="radio" name="severity" value="moderate" />
                                    <span className="rc-label"><span className="rc-dot"></span>ปานกลาง</span>
                                    <span className="rc-sub">Moderate — นอนรักษา</span>
                                </label>
                                <label className="radio-card rc-emergency">
                                    <input type="radio" name="severity" value="severe" />
                                    <span className="rc-label"><span className="rc-dot"></span>รุนแรง</span>
                                    <span className="rc-sub">Severe — ICU / วิกฤต</span>
                                </label>
                            </div>
                        </div>

                        <div className="count-row">
                            <div className="count-card">
                                <label>วันนอนโรงพยาบาล</label>
                                <input type="number" placeholder="0" min={0} />
                            </div>
                            <div className="count-card">
                                <label>ผลการรักษา</label>
                                <select defaultValue="">
                                    <option value="">— เลือก —</option>
                                    <option>หาย / จำหน่าย</option>
                                    <option>ยังรักษาอยู่</option>
                                    <option>เสียชีวิต</option>
                                    <option>ส่งต่อ</option>
                                </select>
                            </div>
                            <div className="count-card">
                                <label>วันจำหน่าย / สิ้นสุด</label>
                                <input type="text" placeholder="วว/ดด/ปปปป" className="mono-input" />
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label>หมายเหตุเพิ่มเติม <span className="sublabel">(ถ้ามี)</span></label>
                            <textarea placeholder="บันทึกข้อสังเกตหรือข้อมูลเพิ่มเติม ..." />
                        </div>
                    </div>

                </form>

                {/* Footer actions */}
                <div className="form-footer">
                    <button type="button" className="btn-cancel">ยกเลิก</button>
                    <button type="button" className="btn-submit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M5 12l5 5L20 7" />
                        </svg>
                        บันทึกและส่งรายงาน
                    </button>
                </div>

                {/* System footer */}
                <div className="sys-footer">
                    <p><span className="status-dot"></span>ระบบออนไลน์</p>
                    <p>Digital Health Information System v2.0 © 2026</p>
                </div>

            </div>

            {/* Modal */}
            <div
                className={`modal-overlay${modalOpen ? ' active' : ''}`}
                onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
            >
                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                    <div className="modal-header">
                        <div className="modal-header-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div className="modal-header-text">
                            <h3 id="modalTitle">ตั้งค่าข้อมูลหน่วยงาน</h3>
                            <p>ข้อมูลจะถูกบันทึกไว้ในอุปกรณ์ของท่าน</p>
                        </div>
                    </div>
                    <div className="modal-body">
                        <p>กรุณากรอกข้อมูลหน่วยงานครั้งเดียว ระบบจะจดจำและกรอกให้อัตโนมัติในครั้งต่อไป</p>
                        <div className="modal-field">
                            <label htmlFor="modal-code">รหัสสถานพยาบาล <span className="required">*</span></label>
                            <input
                                type="text" id="modal-code"
                                className={`mono-input ${modalErrors.code ? 'input-error' : ''}`}
                                placeholder="00000" maxLength={5}
                                value={modalCode}
                                onChange={e => { setModalCode(e.target.value); setModalErrors(p => ({ ...p, code: false })); }}
                                onKeyDown={handleKeyDown}
                                ref={modalCodeRef}
                            />
                        </div>
                        <div className="modal-field">
                            <label htmlFor="modal-name">ชื่อหน่วยงาน <span className="required">*</span></label>
                            <input
                                type="text" id="modal-name"
                                className={modalErrors.name ? 'input-error' : ''}
                                placeholder="โรงพยาบาล / รพ.สต. ..."
                                value={modalName}
                                onChange={e => { setModalName(e.target.value); setModalErrors(p => ({ ...p, name: false })); }}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={closeModal}>ข้ามไปก่อน</button>
                        <button type="button" className="btn-submit" onClick={saveAndApply}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12l5 5L20 7" />
                            </svg>
                            บันทึกและใช้งาน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}