
const express=require('express');
const path =require('path');
const app=express();
const bodyparser=require('body-parser')
const port=5000;

//to use mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactTuition', {useNewUrlParser: true, useUnifiedTopology: true});

//define the schema in MongoDB
const conSchema = new mongoose.Schema({
    name: String,
    Fname: String,
    email: String,
    pnumber: String,
    age: String,
    description: String,
    
  });

  const contact = mongoose.model('contactTuiton', conSchema);

//Express specific stuff
app.use('/static', express.static('static'))// for serving static files
app.use(express.urlencoded())


//PugSpecific stuff
app.set('view engine', 'pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//Set the views directory

//End points
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/about',(req,res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services',(req,res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

//dataBase
app.post('/contact',(req,res)=>{
    let mYdata= new contact(req.body);
    mYdata.save().then(()=>{
        res.send("this data has been saved to the database")
    }).catch(()=>{
        res.status(404).send("this item has not been saved to the database")
    })
})



app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});