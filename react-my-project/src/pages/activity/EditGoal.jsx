import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const EditGoal = () => {
  const { id } = useParams(); // URL에서 목표 ID를 가져옴
  const { getGoalById, updateGoal } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    frequency: '',
    userId: currentUser?.userId || '',
  });

  useEffect(() => {
    if (!currentUser) {
      alert('로그인 후 이용해주세요.');
      navigate(-1);
      return;
    }

    // 목표 수정 페이지에서는 기존 목표 데이터를 로드
    const fetchGoal = async () => {
      const goal = await getGoalById(id);
      if (goal) {
        setFormData({
          title: goal.goalTitle,
          content: goal.goalDescription,
          date: goal.startDate,
          frequency: goal.frequency || '',
          userId: currentUser.userId,
        });
      } else {
        alert('목표를 찾을 수 없습니다.');
        navigate('/goals');
      }
    };

    fetchGoal();
  }, [id, currentUser, navigate, getGoalById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateGoal(id, formData); // 수정된 목표 데이터 전송

    if (response && response.id) {
      alert('목표 수정 완료!');
      navigate(`/goals/${response.id}`);
    } else {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <Wrapper>
      <GoalForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          style={{ display: 'none' }}
          readOnly
        />
        <Label>목표 제목</Label>
        <GoalInput
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Label>내용</Label>
        <ContentInput
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <Label>시작날짜</Label>
        <GoalInput
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <Label>주기</Label>
        <Select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </Select>
        <GoalButton color="tomato" type="submit">
          목표 수정하기
        </GoalButton>
      </GoalForm>
    </Wrapper>
  );
};

export default EditGoal;

// styled-components
const GoalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 700px;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid lightblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Label = styled.label`
  text-align: left;
  width: 300px;
  font-size: 18px;
  padding: 20px 0 0 0;
`;

const GoalInput = styled(Input)`
  width: 300px;
`;

const GoalButton = styled(Button)`
  width: 300px;
`;

const ContentInput = styled(Input)`
  width: 300px;
  height: 300px;
`;

const Select = styled.select`
  width: 300px;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
`;
