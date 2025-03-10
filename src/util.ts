import { School } from "./types";

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180); 
    const dLon = (lon2 - lon1) * (Math.PI / 180); 
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; 
  
    return d;
}
  

export function sortSchool(data:School[],{lat,lan}:{lat:number,lan:number}):School[]{
    let distance:number[] = [];
    let hash:{[key:string]:number} = {}
    data.forEach((e,i)=>{
        hash[e.id] = getDistanceFromLatLonInKm(lat,lan,e.latitude,e.longitude);
    })

    data.sort((a,b)=>{
        return hash[a.id]-hash[b.id];
    })
    return data;
}