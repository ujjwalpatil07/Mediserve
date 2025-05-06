import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  ownedBy: {
    type: String,
    required: true,
  },
  since: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  link: {
    type: String,
    required: true,
  },

  contact : {
    type : String,
    // required : true
  }, 

  email : {
    type : String,

  }
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
