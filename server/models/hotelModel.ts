import type { Document, Model } from 'mongoose';
import type { IHotel } from '../../shared/types/hotel';
import mongoose from 'mongoose';

export interface HotelDocument extends Omit<IHotel, '_id'>, Document {}

const hotelSchema = new mongoose.Schema<HotelDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        cordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        }
    },
    distanceFromCenter: { type: Number, required: true },
    images: { type: [String], required: true },
    rooms: { type: [String], required: true },
    basePrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, {
    timestamps: true,
})

const HotelModel: Model<HotelDocument> = mongoose.model<HotelDocument>('Hotel', hotelSchema);
export default HotelModel;