import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import {
  newUser,
  missingValues,
  invalidEmail,
  shortPassword,
  existingMail,
  validLogin,
  invalidLogin,
  missingLoginValues,
  shortfirstName,
  shortLastName
} from './userData/userData';


describe('User Authentication', () => {
  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  afterAll(async () => {
    await server.close();
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('user signup', () => {
    it('should return an error message if the user enters a wrong route', (done) => {
      request(app)
        .post('/api/users/riiouoiiper')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.message).toEqual('Oops! This route does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should successfully register a user', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.success).toEqual(true);
          expect(res.body.message).toEqual('Successful user registeration');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when required data are missing', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(missingValues)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.firstName).toEqual('First name is required.');
          expect(errors.lastName).toEqual('Last name is required.');
          expect(errors.email).toEqual('Email address is required.');
          expect(errors.password).toEqual('Password is required.');
          if (err) return done(err);
          done();
        });
    });
    it('should throw a validation error when the first name is too short', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(shortfirstName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.firstName).toEqual('Your first name must be between 3 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });
    it('should throw a validation error when the last name is too short', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(shortLastName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.lastName).toEqual('Your last name must be between 3 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when an invalid email format is entered', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(invalidEmail)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.email).toEqual('Please provide a valid email address.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when the password supplied is less than six characters', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(shortPassword)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.password).toEqual('Your password must be between 6 and 20 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when users enters an already existing email address', (done) => {
      request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send(existingMail)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.email).toEqual('Email already exists.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('user login', () => {
    it('should successfully login a registered user', (done) => {
      request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send(validLogin)
        .end((err, res) => {
          expect(res.body.success).toEqual(true);
          expect(res.body.message).toEqual('Successful Login');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when the parameters are not supplied', (done) => {
      request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send(missingLoginValues)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.email).toEqual('Email address is required.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error when users enters an wrong password or email', (done) => {
      request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send(invalidLogin)
        .end((err, res) => {
          expect(res.body.success).toEqual(false);
          if (err) return done(err);
          done();
        });
    });
  });
});
