import axios from "axios";

const baseUrl = '/api/persons';

const handleError = (error) => {
  if (error.response.data.error) {
    throw Error(error.response.data.error);
  }

  throw error;
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
};

const create = newPerson => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
    .catch(error => handleError(error));
};

const update = (id, newPersonData) => {
  return axios
    .put(`${baseUrl}/${id}`, newPersonData)
    .then(response => response.data)
    .catch(error => handleError(error));
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => handleError(error));
}

const personsService = {getAll, create, update, deletePerson};
export default personsService