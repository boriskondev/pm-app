import Header from "../../common/Header";
import {Link, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";

const EditProfile = ({match}) => {
    const {getLoggedIn} = useContext(AuthContext);

    const {id} = match.params;
    const history = useHistory();

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [state, setState] = useState({
        username: "",
        password: "",
        repeatPassword: ""
    });

        useEffect(() => {
            fetchWrapper.get(endpoints.USERS + `/${id}`)
                .then(data => {
                    setState({username: data.username});
                });
        }, []);

    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.username || !state.password || !state.repeatPassword) {
            setError("All fields are required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        if (state.password !== state.repeatPassword) {
            setError("Passwords do not match.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const {username, password, repeatPassword} = state;

        const editedUser = {
            username,
            password,
            repeatPassword
        };

        fetchWrapper.patch(endpoints.USERS + `/${id}`, editedUser)
            .then(() => {
                setSubmitted("User edited successfully.")
                setTimeout(() => {
                    getLoggedIn();
                    history.push("/");
                }, 1500);
            })
            .catch(err => console.log("In catch" + err));
    }

    return (
        <>
            <Header title="Edit profile"/>
            <section className="form-wrapper">
                <form className="register" onSubmit={handleSubmit}>

                    <div className="form-field">
                        <label>New name</label>
                        <input
                            type="text"
                            id="username"
                            value={state.username}
                            onChange={handleFieldChange}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>

                    <div className="form-field">
                        <label>New password</label>
                        <input
                            type="password"
                            id="password"
                            value={state.password}
                            onChange={handleFieldChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-field">
                        <label>Repeat new password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            value={state.repeatPassword}
                            onChange={handleFieldChange}
                            autoComplete="off"
                        />
                        {submitted && (<span className="success">{submitted}</span>)}
                        {error && (<span className="error">{error}</span>)}
                    </div>

                    <button className="add" type="submit">Submit</button>

                </form>
            </section>
        </>
    )
}

export default EditProfile;