import React from "react";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

const RestaurantCard = ({
  restaurant: {
    name,
    location,
    cuisines,
    thumb,
    _id,
    price_range,
    user_rating,
  },
}) => {
  let Details = null;
  if (window.location.pathname === "/") {
    Details = (
      <div className="link-details">
        <Link to={`/restaurants/${_id}`} className="btn btn-danger">
          Details
        </Link>
      </div>
    );
  }
  let dollar = "$".repeat(price_range);
  return (
    <div className="card">
      <div className="img">
        <img src={thumb} alt="" />
      </div>
      <div className="details">
        <h5 className="card-header">{name}</h5>

        <div className="loaction">
          <div className="rating-row">
            <Rating
              className="rating-mg"
              name={name}
              value={parseFloat(user_rating.aggregate_rating)}
              readOnly
            />
            <span>{user_rating.votes} reviews</span>
          </div>
          <span>{dollar}</span>
          <span>Cuisine - {cuisines}</span>
          <span>
            {location.address},{location.city}
          </span>
        </div>
        {Details}
      </div>
    </div>
  );
};

export default RestaurantCard;
