import "./SearchClients.css";
import Header from "../../common/parts/Header";
import {useState, useEffect} from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";

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
                <div className="search-bar">
                    <input
                        value={input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder={"Enter client name"}
                        onChange={(e) => updateInput(e.target.value)}
                    />
                </div>
                <div className="search-result">
                    {clientsList.length > 0
                        ? clientsList.map(client => (
                            <div className="client">{client.clientName}</div>
                        ))
                        : null}
                </div>
            </section>
        </>
    )
}

export default SearchClients;