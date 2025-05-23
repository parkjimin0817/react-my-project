import React, { useEffect } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import useUserStore from '../../store/UserStore';
import Button from '../../components/common/Button';

const MyPage = () => {
  const { currentUser } = useUserStore();

  useEffect(() => {}, [currentUser]);

  return (
    <Wrapper>
      <div>
        <h2>My Page</h2>
        <MyPageDiv>
          <Row>
            <Label>Name</Label>
            <ReadOnlyInput type="text" value={currentUser?.user_name || ''} readOnly />
          </Row>

          <Row>
            <Label>ID</Label>
            <ReadOnlyInput type="text" value={currentUser?.user_id || ''} readOnly />
          </Row>

          <Row>
            <Label>E-MAIL</Label>
            <ReadOnlyInput type="email" value={currentUser?.email || ''} readOnly />
          </Row>

          <ButtonRow>
            <Button color="lightblue">내 정보 수정하기</Button>
          </ButtonRow>
        </MyPageDiv>
      </div>
    </Wrapper>
  );
};

export default MyPage;

const MyPageDiv = styled.div`
  width: 420px;
  height: 320px;
  padding: 30px 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #eee;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 17px;
  color: #222;
  width: 120px;
`;

const ReadOnlyInput = styled(Input)`
  border: none;
  background-color: transparent;
  font-size: 17px;
  color: #444;
  width: 260px;
  padding: 0;
  pointer-events: none;
  outline: none;
  font-weight: 500;
`;
