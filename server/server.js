const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_SERV, { useNewUrlParser:true})
        .then(() => {
            console.log('connected')
        }).catch(err => console.log(err))

///Models///
const Pizza = require('./models/pizza');
const Site = require('./models/site');
const Messages = require('./models/messages');


///////////

app.prepare()
   .then(()=>{
       const server = express();
       server.use(bodyParser.json());


///MAKE REQUEST TO GRAB PIZZAS///
        server.post('/api/v1/pizza',(req,res)=> {
            const pizzaData = req.body;
            const pizza = new Pizza(pizzaData);

            pizza.save((err, pizza)=> {
                if(err) { return res.status(422).send(err)}
                return res.json(pizza)
            })
        })
////////////////
        server.get('/api/v1/pizza', (req,res)=> {
            Pizza.find({}, (err, allPizzas)=> {
                if(err) { return res.status(422).send(err)}
                return res.json(allPizzas)
            })
        })

/////////////
        server.get('/api/v1/pizza/:name', (req, res)=> {
            let pizzaName = req.params.name;

            Pizza.find({idName:pizzaName}, (err, pizza)=> {
                if(err) { return res.status(422).send(err) }
                return res.json(pizza)
            })
        })


        server.get('/api/v1/site',(req, res)=> {
            Site.find({}, (err, site)=> {
                if(err) { return res.status(422).send(err) }
                return res.json(site)
            })
        })

///// START MESSAGE /////
        server.post('/api/v1/messages',(req,res)=>{
            const msgData = req.body;
            const messages = new Messages(msgData);

            messages.save((err,message)=>{
                if(err) { return res.status(422).send(err) }
                return res.json({status:'DONE'})
            })
        })

///// END MESSAGE /////




        server.get('/pizzas/:id', (req,res)=>{
           const actualPage = '/pizzas';
           const queryParams = { pizzaName: req.params.id }
           app.render(req,res,actualPage,queryParams)
        })

        server.get('*', (req,res) => {
           return handle(req, res)
        })

        server.listen(3000, (err)=>{
           if(err) throw err 
           console.log('> ready on port 3000')
        })
   }).catch((ex)=>{
       console.error(ex.stack)
       process.exit(1)
   });

   // mongodb+srv://ibaylis:<password>@pizza-nextjs-site-50iwu.mongodb.net/test?retryWrites=true&w=majority