import React from 'react';
import classnames from 'classnames';
import PrimaryButton from 'components/PrimaryButton';
import Ratings from 'components/Ratings';
import styles from './index.module.css';

const Product = ({product, onAddReview}) => {
  return (
    <div>
      <h1
        data-cy="product-name"
        className={classnames(styles.title, 'text-xxl font-bold')}>
        {product.name}
      </h1>
      <div
        className={classnames(
          styles.details,
          'flex items-center justify-between',
        )}>
        <div className={classnames(styles.ratings, 'flex items-center')}>
          <div
            className={classnames(styles.avgRating, 'text-xxl')}
            data-cy="product-average-rating">
            {product.averageRating}
          </div>
          <div>
            <Ratings value={product.averageRating} />
          </div>
        </div>
        <PrimaryButton data-cy="open-review-modal-button" onClick={onAddReview}>
          Add review
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Product;
