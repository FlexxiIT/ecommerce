import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { ShowCreateOrderDto } from "../../domain/dtos/order/show-create-order.dto";
import { OrderEntity } from "../../domain/entities/order.entity";
import { PaymentService } from "./payment.service";




export class OrderService {

    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    async showOrder(showOrderDto: ShowCreateOrderDto) {

        const { clientId } = showOrderDto;

        try {

            const cart = await prisma.cart.findFirst({
                where: { clientId: clientId },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!cart || cart.items.length === 0) {
                throw CustomError.badRequest('The cart is empty or it does not exists');
            }

            const address = await prisma.address.findFirst({
                where: { clientId: clientId },
            });

            if (!address) {
                throw CustomError.notFound(`There is not an address linked to the client with id : ${clientId}`);
            };

            const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

            return {
                items: cart.items,
                address: address,
                total: total,
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async showActualOrders(showOrderDto: ShowCreateOrderDto) {

        const { clientId } = showOrderDto;

        try {

            const orders = await prisma.order.findMany({
                where: { clientId: clientId, status: 'PENDING' },
                include: { items: true }
            })

            if (!orders) throw CustomError.notFound(`There is not actual/pending order/s for the client with id : ${clientId}`);

            const ordersEntity = orders.map(order => OrderEntity.fromObject(order));

            return ordersEntity;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async showAllOrders(showOrderDto: ShowCreateOrderDto) {

        const { clientId } = showOrderDto;

        try {

            const orders = await prisma.order.findMany({
                where: { clientId: clientId },
                include: { items: true }
            });

            if (!orders) throw CustomError.notFound(`There is not orders for the client with id : ${clientId}`);

            const ordersEntity = orders.map(order => OrderEntity.fromObject(order));

            return ordersEntity;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async createOrder(createOrderDto: ShowCreateOrderDto) {
        const { clientId } = createOrderDto;
    
        try {
            // Iniciar transacción
            const result = await prisma.$transaction(async (prisma) => {
                // Obtener el carrito con los productos
                const cart = await prisma.cart.findFirst({
                    where: { clientId: clientId },
                    include: {
                        items: {
                            include: { product: true } // Incluir los productos para verificar el stock
                        }
                    }
                });
    
                if (!cart || cart.items.length === 0) {
                    throw CustomError.badRequest(`The cart is empty`);
                }
    
                const address = await prisma.address.findFirst({
                    where: { clientId: clientId },
                });
    
                if (!address) {
                    throw CustomError.notFound(`There is not an address linked to the client with id: ${clientId}`);
                }
    
                // Verificar el stock y restarlo
                for (const item of cart.items) {
                    if (item.product.stock < item.quantity) {
                        throw CustomError.badRequest(`Insufficient stock for product with id: ${item.productId}`);
                    }
    
                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: item.product.stock - item.quantity }
                    });
                }
    
                // Crear la orden
                const order = await prisma.order.create({
                    data: {
                        clientId: clientId,
                        addressId: address.id,
                        items: {
                            create: cart.items.map(item => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                price: item.product.price
                            }))
                        }
                    },
                    include: {
                        items: {
                            include: { product: true } // Incluir detalles del producto en los OrderItems
                        }
                    }
                });
    
                // Eliminar los ítems del carrito
                await prisma.cartItem.deleteMany({
                    where: { cartId: cart.id }
                });
    
                return order;
            });
    
            if (result) {
                // Crear ítems de Mercado Pago usando la información del carrito
                const mpItems = result.items.map(item => ({
                    id: item.productId,
                    title: item.product.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    currency_id: "ARS"
                }));
    
                const paymentResult = await this.paymentService.createOrder(mpItems);
            }
    
            return { order: result };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}