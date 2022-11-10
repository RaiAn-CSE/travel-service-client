import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../../hooks/useTitle';



const Service = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const [review, setReview] = useState([]);
    const { img, price, title, description, _id } = service;
    useTitle('ServiceDetails')

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }

        , [review])

    const filtered = review.filter(obj => {
        return obj.reviewId === service._id;
    });
    console.log(filtered);

    const handleReview = event => {
        event.preventDefault();
        const form = event.target;
        const uName = user?.displayName || '';
        console.log("name", uName);
        const userImage = user?.photoURL || '';
        const userEmail = user?.email;
        const reviewData = form.review.value;

        const reviews = {
            reviewId: _id,
            userName: uName,
            reviewData,
            userImage,
            userEmail
        }

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert("Order placed Successfully")
                    form.reset();
                }

            })
            .catch(err => console.log(err))

    }
    return (
        <>
            <div className="card card-compact w-100 bg-base-100 shadow-xl mb-5">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className='text-2xl text-orange-600 font-semibold'>Price: {price}</p>
                    <p>{description}</p>
                </div>
            </div>

            <div>

                {
                    filtered.map(rev => <p rev={rev}>{
                        <img
                            style={{ height: '30px' }}
                            src={rev.userImage}
                            alt=""
                        ></img>
                    }{<p>name: {rev.userName}</p>}{rev.reviewData}</p>)
                }
            </div>

            {
                user?.uid ?
                    <>
                        <div className='mb-5 text-center'>
                            <form onSubmit={handleReview}>
                                <textarea name="review" className="textarea textarea-bordered h-24 w-full" placeholder="Your Message" required></textarea>

                                <input className='btn' type="submit" value="Submit Your Comments" />
                            </form>
                        </div>
                    </>
                    :
                    <>
                    </>
            }


        </>
    );
};

export default Service;