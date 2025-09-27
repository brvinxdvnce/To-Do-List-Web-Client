import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../task/task.jsx';
import { TaskBuilderScreen } from '../taskBuilderScreen/taskBuilderScreen';
import './tasksList.css';

export const TasksList = () => {

    const [tasks, setTasks] = useState([]);
    const [builderIsOpen, setBuilderState] = useState(false);
    const [editingTaskID, setEdigingTaskID] = useState(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {

        fetch("http://localhost:5292/api/ToDo")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                isInitialLoad.current = false;
            })
            .catch(console.error);


        // if (JSON.parse(localStorage.getItem('tasks')).length > 0) {
        //     setTasks(JSON.parse(localStorage.getItem('tasks')));
        // }
        // else {
        //     fetch("/data/tasks.json")
        //         .then((response) => response.json())
        //         .then((data) => setTasks(data))
        //         .catch((error) => console.error("Error fetching tasks:", error));
        //}
    }, []);

    useEffect(() => {
        if (isInitialLoad.current) {
            return;
        }

        fetch("http://localhost:5292/api/ToDo/replace_all", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tasks)
        })
            .then(res => res.json())
            .then(data => console.log("Tasks saved on server:", data))
            .catch(err => console.error("Error saving tasks:", err));

        // localStorage.setItem('tasks', JSON.stringify(tasks, null, 2));
        // console.clear();
        // console.log('Tasks saved to json:\n', localStorage.getItem('tasks')); 
    }, [tasks]); 

    const changeTaskState = (id) => {
        setTasks(tasks.map(task => 
                task.id == id
                    ? {...task, isCompleted: !task.isCompleted} 
                    : task
            )
        )        
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id != id));
    }
    
    const createTask = (id, title = "", description = "") => {
        if (title) {
            setTasks(prevTasks => [...prevTasks, { id, title, description, isCompleted: false }])
        }
    }

    const openBuilder = (
        id = tasks.length > 0? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        ) => {
        setEdigingTaskID(id);
        setBuilderState(true);
    }

    const closeBuilder = (
        title = "",
        description = ""
        ) => {
        if (tasks.find(task => task.id == editingTaskID)) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === editingTaskID
                    ? { ...task, title, description}
                    : task)
        )} else {
            createTask(editingTaskID, title, description);
            }
    
        setEdigingTaskID(null);
        setBuilderState(false);
    }

    return (
        <div className='tasks-workspace-container'>
            <button 
                className='create-button'
                onClick = {() => openBuilder()}
            >
                +
            </button>
            {
                tasks.length == 0
                ? <h2 className='tasks-list empty'>No tasks available</h2>
                : <ul className="tasks-list">
                {tasks
                    .sort((a, b) => a.isCompleted > b.isCompleted ? 1 : -1)
                    .map((task) => ( 
                    <Task
                        id = {task.id}
                        key = {task.id}
                        title = {task.title}
                        description = {task.description}
                        isCompleted = {task.isCompleted}
                        changeTaskCompleteState = {changeTaskState}
                        onDelete    = {deleteTask}
                        openBuilder = {openBuilder}
                        />
                    ))}
                </ul>
            }

            <TaskBuilderScreen
                isOpen={builderIsOpen}
                closeBuilder={closeBuilder}
                task = {tasks.find(task => task.id == editingTaskID)}
            ></TaskBuilderScreen>
        </div>
    );
};