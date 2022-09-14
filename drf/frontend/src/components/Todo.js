const TodoItem = ({todo, deleteTodo}) => {
    return(
        <tr>
            <td>
                {todo.content}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.author}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id) }>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todoes, deleteTodo}) => {
    return(
        <table>
            <th>
                Content
            </th>
            <th>
                Todo to project
            </th>
            <th>
                Todo author
            </th>
            {todoes.map((todo) => < TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodoList