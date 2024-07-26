import { AddressInfo, ShippingAdapter } from "../../config/shipping.adapter";
import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { RegisterSenderDto } from "../../domain/dtos/shipping/register-sender.dto";
import { ValidateSenderDto } from "../../domain/dtos/shipping/validate-sender.dto";
import { ShippingAuthService } from "./shipping-auth.service";




export class ShippingService {

    constructor(
        private readonly shippingAuthService: ShippingAuthService,
    ) { }

    private async getUserAddress(clientId: string): Promise<Omit<AddressInfo, 'clientId'>> {
        const address = await prisma.address.findFirst({
            where: { clientId: clientId }
        });
    
        if (!address) {
            throw CustomError.notFound(`No address found for client with id: ${clientId}`);
        }
    
        const { clientId: addressClientId, id, ...addressWithoutClientId } = address;
    
        return addressWithoutClientId;
    }

    async registerShippingSender(registerSenderDto: RegisterSenderDto) {

        try {
            const addressInfo: AddressInfo = await this.getUserAddress(registerSenderDto.clientId);
    
            const token = await this.shippingAuthService.getToken();
            
            const response = await ShippingAdapter.registerSender(registerSenderDto, addressInfo, token);
            
            return response;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }   

    }

    async validateShippingSender(validateSenderDto: ValidateSenderDto) {

        try {
            
            const token = await this.shippingAuthService.getToken();

            const response = await ShippingAdapter.validateSender(validateSenderDto, token);

            return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

}