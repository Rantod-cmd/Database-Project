import HotelModel from "../models/hotelModel";
import type { Request, Response } from "express";

//Create a new hotel
export const createHotel = async (req: Request, res: Response):Promise<void> => {
    try {
        const{name,description,category,location,distanceFromCenter,images,rooms,basePrice,rating,isFeatured} = req.body;
        if(!name || !description || !category || !location || !distanceFromCenter || !images || !rooms || !basePrice) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const hotelData: IHotel = {
            name,
            description,
            category,
            location,
            distanceFromCenter,
            images,
            rooms,
            basePrice,
            rating:rating ?? 0,
            isFeatured:isFeatured ?? false,
        };

        const newHotel = new HotelModel(hotelData);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getHotels = async (req: Request, res: Response):Promise<void> => {
    try {
        const hotels:IHotel[] =  await HotelModel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}