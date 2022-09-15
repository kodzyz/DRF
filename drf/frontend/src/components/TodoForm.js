import React from 'react'

class TodoForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            'content': '',
            'project': 0,
            'author': 0

        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTodoSelect(event) {
        if (!event.target.selectedOptions) {
            this.state({
                'project': 0,
            })
            return;
        }

        let project = 0

        for(let option of event.target.selectedOptions) {
            project = option.value
        }

        this.setState({
            'project': project,
        })
    }

    handleTodoSelect1(event) {
        if (!event.target.selectedOptions) {
            this.state({
                'author': 0
            })
            return;
        }

        let author = 0

        for(let option of event.target.selectedOptions) {
            author = option.value
        }

        this.setState({
            'author': author
        })
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.content, this.state.project, this.state.author)
        event.preventDefault()
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="content" placeholder="content" value={this.state.content} onChange={(event) => this.handleChange(event)} />
                    <select multiple onChange={(event) => this.handleTodoSelect(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option> )}
                    </select>
                    <select multiple onChange={(event) => this.handleTodoSelect1(event)}>
                        {this.props.clients.map((client) => <option value={client.id}>{client.email}</option> )}
                    </select>

                    <input type="submit" value="Create" />

                </form>
            </div>
        )
    }
}
export default TodoForm;