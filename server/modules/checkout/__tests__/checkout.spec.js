import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import { newUser, newUser2 } from '../../user/__tests__/userData/userData';
import {
  productsData,
  departmentsData,
  categoriesData,
  productCategories,
  attributeData,
  attributeValueData,
  productAttributeData,
} from '../../products/__tests__/productData/products';
import { ordersData, shippingData, shippingRegionData } from '../checkoutData/checkout';

let token; let token2;

describe('Checkout', () => {
  beforeAll(async () => {
    await models.Customer.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Attribute.destroy({ force: true, truncate: { cascade: true } });
    await models.AttributeValue.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductAttribute.destroy({ force: true, truncate: { cascade: true } });
    await models.Order.destroy({ force: true, truncate: { cascade: true } });
    await models.Shipping.destroy({ force: true, truncate: { cascade: true } });
    await models.ShippingRegion.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.bulkCreate(departmentsData);
    await models.Category.bulkCreate(categoriesData);
    await models.Product.bulkCreate(productsData);
    await models.ProductCategory.bulkCreate(productCategories);
    await models.Attribute.bulkCreate(attributeData);
    await models.AttributeValue.bulkCreate(attributeValueData);
    await models.ProductAttribute.bulkCreate(productAttributeData);
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
          expect(regions[0].shipping_region).toEqual('US / Canada');
          if (err) return done(err);
          done();
        });
    });
  });
});
