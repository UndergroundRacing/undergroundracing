import React from "react";
import '../css/styles.css';
import '../css/race.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered, faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import UserPhoto from '../img/user_photo.jpg';
import DefaultUser from '../img/default_user.jpg';
import EVO9 from '../img/Evo9.png';
import R34 from '../img/R34.png';
import Engine from "../icons/Engine.svg";
import Power from "../icons/Power.svg";
import {getPlayer} from "../store/actions";
import Torque from "../icons/Torque.svg";
import Weight from "../icons/Weight.svg";

class Race extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            race:this.props.race,
        });
        this.handleRaceEnd = this.handleRaceEnd.bind(this);
    }

    componentDidUpdate(){
        console.log(this.state);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            race: nextProps.race
        });
        console.log(this.state);
    }

    handleRaceEnd(event){
        
        this.props.getPlayer(this.props.token);
        event.preventDefault();
        window.location.reload();
    }

    checkIfWinner(){
        let status = '';
        if(this.state.race != null){
            if(this.state.race.status == 1)
            {
                 status = "Laimeta";
            }
            else{
                status = "Pralaimėta";
            }
    
            return (
                <div>
                    <span className={"winner-tag"}><FontAwesomeIcon icon={faFlagCheckered}/>{status}<FontAwesomeIcon icon={faFlagCheckered}/></span>
                </div>
                
            ); 
        }

    }

    renderRace(){
        if(this.state.race != null){
            return(
            <div>
            <div className={"race"}>
            <span className={"racer winner"}>
                {this.checkIfWinner()}
                <div className={"racer-info"}>
                    <img src={UserPhoto} alt={"user-photo"}/>
                    <span>{this.props.user.user.username}</span>
                    <span><FontAwesomeIcon icon={faLevelUpAlt}/> {this.props.user.user.level}</span>
                </div>
    
                <div className={"racer-car"}>
                    <img src={this.state.race.car_in_use.firstRacer.image_url} alt={"R34"}/>
                    <span className={"car-stats"}>
                        <div>{this.state.race.car_in_use.firstRacer.title}</div>
                        <div><img src={Engine} alt={"Engine"}/> {this.state.race.specifications.firstRacerSpecifications.liter} L</div>
                        <div><img src={Power} alt={"Power"}/> {this.state.race.specifications.firstRacerSpecifications.power} HP</div>
                        <div><img src={Weight} alt={"Weight"}/> {this.state.race.specifications.firstRacerSpecifications.weight} KG</div>
                    </span>
                </div>
    
                <table className={"race-results"}>
                    <thead>
                    <tr>
                        <td><span>1/4 mile</span></td>
                        <td>{this.state.race.times.firstRacer}</td>
                    </tr>
                    </thead>
                </table>
    
            </span>
    
                <span className={"racer"}>
                <div className={"racer-info"}>
                    <img src={DefaultUser} alt={"user-photo"}/>
                    <span>{this.state.race.opponent_info.username}</span>
                    <span><FontAwesomeIcon icon={faLevelUpAlt}/> {this.state.race.opponent_info.level}</span>
                </div>
    
                <div className={"racer-car"}>
                    <img src={this.state.race.car_in_use.secondRacer.image_url}  alt={"EVO9"}/>
                    <span className={"car-stats"}>
                        <div>{this.state.race.car_in_use.firstRacer.title}</div>
                        <div><img src={Engine} alt={"Engine"}/> {this.state.race.specifications.secondRacerSpecifications.liter} L</div>
                        <div><img src={Power} alt={"Power"}/> {this.state.race.specifications.secondRacerSpecifications.power} HP</div>
                        <div><img src={Weight} alt={"Weight"}/> {this.state.race.specifications.secondRacerSpecifications.weight} KG</div>
                    </span>
                </div>
    
                <table className={"race-results"}>
                    <thead>
                    <tr>
                        <td><span>1/4 mile</span></td>
                        <td>{this.state.race.times.secondRacer}</td>
                    </tr>
                    </thead>
                </table>
    
            </span>
    
            </div>
            <button className={"race-btn"} onClick={this.handleRaceEnd}>Tęsti</button>
            </div>);
        }
      
    }
    render() {

        //let winner = <span className={"winner-tag"}><FontAwesomeIcon icon={faFlagCheckered}/>Laimėtojas<FontAwesomeIcon icon={faFlagCheckered}/></span>;

        return (<div>
            {this.renderRace()}
        </div>);
    }


}

const mapStateToProps = state => {
    return {
        user: state.user_info,
        token: state.token,
        race: state.race,
    };
};
const RaceComponent = connect(mapStateToProps,{getPlayer})(Race);
export default RaceComponent;
