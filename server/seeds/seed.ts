import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import type { IProvince } from '../../shared/types/schema/province'
import type { IHospital } from '../../shared/types/schema/hospital'

const prisma = new PrismaClient()

const main = async():Promise<void> => {
    console.log("ดึงข้อมูลอ้างอิง");
    const provinces:IProvince[] = [
        // --- North (ภาคเหนือ) ---
        { "id": "Chiang Mai", "name": "เชียงใหม่" },
        { "id": "Chiang Rai", "name": "เชียงราย" },
        { "id": "Lampang", "name": "ลำปาง" },
        { "id": "Lamphun", "name": "ลำพูน" },
        { "id": "Mae Hong Son", "name": "แม่ฮ่องสอน" },
        { "id": "Nan", "name": "น่าน" },
        { "id": "Phayao", "name": "พะเยา" },
        { "id": "Phrae", "name": "แพร่" },
        { "id": "Uttaradit", "name": "อุตรดิตถ์" },
      
        // --- Central (ภาคกลาง) ---
        { "id": "Bangkok Metropolis", "name": "กรุงเทพมหานคร" },
        { "id": "Ang Thong", "name": "อ่างทอง" },
        { "id": "Chai Nat", "name": "ชัยนาท" },
        { "id": "Kamphaeng Phet", "name": "กำแพงเพชร" },
        { "id": "Lop Buri", "name": "ลพบุรี" },
        { "id": "Nakhon Nayok", "name": "นครนายก" },
        { "id": "Nakhon Pathom", "name": "นครปฐม" },
        { "id": "Nakhon Sawan", "name": "นครสวรรค์" },
        { "id": "Nonthaburi", "name": "นนทบุรี" },
        { "id": "Pathum Thani", "name": "ปทุมธานี" },
        { "id": "Phetchabun", "name": "เพชรบูรณ์" },
        { "id": "Phichit", "name": "พิจิตร" },
        { "id": "Phitsanulok", "name": "พิษณุโลก" },
        { "id": "Phra Nakhon Si Ayutthaya", "name": "พระนครศรีอยุธยา" },
        { "id": "Samut Prakan", "name": "สมุทรปราการ" },
        { "id": "Samut Sakhon", "name": "สมุทรสาคร" },
        { "id": "Samut Songkhram", "name": "สมุทรสงคราม" },
        { "id": "Saraburi", "name": "สระบุรี" },
        { "id": "Sing Buri", "name": "สิงห์บุรี" },
        { "id": "Sukhothai", "name": "สุโขทัย" },
        { "id": "Suphan Buri", "name": "สุพรรณบุรี" },
        { "id": "Uthai Thani", "name": "อุทัยธานี" },
      
        // --- North East (ภาคอีสาน) ---
        { "id": "Amnat Charoen", "name": "อำนาจเจริญ" },
        { "id": "Bueng Kan", "name": "บึงกาฬ" },
        { "id": "Buri Ram", "name": "บุรีรัมย์" },
        { "id": "Chaiyaphum", "name": "ชัยภูมิ" },
        { "id": "Kalasin", "name": "กาฬสินธุ์" },
        { "id": "Khon Kaen", "name": "ขอนแก่น" },
        { "id": "Loei", "name": "เลย" },
        { "id": "Maha Sarakham", "name": "มหาสารคาม" },
        { "id": "Mukdahan", "name": "มุกดาหาร" },
        { "id": "Nakhon Phanom", "name": "นครพนม" },
        { "id": "Nakhon Ratchasima", "name": "นครราชสีมา" },
        { "id": "Nong Bua Lam Phu", "name": "หนองบัวลำภู" },
        { "id": "Nong Khai", "name": "หนองคาย" },
        { "id": "Roi Et", "name": "ร้อยเอ็ด" },
        { "id": "Sakon Nakhon", "name": "สกลนคร" },
        { "id": "Si Sa Ket", "name": "ศรีสะเกษ" },
        { "id": "Surin", "name": "สุรินทร์" },
        { "id": "Ubon Ratchathani", "name": "อุบลราชธานี" },
        { "id": "Udon Thani", "name": "อุดรธานี" },
        { "id": "Yasothon", "name": "ยโสธร" },
      
        // --- East (ภาคตะวันออก) ---
        { "id": "Chachoengsao", "name": "ฉะเชิงเทรา" },
        { "id": "Chanthaburi", "name": "จันทบุรี" },
        { "id": "Chon Buri", "name": "ชลบุรี" },
        { "id": "Prachin Buri", "name": "ปราจีนบุรี" },
        { "id": "Rayong", "name": "ระยอง" },
        { "id": "Sa Kaeo", "name": "สระแก้ว" },
        { "id": "Trat", "name": "ตราด" },
      
        // --- West (ภาคตะวันตก) ---
        { "id": "Kanchanaburi", "name": "กาญจนบุรี" },
        { "id": "Phetchaburi", "name": "เพชรบุรี" },
        { "id": "Prachuap Khiri Khan", "name": "ประจวบคีรีขันธ์" },
        { "id": "Ratchaburi", "name": "ราชบุรี" },
        { "id": "Tak", "name": "ตาก" },
      
        // --- South (ภาคใต้) ---
        { "id": "Chumphon", "name": "ชุมพร" },
        { "id": "Krabi", "name": "กระบี่" },
        { "id": "Nakhon Si Thammarat", "name": "นครศรีธรรมราช" },
        { "id": "Narathiwat", "name": "นราธิวาส" },
        { "id": "Pattani", "name": "ปัตตานี" },
        { "id": "Phangnga", "name": "พังงา" },
        { "id": "Phatthalung", "name": "พัทลุง" },
        { "id": "Phuket", "name": "ภูเก็ต" },
        { "id": "Ranong", "name": "ระนอง" },
        { "id": "Satun", "name": "สตูล" },
        { "id": "Songkhla", "name": "สงขลา" },
        { "id": "Surat Thani", "name": "สุราษฎร์ธานี" },
        { "id": "Trang", "name": "ตรัง" },
        { "id": "Yala", "name": "ยะลา" }
      ]
      for (const el of provinces){
        await prisma.province.upsert(
            {
                where: { id: el.id },
                update: { name: el.name },
                create: el,
            }
        )
      }
  console.log("ดึงข้อมูลอ้างอิงจังหวัดเสร็จสิ้น")
  const saltRounds = 10
  const hashedPin = await bcrypt.hash('1234', saltRounds)
  const Hospital:IHospital[] = [
    { id: "H001", name: "โรงพยาบาลศิริราช (Siriraj Hospital)", category: "General Hospital", provinceId: "Bangkok Metropolis", status: "Active", beds: 2450, emergency: "High", phone: "02-419-7000" },
    { id: "H002", name: "โรงพยาบาลเชียงใหม่ราม", category: "Private Hospital", provinceId: "Chiang Mai", status: "Active", beds: 350, emergency: "Normal", phone: "053-920-300" },
    { id: "H003", name: "รพ.สต. บ้านไร่", category: "Health Center", provinceId: "Khon Kaen", status: "Maintenance", beds: 0, emergency: "Normal", phone: "043-123-456" },
    { id: "H004", name: "โรงพยาบาลสงขลานครินทร์", category: "University Hospital", provinceId: "Songkhla", status: "Active", beds: 850, emergency: "Full", phone: "074-451-000" },
    { id: "H005", name: "โรงพยาบาลกรุงเทพ", category: "Private Hospital", provinceId: "Bangkok Metropolis", status: "Active", beds: 500, emergency: "Normal", phone: "02-310-3000" },
    { id: "H006", name: "โรงพยาบาลพุทธชินราช", category: "General Hospital", provinceId: "Phitsanulok", status: "Active", beds: 900, emergency:"Normal",  phone: "055-270-300" },
  ]
  for (const h of Hospital) {
    await prisma.hospital.upsert({
      where: { id: h.id },
      update: {
        name: h.name,
        provinceId: h.provinceId,
        password: hashedPin,
        category: h.category,
        status: h.status,
        beds:h.beds,
        emergency:h.emergency,
        phone:h.phone
      },
      create: {
        id: h.id,
        name: h.name,
        category: h.category,
        password: hashedPin,
        provinceId: h.provinceId,
        status: h.status,
        beds:h.beds,
        emergency:h.emergency,
        phone:h.phone

      },
    })
  }
  console.log("ดึงข้อมูลโรงพยาบาลเสร็จสิ้น")
}

main()
    .catch((e)=>{
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })