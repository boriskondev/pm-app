import "./SearchClients.css";
import Header from "../../common/parts/Header";
import { useState, useEffect } from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";
import { Link } from "react-router-dom";
import SearchBar from "../../common/parts/SearchBar";
import LoadingIndicator from "../../common/parts/LoadingIndicator";

const SearchClients = () => {
  const [input, setInput] = useState("");
  const [clientsListDefault, setClientsListDefault] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    return await fetchWrapper.get(endpoints.CLIENTS).then((data) => {
      setClientsList(data);
      setClientsListDefault(data);
      setIsLoading(false);
    });
  };

  const updateInput = async (input) => {
    const filtered = clientsListDefault.filter((client) => {
      return client.clientName.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setClientsList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header title="Search clients" />
        <LoadingIndicator />
      </>
    );
  }

  return (
    <>
      <Header title="Search clients" />
      <section className="search-wrapper">
        <SearchBar
          input={input}
          updateInput={updateInput}
          placeholder="Enter client name"
          onChange={(e) => updateInput(e.target.value)}
        />

        <div className="search-result">
          {clientsList && clientsList.length > 0 ? (
            clientsList.map((client) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/edit-client/${client._id}`}
              >
                <div className="result-card client-card">
                  <p>{client.clientName}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="notifications">
              <span className="error">No results found :(</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchClients;
