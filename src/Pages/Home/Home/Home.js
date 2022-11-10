import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Services from './Services/Services';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <div className='my-5 text-center'>
                <Link to="/services">
                    <button className="btn btn-primary">See All Services</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;