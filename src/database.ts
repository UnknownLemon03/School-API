import { PrismaClient } from "@prisma/client";
import { DBRes, School } from "./types";


const Prisma = new PrismaClient();

export async function addSchool(data:School):Promise<DBRes<School>>{
    const res =  {error:"",success:true} as Partial<DBRes<School>>;
    try{
        res.data = await Prisma.school.create({
            data
        })
    }catch(e){
        if(e instanceof Error)
            res.error = e.message;
        else 
            res.error = "something went wrong !!!"
        console.log(e)
        res.success = false;
    }

    return res as DBRes<School>;
}
export async function getSchool(lat:number,lan:number):Promise<DBRes<School[]>>{
    const res =  {error:"",data:[],success:true} as DBRes<School[]>;
    try{
        res.data  =   await Prisma.school.findMany();
    }catch(e){
        if(e instanceof Error)
            res.error = e.message;
        else 
            res.error = "something went wrong !!!"
        console.log(e)  
        res.success = false;
    }

    return res;
}