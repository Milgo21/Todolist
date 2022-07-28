const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema ={
    name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
    name:"Welcome to your ToDoList"
});
const item2 = new Item({
    name:"Hit the + sign to add a ToDo"
});
const item3 = new Item({
    name:"Hit the - sign to remove a ToDo"
});
const defaultItems = [item1, item2, item3];


app.get("/", function (req, res) {
    


    Item.find({}, function(err, foundItems){
       if (foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
             if (err){
                console.log("There was an error");
            }else{
            console.log("Great success, saved items on DB");
        }
        });
        res.redirect("/");
       }else{
        res.render("list",{listTitle:"Today", newListItems: foundItems});
       }
    });

});
app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});
app.get("/work", function (req, res) {
    res.render("list",{listTitle: "Work Lists",newListItems: workItems});
});
app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000..");
}); 





  
  