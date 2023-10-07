import React, { useState, useEffect } from "react";
import "../../css/AuctionDetails.css";
import BidAuction from "../../components/BidAuction";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";

const backendUrl = "https://ams-server.vercel.app";

const AuctionDetails = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [auction, setAuction] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  const [bid, setBid] = useState({
    bid: "",
    loading: false,
    err: null,
  });

  useEffect(() => {
    setAuction({ ...auction, loading: true });
    axios
      .get(backendUrl +"/auctions/" + id)
      .then((resp) => {
        setAuction({ ...auction, result: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setAuction({
          ...auction,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [auction.reload]);

  const sendBid = (e) => {
    e.preventDefault();
    setBid({ ...bid, loading: true });
    axios
      .post(
        "${backendUrl}/auctions/bid",
        {
          auction_id: id,
          bid: bid.bid,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((resp) => {
        setBid({ err: null, bid: "", loading: false });
        setAuction({ ...auction, reload: auction.reload + 1 });
      })
      .catch((errors) => {
        setBid({ ...bid, loading: false });
      });
  };

  return (
    <div className="movie-details-container p-5">
      {/* Loader  */}
      {auction.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST Auctions  */}
      {auction.loading === false && auction.err == null && (
        <>
          {/* Details Auction  */}
          <div className="row">
            <div className="col-3">
              <img
                className="movie-image"
                src={auction.result.image_url}
                alt={auction.result.name}
              />
            </div>

            <div className="col-9">
              <h3> {auction.result.name} </h3>
              <p>{auction.result.description}</p>
            </div>
          </div>

          {/* Bids For Auctions  */}
          <hr />
          <h5 className="text-center bg-dark text-white p-2">Review Auctions</h5>

          {auction.result.bids.map((bid) => (
            <BidAuction bid={bid.bid} />
          ))}
          {/* Handle No bid  */}
          {auction.result.bids.length === 0 && (
            <Alert variant="info" className="p-2">
              there is no bids currently for this auction
            </Alert>
          )}

          {auth && (
            <Form onSubmit={sendBid}>
              <Form.Group className="mb-3">
                <textarea
                  value={bid.bid}
                  onChange={(e) =>
                    setBid({ ...bid, bid: e.target.value })
                  }
                  className="form-control"
                  placeholder="Bid for this auction:"
                  rows={2}></textarea>
              </Form.Group>

              <Form.Group className="mb-3">
                <button className="btn btn-dark">Send Bid</button>
              </Form.Group>
            </Form>
          )}
        </>
      )}

      {/* ERRORS HANDLING  */}
      {auction.loading === false && auction.err != null && (
        <Alert variant="danger" className="p-2">
          {auction.err}
        </Alert>
      )}

      {!auth && (
        <Alert variant="warning" className="p-2">
          please login first to be able to make a bid
        </Alert>
      )}
    </div>
  );
};

export default AuctionDetails;
