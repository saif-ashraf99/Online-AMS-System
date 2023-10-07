import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const backendUrl = "https://auction-management-system.vercel.app";

const UpdateAuction = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [auction, setAuction] = useState({
    name: "",
    description: "",
    image_url: null,
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);

  const updateAuction = (e) => {
    e.preventDefault();

    setAuction({ ...auction, loading: true });

    const formData = new FormData();
    formData.append("name", auction.name);
    formData.append("description", auction.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .put("${backendUrl}/auctions/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setAuction({
          ...auction,
          loading: false,
          success: "auction updated successfully !",
          reload: auction.reload + 1,
        });
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

  useEffect(() => {
    axios
      .get("${backendUrl}/auctions/" + id)
      .then((resp) => {
        setAuction({
          ...auction,
          name: resp.data.name,
          description: resp.data.description,
          image_url: resp.data.image_url,
        });
      })
      .catch((err) => {
        setAuction({
          ...auction,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [auction.reload]);

  return (
    <div className="login-container">
      <h1>Update Auction</h1>

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

      <Form onSubmit={updateAuction} className="text-center py-2">
        <img
          alt={auction.name}
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={auction.image_url}
        />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Auction Name"
            value={auction.name}
            onChange={(e) => setAuction({ ...auction, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={auction.description}
            onChange={(e) =>
              setAuction({ ...auction, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Auction
        </Button>
      </Form>
    </div>
  );
};

export default UpdateAuction;
