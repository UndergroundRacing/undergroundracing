import React from "react";
import {connect} from "react-redux";
import {adminLogin} from "../../store/actions";

class AdminLogin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(){
        if(this.props.adminToken != null){
            this.props.history.push('/AdminHome');
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
        this.props.adminLogin(this.state.email,this.state.password);

        event.preventDefault();
    }
    
    render(){
        return (
            <div className={"log-reg"}>

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
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {adminToken: state.adminToken};
};

const AdminLoginComponent = connect(mapStateToProps, {adminLogin})(AdminLogin);
export default AdminLoginComponent;