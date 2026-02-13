import express from 'express';
import { createHotel, getHotels } from '../controllers/hotelControllers.js';

const router: express.Router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - location
 *         - basePrice
 *       properties:
 *         name:
 *           type: string
 *           example: "Agoda Grand Resort"
 *         description:
 *           type: string
 *           example: "ที่พักสุดหรูใจกลางเมือง"
 *         category:
 *           type: string
 *           example: "Resort"
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *               example: "123 Sukhumvit Rd"
 *             city:
 *               type: string
 *               example: "Bangkok"
 *             country:
 *               type: string
 *               example: "Thailand"
 *         basePrice:
 *           type: number
 *           example: 2500
 *         rating:
 *           type: number
 *           example: 4.5
 *         isFeatured:
 *           type: boolean
 *           example: true
 */

/**
 * @openapi
 * /api/hotels/get-hotels:
 *   get:
 *     summary: ดึงข้อมูลโรงแรมทั้งหมด
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: รายการโรงแรมทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */
router.get('/get-hotels', getHotels);

/**
 * @openapi
 * /api/hotels/add-hotel:
 *   post:
 *     summary: เพิ่มโรงแรมใหม่
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: สร้างโรงแรมสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 */
router.post('/add-hotel', createHotel);

export default router;