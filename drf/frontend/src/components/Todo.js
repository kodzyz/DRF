const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todoes}) => {
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
            {todoes.map((todo) => < TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList