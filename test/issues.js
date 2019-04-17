const chai = require('chai')
const chaiHttp = require('chai-http')

const should = chai.should()

chai.use(chaiHttp)

urlPadrao = 'https://api.github.com/repos/'


var corpo = {
    "title": "Deu ruim galera",
    "body": "Isso é apenas uma issue de teste",
    "assignees": [
      "alessandroprudencio"
    ],
    "milestone": 1,
    "labels": [
      "bug"
    ]
  }

describe('Requisicões issues',function(){

    it('Listar issues do repositório', function(done){
        chai.request(urlPadrao)
        .get('alessandroprudencio/Platform-EAD/issues')
        .end(function(err, res){
            if(err)console.log('deu erro', err)
            res.should.have.status(200)
           //res.body.login.should.have.be.equal('octocat')
            //console.log(res.body)
            done()
        })
    })

    it('Mostrar informaçes de uma issue', function(done){
        chai.request(urlPadrao)
        .get('alessandroprudencio/Platform-EAD/issues/1')
        .end(function(err, res){
            if(err)console.log(err,res)

            res.should.have.status(200)
            done()
        })
    })

    it('Criar uma issue', function(done){
        chai.request(urlPadrao)
        .post('alessandroprudencio/Platform-EAD/issues')
        .send(corpo)
        .end(function(err,res){
            if(err)console.log(err)
            console.log(urlPadrao+'alessandroprudencio/Platform-EAD/issues')
            console.log(res.body)
            res.should.have.status(201)
            done()
        })
    })


    it('Editar uma issue', function(done){
        chai.request(urlPadrao)
        .patch('alessandroprudencio/Platform-EAD/issues/1')
        .send(corpo)
        .end(function(err,res){
            if(err)console.log(err)
            console.log(res.body)
            res.should.have.status(200)
            done()
        })
    })
})