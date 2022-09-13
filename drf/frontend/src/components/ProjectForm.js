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

    handleSubmit(event) {
        //this.props.obtainAuthToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="repo" placeholder="repo" value={this.state.repo} onChange={(event) => this.handleChange(event)} />
                    <select multiple>
                        {this.props.clients.map((client) => <option value={client.id}>{client.email}</option> )}
                    </select>
                    <input type="submit" value="Create" />

                </form>
            </div>
        )
    }
}
export default ProjectForm;