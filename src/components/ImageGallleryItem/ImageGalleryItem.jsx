import React from 'react';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={styles.galleryItem} onClick={onClick}>
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
}
