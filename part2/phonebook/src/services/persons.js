import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
}

const create = newPerson => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data);
}

const update = (id, newPersonData) => {
  return axios
    .put(`${baseUrl}/${id}`, newPersonData)
    .then(response => response.data);
}

const personsService = {getAll, create, update};
export default personsService