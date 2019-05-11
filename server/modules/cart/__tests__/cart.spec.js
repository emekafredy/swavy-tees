import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import {
  productsData,
  departmentsData,
  categoriesData,
  productCategories,
  attributeData,
  attributeValueData,
  productAttributeData,
  cartData
} from '../../products/__tests__/productData/products';

describe('Carts', () => {
  beforeAll(async () => {
    await models.Customer.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Attribute.destroy({ force: true, truncate: { cascade: true } });
    await models.AttributeValue.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductAttribute.destroy({ force: true, truncate: { cascade: true } });
    await models.ShoppingCart.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.bulkCreate(departmentsData);
    await models.Category.bulkCreate(categoriesData);
    await models.Product.bulkCreate(productsData);
    await models.ProductCategory.bulkCreate(productCategories);
    await models.Attribute.bulkCreate(attributeData);
    await models.AttributeValue.bulkCreate(attributeValueData);
    await models.ProductAttribute.bulkCreate(productAttributeData);
    await models.ShoppingCart.bulkCreate(cartData);
  });
  afterAll(async () => {
    await server.close();
    await models.Customer.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Attribute.destroy({ force: true, truncate: { cascade: true } });
    await models.AttributeValue.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductAttribute.destroy({ force: true, truncate: { cascade: true } });
    await models.ShoppingCart.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('add to cart', () => {
    it('should generate a cart id', (done) => {
      request(app)
        .post('/api/cart/generateId')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success } = res.body;
          expect(success).toEqual(true);
          if (err) return done(err);
          done();
        });
    });

    it('should fetch cart for user', (done) => {
      request(app)
        .get('/api/shopping-cart/ijkiiuoejhkni')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('cart succesfully retrieved');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product does not exist', (done) => {
      request(app)
        .post('/api/shopping-cart/50')
        .set('Content-Type', 'application/json')
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: 1,
          cartId: 'ijkiiuoejhkni'
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
        .send({
          quantity: 2,
          colorId: 5,
          sizeId: 4,
          cartId: 'ijkiiuoejhkni'
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
        .send({
          quantity: 2,
          colorId: '',
          sizeId: 1,
          cartId: 'ijkiiuoejhkni'
        })
        .end((err, res) => {
          const { success, errors } = res.body;
          expect(success).toEqual(false);
          expect(errors.colorId).toEqual('Please select your preferred color.');
          if (err) return done(err);
          done();
        });
    });
  
    it('should throw an error if product size is not entered', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .send({
          quantity: 2,
          colorId: 2,
          sizeId: '',
          cartId: 'ijkiiuoejhkni'
        })
        .end((err, res) => {
          const { success, errors } = res.body;
          expect(success).toEqual(false);
          expect(errors.sizeId).toEqual('Please select your preferred size.');
          if (err) return done(err);
          done();
        });
    });

    it('should successfully add product to cart', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .send({
          quantity: 2,
          colorId: 4,
          sizeId: 1,
          cartId: 'ijkiiuoejhkni'
        })
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('cart succesfully retrieved');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('update product quantity', () => {
    it('should throw an error if cart product is not found', (done) => {
      request(app)
        .put('/api/shopping-cart/ijkiiuoejhkni/50')
        .set('Content-Type', 'application/json')
        .send({ quantity: 4 })
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('Cart product not found');
          if (err) return done(err);
          done();
        });
    });

    it('should successfully update the quantity of a product in cart', (done) => {
      request(app)
        .put('/api/shopping-cart/ijkiiuoejhkni/1')
        .set('Content-Type', 'application/json')
        .send({ quantity: 4 })
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('cart succesfully retrieved');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('remove product from cart', () => {
    it('should throw an error if cart product is not found', (done) => {
      request(app)
        .delete('/api/shopping-cart/ijkiiuoejhkni/10')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success } = res.body;
          expect(success).toEqual(false);
          if (err) return done(err);
          done();
        });
    });

    it('should successfully remove a product from cart', (done) => {
      request(app)
        .delete('/api/shopping-cart/ijkiiuoejhkni/1')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('cart succesfully retrieved');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('clear cart', () => {
    it('should throw an error if no product was found in cart', (done) => {
      request(app)
        .delete('/api/shopping-cart/90u9u876t7ytfy')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success } = res.body;
          expect(success).toEqual(false);
          if (err) return done(err);
          done();
        });
    });

    it('should successfully clear cart', (done) => {
      request(app)
        .delete('/api/shopping-cart/ijkiiuoejhkni')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Cart successfully cleared');
          if (err) return done(err);
          done();
        });
    });
  });
});
