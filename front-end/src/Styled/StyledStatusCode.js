import styled from 'styled-components';

export const ContainerStatus = styled.section`
  background-color: #f8f8d9;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  select {
    width: 100px;
    height: 35px;
    background-color: #20B2AA;
    border: none;
    color: white;
    border-radius: 10px;
    margin: 30px 0px 0px 0px;
  }
`;

export const WrapperImage = styled.section`
  img {
    width: 100%;
    height: 500px;
  }

  p {
    font-size: 60px;
  }
`;
