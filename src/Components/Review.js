import {useEffect, useState} from "react";
import axios from "axios";
import "../CSS/Review.css"
import ReviewRow from "./Page/ReviewRow";

function Review() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/review/all", {withCredentials: true});
                setReviews(response.data);
            } catch (error) {
                console.log("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="review-list-container">
        <h1>All Reviews({reviews.length})</h1>
            <div className="review-list-table">
                {reviews.map((review) => (
                    <ReviewRow key={review.reviewId} review={review} />
                ))}
            </div>
        </div>
    )
}

export default Review;