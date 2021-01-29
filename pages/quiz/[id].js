import { ThemeProvider } from "styled-components";
import ScreenQuiz from "../../src/screens/Quiz";

export default function QuizExterno({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <ScreenQuiz db={dbExterno} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [label, user] = context.query.id.split("___");
  const dbExterno = await fetch(`https://${label}.${user}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Falha em pegar dados.");
    })
    .then((res) => res)
    .catch((err) => console.log);
  return {
    props: {
      dbExterno,
    },
  };
}
