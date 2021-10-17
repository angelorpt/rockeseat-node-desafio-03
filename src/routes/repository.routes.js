const express = require("express");
const router = express.Router();
const repositoryController = require("../controllers/repository.controller");
const { checksExistsRepository, validateId } = repositoryController;

router.get("/", repositoryController.getAll);
router.post("/", repositoryController.save);

router.get(
  "/:id",
  [checksExistsRepository, validateId],
  repositoryController.findById
);
router.put(
  "/:id",
  [checksExistsRepository, validateId],
  repositoryController.update
);
router.delete(
  "/:id",
  [checksExistsRepository, validateId],
  repositoryController.destroy
);
router.post(
  "/:id/like",
  [checksExistsRepository, validateId],
  repositoryController.like
);

module.exports = router;
