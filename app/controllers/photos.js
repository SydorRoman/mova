const giphy = require('../modules/giphy');
const apiHelper = require('../helpers/api');
const db = require('../db/db');
const getError = require('../helpers/error-maker');
const api = require('../helpers/api');

const getPhotos = async (req, res) => {
  const { query: { q } } = req;

  const history = db.history.list();
  const exist = history.find(({ name }) => name === q);
  if (!exist) db.history.create({name: q});

  const liked = db.liked.list();
  const photos = await giphy.searchPhotos(q);

  photos.data.map((photo) => {
    if(liked.find(({data}) => data.id === photo.id)) {
      photo.liked = true;
    }
  });
  return apiHelper.builder(res, photos);
}

const getLikedphotos = (req, res) => {
  const liked = db.liked.list();
  return apiHelper.builder(res, liked);
}

const getSearchHistory = (req, res) => {
  const history = db.history.list();
  // const unique = [...new Set(history.map(item => item.name))];
  return apiHelper.builder(res, history);
}

const likePhoto = async (req, res) => {
  const { id } = req.params;
  if (!id) return apiHelper.builder(res, 'Id id required.');
  const list = await db.liked.list();
  const liked = list.find(({ data }) => data.id === id);
  if (liked) {
    db.liked.delete(liked.id);
    return apiHelper.builder(res, 200);
  }
  const photo = await giphy.searchPhotoById(id);
  const saved = await db.liked.create(photo);
  return apiHelper.builder(res, saved);
}

module.exports = {
  getPhotos,
  getLikedphotos,
  getSearchHistory,
  likePhoto
}