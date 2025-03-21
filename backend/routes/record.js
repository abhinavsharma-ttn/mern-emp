// import express from "express";

// // This will help us connect to the database
// import db from "../db/connection.js";

// // This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// // router is an instance of the express router.
// // We use it to define our routes.
// // The router will be added as a middleware and will take control of requests starting with path /record.
// const router = express.Router();

// // This section will help you get a list of all the records.
// router.get("/", async (req, res) => {
//   let collection = await db.collection("records");
//   let results = await collection.find({}).toArray();
//   res.send(results).status(200);
// });

// // This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("records");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // This section will help you create a new record.
// router.post("/", async (req, res) => {
//   try {
//     let newDocument = {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level,
//     };
//     let collection = await db.collection("records");
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error adding record");
//   }
// });

// // This section will help you update a record by id.
// router.patch("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };
//     const updates = {
//       $set: {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//       },
//     };

//     let collection = await db.collection("records");
//     let result = await collection.updateOne(query, updates);
//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating record");
//   }
// });

// // This section will help you delete a record
// router.delete("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };

//     const collection = db.collection("records");
//     let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting record");
//   }
// });

// export default router;


import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as middleware and will take control of requests starting with path /record.
const router = express.Router();

// Middleware to log all incoming requests
router.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

// ✅ Get a list of all records
router.get("/", async (req, res) => {
  console.log("Fetching all records...");
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  console.log(`Found ${results.length} records`);
  res.status(200).send(results);
});

// ✅ Get a single record by ID
router.get("/:id", async (req, res) => {
  console.log(`Fetching record with ID: ${req.params.id}`);
  let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    console.log("Record not found");
    res.status(404).send("Not found");
  } else {
    console.log("Record found:", result);
    res.status(200).send(result);
  }
});

// ✅ Create a new record
router.post("/", async (req, res) => {
  try {
    console.log("Adding new record...");
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);

    console.log("Record added:", result.insertedId);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error adding record:", err);
    res.status(500).send("Error adding record");
  }
});

// ✅ Update a record by ID
router.patch("/:id", async (req, res) => {
  try {
    console.log(`Updating record with ID: ${req.params.id}`);
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      console.log("No record found to update");
      res.status(404).send("Record not found");
    } else {
      console.log(`Record updated: ${result.modifiedCount} changes`);
      res.status(200).send(result);
    }
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).send("Error updating record");
  }
});

// ✅ Delete a record by ID
router.delete("/:id", async (req, res) => {
  try {
    console.log(`Deleting record with ID: ${req.params.id}`);
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No record found to delete");
      res.status(404).send("Record not found");
    } else {
      console.log("Record deleted successfully");
      res.status(200).send(result);
    }
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
