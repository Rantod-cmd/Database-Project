export interface IHospital {
    _id?: string;
    name: string;
    description: string;
    category: string;
    location:{
        address: string;
        city: string;
        country: string;
        cordinates: {
            lat: number;
            lng: number;
        }
    },
    distanceFromCenter: number;
    images: string[];
    rooms: string[];
    basePrice: number;
    rating?: number;
    isFeatured: boolean;
}