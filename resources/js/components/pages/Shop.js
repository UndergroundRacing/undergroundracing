import React from 'react';
import '../css/styles.css';
import '../css/shop.css';

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

;

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: true,
            parts: false,
            view_item: false,
            item_id: "",
            item: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        switch (event.target.id) {
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

        let cars = this.state.cars ?
            <span id={"cars"} style={{color: "red"}} onClick={this.handleClick}><i className="fa fa-car"/> Automobiliai</span> :
            <span id={"cars"} onClick={this.handleClick}><i className="fa fa-car"/> Automobiliai</span>;
        let parts = this.state.parts ?
            <span id={"parts"} style={{color: "red"}} onClick={this.handleClick}><i
                className="fa fa-wrench"/> Dalys</span> :
            <span id={"parts"} onClick={this.handleClick}><i className="fa fa-wrench"/> Dalys</span>;

        if (this.state.cars) {
            return (<div className={"shop"}>
                    <div className={"shop-menu"}>
                        {cars}
                        {parts}
                    </div>
                    <div className={"shop-content"}>
                        <div className={"item"}>
                            <span className={"item-title"}>Nissan Skyline R34 GT-R</span>
                            <img id={"car-shop-img"} src={R34} alt={"Nissan Skyline GT-R R34"}/>
                            <span className={"item-price"}> 60000$ </span>
                            <button id={"R34"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>Mitsubishi Lancer Evolution IX</span>
                            <img id={"car-shop-img"} src={Evo9} alt={"Mitsubishi Lancer Evolution IX"}/>
                            <span className={"item-price"}> 30000$ </span>
                            <button id={"Evo9"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>Toyota Supra MKIV</span>
                            <img id={"car-shop-img"} src={Supra} alt={"Toyota Supra MKIV"}/>
                            <span className={"item-price"}> 35000$ </span>
                            <button id={"Supra"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>Nissan S13 (Hatch)</span>
                            <img id={"car-shop-img"} src={S13Hatch} alt={"Nissan S13 (Hatch)"}/>
                            <span className={"item-price"}> 10000$ </span>
                            <button id={"S13"} onClick={this.handleClick}>Plačiau</button>
                        </div>

                        <div className={"item"}>
                            <span className={"item-title"}>Mitsubishi Lancer Evolution V</span>
                            <img id={"car-shop-img"} src={Evo5} alt={"Mitsubishi Lancer Evolution V"}/>
                            <span className={"item-price"}> 15000$ </span>
                            <button id={"Evo5"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>Nissan Silvia S15</span>
                            <img id={"car-shop-img"} src={S15} alt={"Nissan Silvia S15"}/>
                            <span className={"item-price"}> 20000$ </span>
                            <button id={"S15"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>VW Golf VII R</span>
                            <img id={"car-shop-img"} src={Golf7R} alt={"VW Golf VII R"}/>
                            <span className={"item-price"}> 30000$ </span>
                            <button id={"Golf7R"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>BMW M3 E92</span>
                            <img id={"car-shop-img"} src={M3E92} alt={"BMW M3 E92"}/>
                            <span className={"item-price"}> 30000$ </span>
                            <button id={"M3E92"} onClick={this.handleClick}>Plačiau</button>
                        </div>
                        <div className={"item"}>
                            <span className={"item-title"}>Audi RS6 Avant</span>
                            <img id={"car-shop-img"} src={RS6Avant} alt={"Audi RS6 Avant"}/>
                            <span className={"item-price"}> 60000$ </span>
                            <button id={"M3E92"} onClick={this.handleClick}>Plačiau</button>
                        </div>
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
                        <div className={"item"}>
                            <span className={"item-title"}>Nissan Skyline R34 GT-R</span>
                            <img id={"car-shop-img"} src={R34} alt={"Nissan Skyline GT-R R34"}/>
                            <span className={"item-price"}> 60000$ </span>
                            <button id={"R34"} onClick={this.handleClick}>Plačiau</button>
                        </div>

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

export default Shop;