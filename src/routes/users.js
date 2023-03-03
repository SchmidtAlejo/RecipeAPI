var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");
const { decodeToken } = require("./../../middleware/TokenMiddleware");

router.get("/allusers", async (req, res) => {
  try {
    res.json(await controller.getUsers());
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.getUserById(req.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await controller.addUser(req.body));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.put("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.updateUserPassword(req.id, req.body));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await controller.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = controller.generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
