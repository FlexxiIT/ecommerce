import MercadoPagoConfig, { Preference } from "mercadopago";
import { envs } from "../../config";
import { ProductEntity } from "../../domain";


const client = new MercadoPagoConfig({
    accessToken: envs.MERCADOPAGO_API_KEY
});

export class PaymentService {

    constructor() { }

    async createOrder(items: any[]) { //todo: integrar producto/s para acceder a los datos

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items,
                back_urls: {
                    success: `${envs.BACK_URL}api/payment/success`,
                    failure: `${envs.BACK_URL}api/payment/failure`,
                    pending: `${envs.BACK_URL}api/payment/pending`,
                },
                notification_url: `${envs.BACK_URL}api/payment/webhook`,
            }
        });

        return result;
    };

}