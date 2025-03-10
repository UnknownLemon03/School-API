import express, { NextFunction, Request, Response } from "express";
import { School, schooSchmen } from "./types";
import { addSchool, getSchool } from "./database";
import { sortSchool } from "./util";

const app = express();
app.use(express.json())
app.post("/addSchool", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as School;
        const valid = schooSchmen.safeParse(data);
        if (!valid.success){
            const errorMessages = valid.error.issues.map(issue => {
                return `Field '${issue.path.join('.')}' ${issue.message}`;
            }).join("\n");
            throw new Error(errorMessages);
        
        }

        const {data:school} = await addSchool(data);
        
        res.json({
            success: true,
            data: school,
            error: "",
        });
    } catch (e) {
        next(e);
    }
});

app.get("/listSchools", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) throw new Error("Provide latitude and longitude");
        
        const {data} = await getSchool();
        const schools  = sortSchool(data,{lan:parseFloat(lat as string),lat:parseFloat(lon as string)});
        res.json({
            success: true,
            data: schools,
            error: "",
        });
    } catch (e) {
        next(e);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    const { status = 500, message = "Internal Server Error" } = err;
    return res.status(status).json({
        success: false,
        data: null,
        error: message,
    });
});

app.listen(3000, () => {
    console.log("API at 3000");
});

setInterval(async ()=>{
    await getSchool();
},1000*15*60)