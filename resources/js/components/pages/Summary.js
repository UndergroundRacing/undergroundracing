import React from "react";
import '../css/styles.css';
import '../css/summary.css';

class Summary extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({});
    }

    render() {

        return (<div className={"summary"}>
            <div className={"title"}>Vartotojo suvestinė</div>
            <ul className={"content"}>
                <li>Turimų mašinų skaičius <span>3</span></li>
                <li>Turimų dalių skaičius <span>10</span></li>
                <li>Lenktyniauta kartų <span>10</span></li>
                <li>Laimėta lenktynių <span>5</span></li>
                <li>Laimėjimo % <span>50%</span></li>
            </ul>
        </div>);
    }
}

export default Summary;