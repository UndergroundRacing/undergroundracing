import React from 'react';
import axios from 'axios';
import '../css/styles.css';
import '../css/login_register.css';

//import '../css/mobile.css';
import Main from "./Main";
import ForgotPass from "./ForgotPass";
import Register from "./Register";

class Login extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        switch (event.target.id) {
            case "forgot_pass":

                break;
            case "home":
                this.props.history.push('/');
                break;
            case "register":
                this.props.history.push('/Register');
                break;
            default:
                this.props.history.push('/Login');
        }
    }

    handleChange(event) {
        switch (event.target.id) {
            case "email":
                this.setState({
                    email: event.target.value
                });
                break;
            case "password":
                this.setState({
                    password: event.target.value
                });
                break;
            default:
                break;
        }
    }
    

    handleSubmit(event) {
        var data = JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
        });
         axios.post('http://127.0.0.1:8000/api/v1/login', data ,{  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })      
        .then((response) => {
            this.props.history.push('/Home');
        })
        .catch((error) => {
            console.log(error);
        });
    }


    render() {
        return (<div className={"log-reg"}>

            <div className={"user-form"}>
                <div className={"logo"}>Underground Streets</div>

                <form onSubmit={this.handleSubmit}>
                    <div className={"form-title"}>Prisijungimas</div>
                    <label>
                        El. paštas
                        <input type="email" id={"email"} value={this.state.email}
                               onChange={this.handleChange}/>
                    </label>

                    <label>
                        Slaptažodis
                        <input type="password" id={"password"} value={this.state.password}
                               onChange={this.handleChange}/>
                    </label>

                    <button type="submit">Prisijungti</button>
                </form>
                <div className={"form-menu"}>
                    <span id={"forgot_pass"} onClick={this.handleClick}>Slaptažodžio priminimas</span>
                    <i className="fa fa-home" id={"home"} onClick={this.handleClick}/>
                    <i className="fa fa-user-plus" id={"register"} onClick={this.handleClick}/>
                </div>
            </div>

        </div>);

    }
}

export default Login;

