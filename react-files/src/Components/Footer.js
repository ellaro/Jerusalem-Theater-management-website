import { Component } from "react"
import '../CSS/Footer.css'

class Footer extends Component {

    render() {
        return (
            <div className="footer-dark">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col item social">
                                <a rel="noreferrer" href="https://he-il.facebook.com/www.tcj.org.il" target="_blank"><i className="fa fa-facebook"></i></a>
                                <a rel="noreferrer" href="https://www.tcj.org.il/" target="_blank"><i className="fa fa-globe"></i></a>
                                <a rel="noreferrer" href="https://www.youtube.com/channel/UCDbj0RbkfmwfiyRsVhO6mIg" target="_blank"><i className="fa fa-youtube"></i></a>
                                <a rel="noreferrer" href="https://www.instagram.com/tcj.insta/" target="_blank"><i className="fa fa-instagram"></i></a>
                                <a rel="noreferrer" href="https://www.google.com/maps/place/%D7%A7%D7%91%D7%95%D7%A6%D7%AA+%D7%94%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F+%D7%94%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%9E%D7%99%E2%80%AD/@31.7821676,35.2151213,15z/data=!4m5!3m4!1s0x0:0x51d0489ba8c581f2!8m2!3d31.7821758!4d35.2150967
" target="_blank"><i className="fa fa-map-marker"></i></a>
                            </div>
                        </div>
                        {/* <p className="copyright"> © 2021</p> */}
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer