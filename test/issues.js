const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

urlPadrao = 'https://api.github.com/repos/'

client_id = 'client_id=2c5af4efe6eb93041db9'
client_secret='client_secret=c443e33b8cbb83fc070a884c94a8d80c9653a557'
access_token = 'access_token=a5eb14a4d7b3288fc7948bd3fc97e279c85ceb70'

var corpo = {
    "title": "Deu ruim galera",
    "body": "Isso é apenas uma issue de teste",
    "assignees": [
      "alessandroprudencio"
    ],
    "labels": [
      "bug"
    ],
  }

  
describe('Requisicões issues',function(){

    it('Listar issues do repositório', function(done){
        chai.request(urlPadrao)
        .get(`alessandroprudencio/Platform-EAD/issues?${client_id}&${client_secret}`)
        .end(function(err, res){
            if(err)console.log(err)
            res.should.have.status(200)
            done()
        })
    })

    it('Mostrar informaçes de uma issue', function(done){
        chai.request(urlPadrao)
        .get(`alessandroprudencio/Platform-EAD/issues/11?${client_id}&${client_secret}`)
        .end(function(err, res){
            if(err)console.log(err)
            res.should.have.status(200)
            done()
        })
    })

    it('Criar uma issue', function(done){
        chai.request(urlPadrao)
        .post(`alessandroprudencio/Platform-EAD/issues?${client_id}&${client_secret}&${access_token}`)
        .send(corpo)
        .end(function(err,res){
            if(err)console.log(err)
            res.should.have.status(201)
            done()
        })
    }) 


    it('Editar uma issue', function(done){
        chai.request(urlPadrao)
        .patch(`alessandroprudencio/Platform-EAD/issues/11?${client_id}&${client_secret}&${access_token}`)
        .send(corpo)
        .end(function(err,res){
            if(err)console.log(err)
            res.should.have.status(200)
            done()
        })
    })
})