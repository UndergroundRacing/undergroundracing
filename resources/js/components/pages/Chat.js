import React from "react";
import '../css/styles.css';
import '../css/chat.css';
import UserPic from '../img/default_user.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import UserPage from "./UserPage";
import {connect} from "react-redux";
import {getMessagesContacts,getMessages,sendMessage} from "../store/actions";
class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            message:"",
            user_selected : ''
        });
        this.handleClick = this.handleClick.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event){
        let data = {
            'sender_id': this.props.user.user.id,
            'receiver_id' : event.target.value
        };
        this.props.getMessages(this.props.token,data);
        this.setState({
            user_selected: event.target.value
        });
    }

    handleChange(event){
        this.setState({
            message: event.target.value
        });
    }

    handleSendMessage(){
        let data = {
            'sender_id': this.props.user.user.id,
            'receiver_id' : this.state.user_selected,
            'message' :this.state.message
        };
        this.props.sendMessage(this.props.token,data);

        let dat = {
            'sender_id': this.props.user.user.id,
            'receiver_id' : this.state.user_selected,
        };
        this.props.getMessages(this.props.token,dat);
        this.setState({
            user_selected: event.target.value,
            message:""
        });
        //window.location.reload();
    }

    componentDidMount(){
        this.props.getMessagesContacts(this.props.token,this.props.user.user.id);
    }

    componentDidUpdate(){
        console.log('updated');
        console.log(this.props);
    }

    renderContacts(){
        if(this.props.message_contacts != null){
            const listItems =  Object.values(this.props.message_contacts).map((user) =>
            <div className={"contact"} >
                <button className={"contact-btn"} value={user.id} onClick={this.handleClick}>{user.user_name}</button>
                 
            </div>
    );
        return listItems;
        }
    }
    renderMessages(){
        if(this.props.messages !=null){
            const listItems =  Object.values(this.props.messages).map((msg) =>
                <div className={"message m-received"}>
                    <span className={"received"}>{msg.sender_username} : {msg.message} </span>
                </div>
        );
        return listItems;
        }
    }

    render() {

        return (<div className={"chat"}>
                <span className={"contacts"}>
                    {this.renderContacts()}
                </span>
                
                <span className={"messages"}>
                {this.renderMessages()}
                <div className={"send-message"}>
                    <input type={"text"} id="message" placeholder={"Žinutė"} value={this.state.message} onChange={this.handleChange}/>
                    <FontAwesomeIcon icon={faPaperPlane} onClick={this.handleSendMessage}/>
                    
                </div>
                </span>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        user:state.user_info,
        token:state.token,
        message_contacts:state.message_contacts,
        messages: state.messages
    };
};

const ChatComp = connect(mapStateToProps,{getMessagesContacts,getMessages,sendMessage})(Chat);
export default ChatComp;
