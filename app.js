const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const date = require(__dirname + "/date.js");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [];
// let workList = [];
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB").then(function (err) {
  console.log("db connected");
});

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);
const listSchema = {
  listName: String,
  items: [itemSchema],
};
const List = mongoose.model("List", listSchema);

const nitesh = new Item({
  name: "nitesh",
});
const keshav = new Item({
  name: "keshav",
});
const defaultItems = [nitesh, keshav];

// let nitesh = new Item({
//   item: "my name is nitesh",
// });
// nitesh.save();
app.get("/", function (req, res) {
  // let day = date.getDate();

  Item.find({}, function (err, foundItems) {
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  let listTitle = req.body.list;

  const new_item = new Item({
    name: item,
  });

  if (listTitle == "Today") {
    new_item.save();
    res.redirect("/");
  } else {
    List.findOne({ listName: listTitle }, function (err, foundList) {
      foundList.items.push(new_item);
      foundList.save();
      res.redirect("/" + foundList.listName);
    });
  }
});
app.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    res.redirect("/");
  });
});
app.get("/:customName", function (req, res) {
  const customListName = req.params.customName;

  List.findOne({ listName: customListName }, function (err, foundLists) {
    if (!err) {
      if (!foundLists) {
        const list = new List({
          listName: customListName,
          items: [],
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundLists.listName,
          newListItems: foundLists.items,
        });
      }
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("server is start");
});
