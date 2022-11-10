import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';


const MyReviews = () => {

    const [reviews, setReviews] = useState([])
    // const [deleteReview, setDeleteReview] = useState([])
    const { user } = useContext(AuthContext)
    useTitle('Reviews')
    // console.log(reviews)

    // useEffect(() =>{
    //     fetch('http://localhost:5000/reviews')
    //     .then(res => res.json())
    //     .then(data => setDeleteReview(data))
    // },[])

    // console.log(deleteReview)
    const handleDelete = review => {
        const agree = window.confirm(`Are you sure you want to delete : ${review.reviewData}`)
        if (agree) {
            console.log("Deleting user with id:", review._id)
            fetch(`http://localhost:5000/reviews/${review._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("User deleted successfully")

                        const remaining = reviews.filter(dlt => dlt._id !== review._id)
                        setReviews(remaining)
                    }
                    console.log(data)
                })
        }
    }
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    const filtered = reviews.filter(obj => {
        return obj.userEmail === user?.email;
    });
    // console.log(filtered);


    return (
        <div>
            {
                user?.uid ?
                    <>
                        {
                            filtered.map(rev => <p rev={rev}>{<p>name: {rev.userName}</p>}{rev.reviewData}
                                <div>
                                    <button className="btn btn-outline btn-warning btn-xs mr-3 mb-5" onClick={() => handleDelete(rev)}>Delete</button>
                                    <Link to={`/update/${rev._id}`}>
                                        <button className="btn btn-outline btn-success btn-xs">Update</button>
                                    </Link>
                                </div>
                            </p>)
                        }
                    </>
                    :
                    <>
                        <p>No reviews found</p>
                    </>
            }

        </div>
    );
};

export default MyReviews;