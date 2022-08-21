import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import ClientList from './components/Client.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import UserProjectList from './components/UserProjectList.js'
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom' //npm install react-router-dom
import axios from 'axios'  //npm install axios

const NotFound = () => {
    var {pathname} = useLocation()

    return (
        <div>
            Page "{pathname}" not found
        </div>
    )
}

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todoes': []
        }
    }

    componentDidMount(){
        axios
            .get('http://127.0.0.1:8000/api/user/')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/filters/project/')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/filters/todo/')
            .then(response => {
                const todoes = response.data
                this.setState(
                    {
                        'todoes': todoes
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
                <BrowserRouter>
                    <nav>
                        <li> <Link to='/'>Users</Link></li>
                        <li> <Link to='/project'>Projects</Link></li>
                        <li> <Link to='/todo'>Notes</Link></li>
                     </nav>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/> } />
                        <Route exact path='/project' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todoes={this.state.todoes} /> }  />
                        <Route path='/users'>
                            <Route index element={<ClientList clients={this.state.users} />} />
                            <Route path=':usersId' element={<UserProjectList projects={this.state.projects} /> } />
                        </Route>
                            <Route path='*' element={<NotFound />} />


                    </Routes>
                 </BrowserRouter>

            </div>
        )
    }
}

export default App;
