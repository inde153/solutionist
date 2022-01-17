import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

const fromRight = keyframes`
  from {
    transform: translateX(100%)
  }

  to {
    transform: translateX(0)
  }
  
`;

const Container = styled.div`
  display: ${(props) => (props.versionOn ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  width: calc(25% - 2rem);
  height: calc(100% - 1rem);
  top: 0;
  right: 0;
  background-color: white;
  border-left: 1px solid var(--warm-grey-50);
  animation: ${fromRight} 0.5s cubic-bezier(0, 0, 0.2, 1);
  z-index: 998;
`;
const Version = styled.div`
  p {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  background-color: ${(props) =>
    props.backgroundColor ? 'var(--butterscotch)' : 'none'};
  p:first-child {
    margin-bottom: 0.25rem;
  }
  :hover {
    background-color: ${(props) =>
      props.backgroundColor ? 'var(--butterscotch)' : 'var(--orangey-yellow-50)'};
  }
`;
const VersionContainer = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    box-shadow: 0 0 0 1px inset var(--warm-grey);
  }
  div:first-child {
    background-color: var(--butterscotch);
    box-shadow: 0 0 0 1px inset var(--warm-grey-50);
  }
`;
const Button = styled.div`
  display: flex;
  width: 50%;
  height: 2.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;
const EditVersion = ({ versionOn, setVersionOn, collectionId }) => {
  const dummy = [
    {
      solvedUserNumber: 0,
      setId: 59,
      collectionId: 40,
      creator: null,
      title: '수정 전 세트 제목',
      description: '수정 전 세트 설명',
      createdAt: '2022. 1. 17. 오전 2:22:15',
      problems: [
        {
          id: 462,
          setId: 59,
          index: 1,
          question: '수정 전 문제',
          answer: 1,
          explanation: '수정 전 해설',
          isOX: false,
          choice: [
            {
              id: 405,
              problemId: 462,
              index: 1,
              content: '수정 전 보기 1번',
              selectionRate: 0,
            },
            {
              id: 406,
              problemId: 462,
              index: 2,
              content: '수정 전 보기 2번',
              selectionRate: 0,
            },
          ],
        },
      ],
    },
    {
      solvedUserNumber: 0,
      setId: 59,
      collectionId: 40,
      creator: null,
      title: '수정 전 세트 제목',
      description: '수정 전 세트 설명',
      createdAt: '2022. 1. 17. 오전 2:22:15',
      problems: [
        {
          id: 462,
          setId: 59,
          index: 1,
          question: '수정 전 문제',
          answer: 1,
          explanation: '수정 전 해설',
          isOX: false,
          choice: [
            {
              id: 405,
              problemId: 462,
              index: 1,
              content: '수정 전 보기 1번',
              selectionRate: 0,
            },
            {
              id: 406,
              problemId: 462,
              index: 2,
              content: '수정 전 보기 2번',
              selectionRate: 0,
            },
          ],
        },
      ],
    },
  ];

  const [versions, setVersions] = useState(dummy);
  const [clickIdx, setClickIdx] = useState(null);

  useEffect(() => {
    // 컬렉션ID 를 통한 컬렉션에 있는 set 정보를 갖고오기 (new API)
    // axios.get(`${process.env.SERVER_URL}sets/`).then((res) => setData(res.data));
  }, [versionOn]);

  const handleRestore = () => {
    // setID를 통해 setData
    axios.get(`${process.env.SERVER_URL}sets/`).then((res) => setData(res.data));
  };

  return (
    <Container versionOn={versionOn}>
      <VersionContainer>
        {versions.map((version, idx) => (
          <Version onClick={() => setClickIdx(idx)} backgroundColor={idx === clickIdx}>
            <p>{version.createdAt}</p>
            <p>수정자</p>
          </Version>
        ))}
      </VersionContainer>
      <ButtonContainer>
        <Button onClick={handleRestore}>되돌리기</Button>
        <Button onClick={() => setVersionOn(false)}>취소</Button>
      </ButtonContainer>
    </Container>
  );
};

export default EditVersion;
