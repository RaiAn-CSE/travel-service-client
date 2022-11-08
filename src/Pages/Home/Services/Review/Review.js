import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const Review = () => {
    // const { title } = useLoaderData();
    const { user } = useContext(AuthContext);
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 mb-5'>
            <div>
                <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Comments"></textarea>
            </div>
            <div className=''>
                <input name="name" type="text" placeholder="Your Name" className="input input-ghost w-full input-bordered" />
                <input name="email" type="email" placeholder="your email" defaultValue={user?.email} className="input input-ghost w-full input-bordered" readOnly />
            </div>
            <div className='text-center'>
                <input className='btn' type="submit" value="Submit Your Comments" />
            </div>
        </div>
    );
};

export default Review;