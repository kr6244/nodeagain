//you can render static or dynamic content .for static content like html,css,js that has no variable u can use middleware "express.static(__dirname+'/')"
//app.use(express.static(dirname+'/'))

const express=require('express');
const fs=require('fs');
var hbs=require('express-hbs');
const _ =require('lodash');
var app=express();
const port=process.env.PORT || 4000 ;
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine','hbs');
app.set('views', __dirname + '/views');
app.get('/about',(req,res)=>
{
  res.send('about');


});


app.get('/',(req,res)=>
{
  res.render('try.hbs');
//  res.send('WELCOME');
});


app.get('/login/:id/:pwd',(req,res)=>
{

var notes=JSON.parse(fs.readFileSync('login.json'));
var valid=notes.filter((note)=>
{
  if(note.id==req.params.id && note.pwd==req.params.pwd)
  {
   return note;
  }

});
if(valid.length>0)
{
  res.render('welcome.hbs',{
    id:req.params.id,
    currtime: new Date().getFullYear()
  });
}
else {
  res.render('sorry.hbs',{
    id:req.params.id,
    currtime: new Date().getFullYear()
  });

}


});


app.get('/signup/:id/:pwd',(req,res)=>
{
  var notes=JSON.parse(fs.readFileSync('login.json'));
  var newuser={
    id:req.params.id,
    pwd:req.params.pwd
  };
  notes.push(newuser);
  fs.writeFileSync('login.json',JSON.stringify(notes));
  res.send("added user");

})


app.listen(port,()=>
{
  console.log('connected to server '+ port);
})
