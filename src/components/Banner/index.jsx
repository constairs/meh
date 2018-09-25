import React from 'react';
import styled from 'styled-components';

// import './index.scss';

const Page = styled.div`
  position: relative;
  padding: 40px;
`;

const Background = styled.div`
  width: 400px;
  height: 250px;
  transform: translateZ(0);
  background: url('../../assets/img/background.jpg');
  background-size: cover;
  border-radius: 2px;
`;

const TitleH2 = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #2b2b2b;
`;

export const Banner = () => (
  <Page>
    <Background>
      <TitleH2>Banner</TitleH2>
    </Background>
  </Page>
);
