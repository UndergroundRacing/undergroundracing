import React from "react";
import './css/styles.css';
import './css/menu.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faFlagCheckered,
    faHome,
    faUser,
    faLevelUpAlt,
    faMoneyBill,
    faCreditCard,
    faEnvelope,
    faList, faCog, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

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
        switch (event.currentTarget.id) {
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
                    <span><FontAwesomeIcon icon={faUser}/>The Stig</span>
                    <span><FontAwesomeIcon icon={faLevelUpAlt}/>99</span>
                    <span><FontAwesomeIcon icon={faMoneyBill}/>$100000000</span>
                    <span><FontAwesomeIcon icon={faCreditCard}/>150000</span>
                </div>
            );
        }

        let homeBtn = window.location.pathname === "/Home" ?
            <li id={"home"} onClick={this.handleClick} style={{color: "red"}}><FontAwesomeIcon icon={faHome}/></li> :
            <li id={"home"} onClick={this.handleClick}><FontAwesomeIcon icon={faHome}/></li>;

        let shopBtn = window.location.pathname === "/Shop" ?
            <li id="shop" onClick={this.handleClick} style={{color: "red"}}>Parduotuvė</li> :
            <li id="shop" onClick={this.handleClick}>Parduotuvė</li>;

        let garageBtn = window.location.pathname === "/Garage" ?
            <li id={"garage"} onClick={this.handleClick} style={{color: "red"}}>Garažas</li> :
            <li id={"garage"} onClick={this.handleClick}>Garažas</li>;

        let chatBtn = window.location.pathname === "/Chat" ?
            <li id={"chat"} onClick={this.handleClick} style={{color: "red"}}><FontAwesomeIcon id={"chat-icon"}
                                                                                               onClick={this.handleClick}
                                                                                               icon={faEnvelope}/>
            </li> :
            <li id={"chat"} onClick={this.handleClick}><FontAwesomeIcon id={"chat-icon"} onClick={this.handleClick}
                                                                        icon={faEnvelope}/></li>

        let summaryBtn = window.location.pathname === "/Summary" ?
            <li id={"summary"} onClick={this.handleClick} style={{color: "red"}}><FontAwesomeIcon id={"summary-icon"}
                                                                                                  onClick={this.handleClick}
                                                                                                  icon={faList}/></li> :
            <li id={"summary"} onClick={this.handleClick}><FontAwesomeIcon id={"summary-icon"}
                                                                           onClick={this.handleClick}
                                                                           icon={faList}/></li>

        let userInfo = window.location.pathname !== "/Home" ? <UserMiniInfo/> : null;

        return (<div>
            <ul className={"top-menu"}>
                <div className={"menu-logo"}><FontAwesomeIcon icon={faFlagCheckered}/> Underground Racing</div>
                {homeBtn}
                {shopBtn}
                {garageBtn}
                {chatBtn}
                {summaryBtn}
                <li id={"settings"} onClick={this.handleClick}><FontAwesomeIcon icon={faCog}/></li>
                <li id={"logout"} onClick={this.handleClick}><FontAwesomeIcon icon={faSignOutAlt}/></li>
            </ul>
            {userInfo}
            <LoadPage props={this.state}/>
        </div>);
    }
}

export default Menu;
