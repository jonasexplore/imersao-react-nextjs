import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from '../src/components/QuizLogo'

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

export const Input = styled.input`
  margin: 2% 0;
  display: flex;
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
`;

export const Button = styled.button`
  background-color: ${db.theme.colors.primary};
  border: none;
  margin: 2% 0;
  padding: 0.5rem;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${db.theme.colors.secondary};
    cursor: pointer;
    color: white;
    transition: background-color .5s;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz do fetich por temas</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Por que será que além do café, os temas dark são outro fetiche dos programadores? Qual a história por trás? Vamos ver se você está por dentro!</p>
            <Input type="text" placeholder="Insira seu nome"></Input>
            <Button>Começar</Button>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>Lorem ipsum, dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/FalLying/imersao-react-nextjs" />
    </QuizBackground>
  );
}
