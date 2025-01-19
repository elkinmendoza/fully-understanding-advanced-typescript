import React from 'react'

interface TodoListProps {
    items: { id: string; text: string; }[];
    onDeleteTodo:(id:string)=>void

}


const TodoList: React.FC<TodoListProps> = props => {

    return (
        <div>
            {props.items.map(({id, text},key) => (
                <div key={key}>
                    <span>{text}</span>
                    <button onClick={props.onDeleteTodo.bind(null,id)}>Delete</button>
                </div>
            ))}
        </div>
    );

}

export default TodoList