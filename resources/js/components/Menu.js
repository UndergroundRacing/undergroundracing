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
import {addUser, addAbilities, addCars, addCarInfo} from "./store/actions";
import {connect} from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        abilities: state.user_abilities,
        cars: state.user_cars,
        car_info: state.user_car_info
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => dispatch(addUser(user)),
        addAbilities: abilities => dispatch(addAbilities(abilities)),
        addCars: cars => dispatch(addCars(cars)),
        addCarInfo: car_info => dispatch(addCarInfo(car_info))
    };
}


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {

        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        };

        let auth = 'Bearer ';
        let token = this.props.token.toString();
        if (this.props.user == null) {
            axios.post("http://127.0.0.1:8000/api/v1/getUser", [], {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                let user = response.data.success;
                this.props.addUser({user});

                axios.get("http://127.0.0.1:8000/api/v1/getUserAbilities/" + user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    let abilities = response.data.success;
                    this.props.addAbilities({abilities});
                });

                axios.get("http://127.0.0.1:8000/api/v1/getAllVechiles/" + user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    let cars = response.data.success;
                    this.props.addCars({cars});

                    cars.map((car) => {

                        axios.defaults.headers.common = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        };

                        var data = JSON.stringify({});
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationById", {
                            part_id: car.vechile_id,
                            part_type: 6
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then((response) => {
                            let car_info = response.data.success;
                            this.props.addCarInfo({car_info});
                        });
                    });
                });
            });
        } else {
        }
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
            if (props.props != null) {
                return (<div className={"user-mini-info"}>
                        <span><FontAwesomeIcon icon={faUser}/>{props.props.user.name}</span>
                        <span><FontAwesomeIcon icon={faLevelUpAlt}/>{props.props.user.level}</span>
                        <span><FontAwesomeIcon icon={faMoneyBill}/>{props.props.user.cash}$</span>
                        <span><FontAwesomeIcon icon={faCreditCard}/>{props.props.user.credits}</span>
                    </div>
                );
            } else {
                return (<div className={"user-mini-info"}>
                    <span><FontAwesomeIcon icon={faUser}/></span>
                    <span><FontAwesomeIcon icon={faLevelUpAlt}/></span>
                    <span><FontAwesomeIcon icon={faMoneyBill}/></span>
                    <span><FontAwesomeIcon icon={faCreditCard}/></span>
                </div>);
            }
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

        let userInfo = window.location.pathname !== "/Home" ? <UserMiniInfo props={this.props.user}/> : null;

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

const MenuComponent = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default MenuComponent;
