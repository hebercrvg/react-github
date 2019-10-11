import styled, { keyframes } from 'styled-components';

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
    font-size: 16px;
  }
  img {
    margin-top: 15px;
    width: 200px;
    border-radius: 50%;
  }
  h1 {
    margin-top: 10px;
  }
  p {
    margin-top: 10px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
    text-align: center;
  }
`;
const rotate = keyframes`
from{
  transform: rotate(0deg)
} to{
  transform: rotate(360deg)
}
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100vh;
  font-size: 30px;
  font-weight: bold;
  svg {
    animation: ${rotate} linear 2s infinite;
  }
`;

export const PageButtons = styled.div`
  button {
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    background-color: #7159c1;
    & + button {
      margin-left: 3px;
    }
    svg {
      color: #eee;
      text-align: center;
    }
  }
`;

export const IssueList = styled.ul`
  list-style: none;
  margin-top: 23px;
  select {
    border: 0;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #7159c1;
    color: #eee;
    font-size: 14px;
  }

  img {
    width: 40px;
    border-radius: 50%;
  }
  li {
    display: flex;
    flex-direction: row;
    border: 1px solid #eee;
    padding: 15px 10px;
    &:hover {
      background-color: #eee;
    }
  }
  & + li {
    margin-top: 10px;
  }

  div {
    flex: 1;
    margin-left: 15px !important ;
    strong {
      a {
        color: #333;
        text-decoration: none;
        &:hover {
          color: #7159c1;
        }
      }
    }
    p {
      color: #999;
      font-size: 12px;
    }
  }
`;
