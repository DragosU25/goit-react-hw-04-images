import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGallleryItem';

import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { images, handleClick } = this.props;
    return (
      <ul className={styles.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => handleClick(image.largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
