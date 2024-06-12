import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { ShowCreateOrderDto } from "../../domain/dtos/order/show-create-order.dto";
import { OrderEntity } from "../../domain/entities/order.entity";




export class OrderService {

    constructor() { }

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
            // Init transaction
            const result = await prisma.$transaction(async (prisma) => {
                const cart = await prisma.cart.findFirst({
                    where: { clientId: clientId },
                    include: {
                        items: {
                            include: { product: true } // Include the products to check the stock
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

                // Check stock and subtract it
                for (const item of cart.items) {
                    if (item.product.stock < item.quantity) {
                        throw CustomError.badRequest(`Insufficient stock for product with id: ${item.productId}`);
                    }

                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: item.product.stock - item.quantity }
                    });
                }

                // Create the order
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
                    include: { items: true }
                });

                // Delete cart items
                await prisma.cartItem.deleteMany({
                    where: { cartId: cart.id }
                });

                return order;
            });

            return { order: result };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}