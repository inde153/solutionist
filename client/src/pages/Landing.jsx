import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import Footer from '../components/Footer';

const Container = styled.div``;
const SectionContainer = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  scroll-snap-type: y mandatory;
`;
const Section = styled.div`
  padding: 2rem;
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  box-shadow: 0 0 0 1px inset black;
  /* border-bottom: 1px solid black; */
  :first-child {
    position: relative;
    > img {
      position: absolute;
      opacity: 0.25;
      z-index: 1;
    }
  }

  @media all and (max-width: 1023px) {
    flex-direction: column;
    :nth-child(2n) {
      flex-direction: column-reverse;
    }
  }
  scroll-snap-align: center;
  /* :nth-child(3n + 1) {
    background: #fff6be;
  }
  :nth-child(3n + 2) {
    background: #ffa1ac;
  }
  :nth-child(3n) {
    background: #cbbcf6;
  } */
  img {
    height: 100%;
    /* opacity: 0.5; */
  }
`;

const TextContainer = styled.div`
  flex: 1;
  font-size: 1rem;
  z-index: 5;
`;
const Subheader = styled.div`
  font-size: 2rem;
`;
const Content = styled.div`
  p {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
`;
const ImageContainer = styled.div`
  flex: 1;
  z-index: 5;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  @media all and (max-width: 1023px) {
    height: 50%;
  }
`;

const Landing = () => {
  const [secNum, setSecNum] = useState(1);
  const secRef = useRef([]);

  const delay = 500;
  const [lastScroll, setLastScroll] = useState(0);

  const handleWheel = (e) => {
    if (lastScroll + delay < Date.now()) {
      if (e.deltaY < 0) {
        if (secNum > 1) {
          setLastScroll(Date.now());
          setSecNum(secNum - 1);
          console.log(lastScroll);
        }
      } else if (secNum < 5) {
        setLastScroll(Date.now());
        setSecNum(secNum + 1);
        console.log(lastScroll);
      }
    }
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
        <Section ref={(el) => (secRef.current[1] = el)}>
          <img src="assets/images/LandingBG.png" />
          <ImageContainer>
            <img src="assets/images/Section1.gif" />
          </ImageContainer>
          <TextContainer>
            <Subheader>
              <p>모두가 만들어가는 문제 아카이브</p>
              <p>SOLUTIONIST</p>
            </Subheader>
            <Content>
              <p>쉽게 문제를 만들고</p>
              <p>만든 문제를 풀어보고</p>
              <p>공유해보세요</p>
            </Content>
          </TextContainer>
        </Section>
        <Section ref={(el) => (secRef.current[2] = el)}>
          <TextContainer>
            <Subheader>
              <p>만들어진 문제를 풀어보세요</p>
            </Subheader>
            <Content>
              <p>풀고 나서</p>
              <p>결과를 확인해보세요</p>
              <p>다른 사람들의 생각도 알 수 있습니다</p>
            </Content>
          </TextContainer>
          <ImageContainer>
            <img src="assets/images/Section2.gif" />
          </ImageContainer>
        </Section>
        <Section ref={(el) => (secRef.current[3] = el)}>
          <ImageContainer>
            <img src="assets/images/Section3.gif" />
          </ImageContainer>
          <TextContainer>
            <Subheader>
              <p>원하는 문제가 없으신가요?</p>
              <p>직접 만들어보세요!</p>
            </Subheader>
            <Content>
              <p>SOLUTIONIST에서는</p>
              <p>객관식 문제</p>
              <p>OX문제</p>
              <p>설문조사를 만들 수 있어요</p>
            </Content>
          </TextContainer>
        </Section>
        <Section ref={(el) => (secRef.current[4] = el)}>
          <TextContainer>
            <Subheader>
              <p>다 만드셨나요?</p>
              <p>공유해보세요</p>
            </Subheader>
            <Content>
              <p>공유된 링크에서 바로 문제를 풀 수 있어요</p>{' '}
              <p>모바일부터 PC까지 모든 기기에서 가능합니다</p>
            </Content>
          </TextContainer>
          <ImageContainer>
            <img src="assets/images/Section4.gif" />
          </ImageContainer>
        </Section>
        <Section ref={(el) => (secRef.current[5] = el)}>
          <ImageContainer>
            <img src="assets/images/Section5.gif" />
          </ImageContainer>
          <TextContainer>
            <Subheader>
              <p>모두 다 함께</p>
              <p>문제를 만들어 보세요</p>
            </Subheader>
            <Content>
              <p>문제를 추가하거나</p>
              <p>오타를 수정할 수 있어요</p>
            </Content>
          </TextContainer>
        </Section>
      </SectionContainer>
      {/* <Footer /> */}
    </Container>
  );
};

export default Landing;
