import {moviesRouter} from './routes';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as http from 'http'

const app = express();

app.use(bodyParser.json());

const LOCAL_DATABASE = 'mongodb://database/mean-docker';
// Local port.
const LOCAL_PORT = 4201;

app.set('port', LOCAL_PORT);

app.use(moviesRouter);

const server = http.createServer(app);

server.listen(LOCAL_PORT, () => console.log('API running on localhost:4201'))

mongoose.connect(LOCAL_DATABASE,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }, () => {
    mongoose.connection.db.dropDatabase().then(() =>
      console.log('db reinitialized')
    )
      .catch(() => console.log('error occurred'))
    console.log('database connection done');
  });



const errorHandler = ({res, reason, message, code}: { res: any, reason: any, message: any, code: any }) => {
  console.log('Error: ' + reason);
  res.status(code || 500).json({error: message});
};


