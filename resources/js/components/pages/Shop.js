import React from 'react';
import '../css/styles.css';
import '../css/shop.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCar, faWrench} from "@fortawesome/free-solid-svg-icons";

import Engine from '../icons/Engine.svg';
import Power from '../icons/Power.svg';
import Torque from '../icons/Torque.svg';
import Drivetrain from '../icons/Drivetrain.svg';
import Speed from '../icons/Speed.svg';
import Acceleration from '../icons/Acceleration.svg';
import Weight from '../icons/Weight.svg';
import axios from "axios";
import {
    addBrakesShop, addCarInfo,
    addCars,
    addCarShop,
    addEngineShop,
    addNitrousShop,
    addTireShop,
    addTurboShop, clearUserCarInfo, clearUserCars
} from "../store/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        shop_cars: state.car_shop,
        shop_parts: state.part_shop,
        cars: state.user_cars,
        car_info: state.user_car_info
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addCarShop: car_shop => dispatch(addCarShop(car_shop)),
        addEngineShop: engine_shop => dispatch(addEngineShop(engine_shop)),
        addTurboShop: turbo_shop => dispatch(addTurboShop(turbo_shop)),
        addBrakesShop: brake_shop => dispatch(addBrakesShop(brake_shop)),
        addTiresShop: tire_shop => dispatch(addTireShop(tire_shop)),
        addNitrousShop: nitrous_shop => dispatch(addNitrousShop(nitrous_shop)),
        addCars: cars => dispatch(addCars(cars)),
        addCarInfo: car_info => dispatch(addCarInfo(car_info)),
        clearUserCars: () => dispatch(clearUserCars()),
        clearUserCarInfo: () => dispatch(clearUserCarInfo())
    };
}

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: true,
            parts: false,
            view_item: false,
            item_type: null,
            item: null,
            car_shop: null,
            part_shop: {
                engines: null,
                turbos: null,
                brakes: null,
                tires: null,
                nitrous: null
            }
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
    }

    componentDidMount() {
        let auth = 'Bearer ';
        let token = this.props.token.toString();

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
                    car_shop: shop_cars
                });
            });
        } else {
            this.setState({
                car_shop: this.props.shop_cars.shop_cars
            });
        }

        if (this.props.shop_parts.engines == null) {

            let engines = null;
            let turbos = null;
            let tires = null;
            let brakes = null;
            let nitrous = null;

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/1", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                engines = response.data.success;
                this.props.addEngineShop({engines});
            });

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/2", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                brakes = response.data.success;
                this.props.addBrakesShop({brakes});
            });

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/3", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                tires = response.data.success;
                this.props.addTiresShop({tires});
            });

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/4", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                nitrous = response.data.success;
                this.props.addNitrousShop({nitrous});
            });

            axios.get("http://127.0.0.1:8000/api/v1/getAllPartsByType/5", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                turbos = response.data.success;
                this.props.addTurboShop({turbos});

                this.setState({
                    part_shop: {
                        engines: engines,
                        turbos: turbos,
                        brakes: brakes,
                        nitrous: nitrous,
                        tires: tires
                    }
                });
            });


        } else {
            this.setState({
                part_shop: {
                    engines: this.props.shop_parts.engines.engines,
                    turbos: this.props.shop_parts.turbos.turbos,
                    brakes: this.props.shop_parts.brakes.brakes,
                    tires: this.props.shop_parts.tires.tires,
                    nitrous: this.props.shop_parts.nitrous.nitrous
                }
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
                let auth = "Bearer ";
                let token = this.props.token;

                let type = event.currentTarget.name

                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationById", {
                    part_type: type,
                    part_id: event.currentTarget.id
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    this.setState({
                        cars: false,
                        parts: false,
                        view_item: true,
                        item_type: type,
                        item: response.data.success
                    });
                });
                break;
        }
    }

    handleBuy(event) {
        let auth = "Bearer ";
        let token = this.props.token;

        axios.post("http://127.0.0.1:8000/api/v1/buyFromSystemMarket", {
                user_id: this.props.user.user.id,
                part_id: event.currentTarget.id,
                part_type: this.state.item_type
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }
        ).then(response => {
            this.props.clearUserCars({});
            this.props.clearUserCarInfo({});

            axios.get("http://127.0.0.1:8000/api/v1/getAllVechiles/" + this.props.user.user.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then(response => {
                let cars = response.data.success;
                this.props.addCars({cars});

                cars.map((car) => {

                    axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    };

                    var data = JSON.stringify({});
                    axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationById", {
                        part_id: car.vechile_id,
                        part_type: 6
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then((response) => {
                        let car_info = response.data.success;
                        this.props.addCarInfo({car_info});
                    });
                });
            });
        });
    }

    render() {

        function LoadCars(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'6'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadEngines(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'1'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadTurbos(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'5'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadBrakes(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'2'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadTires(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'3'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadNitrous(props) {
            return (<div className={"item"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"car-shop-img"} src={props.props.image_url} alt={""}/>
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} name={'4'} onClick={props.handler}>Plačiau</button>
            </div>);
        }

        function LoadItem(props) {
            return (<div className={"item-info"}>
                <span className={"item-title"}>{props.props.title}</span>
                <img id={"item-img"} src={props.props.image_url} alt={""}/>
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
                <span className={"item-price"}>{props.props.price}$</span>
                <button id={props.props.id} onClick={props.handler}>Pirkti</button>
            </div>);
        }

        let cars = this.state.cars ?
            <span id={"cars"} style={{color: "red"}} onClick={this.handleClick}><FontAwesomeIcon icon={faCar}/> Automobiliai</span> :
            <span id={"cars"} onClick={this.handleClick}><FontAwesomeIcon icon={faCar}/> Automobiliai</span>;
        let parts = this.state.parts ?
            <span id={"parts"} style={{color: "red"}} onClick={this.handleClick}><FontAwesomeIcon icon={faWrench}/> Dalys</span> :
            <span id={"parts"} onClick={this.handleClick}><FontAwesomeIcon icon={faWrench}/> Dalys</span>;

        let car_shop = this.state.car_shop != null ? this.state.car_shop.map((car) => <LoadCars props={car}
                                                                                                handler={this.handleClick}/>) : null;

        let engine_shop = this.state.part_shop.engines != null ? this.state.part_shop.engines.map((engine) =>
            <LoadEngines props={engine} handler={this.handleClick}/>) : null;

        let turbo_shop = this.state.part_shop.turbos != null ? this.state.part_shop.turbos.map((turbo) =>
            <LoadTurbos props={turbo} handler={this.handleClick}/>) : null;

        let brake_shop = this.state.part_shop.brakes != null ? this.state.part_shop.brakes.map((brake) =>
            <LoadBrakes props={brake} handler={this.handleClick}/>) : null;

        let tire_shop = this.state.part_shop.tires != null ? this.state.part_shop.tires.map((tire) =>
            <LoadTires props={tire} handler={this.handleClick}/>) : null;

        let nitrous_shop = this.state.part_shop.nitrous != null ? this.state.part_shop.nitrous.map((nitro) =>
            <LoadNitrous props={nitro} handler={this.handleClick}/>) : null;

        let load_item = this.state.view_item ?
            <LoadItem props={this.state.item} handler={this.handleBuy}/> : null;

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
                        {engine_shop}
                        {turbo_shop}
                        {brake_shop}
                        {tire_shop}
                        {nitrous_shop}
                    </div>
                </div>
            );
        } else if (this.state.view_item) {
            return (<div className={"shop"}>
                <div className={"shop-menu"}>
                    {cars}
                    {parts}
                </div>
                {load_item}
            </div>);
        }
    }
}

const ShopPage = connect(mapStateToProps, mapDispatchToProps)(Shop);
export default ShopPage;
