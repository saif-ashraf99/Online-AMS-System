import React, { useState, useEffect } from "react";
import AuctionsCard from "../../components/AuctionsCard";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const backendUrl = "https://ams-server.vercel.app";

const Home = () => {
  const [auctions, setAuctions] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setAuctions({ ...auctions, loading: true });
    axios
      .get(backendUrl +"/auctions", {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        console.log(resp);
        setAuctions({ ...auctions, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setAuctions({
          ...auctions,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [auctions.reload]);

  const searchAuctions = (e) => {
    e.preventDefault();
    setAuctions({ ...auctions, reload: auctions.reload + 1 });
  };

  return (
    <div className="home-container p-5">
      {/* Loader  */}
      {auctions.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST AUCTIONS  */}
      {auctions.loading === false && auctions.err == null && (
        <>
          {/* Filter  */}
          <Form onSubmit={searchAuctions}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                type="text"
                placeholder="Search for an auction"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </Form.Group>
          </Form>

          {/* LIST AUCTIONS  */}
          <div className="row ">
            {auctions.results.map((auction) => (
              <div className="col-3 card-auction-container" key={auction.id}>
                <AuctionsCard
                  name={auction.name}
                  description={auction.description}
                  image={auction.image_url}
                  id={auction.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ERRORS HANDLING  */}
      {auctions.loading === false && auctions.err != null && (
        <Alert variant="danger" className="p-2">
          {auctions.err}
        </Alert>
      )}

      {auctions.loading === false &&
        auctions.err == null &&
        auctions.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Auctions Found !
          </Alert>
        )}
    </div>
  );
};

export default Home;
