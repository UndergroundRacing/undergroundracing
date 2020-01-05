import React from 'react';
import '../css/styles.css';
import '../css/login_register.css';
import {connect} from "react-redux";
import {changePassword,addToken} from "../store/actions";
//import '../css/mobile.css';
import Main from "./Main";

class ForgotPass extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password:"",
            n_password: "",
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
        switch (event.target.id) {
            case "email":
                this.setState({
                    email: event.target.value
                });
                break;
            case "old_password":
                this.setState({
                    password: event.target.value
                });
                break;
            case "new_password":
                this.setState({
                    n_password: event.target.value
                });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        let data = {
            email: this.state.email,
            password:this.state.password,
            n_password:this.state.n_password
        };

        this.props.changePassword(data);

        event.preventDefault();
    }
    componentDidUpdate(){
        console.log('Updated!!');
        console.log(this.props.change_password);
        if(this.props.change_password !=null){
            if(this.props.change_password.success !=null){
                this.props.addToken(this.props.change_password.success);
                this.props.history.push('/Home');
            }
        }
    }

    renderErrorMessage(){
        if(this.props.change_password !=null){
            if(this.props.change_password.error !=null){
                return(
                    <span className={"text-danger"}>Neteisingas prisijungimo vardas ar slaptažodis!</span>
                );
            }
        }
    }

    render() {
        if (this.state.forgot) {
            return (<div className={"log-reg"}>
                <div className={"user-form"}>
                    <div className="logo">Underground Streets</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"form-title"}>Slaptažodžio priminimas</div>
                        {this.renderErrorMessage()}
                        <label>
                            El. paštas
                            <input type="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                        </label>

                        <label>
                            Senas slaptažodis
                            <input type="password" id="old_password" value={this.state.old_password} onChange={this.handleChange}/>
                        </label>

                        <label>
                            Naujas slaptažodis
                            <input type="password" id="new_password" value={this.state.new_password} onChange={this.handleChange}/>
                        </label>

                        <button type="submit">Keisti slaptažodį</button>
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
const mapStateToProps = state => {
    return {
        user: state.user_info,
        change_password: state.change_password,
    };
};
const ForgotPassCom = connect(mapStateToProps,{changePassword,addToken})(ForgotPass);
export default ForgotPassCom;

