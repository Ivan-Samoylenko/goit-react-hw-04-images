import { useState, useEffect } from 'react';
import { fetchImages } from 'services';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isNeededLoadMoreBtn, setIsNeededLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      getImages();
    }
  }, [query, page]);

  async function getImages() {
    setStatus('pending');

    try {
      const data = await fetchImages(query, page);
      const isNeededLoadMoreBtn = data.totalHits > images.length + 12;

      setImages(prev => [...prev, ...data.hits]);
      setStatus('resolved');
      setIsNeededLoadMoreBtn(isNeededLoadMoreBtn);

      if (data.hits.length === 0) {
        toast.info(
          `Nothing found for your query: "${query}", try searching for another matches.`
        );
      }
    } catch {
      setStatus('rejected');
      toast.error('Something went wrong. Try reloading the page');
    }
  }

  function handleSubmit(value) {
    setQuery(value);
    setPage(1);
    setImages([]);
  }

  function handleLoadMoreClick() {
    setPage(prev => prev + 1);
  }

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}

      {status === 'pending' && <Loader />}

      {isNeededLoadMoreBtn && status === 'resolved' && (
        <Button onClick={handleLoadMoreClick}>Load more</Button>
      )}

      <ToastContainer
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="colored"
      />
    </Container>
  );
}
