const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_SERV, { useNewUrlParser:true})
        .then(() => {
            console.log('connected')
        }).catch(err => console.log(err))


// middleware
const servAuth = require('./middleware/servAuth');

///Models///
const Pizza = require('./models/pizza');
const Site = require('./models/site');
const Messages = require('./models/messages');

const robotsOptions = {
    //root: __dirname + '/static/',
    root: path.join(__dirname, '../static/'),
    header: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
}


///////////

app.prepare()
   .then(()=>{
       const server = express();
       server.use(compression());
       server.use(bodyParser.json());

       server.get('/robots.txt', (req, res) => {
           return res.status(200).sendFile('robots.txt', robotsOptions)
       })


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
/// middleware to check if tokens are correct

        server.patch('/api/v1/site', servAuth.authJWT, (req,res)=> {
            let siteData = req.body;

            Site.find({}, (err,site)=>{
                let newSite = site[0];

                newSite.set(siteData);
                newSite.save((err, site)=> {
                    if (err) { return res.status(422).send(err) }
                    return res.json({update: 'DONE'})
                })
            })
        })






///// START MESSAGE /////
        server.get('/api/v1/messages',servAuth.authJWT,(req,res)=>{
            Messages.find({},(err,allMessages)=>{
                if(err) { return res.status(422).send(err) }
                return res.json(allMessages)
            })
        })



        server.post('/api/v1/messages',(req,res)=>{
            const msgData = req.body;
            const messages = new Messages(msgData);

            messages.save((err,message)=>{
                if(err) { return res.status(422).send(err) }
                return res.json({status:'DONE'})
            })
        })


        server.delete('/api/v1/messages', servAuth.authJWT,(req,res)=>{
            let messageId = req.body.id;

            Messages.deleteOne({_id:messageId}, (err, msg) => {
                if (err) { return res.status(422).send(err) }

                Messages.find({}, (err, allMessages) => {
                    if (err) { return res.status(422).send(err) }
                    return res.json(allMessages)
                })
            })

            //return res.json({status:'DONE'})
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

        const PORT = process.env.PORT || 3000;

        server.listen(PORT, (err)=>{
           if(err) throw err 
           console.log(`> ready on port ${PORT}`)
        })
   }).catch((ex)=>{
       console.error(ex.stack)
       process.exit(1)
   });

   // mongodb+srv://ibaylis:<password>@pizza-nextjs-site-50iwu.mongodb.net/test?retryWrites=true&w=majority