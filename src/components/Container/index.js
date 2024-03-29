import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  max-width: 700px;
  border-radius: 5px;
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }
`;

export default Container;
