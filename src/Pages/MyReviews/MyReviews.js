import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';


const MyReviews = () => {

    const [reviews, setReviews] = useState([])
    const { user } = useContext(AuthContext)
    useTitle('Reviews')

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
    const getData = reviews.filter(obj => {
        return obj.userEmail === user?.email;
    });


    return (
        <div>
            {
                user?.uid ?
                    <>
                        {
                            getData.map(receive => <p rev={receive}>{<p>name: {receive.userName}</p>}{receive.reviewData} <br />
                                {receive.serviceName}
                                <div>
                                    <button className="btn btn-outline btn-warning btn-xs mr-3 mb-5" onClick={() => handleDelete(receive)}>Delete</button>
                                    <Link to={`/update/${receive._id}`}>
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