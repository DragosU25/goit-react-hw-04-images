import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from './Loader';
import Modal from './Modal';

const API_KEY = '43921619-d69945085d06baa690e6f0201';
const INITIAL_PER_PAGE = 12;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      query: '',
      loading: false,
      error: null,
      perPage: INITIAL_PER_PAGE,
      showModal: false,
      selectedImage: null,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.loadMoreImages = this.loadMoreImages.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async handleSearchSubmit(query) {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      );

      this.setState({
        images: response.data.hits,
        query,
        loading: false,
      });
    } catch (error) {
      console.error('Error searching images:', error);
      this.setState({ error: 'Error searching images' });
    } finally {
      this.setState({ loading: false });
    }
  }

  async loadMoreImages(event) {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const { images, perPage, query } = this.state;
      const nextPage = Math.ceil(images.length / perPage) + 1;

      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${nextPage}`
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading more images:', error);
      this.setState({ loading: false, error: 'Error loading more images' });
    }
  }

  handleModal = imageUrl => {
    this.setState({
      showModal: true,
      selectedImage: imageUrl,
    });
  };

  handleModalClose() {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  }

  render() {
    const { images, loading, error, showModal, selectedImage } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ImageGallery images={images} handleClick={this.handleModal} />
        )}
        {!loading && !error && images.length > 0 && (
          <Button
            type={'button'}
            onClick={this.loadMoreImages}
            text={'Load more'}
          />
        )}
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}
