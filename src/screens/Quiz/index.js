import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import QuizBackground from "../../components/QuizBackground";
import Widget from "../../components/Widget";
import WidgetLoader from "../../components/WidgetLoader";
// import db from "../../../db.json";
import Button from "../../components/Button";
import Option from "../../components/Option";
import QuizLogo from "../../components/QuizLogo";
import Footer from "../../components/Footer";
import QuizContainer from "../../components/QuizContainer";
import AlternativesForm from "../../components/AlternativesForm";
import Confetti from "react-confetti";
import styled from "styled-components";

// Trabalhando nessa parte ainda 😕
// export const Img = styled.img`
//   width: 100%;
//   max-height: 5rem;
// `;
const Tag = styled.span`
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const QuestionWidget = ({
  totalQuestions,
  questionIndex,
  question,
  onSubmit,
  addResult,
}) => {
  const radioName = `radio_${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const hasSelectedAlternative = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <p>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</p>
      </Widget.Header>
      {/* O componente de imagem será adicionado aqui. */}
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>Selecione a alternativa que mais faz sentido para você:</p>
        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((item, i) => {
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === i;
            return (
              <Option
                as="label"
                htmlFor={i}
                key={i}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  name={radioName}
                  id={i}
                  type="radio"
                  checked={false}
                  onChange={() => setSelectedAlternative(i)}
                />
                {` ${item}`}
              </Option>
            );
          })}
          <Button type="submit" disabled={!hasSelectedAlternative}>
            CONFIRMAR
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

export const Result = ({ results }) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const router = useRouter();
  const { name } = router.query;
  const [stats, setStats] = useState({ nivel: "", color: "white" });
  const totalQuestionsResponse = results.length;
  const totalAcceptedQuestions = results.filter((x) => x).length;
  const aproveitamento = (
    (totalAcceptedQuestions * 100) /
    totalQuestionsResponse
  ).toFixed(2);

  useEffect(() => {
    if (aproveitamento <= 30) setStats({ nivel: "Júnior", color: "white" });
    else if (aproveitamento <= 50) setStats({ nivel: "Pleno", color: "green" });
    else if (aproveitamento <= 80) setStats({ nivel: "Sênior", color: "red" });
    else setStats({ nivel: "God", color: "yellow" });
  }, []);

  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      <Widget>
        <Widget.Header>Resultado</Widget.Header>
        <Widget.Content>
          <p>
            Você chegou até o final {`${name}`} 🎉! E acertou um total de{" "}
            {totalAcceptedQuestions}{" "}
            {totalAcceptedQuestions === 1 ? "questão" : "questões"} das{" "}
            {totalQuestionsResponse} respondidas.
          </p>
          <p>Você obteve um aproveitamento de {aproveitamento}%.</p>
          <p>
            Calculamos seu aproveitamento com base em estudos avançados e
            cruzamento de dados usando IA e declaramos você um programador nível{" "}
            <Tag color={stats.color}>{stats.nivel}</Tag>.
          </p>
          <hr />
          Detalhamento:
          <ul>
            {results.map((item, i) => (
              <li key={i}>
                {i + 1} - {item ? "Acertou" : "Errou"}
              </li>
            ))}
          </ul>
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

export default function quiz({ db }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;

  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
  }

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
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <WidgetLoader />}
        {screenState === screenStates.RESULT && <Result results={results} />}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
