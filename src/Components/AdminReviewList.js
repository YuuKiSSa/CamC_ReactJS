import ReviewRow from "./Page/ReviewRow";
import "../CSS/Review.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AdminReviewList() {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/review/all", {withCredentials: true});
                const adminResponse = await axios.get("http://localhost:8080/api/current-user", { withCredentials: true });
                setReviews(response.data);
                if (adminResponse.data.id !== 'admin'){
                    window.alert("You can't access the admin page!");
                    navigate("/login");
                }
            } catch (error) {
                console.log("Error fetching reviews:", error);
                window.alert("You can't access the admin page!");
                navigate("/login");
            }
        };

        fetchReviews();
    }, [navigate]);

    return (
        <div className="review-list-container">
            <h1>All Reviews({reviews.length})</h1>
            <div className="review-list-table">
                {reviews.map((review) => (
                    <ReviewRow key={review.reviewId} review={review} />
                ))}
            </div>
        </div>
    );
}

export default AdminReviewList;