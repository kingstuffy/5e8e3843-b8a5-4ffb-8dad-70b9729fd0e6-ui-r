import React, { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getDefaultProduct } from 'services/products';
import { subscribeToNewReviews } from 'services/notifications';
import notificationsConfig from 'config/notifications';
import Product from 'components/Product';
import Reviews from 'components/Reviews';
import Loader from 'components/Loader';
import ReviewModal from 'components/ReviewModal';
import styles from './App.module.css';

const App = () => {
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState();

  const loadData = useCallback(async () => {
    const defaultProduct = await getDefaultProduct();
    setProduct(defaultProduct);
    setReviews(defaultProduct.reviews);
  }, []);

  useEffect(
    () => {
      loadData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    () => {
      const channel = subscribeToNewReviews();
      channel.bind(notificationsConfig.newReview.event, () => {
        loadData();
      });

      return () => {
        channel.unbind(notificationsConfig.newReview.event);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleNewRating = useCallback(({ review, averageRating }) => {
    setReviews((reviews) => [review, ...reviews]);
    setProduct((product) => ({ ...product, averageRating }));
    setIsModalOpen(false);
  }, []);

  return (
    <>
      { product ? (
        <div className={ styles.app }>
          <div className={ styles.wrapper }>
            <Product
              product={ product }
              onAddReview={ () => setIsModalOpen(true) }
            />
            <div className="divider"/>
            <Reviews reviews={ reviews }/>
          </div>
        </div>
      ) : (
        <Loader/>
      ) }
      { isModalOpen && (
        <ReviewModal
          onClose={ () => setIsModalOpen(false) }
          onNewRating={ handleNewRating }
          productId={ product.id }
        />
      ) }
      <Toaster/>
    </>
  );
};

export default App;
