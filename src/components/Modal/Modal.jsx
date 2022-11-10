import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalCloseBtn, ModalSheet } from './Modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';

const modalRootElement = document.querySelector('#modal');

export function Modal({ toggleModal, children }) {
  useEffect(() => {
    function handleOnEsc(event) {
      if (event.code === 'Escape') {
        this.props.toggleModal();
      }
    }

    document.addEventListener('keydown', handleOnEsc);
    return () => {
      document.removeEventListener('keydown', handleOnEsc);
    };
  }, []);

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <ModalCloseBtn type="button" onClick={toggleModal}>
        <AiOutlineClose size="40" />
      </ModalCloseBtn>
      <ModalSheet>{children}</ModalSheet>
    </Backdrop>,
    modalRootElement
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
