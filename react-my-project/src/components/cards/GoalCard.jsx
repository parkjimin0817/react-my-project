import React from 'react';
import styled from 'styled-components';

const GoalCard = ({ goal, onClick }) => {
  return (
    <Goal onClick={onClick} key={goal.id}>
      <GoalTitle>{goal.goalTitle} </GoalTitle>
      <p>시작날짜 : {goal.startDate}</p>
      <GoalFrequency>{goal.frequency}</GoalFrequency>
    </Goal>
  );
};

export default GoalCard;

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

const GoalTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const GoalFrequency = styled.p`
  width: 100px;
  background-color: #55d49f;
  color: white;
`;
