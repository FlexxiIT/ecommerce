import { AddressInfo, ShippingAdapter } from "../../config/shipping.adapter";
import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { RegisterSenderDto } from "../../domain/dtos/shipping/register-sender.dto";




export class ShippingService {

    constructor() { }

    private async getUserAddress(clientId: string): Promise<Omit<AddressInfo, 'clientId'>> {
        const address = await prisma.address.findFirst({
            where: { clientId: clientId }
        });
    
        if (!address) {
            throw new Error(`No address found for client with id: ${clientId}`);
        }
    
        const { clientId: addressClientId, id, ...addressWithoutClientId } = address;
    
        return addressWithoutClientId;
    }

    async registerShippingSender(registerSenderDto: RegisterSenderDto) {

        try {
            const addressInfo: AddressInfo = await this.getUserAddress(registerSenderDto.clientId);
    
            const response = await ShippingAdapter.registerSender(registerSenderDto, addressInfo);
    
            return response
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }   

    }

}