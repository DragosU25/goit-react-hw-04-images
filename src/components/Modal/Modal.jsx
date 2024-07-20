import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const instance = basicLightbox.create(`
      <img src=${imageUrl} width="800" height="600">
    `);

    instance.show();

    const handleEscape = event => {
      if (event.key === 'Escape') {
        instance.close();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      instance.close();
    };
  }, [imageUrl, onClose]);

  return null;
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
