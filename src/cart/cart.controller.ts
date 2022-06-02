import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import {
  CreateCartDto,
  UpdateCartDto,
  ProductCartDto,
  AddProductCartDto,
  RemoveProductCartDto,
  ChooseQuantityProductCartDto,
} from './dto/cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Post('add-product')
  addProduct(@Body() addProductCartDto: AddProductCartDto) {
    return this.cartService.addProduct(addProductCartDto);
  }

  @Patch('remove-product/:id')
  removeProduct(
    @Param('id') id: string,
    @Body() removeProductCartDto: RemoveProductCartDto,
  ) {
    return this.cartService.removeProduct(id, removeProductCartDto);
  }

  @Patch('choose-quantity/:id')
  chooseQuantity(
    @Param('id') id: string,
    @Body() chooseQuantityProductCartDto: ChooseQuantityProductCartDto,
  ) {
    return this.cartService.chooseQuantity(id, chooseQuantityProductCartDto);
  }
}
