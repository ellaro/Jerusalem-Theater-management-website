import { Component } from "react"
import { auth, db, storage } from "../Firebase/firebase"
import '../CSS/archive.css'
import ArchiveObj from "./ArchiveObj.js"


class Archive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.location.data,
            allUsers: [],
            projects: [],
            archive: [], // all the archive projects
            searchVal: ""
        }

        this.getProjects = this.getProjects.bind(this);
        this.getArchive = this.getArchive.bind(this);
    }

    componentDidMount() {
        let user = auth.currentUser;

        // if user didnt logged in
        if (user == null) {
            this.props.history.push(
                {
                    pathname: "/"
                });
            return;
        }

        //else -> user logged in
        this.setState({ user: user })
        this.props.history.push({
            pathname: '/Archive',
            data: user
        })

        this.getProjects();
        this.getArchive();
    }

    render() {
        let dataToRender = [];
        dataToRender = this.getData();

        return (
            <div className="HomePage">
                <h1>ארכיון</h1>
                <input className="searchBox" type="text" placeholder="חיפוש.."
                    onChange={(event) => {
                        this.setState({ ...this.state, searchVal: event.target.value })
                    }}>
                </input>
                <br></br>
                {dataToRender}
                <button id="go_home_fromarchive" onClick={() => {
                    this.props.history.push(
                        {
                            pathname: "/home"
                        })
                }}>למסך הבית</button>
            </div>
        )
    }

    // get the relevent archive projects to show on screen
    getData() {
        let searchVal = this.state.searchVal;
        let archived = [];
        archived = this.state.projects.filter(prod => this.state.archive.indexOf(prod["name"]) >= 0 && prod["name"].includes(searchVal));

        let dataToReturn = archived.map((production, index) => <ArchiveObj key={production["name"]} getArchive={this.getArchive} prod={production} />);
        return dataToReturn;
    }

    // get all projects on firebase
    getProjects() {
        this.setState({ ...this.state, projects: [] });
        storage.refFromURL("gs://theater2-d72bc.appspot.com").listAll()
            .then((res) => {
                let p = []
                res.prefixes.forEach((folderRef) => {
                    let name = folderRef.name;
                    let p1 = { "name": name }
                    p.push(p1)
                });

                this.setState({ ...this.state, projects: p });
            }
            );
    }

    // get archive projects from firestore json
    getArchive() {
        this.setState({ ...this.state, archive: [] });
        let arch = [];
        db.collection("archive").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arch.push(doc.data()["name"]);
            });
            this.setState({ ...this.state, archive: arch });
        });
    }

}

export default Archive;