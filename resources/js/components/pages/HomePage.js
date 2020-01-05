import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../css/styles.css';
import '../css/home.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserPhoto from '../img/default_user.jpg';

import Race from '../pages/Race';
import {connect} from "react-redux";
import {addAbilities, addActiveCar, addTask, addUser, raceAction,registerToUsersTournament,checkIfUserRegisteredToTournament,addUserTask} from "../store/actions";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        abilities: state.user_abilities,
        cars: state.user_cars,
        car_info: state.user_car_info,
        active_car: state.active_car,
        user_task: state.user_task,
        tournament:state.tournament,
        user_tournament_status:state.user_tournament_status
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => dispatch(addUser(user)),
        addAbilities: abilities => dispatch(addAbilities(abilities)),
        addActiveCar: active_car => dispatch(addActiveCar(active_car)),
        addTask: task => dispatch(addTask(task)),
        raceAction: (token,data) => dispatch(raceAction(token,data)),
        registerToUsersTournament:(token,data) => dispatch(registerToUsersTournament(token,data)),
        checkIfUserRegisteredToTournament: (token,id) => dispatch(checkIfUserRegisteredToTournament(token,id)),
        addUserTask:(token,data) => dispatch(addUserTask(token,data))
    };
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            race: false,
            race_type: "1/4",
            select_car: false,
            user_data: null,
            user_abilities: null,
            user_cars: null,
            user_car_info: null,
            used_car: "",
            current_task: null,
            task_prize_received: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRace = this.handleRace.bind(this);
        this.selectCar = this.selectCar.bind(this);
        this.buyAbility = this.buyAbility.bind(this);
        this.handleTask = this.handleTask.bind(this);
        this.handleTournament = this.handleTournament.bind(this);
        this.createUserTask = this.createUserTask.bind(this);
    }

    componentDidMount() {
        this.setState({
            user_data: this.props.user,
            user_abilities: this.props.abilities,
            user_cars: this.props.cars,
            user_car_info: this.props.car_info
        });

        let auth = "Bearer ";
        let token = this.props.token;

        let task = null;
        let used_car_id = null;

        if (this.props.user != null) {
            this.props.checkIfUserRegisteredToTournament(this.props.token,this.props.user.user.id);
            if (this.props.user_task == null) {
                axios.get("http://127.0.0.1:8000/api/v1/getTaskByUserId/" + this.props.user.user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then((response) => {
                    task = response.data.success;
                    this.props.addTask({task});
                    this.setState({
                        current_task: task
                    })
                });
            } else {
                this.setState({
                    current_task: this.props.user_task
                });
            }

            if (this.props.active_car == null) {
                axios.get("http://127.0.0.1:8000/api/v1/getCarInUseId/" + this.props.user.user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then((response) => {
                    used_car_id = response.data.success.car_in_use;
                    this.props.addActiveCar({used_car_id});
                    this.setState({
                        used_car: used_car_id
                    });
                });
            } else {
                this.setState({
                    used_car: this.props.active_car
                })
            }
        }
    }
    
    handleTournament(event){
        let data = {
            'user_id' :this.props.user.user.id
        };
            
        this.props.registerToUsersTournament(this.props.token,data);
        window.location.reload();
    }

    handleRace(event){
        let data = {
            first_racer: this.props.user.user.id,
        }
        this.props.raceAction(this.props.token, data);
        this.setState({
            race: true
        });
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
        let ability = "";

        switch (event.currentTarget.id) {
            case "reaction":
                ability = 3;
                break;
            case "shifting":
                ability = 2;
                break;
            case "acceleration":
                ability = 1;
                break;
            case "mobility":
                ability = 4;
                break;
            default:
                break;
        }

        let auth = 'Bearer ';
        let token = this.props.token.toString();
        let user = null;
        let abilities = null;

        axios.post("http://127.0.0.1:8000/api/v1/updateUserAbilities", {
            userId: this.state.user_data.user.id,
            action: ability
        }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': auth + token
            }
        }).then(response => {
            axios.post("http://127.0.0.1:8000/api/v1/getUser", [], {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                user = response.data.success;
                this.props.addUser({user});

                axios.get("http://127.0.0.1:8000/api/v1/getUserAbilities/" + user.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    abilities = response.data.success;
                    this.props.addAbilities({abilities});

                });
            });
        });
        this.setState({
            user_data: user,
            user_abilities: abilities
        });
    }

    handleTask(event) {
        let auth = 'Bearer ';
        let token = this.props.token.toString();
        console.log('task_id');
        console.log(this.state.current_task.task.id);
        axios.post("http://127.0.0.1:8000/api/v1/getTaskReward", {
            user_id: this.state.user_data.user.id,
            task_id: this.state.current_task.task.id
        }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': auth + token
            }
        }).then(response => {
            this.setState({
                task_prize_received: true,
                current_task: null
            });
        });


    }

     renderTournamentButton(){
        if( this.props.user_tournament_status == 0)
            return  <button id={"tournament"} onClick={this.handleTournament}>Dalyvauti turnyrre</button> 
         else return <span>Dalyvaujate turnyre</span>;
    }

    createUserTask(event){
        let data = {
            'user_id' : this.props.user.user.id
        };

        this.props.addUserTask(this.props.token,data);
        this.setState({
            current_task: null
        });
        window.location.reload();
    }

    selectCar(event) {

        if (isNaN(event.currentTarget.id)) {

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
        } else {
            this.setState({
                select_car: true
            });


            this.state.user_cars.cars.map((car) => {

                if (car.vechile_id == event.currentTarget.id) {

                    let auth = "Bearer ";
                    let token = this.props.token;

                    axios.post("http://127.0.0.1:8000/api/v1/changeCarInUse", {
                        user_id: this.state.user_data.user.id,
                        car_id: car.id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        let id = car.id;
                        this.props.addActiveCar({id});
                        this.setState({
                            select_car: false,
                            used_car: {
                                used_car_id: car.id
                            }

                        });
                    });
                }
            })
        }
    }

    render() {
        function UserAbilities(props) {
            if (props.props != null) {

                let reaction_price = 1024 + (1024 * props.props.abilities.reaction);
                let shifting_price = 1024 + (1024 * props.props.abilities.shifting);
                let acceleration_price = 1024 + (1024 * props.props.abilities.acceleration);
                let mobility_price = 1024 + (1024 * props.props.abilities.mobility);

                return (
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td>{props.props.abilities.reaction}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"reaction"} onClick={props.handler}/></td>
                            <td>{reaction_price}$</td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td>{props.props.abilities.shifting}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"shifting"} onClick={props.handler}/></td>
                            <td>{shifting_price}$</td>
                        </tr>
                        <tr>
                            <td>Greitėjimas</td>
                            <td>{props.props.abilities.acceleration}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"acceleration"} onClick={props.handler}/></td>
                            <td>{acceleration_price}$</td>
                        </tr>
                        <tr>
                            <td>Manevringumas</td>
                            <td>{props.props.abilities.mobility}</td>
                             <td><FontAwesomeIcon icon={faPlus} id={"mobility"} onClick={props.handler}/></td>
                            <td>{mobility_price}$</td>
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

        function ActiveCar(props) {

            let used_car_id = null;

            if (props.used_car.used_car_id != null) {
                used_car_id = props.used_car.used_car_id;
            } else if (props.used_car.id != null) {
                used_car_id = props.used_car.id;
            }

            if (props.props != null && props.car_data != null && used_car_id != null) {

                let used_car = used_car_id;
                let cars = props.props.cars;
                let car_data = props.car_data;
                let used_car_info = null;

                cars.map((car) => {
                    if (car.id === used_car) {
                        car_data.map((data) => {
                            if (data.car_info.id == car.vechile_id) {
                                used_car_info = data.car_info;
                            }
                        });
                    }
                });
                if (used_car_info != null) {
                    return (
                        <div className={"select-car"}>
                            <img id={"active_car"} src={used_car_info.image_url} onClick={props.handler}
                                 alt={""}/>

                            <div>Pasirinktas automobilis</div>
                        </div>
                    );
                } else return null;
            } else {
                return null;
            }

        }

        function CarSelect(props) {
            let cars = props.props;

            if (cars != null) {
                return (<div className={"car-swap"}>
                    <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <table>
                        <thead>
                        <tr>
                            {
                                cars.map((car) => {
                                    return (
                                        <td id={car.car_info.id} onClick={props.handler}>
                                            <div><img src={car.car_info.image_url} alt={""}/></div>
                                            <div>{car.car_info.title}</div>
                                        </td>
                                    );
                                })
                            }
                        </tr>
                        </thead>
                    </table>
                </div>);
            } else {
                return (
                    <div className={"car-swap"}>
                        <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <table>
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                        </table>
                    </div>
                );
            }
        }

       

        function UserTask(props) {
            let task = props.props.task;
            if (task != null) {
                return (
                    <div className={"user-task"}>
                        <span className={"task-title"}>Užduotis</span>
                        <span className={"task-info"}>Laimėk {task.required_races} k.</span>
                        <ProgressBar className={"task-progress"}
                                     now={task.races_count / task.required_races * 100}/>{task.races_count + '/' + task.required_races}
                        <span className={"task-prize"}>Prizas: {task.prize_cash}$ {task.prize_exp}XP</span>
                        {taskButton}
                    </div>
                );
            } else return (null);
        }


        let user_name = this.state.user_data != null ? this.state.user_data.user.name : " ";
        let user_level = this.state.user_data != null ? this.state.user_data.user.level + " lygis" : " ";
        let user_cash = this.state.user_data != null ? this.state.user_data.user.cash + " $" : " ";
        let user_credits = this.state.user_data != null ? this.state.user_data.user.credits : " ";
        let user_xp = this.state.user_data != null ? this.state.user_data.user.experience : " ";
        let next_lvl = this.state.user_data != null ? this.state.user_data.user.next_level_exp : "";


        let task_progress = null;

        try {
            if (this.state.current_task.task != null) {
                task_progress = this.state.current_task.task;
            }

        } catch {
            if (this.state.current_task != null) {
                task_progress = this.state.current_task;
            }
        }
        
        let task_complete = task_progress != null && task_progress.races_count == task_progress.required_races ? true : false;

        let taskButton = task_complete && this.state.task_prize_received != true ?
            <button className={"task-btn"} id={"task"} onClick={this.handleTask}>Atsiimti</button> :
            <button className={"task-btn-disabled"} id={"task"} disabled={true}>Atsiimti</button>;

        let selectCar = this.state.select_car ?
            <CarSelect props={this.state.user_car_info} handler={this.selectCar.bind(this)}/> : null;

        let activeCar = this.state.used_car !== "" && this.state.select_car == false ?
            <ActiveCar props={this.state.user_cars} car_data={this.state.user_car_info} used_car={this.state.used_car}
                       handler={this.selectCar.bind(this)}/> : null;

        let abilities = this.state.user_abilities != null ?
            <UserAbilities props={this.state.user_abilities} handler={this.buyAbility}/> : null;

        let user_task = this.state.current_task != null && this.state.task_prize_received != null?
            <UserTask props={this.state.current_task} state={this.state}/> :  <button className={"task-btn"} onClick={this.createUserTask}>Gauti užduotį</button>;

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
                                <td><ProgressBar className={"xp-bar"}
                                                 now={user_xp / next_lvl * 100}/>{user_xp + '/' + next_lvl}XP
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
                    {user_task}
                </div>

                <div className={"go-race"}>
                    <div>Gatvės laukia tavęs</div>
                    <div className={"race-options"}>

                        {activeCar}
                    {this.state.user_data != null ? this.state.user_data.user.name : " "}
                        <div className={"select-race"}>
                            <div>Lenktynių ilgis</div>
                            <span id={"1/4"} style={{color: "red"}} onClick={this.handleClick}>1/4 mylios</span>
                            <button id={"race"} onClick={this.handleRace}>Lenktyniauti</button>
                            {this.renderTournamentButton()}
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
