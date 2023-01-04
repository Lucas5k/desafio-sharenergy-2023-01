import styled from 'styled-components';

export const HomeContainer = styled.section`
  height: 530vh;
  width: 100%;
  background-color: #f8f8d9;
`;

export const SectionInput = styled.section`
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  input {
    margin: 0px 14px 0px 0px;
    width: 300px;
    height: 30px;
    border-radius: 9px;
  }

  button {
    width: 72px;
    height: 30px;
    border-radius: 9px;
    background-color: #20B2AA;
    border: solid 1px #009985;
  }

  button svg {
    font-size: 20px;
    color: white;
  }
`;

export const ConatinerUsers = styled.section`
  display: flex;
  justify-content: center;

  img {
    margin-bottom: 60px;
    height: 270px;
  }
`;

export const WrapperUsers = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 40%;
  height: auto;
  flex-wrap: wrap;  
  margin: 7px;
  padding: 3px;

  img {
    width: 200px;
    height: 200px;
    object-fit: fill;
  }

  p {
    font-size: 23px;
    padding: 0px 0px 22px 0px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const WrapperButton = styled.section`
  width: 46%;
  display: flex;
  margin: auto;
  justify-content: center;
`;

export const ButtonSpace = styled.section`
  margin: 0px 45px 0px 0px;
  
  button {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    width: 25px;
    border-radius: 12px;
    height: 20px;
  }

  button:hover {
    background-color: #002ead;
    transition: 0.7s;
  }
`;