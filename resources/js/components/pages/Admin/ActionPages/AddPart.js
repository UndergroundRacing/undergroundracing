import React from "react";
import '../../../css/AdminPage.css';
import {connect} from "react-redux";
import {addPart} from "../../../store/actions";
class AddPart extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            title: "",
            error:"",
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "title":
                this.setState({
                    title: event.target.value
                });
                break;
            default:
                break;
        }
    }

    componentDidUpdate(){
        console.log(this.props);
    }

    handleSubmit(event) {
        
        this.props.addPart(this.state.title, this.props.adminToken);
        event.preventDefault();
    }

    render() {

        return (<div className={"container"}>
            <div className={"row"}>
                <div className={"col-sm-12"}>
                    <div className={"admin_add_action"}>
                        <span className={"add-action-label"}>Pridėti dalį</span>
                            <form onSubmit={this.handleSubmit}>
                                <div className={"form-group"}>
                                    <input type="text" className={"form-control"} id="title" value={this.state.title} onChange={this.handleChange} placeholder="Pavadinimas"/>
                                </div>
                                <button type="submit" className={"btn btn-primary"}>Pridėti</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        adminToken: state.adminToken,
        part: state.part
    };
};

const AddPartComponent = connect(mapStateToProps, {addPart})(AddPart);
export default AddPartComponent;
