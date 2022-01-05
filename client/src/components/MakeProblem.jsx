import * as React from 'react';
import styled from 'styled-components';
import OxIcon from '../icons/Ox';
import ListIcon from '../icons/List';
import SurveyIcon from '../icons/Survey';
import TrashIcon from '../icons/Trash';
import DecreaseIcon from '../icons/Decrease';
import IncreaseIcon from '../icons/Increase';
import CheckIcon from '../icons/Check';
import CheckBoldIcon from '../icons/CheckBold';

const ProblemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 56.6% 1fr;
  grid-template-rows: 1fr;
`;

const ProblemNum = styled.div`
  font-size: 15rem;
  color: var(--orangey-yellow);
  opacity: 0.5;
  text-align: end;
  margin-right: 1rem;
`;
const Problem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    'question icons'
    'list list-count'
    'explanation explanation';
`;
const ProblemOx = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    'question icons'
    'list list'
    'explanation explanation';
`;
const Question = styled.textarea`
  grid-area: question;
  font-size: 2.5rem;
  margin: 2rem 0 1rem 1rem;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
  height: 49px;
`;

const IconContainer = styled.div`
  display: flex;
  grid-area: icons;
  margin-top: 2rem;
  justify-content: flex-end;
`;
const Icon = styled.div`
  margin: 0.5rem 1rem auto 0;
  :hover {
    svg {
      fill: black;
    }
  }
  :focus {
    svg {
      fill: var(--orangey-yellow);
    }
  }
`;
const ListContainer = styled.ol`
  grid-area: list;
`;
const List = styled.li`
  display: flex;
  border-bottom: 1px solid var(--warm-grey);
  margin-top: 1rem;
  margin-left: 1rem;
  color: var(--warm-grey);
  align-items: center;
`;
const ListNum = styled.div`
  width: 2.5rem;
  height: 3.5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
`;
const ListContent = styled.textarea`
  height: 40px;
  font-size: 1.75rem;
  margin: 0.5rem 0 0.5rem 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  color: black;
  width: 100%;
  flex: 1;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const ListCheck = styled.div`
  height: 3.5rem;
  width: 2rem;
  margin-right: 0.5rem;
  align-self: end;
  display: flex;

  :hover {
    svg {
      fill: var(--vibrant-green);
    }
  }
  svg {
    align-self: end;
    margin-bottom: 0.5rem;
  }
`;
const ListCount = styled.div`
  grid-area: list-count;
`;
const CountHeader = styled.div`
  height: 3.5rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  color: var(--warm-grey);
  display: flex;
  justify-content: center;
  align-items: end;
`;
const CounterContainer = styled.div`
  color: var(--warm-grey);
  height: 3.5rem;
  font-size: 2rem;
  margin-top: 1rem;
  color: var(--warm-grey);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Counter = styled.div`
  width: auto;
  margin: 0 1.5rem;
`;
const ExplanationContainer = styled.div`
  grid-area: explanation;
  padding-bottom: 2.5rem;
  margin-top: 2.5rem;
  border-bottom: 2px solid var(--orangey-yellow);
`;
const Explanation = styled.textarea`
  padding: 1rem 2rem;
  width: calc(100% - 6rem - 2px);
  margin: 0 1rem;
  font-size: 1.5rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  color: var(--warm-grey);
  height: 67px;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const OxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const OxCard = styled.div`
  width: 12rem;
  height: 12rem;
  padding: 4rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  margin: 0 4.2%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    object-fit: contain;
  }
`;
const CountController = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MakeProblem = ({ problem, data, setData, idx, addProblem }) => {
  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleClick = (e) => {
    console.log(e.target.id);
    const choices = [...problem.choices];

    if (e.target.id[0] === 'i' && choices.length < 10) {
      choices.push({ index: choices.length + 1, content: '' });
    } else if (e.target.id[0] === 'd' && choices.length > 2) {
      choices.pop();
    }

    const problems = [...data.problems];

    if (e.target.id[0] === 's') {
      problems[idx].answer = 0;
    } else if (e.target.id[0] === 'a') {
      problems[idx].answer = Number(e.target.id[1]) + 1;
    } else if (e.target.id[0] === 'O') {
      problems[idx].answer = 1;
    } else if (e.target.id[0] === 'X') {
      problems[idx].answer = 2;
    }

    if (e.target.id[0] === 't') {
      problems.splice(idx, 1);
    } else {
      problems.splice(idx, 1, { ...problem, choices });
    }

    setData({ ...data, problems });
  };

  const handleToggle = () => {
    const problems = [...data.problems];
    if (problem.isOx) {
      problems[idx].isOx = false;
    } else problems[idx].isOx = true;

    setData({ ...data, problems });
  };

  const handleChange = (e) => {
    const problems = [...data.problems];
    const choices = [...problem.choices];
    if (e.target.id[0] === 'q') problems[idx].question = e.target.value;
    else if (e.target.id[0] === 'e') problems[idx].explanation = e.target.value;
    else if (e.target.id[0] === 'c') {
      choices[e.target.id[1]].content = e.target.value;
      problems.splice(idx, 1, { ...problem, choices });
    }

    setData({ ...data, problems });
  };

  return (
    <ProblemContainer>
      <ProblemNum>
        <p>{idx + 1}</p>
      </ProblemNum>
      {problem.isOx ? (
        <ProblemOx>
          <Question
            placeholder="문제를 입력해주세요."
            onInput={autoGrow}
            onChange={handleChange}
            value={problem.question}
            id="question"
          />
          <IconContainer>
            <Icon onClick={handleClick} id="survey" answer={problem.answer === 0}>
              <SurveyIcon fill="var(--warm-grey)" />
            </Icon>
            <Icon onClick={handleToggle}>
              <ListIcon fill="var(--warm-grey)" />
            </Icon>
            <Icon onClick={handleClick} id="trash">
              <TrashIcon fill="var(--warm-grey)" />
            </Icon>
          </IconContainer>
          <ListContainer>
            <OxContainer>
              <OxCard onClick={handleClick} id="O">
                <img src="./assets/icons/circle.svg" id="O" />
              </OxCard>
              <OxCard onClick={handleClick} id="X">
                <img src="./assets/icons/scissors.svg" id="X" />
              </OxCard>
            </OxContainer>
          </ListContainer>
          <ExplanationContainer>
            <Explanation
              placeholder="해설"
              onChange={handleChange}
              value={problem.explanation}
              id="explanation"
            />
          </ExplanationContainer>
        </ProblemOx>
      ) : (
        <Problem>
          <Question
            placeholder="문제를 입력해주세요."
            onInput={autoGrow}
            onChange={handleChange}
            value={problem.question}
            id="question"
          />
          <IconContainer>
            <Icon onClick={handleClick} id="survey">
              <SurveyIcon
                id="survey"
                fill={problem.answer === 0 ? 'var(--orangey-yellow)' : 'var(--warm-grey)'}
              />
            </Icon>
            <Icon onClick={handleToggle}>
              <OxIcon fill="var(--warm-grey)" />
            </Icon>
            <Icon onClick={handleClick} id="trash">
              <TrashIcon fill="var(--warm-grey)" />
            </Icon>
          </IconContainer>
          <ListContainer>
            {problem.choices.map((choice, idx) => (
              <List key={`choice ${idx + 1}`}>
                <ListNum>{`${idx + 1}.`}</ListNum>
                <ListContent
                  placeholder={`${idx + 1}번 보기`}
                  onChange={handleChange}
                  value={choice.content}
                  id={`c${idx}`}
                  onInput={autoGrow}
                />
                <ListCheck onClick={handleClick} id={`a${idx}`}>
                  <CheckIcon
                    idx={`${idx}`}
                    fill={
                      choice.index === problem.answer
                        ? 'var(--vibrant-green)'
                        : 'var(--warm-grey)'
                    }
                  />
                </ListCheck>
              </List>
            ))}
          </ListContainer>
          <ListCount>
            <CounterContainer>
              <CountController onClick={handleClick} id="decrease">
                <DecreaseIcon id="decrease" fill="var(--warm-grey)" />
              </CountController>
              <Counter>{problem.choices.length}</Counter>
              <CountController onClick={handleClick} id="increase">
                <IncreaseIcon id="increase" fill="var(--warm-grey)" />
              </CountController>
            </CounterContainer>
          </ListCount>
          <ExplanationContainer>
            <Explanation
              placeholder="해설"
              onChange={handleChange}
              value={problem.explanation}
              id="explanation"
              onInput={autoGrow}
            />
          </ExplanationContainer>
        </Problem>
      )}
    </ProblemContainer>
  );
};

export default MakeProblem;
