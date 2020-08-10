const axios = require('axios');
const key = 'e67KbfVEPqyWdlCJVqIsr9fNQar9ai05';

const searchPhotos = (queryFields) => {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${queryFields}`)
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

const searchPhotoById = (id) => {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=${key}`)
      .then(res => resolve(res.data))
      .catch(reject);
  });
};


module.exports = {
  searchPhotos,
  searchPhotoById
};
