import { UserRepository } from "../../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { HttpError } from "../../errors/http-error";
import { CreateUserDTO } from "../../dtos/user.dto";

let userRepository = new UserRepository();
export class AdminUserService {
    async createUser(data:CreateUserDTO){
        //same as register user
    }
    async getUserById(id:string){
        const user = await userRepository.getUserById(id);
        if(!user) throw new HttpError(404, "User not found");
        return user;
    }
    async getAllUsers(){
        const user = await userRepository.getAllUsers();
        //transform/map data if needed
        return user;
    }
    // continue all 
    async updateOneUser(id:string, data: any){
        const user = await userRepository.updateOneUser(id, data);
        return user;
    }
    async deleteOneUser(id:string ){
        const user = await userRepository.deleteOneUser(id);
        return user;
    }


}

