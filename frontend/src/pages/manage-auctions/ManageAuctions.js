import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/ManageAuctions.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const backendUrl = "https://auction-management-system.vercel.app";

const ManageAuctions = () => {
  const auth = getAuthUser();
  const [auctions, setAuctions] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setAuctions({ ...auctions, loading: true });
    axios
      .get(backendUrl +"/auctions")
      .then((resp) => {
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

  const deleteAuction = (id) => {
    axios
      .delete(backendUrl +"/auctions/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setAuctions({ ...auctions, reload: auctions.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Auctions</h3>
        <Link to={"add"} className="btn btn-success">
          Add New Auction +
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th> Name</th>
            <th> Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {auctions.results.map((auction) => (
            <tr key={auction.id}>
              <td>{auction.id}</td>
              <td>
                <img
                  src={auction.image_url}
                  alt={auction.name}
                  className="image-avatar"
                />
              </td>
              <td> {auction.name} </td>
              <td>{auction.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteAuction(auction.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + auction.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                <Link to={"/" + auction.id} className="btn btn-sm btn-info">
                  show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAuctions;
