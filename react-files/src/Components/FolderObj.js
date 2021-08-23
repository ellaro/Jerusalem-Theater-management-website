import { Component } from "react"
import '../CSS/FolderObj.css'

class FolderObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.folder.name,
            path: props.folder.path,
            updatePath: props.updatePath
        }
        this.updateFather = this.updateFather.bind(this);
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;
        this.setState({ ...this.state, path: _path });
    }

    render() {
        // substring the name to fixed length
        let _name = this.state.name;
        let fixed_name = _name.substring(0, 17);

        return (
            <div className="Folder">
                <button id="but" onClick={this.updateFather}>
                    {fixed_name}<span id="but_span">{_name}</span>
                    <br></br>
                    <br></br>
                </button>
                <br></br>
            </div>

        )
    }

    // update the path at father comp
    updateFather() {
        let path = this.state.path;
        this.state.updatePath(path);
    }

}

export default FolderObj;