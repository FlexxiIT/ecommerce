import axios from 'axios';
import { envs } from '../../config';

export class ShippingAuthService {

    private token: string | null = null;
    private tokenExpiry: Date | null = null;

    async getToken(): Promise<string> {
        if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry.getTime()) {
            return this.token;
        }

        const response = await axios.post( //todo: investigar el fetch de node para usarlo en lugar de axios
            `${envs.BASE_URL_SHIPPING}/token`,
            {},
            {
                auth: {
                    username: envs.SHIPPING_API_USER,
                    password: envs.SHIPPING_API_PASSWORD,
                },
            }
        );

        this.token = response.data.token;
        this.tokenExpiry = new Date(response.data.expire);

        return this.token!;
    }
}