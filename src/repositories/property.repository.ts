import { QueryFilter } from "mongoose";
import { PropertyModel, IProperty } from "../models/property.model";

export interface IPropertyRepository {
    createProperty(propertyData: Partial<IProperty>): Promise<IProperty>;
    getPropertyById(id: string):Promise<IProperty | null>;
    getAllProperty(
        page: number, size: number, search?: string
    ): Promise<{property: IProperty[], total: number}>;
    updateOneProperty(id: string, data: Partial<IProperty>): Promise<IProperty | null>;
    deleteOneProperty(id: string): Promise<boolean | null>;

    updateProperty(id:string, updateData: Partial<IProperty>):Promise<IProperty | null>;
    deleteProperty(id: string): Promise<boolean>;
}

export class PropertyRepository implements IPropertyRepository{
    async createProperty(propertyData: Partial<IProperty>): Promise<IProperty> {
        const property = new PropertyModel(propertyData);
        return await property.save();
    }
    async getPropertyById(id: string): Promise<IProperty | null> {
        const property = await PropertyModel.findById(id);
        return property;
        
    }
    async getAllProperty(
        page: number, size: number, search?: string
    ): Promise<{ property: IProperty[]; total: number; }> {
        const filter: QueryFilter<IProperty> = {};
        if(search){
            filter.$or = [
                {title: { $regex: search, $options: 'i'}},
                {description: { $regex: search, $options: 'i'}},
                { city: { $regex: search, $options: 'i' } }
            ];
        }
        const [property, total]= await Promise.all([
            PropertyModel.find(filter)
                .sort({ createdAt: -1 })
                .skip((page -1)* size)
                .limit(size),
            PropertyModel.countDocuments(filter)
        ]);
        return {property, total}
        
    }
    async updateOneProperty(id: string, data: Partial<IProperty>): Promise<IProperty | null> {
        const updateProperty = await PropertyModel.findByIdAndUpdate(id, data, {new:true});
        return updateProperty;
    }
    async deleteOneProperty(id: string): Promise<boolean | null> {
        const result = await PropertyModel.findByIdAndDelete(id);
        return result? true: null;
    }
    async updateProperty(id: string, updateData: Partial<IProperty>): Promise<IProperty | null> {
        const updatedProperty = await PropertyModel.findByIdAndUpdate(
            id, updateData, {new: true, runValidators: true}
        );
        return updatedProperty;
    }
    async deleteProperty(id: string): Promise<boolean> {
        const result = await PropertyModel.findByIdAndDelete(id);
        return result? true: false;
    }
    
}