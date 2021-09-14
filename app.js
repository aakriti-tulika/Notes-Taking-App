const express=require('express');
const todocontroller =require('./controllers/todo_controller');

const app=express();




//set up template engine
app.set('view engine','ejs');

//static files in built express middleware i.e.express.static
app.use(express.static('./public')); //not route specific will fire on every route public me assests me check krega

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//fire controller
todocontroller(app);

//listen to port
app.listen(3000);
console.log('you are listening to port 3000');

