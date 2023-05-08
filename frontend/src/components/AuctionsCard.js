import React from "react";
import Card from "react-bootstrap/Card";
import "../css/AuctionsCard.css";
import { Link } from "react-router-dom";

const AuctionsCard = (props) => {
  return (
    <div>
      <Card>
        <Card.Img className="card-image" variant="top" src={props.image} />
        <Card.Body>
          <Card.Title> {props.name} </Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Link className="btn btn-dark w-100" to={"/" + props.id}>
            Show More
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuctionsCard;
