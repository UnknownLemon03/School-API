import { z } from "zod"

export interface School {
    id : number,
    name : string 
    address : string 
    latitude : number 
    longitude : number
}

export interface DBRes<T>{
    error:string,
    success:boolean,
    data:T
}

export const schooSchmen = z.object({
    name:z.string().trim().min(1,{message:"name is required"}),
    address : z.string().trim().min(1,{message:"address is required"}), 
    latitude : z.number().min(-90,{message:"latitude is required"}).max(90), 
    longitude : z.number().min(-180,{message:"longitude is required"}).max(180),
})