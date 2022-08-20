import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import ClientList from './components/Client.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom' //npm install react-router-dom
import axios from 'axios'  //npm install axios

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
                    <Routes>
                        <Route exact path='/' element={<ClientList clients={this.state.users} />} />
                        <Route exact path='/project' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todoes={this.state.todoes} />} />} />
                    </Routes>
                 </BrowserRouter>

            </div>
        )
    }
}

export default App;
