"use client"

import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";
import Rating from "react-rating";

const ShowRating = ({rating}:{rating:number}) => {
    return (
        <div className="">
            <Rating
                initialRating={rating}
                fractions={2}
                fullSymbol={<FaStar className="text-yellow-400 " />}
                emptySymbol={<FaRegStar className="text-gray-300 " />}
                placeholderSymbol={<FaStarHalfStroke className="text-yellow-300 " />}
                />
        </div>
    );
};

export default ShowRating;