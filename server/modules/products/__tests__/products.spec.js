import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import {
  productsData,
  departmentsData,
  categoriesData,
  productCategories
} from './productData/products';

describe('Products Endpoint', () => {
  beforeAll(async () => {
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
    await models.Department.bulkCreate(departmentsData);
    await models.Category.bulkCreate(categoriesData);
    await models.Product.bulkCreate(productsData);
    await models.ProductCategory.bulkCreate(productCategories);
  });
  afterAll(async () => {
    await server.close();
    await models.Department.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    await models.Product.destroy({ force: true, truncate: { cascade: true } });
    await models.ProductCategory.destroy({ force: true, truncate: { cascade: true } });
  });

  it('should successfully fetch all products', (done) => {
    request(app)
      .get('/api/products')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, products, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual(' Products succesfully retrieved');
        expect(products[1].name).toEqual('Chartres Cathedral');
        expect(products[1].image).toEqual('kjhjopjjkn');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully fetch all products in a queried category', (done) => {
    request(app)
      .get('/api/products?category=French')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, products, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual('French Products succesfully retrieved');
        expect(products[1].name).toEqual('Chartres Cathedral');
        expect(products[1].image).toEqual('chartres-cathedral.gif');
        if (err) return done(err);
        done();
      });
  });

  it('should return a 404 error if queried category does not exists', (done) => {
    request(app)
      .get('/api/products?category=Gramarian')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, error } = res.body;
        expect(success).toEqual(false);
        expect(error).toEqual('No product found for Gramarian');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully fetch all products in a queried keyword', (done) => {
    request(app)
      .get('/api/products?keyword=Arc')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, products, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual(' Products succesfully retrieved');
        expect(products[0].name).toEqual('Arc d\'Triomphe');
        expect(products[0].image).toEqual('arc-d-triomphe.gif');
        if (err) return done(err);
        done();
      });
  });

  it('should return a 404 error if queried keyword does not exists', (done) => {
    request(app)
      .get('/api/products?keyword=ioji0ii0i0i')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, error } = res.body;
        expect(success).toEqual(false);
        expect(error).toEqual('No product found for ioji0ii0i0i');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully fetch all products categories', (done) => {
    request(app)
      .get('/api/product-categories')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, categories, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual('Categories succesfully retrieved');
        expect(categories[0].name).toEqual('French');
        expect(categories[0].department_id).toEqual(1);
        if (err) return done(err);
        done();
      });
  });

  it('should successfully fetch all departments', (done) => {
    request(app)
      .get('/api/departments')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, departments, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual('Departments succesfully retrieved');
        expect(departments[0].name).toEqual('Regional');
        if (err) return done(err);
        done();
      });
  });

  it('should successfully fetch a single product by its id', (done) => {
    request(app)
      .get('/api/products/product/2')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, product, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual('Product succesfully retrieved');
        expect(product.name).toEqual('Chartres Cathedral');
        if (err) return done(err);
        done();
      });
  });

  it('should return a 404 error if product does not exist', (done) => {
    request(app)
      .get('/api/products/product/50')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, error } = res.body;
        expect(success).toEqual(false);
        expect(error).toEqual('Product not found');
        if (err) return done(err);
        done();
      });
  });

  it('should fetch all products associated to a department', (done) => {
    request(app)
      .get('/api/products/department/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, message } = res.body;
        expect(success).toEqual(true);
        expect(message).toEqual('Department products succesfully retrieved');
        if (err) return done(err);
        done();
      });
  });

  it('should throw a 404 error if department does not exist', (done) => {
    request(app)
      .get('/api/products/department/50')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { success, error } = res.body;
        expect(success).toEqual(false);
        expect(error).toEqual('Department not found');
        if (err) return done(err);
        done();
      });
  });

  describe('get cart', () => {
    it('should fetch a logged in user\'s cart', (done) => {
      request(app)
        .get('/api/shopping-cart/89867578hihk')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('No product found in your cart');
          if (err) return done(err);
          done();
        });
    });
  });
});
