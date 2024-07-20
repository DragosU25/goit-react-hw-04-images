import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = '43921619-d69945085d06baa690e6f0201';
const INITIAL_PER_PAGE = 12;

const ImageContext = createContext();

export function ImageProvider({ children }) {
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

  const loadMoreImages = async () => {
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

  return (
    <ImageContext.Provider
      value={{
        images,
        query,
        loading,
        error,
        showModal,
        selectedImage,
        handleSearchSubmit,
        loadMoreImages,
        handleModal,
        handleModalClose,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export default ImageContext;
