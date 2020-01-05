import React from "react";
import '../css/styles.css';
import '../css/summary.css';
import {connect} from "react-redux";
import {getTops,inviteUserToClub,sendMessage} from "../store/actions";
class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            sendMessage: 0,
            message:""
        });
        this.inviteToClub = this.inviteToClub.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props.user.user.club_id );
    }

    formSubmit(event){
        event.preventDefault();
        var req = {
            'sender_id' : this.props.user.user.id,
            'receiver_id' : this.props.userToSearch,
            'message' : this.state.message
        };

        this.props.sendMessage(this.props.token,req);

        this.setState({
            sendMessage: 0,
            message: "",
        });
       
    }

    handleChange(event){
        this.setState({
            message: event.target.value
        });
    }
    sendMessage(event){
        this.setState({
            sendMessage: 1
        });
    }

    renderMessageInput(){
        if(this.state.sendMessage == 1){
            return(
                <form onSubmit={this.formSubmit}>
                     <div className={"form-group"}>
                            <input type="text" className={"form-control"} id="message" value={this.state.message} onChange={this.handleChange} placeholder="Žinutė"/>
                      </div>
                      <button type="submit" className={"btn btn-primary"}>Siųsti</button>
                </form>

            );
        }

    }

    inviteToClub(event){
       let req = {
            'club_id' : this.props.user.user.club_id,
            'user_id' :this.props.userToSearch
        }

        this.props.inviteUserToClub(this.props.token,req);
    }

    renderInviteToClubBtn(){
        if(this.props.user.user.club_id != null) {
            return <button className={"submit"} onClick={this.inviteToClub}>Kviesti i kluba</button>;
        }
    }

    render() {

        return (<div className={"user-page"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-12"}>
                        <div className={"user-mini-info"}>
                            <button className={"submit"} onClick={this.sendMessage}>Siusti zinute</button>
                            {this.renderInviteToClubBtn()}
                            <div className={"message-wrapper"}>
                                {this.renderMessageInput()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        user:state.user_info,
        token:state.token,
        userToSearch: state.userToSearch,
        invitation:state.invitation_to_club
    };
};

const UserPageComp = connect(mapStateToProps,{getTops,inviteUserToClub,sendMessage})(UserPage);
export default UserPageComp;