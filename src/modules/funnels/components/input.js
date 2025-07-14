import styled from "styled-components";

const InputStyle = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  flex: 1;
  border: none;
  border-radius: 4px;
`;

const Input = ({ placeholder, type = "text", ...props }) => {
  return <InputStyle type={type} placeholder={placeholder} {...props} />;
};

export default Input;
