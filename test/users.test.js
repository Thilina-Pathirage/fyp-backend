const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/usersModel'); // Replace with your User model

chai.use(chaiHttp);

// Clear the user collection before starting tests
before(async () => {
  await User.deleteMany({});
});

describe('User Registration and Login Tests', () => {

    it('Should register a new user', (done) => {
        const newUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@test.com',
            password: 'testpassword',
            userRole: "admin",
            position: "Manager",
            workStatus: "Offline"
        };

        chai.request(server)
            .post('/api/users/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(201);
                // Add more assertions as needed
                done();
            });
    });

    it('Should log in a user', (done) => {
        const credentials = {
            email: 'johndoe@test.com',
            password: 'testpassword',
        };

        chai.request(server)
            .post('/api/users/login')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200);
                // Add more assertions as needed
                done();
            });
    });
    
    it('Should retrieve the user data by email', (done) => {
        chai.request(server)
            .get('/api/users/by-email/johndoe@test.com')
            .end((err, res) => {
                res.should.have.status(200);
                // Add more assertions as needed
                done();
            });
    });

    it('Should get all users', (done) => {
        chai.request(server)
            .get('/api/users/all-users')
            .end((err, res) => {
                res.should.have.status(200);
                // Add more assertions as needed
                done();
            });
    });

    // Add more test cases as needed

});
