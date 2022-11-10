import { useState } from 'react';
import { ListItem, Image, LargeImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ smallImg, largeImg, alt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModalOnClick(event) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }

  function toggleModal() {
    setIsModalOpen(prev => !prev);
  }

  return (
    <ListItem>
      <Image src={smallImg} alt={alt} onClick={toggleModalOnClick} />
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <LargeImage src={largeImg} alt={alt} />
        </Modal>
      )}
    </ListItem>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
