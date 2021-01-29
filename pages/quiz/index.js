import ScreenQuiz from "../../src/screens/Quiz";
import db from "../../db.json";

export default function () {
  return <ScreenQuiz db={db} />;
}
