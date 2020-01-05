import React from "react";
import '../css/styles.css';
import '../css/summary.css';
import axios from "axios";
import {addUser} from "../store/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.user_info,
        token: state.token
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => dispatch(addUser(user))
    };
}

class Summary extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            vehicle_count: null,
            parts_count: null,
            races_count: null,
            races_win_count: null,
            win_percent: null
        });
    }

    componentDidMount() {
        this.setState({
            user_data: this.props.user
        });

        let auth = "Bearer ";
        let token = this.props.token;

        if (this.props.user != null) {
            if (this.props.user_task == null) {
                axios.get("http://127.0.0.1:8000/api/v1/getUserReport/" + this.props.user.user.id, {
                    headers: {
                        'success': 'application/json',
                        'Authorization': auth + token
                    }
                }).then((response) => {
                    let summary_info = response.data.success;
                    this.setState({
                        parts_count: summary_info.parts_count,
                        races_count: summary_info.races_count,
                        races_win_count: summary_info.races_win_count,
                        vehicle_count: summary_info.vehicle_count,
                        win_percent: summary_info.win_percent
                    })
                });
            }
        }
    }

    render() {

        let vehicle_count = this.state.vehicle_count != null ? this.state.vehicle_count + " automobiliai" : " ";
        let parts_count = this.state.parts_count != null ? this.state.parts_count + " dalys" : " ";
        let races_count = this.state.races_count != null ? this.state.races_count + " lenktynės" : " ";
        let races_win_count = this.state.races_win_count != null ? this.state.races_win_count + " laimėjimai" : " ";
        let win_percent = this.state.win_percent != null ? this.state.win_percent + " %" : " ";

        return (<div className={"summary"}>
            <div className={"title"}>Vartotojo {this.props.user.user.username} suvestinė</div>
            <ul className={"content"}>
                <li>Turimų automobilių skaičius: <span>{vehicle_count}</span></li>
                <li>Turimų dalių skaičius: <span>{parts_count}</span></li>
                <li>Lenktyniauta kartų: <span>{races_count}</span></li>
                <li>Laimėta lenktynių: <span>{races_win_count}</span></li>
                <li>Laimėjimo %: <span>{win_percent}</span></li>
            </ul>
        </div>);
    }
}

const Summary_page = connect(mapStateToProps, mapDispatchToProps)(Summary);
export default Summary_page;
