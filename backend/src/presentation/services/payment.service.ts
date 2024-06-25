import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { envs } from "../../config";
import { Request } from "express";
import { CustomError } from "../../domain";
import { prisma } from "../../data/postgres";
import { OrderStatus } from "@prisma/client";


const client = new MercadoPagoConfig({
    accessToken: envs.MERCADOPAGO_API_KEY
});

export class PaymentService {

    constructor() { }

    async createOrder(items: any[], orderId: string) {

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items,
                external_reference: orderId,
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


    async receiveWebhook(req: Request) {
        try {
            if (req.query.type === 'payment') {

                const payment = new Payment(client);

                const dataId = req.query['data.id'] as string;

                const data = await payment.get({
                    id: dataId,
                });

                if (data) {
                    const status = this.mapPaymentStatus(data.status!);

                    const external_reference = data.external_reference;

                    if (external_reference) {
                        await this.updateOrderStatus(external_reference, status as OrderStatus);
                    } else {
                        throw CustomError.notFound('No se encontró el external_reference en el webhook');
                    }

                } else {
                    throw CustomError.notFound('Payment data not found');
                }

            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async updateOrderStatus(orderId: string, status: OrderStatus) {

        try {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: status }
            })
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    mapPaymentStatus(status: string): string {
        switch (status) {
            case 'approved':
                return 'PAID';
            case 'in_process':
                return 'PENDING';
            case 'rejected':
                return 'CANCELLED';
            default:
                return 'PENDING';
        }
    }

}