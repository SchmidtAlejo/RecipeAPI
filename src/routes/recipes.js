var express = require("express");
var router = express.Router();
const controller = require("../controllers/recipes");
const { decodeToken } = require("./../../middleware/TokenMiddleware");

router.get("/allIngridients", decodeToken, async (req, res) => {
  try {
    res.json(await controller.getIngridients());
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/", decodeToken, async (req, res) => {
  try {
    if(req.query.ingridient){
      res.json(await controller.getRecipes(req.query.ingridient));
    }
    if(req.query.ingridientSearch){
      res.json(await controller.getIngridients(req.query.ingridientSearch));
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/:id", decodeToken, async (req, res) => {
  try {
    res.json(await controller.getRecipeDetails(req.params.id));
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
