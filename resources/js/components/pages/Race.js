import React from "react";
import '../css/styles.css';
import '../css/race.css';

import UserPhoto from '../img/user_photo.jpg';
import DefaultUser from '../img/default_user.jpg';
import EVO9 from '../img/Evo9.png';
import R34 from '../img/R34.png';
import Engine from "../icons/Engine.svg";
import Power from "../icons/Power.svg";
import Torque from "../icons/Torque.svg";
import Weight from "../icons/Weight.svg";

class Race extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({});
    }

    render() {

        let winner = <span className={"winner-tag"}><i className="fa fa-trophy"/>Laimėtojas<i className="fa fa-trophy"/></span>;

        return (<div>
            <div className={"race"}>
            <span className={"racer winner"}>
                {winner}
                <div className={"racer-info"}>
                    <img src={UserPhoto} alt={"user-photo"}/>
                    <span>The Stig</span>
                    <span><i className="fa fa-level-up"/> 99</span>
                </div>

                <div className={"racer-car"}>
                    <img src={R34} alt={"R34"}/>
                    <span className={"car-stats"}>
                        <div>Nissan Skyline GT-R R34</div>
                        <div><img src={Engine} alt={"Engine"}/> 2.6 RB26DETT</div>
                        <div><img src={Power} alt={"Power"}/> 327 HP</div>
                        <div><img src={Torque} alt={"Torque"}/> 289 LB-FT</div>
                        <div><img src={Weight} alt={"Weight"}/> 1560KG</div>
                    </span>
                </div>

                <table className={"race-results"}>
                    <thead>
                    <tr>
                        <td><span>0-100 KM/H</span></td>
                        <td>5.1 s</td>
                    </tr>

                    <tr>
                        <td><span>1/4 mile</span></td>
                        <td>13.50 s</td>
                    </tr>
                    </thead>
                </table>

            </span>

            <span className={"racer"}>
                <div className={"racer-info"}>
                    <img src={DefaultUser} alt={"user-photo"}/>
                    <span>Racer</span>
                    <span><i className="fa fa-level-up"/> 45</span>
                </div>

                <div className={"racer-car"}>
                    <img src={EVO9} alt={"EVO9"}/>
                    <span className={"car-stats"}>
                        <div>Mitsubishi Lancer Evolution IX</div>
                        <div><img src={Engine} alt={"Engine"}/> 2.0 4G63</div>
                        <div><img src={Power} alt={"Power"}/> 280 HP</div>
                        <div><img src={Torque} alt={"Torque"}/> 295 LB-FT</div>
                        <div><img src={Weight} alt={"Weight"}/> 1465KG</div>
                    </span>
                </div>

                <table className={"race-results"}>
                    <thead>
                    <tr>
                        <td><span>0-100 KM/H</span></td>
                        <td>5.3 s</td>
                    </tr>

                    <tr>
                        <td><span>1/4 mile</span></td>
                        <td>13.81 s</td>
                    </tr>
                    </thead>
                </table>

            </span>

        </div>
            <button className={"race-btn"}>Tęsti</button>
        </div>);
    }


}

export default Race;