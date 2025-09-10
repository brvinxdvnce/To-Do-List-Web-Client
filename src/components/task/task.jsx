import './task.css';

export const Task = (
    {
        id,
        title,
        description,
        isCompleted,
        changeTaskCompleteState,
        onDelete,
        openBuilder
    }
) => {
    return (
        <div className={'task' + (isCompleted ? ' completed' : '')}>
            <div className='task-content'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className='task-controllers'>
                <input 
                    className = 'task-checkbox'
                    type = "checkbox" 
                    checked = {isCompleted}
                    onChange = {()=> changeTaskCompleteState(id)}/>
                <button 
                    className='task-button edit'
                    onClick = {() => openBuilder(id)}
                >
                    ✏️
                </button>
                <button 
                    className='task-button delete'
                    onClick = {() => onDelete(id)}
                    >
                    🗑️
                </button>
            </div>
        </div>
    );
};