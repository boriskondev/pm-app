import "./App.css";

import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import Homepage from "./components/pages/Homepage";
import Footer from "./components/common/Footer";
import Data from "./components/Data";


function App() {

    return (
        <div className="App">

            <Navigation />

            <main>
                <Header title="Седмичен обзор" />
                <Homepage />
                <Data />
            </main>

            <Footer />


        </div>
    );
}

export default App;
