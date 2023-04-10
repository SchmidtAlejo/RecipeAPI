var express = require("express");
var router = express.Router();
const controller = require("../controllers/Comments");
const { decodeToken } = require("../../middleware/TokenMiddleware");

router.post("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.addComment(req.id, req.body));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/:id", decodeToken, async (req, res) => {
  try {
    res.json(await controller.removeComment(req.id, req.params.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.put("/:id", decodeToken, async (req, res) => {
    try {
      res.json(await controller.updateComment(req.id, req.params.id, req.body.text));
    } catch (error) {
      res.status(401).send(error.message);
    }
  });

router.get("/:id", decodeToken, async (req, res) => {
  try {
    res.json(await controller.getComments(req.params.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
