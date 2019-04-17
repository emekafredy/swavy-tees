import request from 'supertest';
import app, { server } from '../../../../server';
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
import { ordersData, shippingData, shippingRegionData } from '../checkoutData/checkout';

let token; let token2;

describe('Checkout', () => {
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
    await models.Order.destroy({ force: true, truncate: { cascade: true } });
    await models.Shipping.destroy({ force: true, truncate: { cascade: true } });
    await models.ShippingRegion.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.bulkCreate(departmentsData);
    await models.Category.bulkCreate(categoriesData);
    await models.Product.bulkCreate(productsData);
    await models.ProductCategory.bulkCreate(productCategories);
    await models.Size.bulkCreate(sizeData);
    await models.Color.bulkCreate(colorData);
    await models.ProductColor.bulkCreate(productColorsData);
    await models.ProductSize.bulkCreate(productSizesData);
    await models.Order.bulkCreate(ordersData);
    await models.Shipping.bulkCreate(shippingData);
    await models.ShippingRegion.bulkCreate(shippingRegionData);
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
    await models.Order.destroy({ force: true, truncate: { cascade: true } });
    await models.Shipping.destroy({ force: true, truncate: { cascade: true } });
    await models.ShippingRegion.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('get orders', () => {
    xit('should successfully fetch a logged in user\'s orders', (done) => {
      request(app)
        .get('/api/orders')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('RESPONSE>>>>>>>>>>>>>>>', res.body);
          console.log('ERRRORR>>>>>>>>>>>>>>>', err);
          const { success, message, order } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('orders succesfully retrieved');
          expect(order[0].totalAmount).toEqual(113.94);
          if (err) return done(err);
          done();
        });
    });

    it('should return an empty result if user has no order', (done) => {
      request(app)
        .get('/api/orders')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token2}`)
        .end((err, res) => {
          const { success, error } = res.body;
          expect(success).toEqual(false);
          expect(error).toEqual('No order found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('get regions', () => {
    it('should successfully fetch all shopping regions', (done) => {
      request(app)
        .get('/api/regions')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, message, regions } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Regions succesfully retrieved');
          expect(regions[0].shippingRegion).toEqual('US / Canada');
          if (err) return done(err);
          done();
        });
    });
  });
});
