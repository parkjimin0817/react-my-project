import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';
import performToast from '../../components/common/performToast';

const GoalDetail = () => {
  const { goal_no } = useParams();
  const navigate = useNavigate();
  const { getGoalByGoalNo, deleteGoal } = useGoalStore();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      const data = await getGoalByGoalNo(goal_no);
      setGoal(data);
      console.log(data);
    };

    fetchGoal();
  }, [goal_no]);

  const handleDelete = async () => {
    if (!goal?.goal_no) return;

    try {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (!confirmed) {
        performToast({ msg: '삭제가 취소되었습니다.', type: 'info' });
        return;
      }

      await deleteGoal(goal.goal_no);
      performToast({ msg: '목표가 삭제되었습니다.', type: 'success' });
      navigate('/goals');
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      performToast({ msg: '삭제에 실패했습니다. 다시 시도해주세요.', type: 'error' });
    }
  };

  if (!goal) {
    return <Wrapper>목표 정보를 불러오는 중입니다...</Wrapper>;
  }

  return (
    <Wrapper>
      <GoalDetailBox>
        <DetailTitle>{goal.goal_title}</DetailTitle>
        <DetailLabel>내용</DetailLabel>
        <DetailContent>{goal.goal_content}</DetailContent>
        <DetailLabel>시작 날짜</DetailLabel>
        <DetailValue>{goal.start_date}</DetailValue>
        <DetailLabel>주기</DetailLabel>
        <DetailValue>{goal.frequency || '주기 없음'}</DetailValue>
        <DetailButton onClick={() => navigate(`/goals/edit/${goal_no}`)}>수정하기</DetailButton>
        <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
      </GoalDetailBox>
      <BackButtonWrapper>
        <GoList onClick={() => navigate('/goals')}>목록 가기</GoList>
      </BackButtonWrapper>
    </Wrapper>
  );
};

export default GoalDetail;

const GoalDetailBox = styled.div`
  width: 600px;
  padding: 30px;
  margin-top: 30px;
  border: 1px solid lightblue;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DetailTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const DetailLabel = styled.p`
  margin-top: 15px;
  font-weight: bold;
  font-size: 18px;
  color: #555;
`;

const DetailContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  background: #f9f9f9;
  padding: 12px;
  color: black;
  border-radius: 5px;
`;

const DetailValue = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  color: black;
  background: #f9f9f9;
  margin-top: 5px;
`;

const DetailButton = styled(Button)`
  width: 45%;
  margin-right: 5px;
  background-color: #ff634778;
  color: white;

  &:hover {
    background-color: tomato;
  }
`;

const DeleteButton = styled(Button)`
  width: 45%;
  margin-left: 5px;
  background-color: #ff000067;
  color: white;

  &:hover {
    background-color: red;
  }
`;
const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const GoList = styled(Button)`
  margin-left: 5px;
  background-color: #add8e690;
  color: black;

  &:hover {
    background-color: lightblue;
  }
`;
