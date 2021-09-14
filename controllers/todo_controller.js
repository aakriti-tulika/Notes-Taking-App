//handle the route manipulate the data
const mongoose=require('mongoose');

//connnection string to mongodb
mongoose.connect('mongodb+srv://new_user:test1234@cluster0.nmadl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//create a schema -this is like a blueprint
var todoschema = new mongoose.Schema({
    item : String
});

var Todo =  mongoose.model('Todo',todoschema);
/*var item1=Todo({item : 'buy flower'}).save(function (err){
    if(err)
    throw err;
    console.log('item saved');
});*/

//var data =[{item:'get milk'},{item:'walk'},{item:'simle'}];


module.exports=function(app){

    //req handlers
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to the veiw
        Todo.find({},function(err,data){
            if(err)
            throw err;
            res.render('todo',{todos:data});
        });//grab all the item in todo collection
        
    });

    app.post('/todo', function(req,res){
        //to get data from the view and add to datbase
        var newTodo=Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //delete req item from database
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err)
            throw err;
            res.json(data);
        });
        /*data= data.filter(function(listeditem){
            return listeditem.item.replace(/ /g, '-') !==req.params.item;*/ //if it return true item remains in e list else it will be removed
        
        
    });
};