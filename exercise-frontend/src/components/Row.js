import React from 'react';
import { FaRemoveFormat, FaEdit } from 'react-icons/fa';

function Exercise({ exercise, onDelete, onEdit }) { // This is a functional component that takes in an exercise, a function to delete an exercise, and a function to edit an exercise as props
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0, 10)}</td>
                <td><button className="edit" onClick={() => onEdit(exercise)}><FaEdit /></button></td>
                <td><button className="delete" onClick={() => onDelete(exercise._id)}><FaRemoveFormat /></button></td>
        </tr>
    );
}
export default Exercise;
