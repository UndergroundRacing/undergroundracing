import React from "react";
import '../css/styles.css';
import '../css/chat.css';
import UserPic from '../img/default_user.jpg';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            target_user: "",
            message: "",
            select_user: ""
        });
    }

    render() {

        return (<div className={"chat"}>
                <span className={"contacts"}>
                    <div className={"contact active"}>
                        <img src={UserPic} alt={""}/> <span>Racer</span>
                    </div>
                    <div className={"contact"}>
                        <img src={UserPic} alt={""}/> <span>User</span>
                    </div>
                    <div className={"contact"}>
                        <img src={UserPic} alt={""}/> <span>Driver</span>
                    </div>
                </span>
            <span className={"messages"}>
                <div className={"message m-sent"}>
                    <span className={"sent"}> Labas</span>
                </div>
                <div className={"message m-received"}>
                    <span className={"received"}>Labas </span>
                </div>
                <div className={"send-message"}>
                    <input type={"text"} placeholder={"Žinutė"}/>
                    <i className="fa fa-paper-plane"/>
                </div>
            </span>
        </div>);
    }
}


export default Chat;