import React from 'react';
import '../css/styles.css';
import '../css/login_register.css';

//import '../css/mobile.css';
import Main from "./Main";

class ForgotPass extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            home: false,
            forgot: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {

        this.setState({
            home: true,
            forgot: false
        });

    }

    handleChange(event) {

        this.setState({
            email: event.target.value
        });

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        if (this.state.forgot) {
            return (<div className={"log-reg"}>

                <div className={"user-form"}>
                    <div className="logo">Underground Streets</div>

                    <form onSubmit={this.handleSubmit}>
                        <div className={"form-title"}>Slaptažodžio priminimas</div>
                        <label>
                            El. paštas
                            <input type="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                        </label>

                        <button type="submit">Priminti slaptažodį</button>
                    </form>
                    <div className={"form-menu"}>
                        <i className="fa fa-home" id={"home"} onClick={this.handleClick}/>
                    </div>
                </div>

            </div>);
        } else if (this.state.home) {
            return <Main/>;
        }
    }
}

export default ForgotPass;

