import React from 'react';
import '../css/styles.css';
import '../css/garage.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import Engine from "../icons/Engine.svg";
import Power from "../icons/Power.svg";
import Weight from "../icons/Weight.svg";

import StEngine from "../img/Engine.png";
import Turbo from "../img/Turbo.png";
import Tire from "../img/Tire.png";
import Brakes from "../img/Brakes.png";
import Nitrous from "../img/Nitrous.png";

import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        cars: state.user_cars,
        car_info: state.user_car_info,
        active_car: state.active_car
    };
};

function mapDispatchToProps(dispatch) {
    return {};
}

class Garage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            upgrade_car: false,
            user_car_id: "",
            user_car_data: null,
            part_swap: false,
            part_category: "",
            available_parts: null,
            used_parts: null,
            garage_cars: null,
            selected_car_data: null,
            selected_car_engine: null,
            selected_car_turbo: null,
            selected_car_brakes: null,
            selected_car_tires: null,
            selected_car_nitrous: null
        };

        this.selectCar = this.selectCar.bind(this);
        this.openParts = this.openParts.bind(this);
        this.selectPart = this.selectPart.bind(this);
    }

    componentDidMount() {
        this.setState({
            garage_cars: this.props.car_info
        });
    }

    selectCar(event) {
        let user_car_id = null;
        let user_car_info = null;

        this.props.car_info.map((data) => {
            if (data.car_info.id == event.currentTarget.id) {
                user_car_info = data.car_info;
            }
        });

        this.props.cars.cars.map((car) => {
            if (car.vechile_id == event.currentTarget.id) {
                user_car_id = car.id;
            }
        });

        let auth = "Bearer ";
        let token = this.props.token;

        let car_specs = null;
        let car_parts = null;

        let engine_specs = null;
        let turbo_specs = null;
        let brakes_specs = null;
        let tires_specs = null;
        let nitrous_specs = null;

        axios.get("http://127.0.0.1:8000/api/v1/getCarAllSpecifications/" + user_car_id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': auth + token
            }
        }).then((response) => {
            car_specs = response.data.success.specs;
            car_parts = response.data.success.parts;

            this.setState({
                selected_car_data: car_specs
            });

            if (car_parts.engine != null) {
                /* FETCH INSTALLED ENGINE INFORMATION */
                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                    garage_part_id: car_parts.engine,
                    part_type: 1
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then((response) => {
                    engine_specs = response.data.success;
                    this.setState({
                        selected_car_engine: engine_specs
                    });
                });
            }

            /* FETCH INSTALLED BRAKES INFORMATION */
            if (car_parts.stops != null) {
                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                    garage_part_id: car_parts.stops,
                    part_type: 2
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    brakes_specs = response.data.success;
                    this.setState({
                        selected_car_brakes: brakes_specs
                    });
                });
            }

            /* FETCH INSTALLED TIRES INFORMATION */
            if (car_parts.wheels != null) {
                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                    garage_part_id: car_parts.wheels,
                    part_type: 3
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    tires_specs = response.data.success;
                    this.setState({
                        selected_car_tires: tires_specs
                    });
                });
            }

            /* FETCH INSTALLED NITROUS INFORMATION */
            if (car_parts.nos != null) {
                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                    garage_part_id: car_parts.nos,
                    part_type: 4
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    nitrous_specs = response.data.success;
                    this.setState({
                        selected_car_nitrous: nitrous_specs
                    });
                });
            }

            /* FETCH INSTALLED TURBO INFORMATION */
            if (car_parts.turbo != null) {
                axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                    garage_part_id: car_parts.turbo,
                    part_type: 5
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': auth + token
                    }
                }).then(response => {
                    turbo_specs = response.data.success;
                    this.setState({
                        selected_car_turbo: turbo_specs
                    });
                });
            }


        });

        this.setState({
            upgrade_car: true,
            user_car_id: user_car_id,
            user_car_info: user_car_info,
        });

    }

    openParts(event) {
        this.setState({
            part_swap: true,
            part_category: event.target.id,
            available_parts: null
        });

        let part_type = 0;
        let garage_id = this.props.user.user.id

        switch (event.target.id) {
            case "engine":
                part_type = 1;
                break;
            case "brakes":
                part_type = 2;
                break;
            case "turbo":
                part_type = 5;
                break;
            case "tire":
                part_type = 3;
                break;
            case "nitrous":
                part_type = 4;
                break;
            default:
                break;
        }

        let auth = "Bearer ";
        let token = this.props.token;

        axios.post("http://127.0.0.1:8000/api/v1/getAllPartsInGarage", {
            garage_id: garage_id,
            part_type: part_type
        }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': auth + token
            }
        }).then((response) => {
            let parts = response.data.success;

            this.setState({
                available_parts: parts
            });
        });

    }

    selectPart(event) {

        let type = event.currentTarget.name;
        let part_id = parseInt(event.currentTarget.id);
        let user = this.props.user.user.id;

        let auth = "Bearer ";
        let token = this.props.token;

        let car = this.state.user_car_id;

        if (event.currentTarget.id === "back" || event.currentTarget.id === "back_arrow") {
            this.setState({
                part_swap: false,
                part_category: ""
            });
        } else {
            switch (type) {
                case "engine":
                    axios.post("http://127.0.0.1:8000/api/v1/addEngineToVechile", {
                        user_id: user,
                        garage_vechile_id: car,
                        garage_engine_id: part_id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                            garage_part_id: part_id,
                            part_type: 1
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then((response) => {
                            let engine_specs = response.data.success;
                            this.setState({
                                selected_car_engine: engine_specs,
                                part_swap: false
                            });
                        });
                    });
                    break;
                case "turbo":
                    axios.post("http://127.0.0.1:8000/api/v1/addTurboToVechile", {
                        user_id: user,
                        garage_vechile_id: car,
                        garage_turbo_id: part_id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                            garage_part_id: part_id,
                            part_type: 5
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then(response => {
                            let turbo_specs = response.data.success;
                            this.setState({
                                selected_car_turbo: turbo_specs,
                                part_swap: false
                            });
                        });
                    });
                    break;
                case "brakes":
                    axios.post("http://127.0.0.1:8000/api/v1/addStopToVechile", {
                        user_id: user,
                        garage_vechile_id: car,
                        garage_stops_id: part_id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                            garage_part_id: part_id,
                            part_type: 2
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then(response => {
                            let brakes_specs = response.data.success;
                            this.setState({
                                selected_car_brakes: brakes_specs,
                                part_swap: false
                            });
                        });
                    });
                    break;
                case"tire":
                    axios.post("http://127.0.0.1:8000/api/v1/addWheelsToVechile", {
                        user_id: user,
                        garage_vechile_id: car,
                        garage_wheel_id: part_id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                            garage_part_id: part_id,
                            part_type: 3
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then(response => {
                            let tires_specs = response.data.success;
                            this.setState({
                                selected_car_tires: tires_specs,
                                part_swap: false
                            });
                        });
                    });
                    break;
                case "nitrous":
                    axios.post("http://127.0.0.1:8000/api/v1/addNosToVechile", {
                        user_id: user,
                        garage_vechile_id: car,
                        garage_nos_id: part_id
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': auth + token
                        }
                    }).then(response => {
                        axios.post("http://127.0.0.1:8000/api/v1/getPartSpecificationInGarage", {
                            garage_part_id: part_id,
                            part_type: 4
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': auth + token
                            }
                        }).then(response => {
                            let nitrous_specs = response.data.success;
                            this.setState({
                                selected_car_nitrous: nitrous_specs,
                                part_swap: false
                            });
                        });
                    });
                    break;
                default:
                    break;
            }

            axios.get("http://127.0.0.1:8000/api/v1/getCarAllSpecifications/" + car, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then((response) => {
                let car_specs = response.data.success.specs;

                this.setState({
                    selected_car_data: car_specs
                });
            });
        }
    }

    render() {

        function PartUpgrade(props) {
            let parts = props.props;

            return (<div className={"parts-swap"}>
                <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <table>
                    <thead>
                    <tr>
                        {
                            parts.map((part) => {

                                let part_id = null;

                                switch (props.type) {
                                    case "engine":
                                        part_id = part.garage_engine_id;
                                        break;
                                    case "turbo":
                                        part_id = part.garage_turbo_id;
                                        break;
                                    case "brakes":
                                        part_id = part.garage_stops_id;
                                        break;
                                    case "tire":
                                        part_id = part.garage_wheels_id;
                                        break;
                                    case "nitrous":
                                        part_id = part.garage_nos_id;
                                    default:
                                        break;
                                }

                                return (
                                    <td><img id={part_id} name={props.type} src={part.specs.image_url} alt={""}
                                             onClick={props.handler}/></td>
                                );

                            })
                        }
                    </tr>
                    <tr>
                        {
                            parts.map((part) => {
                                return (
                                    <td>{part.specs.title}</td>
                                );

                            })
                        }
                    </tr>
                    </thead>
                </table>

            </div>);
        }

        function LoadCars(props) {

            let car_data = props.props.car_info;
            return (
                <table id={car_data.id} className={"garage-item"} onClick={props.handler}>
                    <thead>
                    <tr>
                        <td><img src={car_data.image_url} alt={""}/></td>
                        <td><span className={"item-title"}>{car_data.title}</span></td>
                    </tr>
                    </thead>
                </table>
            );
        }

        function CarUpgrade(props) {

            let weight = "";
            let power = "";
            let kw_power = "";
            let engine = "";

            if (props.specs != null && props.engine != null) {

                weight = props.props.weight;
                power = props.specs.power;
                kw_power = parseInt(props.specs.power * 0.745699872);


                var capacity = props.engine.capacity;

                if (capacity.toString().length == 1) {
                    capacity = capacity + ".0";
                }
                engine = props.engine.title + " " + capacity;
            }

            return ([<span className={"item-title"}>{props.props.title}</span>,
                < div className={"car-info"}>
                    < img src={props.props.image_url} alt={""}/>
                    <table>
                        <thead>
                        <tr>
                            <td><img src={Engine} alt={"Engine"}/></td>
                            <td>{engine}</td>
                            <td><img src={Power} alt={"Power"}/></td>
                            <td>{power}HP / {kw_power}KW</td>
                            <td><img src={Weight} alt={"Weight"}/></td>
                            <td>{weight} Kg</td>
                        </tr>
                        </thead>
                    </table>
                </div>]);
        }

        function CarParts(props) {
            let engine = props.props.selected_car_engine;
            let turbo = props.props.selected_car_turbo;
            let brakes = props.props.selected_car_brakes;
            let tires = props.props.selected_car_tires;
            let nitrous = props.props.selected_car_nitrous;

            let engine_img = engine != null ?
                <img id={"engine"} src={engine.image_url} alt={""} onClick={props.openParts}/> :
                <img id={"engine"} src={StEngine} alt={""} onClick={props.openParts}/>;

            let engine_title = engine != null ? engine.title : "Standartinis";

            let turbo_img = turbo != null ?
                <img id={"turbo"} src={turbo.image_url} alt={""} onClick={props.openParts}/> :
                <img id={"turbo"} src={Turbo} alt={"Turbo"} onClick={props.openParts}/>;

            let turbo_title = turbo != null ? turbo.title : "Standartinė";

            let tire_img = tires != null ?
                <img id={"tire"} src={tires.image_url} alt={""} onClick={props.openParts}/> :
                <img id={"tire"} src={Tire} alt={"Tire"} onClick={props.openParts}/>;

            let tires_title = tires != null ? tires.title : "Standartinės";

            let brakes_img = brakes != null ?
                <img id={"brakes"} src={brakes.image_url} alt={""} onClick={props.openParts}/> :
                <img id={"brakes"} src={Brakes} alt={"Brakes"} onClick={props.openParts}/>;

            let brakes_title = brakes != null ? brakes.title : "Standartiniai";

            let nitrous_img = nitrous != null ?
                <img id={"nitrous"} src={nitrous.image_url} alt={""} onClick={props.openParts}/> :
                <img id={"nitrous"} src={Nitrous} alt={"N2O"} onClick={props.openParts}/>;

            let nitrous_title = nitrous != null ? nitrous.title : "Standartinė";

            return (
                <div className={"car-parts"}>
                    <span>Automobilio detalės</span>
                    <table>
                        <thead>
                        <tr>
                            <td>
                                <div>Variklis</div>
                                <div>{engine_img}</div>
                                <div>{engine_title}</div>
                            </td>
                            <td>
                                <div>Turbina</div>
                                <div>{turbo_img}</div>
                                <div>{turbo_title}</div>
                            </td>
                            <td>
                                <div>Padangos</div>
                                <div>{tire_img}</div>
                                <div>{tires_title}</div>
                            </td>
                            <td>
                                <div>Stabdžiai</div>
                                <div>{brakes_img}</div>
                                <div>{brakes_title}</div>
                            </td>
                            <td>
                                <div>N2O</div>
                                <div>{nitrous_img}</div>
                                <div>{nitrous_title}</div>
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div>
            );
        }

        let cars = this.state.garage_cars != null ? this.state.garage_cars.map((car) =>
            <LoadCars props={car} handler={this.selectCar}/>) : null;

        let select_car = this.state.user_car_id != "" ?
            <CarUpgrade props={this.state.user_car_info} specs={this.state.selected_car_data}
                        engine={this.state.selected_car_engine}/> : null;

        let car_parts = this.state.user_car_id != "" ? <CarParts props={this.state} openParts={this.openParts}/> : null;

        let upgrade = this.state.part_swap && this.state.available_parts != null ?
            <PartUpgrade props={this.state.available_parts} handler={this.selectPart.bind(this)}
                         type={this.state.part_category}/> : null;

        if (this.state.upgrade_car) {
            return (
                <div className={"car-upgrade"}>
                    {select_car}
                    {car_parts}
                    {upgrade}
                </div>);
        } else {
            return (
                <div className={"garage"}>
                    <div className={"garage-content"}>
                        {cars}
                    </div>
                </div>
            );
        }
    }
}

const
    GarageComponent = connect(mapStateToProps, mapDispatchToProps)(Garage);
export default GarageComponent;
