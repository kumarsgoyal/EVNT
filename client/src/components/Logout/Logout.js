import React, {Component} from 'react';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import history from '../../history';

const Background = require("../images/headerbg.jpg");
var sectionStyle = {
    className: "img-fluid",
    backgroundImage: `url(${Background})`,
	backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100% ',
    height:'700px'
};


class Logout extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
        }
    }

    componentDidMount() {
        var str = history.location.pathname
        var array = str.split(":",2);
        this.setState({username:array[1]});    

        const newEvnt = {
            email:this.state.username,
        };

        fetch("http://localhost:5000/logout", {
            credentials: 'include',
            method: "POST",
            headers: {
                Accept: 'application/json','Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvnt)
        }).then( res => {
            
        }).catch( err => {
            console.log(err);
        });

    }

    render() {
        return (
            <div>
                <HomeNavbar />
                <div className="container-fluid" style={{height:'600px'}}>
		            <div style={sectionStyle}>
		            </div>
                </div>
            </div>
        );
    }
}


export default Logout;