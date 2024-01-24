import React from "react";

function ReviewList ({ userReviews }) {
  return (
    <div>
      {userReviews.map((review) => (
        <div key={review.id} className="user-review card mb-3">
          <div className="card-header">
            {review.vardas} ({review.laikas})
            <span>{<StarRating rating={review.vertinimas} />}</span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.tekstas}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const StarRating = ({ rating }) => {
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(10 - Math.ceil(rating));
  return (
    <span>
      {fullStars}
      {emptyStars}
    </span>
  );
};

export default ReviewList;
