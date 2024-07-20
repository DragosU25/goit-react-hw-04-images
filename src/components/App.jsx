import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from './Loader';
import Modal from './Modal';
import ImageContext from './Context/Context';

export default function App() {
  const {
    images,
    loading,
    error,
    showModal,
    selectedImage,
    handleSearchSubmit,
    loadMoreImages,
    handleModal,
    handleModalClose,
  } = useContext(ImageContext);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ImageGallery images={images} handleClick={handleModal} />
      )}
      {!loading && !error && images.length > 0 && (
        <Button type={'button'} onClick={loadMoreImages} text={'Load more'} />
      )}
      {showModal && (
        <Modal imageUrl={selectedImage} onClose={handleModalClose} />
      )}
    </div>
  );
}
