import * as express from 'express';
import cors from 'cors';
import {Movie} from './model/movie';
import {Theater} from './model/theater';

export const router = express.Router();

// allow cross origin
router.use(cors());

router.get('/api/status', (req: express.Request, res: express.Response) => {
  console.log('status OK');
  res.status(200).json({status: 'UP'});
});

router.post('/api/addMovie', [], async (req: express.Request, res: express.Response) => {
  const { title, hallNumber, timeSlot } = req.body;
  const hallObj = {hallNumber, timeSlot};
  const movie = Movie.build({title, hallObj});
  await movie.save()
    .then((movieData) => {
      res.status(201).send(movieData);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send('bad request');
    });
  });

router.post('/api/deleteEntry/:id', [], async (req: express.Request, res: express.Response) => {
  await Movie.findByIdAndRemove(req.body)
    .exec()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    })
});

router.post('/api/updateEntry', [], async (req: express.Request, res: express.Response) => {
  const {_id, hallNumber, timeSlot} = req.body;
  await Movie.findByIdAndUpdate({_id},  {hallObj: {hallNumber, timeSlot}})
    .exec()
    .then((response) => {
        res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    })
});

router.get('/api/getMovies', [], async (req: express.Request, res: express.Response) => {
  await Movie.find({}, (err, movies) => {
    const moviesMap: any[] = [];
    movies.forEach(movie => {
      moviesMap.push(movie);
      });
    res.status(200).send(moviesMap);
    });
  });

router.post('/api/setTheater', [], async (req: express.Request, res: express.Response) => {
  const {name, size} = req.body;
  const theater = Theater.build({name, size});
  await theater.save()
    .then((theaterObj) => {
      res.status(201).send(theaterObj);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send('Error while creating Theater');
    });
});

router.get('/api/getTheater', [], async (req: express.Request, res: express.Response) => {
  await Theater.find({}, (err, theater) => {
    res.status(200).send(theater);
  });
});

export { router as moviesRouter };
