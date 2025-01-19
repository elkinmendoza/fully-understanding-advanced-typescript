import React, {useRef} from 'react'
 

type newTOdoProps = {
    onAddTodo:(text:string) => void,
}


export const NewTodo:React.FC <newTOdoProps>= props => {

    const TexInputRef = useRef<HTMLInputElement>(null)
 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText= TexInputRef.current!.value;
        props.onAddTodo(enteredText)
    };

return (
    <form onSubmit={handleSubmit}>
        <div>NewTodo</div>
        <input
            type="text"
            // value={todo}
            ref={TexInputRef}
            // onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter new todo"
        />
        <button type="submit">Add Todo</button>
    </form>
);
  
}

