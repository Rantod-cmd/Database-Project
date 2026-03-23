import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { IProvince } from "../../shared/types/schema/province";

const prisma = new PrismaClient()

export const getProvinces = async (req:Request,res:Response):Promise<void> => {
    try {
        const provinces:IProvince[] = await prisma.province.findMany();
        res.status(200).json(provinces)
    } catch (error) {
        res.status(500).json({message:"Cannot Fetch Provinces Data"})
    }
}
