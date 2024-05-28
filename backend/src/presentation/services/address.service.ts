import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { CreateAddressDto } from "../../domain/dtos/client-adress/create-adress.dto";
import { ModifyAddressDto } from "../../domain/dtos/client-adress/modify-adress-dto";
import { AddressEntity } from "../../domain/entities/address.entity";





export class AdressService {

    constructor() { }

    async getClientAddress(clientId: string) {

        const address = await prisma.address.findFirst({
            where: {clientId: clientId}
        });

        if(!address) throw CustomError.notFound(`The client with id : ${clientId}, does not have a linked address`);

        return AddressEntity.fromObject(address);

    }

    async createClientAddress(createAddressDto: CreateAddressDto) {

        const { clientId } = createAddressDto;

        const address = await prisma.address.findFirst({
            where: { clientId: clientId }
        });

        if (address) throw CustomError.badRequest(`An address already exists in the client with id : ${clientId}`);

        const newAddress = await prisma.address.create({
            data: { ...createAddressDto }
        });

        return AddressEntity.fromObject(newAddress);

    }

    async modifyClientAddress(modifyAddressDto: ModifyAddressDto) {

        const { addressId, clientId, city, state, street, zipCode } = modifyAddressDto;

        const existingAddress = await prisma.address.findFirst({
            where: { id: addressId, clientId: clientId }
        });

        if (!existingAddress) {
            throw CustomError.notFound(`No address found for the given addressId: ${addressId} and clientId: ${clientId}`);
        };

        const updatedAddress = await prisma.address.update({
            where: { id: addressId },
            data: { city, state, street, zipCode }
        });

        return AddressEntity.fromObject(updatedAddress);

    }


}