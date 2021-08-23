import { Component } from 'react'
import React from "react";
import '../CSS/Calendar.css'
import Calendar_new1 from "../Photos/AddGoogleCal1.png"//Image to explain adding the log
import Calendar_new2 from "../Photos/AddGoogleCal2.png"//Image to explain adding the log
import add from "../Photos/addEvent2.png"
import help from "../Photos/help2.png"



var gapi = window.gapi

window.URLcalendar = "https://calendar.google.com/calendar/u/1?cid=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20"

var CLIENT_ID = "25532945063-7d85q8c7socv0ic5l8h5lhdupqkc0k3n.apps.googleusercontent.com"
var API_KEY = "AIzaSyDLfXSRbdMnZCiQLpOPQ0SdgzEMigMqFwE"

// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = [
    "https://www.googleapis.com/auth/calendar",                     //read/write access to Calendars
    "https://www.googleapis.com/auth/calendar.readonly",            //read-only access to Calendars
    "https://www.googleapis.com/auth/calendar.events",              //read/write access to Events
    "https://www.googleapis.com/auth/calendar.events.readonly",     //read-only access to Events
    "https://www.googleapis.com/auth/calendar.settings.readonly",   //read-only access to Settings
    "https://www.googleapis.com/auth/calendar.addons.execute",      //run as a Calendar add-on

]

class Calendar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            help: false,
            addEvent: false,
            event: {},
            user: {},
            summery: '',
            location: '',
            description: '',
            timeZone: 'Asia/Jerusalem',
            dateTimeStart: '',
            dateTimeEnd: '',
            emails: [
            ],
        }
    }

    async createEvent() {

        /*get data from state*/
        let summery = this.state.summery
        let location = this.state.location
        let description = this.state.description
        let timeZone = this.state.timeZone
        let dateTimeStart = this.state.dateTimeStart
        let dateTimeEnd = this.state.dateTimeEnd
        let timeStart = this.state.timeStart
        let timeEnd = this.state.timeEnd
        let emails = this.state.emails


        var event = {
            'summary': summery,
            'location': location,
            'description': description,
            'start': {
                'dateTime': dateTimeStart + '-' + timeStart,
                'timeZone': timeZone
            },
            'end': {
                'dateTime': dateTimeEnd + '-' + timeEnd,
                'timeZone': timeZone
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': emails,
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        }
        this.setEvent(event)
    }

    async setEvent(event) {//Enter an event in the calendar
        gapi = await window.gapi;
        gapi.client.setApiKey(API_KEY);
        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            }, (authResult) => {
                gapi.client.load('calendar', 'v3', () => {
                    gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    }).then((res) => {
                        if (res) {
                            this.setState({ newEvent: res })
                            window.location.reload();//Refresh the page to see the added event
                        }
                    }).catch((e) => {//If there is no input from the user or the input is not correct for a new event
                        alert("קלט חסר או לא תקין להוספת אירוע הכנס שוב");
                    });
                })
            })
    }
        
    copyToClipboard = (URLcalendar) => {//copy the url
        const el = document.createElement('textarea');
        el.value = URLcalendar;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    createTime(e) {//Format change
        var t = e.target.value.split('-')
        var d = new Date(t[0], t[1] - 1, t[2], 0, 0, 0)
        d = d.toISOString();
        d = d.substring(0, d.length - 5)
        return d;
    }

        render() {
        return (
            <div className="Calendar">
                <h1><b>יומן</b></h1>
                <table id="icons">
                    <tbody>
                        <tr>
                            {/* Button for opening a form for adding an event */}
                            <td><button className="addEvent" onClick={() => {
                                this.setState({ addEvent: !this.state.addEvent })
                            }}><img id="add" alt="" src={add}></img></button></td>
                            {/* Button to open an explanation for adding the calendar */}
                            <td><button id="help_but" onClick={() => {
                                this.setState({ help: !this.state.help })
                            }}><img id="help" alt="" src={help}></img></button></td>
                        </tr>
                    </tbody>
                </table>

                {/* Add event form if you click the Add button */}
                {!this.state.addEvent ? <div></div> :
                    <div id="formAddEvent">
                        <b className="line">הוספת אירוע ליומן</b>
                        <form className="modal-body" id="addEvent" role="dialog" aria-hidden="true">
                            <label className="events">שם:</label>
                            <input type="text" name="name" onBlur={(e) => {
                                this.setState({ summery: e.target.value })
                            }} placeholder="הכנס שם אירוע"></input>
                            <br></br>
                            <label className="events">תאריך התחלה:</label>
                            <input type="date" name="dateTimeStart"
                                onChange={
                                    (e) => {
                                        var d = this.createTime(e)
                                        this.setState({ dateTimeStart: d })
                                    }
                                }></input>
                            <br></br>
                            <label className="events"> זמן התחלה:</label>
                            <input type="Time" name="dateTimeEnd"
                                onChange={(e) => {
                                    this.setState({ timeStart: e.target.value })
                                }}></input>
                            <br></br>
                            <label className="events"> תאריך סיום:</label>
                            <input type="date" name="dateTimeEnd"  /*value={this.state.dateTimeEnd}*/
                                onChange={
                                    (e) => {
                                        var d = this.createTime(e)
                                        this.setState({ dateTimeEnd: d })
                                    }}></input>
                            <br></br>
                            <label className="events"> זמן סיום:</label>
                            <input type="Time" name="dateTimeEnd"
                                onChange={(e) => {
                                    this.setState({ timeEnd: e.target.value })
                                }}></input>
                        </form>
                        <button id="add_but" onClick={() => this.createEvent()}>הוספת אירוע</button>
                        <p></p>
                    </div>}

                {/* form Manual  explanation how adding the calendar, Appears after pressing the appropriate button */}
                {!this.state.help ? <div></div> :
                    <div id="addCalendar">
                        <b className="line">הנחיות לביצוע סינכרון ליומן של גוגל</b>
                        <h4>שלב א'</h4><h5>יש להעתיק את הכתובת הבאה: </h5><h6>{window.URLcalendar}</h6>
                        <button id="copy_but" onClick={() => this.copyToClipboard(window.URLcalendar)}>העתק</button>

                        <h4>שלב ב'</h4><h5> הכנס ליומן של גוגל בכתובת</h5>
                        <a href="https://calendar.google.com/" target="_blank" rel="noreferrer">https://calendar.google.com</a>
                        <h4>שלב ג'</h4><h5>Add a Friend's Calendar -&gt; ושם לבחור From URL</h5>
                        <img src={Calendar_new1} className="img-fluid" alt="תמונה שמציגה היכן ביומן של גוגל יש להוסיף את הקישור"></img>
                        <h4>שלב ד'</h4><h5>הדבק את הכתובת משלב א' והוסף יומן </h5>
                        <img src={Calendar_new2} className="img-fluid" alt="תמונה שמציגה היכן ביומן של גוגל יש להוסיף את הקישור"></img>

                    </div>}
                {/* Implementing Google Calendar */}
                <iframe title="calendar" src="https://calendar.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=1&amp;showTabs=0&amp;showCalendars=1&amp;showTz=0"></iframe>
                {/* Button back to home page */}
                <button id="go_home_fromcalendar" onClick={() => {
                    this.props.history.push(
                        {
                            pathname: "/home"
                        })
                }}>למסך הבית</button>
            </div>
        )
    }
} export default Calendar;
