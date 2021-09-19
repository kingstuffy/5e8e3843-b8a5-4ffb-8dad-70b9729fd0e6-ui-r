import React from 'react';
import classnames from 'classnames';
import onIcon from './icons/on.svg';
import offIcon from './icons/off.svg';
import styles from './index.module.css';

const ratings = [1, 2, 3, 4, 5];

const RatingButtons = ({ratings, bgIcon}) =>
  ratings.map((rating) => (
    <button key={rating} type="button" className={styles.btn} title={rating}>
      <img src={bgIcon} alt={rating} />
    </button>
  ));

const Ratings = ({value}) => {
  const width = (value / 5) * 100;

  return (
    <div className={styles.ratings}>
      <div className={classnames(styles.row, styles.off)}>
        <RatingButtons ratings={ratings} bgIcon={offIcon} />
      </div>
      <div className={classnames(styles.row, styles.on)} style={{width}}>
        <RatingButtons ratings={ratings} bgIcon={onIcon} />
      </div>
    </div>
  );
};

export default Ratings;
