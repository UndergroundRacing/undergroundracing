import React from 'react';
import '../css/styles.css';
import '../css/shop.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCar, faWrench} from "@fortawesome/free-solid-svg-icons";

import R34 from '../img/R34.png';
import Evo9 from '../img/Evo9.png';
import Evo5 from '../img/Evo5.png';
import Supra from '../img/SupraMK4.png';
import S13Hatch from '../img/S13Hatch.png';
import S15 from '../img/S15.png';
import Golf7R from '../img/Golf7R.png';
import M3E92 from '../img/M3E92.png';
import RS6Avant from '../img/RS6Avant.png';

import Engine from '../icons/Engine.svg';
import Power from '../icons/Power.svg';
import Torque from '../icons/Torque.svg';
import Drivetrain from '../icons/Drivetrain.svg';
import Speed from '../icons/Speed.svg';
import Acceleration from '../icons/Acceleration.svg';
import Weight from '../icons/Weight.svg';
import axios from "axios";
import {addCarShop} from "../store/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        shop_cars: state.shop_cars
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addCarShop: car_shop => dispatch(addCarShop(car_shop)),
    };
}

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: true,
            parts: false,
            view_item: false,
            item_id: "",
            item: null,
            shop_cars: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.shop_cars == null) {
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            };

            let auth = 'Bearer ';
            let token = this.props.token.toString();

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/6", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                let shop_cars = response.data.success;

                this.props.addCarShop({shop_cars});
                this.setState({
                    shop_cars: shop_cars
                });
            });
        } else {
            this.setState({
                shop_cars: this.props.shop_cars
            });
        }
    }

    handleClick(event) {
        switch (event.currentTarget.id) {
            case "cars":
                this.setState({
                    cars: true,
                    parts: false
                });
                break;
            case "parts":
                this.setState({
                    cars: false,
                    parts: true
                });
                break;
            default:
                this.setState({
                    cars: false,
                    parts: false,
                    view_item: true,
                    item_id: event.target.id
                });
                break;
        }
    }


    render() {

        function LoadCars(props) {
            console.log("Car shop", props.props);

            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}> 60000$ </span>
                <button id={"R34"}>Plačiau</button>
            </div>);


        }

        let cars = this.state.cars ?
            <span id={"cars"} style={{color: "red"}} onClick={this.handleClick}><FontAwesomeIcon icon={faCar}/> Automobiliai</span> :
            <span id={"cars"} onClick={this.handleClick}><FontAwesomeIcon icon={faCar}/> Automobiliai</span>;
        let parts = this.state.parts ?
            <span id={"parts"} style={{color: "red"}} onClick={this.handleClick}><FontAwesomeIcon icon={faWrench}/> Dalys</span> :
            <span id={"parts"} onClick={this.handleClick}><FontAwesomeIcon icon={faWrench}/> Dalys</span>;

        let car_shop = this.state.shop_cars != null ? this.state.shop_cars.map((car) => <LoadCars props={car}/>) : null;

        if (this.state.cars) {
            return (<div className={"shop"}>
                    <div className={"shop-menu"}>
                        {cars}
                        {parts}
                    </div>
                    <div className={"shop-content"}>
                        {car_shop}
                    </div>
                </div>
            );
        } else if (this.state.parts) {
            return (<div className={"shop"}>
                    <div className={"shop-menu"}>
                        {cars}
                        {parts}
                    </div>
                    <div className={"shop-content"}>


                    </div>
                </div>
            );
        } else if (this.state.view_item) {
            return (<div className={"shop"}>
                <div className={"shop-menu"}>
                    {cars}
                    {parts}
                </div>
                <div className={"item-info"}>
                    <span className={"item-title"}>Nissan Skyline GT-R R34</span>
                    <img id={"item-img"} src={R34} alt={"Skyline R34"}/>
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
                    <span className={"item-price"}>60000$</span>
                    <button id={"R34"}>Pirkti</button>
                </div>
            </div>);
        }
    }
}

const ShopPage = connect(mapStateToProps, mapDispatchToProps)(Shop);
export default ShopPage;
