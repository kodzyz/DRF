import React from 'react'

class ProjectForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            'name': '',
            'repo': '',
            'user': []
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleProjectSelect(event) {
        if (!event.target.selectedOptions) {
            this.state({
                'user': []
            })
            return;
        }

        let user = []

        for(let option of event.target.selectedOptions) {
            user.push(option.value)
        }

        this.setState({
            'user': user
        })
    }

    handleSubmit(event) {
        //this.props.obtainAuthToken(this.state.login, this.state.password)
        this.props.createProject(this.state.name, this.state.repo, this.state.user)
        event.preventDefault()
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="repo" placeholder="repo" value={this.state.repo} onChange={(event) => this.handleChange(event)} />
                    <select multiple onChange={(event) => this.handleProjectSelect(event)}>
                        {this.props.clients.map((client) => <option value={client.id}>{client.email}</option> )}
                    </select>
                    <input type="submit" value="Create" />

                </form>
            </div>
        )
    }
}
export default ProjectForm;