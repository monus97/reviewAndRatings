let server = require('../index');
let chai = require('chai');
const chaiHttp = require('chai-http');
//let routes = require('../routes/userroutes')

chai.should();
chai.use(chaiHttp);

describe("Task API",()=>{
    describe("POST/api/users",()=>{
        it(" it Should return login user details",(done)=>{
            const data = {
                email : "ashishyadav@gmail.com",
                password : "ashish"
            };
            chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.a("object")
                res.body.should.have.property("status").eq("success");
                res.body.should.have.property("message").eq("login success");
               // res.body.should.have.property("token").eq(token);
                done();
            })
        })
    })
})