import React from "react";
import '../../css/AdminPage.css';
import {connect} from "react-redux";
import {createClub} from "../../store/actions";
class CreateClub extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            title: '',
            clubs:null
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        let data = {
            "owner_id" : this.props.user.user.id,
            "title" : this.state.title
        };
        this.props.createClub(this.props.token,data);
        window.location.reload();
        event.preventDefault();
    }

    handleChange(event){
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


    componentWillUpdate(nextProps) {
        if(nextProps.clubs != this.props.clubs)
        this.setState({
            clubs: nextProps.clubs
        });
    }
    
    renderError(){
        if(this.state.clubs != null){
            if(this.state.clubs.hasOwnProperty("error")){
                return(
                    <div>
                        <span className={"text-danger"}>Neturite pakankamai pinigu!</span>
                    </div>
                );
            }
        }
        
    }
    renderHasNoClub(){
        return(
            <div className={"container"}>
            <div className={"row"}>
                <div className={"col-sm-12"}>
                    <div className={"admin_add_action"}>
                        <span className={"add-action-label"}>Sukurti kluba</span>
                            {this.renderError()}
                            <form onSubmit={this.handleSubmit}>
                                <div className={"form-group"}>
                                   
                                    <input type="text" className={"form-control"} id="title" value={this.state.title} onChange={this.handleChange} placeholder="Pavadinimas"/>
                                </div>
                            
                                <button type="submit" className={"btn btn-primary"}>Sukurti</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
        );
            
    }

    render() {

        return (<div>
                        {this.renderHasNoClub()  }
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        token:state.token,
        user:state.user_info,
        clubs:state.club
    };
};
const ClubComponent = connect(mapStateToProps,{createClub})(CreateClub);
export default ClubComponent;
