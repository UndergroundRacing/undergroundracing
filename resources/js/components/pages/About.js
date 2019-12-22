import React from "react";
import '../css/styles.css';
import '../css/about.css';
import DefaultImg from "../img/default_img.png";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (<div className={"about-content"}>
                <div className={"about-topic"}>
                    <span className={"topic-title"}>Temos pavadinimas</span>
                    <table>
                        <thead>
                        <tr>
                            <td><img src={DefaultImg} alt={"default"}/></td>
                            <td>Tekstas</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className={"about-topic"}>
                    <span className={"topic-title"}>Temos pavadinimas</span>
                    <table>
                        <thead>
                        <tr>
                            <td><img src={DefaultImg} alt={"default"}/></td>
                            <td>Tekstas</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className={"about-topic"}>
                    <span className={"topic-title"}>Temos pavadinimas</span>
                    <table>
                        <thead>
                        <tr>
                            <td><img src={DefaultImg} alt={"default"}/></td>
                            <td>Tekstas</td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>


        );
    }

}


export default About;