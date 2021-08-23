import { Component } from "react"
import { db} from "../Firebase/firebase"
import ARCHIVE from "../Photos/archive.png"
import '../CSS/Production.css'
import {Link} from "react-router-dom"

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.prod.name,
            getArchive: props.getArchive
        }
        this.moveToArchive = this.moveToArchive.bind(this);
    }

    render() {
        // substring the name to fixed length
        let _name = this.state.name;
        let sub = _name;
        let type = null;
        let type_ind = _name.indexOf(".");
        let fixed_name = null;

        // check for file or folder
        if (type_ind !== -1) {
            sub = _name.substring(0, type_ind);
            type = _name.substring(type_ind, _name.length);
            sub = sub.substring(0, 18 - type.length);
            fixed_name = sub + type;
        }
        else {
            fixed_name = _name.substring(0, 18);
        }

        return (
            <div className="Production">
                <Link id="linkName" style={{ color: "black", textDecoration: 'inherit' }} to={{ pathname: "/file", name: { _name }, path: { _name } }}>{fixed_name}<span className="tooltiptextname">{_name}</span></Link>
                <br></br>
                <button id="add_archive"><img alt="" src={ARCHIVE} onClick={this.moveToArchive}></img><span className="tooltiptext">העברה לארכיון</span></button>
            </div>
        )
    }

    // move project to archive 
    moveToArchive() {
        let _name = this.state.name.toString();
        db.collection("archive").doc(_name).set({ name: _name }).then(() => {
            this.state.getArchive();
            window.location.reload();
        });
    }
}

export default Production;