const express = require("express");
const router = express.Router();
const repositoryController = require("../controllers/repository.controller");
const { checksExistsRepository, validateId } = repositoryController;

router.get("/", repositoryController.getAll);
router.post("/", repositoryController.save);

router.use(validateId);
router.use(checksExistsRepository);
router.get("/:id", repositoryController.findById);
router.put("/:id", repositoryController.update);
router.delete("/:id", repositoryController.destroy);
router.post("/:id/like", repositoryController.like);

module.exports = router;
