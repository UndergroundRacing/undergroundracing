import React from 'react';
import '../css/styles.css';
import '../css/login_register.css';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addToken} from "../store/actions";

class Register extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            name: "",
            user_name: "",
            password: "",
            repeat_pass: "",
            pass_match: null,
            warning: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {

        this.props.history.push('/');

    }

    handleChange(event) {
        switch (event.target.id) {
            case "email":
                this.setState({
                    email: event.target.value
                });
                break;
            case "user_name":
                this.setState({
                    user_name: event.target.value
                });
                break;
            case "name":
                this.setState({
                    name: event.target.value
                });
                break;
            case "pass":
                this.setState({
                    password: event.target.value
                });
                break;
            case "repeat_pass":
                this.setState({
                    repeat_pass: event.target.value
                });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {

        let pass = this.state.password;
        let c_pass = this.state.repeat_pass;

        let passed_regex = null;

        if (/[A-Z]+[0-9]*/.test(pass)) {
            passed_regex = true;
        } else {
            passed_regex = false;
            this.setState({
                warning: "Slaptažodį turi sudaryti bent 1 skaičius ir 1 didžioji raidė"
            })
        }

        if (c_pass == pass && pass.length > 5 && passed_regex) {
            this.setState({pass_match: true});

            var data = JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                c_password: this.state.repeat_pass,
                username: this.state.user_name
            });
            axios.post('http://127.0.0.1:8000/api/v1/register', data, {
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
                        let data = JSON.parse(error.response.config.data);

                        let error_msg = error.response.data.message;

                        if (data.email == "") {
                            this.setState({
                                warning: "Įveskite el. pašto adresą"
                            });
                        } else if (data.name == "") {
                            this.setState({
                                warning: "Įveskite savo vardą"
                            })
                        } else if (data.username == "") {
                            this.setState({
                                warning: "Įveskite vartotojo vardą"
                            });
                        } else if (data.password == "") {
                            this.setState({
                                warning: "Įveskite slaptažodį"
                            });
                        } else if (data.c_password == "") {
                            this.setState({
                                warning: "Pakartokite slaptažodį"
                            });
                        } else if (error_msg.includes('users_email_unique')) {
                            this.setState({
                                warning: "Toks el. pašto adresas jau užregistruotas"
                            });
                        } else if (error_msg.includes('users_username_unique')) {
                            this.setState({
                                warning: "Toks vartotojo vardas jau egzistuoja"
                            });
                        }
                    }
                );
        } else if (pass.length < 6) {
            this.setState({
                warning: "Slaptažodžio ilgis turi būti bent 6 simboliai"
            })
        } else if (pass != c_pass) {
            this.setState({
                warning: "Slaptažodžiai turi sutapti"
            });
        }

        event.preventDefault();
    }

    render() {

        let validation_msg = this.state.warning != null ?
            <span className={"form-warn"}>{this.state.warning}</span> : null;

        return (<div className={"log-reg"}>

            <div className={"user-form"}>
                <div className={"logo"}>Underground Streets</div>

                <form onSubmit={this.handleSubmit}>
                    <div className={"form-title"}>Registracija</div>
                    <label>
                        El. paštas
                        <input required pattern={".+@.+\\..+"}
                               title={"El. pašto adrese turi būti simbolis @ ir domeno vardas, pvz. pastas@pastas.lt"}
                               id={"email"} value={this.state.email} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Vardas
                        <input type="text" id={"name"} value={this.state.name} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Vartotojo vardas
                        <input type="text" id={"user_name"} value={this.state.user_name}
                               onChange={this.handleChange}/>
                    </label>

                    <label>
                        Slaptažodis
                        <input type="password" id={"pass"} value={this.state.password}
                               onChange={this.handleChange}/>
                    </label>

                    <label>
                        Pakartokite slaptažodį
                        <input type="password" id={"repeat_pass"} value={this.state.repeat_pass}
                               onChange={this.handleChange}/>
                    </label>

                    <button type="submit">Registruotis</button>
                    {validation_msg}
                </form>
                <div className={"form-menu"}>
                    <FontAwesomeIcon icon={faHome} id={"home"} onClick={this.handleClick}/>
                </div>
            </div>

        </div>);
    }
}

const RegisterComponent = connect(null, {addToken})(Register);
export default RegisterComponent;

