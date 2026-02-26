import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { IHospital } from "../../shared/types/schema/hospital";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient()

export const Login = async(req:Request,res:Response):Promise<void> => {
    try {
        const { username,password } = req.body
        if(!username || !password){
            res.status(400).json({message:"กรุณากรอกข้อมูลให้ครบ"})
            return
        }
        const hospital = await prisma.hospital.findUnique({where:{id:username}})
        if(!hospital){
            res.status(400).json({message:"รหัสผ่านหรือไอดีไม่ถูกต้อง"})
            return
        }
        const isPasswordValid = await bcrypt.compare(password, hospital.password);
        if(!isPasswordValid){
            res.status(400).json({message:"รหัสผ่านไม่ถูกต้อง"})
            return
        }
        const payload = {
            id: hospital.id,
            name: hospital.name,
            provinceId: hospital.provinceId
        };
        const secretKey = process.env.JWT_SECRET || 'fallback_secret';
        const token = jwt.sign(
            payload,
            secretKey,
            { expiresIn: '7d' }
        );
        res.status(200).json({ 
            message: "เข้าสู่ระบบสำเร็จ",
            token, 
            payload 
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"เข้าสู่ระบบไม่สําเร็จ"})
    }
}


export const checkMe = async (req:AuthRequest,res:Response):Promise<void> => {
    try {
        if (!req.hospital) {
            res.status(200).json({ 
                isAuthenticated: false, 
                role: 'guest',
                hospital: null 
            });
            return;
        }
        res.status(200).json({
            isAuthenticated: true,
            role: 'hospital',
            hospital: req.hospital
        });
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}