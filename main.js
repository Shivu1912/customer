const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const jwtKey = process.env.JWT_SECRET || "default_jwt_secret"; // Use a default if JWT_SECRET is not set
const dbName = "nodejs";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let customerAPI = "/api/customer";

// Fetch all customers
app.get(customerAPI, async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const customers = await db.collection("user").find().toArray();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching customers");
  } finally {
    await client.close();
  }
});

// Fetch a customer by ID
app.get(`${customerAPI}/:id`, async (req, res) => {
  const customerId = req.params.id;
  try {
    await client.connect();
    const db = client.db(dbName);
    const customer = await db
      .collection("user")
      .findOne({ _id: new ObjectId(customerId) });

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching customer");
  } finally {
    await client.close();
  }
});

// Insert a new customer
app.post(customerAPI, async (req, res) => {
  const customer = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(customer.password, salt);
  customer.password = hashedPassword;
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("user").insertOne(customer);

    if (result.insertedCount === 0) {
      return res.status(500).send("Error inserting customer");
    }
    res.status(201).json({
      message: "Customer inserted successfully",
      customerId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting customer");
  } finally {
    await client.close();
  }
});

// User registration
// app.post(customerAPI + "/register", async (req, res) => {
//   const { username, email, phone, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db
//       .collection("user")
//       .insertOne(username, email, phone, password);

//     const existingUser = await collection.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     await collection.insertOne({
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//     });
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   } finally {
//     await client.close();
//   }
// });

// User authentication
app.post(customerAPI + "/authentication", async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username, password);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("user");

    const user = await collection.findOne({ username });
    console.log("usrholh", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }
    console.log("Password", passwordMatch);
    const token = jwt.sign({ username: user.username, id: user._id }, jwtKey, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true }).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  } finally {
    await client.close();
  }
});

// Update a customer by ID
app.put(`${customerAPI}/:id`, async (req, res) => {
  const { id } = req.params;
  const { _id, ...customer } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db
      .collection("user")
      .updateOne({ _id: new ObjectId(id) }, { $set: customer });

    if (result.matchedCount === 0) {
      return res.status(404).send("Customer not found");
    }

    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).send("Error updating customer");
  } finally {
    await client.close();
  }
});

// Delete a customer by ID
app.delete(`${customerAPI}/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db
      .collection("user")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Customer not found");
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).send("Error deleting customer");
  } finally {
    await client.close();
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World 1223!");
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`);
});
