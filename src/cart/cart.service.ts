import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import {
  CreateCartDto,
  UpdateCartDto,
  ProductCartDto,
  AddProductCartDto,
  RemoveProductCartDto,
  ChooseQuantityProductCartDto,
} from './dto/cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

const MIN_PRODUCT_CART = 1;
const MAX_PRODUCT_CART = 5;

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly productService: ProductService,
  ) {}
  async create(createCartDto: CreateCartDto) {
    const cart = new this.cartModel(createCartDto);
    return await cart.save();
  }

  async findAll() {
    return await this.cartModel.find().exec();
  }

  async findOne(id: string) {
    return await this.cartModel.findById(id);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateCartDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async addProduct(addProductCartDto: AddProductCartDto) {
    let cartId = addProductCartDto.cartId;
    let addProduct = addProductCartDto.product;
    let cart = await this.findOne(cartId);

    if (!cart) {
      const userId = addProductCartDto.userId;
      cart = new this.cartModel({ userId });
      cart.save();
      cartId = cart.id;
    }

    if (cart.products.length <= MAX_PRODUCT_CART) {
      const currentAmountCart = await this.getCurrentAmountCart(cart.products);
      const product = await this.productService.findOne(addProduct.productId);
      const searchProductInCart = cart.products.find(
        (p) => p.productId === product.id,
      );
      const searchProductInCartIndex = cart.products.findIndex(
        (p) => p.productId === product.id,
      );
      if (searchProductInCart) {
        console.log('Tem');
        const addProductValue =
          Number(product.value) * Number(addProduct.quantity);

        cart.amount = currentAmountCart + addProductValue;
        cart.products[searchProductInCartIndex].value =
          Number(addProductValue) + Number(searchProductInCart.value);
        cart.products[searchProductInCartIndex].quantity =
          addProduct.quantity + searchProductInCart.quantity;
      } else {
        const valueProduct =
          Number(product.value) * Number(addProduct.quantity);
        addProduct.value = valueProduct;

        cart.amount = currentAmountCart + valueProduct;
        cart.products.push(addProduct);
      }
      this.update(cartId, cart);
      return cart;
    }

    return { message: 'maximum products in cart reached' };
  }

  async removeProduct(id: string, removeProductCartDto: RemoveProductCartDto) {
    const productId = removeProductCartDto.productId;
    let cart = await this.findOne(id);
    const newProducts = cart.products.filter((p) => p.productId !== productId);
    cart.products = newProducts;
    cart.amount = await this.getCurrentAmountCart(newProducts);
    this.update(id, cart);

    return cart;
  }

  async chooseQuantity(
    id: string,
    chooseQuantityProductCartDto: ChooseQuantityProductCartDto,
  ) {
    if (chooseQuantityProductCartDto.quantity !== 0) {
      let cart = await this.findOne(id);
      const product = await this.productService.findOne(
        chooseQuantityProductCartDto.productId,
      );
      const searchProductInCart = cart.products.find(
        (p) => p.productId === product.id,
      );
      const searchProductInCartIndex = cart.products.findIndex(
        (p) => p.productId === product.id,
      );

      if (searchProductInCart) {
        cart.products[searchProductInCartIndex].quantity =
          chooseQuantityProductCartDto.quantity;
        cart.products[searchProductInCartIndex].value =
          Number(product.value) * Number(chooseQuantityProductCartDto.quantity);
        cart.amount = await this.getCurrentAmountCart(cart.products);
        this.update(id, cart);

        return cart;
      }
    }

    this.removeProduct(id, chooseQuantityProductCartDto);
  }

  async getCurrentAmountCart(products: ProductCartDto[]) {
    let currentAmount = 0;

    if (products.length) {
      currentAmount = products.reduce((sum, { value }) => sum + value, 0);
    }

    return currentAmount;
  }
}
