import React, {useCallback, useMemo, useState} from 'react';
import throttle from 'lodash/throttle';
import classnames from 'classnames';
import onIcon from './icons/on.svg';
import offIcon from './icons/off.svg';
import styles from './index.module.css';

const ratings = [1, 2, 3, 4, 5];

const getRatingValue = (e, rating) => {
  const rect = e.target.getBoundingClientRect();
  const halfRating = (1 - Math.round((e.clientX - rect.x) / rect.width)) * 0.5;
  return rating - halfRating;
};

const RatingButton = ({
  rating,
  bgIcon,
  isActive,
  onMouseOver,
  onMouseOut,
  onClick,
}) => {
  const handleMouseMove = useMemo(
    () =>
      throttle((e) => {
        const ratingValue = getRatingValue(e, rating);
        onMouseOver(ratingValue);
      }, 200),
    [rating, onMouseOver],
  );

  const handleClick = useCallback(
    (e) => {
      const ratingValue = getRatingValue(e, rating);
      onClick(ratingValue);
    },
    [rating, onClick],
  );

  return (
    <button
      key={rating}
      type="button"
      className={styles.btn}
      title={rating}
      onClick={isActive ? handleClick : null}
      onMouseMove={isActive ? handleMouseMove : null}
      style={{backgroundImage: `url(${bgIcon})`}}
    />
  );
};

const RatingButtons = ({
  ratings,
  bgIcon,
  isActive,
  onMouseOver,
  onClick,
}) =>
  ratings.map((rating) => (
    <RatingButton
      key={rating}
      rating={rating}
      bgIcon={bgIcon}
      isActive={isActive}
      onMouseOver={onMouseOver}
      onClick={onClick}
    />
  ));

const Ratings = ({value, onChange, isActive}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const width = ((hoverValue || value) / 5) * 100;

  const handleMouseOver = useCallback((value) => {
    setHoverValue(value);
  }, []);

  const handleClick = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange],
  );

  const handleMouseOut = useCallback(() => {
    // Allow for mousemove throttle to fire
    setTimeout(() => {
      setHoverValue(0);
    }, 300);
  }, []);

  return (
    <div
      className={classnames(styles.ratings, {
        [styles.active]: isActive,
      })}
      onMouseLeave={handleMouseOut}>
      <div className={classnames(styles.row, styles.off)}>
        <RatingButtons
          ratings={ratings}
          bgIcon={offIcon}
          isActive={isActive}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
        />
      </div>
      <div
        className={classnames(styles.row, styles.on)}
        style={{width: `${width}%`}}>
        <RatingButtons
          ratings={ratings}
          bgIcon={onIcon}
          isActive={isActive}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
        />
      </div>
    </div>
  );
};

export default Ratings;
