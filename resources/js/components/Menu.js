import React from "react";
import './css/styles.css';
import './css/menu.css';

import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Garage from "./pages/Garage";
import Chat from "./pages/Chat";
import Summary from "./pages/Summary";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        switch (event.target.id) {
            case "shop":
                this.props.history.push('/Shop');
                break;
            case "garage":
                this.props.history.push('/Garage');
                break;
            case "chat":
                this.props.history.push('/Chat');
                break;
            case "chat-icon":
                this.props.history.push('/Chat');
                break;
            case "summary":
                this.props.history.push('/Summary');
                break;
            case "summary-icon":
                this.props.history.push('/Summary');
                break;
            case "settings":
                break;
            case "logout":
                this.props.history.push('/');
                break;
            default:
                this.props.history.push('/Home');
        }
    }

    render() {
        function LoadPage(props) {

            console.log('Page link', window.location.pathname);

            let location = window.location.pathname;

            if (location === "/Home") {
                return <HomePage/>;
            } else if (location === "/Shop") {
                return <Shop/>;
            } else if (location === "/Garage") {
                return <Garage/>;
            } else if (location === "/Chat") {
                return <Chat/>
            } else if (location === "/Summary") {
                return <Summary/>
            } else if (props.props.settings) {
                return null;
            }
        }

        function UserMiniInfo(props) {
            return (<div className={"user-mini-info"}>
                    <span><i className="fa fa-user"/>The Stig</span>
                    <span><i className="fa fa-level-up"/>99</span>
                    <span><i className="fa fa-money"/>100000000$</span>
                    <span><i className="fa fa-credit-card"/>150000</span>
                </div>
            );
        }

        let homeBtn = window.location.pathname === "/Home" ?
            <li id={"home"} onClick={this.handleClick} style={{color: "red"}}><i className="fa fa-home"/></li> :
            <li id={"home"} onClick={this.handleClick}><i className="fa fa-home"/></li>;

        let shopBtn = window.location.pathname === "/Shop" ?
            <li id="shop" onClick={this.handleClick} style={{color: "red"}}>Parduotuvė</li> :
            <li id="shop" onClick={this.handleClick}>Parduotuvė</li>;

        let garageBtn = window.location.pathname === "/Garage" ?
            <li id={"garage"} onClick={this.handleClick} style={{color: "red"}}>Garažas</li> :
            <li id={"garage"} onClick={this.handleClick}>Garažas</li>;

        let chatBtn = window.location.pathname === "/Chat" ?
            <li id={"chat"} onClick={this.handleClick} style={{color: "red"}}><i id={"chat-icon"}
                                                                                 onClick={this.handleClick}
                                                                                 className="fa fa-envelope"/></li> :
            <li id={"chat"} onClick={this.handleClick}><i id={"chat-icon"} onClick={this.handleClick}
                                                          className="fa fa-envelope"/></li>

        let summaryBtn = window.location.pathname === "/Summary" ?
            <li id={"summary"} onClick={this.handleClick} style={{color: "red"}}><i id={"summary-icon"}
                                                                                    onClick={this.handleClick}
                                                                                    className="fa fa-list-alt"/></li> :
            <li id={"summary"} onClick={this.handleClick}><i id={"summary-icon"}
                                                             onClick={this.handleClick}
                                                             className="fa fa-list-alt"/></li>

        let userInfo = window.location.pathname !== "/Home" ? <UserMiniInfo/> : null;

        return (<div>
            <ul className={"top-menu"}>
                <div className={"menu-logo"}><i className="fa fa-flag-checkered"/> Underground Racing</div>
                {homeBtn}
                {shopBtn}
                {garageBtn}
                {chatBtn}
                {summaryBtn}
                <li id={"settings"} onClick={this.handleClick}><i className="fa fa-cog"/></li>
                <li id={"logout"} onClick={this.handleClick}><i className="fa fa-sign-out"/></li>
            </ul>
            {userInfo}
            <LoadPage props={this.state}/>
        </div>);
    }
}

export default Menu;