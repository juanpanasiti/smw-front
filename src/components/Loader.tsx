import styled, { keyframes } from 'styled-components';

export const Loader = () => {
  return (
    <MainContainer>
      <StyledSpinner className='bi bi-arrow-repeat'/>
      <StyledSpan>LOADING...</StyledSpan>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0007;
  z-index: 999;
  width: 100%;
  height: 100vh;
`;

const spinAndFade = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: rotate(180);
    opacity: 0.2;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.8;
  }
`;

const StyledSpinner = styled.i`
  color: var(--main-color);
  font-weight: bolder;
  font-size: 5rem;
  animation: ${spinAndFade} 2s linear infinite;
`;

const StyledSpan = styled.span`
  color: var(--main-color);
  font-weight: bolder;
  font-size: 1.5rem;
  margin-top: -1rem;
`;