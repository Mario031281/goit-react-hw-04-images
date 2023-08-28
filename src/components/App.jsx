import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Btn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyled';
import { StyledApp } from './App.styled';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const changeQuery = newQuery => {
    if (query === newQuery) {
      toast.info('Change please your request.');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };
  useEffect(() => {
    if (query === '') return;
    setIsLoading(true);
    fetchImages(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast.error("This didn't work.");
        }
        const normalizeData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setImages(prevState => [...prevState, ...normalizeData]);
        setTotalImages(data.totalHits);
      })
      .catch(error => {
        console.error('Помилка при завантаженні зображень:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledApp>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            position: 'top-right',
            reverseOrder: false,
          },
          success: {
            background: 'green',
            color: 'white',
          },
          error: {
            background: 'red',
            color: 'white',
          },
        }}
      />
      <SearchBar onSubmit={changeQuery} />

      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            fontSize: 28,
            padding: 120,
            textAlign: 'center',
          }}
        >
          Image gallery is empty...
        </p>
      )}
      {isLoading && <Loader />}
      {totalImages !== images.length && !isLoading && (
        <Btn onClick={handleLoadMore} />
      )}

      <GlobalStyle />
    </StyledApp>
  );
};
