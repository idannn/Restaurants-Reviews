import React from "react";
import Rating from "@material-ui/lab/Rating";

const MyRating = ({ topic, setter }) => {
  return (
    <div className="myRating">
      <label className="label">{topic}</label>

      <Rating
        name={topic}
        //if starting value of the rating needed --
        //value={3}
        //readOnly
        onChange={(event) => {
          setter(event.target.value);
        }}
      />
    </div>
  );
};

export default MyRating;
