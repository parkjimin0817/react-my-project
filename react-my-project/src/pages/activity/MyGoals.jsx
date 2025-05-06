import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/common/Wrapper';
import useGoalStore from '../../store/GoalStore';
import useUserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import GoalCard from '../../components/cards/GoalCard';

const MyGoals = () => {
  const { getMyGoals, goals, isLoading: goalsLoading, error: goalsError } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [selectedFrequency, setSelectedFrequency] = useState('');

  useEffect(() => {
    if (currentUser) {
      getMyGoals(currentUser.userId);
    }
  }, [currentUser]);

  const handleGoalClick = (goalId) => {
    navigate(`/goals/${goalId}`);
  };

  const filteredGoals = selectedFrequency
  ? goals.filter((goal) => goal.frequency === selectedFrequency)
  : goals;

  if (goalsLoading) return <Loader />;
  if (goalsError) return <p>에러 발생: {goalsError}</p>;
  return (
    <Wrapper>
      <MenuDiv>
        <SelectDiv>
        <SelectFrequency
            name="frequency"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
          >
  <option value="">전체</option>
  <option value="DAILY">DAILY</option>
  <option value="WEEKLY">WEEKLY</option>
  <option value="MONTHLY">MONTHLY</option>
          </SelectFrequency>
        </SelectDiv>
        <ButtonDiv>
          <Button onClick={() => navigate('/goals/create')}>새로운 목표 등록하기</Button>
        </ButtonDiv>
      </MenuDiv>

      <Container>
      {!currentUser ? (
          <CheckLogin>로그인 후 확인해요!</CheckLogin>
        ) : filteredGoals.length === 0 ? (
          <CheckLogin>해당 목표가 아직 없어요!</CheckLogin>
        ) : (
          filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onClick={() => handleGoalClick(goal.id)} />
          ))
        )}
      </Container>
    </Wrapper>
  );
};

export default MyGoals;

const Goal = styled.div`
  width: 250px;
  height: 280px;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  background: ${({ theme }) => theme.nav};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
  }
`;

const MenuDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
  padding: 30px;
`;

const SelectDiv = styled.div`
  width: 20%;
`;
const ButtonDiv = styled.div`
  width: 30%;
`;

const GoalTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const GoalFrequency = styled.p`
  width: 100px;
  background-color: #55d49f;
  color: white;
`;

const SelectFrequency = styled.select`
  width: 150px;
  height: 35px;
  margin: 30px;
`;

const CheckLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
