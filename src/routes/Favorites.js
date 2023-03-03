var express = require("express");
var router = express.Router();
const controller = require("../controllers/Favorites");
const { decodeToken } = require("./../../middleware/TokenMiddleware");

router.post("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.addRecipeFavorites(req.id, req.body.recipeId));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.removeRecipeFavorites(req.id, req.body.recipeId));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get("/", decodeToken, async (req, res) => {
  try {
    res.json(await controller.getFavorites(req.id));
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
