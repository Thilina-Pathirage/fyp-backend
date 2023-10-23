const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); // Replace with the actual path to your server's entry point.
const should = chai.should(); // Using should style assertions
const { expect } = chai;

chai.use(chaiHttp);

describe('ComplaintsRoutes API', () => {

  describe('POST /api/complaints/create', () => {
    it('should create a new complaint', (done) => {
      const complaint = {
        title: 'My Complaint Title',
        description: 'Description of my complaint.',
        userEmail: 'user@example.com',
      };

      chai.request(server)
        .post('/api/complaints/create')
        .send(complaint)
        .end((err, res) => {
          res.should.have.status(201); // Assuming you return a 201 status on successful creation
          done();
        });
    });
  });

  describe('GET /api/complaints/all', () => {
    it('should get all complaints', (done) => {
      chai.request(server)
        .get('/api/complaints/all')
        .end((err, res) => {
          res.should.have.status(200); // Assuming you return a 200 status on success
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Add more test cases for other endpoints (by-user, delete, update)

});
