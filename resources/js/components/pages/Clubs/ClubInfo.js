import React from "react";
import {connect} from "react-redux";
import {getClub,deleteClub,getUser,registerClubToTournament,removeUserFromClub} from "../../store/actions";
class ClubInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            clubs:null
        });
        this.destroyClub = this.destroyClub.bind(this);
        this.registerToTournament = this.registerToTournament.bind(this);
        this.removeUserFromClub= this.removeUserFromClub.bind(this);
    }

    removeUserFromClub(event){

        var data = {
            'user_id' : event.target.value
        };

        this.props.removeUserFromClub(this.props.token,data);
        window.location.reload();
    }

    registerToTournament(event){
        var data = {
            'user_id' : this.props.user.user.id,
            'club_id' : this.props.clubs.club.id
        };
        this.props.registerClubToTournament(this.props.token,data);
    }

    destroyClub(event){
        var data = {
            'user_id' : this.props.user.user.id,
            'club_id' : this.props.clubs.club.id
        };

        this.props.deleteClub(this.props.token,data);
        event.preventDefault();
        this.props.getUser(this.props.token);
        window.location.reload();
    }

    componentDidMount(){
        console.log('swx');
        console.log(this.props);
        this.props.getClub(this.props.token,this.props.user.user.id);
    }

    componentDidUpdate(){
        console.log('updated');
        console.log(this.props);
    }

    removeUserBtn(id){
        if(this.props.user.user.id == this.props.clubs.club.owner_id && id != this.props.clubs.club.owner_id){
            return <button id="removeUserFromClub" className={"submit"} onClick={this.removeUserFromClub} value={id}>Šalinti</button>;
        }
    }

    renderUsers(){
        const listItems =  this.props.clubs.users.map((user) =>
        <tr>
            <td>{user.username}</td>
            <td>{user.level}</td>
            <td>{this.removeUserBtn(user.id)}</td>
        </tr>
    );
    return listItems;
    }

    renderButtons(){
        if(this.props.user.user.id == this.props.clubs.club.owner_id){
            var registerBtn =  <button id="registerToTournament" className={"submit"} onClick={this.registerToTournament}>Registruoti į turnyrą</button>;
            var registeredMsg = <span className={"registered"}>Užregistruota į klubų turnyrą!</span>
            var showRegBtn= this.props.clubs.club.isRegisteredToTournament != 0 ? registerBtn : registeredMsg;
            return(
                <div>
                    {showRegBtn}
                    <button id="deleteClub" className={"submit"} onClick={this.destroyClub}>Šalinti klubą</button>
                </div>
            );
        }
        else{
            return(
                <div>
                    <button id="leaveClub" className={"submit"} onClick={this.removeUserFromClub} value={this.props.user.user.id}>Palikti klubą</button>
                </div>
            );
        }
    }
    
    renderClub(){
        return(
            <div>
                <div className={"club"}>
                    <span className={"club-name"}>{this.props.clubs.club.title}</span>
                    <div className={"row club-wrapper"}>
                        <div className="col-lg-4">
                            <span className={"club-points"}>Taškai: {this.props.clubs.club.points}</span>
                        </div>
                        <div className="col-lg-4">
                             <span className={"club-members-count"}>Nariu skaicius: {this.props.clubs.usersCount}/27</span>
                         </div>
                         <div className="col-lg-4">
                            {this.renderButtons()}
                         </div>
                    </div>
                    
                    <div className={"club-members"}>
                            <table className="table table-club">
                                <thead>
                                    <tr>
                                        <th scope="col">Vardas</th>
                                        <th scope="col">Lygis</th>
                                        
                                    </tr>
                               
                                </thead>
                                <tbody>
                                    {this.renderUsers()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>  
        );
    }

    render() {

        return (<div>
            {this.renderClub()  }
        </div>);
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token:state.token,
        user:state.user_info,
        clubs:state.club
    };
};

const ClubInfoComponent = connect(mapStateToProps,{getClub,deleteClub,getUser,registerClubToTournament,removeUserFromClub})(ClubInfo);
export default ClubInfoComponent;
