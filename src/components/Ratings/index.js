import React, {useCallback, useState} from 'react';
import classnames from 'classnames';
import onIcon from './icons/on.svg';
import offIcon from './icons/off.svg';
import styles from './index.module.css';

const ratings = [1, 2, 3, 4, 5];

const RatingButtons = ({
  ratings,
  bgIcon,
  isActive,
  onMouseOver,
  onMouseOut,
  onClick,
}) =>
  ratings.map((rating) => (
    <button
      key={rating}
      type="button"
      className={styles.btn}
      title={rating}
      onClick={isActive ? () => onClick(rating) : null}
      onMouseOver={isActive ? () => onMouseOver(rating) : null}
      onMouseOut={isActive ? () => onMouseOut() : null}>
      <img src={bgIcon} alt={rating} />
    </button>
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
    setHoverValue(0);
  }, []);

  return (
    <div className={styles.ratings}>
      <div className={classnames(styles.row, styles.off)}>
        <RatingButtons
          ratings={ratings}
          bgIcon={offIcon}
          isActive={isActive}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
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
          onMouseOut={handleMouseOut}
        />
      </div>
    </div>
  );
};

export default Ratings;
