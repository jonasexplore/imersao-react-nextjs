import styled from "styled-components";
import QuizBackground from "../src/components/QuizBackground";
import Widget from "../src/components/Widget";
import db from "../db.json";
import Button from "../src/components/Button";
import QuizLogo from "../src/components/QuizLogo";
import Footer from "../src/components/Footer";

// Trabalhando nessa parte ainda 😕
// export const Img = styled.img`
//   width: 100%;
//   max-height: 5rem;
// `;

export const Option = styled.div`
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

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function quiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <p>Pergunta 1 de 5</p>
          </Widget.Header>
          {/* O componente de imagem será adicionado aqui. */}
          <Widget.Content>
            <h2>Lorem ipsum dolor sit amet....</h2>
            <p>Selecione a alternativa que mais faz sentido para você:</p>
            <Option>Alternativa a</Option>
            <Option>Alternativa b</Option>
            <Option>Alternativa c</Option>
            <Button>CONFIRMAR</Button>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
