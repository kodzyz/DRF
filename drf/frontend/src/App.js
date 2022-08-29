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

    obtainAuthToken(login, password) {
        axios
        .post('http://127.0.0.1:8000/api-auth-token/', {
            'username': login,
            'password': password
        })
            .then(response => {
                const token = response.data.token // получили token
                console.log('token:', token)
                localStorage.setItem('token', token) // сохранили token
                this.setState({
                        'token': token //сохраним состояние
                }, this.getData)  // getData вызываем вторым параметром
            })
            .catch(error => console.log(error))
    }

    // проверка авторизации
    isAuth(){
        return !!this.state.token
    }

    componentDidMount(){
        let token = localStorage.getItem('token') // востанавливаем token из хранилища
        this.setState({
            'token': token
        }, this.getData)
    }

    // формирование заголовков
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
            .get('http://127.0.0.1:8000/api/user/', {headers})
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
                this.setState({ 'users': [] }) // очищаем список после logout

            })
        axios
            .get('http://127.0.0.1:8000/filters/project/', {headers})
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
            .get('http://127.0.0.1:8000/filters/todo/', {headers})
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
        localStorage.setItem('token', '') // пустая строка - загашенный токен
        this.setState({
            'token': ''
        }, this.getData) // перегружаем данные
    }

    render(){
        return(
            <div>
                <BrowserRouter>
                    <nav>
                        <li> <Link to='/'>Users</Link></li>
                        <li> <Link to='/project'>Projects</Link></li>
                        <li> <Link to='/todo'>Notes</Link></li>
                        <li> {this.isAuth() ? <button onClick={() => this.logOut()} > logout </button> : <Link to='/login'> login </Link>} </li>
                     </nav>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/> } />
                        <Route exact path='/project' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todo' element={<TodoList todoes={this.state.todoes} /> }  />
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
