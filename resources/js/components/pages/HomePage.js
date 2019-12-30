import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../css/styles.css';
import '../css/home.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserPhoto from '../img/default_user.jpg';
import R34 from '../img/R34.png';
import Evo9 from '../img/Evo9.png';
import S13Hatch from '../img/S13Hatch.png';
import S15 from '../img/S15.png';

import Race from '../pages/Race';
import {connect} from "react-redux";
import {addUser, addAbilities, addCars, addCarInfo} from "../store/actions";

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


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            race: false,
            task_comp: false,
            race_type: "1/4",
            select_car: false,
            user_info: null,
            user_abilities: null,
            user_cars: null,
            user_car_info: null,
            user_load: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.selectCar = this.selectCar.bind(this);
    }

    componentDidMount() {

        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        };

        let auth = 'Bearer ';
        let token = this.props.token.toString();
        if (this.props.user == null) {
            console.log("Fetching user info");
            axios.post("http://127.0.0.1:8000/api/v1/getUser", [], {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                let user = response.data.success;

                this.props.addUser({user});
                this.setState({
                    user_info: user

                });

                axios.get("http://127.0.0.1:8000/api/v1/getUserAbilities/" + user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    let abilities = response.data.success;

                    this.props.addAbilities({abilities});
                    this.setState({
                        user_abilities: abilities
                    });

                });

                axios.get("http://127.0.0.1:8000/api/v1/getAllVechiles/" + user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    let cars = response.data.success;

                    this.props.addCars({cars});
                    this.setState({
                        user_cars: cars,
                        user_load: true
                    });

                    cars.map((car) => {

                        console.log("car - ", car);

                        axios.defaults.headers.common = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        };

                        var data = JSON.stringify({
                            part_type: 6,
                            part_id: car.vechile_id
                        });
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationById", data, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then((response) => {
                            console.log("Car info - ", response);
                        });


                    });
                });


            });
        } else {
            let user = this.props.user.user;
            let abilities = this.props.abilities.abilities;

            this.setState({
                user_info: user,
                user_abilities: abilities,
                user_load: true
            });
        }
    }

    handleClick(event) {
        switch (event.target.id) {
            case "1/4":
                this.setState({
                    race_type: "1/4"
                });
                break;
            case "1/2":
                this.setState({
                    race_type: "1/2"
                });
                break;
            default:
                this.setState({
                    race: true
                });
        }
    }

    buyAbility(event) {
        console.log("Buying ability", event.currentTarget.id);
    }

    selectCar(event) {
        switch (event.currentTarget.id) {
            case "back":
                this.setState({
                    select_car: false
                });
                break;
            case "back_arrow":
                this.setState({
                    select_car: false
                });
                break;
            default:
                this.setState({
                    select_car: true
                });
                break;
        }
    }


    render() {
        function UserAbilities(props) {
            if (props.props != null) {
                return (
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td>{props.props.reaction}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"reaction"} onClick={props.handler}/></td>
                            <td>5000$</td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td>{props.props.shifting}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"shifting"} onClick={props.handler}/></td>
                            <td>5000$</td>
                        </tr>
                        <tr>
                            <td>Greitėjimas</td>
                            <td>{props.props.acceleration}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"acceleration"} onClick={props.handler}/></td>
                            <td>5000$</td>
                        </tr>
                        <tr>
                            <td>Manevringumas</td>
                            <td>{props.props.mobility}</td>
                             <td><FontAwesomeIcon icon={faPlus} id={"mobility"} onClick={props.handler}/></td>
                            <td>5000$</td>
                        </tr>
                        </thead>
                    </table>
                    </span>
                );
            } else {
                return (
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Greitėjimas</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Manevringumas</td>
                            <td></td>
                             <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        </thead>
                    </table>
                    </span>
                );
            }
        }

        let user_name = this.state.user_load ? this.state.user_info.name : " ";
        let user_level = this.state.user_load ? this.state.user_info.level + " lygis" : " ";
        let user_cash = this.state.user_load ? this.state.user_info.cash + " $" : " ";
        let user_credits = this.state.user_load ? this.state.user_info.credits : " ";
        let user_xp = this.state.user_load ? this.state.user_info.experience : " ";

        let taskButton = this.state.task ?
            <button className={"task-btn"} id={"task"} onClick={this.handleClick}>Atsiimti</button> :
            <button className={"task-btn-disabled"} id={"task"} disabled={true}>Atsiimti</button>;

        let selectCar = this.state.select_car ?
            <CarSelect props={this.state.user_cars} handler={this.selectCar.bind(this)}
                       token={this.props.token}/> : null;

        let abilities = this.state.user_load ?
            <UserAbilities props={this.state.user_abilities} handler={this.buyAbility}/> : null;

        function CarSelect(props, handler, token) {

            console.log("Select car", props);

            return (<div className={"car-swap"}>
                <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <table>
                    <thead>
                    <tr>
                        <td><img src={R34} alt={"R34"}/></td>
                        <td><img src={Evo9} alt={"EVO9"}/></td>
                        <td><img src={S13Hatch} alt={"S13Hatch"}/></td>
                        <td><img src={S15} alt={"S15"}/></td>
                    </tr>
                    <tr>
                        <td>Nissan <br/> Skyline GT-R R34</td>
                        <td>Mitsubishi <br/> Lancer Evolution IX</td>
                        <td>Nissan <br/> S13 Silvia</td>
                        <td>Nissan <br/> S15 Silvia</td>
                    </tr>
                    </thead>
                </table>

            </div>);
        }

        if (this.state.race) {
            return <Race/>;
        } else {
            return (<div>

                <div className={"user"}>
                    <div className={"user-stats"}>
                        <table>
                            <thead>
                            <tr>
                                <td>Patirtis:</td>
                                <td><ProgressBar className={"xp-bar"} now={25} label={user_xp}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Pinigai:</td>
                                <td>{user_cash}</td>
                            </tr>
                            <tr>
                                <td>Kreditai:</td>
                                <td>{user_credits}</td>
                            </tr>
                            <tr>
                                <td>Klubas:</td>
                                <td>-</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className={"user-info"}>
                        <img src={UserPhoto} alt="Smiley face" height="42" width="42"/>
                        <span id={"user-name"}>{user_name}</span>
                        <span id={"user-level"}>{user_level}</span>
                    </div>
                    <div className={"user-task"}>
                        <span className={"task-title"}>Užduoties pavadinimas</span>
                        <span className={"task-info"}>Užduoties aprašymas</span>
                        <ProgressBar className={"task-progress"} now={50} label={'1/2'}/>
                        <span className={"task-prize"}>Prizas: 50 kreditų</span>
                        {taskButton}
                    </div>
                </div>

                <div className={"go-race"}>
                    <div>Gatvės laukia tavęs</div>
                    <div className={"race-options"}>
                        <div className={"select-car"}>
                            <img id={"R34"} src={R34} onClick={this.selectCar} alt={"Nissan Skyline GT-R R34"}/>
                            <div>Pasirinktas automobilis</div>
                        </div>
                        <div className={"select-race"}>
                            <div>Lenktynių ilgis</div>
                            <span id={"1/4"} style={{color: "red"}} onClick={this.handleClick}>1/4 mylios</span>
                            <button id={"race"} onClick={this.handleClick}>Lenktyniauti</button>
                        </div>
                    </div>
                    {selectCar}
                </div>

                <div className={"user-abilities"}>
                    <span>Specialūs gebėjimai</span>
                    {abilities}

                </div>
            </div>);
        }

    }

}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default Home;
