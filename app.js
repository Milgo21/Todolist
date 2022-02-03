const express = require("express");
const bodyParser = require("body-parser");
const { getDate } = require("./date");
const date = require(__dirname+"/date.js")

let items =[];//"Run a marathon","Eat mutura", "Dance a little bit"
let workItems =[];
const app = express();
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function (req, res) {
    
    const day = date.getDay();
    res.render("list",{listTitle: day,newListItems: items});

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





  
  