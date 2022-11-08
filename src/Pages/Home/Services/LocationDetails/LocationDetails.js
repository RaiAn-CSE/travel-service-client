import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Review from '../Review/Review';

const LocationDetails = () => {
    const { title, price, img } = useLoaderData();
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-2xl text-orange-600 font-semibold'>Price: ${price}</p>
            </div>
            <div className='text-center p-3'>
                <Link to='/review'>
                    <button className="btn btn-primary">Review</button>
                </Link>
            </div>
        </div>
    );
};

export default LocationDetails;