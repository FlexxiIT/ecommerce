import axios from "axios";
import { RegisterSenderDto } from "../domain/dtos/shipping/register-sender.dto";
import { envs } from "./envs";
import { CustomError } from "../domain";
import { ValidateSenderDto } from "../domain/dtos/shipping/validate-sender.dto";

interface completeRegisterBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    documentType: string,
    documentId: string,
    phone: string,
    cellPhone: string,
    address: AddressInfo,
}

export interface AddressInfo {
    streetName: string
    streetNumber: string
    floor: string
    apartment: string
    locality: string
    city: string
    provinceCode: string
    postalCode: string
}


export class ShippingAdapter {

    constructor() { }

    static async registerSender(registerSenderDto: RegisterSenderDto, addressInfo: AddressInfo, token: string) {
        const { clientId, ...registerInfoFromDto } = registerSenderDto;
        const registerInfo: completeRegisterBody = { ...registerInfoFromDto, address: addressInfo };

        const response = await axios.post(
            `${envs.BASE_URL_SHIPPING}/register`,
            registerInfo,
            {
                headers: { Authorization: `Bearer ${token}` },
                validateStatus: (status) => {
                    return status < 300 || status === 402;
                }
            }
        );

        if (response.status === 402) {
            return response.data
        }

        return response.data;
    }

    static async validateSender(validateSenderDto: ValidateSenderDto, token: string) {

        const response = await axios.post(
            `${envs.BASE_URL_SHIPPING}/users/validate`,
            { 
                email: validateSenderDto.email, 
                password: validateSenderDto.password 
            },
            {
                headers: { Authorization: `Bearer ${token}` },
                validateStatus: (status) => {
                    return status < 300 || status === 406;
                }
            }
        )
        
        if (response.status === 406) {
            return response.data
        }

        return response.data;

    }

    static getRates() {

    }

    static importShipping() {

    }

}