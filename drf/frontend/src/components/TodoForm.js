import React from 'react'

class TodoForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            'content': '',
            'project': [],
            'author': []

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
                'project': [],

            })
            return;
        }

        let project = []


        for(let option of event.target.selectedOptions) {
            project.push(option.value)

        }

        this.setState({
            'project': project,

        })
    }

    handleTodoSelect1(event) {
        if (!event.target.selectedOptions) {
            this.state({
                'author': []
            })
            return;
        }

        let author = []

        for(let option of event.target.selectedOptions) {
            author.push(option.value)
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