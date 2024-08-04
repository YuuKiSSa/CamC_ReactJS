import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/UserReviews.css';

const UserReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/review/${id}`);
        const allReviews = response.data.flatMap(user => user.reviews);
        setReviews(allReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);

  if (!reviews.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-reviews-container">
      <h2>User Reviews</h2>
      {reviews.map((review, index) => {
        const reviewDate = new Date(review.date);
        const formattedDate = reviewDate.toLocaleString();
        return (
          <div key={index} className="review-row">
            <div className="review-avatar">
              {/* Placeholder for user avatar */}
            </div>
            <div className="review-content">
              <span className="review-username">{review.userName}</span>
              <div className="review-details">
                <span className="review-comment">{review.comment}</span>
                <span className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}></span>
                  ))}
                </span>
              </div>
              <span className="review-date">{formattedDate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserReviews;