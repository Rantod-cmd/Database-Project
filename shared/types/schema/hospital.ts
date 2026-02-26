export interface IHospital {
    id:string;
    name:string;
    provinceId:string;
    province?: {
        name: string;
    };
}