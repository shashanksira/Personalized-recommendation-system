import React from 'react';
import ReactDOM from 'react-dom';
import './Star.css';
import StarRatingComponent from 'react-star-rating-component';

class Star extends React.Component {
    render() {
        // aggregateRating = 2.35;
        return (
          <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span></span>}
          starCount={10}
          value={8}
        />
        );
      }
}
export default Star;