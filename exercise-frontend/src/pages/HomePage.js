import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExerciseList from '../components/Table';

function HomePage({ setExerciseToEdit }) {
    
    const [exercises, setExercises] = useState([]); // state variable to hold exercises array from API call 
    const history = useHistory(); // history object to redirect user to edit page after exercise is deleted
    const onDeleteExercise = async _id => { // function to delete exercise from database and update exercises array
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'}); // delete exercise from database
        if (response.status === 204){ // if exercise was deleted successfully, alert user and update exercises array
            alert("Successfully deleted the exercise");
            setExercises(exercises.filter(key => key._id !== _id));
        } else { // if exercise was not deleted successfully, alert user and log error to console
            alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
            console.log(response); // log response to console for debugging purposes
        }
    };
    const onEdit = exercise => { // function to set exercise to edit in App.js state variable
        setExerciseToEdit(exercise); // set exercise to edit in App.js state variable to exercise passed in
        history.push("/edit"); // redirect user to edit page to edit exercise passed in 
    };
    const loadExercises = async () => { // function to load exercises from database
        const response = await fetch('/exercises'); // get all exercises from database 
        const exercises = await response.json(); // convert response to JSON  which is an array of exercises
        setExercises(exercises); // set exercises array to exercises from database using setExercises function
    } 
    useEffect( () => {loadExercises();}, []); // call loadExercises function when component loads and when exercises array changes  
    return (
        <>
            <h2>List of Exercises</h2>
            <div className = "App-table">
            <h2>The Home Of Exercises!</h2>
            <p>This is a Full Stack MERN Application that tracks your exercises here as you input them using the provided interface. </p>
            <ExerciseList exercises={exercises} onDelete={onDeleteExercise} onEdit = {onEdit}></ExerciseList>
            </div>
            <div>
                <Link to="/create">Add an exercise</Link>
            </div>
            
        </>
    );
}
export default HomePage;
