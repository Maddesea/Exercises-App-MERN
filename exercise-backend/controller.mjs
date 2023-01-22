import 'dotenv/config';
import express from 'express';
import * as exercises from './model.mjs';

// Middleware
const PORT = process.env.PORT; // 3000 by default in .env file (see .env.example)
const app = express(); // Create an Express application. This is the main object of the application.
app.use(express.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

app.post('/exercises', (req, res) => { // POST: Create a new exercise in the database collection exercises.
   exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date) // Call the createExercise function from model.mjs.
       .then(exercise => { // If the exercise is created successfully, return the exercise.
        res.status(201).json(exercise); // 201: Created (The request has been fulfilled and resulted in a new resource being created.)
    })  
        .catch(error => {console.error(error); // If the exercise is not created successfully, return the error.
        res.status(500).json({ Error: 'Request failed' });  // 500: Internal Server Error (Request failed)
    }); // 500: Internal Server Error (Request failed)
});

app.get('/exercises/:id', (req, res) => { // GET: Get an exercise from the database collection exercises.
   const exerciseId = req.params.id; // Get the exercise id from the request parameters.
   exercises.findExerciseById(exerciseId) // Call the findExerciseById function from model.mjs.
   .then(exercise => {  // If the exercise is found successfully, return the exercise.
    if (exercise !== null) { // If the exercise is not null, return the exercise.
    res.json(exercise); // Return the exercise.
    } else { // If the exercise is null, return the error.
    res.status(404).json({ Error: 'Resource not found' }); // 404: Not Found (Resource not found)
    }}) 
    .catch(error => {console.error(error); // If the exercise is not found successfully, return the error.
        res.status(500).json({ Error: 'Request failed' });
    });
});

app.get('/exercises', (_, res) => { // GET: Get all exercises from the database collection exercises.
    let filter = {}; exercises.findExercises(filter, '', 0) // Call the findExercises function from model.mjs.
    .then(exercises => {res.send(exercises);}) // If the exercises are found successfully, return the exercises.
    .catch(error => {console.error(error); // If the exercises are not found successfully, return the error.
    res.send({ Error: 'Request failed' }); // 500: Internal Server Error (Request failed)
    });
});

app.put('/exercises/:_id', (req, res) => { // PUT: Update an exercise in the database collection exercises.     
   exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => { // If the exercise is updated successfully, return the number of updated exercises.
    if (numUpdated === 1) {res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
    } else { // If the exercise is not updated successfully, return the error.
    res.status(404).json({ Error: 'Resource not found' });} // 404: Not Found (Resource not found)
    }) .catch(error => {console.error(error); res.status(500).json({ Error: 'Request failed' }); // 500: Internal Server Error (Request failed)
    });
});

app.delete('/exercises/:id', (req, res) => {console.log(req.params.id); // DELETE: Delete an exercise from the database collection exercises.
   exercises.deleteById(req.params.id) // Call the deleteById function from model.mjs.
   .then(deletedCount =>  { // If the exercise is deleted successfully, return the number of deleted exercises.
    {if (deletedCount === 1) {res.status(204).end(); // 204: No Content (The server successfully processed the request and is not returning any content.)
    } else 
    {res.status(404).json({ Error: 'Resource not found' });} // 404: Not Found (Resource not found)
    }}) 
    .catch(error => {console.error(error); 
        res.status(500).json({ Error: 'Request failed' }); // 500: Internal Server Error (Request failed)
    });
});

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
});