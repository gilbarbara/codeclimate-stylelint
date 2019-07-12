const styled = { div: () => {} };

export function f(...args) {
  return args.map(d => `${d} is cool`);
}

const Button = styled.div`
  padding: 10px;
  font-family: "Blue";
  background-color: #000000;
  
  button {
    color: #fgd;
  }
`;

export default Button;
