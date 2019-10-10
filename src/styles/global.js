import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box
}
html, body{
  min-height: 100%
}
body{
  background-color: #7159c1;
  -webkit-font-smoothing: antialiased !important;
}

body, input, button{
  font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  color: #222;
  font-size: 14px
}

button{
  cursor: pointer;
}
`;
