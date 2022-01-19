import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

const Container = styled.div``;
const SectionContainer = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  scroll-snap-type: y mandatory;
`;
const Section = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  scroll-snap-align: center;
  :nth-child(3n + 1) {
    background: #fff6be;
  }
  :nth-child(3n + 2) {
    background: #ffa1ac;
  }
  :nth-child(3n) {
    background: #cbbcf6;
  }
`;

const Landing = () => {
  const [secNum, setSecNum] = useState(1);
  const secRef = useRef([]);

  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      if (secNum > 1) setSecNum(secNum - 1);
    } else if (secNum < 5) setSecNum(secNum + 1);
    console.log(secRef.current.map((el) => el.scrollTop));
  };

  if (secRef.current[0]) {
    secRef.current[secNum].scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  useEffect(() => {
    const cancelWheel = (e) => secRef.current[0] && e.preventDefault();
    document.body.addEventListener('wheel', cancelWheel, { passive: false });
  }, []);

  return (
    <Container>
      <SectionContainer ref={(el) => (secRef.current[0] = el)} onWheel={handleWheel}>
        <Section ref={(el) => (secRef.current[1] = el)}>1</Section>
        <Section ref={(el) => (secRef.current[2] = el)}>2</Section>
        <Section ref={(el) => (secRef.current[3] = el)}>3</Section>
        <Section ref={(el) => (secRef.current[4] = el)}>4</Section>
        <Section ref={(el) => (secRef.current[5] = el)}>5</Section>
      </SectionContainer>
    </Container>
  );
};

export default Landing;
