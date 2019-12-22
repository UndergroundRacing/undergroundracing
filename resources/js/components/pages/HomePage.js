import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../css/styles.css';
import '../css/home.css';

import UserPhoto from '../img/user_photo.jpg';
import R34 from '../img/R34.png';
import Evo9 from '../img/Evo9.png';
import S13Hatch from '../img/S13Hatch.png';
import S15 from '../img/S15.png';

import Race from '../pages/Race';

//import '../css/mobile.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            race: false,
            task_comp: false,
            race_type: "1/4",
            select_car: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.selectCar = this.selectCar.bind(this);
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

    selectCar(event) {
        console.log(event.target.id);
        switch (event.target.id) {
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


        let taskButton = this.state.task ?
            <button className={"task-btn"} id={"task"} onClick={this.handleClick}>Atsiimti</button> :
            <button className={"task-btn-disabled"} id={"task"} disabled={true}>Atsiimti</button>;

        /*let raceType = this.state.race_type === "1/4" ?
            [<span id={"1/4"} style={{color: "red"}} onClick={this.handleClick}>1/4 mylios</span>,
                <span id={"1/2"} onClick={this.handleClick}>1/2 mylios</span>] :
            [<span id={"1/4"} onClick={this.handleClick}>1/4 mylios</span>,
                <span id={"1/2"} style={{color: "red"}} onClick={this.handleClick}>1/2 mylios</span>];*/

        let selectCar = this.state.select_car ? <CarSelect handler={this.selectCar.bind(this)}/> : null;

        function CarSelect(props, handler) {
            return (<div className={"car-swap"}>
                <button id={"back"} onClick={props.handler}><i id={"back_arrow"} className="fa fa-arrow-circle-left"/>
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
                                <td><ProgressBar className={"xp-bar"} now={70} label={`7777777777/999999999 XP`}/></td>
                            </tr>
                            <tr>
                                <td>Pinigai:</td>
                                <td>$100000000</td>
                            </tr>
                            <tr>
                                <td>Kreditai:</td>
                                <td>150000</td>
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
                        <span id={"user-name"}>The Stig</span>
                        <span id={"user-level"}>99 lygis</span>
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
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td>+5</td>
                            <td><i id={"add-skill"} className="fa fa-plus-square"/></td>
                            <td>5000$</td>
                        </tr>
                        <tr>
                            <td>Auto žinios</td>
                            <td>+10</td>
                            <td><i id={"add-skill"} className="fa fa-plus-square"/></td>
                            <td>10000$</td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td>+7</td>
                            <td><i id={"add-skill"} className="fa fa-plus-square"/></td>
                            <td>7500$</td>
                        </tr>
                        </thead>
                    </table>
                    </span>
                </div>
            </div>);
        }
    }
}

export default HomePage;