import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClientList from './components/Client.js'

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            'authors': []
        }
    }

    componentDidMount(){
        const authors = [
            {
                 "username": "root",
                 "first_name": "Константин",
                 "last_name": "Давидюк",
                 "age": 42,
                 "email": "root@mail.ru",
                 "cat": 1
            },
            {
                    "username": "demn",
                    "first_name": "Дмитрий",
                    "last_name": "Егоров",
                    "age": 45,
                    "email": "yegorov@mail.ru",
                    "cat": 2
            },
            {
                    "username": "true",
                    "first_name": "Андрей",
                    "last_name": "Трусов",
                    "age": 36,
                    "email": "trusov@mail.ru",
                    "cat": 3
            },
            {
                    "username": "Anastasi",
                    "first_name": "",
                    "last_name": "",
                    "age": null,
                    "email": "nasta@mail.ru",
                    "cat": 2
            },
        ]
        this.setState(
            {
                'authors': authors
            }
        )

    }

    render(){
        return(
            <div>
                <ClientList clients={this.state.authors} />
            </div>
        )
    }
}

export default App;
