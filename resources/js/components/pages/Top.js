import React from "react";
import '../css/styles.css';
import '../css/top.css';
import {connect} from "react-redux";
import UserPage from "./UserPage";
import {getTops,addUserToSearch} from "../store/actions";

class Top extends React.Component {
    constructor(props) {
        super(props);

        this.state=({
            showUser: 0
        });
        this.handleClickOnUser= this.handleClickOnUser.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
        this.props.getTops(this.props.token);
    }

    handleClickOnUser(id){
        console.log(id.target.value);
        this.props.addUserToSearch(id.target.value);
        this.setState({
            showUser : 1
        });
    }

    renderUsersTop(){
        var i=1;
        if(this.props.tops != null){
            const listItems =  Object.values(this.props.tops.users).map((user) =>
            <tr>
                <td>{i++}</td>
                <td><button value={user.id} className={"user-btn"} onClick={this.handleClickOnUser}>{user.username}</button></td>
                <td>{user.experience}</td>
                <td>{user.level}</td>
                <td>{user.cups}</td>
            </tr>
    );
        return listItems;
        }

    }
    
    renderClubsTop(){
        var i = 1;
        if(this.props.tops != null){
            const listItems =  Object.values(this.props.tops.clubs).map((club) =>
            <tr>
                <td>{i++}</td>
                <td>{club.title}</td>
                <td>{club.points}</td>
            </tr>
    );

    return listItems;
        }

    }

    renderUserPage(){
        if(this.state.showUser == 1){
          return <UserPage/>
        }
    }
    render() {

        return (
            <div>
            {this.renderUserPage()}
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-6"}>
                        <div className={"title"}>
                            <span className={"top-heading"}>Vartotoju Top 10</span>
                        </div>
                        
                        <table className="table table-club">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Vardas</th>
                                        <th scope="col">Patirtis</th>
                                        <th scope="col">Lygis</th>
                                        <th scope="col">Taures</th>
                                    </tr>
                               
                                </thead>
                                <tbody>
                                    {this.renderUsersTop()}
                                </tbody>
                            </table>
                    </div>
                    <div className={"col-lg-6 col-clubs"}>
                    <div className={"title"}>
                        <span className={"top-heading"}>Klubu Top 10</span>
                    </div>
                    
                      <table className="table table-club">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Pavadinimas</th>
                                        <th scope="col">Taškai</th>
                                    </tr>
                               
                                </thead>
                                <tbody>
                                 {this.renderClubsTop()}
                                </tbody>
                            </table>
                    </div>  
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user:state.user_info,
        token:state.token,
        tops:state.tops
    };
};

const TopComponent = connect(mapStateToProps,{getTops,addUserToSearch})(Top);
export default TopComponent;