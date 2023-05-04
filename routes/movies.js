const express = require('express');
const MoviesService = require('../services/movies');
const { movieIdSchema, createMovieSchema, updateMovieSchema  } = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

const moviesApi = (app) => {
  const router = express.Router();
  app.use("/api/movies", router);

  const movieService = new MoviesService();

  router.get("/", async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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

  router.get("/:movieId", validationHandler( {movieId: movieIdSchema}, 'params' ),  async function(req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

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

  router.post("/", validationHandler(createMovieSchema),async function(req, res, next) {

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

  router.put("/:movieId", validationHandler( {movieId: movieIdSchema} ,validationHandler(updateMovieSchema),async function(req, res, next) {

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
  }));

  router.delete("/:movieId", validationHandler( {movieId: movieIdSchema}, 'params' ),async function(req, res, next) {
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