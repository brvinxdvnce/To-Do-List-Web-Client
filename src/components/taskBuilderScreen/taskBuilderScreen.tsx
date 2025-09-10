import React, { useState, useEffect } from 'react';
import './taskBuilderScreen.css';

export const TaskBuilderScreen = ({
    isOpen,
    closeBuilder,
    task
    }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=> {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
        else {
            setTitle('');
            setDescription('');
        }
    }, [task]);

    return (
        <div className='overlay'>
            <div className='taskBuilder'>
                <div>
                    <h2>{task?  "Edit task" : "Create task" }</h2>
                    
                    <button onClick={()=> closeBuilder(title, description)}>❌</button>
                </div>
                <label htmlFor="title" >Title:</label>
                <input 
                    type="text"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}>
                
                </input>
                <label>Description:</label>
                <input
                    type="text"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}>
                </input>
                <button onClick={() => closeBuilder(title, description)}>✅</button>
            </div>             
        </div>

    );
}