import React, { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";
import SortingOptions from "./components/SortingOptions";
import ReviewForm from "./components/ReviewForm";
import axios from "axios";

const api_end_point = "http://localhost:3001/api"

function App() {
  const [userReviews, setUserReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([...userReviews]); 

  useEffect(() => {
    axios.get(`${api_end_point}/atsiliepimai`)
    .then((result) => {
      setUserReviews(result.data)
    });
  }, [])

  // Funkcija prideti naujus atsiliepimus
  const addNewCustomerReview = (customerReview) => {
    // Sukurti idividualia id naujam atsilnnniepimui
    axios.post(`${api_end_point}/atsiliepimai`, {
      vardas: customerReview.vardas,
      pastas: customerReview.pastas,
      tekstas: customerReview.tekstas,
      vertinimas: customerReview.vertinimas,
      laikas: customerReview.laikas
    })

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
        <ReviewList userReviews={sortedReviews.length > 0 ? sortedReviews : userReviews} />
        <ReviewForm onSubmit={addNewCustomerReview} />
      </main>
      <footer className="app-footer">
        <h3 className="app-credits">Made by Aidas & Gustas</h3>
      </footer>
    </div>
  );
};

export default App;