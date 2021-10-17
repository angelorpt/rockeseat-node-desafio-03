const repositoryRepository = require("../repositories/repository.repository");
const { v4: uuidv4, validate } = require("uuid");

const checksExistsRepository = (req, res, next) => {
  const { id } = req.params;
  const repositories = repositoryRepository.getAll();
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
  const repositories = repositoryRepository.getAll();
  return res.json(repositories);
};

const findById = (req, res) => {
  const { id } = req.params;
  return res.json(repositoryRepository.findById(id));
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

  const repository = repositoryRepository.save(repositoryNew);

  return res.status(201).json(repository);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repository = repositoryRepository.findById(id);

  const repositoryToUpdate = {
    ...repository,
    title,
    url,
    techs,
  };

  const repositoryUpdated = repositoryRepository.update(repositoryToUpdate, id);

  return res.json(repositoryUpdated);
};

const destroy = (req, res) => {
  const { id } = req.params;
  repositoryRepository.destroy(id);
  return res.status(204).send();
};

const like = (req, res) => {
  const { id } = req.params;
  const respository = repositoryRepository.like(id);
  return res.json({ likes: respository.likes });
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
