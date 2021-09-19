import React, { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getDefaultProduct } from 'services/products';
import Product from 'components/Product';
import Reviews from 'components/Reviews';
import Loader from 'components/Loader';
import ReviewModal from 'components/ReviewModal';
import styles from './App.module.css';

const App = () => {
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState();

  useEffect(() => {
    const loadData = async () => {
      const defaultProduct = await getDefaultProduct();
      setProduct(defaultProduct);
      setReviews(defaultProduct.reviews);
    };

    loadData();
  }, []);

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
