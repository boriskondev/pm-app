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
                    <p>You need to <Link to="/register"><span>register</span></Link> first in order to use the system.</p>
                    <p>Or just <Link to="/login"><span>log in </span></Link> to your account to proceed.</p>
                </section>
            </>
        )
    }
}

export default HomepageGuest;