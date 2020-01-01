import React from "react";
import {connect} from "react-redux";
import {getUser} from "../../store/actions";
import '../../css/AdminPage.css';
class AdminHome extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        switch (event.currentTarget.id) {
            case "forgot_pass":

                break;
            case "add_part":
                this.props.history.push('/AddPart');
                break;
            case "add_vech":
                this.props.history.push('/AddVehicle');
                break;
            case "add_engine":
                this.props.history.push('/AddEngine');
                break;
            case "add_wheels":
                this.props.history.push('/AddWheels');
                break;
            case "add_stops":
                this.props.history.push('/AddStops');
                break;
            case "add_turbo":
                this.props.history.push('/AddTurbo');
                break;
            case "add_nos":
                this.props.history.push('/AddNos');
                break;
            default:
        }
    }

    componentDidMount(){
        if(this.props.adminToken != null)
        {
            //this.props.getUser(this.props.adminToken);
            console.log(this.props.adminToken);
        }
        else{
            this.props.history.push('/AdminLogin');
        }

    }

    componentDidUpdate(){
        if(this.props.user != null || this.props.user.role != 2){
            this.props.history.push('/AdminLogin');
        }
    }
  
    
    render(){
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"admin-actions"}>
                        <span id={"add_part"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti dalis</span>
                        <span id={"add_vech"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti automobilį</span>
                        <span id={"add_engine"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti variklį</span>
                        <span id={"add_wheels"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti ratus</span>
                        <span id={"add_stops"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti stabdžius</span>
                        <span id={"add_turbo"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti turbo</span>
                        <span id={"add_nos"} className={"btn btn-secondary admin-action"} onClick={this.handleClick}>Pridėti nos</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        adminToken: state.adminToken,
        user: state.user
    };
};

const AdminHomeComponent = connect(mapStateToProps, {getUser})(AdminHome);
export default AdminHomeComponent;