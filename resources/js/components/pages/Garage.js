import React from 'react';
import '../css/styles.css';
import '../css/garage.css';

import R34 from "../img/R34.png";
import Evo9 from "../img/Evo9.png";
import S15 from "../img/S15.png";
import RB26DETT from "../img/RB26DETT.png";
import Engine from "../icons/Engine.svg";
import Power from "../icons/Power.svg";
import Torque from "../icons/Torque.svg";
import Drivetrain from "../icons/Drivetrain.svg";
import Speed from "../icons/Speed.svg";
import Acceleration from "../icons/Acceleration.svg";
import Weight from "../icons/Weight.svg";
import Turbo from "../img/Turbo.png";
import Tire from "../img/Tire.png";
import Brakes from "../img/Brakes.png";
import Nitrous from "../img/Nitrous.png";

import GTX3582R from "../img/GTX3582R.png";
import T04Z from "../img/T04Z.png";
import GTX3071II from "../img/GTX3071 Gen2.png";

class Garage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            upgrade_car: false,
            car_id: "",
            part_swap: false,
            part_category: ""
        };

        this.selectCar = this.selectCar.bind(this);
        this.openParts = this.openParts.bind(this);
        this.selectPart = this.selectPart.bind(this);
    }

    selectCar(event) {
        this.setState({
            upgrade_car: true,
            car_id: event.target.id
        });
    }

    openParts(event) {
        console.log(event.target);
        this.setState({
            part_swap: true,
            part_category: event.target.id
        });
    }

    selectPart(event) {
        if (event.target.id === "back" || event.target.id === "back_arrow") {
            this.setState({
                part_swap: false,
                part_category: ""
            });
        }
    }

    render() {

        function PartUpgrade(props, handler) {
            console.log(props);
            return (<div className={"parts-swap"}>
                <button id={"back"} onClick={props.handler}><i id={"back_arrow"} className="fa fa-arrow-circle-left"/>
                </button>
                <table>
                    <thead>
                    <tr>
                        <td><img src={GTX3582R} alt={"GTX3582R"}/></td>
                        <td><img src={GTX3071II} alt={"GTX3071II"}/></td>
                        <td><img src={T04Z} alt={"T04Z"}/></td>
                    </tr>
                    <tr>
                        <td>GARRETT <br/> GTX3582R</td>
                        <td>GARRET <br/> GTX3071 Gen II</td>
                        <td>GARRET <br/> T04Z</td>
                    </tr>
                    </thead>
                </table>

            </div>);
        }

        let upgrade = this.state.part_swap ? <PartUpgrade handler={this.selectPart.bind(this)}/> : null;

        if (this.state.upgrade_car) {
            return (<div className={"car-upgrade"}>
                <span className={"item-title"}>Nissan Skyline R34 GT-R</span>
                <div className={"car-info"}>
                    <img src={R34} alt={"Nissan Skyline GT-R R34"}/>
                    <table>
                        <thead>
                        <tr>
                            <td><img src={Engine} alt={"Engine"}/></td>
                            <td>2.6L RB26DETT I6</td>
                            <td><img src={Power} alt={"Power"}/></td>
                            <td>327HP / 244KW</td>
                            <td><img src={Torque} alt={"Torque"}/></td>
                            <td>289LB-FT / 392Nm</td>
                            <td><img src={Drivetrain} alt={"Drivetrain"}/></td>
                            <td>4WD</td>
                        </tr>
                        <tr>
                            <td><img src={Speed} alt={"Speed"}/></td>
                            <td>265 KM/H</td>
                            <td><img src={Acceleration} alt={"Acceleration"}/></td>
                            <td>4.8 s</td>
                            <td><img src={Weight} alt={"Weight"}/></td>
                            <td>1560 Kg</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className={"car-parts"}>
                    <span>Automobilio detalės</span>
                    <table>
                        <thead>
                        <tr>
                            <td>Variklis</td>
                            <td>Turbina</td>
                            <td>Padangos</td>
                            <td>Stabdžiai</td>
                            <td>N2O</td>
                        </tr>
                        <tr>
                            <td><img id={"engine"} src={RB26DETT} alt={"RB26DETT"} onClick={this.openParts}/></td>
                            <td><img id={"turbo"} src={Turbo} alt={"Turbo"} onClick={this.openParts}/></td>
                            <td><img id={"tire"} src={Tire} alt={"Tire"} onClick={this.openParts}/></td>
                            <td><img id={"brakes"} src={Brakes} alt={"Brakes"} onClick={this.openParts}/></td>
                            <td><img id={"nitrous"} src={Nitrous} alt={"N2O"} onClick={this.openParts}/></td>
                        </tr>
                        <tr>
                            <td>RB26DETT</td>
                            <td>Stanadrtinė</td>
                            <td>Standartinė</td>
                            <td>Standartinė</td>
                            <td>Standartinė</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                {upgrade}
            </div>);
        } else {
            return (<div className={"garage"}>
                    <div className={"garage-content"}>
                        <table id={"R34"} className={"garage-item"} onClick={this.selectCar}>
                            <thead>
                            <tr>
                                <td><img src={R34} alt={"Nissan Skyline GT-R R34"}/></td>
                                <td><span className={"item-title"}>Nissan <br/>Skyline R34 GT-R</span></td>
                            </tr>
                            </thead>
                        </table>
                        <table id={"EVO9"} className={"garage-item"} onClick={this.selectCar}>
                            <thead>
                            <tr>
                                <td><img src={Evo9} alt={"Mitsubishi Lancer Evolution IX"}/></td>
                                <td><span className={"item-title"}>Mitsubishi <br/>Lancer Evolution IX</span></td>
                            </tr>
                            </thead>
                        </table>
                        <table id={"S15"} className={"garage-item"} onClick={this.selectCar}>
                            <thead>
                            <tr>
                                <td><img src={S15} alt={"Nissan Silvia S15"}/></td>
                                <td><span className={"item-title"}>Nissan <br/> Silvia S15</span></td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default Garage;