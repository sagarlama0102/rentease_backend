import { CreatePropertyDTO, UpdatePropertyDTO } from "../dtos/property.dto";
import { PropertyRepository } from "../repositories/property.repository";
import { HttpError } from "../errors/http-error";
import { userInfo } from "node:os";

let propertyRepository = new PropertyRepository();

export class PropertyService{
    // async createProperty(data: CreatePropertyDTO){
    //     const newProperty = await propertyRepository.createProperty(data);
    //     return newProperty;
    // }
    // async getPropertyById(propertyId: string){
    //     const property = await propertyRepository.getPropertyById(propertyId);
    //     if(!property){
    //         throw new HttpError(404, "property not found");
    //     }
    //     return property;
    // }
    // async updateProperty(propertyId: string, data: UpdatePropertyDTO){
    //     const property = await propertyRepository.getPropertyById(propertyId);
    //     if(!property){
    //         throw new HttpError(404, "property not found");
    //     }
    //     const updatedProperty = await propertyRepository.updateOneProperty(propertyId, data);
    //     return updatedProperty;

    // }

    async getAllProperties(page?: string, size?: string, search?: string) {
        const pageNumber = page ? parseInt(page) : 1;
        const pageSize = size ? parseInt(size) : 12; // 12 works great for 3-column grids

        const { property, total } = await propertyRepository.getAllProperty(
            pageNumber, pageSize, search
        );

        return {
            property,
            pagination: {
                page: pageNumber,
                size: pageSize,
                totalItems: total,
                totalPages: Math.ceil(total / pageSize)
            }
        };
    }
    async getPropertyDetails(propertyId: string) {
        const property = await propertyRepository.getPropertyById(propertyId);
        if (!property) {
            throw new HttpError(404, "Property not found");
        }
        return property;
    }
}