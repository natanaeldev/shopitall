import React from "react";

import "./ReviewsCard.scss";

function ReviewsCard({ username, date, createAt, review }) {
  return (
    <div className="singleproduct__comment">
      <div className="singleproduct__comment-header">
        <span className="singleproduct__comment-avatar"></span>
        <div className="singleproduct__comment-subheader">
          <h3 className="singleproduct__comment-name">{username}</h3>
          <p className="singleproduct__comment-date">{date(createAt)}</p>
        </div>
      </div>
      <p>{review}</p>
    </div>
  );
}

export default ReviewsCard;
