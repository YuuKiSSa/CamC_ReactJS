import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/UserReviews.css';

const UserReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState('date');
  const location = useLocation();

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

    const pendingReview = JSON.parse(localStorage.getItem('pendingReview'));
    if (pendingReview) {
      setNewReview(pendingReview.comment);
      setNewRating(pendingReview.rating);

      localStorage.removeItem('pendingReview');
    }
  }, [id, location.state]);

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  const handleSubmitReview = async () => {
    try {
      await axios.get(`http://localhost:8080/api/current-user`, { withCredentials: true });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem('pendingReview', JSON.stringify({
          comment: newReview,
          rating: newRating
        }));
        localStorage.setItem('redirectAfterLogin', window.location.pathname);

        const shouldLogin = window.confirm("You need to be logged in to submit a review. Do you want to log in now?");

        if (shouldLogin) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          return;
        } else {
          return;
        }
      } else {
        console.error('Error fetching user:', error);
      }
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/add-review`, {
        cameraId: id,
        comment: newReview,
        rate: newRating,
      }, {withCredentials: true});
      setReviews(prevReviews => [...prevReviews, response.data]);
      setNewReview('');
      setNewRating(1);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === 'rating') {
      return b.rating - a.rating;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  // Pagination calculations
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!reviews.length) {
    return (
        <div className="user-reviews-container">
          <h2>User Reviews</h2>

          <div className="add-review-container">
            <h3>Add Your Review</h3>
            <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
            />
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                  <span
                      key={i}
                      className={`submit_star ${i < newRating ? 'submit_filled' : ''}`}
                      onClick={() => handleRatingChange(i + 1)}
                  >
              ★
            </span>
              ))}
            </div>
            <button onClick={handleSubmitReview} className="submit_review">Submit Review</button>
          </div>
        </div>
    )
  }

  return (
      <div className="user-reviews-container">
        <h2>User Reviews</h2>

        <div className="add-review-container">
          <h3>Add Your Review</h3>
          <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
          />
          <div className="rating">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={`submit_star ${i < newRating ? 'submit_filled' : ''}`}
                    onClick={() => handleRatingChange(i + 1)}
                >
              ★
            </span>
            ))}
          </div>
          <button onClick={handleSubmitReview} className="submit_review">Submit Review</button>
        </div>

        <div className="review-sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {currentReviews.map((review, index) => {
          const reviewDate = new Date(review.date);
          const formattedDate = reviewDate.toLocaleString();
          return (
              <div key={index} className="review-row">
                <div className="review-avatar"></div>
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

        <div className="pagination">
          <button
              onClick={handlePrevious}
              className="pagination-button"
              disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          {pageNumbers.map(number => (
              <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-button ${number === currentPage ? 'active' : ''}`}
              >
                {number}
              </button>
          ))}
          <button
              onClick={handleNext}
              className="pagination-button"
              disabled={currentPage === pageNumbers.length}
          >
            Next &gt;
          </button>
        </div>
      </div>
)};

export default UserReviews;