import React from "react";
import CreateClub from "./CreateClub";
import {connect} from "react-redux";
import {getClubInvitations,joinClub} from "../../store/actions";
class NoClub extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            create_club: 0,
        });
        this.handleClick = this.handleClick.bind(this);
        this.joinClub= this.joinClub.bind(this);
    }

    joinClub(event){
        let data = {
            'user_id' : this.props.user.user.id,
            'club_id' : event.target.value
        };

        this.props.joinClub(this.props.token,data);
        window.location.reload();
    }
    handleClick(event) {
        this.setState({
            create_club: 1
        });
    }
    componentDidMount(){
        this.props.getClubInvitations(this.props.token,this.props.user.user.id);
    }

    componentDidUpdate(){
        console.log('updated!!');
        console.log(this.props);
    }

    renderClubInvitations(){
        if(this.props.club_invitations !=null){
            const listItems =  this.props.club_invitations.map((club) =>
            <tr>
                <td>{club.club_name}</td>
                <td><button className={"join-club"} onClick={this.joinClub} value={club.club_id}>Istoti</button></td>
            </tr>
        );
        return listItems;
        }

    }

    renderHasNoClub(){
        return(
            <div className={"no-club-club-wrapper"}>
                <div className={"no-club"}>
                <p>Jūs dar neturite klubo!</p>
                <p>Galite įstoti į šiuos klubus:</p>
                <table className="table table-club">
                                <thead>
                                    <tr>
                                        <th scope="col">Pavadinimas</th>
                                        <th scope="col">Įstoti</th>
                                    </tr>
                               
                                </thead>
                                <tbody>
                                    {this.renderClubInvitations()}
                                </tbody>
                            </table>
                </div>
                <div className={"create-club"}>
                    <p>Sukurkite savo( kaina 10000):</p>
                    <button id="createClub" onClick={this.handleClick}>Kurti</button>
                </div>
            </div>
        );
    }

    renderPage(){
        if(this.state.create_club == 0){
            return (
                <div>
                    {this.renderHasNoClub()}
                </div>
            );
        }
        else{
            return (
                <div>
                   <CreateClub/>
                </div>
            );
        }
    }

        
    render() {

        return (<div>
            {this.renderPage()}
        </div>);
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token:state.token,
        user:state.user_info,
        clubs:state.club,
        club_invitations:state.club_invitations
    };
};

const NoClubComponent = connect(mapStateToProps,{getClubInvitations,joinClub})(NoClub);
export default NoClubComponent;
