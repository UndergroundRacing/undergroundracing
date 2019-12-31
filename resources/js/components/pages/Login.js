import React from 'react';
import {connect} from "react-redux";
import '../css/main.css';
import '../css/login_register.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {addToken} from "../store/actions";

const mapStateToProps = state => {
    return {token: state.token};
};

function mapDispatchToProps(dispatch) {
    return {
        addToken: token => dispatch(addToken(token))
    };
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            login: true,
            forgot_pass: false,
            return: false,
            register: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        switch (event.currentTarget.id) {
            case "forgot_pass":

                break;
            case "home":
                this.props.history.push('/');
                break;
            case "register":
                this.props.history.push('/Register');
                break;
            default:

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
            password: this.state.password
        });
        axios.post('http://127.0.0.1:8000/api/v1/login', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {

                const token = JSON.parse(response.request.response).success.token;
                this.props.addToken({token});
                this.props.history.push('/Home');

            })
            .catch((error) => {
                console.log(error.message);
            });

        event.preventDefault();
    }

    render() {

        if (window.location.pathname === 'Login?') {
            this.props.history.push('/Home');
        } else {
            return (<div className={"log-reg"}>

                <div className={"user-form"}>
                    <div className={"logo"}>Underground Streets</div>

                    <form onSubmit={this.handleSubmit}>
                        <div className={"form-title"}>Prisijungimas</div>
                        <label>
                            El. paštas
                            <input type="email" id={"email"} value={this.state.email} onChange={this.handleChange}/>
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
                        <FontAwesomeIcon icon={faHome} id={"home"} onClick={this.handleClick}/>
                        <FontAwesomeIcon icon={faUserPlus} id={"register"} onClick={this.handleClick}/>
                    </div>
                </div>

            </div>);
        }
    }
}

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginComponent;
