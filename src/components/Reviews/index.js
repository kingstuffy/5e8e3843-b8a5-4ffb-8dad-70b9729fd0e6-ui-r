import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
import Ratings from 'components/Ratings';

const Reviews = ({reviews}) => {
  return (
    <div>
      <h2 className={styles.title}>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map((review) => (
          <li
            key={review.id}
            className={classnames(styles.item, 'flex items-center')}>
            <div className={styles.stars}>
              <Ratings value={Math.round(review.rating)} />
            </div>
            <div className={classnames(styles.summary, 'flex items-center')}>
              <div className={styles.ratingNum}>{review.rating}</div>,
              <div className={styles.ratingText}>{review.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
