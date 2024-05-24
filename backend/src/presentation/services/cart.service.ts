import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain";
import { AddToCartDto } from "../../domain/dtos/cart/add-item-to-cart.dto";




export class CartService {

    constructor() { }

    async getCart(clientId: string) {
        try {

            const cart = await prisma.cart.findFirst({
                where: {
                    clientId: clientId,
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        }
                    }
                }
            });

            if (!cart) {
                return CustomError.notFound(`Cart not found on user with id : ${clientId}`);
            }

            return cart;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async addToCart(addToCartDto: AddToCartDto) {

        const { clientId, productId, quantity } = addToCartDto;
        let response = {
            inNew: false,
            cartItemName: "",
        };

        try {

            let cart = await prisma.cart.findFirst({
                where: { clientId: clientId }
            });

            if (!cart) {
                cart = await prisma.cart.create({
                    data: {
                        clientId: clientId,
                        status: 'ACTIVE'
                    }
                });
            }

            const existingCartItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart!.id,
                    productId: productId
                },
                include: { product: true }
            });

            if (existingCartItem) {
                await prisma.cartItem.update({
                    where: { id: existingCartItem.id },
                    data: { quantity: existingCartItem.quantity + quantity }
                });

                response.cartItemName = existingCartItem.product.name
            } else {
                const newCartItem = await prisma.cartItem.create({
                    data: {
                        cartId: cart!.id,
                        productId,
                        quantity: quantity,
                    },
                    include: { product: true }
                });

                response.cartItemName = newCartItem.product.name;
                response.inNew = true;
            }

            return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }


}