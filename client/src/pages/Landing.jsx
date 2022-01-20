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
  scroll-snap-align: center;
  justify-content: space-evenly;

  :first-child {
    position: relative;
    > img {
      position: absolute;
      opacity: 0.1;
      object-fit: cover;
      width: 100%;
    }
    ::before {
      content: '';
      width: 100%;
      height: 100%;
      background-image: url('assets/images/LandingBG.png');
      background-size: cover;
      opacity: 0.1;
      z-index: 0;
      position: absolute;
    }
  }
  flex-direction: row-reverse;
  @media all and (max-width: 1023px) {
    flex-direction: column;
    justify-content: center;
    :nth-child(2n) {
      flex-direction: column-reverse;
    }
  }
  :nth-child(2n) {
    background: white;
  }
  img {
    height: 100%;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  z-index: 1;
  user-select: none;
`;
const Header = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  p {
    font-size: 1.75rem;
    word-wrap: break-word;
    word-break: keep-all;
    margin-bottom: 0.25rem;
    font-family: 'GongGothicMedium', sans-serif;
    :nth-child(2) {
      font-size: 2rem;
      color: var(--butterscotch);
      background-color: rgba(0, 0, 0, 0.75);
      padding: 0.25rem 0;
    }
  }
`;
const HeaderContent = styled.div`
  font-size: 1rem;
  p {
    margin-bottom: 0.25rem;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
const TextContainer = styled.div`
  flex: 1;
  font-size: 1rem;
  z-index: 5;
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  max-width: 500px;
  user-select: none;
  @media all and (max-width: 1023px) {
    margin: 0;
    width: 100%;
  }
`;
const Subheader = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  word-wrap: break-word;
  word-break: keep-all;
  user-select: none;
  p {
    margin-bottom: 0.25rem;
    font-family: 'GongGothicMedium', sans-serif;
  }
  div {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
const Content = styled.div`
  p {
    font-weight: 300;
    font-family: 'Noto Sans KR', sans-serif;
    margin-bottom: 0.25rem;
    word-wrap: break-word;
    word-break: keep-all;
  }
`;
const ImageContainer = styled.div`
  flex: 2;
  z-index: 5;
  height: 100%;
  max-width: 500px;
  max-height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  @media all and (max-width: 1023px) {
    max-width: 400px;
    max-height: 400px;
  }
`;
const Chicken = styled.div`
  margin-top: 2rem;
`;
const Last = styled.div`
  scroll-snap-align: center;
`;

const Landing = () => {
  const [secNum, setSecNum] = useState(1);
  const secRef = useRef([]);

  const delay = 1000;
  const [lastScroll, setLastScroll] = useState(0);

  const handleWheel = (e) => {
    if (lastScroll + delay < Date.now()) {
      if (e.deltaY < 0) {
        if (secNum > 1) {
          setLastScroll(Date.now());
          setSecNum(secNum - 1);
          console.log(lastScroll);
        }
      } else if (secNum < 6) {
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
          <ImageContainer>
            <img src="assets/images/Section1.png" />
          </ImageContainer>
          <HeaderContainer>
            <Header>
              <p>다 함께 만들어가는</p>
              <p>문제 아카이브</p>
              <div>SOLUTIONIST</div>
            </Header>
            <HeaderContent>
              <p>쉽게 문제를 만들고,</p>
              <p>만든 문제를 풀고,</p>
              <p>공유해보세요.</p>
            </HeaderContent>
          </HeaderContainer>
        </Section>
        <Section ref={(el) => (secRef.current[2] = el)}>
          <TextContainer>
            <Subheader>
              <div>가장 먼저!</div>
              <p>만들어진 문제를 풀어보세요!</p>
            </Subheader>
            <Content>
              <p>풀고 나서 결과를 확인해보세요.</p>
              <p>다른 사람들의 생각도 알 수 있습니다.</p>
            </Content>
            <Chicken>치킨 모의고사 풀러가기 -></Chicken>
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
              <div>원하는 문제가 없을땐...</div>
              <p>문제를 직접 만들어보세요!</p>
            </Subheader>
            <Content>
              <p>SOLUTIONIST에서는</p>
              <p>객관식 문제,</p>
              <p>OX문제,</p>
              <p>설문조사</p>
              <p>를 만들 수 있습니다.</p>
            </Content>
            <Chicken>문제 만들기로 이동 -></Chicken>
          </TextContainer>
        </Section>
        <Section ref={(el) => (secRef.current[4] = el)}>
          <TextContainer>
            <Subheader>
              <div>다 만드셨나요?</div>
              <p>공유해보세요.</p>
            </Subheader>
            <Content>
              <p>공유된 링크에서 바로 문제를 풀 수 있어요.</p>
              <p>모바일부터 PC까지 모든 기기에서 가능합니다.</p>
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
              <p>문제를 만들수 있어요.</p>
            </Subheader>
            <Content>
              <p>이미 작성 되어있는 문제 모음에</p>
              <p>문제를 추가하거나,</p>
              <p>오타를 수정할 수 있어요.</p>
            </Content>
            <Chicken>다른 사람들의 문제 보러가기 -></Chicken>
          </TextContainer>
        </Section>
        <Last ref={(el) => (secRef.current[6] = el)}>
          <Footer />
        </Last>
      </SectionContainer>
    </Container>
  );
};

export default Landing;
