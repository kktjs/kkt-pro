import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Warper = styled.div`
  text-align: center;
  padding-top: 40px;
  font-size: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BackToHome = styled(Link)``;

const Header = styled.header``;

const Page = () => {
  return (
    <Warper>
      <Header>404 Not Fount</Header>
      <BackToHome to="/">返回首页</BackToHome>
    </Warper>
  );
};

export default Page;
