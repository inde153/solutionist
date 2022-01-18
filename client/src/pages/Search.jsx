import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import SetCard from '../components/SetCard';
import SetCardVerTwo from '../components/SetCardVerTwo';
import MoveTopButton from '../components/MoveTopButton';

import { searchSets, popularSets } from '../api/SearchSetAPI';
// import { useLocation } from 'react-router-dom';

const SetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    '. header .'
    '. cards .';
  margin: 1.2rem 0;
  grid-row-gap: 1.2rem;
  grid-column-gap: 1rem;
`;

const Header = styled.div`
  grid-area: header;
  font-size: 1.75rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  grid-area: cards;

  div:nth-child(n + 9) {
    display: ${(props) => (props.$display ? 'none' : '')};
  }
`;

const ShowBox = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 56.6%;
  margin: 0 21.7%;
`;

const Divider = styled.div`
  width: 56.6%;
  height: 2px;
  margin: 0 21.7% 2rem 21.7%;
  background-color: var(--orangey-yellow);
`;

// * Search Bar
const SearchContainer = styled.div`
  /* grid-area: search; */
  /* justify-content: center; */
  /* align-items: center; */
  display: flex;
  width: 56.6%;
  margin: 2rem 21.7% 0 21.7%;
`;
const SearchInput = styled.input`
  width: calc(100% - 55px);
  height: 48px;
  padding: 0 0 0 5px;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;
const SearchIconContainer = styled.div`
  width: 46px;
  height: 46px;
  border: 2px solid black;
  border-radius: 10px 10px 10px 0;
  background-color: var(--butterscotch);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  const [isMadeHidden, setIsMadeHidden] = useState(true);
  const handleMadeHidden = () => {
    setIsMadeHidden(!isMadeHidden);
  };

  const [isSolvedHidden, setIsSolvedHidden] = useState(true);
  const handleSolvedHidden = () => {
    setIsSolvedHidden(!isSolvedHidden);
  };

  // * search API
  const [searchedSets, setSearchedSets] = useState([]);
  const [popSets, setPopSets] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  // const keyword = new URLSearchParams(useLocation()).get('title');
  const [message, setMessage] = useState('검색중...');

  // * Search Bar
  const [searchKey, setSearchKey] = useState('');
  const [isOverEight, setIsOverEight] = useState(false);

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setSearchedSets([]);
    const sendAPICall = async () => {
      const data = await searchSets(searchKey);
      if (data) {
        // console.log('searchSets', data.data);
        setSearchedSets(data.data);
        setIsSearch(true);
      }
    };
    sendAPICall();
  };

  useEffect(() => {
    if (searchedSets.length > 8) {
      setIsOverEight(true);
    } else {
      setIsOverEight(false);
    }
    if (searchedSets.length === 0) {
      setMessage('검색 결과가 없습니다 :(');
    }
  });

  useEffect(() => {
    setPopSets([]);
    const sendAPICall = async () => {
      const data = await popularSets();
      setPopSets(data.data);
    };
    sendAPICall();
  }, []);

  return (
    <>
      <SearchContainer onSubmit={() => false}>
        <SearchInput
          type="text"
          // value={searchKey}
          // onChange={(e) => setSearchKey(e.target.value)}
          onKeyUp={handleInputChange}
          placeholder="Search..."
        />
        <SearchIconContainer>
          <img src="/assets/icons/search.svg" alt="search-icon" onClick={handleSearch} />
        </SearchIconContainer>
      </SearchContainer>
      {/* 상단 이동 버튼 테스트 */}
      <MoveTopButton />
      {isSearch ? (
        <>
          <SetsContainer>
            <Header>검색 결과</Header>
            <CardsContainer $display={isMadeHidden}>
              {searchedSets.length === 0 ? (
                <p>{message}</p>
              ) : (
                <>
                  {searchedSets.map((search) => (
                    <SetCardVerTwo
                      isSearch={isSearch}
                      averageScore={search.averageScore}
                      id={search.id}
                      createdAt={search.createdAt}
                      creator={search.creator}
                      description={search.description}
                      solvedUserNumber={search.solvedUserNumber}
                      title={search.title}
                      key={search.id}
                      updatedAt={search.updatedAt}
                    />
                  ))}
                </>
              )}
            </CardsContainer>
          </SetsContainer>
          {isOverEight && (
            <>
              <ShowBox onClick={handleMadeHidden}>
                {isMadeHidden ? <p>Show More</p> : <p>Show less</p>}
              </ShowBox>
              <Divider />
            </>
          )}
        </>
      ) : (
        <>
          <SetsContainer>
            <Header>인기 세트</Header>
            <CardsContainer $display={isMadeHidden}>
              {popSets.map((pop) => (
                <SetCardVerTwo
                  isSearch={!isSearch}
                  averageScore={pop.averageScore}
                  id={pop.id}
                  createdAt={pop.createdAt}
                  creator={pop.creator}
                  description={pop.description}
                  solvedUserNumber={pop.solvedUserNumber}
                  title={pop.title}
                  key={pop.id}
                  updatedAt={pop.updatedAt}
                />
              ))}
            </CardsContainer>
          </SetsContainer>
          <ShowBox onClick={handleMadeHidden}>
            {isMadeHidden ? <p>Show More</p> : <p>Show less</p>}
          </ShowBox>
          <Divider />
        </>
      )}
    </>
  );
};

export default Search;
