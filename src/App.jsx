import { useState } from 'react'
import { Header } from './components/header/header.jsx'
import { TasksList } from './components/tasksList/tasksList.jsx';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <>
    <Header/>
    <div>
      <TasksList/>
    </div>
  </>
  );
}

export default App