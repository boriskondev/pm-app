import { Component } from "react";

class Data extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:3001/users");
        const json = await response.json();
        this.setState({ data: json });
    }


    render() {

        let result;

        if (this.state.data.length === 0 ) {
            result = <p>No available data.</p>
        } else {
            result = this.state.data.map(person => (
                <p key={person._id}>
                    <p style={{ color: "red", fontWeight: "bold" }}>User: { person.username } </p>
                    <p>Pass: { person.password } </p>
                </p>
            ))
        }

        return (
            <div className="content">
                { result }
            </div>
        )
    }
}

export default Data;