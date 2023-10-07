import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const backendUrl = "https://ams-server.vercel.app";

const AddAuction = () => {
  const auth = getAuthUser();
  const [auction, setAuction] = useState({
    name: "",
    description: "",
    err: "",
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const createAuction = (e) => {
    e.preventDefault();

    setAuction({ ...auction, loading: true });

    const formData = new FormData();
    formData.append("name", auction.name);
    formData.append("description", auction.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .post(backendUrl +"/auctions", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setAuction({
          name: "",
          description: "",
          err: null,
          loading: false,
          success: "Auction Created Successfully !",
        });
        image.current.value = null;
      })
      .catch((err) => {
        setAuction({
          ...auction,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add New auction Form</h1>

      {auction.err && (
        <Alert variant="danger" className="p-2">
          {auction.err}
        </Alert>
      )}

      {auction.success && (
        <Alert variant="success" className="p-2">
          {auction.success}
        </Alert>
      )}

      <Form onSubmit={createAuction}>
        <Form.Group className="mb-3">
          <Form.Control
            value={auction.name}
            onChange={(e) => setAuction({ ...auction, name: e.target.value })}
            type="text"
            required
            placeholder="Auction Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={auction.description}
            required
            onChange={(e) =>
              setAuction({ ...auction, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} required />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New Auction
        </Button>
      </Form>
    </div>
  );
};

export default AddAuction;
