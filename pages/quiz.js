import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QuizBackground from "../src/components/QuizBackground";
import Widget from "../src/components/Widget";
import db from "../db.json";
import Button from "../src/components/Button";
import QuizLogo from "../src/components/QuizLogo";
import Footer from "../src/components/Footer";
import QuizContainer from "../src/components/QuizContainer";
import ContentLoader from "react-content-loader";
import Confetti from "react-confetti";

// Trabalhando nessa parte ainda 😕
// export const Img = styled.img`
//   width: 100%;
//   max-height: 5rem;
// `;

export const Loader = (props) => (
  <Widget>
    <Widget.Header />
    <ContentLoader
      speed={2}
      width={400}
      height={360}
      viewBox="0 0 400 360"
      backgroundColor="rgba(40,40,40,0.2)"
      foregroundColor="rgba(60,60,60, 0.2)"
      {...props}
    >
      <rect x="24" y="71" rx="2" ry="2" width="306" height="13" />
      <rect x="24" y="28" rx="0" ry="0" width="308" height="39" />
      <rect x="23" y="92" rx="0" ry="0" width="167" height="13" />
      <rect x="41" y="120" rx="0" ry="0" width="269" height="44" />
      <rect x="42" y="171" rx="0" ry="0" width="268" height="42" />
      <rect x="43" y="286" rx="0" ry="0" width="267" height="44" />
      <rect x="43" y="221" rx="0" ry="0" width="268" height="42" />
    </ContentLoader>
  </Widget>
);

export const Option = styled.div`
  outline: 0;
  display: block;
  width: 100%;
  margin: 2% 0;
  font-size: 0.9rem;
  border-radius: 0.25rem;
  padding: 0.7rem;
  background-color: ${db.theme.colors.primary};
  opacity: 0.6;
  transition: background-color 0.5s;
  &:hover {
    background-color: ${db.theme.colors.secondary};
    opacity: 1;
    cursor: pointer;
    transition: background-color 0.5s;
  }
`;

export const QuestionWidget = ({
  totalQuestions,
  questionIndex,
  question,
  onSubmit,
}) => {
  const radioName = `radio_${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <p>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</p>
      </Widget.Header>
      {/* O componente de imagem será adicionado aqui. */}
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>Selecione a alternativa que mais faz sentido para você:</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((item, i) => {
            return (
              <Option as="label" htmlFor={i} key={i}>
                <input name={radioName} id={i} type="radio" />
                {` ${item}`}
              </Option>
            );
          })}

          <Button type="submit">CONFIRMAR</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
};

export const Result = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      <Widget>
        <Widget.Header>Resultado</Widget.Header>
        <Widget.Content>
          Você chegou até o final! Mais ainda não conseguimos dizer se você é
          bom o bastante. 😅
        </Widget.Content>
      </Widget>
    </>
  );
};

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
          />
        )}
        {screenState === screenStates.LOADING && <Loader />}
        {screenState === screenStates.RESULT && <Result />}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
