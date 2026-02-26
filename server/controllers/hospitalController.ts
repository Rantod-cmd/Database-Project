import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IHospital } from "../../shared/types/schema/hospital";

const prisma = new PrismaClient()

export const getHospitals = async(req:Request,res:Response):Promise<void> => {
    try {
        const Hospitals = await prisma.hospital.findMany({
            select:{
                id:true,
                name:true,
                category:true,
                provinceId:true,
                status:true,
                beds:true,
                emergency:true,
                phone:true,
            }
        })
        res.status(200).json(Hospitals)
    } catch (error) {
        
    }
}