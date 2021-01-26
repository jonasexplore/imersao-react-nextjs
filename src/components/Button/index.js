import styled from "styled-components";
import db from "../../../db.json";

const Button = styled.button`
  background-color: ${db.theme.colors.secondary};
  color: white;
  font-weight: bold;
  border: none;
  width: 100%;
  margin: 2% 0;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.5s;
  &:disabled {
    font-weight: normal;
    background-color: ${db.theme.colors.primary};
    transition: background-color 0.5s;
    color: #777;
  }
`;

export default Button;
