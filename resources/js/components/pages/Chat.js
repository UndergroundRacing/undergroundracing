import React from "react";
import '../css/styles.css';
import '../css/chat.css';
import UserPic from '../img/default_user.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import UserPage from "./UserPage";
import {connect} from "react-redux";
import {getMessagesContacts,getMessages} from "../store/actions";
class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            target_user: "",
            message: "",
            select_user: ""
        });
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        let data = {
            'sender_id': this.props.user.user.id,
            'receiver_id' : event.target.value
        };
        this.props.getMessages(this.props.token,data);
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
                    <span className={"received"}>{msg.message} </span>
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
                    <input type={"text"} placeholder={"Žinutė"}/>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                    
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

const ChatComp = connect(mapStateToProps,{getMessagesContacts,getMessages})(Chat);
export default ChatComp;
