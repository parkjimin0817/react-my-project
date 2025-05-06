import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';

const GoalDetail = () => {
  const { id } = useParams(); // URL에서 목표 ID를 가져옴
  const navigate = useNavigate();
  const { getGoalById, deleteGoal } = useGoalStore(); // getGoalById 함수 가져오기
  const [goal, setGoal] = useState(null); // 목표 상태 관리

  useEffect(() => {
    const fetchGoal = async () => {
      if (id) {
        const data = await getGoalById(id);
        setGoal(data);
      } else {
        console.error('ID is undefined');
        setGoal(null); // ID가 없으면 goal 상태를 null로 설정
      }
    };
    fetchGoal();
  }, [id]);

  const handleDelete = async () => {
    if (goal && goal.id) {
      await deleteGoal(goal.id); // 목표 삭제
      navigate('/goals'); // 목표 목록 페이지로 이동
    }
  };
  
  if (!goal) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <GoalDetailBox>
        <DetailTitle>{goal.goalTitle}</DetailTitle> {/* goalTitle로 제목 표시 */}
        <DetailLabel>내용</DetailLabel>
        <DetailContent>{goal.goalDescription}</DetailContent> {/* goalDescription으로 내용 표시 */}
        <DetailLabel>시작 날짜</DetailLabel>
        <DetailValue>{goal.startDate}</DetailValue>
        <DetailLabel>주기</DetailLabel>
        <DetailValue>{goal.frequency}</DetailValue> {/* 주기가 비어 있으면 "주기 없음"으로 표시 */}
        <DetailButton onClick={() => navigate(`/goals/edit/${goal.id}`)}>수정하기</DetailButton> {/* 수정 페이지로 이동 */}
        <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
      </GoalDetailBox>
      <BackButtonWrapper>
  <Button onClick={() => navigate('/goals')}>목록 가기</Button>
</BackButtonWrapper>
    </Wrapper>
  );
};

export default GoalDetail;

// styled-components
const GoalDetailBox = styled.div`
  width: 600px;
  padding: 30px;
  margin-top: 30px;
  border: 1px solid lightblue;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const DetailTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
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
  border-radius: 5px;
`;

const DetailValue = styled.p`
  font-size: 16px;
  color: #444;
  margin-top: 5px;
`;

const DetailButton = styled(Button)`
  width: 45%;
  background-color: tomato;
`;

const DeleteButton = styled(Button)`
  width: 45%;
  background-color: red;
`;
const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
