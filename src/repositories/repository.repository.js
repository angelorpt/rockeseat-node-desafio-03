let repositories = [];

const getAll = () => {
  return repositories;
};

const findById = (id) => {
  return repositories.find((repository) => repository.id === id);
};

const save = (repository) => {
  repositories.push(repository);
  return findById(repository.id);
};

const update = (repositoryData, id) => {
  let repositoriesData = getAll();
  repositories = repositoriesData.map((repository) => {
    if (repository.id === id) {
      return repositoryData;
    }
    return repository;
  });
  return findById(id);
};

const destroy = (id) => {
  const repository = findById(id);
  repositories = repositories.splice(repository, 1);
  if (!findById(id)) {
    return true;
  }
  return false;
};

const like = (id) => {
  const repository = findById(id);
  repository.likes++;
  return repository;
};

module.exports = {
  getAll,
  findById,
  save,
  update,
  destroy,
  like,
};
