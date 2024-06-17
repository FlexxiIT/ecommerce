import { prisma } from "../../data/postgres";
import { CustomError, ProductEntity } from "../../domain";
import { AddToCartDto } from "../../domain/dtos/cart/add-item-to-cart.dto";
import { CartOperation, ModifyCartDto } from "../../domain/dtos/cart/modify-cart.dto";
import { CartItemEntity } from "../../domain/entities/cart-item.entity";
import { CartEntity } from "../../domain/entities/cart.entity";



export class CartService {

    constructor() { }

    async checkProductStock(productId: string, quantity: number) {

        const product = await prisma.product.findFirst({
            where: { id: productId },
        });

        if (product) {

            if (product.stock < quantity) {
                throw CustomError.badRequest(`The quantity must be equal or lower than the stock.`)
            }

        } else {
            throw CustomError.notFound(`Product with id : ${productId} not found`)
        }

        return true;

    }


    async getCart(clientId: string) {
        try {

            const cart = await prisma.cart.findFirst({
                where: {
                    clientId: clientId,
                },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    category: true
                                }
                            },
                        }
                    }
                }
            });

            if (!cart) {
                return CustomError.notFound(`Cart not found on user with id : ${clientId}`);
            }
            
            return CartEntity.fromObject(cart);

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

            await this.checkProductStock(productId, quantity);

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

    async modifyQuantity(modifyCartDto: ModifyCartDto) {

        try {
            const { clientId, operation, productId, quantity } = modifyCartDto;

            if (operation !== CartOperation.UPDATE) throw CustomError.badRequest(`Operation must be ${CartOperation.UPDATE}`);

            const cart = await prisma.cart.findFirst({
                where: { clientId: clientId },
                include: { items: true }
            });

            if (!cart) throw CustomError.notFound(`Not cart found for the client with id : ${clientId}`);

            const cartItem = cart.items.find(item => item.productId === productId);

            if (!cartItem) throw CustomError.notFound(`The item with id ${productId} was not found in the cart with id ${cart.id}`);

            await this.checkProductStock(productId, cartItem.quantity);

            const updatedCartItem = await prisma.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: quantity }
            })

            return {
                message: 'Item updated successfully',
                updatedCartItem: CartItemEntity.fromObject(updatedCartItem),
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async removeItem(modifyCartDto: ModifyCartDto) {

        try {
            const { clientId, operation, productId, quantity } = modifyCartDto;

            if (operation !== CartOperation.REMOVE) throw CustomError.badRequest(`Operation must be ${CartOperation.REMOVE}`);

            const cart = await prisma.cart.findFirst({
                where: { clientId: clientId },
                include: { items: true }
            });

            if (!cart) throw CustomError.notFound(`Not cart found for the client with id : ${clientId}`);

            const cartItem = cart.items.find(item => item.productId === productId);

            if (!cartItem) throw CustomError.notFound(`The item with id ${productId} was not found in the cart with id ${cart.id}`);

            const deletedProduct = await prisma.cartItem.delete({
                where: { id: cartItem.id },
            });
            console.log(deletedProduct);
            return {
                message: 'Item deleted successfully',
                deletedProduct: CartItemEntity.fromObject(deletedProduct)
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }


}