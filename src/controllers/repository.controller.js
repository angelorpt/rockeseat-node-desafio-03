const repositoryRespository = require("../repositories/repository.repository");
const { v4: uuidv4, validate } = require("uuid");

const checksExistsRepository = (req, res, next) => {
  const { id } = req.params;
  const repositories = repositoryRespository.getAll();
  let exists = repositories.some((repository) => repository.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Repository not found" });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) {
    return res.status(400).json({ error: "ID not valid" });
  }
  next();
};

const getAll = (_, res) => {
  const repositories = repositoryRespository.getAll();
  return res.json(repositories);
};

const findById = (req, res) => {
  const { id } = req;
  return res.json(repositoryRespository.findById(id));
};

const save = (req, res) => {
  const { title, url, techs } = req.body;

  const repositoryNew = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0,
  };

  const repository = repositoryRespository.save(repositoryNew);

  return res.status(201).json(repository);
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedRepository = req.body;

  const repositoryNew = {
    ...repositories[repositoryIndex],
    ...updatedRepository,
  };

  repositories[repositoryIndex] = repository;

  return res.json(repository);
};

const destroy = (req, res) => {
  const { id } = req.params;
  repositoryRespository.destroy(id);
  return res.status(204).send();
};

const like = (req, res) => {
  const { id } = req.params;
  repositoryRespository.like(id);
  return res.json("likes");
};

module.exports = {
  checksExistsRepository,
  validateId,
  getAll,
  findById,
  save,
  update,
  destroy,
  like,
};
