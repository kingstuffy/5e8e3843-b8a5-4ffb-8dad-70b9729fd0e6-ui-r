import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import PrimaryButton from 'components/PrimaryButton';
import Ratings from 'components/Ratings';
import closeIcon from 'icons/close.svg';
import styles from './index.module.css';
import { addReview } from 'services/reviews';

const ReviewModal = ({ onClose, onNewRating, productId }) => {
  const [rating, setRatings] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRatingError, setHasRatingError] = useState(false);

  const handleRatingsChange = useCallback((value) => {
    setRatings(value);
    setHasRatingError(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!rating) {
        toast.error('Please select a rating');
        setHasRatingError(true);
        return;
      }

      try {
        setIsSubmitting(true);
        const { message, data } = await addReview({
          rating,
          text,
          product: productId,
        });
        const { review, averageRating } = data;

        setIsSubmitting(false);
        toast.success(message);
        onNewRating({ review, averageRating });
      } catch (e) {
        const message =
          e.response?.data?.message ||
          'Unable to submit rating, please try again';
        toast.error(message);
        setIsSubmitting(false);
      }
    },
    [rating, text, onNewRating, productId],
  );

  return (
    <div className={ styles.modal }>
      <div className={ styles.overlay }/>
      <div className={ styles.content }>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <button
            type="button"
            className={ styles.closeBtn }
            onClick={ onClose }
            disabled={ isSubmitting }>
            <img className={ styles.closeIcon } src={ closeIcon } alt="close"/>
          </button>
          <div className={ styles.group }>
            <h1 className="title">What’s your rating?</h1>
          </div>
          <div className={ styles.group }>
            <label className={ styles.label } htmlFor="form__rating">
              Rating
            </label>
            <div className="flex">
              <Ratings
                value={ rating }
                onChange={ handleRatingsChange }
                isActive={ true }
              />
            </div>
            { hasRatingError && (
              <div className={ styles.error }>Please select a rating</div>
            ) }
          </div>
          <div className={ styles.group }>
            <label className={ styles.label } htmlFor="form__text">
              Review
            </label>
            <textarea
              id="form__text"
              className={ styles.textarea }
              placeholder="Start typing..."
              maxLength="50"
              value={ text }
              onChange={ (e) => setText(e.target.value) }
            />
          </div>
          <PrimaryButton type="submit" disabled={ isSubmitting }>
            { isSubmitting ? 'Submitting...' : 'Submit review' }
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
