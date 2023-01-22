import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercise from './pages/CreatePage';
import EditExercise from './pages/EditPage';
import Navigation from './components/Navigation';


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState(); 

  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
          <h1>Exercise Collection & Tracking Application</h1>
          <p>Application that assists in fitness. Please add/create exercises and then edit them as you see fit!</p>
        </header>
        <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create">  
            <CreateExercise />
          </Route>
          <Route path="/edit"> 
            <EditExercise exerciseToEdit={exerciseToEdit} />
          </Route>
          </main>
          <footer> &copy; 2022 Sean Madden</footer>
      </Router>
    </div>
  );
}

export default App;
