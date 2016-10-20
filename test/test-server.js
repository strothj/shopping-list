const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const app = server.app;
const storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', () => {
  it('should list items on GET', function (done) {
    chai.request(app)
      .get('/items')
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].id.should.be.a('number');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.equal('Broad beans');
        res.body[1].name.should.equal('Tomatoes');
        res.body[2].name.should.equal('Peppers');
        done();
      });
  });
  it('should add an item on post', function (done) {
    chai.request(app)
      .post('/items')
      .send({ name: 'Kale' })
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('id');
        res.body.name.should.be.a('string');
        res.body.id.should.be.a('number');
        res.body.name.should.equal('Kale');
        storage.items.should.be.a('array');
        storage.items.should.have.length(4);
        storage.items[3].should.be.a('object');
        storage.items[3].should.have.property('id');
        storage.items[3].should.have.property('name');
        storage.items[3].id.should.be.a('number');
        storage.items[3].name.should.be.a('string');
        storage.items[3].name.should.equal('Kale');
        done();
      });
  });
  it('should edit an item on put', function (done) {
    chai.request(app)
      .put('/items/3')
      .send({ name: 'Bob', id: 3 })
      .end(function (err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        storage.items[2].id.should.equal(3);
        storage.items[2].name.should.equal('Bob');
        done();
      });
  });
  it('should delete an item on delete');
  it('should return error on post of existing item');
  it('should return error on post with empty body');
  it('should return error on post with non-json body');
  it('should return error on put without id on endpoint');
  it('should return error on put with different id in endpoint than body');
  it('should return error on put to id that does not exist');
  it('should return error on put without body data');
  it('should return error on put with non-json body');
  it('should return error on delete on item that does not exist');
  it('should return error on delete without id in endpoint');
});
