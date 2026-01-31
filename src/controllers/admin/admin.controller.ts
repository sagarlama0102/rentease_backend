import { AdminUserService } from "../../services/admin/user.service";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import { CreateUserDTO } from "../../dtos/user.dto";
let adminUserService = new AdminUserService();

export class AdminUserController {
    async createUser(req:Request, res:Response, next: NextFunction){
        // try{
        //     const parsedData = CreateUserDTO.safeParse(req.body);
        //     if(!parsedData.success){
        //         return res.status(400).json(
        //             {success: false, message: z.prettifyError(parsedData.error)}
        //         )
        //     }
        //     if(req.file){
        //         parsedData.data.imageUrl = `/uploads/${req.file.filename}`;
        //     }
        //     const userData: CreateUserDTO = parsedData.data;
        //     const newUser = await adminUserService.createUser(userData);
        //     return res.status(201).json(
        //         {success: true, message: "User created", data: newUser}
        //     );

        // }catch(error: Error | any){
        //     return res.status(error.statusCode??500).json(
        //         {success: false, message: error.message || "Internal Server Error"}
        //     );
        // }
        
        // same as register user controller
    }
    async getUserById(req: Request, res: Response){
        try{
            const userId = req.params.id; // from url /api/admin/users/:id
            const user = await adminUserService.getUserById(userId);
            return res.status(200).json(
                {success:true, data:user, message: "User Fetched"}
            )

        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success:false, message: error.message || "Internal Server Error"}
            );
        }
    }
    async getAllUsers(req: Request, res: Response){
        try{
            const user = await adminUserService.getAllUsers();
            return res.status(200).json(
                {success:true, data: user ,message:"User Fetched"}
            )
        }catch(error:Error | any){
            return res.status(error.statusCode || 500).json(
                {success:false, message:error.message || "Internal Server Error"}
            )
        }
    }
    async updateOneUser(req:Request, res:Response){
        try{
            const userId = req.params.id;
            const data = req.params.id;
            const user = await adminUserService.updateOneUser(userId, data);
            return res.status(200).json(
                {success:true, message:"User Updated"}
            )
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success:false, message: error.message || "Internal Server Error"}
            );
        }
    }
    async deleteOneUser(req:Request, res:Response){
        try{
            const userId = req.params.id;
            const user = await adminUserService.deleteOneUser(userId);
            return res.status(200).json(
                {success:true, message:"User Updated"}
            )
        }
        catch(error: Error | any){
            return res.status(error.statusCode || 500).json(
                {success:false, message: error.message || "Internal Server Error"}
            );
        }
    }
}