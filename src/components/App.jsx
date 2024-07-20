import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from './Loader';
import Modal from './Modal';

const API_KEY = '43921619-d69945085d06baa690e6f0201';
const INITIAL_PER_PAGE = 12;

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = useCallback(async searchQuery => {
    setQuery(searchQuery);
    setPage(1); // Reset page to 1 on new search
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${INITIAL_PER_PAGE}&page=1`
      );
      setImages(response.data.hits);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error searching images:', error);
      setError('Error searching images');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreImages = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const nextPage = page + 1; // Increment page number
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${INITIAL_PER_PAGE}&page=${nextPage}`
      );
      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setPage(nextPage); // Update page number
    } catch (error) {
      console.error('Error loading more images:', error);
      setError('Error loading more images');
    } finally {
      setLoading(false);
    }
  };

  const handleModal = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (query) {
      handleSearchSubmit(query);
    }
  }, [query, handleSearchSubmit]);

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
