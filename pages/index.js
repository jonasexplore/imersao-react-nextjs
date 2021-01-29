import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

import db from "../db.json";
import Link from "../src/components/Link";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";
import Input from "../src/components/Input";
import Option from "../src/components/Option";

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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>ProgrammerQuiz</h1>
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
                router.push(`quiz?name=${name}`);
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((item, i) => {
                const [label, user] = item
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li key={i}>
                    <Option
                      as={Link}
                      style={{
                        pointerEvents: `${name.length === 0 ? "none" : ""}`,
                      }}
                      href={`/quiz/${label}___${user}`}
                    >
                      {`${user}/${label}`}
                    </Option>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.4, duration: 0.5 }}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/FalLying/imersao-react-nextjs" />
    </QuizBackground>
  );
}
