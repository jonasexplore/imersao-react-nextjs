import styled from "styled-components";
import propTypes from "prop-types";

const InputBase = styled.input`
  margin: 2% 0;
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
`;

export default function Input({ onChange, placeholder, ...props }) {
  return <InputBase onChange={onChange} placeholder={placeholder} {...props} />;
}

Input.defaultProps = {
  value: "",
};

Input.propTypes = {
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string,
};
