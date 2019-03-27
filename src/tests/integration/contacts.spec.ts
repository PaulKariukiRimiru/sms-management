import { assert } from 'chai';
import request from 'supertest';

import { getContact } from 'src/controllers/Contact';
import { seedData } from 'src/seeders/seed';
import { tearDownData } from 'src/seeders/teardown';
import { initServer } from 'src/server';

describe('The Contacts', () => {
  const app  = initServer().app;
  let contacts: string[];

  before(async () => {
    contacts = await seedData();
  });

  after(async () => {
    await tearDownData();
  });

  describe('GET endpoint', () => {

    it('/api/v1/contact gets all contacts', () => {

      return request(app)
        .get('/api/v1/contact')
        .expect(200)
        .then((response) => {
          assert.equal(response.body.status, 'success');
          assert.equal(response.body.data.length, 2);
        });
    });

    it('/api/v1/contact/?<id> gets all contacts', () => {

      return request(app)
        .get('/api/v1/contact')
        .query({ id: contacts[1] })
        .expect(200)
        .then((response) => {
          assert.equal(response.body.status, 'success');
          assert.equal(response.body.data._id, contacts[1]);
        });
    });

    it('/api/v1/contact/?<id> fails for invalid id', () => {

      return request(app)
        .get('/api/v1/contact')
        .query({ id: 'some odd id' })
        .expect(400)
        .then((response) => {
          assert.equal(response.body.status, 'failed');
        });
    });
  });
  describe('POST endpoint', () => {

    it('/api/v1/contact creates a contact', () => {

      const sampleContact = {
        name: 'test',
        phonenumber: '0711000000',
      };

      return request(app)
        .post('/api/v1/contact')
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(200)
        .then((response) => {
          assert.equal(response.body.status, 'success');
          assert.equal(response.body.data.name, sampleContact.name);
        });
    });

    it('/api/v1/contact does not create a contact with invalid phonenumber', () => {

      const sampleContact = {
        name: 'test',
        phonenumber: '071100000jkada',
      };

      return request(app)
        .post('/api/v1/contact')
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          assert.equal(response.body.status, 'failed');
        });
    });

    it('/api/v1/contact does not create a contact with invalid name', () => {

      const sampleContact = {
        name: 234,
        phonenumber: '071100000jkada',
      };

      return request(app)
        .post('/api/v1/contact')
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          assert.equal(response.body.status, 'failed');
        });
    });
  });

  describe('PUT endpoint', () => {

    it('/api/v1/contact/?<id> updates a contact', () => {

      const sampleContact = {
        name: 'test update',
        phonenumber: '0722999999',
      };

      return request(app)
        .put('/api/v1/contact')
        .query({ id: contacts[0] })
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(200)
        .then(async (response) => {

          assert.equal(response.body.status, 'success');
          const updatedContact = await getContact(contacts[0]);

          assert.isTrue(updatedContact.isRight());

          assert.equal(updatedContact.value.phonenumber, sampleContact.phonenumber);
          assert.equal(updatedContact.value.name, sampleContact.name);
        });
    });

    it('/api/v1/contact/?<id> does not update a contact with invalid phonenumber', () => {

      const sampleContact = {
        name: 'test',
        phonenumber: '071100000jkada',
      };

      return request(app)
        .put('/api/v1/contact')
        .query({ id: contacts[0] })
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          assert.equal(response.body.status, 'failed');
        });
    });

    it('//api/v1/contact/?<id> does not update a contact with invalid name', () => {

      const sampleContact = {
        name: 234,
        phonenumber: '071100000jkada',
      };

      return request(app)
        .put('/api/v1/contact')
        .query({ id: contacts[0] })
        .send(sampleContact)
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          assert.equal(response.body.status, 'failed');
        });
    });
  });
  describe('DELETE endpoint', () => {

    it('/api/v1/contact/?<id> deletes a contact', () => {

      return request(app)
        .put('/api/v1/contact')
        .query({ id: contacts[0] })
        .expect(200)
        .then(async (response) => {
          assert.equal(response.body.status, 'success');
        });
    });

    it('/api/v1/contact/?<id> delete fails for a non existing contact', () => {

      return request(app)
        .put('/api/v1/contact')
        .query({ id: 'inviscible contact' })
        .expect(400)
        .then(async (response) => {
          assert.equal(response.body.status, 'failed');
        });
    });
  });
});
