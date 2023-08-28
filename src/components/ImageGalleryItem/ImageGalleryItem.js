import React from 'react';
import { ImageModal } from 'components/Modal/Modal';
import { ImgGalleryItem, ImgGalleryItemImage } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = event => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImgGalleryItem>
      <ImgGalleryItemImage
        onClick={openModal}
        src={image.webformatURL}
        alt={image.tags}
      />

      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={{ tags: image.tags, largeImageURL: image.largeImageURL }}
      />
    </ImgGalleryItem>
  );
};
