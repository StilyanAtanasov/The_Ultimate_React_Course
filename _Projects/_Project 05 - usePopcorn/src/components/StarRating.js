import PropTypes from "prop-types";
import { useState } from "react";
import { Star } from "./Star";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export function StarRating({ maxRating = 5, onSetRating, defaultRating = 0, color = "#fcc419", size = 24, messages = [], className = "" }) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleSetRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div>
      <div className={`star-rating ${className}`}>
        <div className="stars">
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              onClick={() => handleSetRating(i + 1)}
              onMouseEnter={() => setTempRating(i + 1)}
              onMouseLeave={() => setTempRating(0)}
              full={rating > i || tempRating > i}
              color={color}
              size={size}
            />
          ))}
        </div>
        <p style={{ color, fontSize: `${size / 1.5}px` }}> {messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}</p>
      </div>
    </div>
  );
}
