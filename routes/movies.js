const express = require('express');
const MoviesService = require('../services/movies');

const moviesApi = (app) => {
  const router = express.Router();
  app.use("/api/movies", router);

  const movieService = new MoviesService();

  router.get("/", async function(req, res, next) {
    const { tags } = req.query;
    try {
      const movies = await Promise.resolve(movieService.getMovies({ tags }));
      res.status(200).json({
        data: movies,
        message: 'Movies listed'
      });
    }catch(err){
      next(err);
    }
  });

  router.get("/:movieId", async function(req, res, next) {
    const { movieId } = req.params;
    try {
      const movie = await movieService.getMovie({ movieId });
      res.status(200).json({
        data: movie,
        message: 'Movie retrieved'
      });
    }catch(err){
      next(err);
    }
  });

  router.post("/", async function(req, res, next) {

    const { body: movie } = req;

    try {
      const createMovieId = await movieService.createMovie({ movie });
      res.status(201).json({
        data: createMovieId,
        message: 'Movie created'
      });
    }catch(err){
      next(err);
    }
  });

  router.put("/:movieId", async function(req, res, next) {

    const { body: movie } = req;
    const { movieId } = req.params;

    try {
      const updateMovieId = await movieService.updateMovie({ movieId, movie });
      res.status(200).json({
        data: updateMovieId,
        message: 'Movie updated'
      });
    }catch(err){
      next(err);
    }
  });

  router.delete("/:movieId", async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deleteMovieId = await movieService.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: 'Movie Deleted'
      });
    }catch(err){
      next(err);
    }
  });

}

module.exports = moviesApi;