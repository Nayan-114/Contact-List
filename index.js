const express = require('express');
const path = require('path');
const port=8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views1'));

app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error fetching the code');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list:contacts
        });
    });
});
app.post('/create-contact',function(req,res)
{   
    let id = req.query.id;
    Contact.create(
        {
            name:req.body.name,
            phone:req.body.phone
        },function(err,myContact)
        {
            if(err)
            {
                console.log("Error connecting to the database");
                return;
            }
            console.log('********',myContact);
            return res.redirect('back');
        });

});

app.get('./delete-contact',function(req,res){
    Contact.findByIdAndRemove(id,function(err)
    {   
        if(err)
        {
            console.log('Error deleting the contacts');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error running the server');
        return;
    }
    else{
        console.log('Server is up and running:',port);
    }
});