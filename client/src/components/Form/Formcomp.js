import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import history from '../../history';


const style = {
    margin: 15,
};

class Form extends Component {

    constructor(props){
        super(props);
        this.state={
            userName: '',
            emailSubject: '',
            msg: '',
            ename: '',
            venue: '',
            startDate: null,
            startTime: null,
            duration: null,
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleStime = this.handleStime.bind(this);
    }

    componentDidMount() {
        var str = history.location.pathname
        var array = str.split(":",2);
        this.setState({username:array[1]});
        
    }

    clickHandler = (event) =>{
        event.preventDefault();
        const newEvnt = {
            userName:this.state.username,
            emailSubject:this.state.emailSubject,
            msg:this.state.msg,
            eventName:this.state.ename,
            date:this.state.startDate,
            time:this.state.startTime.toString(),
            duration: this.state.duration.toString(),
            venue: this.state.venue
          };
          fetch("http://localhost:5000/addevent", {
            credentials: 'include',
            method: "POST",
            headers: {
                Accept: 'application/json','Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvnt)
        }).then( res => {
            if(res.status === 200) {
                history.push(`/Event/:${this.state.username}`);
            }
            return res.json();
        }).catch( err => {
            console.log(err);
        });

    }

    handleDate(event, date){
        this.setState({startDate: date})
    }

    handleStime(event, stime){
        this.setState({startTime: stime});
    }


    render() {
        return (
            <div style={{textAlign:'center'}}>
                
                <div style={{height:'100px'}}>
                    {/* dummy div */}
                </div>
                
                <div style={{height:'150px'}}>
                    <p style={{fontFamily:'Courier New', fontSize:'50px', padding:'25px 0px'}}>
                        Enter Required Details
                    </p>
                </div>
                    <form onSubmit={this.clickHandler}>
                        <MuiThemeProvider>
                            <div>
                                <div style={{height:'20px'}}></div>
                                <TextField
                                    id='esubject'
                                    hintText="Email Subject"
                                    floatingLabelText="Email Subject"
                                    required
                                    onChange = {(event, newValue) => this.setState({emailSubject:newValue})}
                                />
                                <span style={{padding:'20px'}}></span>
                                <TextField 
                                    id="msg"
                                    hintText="Enter Your Message"
                                    floatingLabelText="Enter Your Message"
                                    required
                                    onChange = {(event, newValue) => this.setState({msg:newValue})}
                                />
                                <div style={{height:'20px'}}></div> 
                                <TextField 
                                    id="ename"
                                    hintText="Enter Event Name"
                                    floatingLabelText="Enter Event Name"
                                    required
                                    onChange = {(event, newValue) => this.setState({ename:newValue})}
                                />
                                <span style={{padding:'20px'}}></span>
                                <TextField 
                                    id="venue"
                                    hintText="Enter Event Venue"
                                    floatingLabelText="Enter Event Venue"
                                    required
                                    onChange = {(event, newValue) => this.setState({venue:newValue})}
                                />
                                <div style={{height:'20px'}}></div> 

                            </div>
                        </MuiThemeProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div style={{height:'30px'}}></div>
                            <KeyboardDatePicker
                                id="date-picker-dialog"
                                label="Start Date"
                                format="MM/dd/yyyy"
                                value={this.state.startDate}
                                onChange={this.handleDate}
                                required
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <MuiThemeProvider>
                            <div>
                                <div style={{height:'20px'}}></div> 
                                 <TextField 
                                    id="time"
                                    defaultValue="20:00" 
                                    type="time"
                                    floatingLabelText="Enter Event time"
                                    required
                                    onChange={this.handleStime}
                                />    
                                <span style={{padding:'20px'}}></span>
                                <TextField 
                                    id="duration"
                                    type="number"
                                    hintText="Enter Event Duration(Hr.)"
                                    floatingLabelText="Enter Event Duration(Hr.)"
                                    required
                                    onChange = {(event, newValue) => this.setState({duration:newValue})}
                                />
                                <div style={{height:'20px'}}></div> 
                        
                            <Button label="Submit" primary={true} type="submit" style={style} />
                        </div>
                    </MuiThemeProvider>
                </form>
            </div>
        );
    }
}


export default Form;