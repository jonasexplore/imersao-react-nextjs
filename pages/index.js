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
import QuizContainer from "../src/components/QuizContainer";
import Input from "../src/components/Input";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
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
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`quiz?nome=${name}`);
              }}
            >
              <Input
                autoComplete="off"
                value={name}
                name="name"
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
