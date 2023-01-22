import mongoose from 'mongoose'; // Import mongoose and connect to the database using the connection string from the environment variable
import 'dotenv/config'; // Load environment variables from .env file into process.env object 

const dbURL = process.env.MONGODB_CONNECT_STRING; // Get the connection string from the environment variable

mongoose.connect( // Connect to the database using the connection string from the environment variable MONGODB_CONNECT_STRING 
    dbURL, { useNewUrlParser: true, useUnifiedTopology: true }
);
const exercise_db = mongoose.connection; // Get the connection object. This is used to check if the connection is open or not

// Confirm that the database has connected and print a message in the console window if it has connected successfully or not.
exercise_db.once("open", (err) => { // Once the connection is open, execute this callback function.
    if(err){ // If there is an error, print it to the console.
        res.status(500).json({ error: '500:Connection to the server failed.' }); // 500: Internal Server Error (Connection to the server failed.)
    } else  { // If the connection is successful, print a message in the console.
        console.log('Successfully connected to MongoDB Exercise collection using Mongoose!!!'); // Successfully connected to MongoDB Exercise collection using Mongoose!!!
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
    name: {
        type: String,  // The type of the property
        required: true,  // This field is required
        minlength: 1 // The minimum length of the string.
    },
    reps: {
        type: Number,  // The type of the property
        required: true, // This field is required to be filled out.
        min: 0 // The minimum value of the number (0 or more).
    },
    weight: {
        type: Number,
        required: true, // This field is required to be filled out.
        min: 0 // The minimum value of the number (0 or more).
    },
    unit: {
        type: String,
        required: true, // This field is required to be filled out.
        default: 'lbs' // The field must be one of the following: "lbs", "kgs", "mile".
    },
    date: {
        type: Date,  // The date type is a special type in mongoose. It is a wrapper around the Date object in JavaScript.
        required: true, // This field is required to be filled out.
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema); // Compile the model from the schema. This must be done after defining the schema.

/**
  * Create a exercise
  * @param {String} name  The name of the exercise
  * @param {Number} reps  The number of reps
  * @param {Number} weight The weight of the exercise
  * @param {String} unit The unit of the weight. Must be one of the following: "lbs", "kgs", "mile"
  * @param {Date} date  The date of the exercise
  * @returns A promise. Resolves to the JSON object for the document created by calling save
  */
const createExercise = async (name, reps, weight, unit, date) => {
     // Call the constructor to create an instance of the model class Exercise
    const exercise = Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
     // Call save to persist this object as a document in MongoDB
    return exercise.save();}

    /**
  * Retrieve exercises based on the filter, projection and limit parameters
  * @param {Object} filter 
  * @param {String} projection Which properties of the document we want back
  * @param {Number} limit Limit number of documents in the result
  * @returns 
  */
const findExercises = async (filter, projection, limit) => {const query = Exercise.find(filter)
    .select(projection)
    .limit(limit);
    return query.exec();
}
/**
  * This function is used to delete all documents in the collection
  * This is used to check if the exercise exists before updating or deleting it
  * @param {String} _id 
  * @returns 
  */
const findExerciseById = async (_id) => {const query = Exercise.findById(_id); return query.exec();} // This function is used to check if the exercise exists before updating or deleting it

/**
  * This function is used to update the exercise with the provided id value with the provided values for the properties of the exercise document
  * @param {String} _id // The id of the exercise to update
  * @param {String} name  // The new value for the name property
  * @param {Number} reps  // The new value for the reps property
  * @param {Number} weight // The new value for the weight property
  * @param {String} unit  // The new value for the unit property
  * @param {Date} date // The new value for the date property
  * @returns // This is a promise. Resolves to the updated document
  */

const replaceExercise = async (_id, name, reps, weight, unit, date) => {const result = await Exercise.replaceOne({ _id: _id },
    { name: name, reps: reps, weight: weight, unit: unit, date: date }); // Return the count of updated document. Since we called replaceOne, this will be either 0 or 1.
    return result.modifiedCount;} // This is a promise. Resolves to the count of modified documents. Since we called replaceOne, this will be either 0 or 1.

    /**
  * Delete the exercise with provided id value
  * @param {String} _id 
  * @returns A promise. Resolves to the count of deleted documents
  */
const deleteById = async (_id) => {const result = await Exercise.deleteOne({ _id: _id }); // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
     return result.deletedCount;}  // This is a promise. Resolves to the count of deleted documents. Since we called deleteOne, this will be either 0 or 1.}

export { createExercise, findExerciseById, findExercises, replaceExercise, deleteById };