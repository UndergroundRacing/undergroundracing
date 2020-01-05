import React from 'react';
import '../css/styles.css';
import '../css/main.css';

//import '../css/mobile.css';
import Login from './Login';
import Register from './Register';
import About from './About';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            main: true,
            login: false,
            register: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        switch (event.target.id) {
            case "login":
                this.props.history.push('/Login');
                break;
            case "register":
                this.props.history.push('/Register');
                break;
            default:
               this.props.history.push('/');

        }
    }

    render() {

        if (this.state.main) {
            return (<div>
                    <div className="logo">Underground Racing
                        <span>Šūkis</span>
                    </div>
                    <div className="main-menu">
                        <button id={"login"} onClick={this.handleClick.bind(this)}>Prisijungti</button>
                        <button id={"register"} onClick={this.handleClick.bind(this)}>Registruotis</button>
                    </div>
                </div>
            );
        } else if (window.location.pathname === "/Login") {
            return <Login/>;
        } else if (window.location.pathname === '/Register') {
            return <Register/>;
        }
    };

}

export default Main;

