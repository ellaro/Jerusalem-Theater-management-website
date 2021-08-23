import { Component } from "react"
import { auth } from "../Firebase/firebase"
import '../CSS/Login.css'
import LOGO from "../Photos/logo.png"
import curtain from "../Photos/Unt.png"


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  async componentDidMount() {
    auth.onAuthStateChanged(_user => {
      if (_user) {// if  user logged in
        this.setState({ user: _user })
        this.props.history.push({
          pathname: '/Home',
          data: _user
        })
      }
      else {
        //  else -> user didnt logged in
        if (_user == null) {
          this.props.history.push(
            {
              pathname: "/"
            });
          return;
        }
      }
    })
  }
  render() {

    return (
      <div className="Login">
        <div id="welcome">ברוכים הבאים</div>
        <img src={LOGO} id="logo" alt="logo pic"></img>
        <div className="login">
          <img src={curtain} id="curtain" alt="curtain"></img>
          <input type="text" placeholder="דואר אלקטרוני" id="username"
            onChange={(event) => {
              this.setState({ ...this.state, email: event.target.value })
            }}
          />

          <input type="password" placeholder="סיסמה" id="password"
            onChange={(event) => {
              this.setState({ ...this.state, password: event.target.value })
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                this.login()
              }
            }}
          />

          <input type="submit" value="כניסה למערכת"
            onClick={() => {
              this.login()
            }} />

        </div>
        <div className="shadow"></div>
      </div>
    )
  }


  // login verification using firebase auth
  login() {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.props.history.push(
          {
            pathname: "/Home",
            data: res.user
          })

      }).catch((e) => {
        // if invalid user
        alert("דואר אלקטרוני או סיסמה לא נכונים")
      })
  }
}

export default Login;
