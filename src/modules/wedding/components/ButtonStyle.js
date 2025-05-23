import styled from "styled-components";

const Boton = styled.a`
  display: inline-block;
  text-decoration: none;
  border: none;
  background: linear-gradient(
    135deg,
    #f3d1dc,
    #e6c6f2
  ); /* tonos pastel rosados y lilas */
  color: #4a2c52;
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #e6c6f2, #f3d1dc);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.8rem 1.5rem;
  }
`;

export default Boton;
