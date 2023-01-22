import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FaSave } from 'react-icons/fa';

export const CreateExercise = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState(''); 
    const [weight, setWeight] = useState('');  
    const [unit, setUnit] = useState('lbs'); // default value is lbs
    const [date, setDate] = useState(''); // default value is today's date in YYYY-MM-DD format

    const history = useHistory(); // This is a hook that allows us to redirect the user to a different page after they submit the form.

    const addExercise = async () => { // <-- This is an async function. Async functions always return a promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
        const newExercise = {name, reps, weight, unit, date}; // <-- This is the same as {name: name, reps: reps, weight: weight, unit: unit, date: date}
        const response = await fetch(`/exercises`, { // <-- This is the same as /exercises/ + exerciseToEdit._id
            method: 'POST', // <-- This is the same as PUT
            body: JSON.stringify(newExercise), // <-- This is the same as {name: name, reps: reps, weight: weight, unit: unit, date: date}
            headers: { 'Content-Type': 'application/json'} // <-- This is the same as { 'Content-Type': 'application/json', }
            });
        if (response.status === 201){ // Response status code 201 means created successfully
            alert("Successfully added the exercise"); 
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`); // Response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        }
        history.push("/"); // <-- Take user back to home page. When home page loads, it will pull all exercises from database
    };

    return (
        <div>
            <h1>Create Exercises</h1>
            <h2>The Exercise Creator (you're really getting in shape!)</h2>
            <p>Please create as many exercises as you desire here!</p>
            <input
                type="text"
                placeholder="Exercise Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Number of Repetitions"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight of Exercise"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select onChange={e => setUnit(e.target.value)} >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
                <option value="miles">miles</option>
            </select>
            <input
                type="date"
                size="10"
                placeholder="01-01-2020"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <button> <FaSave onClick={addExercise} /> </button> Add Exercise  
        </div>
    );
}
export default CreateExercise;
