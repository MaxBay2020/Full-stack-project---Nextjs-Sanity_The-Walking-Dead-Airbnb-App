import {urlFor} from "../lib/sanity";

const Review = ({review}) => {
    return (
        <div className='review-box'>
            <h1>{review.rating}</h1>
            <h1>{review.traveller.name}</h1>
            <img className='traveller-image' src={urlFor(review.traveller.image).width(50).height(50).crop('focalpoint').url()} alt={review.traveller.name} />
        </div>
    );
};

export default Review;
