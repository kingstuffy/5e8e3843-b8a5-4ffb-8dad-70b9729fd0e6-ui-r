import React from 'react';
import PrimaryButton from 'components/PrimaryButton';
import closeIcon from 'icons/close.svg';
import styles from './index.module.css';
import Ratings from 'components/Ratings';

const ReviewModal = ({ onClose }) => {
  return (
    <div className={ styles.modal }>
      <div className={ styles.overlay }/>
      <div className={ styles.content }>
        <form className={ styles.form }>
          <button type="button" className={ styles.closeBtn } onClick={ onClose }>
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
              <Ratings value={ 0 }/>
            </div>
            <div className={ styles.error }>Please select a rating</div>
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
            />
          </div>
          <PrimaryButton type="submit">Submit review</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
