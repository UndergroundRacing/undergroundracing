import React from 'react';
import '../css/styles.css';
import '../css/login_register.css';

//import '../css/mobile.css';
import Main from "./Main";

class Register extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            name: "",
            user_name: "",
            password: "",
            repeat_pass: "",
            pass_match: null
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
        let pass = this.state.pass;
        let c_pass = this.state.repeat_pass;

        if (c_pass.localeCompare(pass)) {
            console.log("Passwords match, submitting registration form");
            this.setState({pass_match: true});

            fetch('http://127.0.0.1:8000/api/v1/register', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    c_password: this.state.repeat_pass,
                    username: this.state.user_name
                })


            }).then((Response) => Response.json()).then((Result) => {
                if (Result.Status == 'success')
                    console.log('Registration complete');
                else console.log(Result);
            })
        } else {
            this.setState({pass_match: false});
        }
        event.preventDefault();
    }

    render() {

        let warning_msg = this.state.pass_match === false ?
            <span className={"form-warn"}>Slaptažodžiai turi sutapti</span> : null;

            return (<div className={"log-reg"}>

                <div className={"user-form"}>
                    <div className={"logo"}>Underground Streets</div>

                    <form onSubmit={this.handleSubmit}>
                        <div className={"form-title"}>Registracija</div>
                        <label>
                            El. paštas
                            <input type="email" id={"email"} value={this.state.email} onChange={this.handleChange}/>
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

                        {warning_msg}
                    </form>
                    <div className={"form-menu"}>
                        <i className={"fa fa-home"} id={"home"} onClick={this.handleClick}/>
                    </div>
                </div>

            </div>);
    }
}

export default Register;

