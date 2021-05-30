import "./SearchClients.css";
import Header from "../../common/parts/Header";
import {useState, useEffect} from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import SearchBar from "../../common/parts/SearchBar";

const SearchClients = () => {
    const [input, setInput] = useState("");
    const [clientsListDefault, setClientsListDefault] = useState([]);
    const [clientsList, setClientsList] = useState([]);

    const fetchData = async () => {
        return await fetchWrapper.get(endpoints.CLIENTS)
            .then(data => {
                setClientsList(data)
                setClientsListDefault(data)
            });
    }

    const updateInput = async (input) => {
        const filtered = clientsListDefault.filter(client => {
            return client.clientName.toLowerCase().includes(input.toLowerCase());
        })
        setInput(input);
        setClientsList(filtered);
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <Header title="Search clients"/>
            <section className="search-wrapper">

                <SearchBar
                    input={input}
                    updateInput={updateInput}
                    placeholder="Enter client name"
                    onChange={(e) => updateInput(e.target.value)}
                />

                <div className="search-result">
                    {clientsList.length > 0
                        ? clientsList.map(client => (
                            <Link
                                style={{textDecoration: "none"}}
                                to={`/edit-client/${client._id}`}>
                                <div className="client">
                                    {client.clientName}
                                </div>
                            </Link>
                        ))
                        : (
                            <div className="notifications">
                                <span className="error">No results found :(</span>
                            </div>
                        )}
                </div>
            </section>
        </>
    )
}

export default SearchClients;