import request from 'supertest';
import app, { server } from '../../../..';
import models from '../../../database/models';

import {
  newUser,
  validUpdate,
  shortAddress,
  shortCountryName,
  shortUserName,
  shortPhoneNumber,
  shortRegionName,
  shortEveningPhone,
  shortMobilePhone,
  shortAddress2,
  shortCityName
} from './userData/userData';

let token;
const fakeToken = 'ugioypupitokurpoipirohihopgrjpgjhirguo[pir';

describe('User Profile', () => {
  beforeAll(async () => {
    await models.Customer.destroy({ force: true, truncate: { cascade: true } });
    const user = await request(app).post('/api/users/register').send(newUser);
    // eslint-disable-next-line prefer-destructuring
    token = user.body.token;
  });
  afterAll(async () => {
    await server.close();
    await models.Customer.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('profile view', () => {
    it('should successfully fetch a registered user\'s profile', (done) => {
      request(app)
        .get('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { success, message, user } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('User\'s profile succesfully retrieved');
          expect(user.name.split(' ')[0]).toEqual('Maria');
          if (err) return done(err);
          done();
        });
    });

    it('should prompt a user to signup or login if no token is provided', (done) => {
      request(app)
        .get('/api/user')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { message, success } = res.body;
          expect(success).toEqual(false);
          expect(message).toEqual('Please Login or Signup to gain access');
          if (err) return done(err);
          done();
        });
    });

    it('should throw an error when an invalid token is provided', (done) => {
      request(app)
        .get('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${fakeToken}`)
        .end((err, res) => {
          const { message, success } = res.body;
          expect(success).toEqual(false);
          expect(message).toEqual('Your Token is invalid');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('profile update', () => {
    it('should successfully login a update a logged user\'s profile', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(validUpdate)
        .end((err, res) => {
          expect(res.body.success).toEqual(true);
          expect(res.body.message).toEqual('User profile succesfully updated');
          if (err) return done(err);
          done();
        });
    });
    it('should throw a validation error if the name update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortUserName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.name).toEqual('Your name must be between 3 and 50 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the address1 update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortAddress)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.address1).toEqual('Your address should have between 6 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the address2 update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortAddress2)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.address2).toEqual('Your address should have between 6 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the country update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortCountryName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.country).toEqual('Your country name should be between 3 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the city name update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortCityName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.city).toEqual('Your city should have between 3 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the phone number update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortPhoneNumber)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.dayPhone).toEqual('Please enter a valid phone number');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the phone number update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortEveningPhone)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.eveningPhone).toEqual('Please enter a valid phone number');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the phone number update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortMobilePhone)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.mobilePhone).toEqual('Please enter a valid phone number');
          if (err) return done(err);
          done();
        });
    });

    it('should throw a validation error if the phone number update is too short', (done) => {
      request(app)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(shortRegionName)
        .end((err, res) => {
          const { errors, success } = res.body;
          expect(success).toEqual(false);
          expect(errors.region).toEqual('Your region should have between 3 and 200 characters.');
          if (err) return done(err);
          done();
        });
    });
  });
});
