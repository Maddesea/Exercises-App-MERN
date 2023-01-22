import React from 'react';
import Exercise from './Row';

function ExerciseList({ exercises, onDelete, onEdit }) { // This is a functional component that takes in an array of exercises, a function to delete an exercise, and a function to edit an exercise as props
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise} onDelete = {onDelete} onEdit = {onEdit} key={i} />)}
            </tbody>
        </table>
    ); // This returns a table with a header row and a body row. The body row is mapped to the exercises array and each exercise is passed to the Exercise component as a prop. The Exercise component is imported from the Row.js file. The onDelete and onEdit functions are also passed as props to the Exercise component.
} // This component maps over the array of exercises and passes each exercise to the Exercise component as a prop. It also passes the onDelete and onEdit functions as props to the Exercise component

export default ExerciseList; // This exports the ExerciseList component
