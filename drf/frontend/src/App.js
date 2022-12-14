import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import ClientList from './components/Client.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import UserProjectList from './components/UserProjectList.js'
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom' //npm install react-router-dom
import axios from 'axios'  //npm install axios
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'


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
            'todoes': [],
            'token': ''
        }
    }

    deleteTodo(todoId) {
        console.log(todoId)

        let headers = this.getHeaders()

        axios
            .delete(`http://127.0.0.1:8000/api-todo/todo/${todoId}`, {headers})
            .then(response => {
                this.setState({
                    'todoes': this.state.todoes.filter((todo) => todo.id != todoId)
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    deleteProject(projectId) {
        console.log(projectId)

        let headers = this.getHeaders()

        axios
            .delete(`http://127.0.0.1:8000/api-todo/project/${projectId}`, {headers})
            .then(response => {
                this.setState({
                    'projects': this.state.projects.filter((project) => project.id != projectId)
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    createProject(name, repo, user) {
    console.log(name, repo, user)

    let headers = this.getHeaders()

        axios
            .post('http://127.0.0.1:8000/api-todo/project/', {'name': name, 'repo': repo, 'user': user}, {headers})

            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    createTodo(content, project, author) {
        console.log(content, project, author)

        let headers = this.getHeaders()

        axios
            .post('http://127.0.0.1:8000/api-todo/todo/', {'content': content, 'project': project, 'author': author}, {headers})

            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })

    }

    obtainAuthToken(login, password) {
        axios
        .post('http://127.0.0.1:8000/api-auth-token/', {
            'username': login,
            'password': password
        })
            .then(response => {
                const token = response.data.token // ???????????????? token
                console.log('token:', token)
                localStorage.setItem('token', token) // ?????????????????? token
                this.setState({
                        'token': token //???????????????? ??????????????????
                }, this.getData)  // getData ???????????????? ???????????? ????????????????????
            })
            .catch(error => console.log(error))
    }

    // ???????????????? ??????????????????????
    isAuth(){
        return !!this.state.token
    }

    componentDidMount(){
        let token = localStorage.getItem('token') // ???????????????????????????? token ???? ??????????????????
        this.setState({
            'token': token
        }, this.getData)
    }

    // ???????????????????????? ????????????????????
    getHeaders(){
        if(this.isAuth()){
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getData(){
        let headers = this.getHeaders()

        axios
            .get('http://127.0.0.1:8000/api-client/user/', {headers})
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'users': [] }) // ?????????????? ???????????? ?????????? logout

            })
        axios
            .get('http://127.0.0.1:8000/api-todo/project/', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })
        axios
            .get('http://127.0.0.1:8000/api-todo/todo/', {headers})
            .then(response => {
                const todoes = response.data
                this.setState(
                    {
                        'todoes': todoes
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({ 'todoes': [] })
            })
    }

    logOut() {
        localStorage.setItem('token', '') // ???????????? ???????????? - ???????????????????? ??????????
        this.setState({
            'token': ''
        }, this.getData) // ?????????????????????? ????????????
    }

    render(){
        return(
            <div>
                <BrowserRouter>
                    <nav>
                        <li> <Link to='/'>Users</Link></li>
                        <li> <Link to='/project'>Projects</Link></li>
                         <li> <Link to='/create_project'>Create Projects</Link></li>
                        <li> <Link to='/todo'>Notes</Link></li>
                        <li> <Link to='/create_todo'>Create Todo</Link></li>
                        <li> {this.isAuth() ? <button onClick={() => this.logOut()} > logout </button> : <Link to='/login'> login </Link>} </li>
                     </nav>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/> } />
                        <Route exact path='/project' element={<ProjectList projects={this.state.projects} deleteProject={(projectId) => this.deleteProject(projectId)} />} />
                        <Route exact path='/create_project' element={<ProjectForm clients={this.state.users} createProject={(name, repo, user) => this.createProject(name, repo, user)} />} />
                        <Route exact path='/todo' element={<TodoList todoes={this.state.todoes} deleteTodo={(todoId) => this.deleteTodo(todoId)} />} />
                        <Route exact path='/create_todo' element={<TodoForm clients={this.state.users} projects={this.state.projects} createTodo={(content, project, author) => this.createTodo(content, project, author)} />} />
                        <Route exact path='/login' element={<LoginForm obtainAuthToken={(login, password) => this.obtainAuthToken(login, password)} />} />
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
