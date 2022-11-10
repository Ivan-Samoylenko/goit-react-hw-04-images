import styled from 'styled-components';

export const ListItem = styled.li`
  flex-basis: 100%;

  background-color: ${p => p.theme.colors.gray};

  ${p => p.theme.mediaQueries.mobile} {
    flex-basis: calc((100% - 10px) / 2);
  }

  ${p => p.theme.mediaQueries.tablet} {
    flex-basis: calc((100% - 20px) / 3);
  }

  ${p => p.theme.mediaQueries.desktop} {
    flex-basis: calc((100% - 30px) / 4);
  }
`;

export const Image = styled.img`
  cursor: zoom-in;

  box-shadow: ${p => p.theme.shadows.image};

  transition: transform ${p => p.theme.transition},
    box-shadow ${p => p.theme.transition};

  :hover {
    transform: scale(1.01);

    box-shadow: ${p => p.theme.shadows.imageHover};
  }

  ${p => p.theme.mediaQueries.mobile} {
    object-fit: cover;
  }
`;

export const LargeImage = styled.img`
  object-fit: scale-down;
`;
