import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';

export const EditExercise = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name); // name is the state variable, setName is the function to update the state variable
    const [reps, setReps] = useState(exerciseToEdit.reps); // reps is the state variable, setReps is the function to update the state variable
    const [weight, setWeight] = useState(exerciseToEdit.weight); // weight is the state variable, setWeight is the function to update the state variable
    const [unit, setUnit] = useState(exerciseToEdit.unit); // unit is the state variable, setUnit is the function to update the state variable
    const [date, setDate] = useState(exerciseToEdit.date); // date is the state variable, setDate is the function to update the state variable
    
    const history = useHistory(); // history is the state variable, setHistory is the function to update the state variable

    const editExercise = async () => {
        const exercisesToBeEdited = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(exercisesToBeEdited),
            headers: {'Content-Type': 'application/json',}, // <-- This is required for the server to know that the body is JSON data.
        });

        if (response.status === 200){ // <-- If the response status is 200, then the exercise was updated successfully.
            alert("Successfully edited the exercise"); // <-- This is a popup message to the user that the exercise was successfully edited.
        } else { 
            alert(`Failed to edit exercise, status code = ${response.status}`); // Response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        }
        history.push("/"); // <-- Take user back to home page. When home page loads, it will pull all exercises from database
    };

    return (
        <div>
            <div>
            <h2>Edit Exercise</h2>
            <p>You are more than welcome to edit exercises in this section of the application</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Save</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={reps}
                                    onChange={e => setReps(e.target.value)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)} />
                            </td>
                            <td>
                                <select
                                    value={unit}
                                    onChange={e => setUnit(e.target.value)} >
                                    <option value="lbs">lbs</option>
                                    <option value="kg">kg</option>
                                    <option value="miles">miles</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    size="10"
                                    value={date}
                                    onChange={e => setDate(e.target.value)} />
                            </td>
                            <td><button onClick={editExercise}> Edit Exercise <FaEdit /> </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default EditExercise;
