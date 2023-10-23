const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); // Replace with the actual path to your server's entry point.
const should = chai.should(); // Using should style assertions
const { expect } = chai;

chai.use(chaiHttp);

describe('LeavesRoutes API', () => {

  describe('POST /api/leaves/create', () => {
    it('should create a new leave request', (done) => {
      const leaveRequest = {
        startDate: '2023-10-10',
        endDate: '2023-10-12',
        requestedDate: '2023-10-05',
        requestedUserEmail: 'user@example.com',
        reason: 'Vacation',
      };

      chai.request(server)
        .post('/api/leaves/create')
        .send(leaveRequest)
        .end((err, res) => {
          res.should.have.status(201); // Assuming you return a 201 status on successful creation
          done();
        });
    });
  });

  describe('GET /api/leaves/all', () => {
    it('should get all leave requests', (done) => {
      chai.request(server)
        .get('/api/leaves/all')
        .end((err, res) => {
          res.should.have.status(200); // Assuming you return a 200 status on success
          res.body.should.be.a('array');
          done();
        });
    });
  });


});
