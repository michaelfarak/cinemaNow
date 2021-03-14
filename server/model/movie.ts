import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IMovie {
  title: string;
  hallObj: object;
}

interface MovieModelInterface extends mongoose.Model<MovieDoc>{
  build(attr: IMovie): MovieDoc;
}

interface MovieDoc extends mongoose.Document{
  title: string;
  hallObj: object;
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hallObj: {
    hallNumber: {
      type: Number,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    type: Object,
    required: true,
    unique: true
  }
});

movieSchema.plugin(uniqueValidator);

movieSchema.statics.build = (attr: IMovie) => {
  return new Movie(attr);
};

const Movie = mongoose.model<any, MovieModelInterface>('Movie', movieSchema);


export { Movie };
