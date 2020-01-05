import React from "react";
import '../css/styles.css';
import '../css/club.css';
import UserPic from '../img/default_user.jpg';
import CreateClub from './Clubs/CreateClub';
import ClubInfo from './Clubs/ClubInfo';
import NoClub from './Clubs/NoClub';
import {connect} from "react-redux";
import {getClub} from "../store/actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

class Club extends React.Component {
    constructor(props) {
        super(props);
    }

    renderPage(){
        if(this.props.clubs.club == null){
            return(
                <div>
                    <NoClub/>
                </div>
            );
        }
        else{
            return(
                <div>
                    <ClubInfo/>
                </div>
            );
        }
    }

    componentDidMount(){
        this.props.getClub(this.props.token,this.props.user.user.id);
    }

    componentDidUpdate(){
        console.log(this.props);
    }

    render() {
        return (<div className={"container"}>
               <div className={"row"}>
                    <div className={"col-lg-12"}>
                     {this.renderPage()}
                    </div>
               </div>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        user:state.user_info,
        token:state.token,
        clubs:state.club
    };
};

const ClubComponent = connect(mapStateToProps,{getClub})(Club);
export default ClubComponent;
