const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you to get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("sample_project");
 db_connect
   .collection("notifications")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you to get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb("sample_project");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("notifications")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you to get the total amount of records
recordRoutes.route("/total").get(function (req, res) {
  let db_connect = dbo.getDb("smaple_project");
  db_connect
    .collection("notifications")
    .countDocuments(function (err, count) {
      if (err) throw err;
      res.json(count);
    });
});

// This section will help you to get the number of read messages
recordRoutes.route("/read").get(function (req, res) {
  let db_connect = dbo.getDb("sample_project");
  db_connect
    .collection("notifications")
    .countDocuments({read: false}, function (err, count) {
      if (err) throw err;
      res.json(count);
    });
});
 
// This section will help you to create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb("sample_project");
 let myobj = {
   message: req.body.message,
   description: req.body.description,
   read: false,
 };
 db_connect
    .collection("notifications")
    .insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});
 
// This section will help you to update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb("sample_project");
 let myquery = { _id: ObjectId(req.params.id) };
 let newValues = {
   $set: {
    message: req.body.message,
    description: req.body.description,
   },
 };
 db_connect
   .collection("notifications")
   .updateOne(myquery, newValues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

// This section will help you to mark a record as read
recordRoutes.route("/read/:id").post(function (req, response) {
  let db_connect = dbo.getDb("sample_project");
  let myquery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      read: true,
    },
  };
  db_connect
    .collection("notifications")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document marked as read");
      response.json(res);
    });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb("sample_project");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
    .collection("notifications")
    .deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});
 
module.exports = recordRoutes;