import mongoose from 'mongoose';

interface ITheater {
  name: string;
  size: number;
}

interface TheaterModelInterface extends mongoose.Model<TheaterDoc>{
  build(attr: ITheater): TheaterDoc;
}

interface TheaterDoc extends mongoose.Document{
  name: string;
  size: number;
}

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  size: {
    type: Number,
    required: true,
    unique: true
  }
});

theaterSchema.statics.build = (attr: ITheater) => {
  return new Theater(attr);
};

const Theater = mongoose.model<any, TheaterModelInterface>('Theater', theaterSchema);


export { Theater }
