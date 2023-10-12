import React, { useState } from "react";
import ReviewList from "./ReviewList";
import SortingOptions from "./SortingOptions";
import ReviewForm from "./ReviewForm";
import "./App.css";

const App = () => {
  const [userReviews, setUserReviews] = useState([
    {
    "id": 1,
    "userEmail": "customer1@example.com",
    "reviewerName": "Customer A",
    "reviewText": "Great product! I love it.",
    "reviewTime": "10:30",
    "reviewDate": "2023-05-25",
    "reviewRating": 5
  },
  {
    "id": 2,
    "userEmail": "customer2@example.com",
    "reviewerName": "Customer B",
    "reviewText": "Good value for the price.",
    "reviewTime": "11:15",
    "reviewDate": "2023-05-28",
    "reviewRating": 4
  },
  {
    "id": 3,
    "userEmail": "customer3@example.com",
    "reviewerName": "Customer C",
    "reviewText": "Excellent customer service!",
    "reviewTime": "09:45",
    "reviewDate": "2023-05-20",
    "reviewRating": 5,
  },
  {
    "id": 4,
    "userEmail": "customer4@example.com",
    "reviewerName": "Customer D",
    "reviewText": "Product quality could be better.",
    "reviewTime": "14:00",
    "reviewDate": "2023-05-15",
    "reviewRating": 3,
  },
]);

  const [sortedReviews, setSortedReviews] = useState([...userReviews]); 

  // Funkcija prideti naujus atsiliepimus
  const addNewCustomerReview = (customerReview) => {
    // Sukurti idividualia id naujam atsiliepimui
    const newReviewId = userReviews.length + 1;
    customerReview.id = newReviewId;

    // Dadeti atsiliepimus prie jau egzistuojanciu
    setUserReviews([...userReviews, customerReview]);
    setSortedReviews([...sortedReviews, customerReview]);
  };

  // Funkcija kad pagal criteria sortintu
  const handleSortChange = (sortedReviews) => {
    setSortedReviews([...sortedReviews]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Reviews</h1>
      </header>
      <main className="app-main">
        <SortingOptions
          userReviews={userReviews}
          onSortChange={handleSortChange}
        />
        <ReviewList userReviews={sortedReviews} />
        <ReviewForm onSubmit={addNewCustomerReview} />
      </main>
      <footer className="app-footer">
        <h3 className="app-credits">Made by Aidas & Gustas</h3>
      </footer>
    </div>
  );
};

export default App;