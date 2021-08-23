import { Component } from "react"
import { storage } from "../Firebase/firebase"
import '../CSS/File.css'
import TRASH from "../Photos/trash.png"
import PDF from "../Photos/file_pdf.png"
import POWERPOINT from "../Photos/file_p.png"
import TEXT from "../Photos/file_text.png"
import IMAGE from "../Photos/file_pic.png"
import WORD from "../Photos/file_w.png"
import EXCEL from "../Photos/file_x.png"
import DEF_FILE from "../Photos/file_s.png"

const TEXT_A = ["txt"]
const WORD_A = ["docx", "docm", "dotx", "dotm"]
const PDF_A = ["pdf"]
const EXCEL_A = ["xlsx", "xlsm", "xltx", "xltm", "xlsb", "xlam"]
const POWERPOINT_A = ["ppt","pptx", "pptm", "potx", "potm", "ppam", "ppsx", "ppsm", "sldx", "sldm"]
const IMAGES_A = ["tif", "tiff", "bmp", "jpg", "jpeg", "gif", "png", "eps", "raw"]

class FileObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img_url: "",
            name: props.file.name,
            path: props.file.path,
            download: "",
            updateFiles: props.updateFiles
        }
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let _path = this.state.path + "/";
        _path = _path + this.state.name;
        storage.refFromURL(_path).getDownloadURL().then((url) => { this.setState({ ...this.state, download: url, path: _path }) });
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
            fixed_name = sub;
        }
        else {
            fixed_name = _name.substring(0, 18);
        }

        // pic the right image
        if (!fixed_name) {
            fixed_name = _name.substring(0, 18);
        }
        let im_url = this.state.img_url;
        if (!type) {
            im_url = DEF_FILE;
        }
        else {
            let _type = type.substring(1);
            if (TEXT_A.includes(_type))
                im_url = TEXT;
            else if (WORD_A.includes(_type))
                im_url = WORD;
            else if (PDF_A.includes(_type))
                im_url = PDF;
            else if (EXCEL_A.includes(_type))
                im_url = EXCEL;
            else if (POWERPOINT_A.includes(_type))
                im_url = POWERPOINT;
            else if (IMAGES_A.includes(_type))
                im_url = IMAGE;
            else
                im_url = DEF_FILE;
        }

        return (
            <div className="File" style={{ backgroundImage: `url(${im_url})` }}>
                <br></br>
                <br></br>
                <a href={this.state.download} target="_blank" rel="noreferrer">
                    <button id="but">
                        <br></br>
                        {fixed_name}<span id="but_span">{_name}</span>
                        <br></br>
                    </button>
                </a>
                <br></br>
                <button id="delete_file">
                    <img src={TRASH} alt="" onClick={this.delete}></img>
                    <span className="tooltiptext">מחיקה</span>
                </button>
            </div>
        )
    }

    // delete file
    delete() {
        let name = this.state.name;
        let path = this.state.path;

        if (window.confirm("למחוק את הקובץ \"" + name + "\" ?") === false)
            return;

        storage.refFromURL(path).delete().then(() => {
            this.state.updateFiles();
        }).catch(() => {
        });
    }
}

export default FileObj;