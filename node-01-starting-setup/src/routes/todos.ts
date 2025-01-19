
import  {Router}  from "express";
import { createTodo,getTodos,updateTodo,deleteTodo } from "../controllers/todos";


const router = Router()

router.get('/data', getTodos);

router.post('/data', createTodo);

router.put('/update', (req, res) => {
    res.send('Data updated');
});

router.delete('/data/:id', deleteTodo);

router.patch('/data/:id',updateTodo );

export default router;
