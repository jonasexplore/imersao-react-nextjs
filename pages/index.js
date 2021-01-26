import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import db from "../db.json";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Button from "../src/components/Button";

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
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>ThemaQuiz - Imersão React Nextjs</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz do fetich por temas</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Por que será que além do café, os temas dark são outro fetiche dos
              programadores? Qual a história por trás? Vamos ver se você está
              por dentro!
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`quiz?nome=${name}`);
              }}
            >
              <Input
                value={name}
                onChange={onChangeName}
                type="text"
                placeholder="Insira seu nome"
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar: {name}
              </Button>
            </form>
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
