export interface IHospital {
    id:string;
    name:string;
    category:string;
    provinceId:string;
    province?: {
        name: string;
    };
    status:string;
    beds:number;
    emergency:string;
    phone:string;
}