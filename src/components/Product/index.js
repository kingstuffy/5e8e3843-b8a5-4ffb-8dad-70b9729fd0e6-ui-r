import React from 'react';
import classnames from 'classnames';
import PrimaryButton from 'components/PrimaryButton';
import Ratings from 'components/Ratings';
import styles from './index.module.css';

const Product = ({product, onAddReview}) => {
  return (
    <div>
      <h1 className={classnames(styles.title, 'text-xxl font-bold')}>
        {product.name}
      </h1>
      <div
        className={classnames(
          styles.details,
          'flex items-center justify-between',
        )}>
        <div className={classnames(styles.ratings, 'flex items-center')}>
          <div className={classnames(styles.avgRating, 'text-xxl')}>
            {product.averageRating}
          </div>
          <div>
            <Ratings value={product.averageRating} />
          </div>
        </div>
        <PrimaryButton onClick={onAddReview}>Add review</PrimaryButton>
      </div>
    </div>
  );
};

export default Product;
