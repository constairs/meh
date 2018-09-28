import styled from 'styled-components';
import { media } from '../../theme/media';

export const FilePreview = styled.div`
  border-radius: 3px;
  width: 80px;
  min-width: 80px;
  height: 80px;
  padding: 16px;
  background-color: #aaaaaa;
  color: #000000;
  font-size: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  ${media.phoneLg`
    width: 50px;
    height: 50px;
    min-width: 50px;
    font-size: 30px;
  `};
  img {
    display: block;
    width: 100%;
  }
`;
