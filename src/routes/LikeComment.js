var express = require("express");
var router = express.Router();
const controller = require("../controllers/LikeComment");
const { decodeToken } = require("./../../middleware/TokenMiddleware");

router.post("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.addLike(req.id, req.body.commentId));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/:id", decodeToken, async (req, res) => {
  try {
    res.json(await controller.removeLike(req.id, req.params.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("a");
    res.json(await controller.getLikes(req.params.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
