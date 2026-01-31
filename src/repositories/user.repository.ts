import { UserModel, IUser } from "../models/user.model";
export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    // Additional
    // 5 common database queries for entity
    createUser(userData: Partial<IUser>): Promise<IUser>;
    getUserById(id: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>;
   
    updateOneUser(id:string, data:Partial<IUser>): Promise<IUser |null>; //update one
    deleteOneUser(id:string): Promise<boolean | null>; //delete one
}
// MongoDb Implementation of UserRepository
export class UserRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData); 
        return await user.save();
    }
    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ "email": email })
        return user;
    }
    async getUserByUsername(username: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ "username": username })
        return user;
    }

    async getUserById(id: string): Promise<IUser | null> {
        // UserModel.findOne({ "_id": id });
        const user = await UserModel.findById(id);
        return user;
    }
    async getAllUsers(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }
    async updateOneUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        //UserModel.updateOne({"_id":id}, {$set:data})
        const updateUser = await UserModel.findByIdAndUpdate(id, data, {new:true});
        return updateUser;
    }
    async deleteOneUser(id: string): Promise<boolean | null> {
        //UserModel.deleteOne({"_id":id})
        const result = await UserModel.findByIdAndDelete(id);
        return result? true :null;
    }
    
}