import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import "../CSS/Review.css"

function ReviewRow({ review }) {
    const [camera, setCamera] = useState({});
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchCamera = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/main/${review.cameraId}`);
                const cameraData = response.data;
                setCamera(cameraData);
                setImage(cameraData.imageUrls[0]);
            } catch (error) {
                console.log('Error fetching camera data', error);
            }
        };

        fetchCamera();
    }, [review.cameraId]);

    const handleDelete = () => {
        const deleteCamera = async () => {
            try{
                await axios.delete(`http://localhost:8080/api/delete-review/${review.reviewId}`, {withCredentials: true});

            } catch (error) {
                console.log('Error deleting review', error);
            }
        };
        deleteCamera();
        window.location.reload();
    };

    return (
        <div className="review-list-row">
            <div className="camera-image">
                <img src={image} alt="Camera"/>
            </div>
            <div className="review-list-details">
                <div><strong>Name:</strong> {camera.productName}</div>
                <div><strong>Comment:</strong> {review.comment}</div>
                <div className="review-time-and-delete">
                    <div><strong>Time:</strong> {moment(review.time).format('YYYY-MM-DD HH:mm')}</div>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
                <div className="review-list-rate"><strong>Rate:</strong> {review.rate}</div>
            </div>
        </div>
    );
}

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