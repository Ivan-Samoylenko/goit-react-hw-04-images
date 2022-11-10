import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Wraper, SearchForm, SearchBtn, SearchField } from './Searchbar.styled';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (query.trim().length > 0) {
      onSubmit(query);
      setQuery('');
      return;
    }

    toast.warn(
      'You have not entered anything, try to write the name of what you are looking for'
    );
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  return (
    <Wraper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit" aria-label="search button">
          <CiSearch size="24" />
        </SearchBtn>
        <SearchField
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </Wraper>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
