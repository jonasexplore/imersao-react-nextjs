import styled from "styled-components";
import db from "../../../db.json";

const Option = styled.div`
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
  text-decoration: none;
  color: white;
`;

export default Option;
