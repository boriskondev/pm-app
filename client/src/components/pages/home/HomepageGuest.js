import {Component} from "react";
import {Link} from "react-router-dom";
import Header from "../../common/Header";
import "./HomepageGuest.css";

class HomepageGuest extends Component {

    render() {
        return (
            <>
                <Header title="Welcome to Mtest 3.0"/>
                <section className="guest-home">
                    <p>You need to&nbsp;<Link to="/register"><span>register</span></Link>&nbsp;first in order to use the platform.</p>
                    <p>Or&nbsp;<Link to="/login"><span>log in</span></Link>&nbsp;to your account to proceed.</p>
                </section>
            </>
        )
    }
}

export default HomepageGuest;