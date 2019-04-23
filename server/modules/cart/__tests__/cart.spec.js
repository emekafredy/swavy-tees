import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import { newUser, newUser2 } from '../../user/__tests__/userData/userData';
import {
  productsData,
  departmentsData,
  categoriesData,
  productCategories,
  colorData,
  sizeData,
  productColorsData,
  productSizesData
} from '../../products/__tests__/productData/products';

let token; let token2;

describe('Carts', () => {
  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Size.destroy({ force: true, truncate: { cascade: true } });
    await models.Color.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductColor.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductSize.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.bulkCreate(departmentsData);
    await models.Category.bulkCreate(categoriesData);
    await models.Product.bulkCreate(productsData);
    await models.ProductCategory.bulkCreate(productCategories);
    await models.Size.bulkCreate(sizeData);
    await models.Color.bulkCreate(colorData);
    await models.ProductColor.bulkCreate(productColorsData);
    await models.ProductSize.bulkCreate(productSizesData);
    const user = await request(app).post('/api/users/register').send(newUser);
    const user2 = await request(app).post('/api/users/register').send(newUser2);
    // eslint-disable-next-line prefer-destructuring
    token = user.body.token;
    // eslint-disable-next-line prefer-destructuring
    token2 = user2.body.token;
  });
  afterAll(async () => {
    await server.close();
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Size.destroy({ force: true, truncate: { cascade: true } });
    await models.Color.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductColor.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductSize.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('add to cart', () => {
    it('should successfully add a product to a logged in user\'s cart', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: 1
        })
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Product successfully added to cart');
          if (err) return done(err);
          done();
        });
    });

    it('should successfully add another product to a logged in user\'s cart', (done) => {
      request(app)
        .post('/api/shopping-cart/2')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: 1
        })
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Product successfully added to cart');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product does not exist', (done) => {
      request(app)
        .post('/api/shopping-cart/50')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: 1
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('Product not found');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product does not have the selected size or color', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 5,
          sizeId: 1
        })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('We do not have your selected size or color for this product at the moment');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product color is not entered', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: '',
          sizeId: 1
        })
        .end((err, res) => {
          const { success, errors } = res.body;
          expect(success).toEqual(false);
          expect(errors.colorId).toEqual('Please enter your preferred color.');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product size is not entered', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: ''
        })
        .end((err, res) => {
          const { success, errors } = res.body;
          expect(success).toEqual(false);
          expect(errors.sizeId).toEqual('Please enter your preferred size.');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product already exists in the cart', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: 1
        })
        .end((err, res) => {
          const { success, errors } = res.body;
          expect(success).toEqual(false);
          expect(errors.product).toEqual('You already have this product in your cart');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('get cart', () => {
    it('should fetch a logged in user\'s cart', (done) => {
      request(app)
        .get('/api/shopping-cart')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, message, cart } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('cart succesfully retrieved');
          expect(cart[0].color).toEqual('blue');
          if (err) return done(err);
          done();
        });
    });

    it('should return an empty data if user has no product in cart', (done) => {
      request(app)
        .get('/api/shopping-cart')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token2}`)
        .end((err, res) => {
          const { error } = res.body;
          expect(error).toEqual('No product found in your cart');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('update product quantity', () => {
    it('should successfully update a product quantity in the cart', (done) => {
      request(app)
        .put('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ quantity: 4 })
        .end((err, res) => {
          const { success, message, updatedCart } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Product quantity successfully updated');
          expect(updatedCart.quantity).toEqual(4);
          if (err) return done(err);
          done();
        });
    });

    it('should through an error if cart product is not found', (done) => {
      request(app)
        .put('/api/shopping-cart/4')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ quantity: 4 })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('Cart product not found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('remove product from cart', () => {
    it('should successfully delete a product added in the cart', (done) => {
      request(app)
        .delete('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Product successfully removed from cart');
          if (err) return done(err);
          done();
        });
    });

    it('should through an error if cart product is not found', (done) => {
      request(app)
        .delete('/api/shopping-cart/4')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('Cart product not found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('clear cart', () => {
    it('should successfully clears every product in the cart', (done) => {
      request(app)
        .delete('/api/shopping-cart')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Cart successfully cleared');
          if (err) return done(err);
          done();
        });
    });

    it('should through an error if no product was not found in cart', (done) => {
      request(app)
        .delete('/api/shopping-cart')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('You have no product in your cart');
          if (err) return done(err);
          done();
        });
    });
  });
});
