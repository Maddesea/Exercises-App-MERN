import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav className = 'Header-nav'>
            <Link className = 'navLink' to="/"> Home</Link>
            <Link className = 'navLink' to="/create"> Add</Link>
            <Link className = 'navLink' to="/edit"> Edit</Link>
        </nav>
    )
} 

export default Navigation; // export Navigation component to be used in other files in project 