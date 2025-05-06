import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const CreateGoal = () => {
  const { postMyGoals, error, isLoading } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    frequency: '',
  });

  useEffect(() => {
    if (!currentUser) {
      alert('로그인 후 이용해주세요.');
      navigate(-1);
      return; // 더 이상 진행하지 않게 return
    }
  
    // currentUser가 있을 때만 userId 설정
    setFormData((prev) => ({
      ...prev,
      userId: currentUser.userId,
    }));
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser?.userId) {
      setFormData((prev) => ({
        ...prev,
        userId: currentUser.userId,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await postMyGoals(formData); // 바로 formData 넘기기
  
    if (response && response.id) {
      alert('새로운 목표 등록 완료!');
      setFormData({
        title: '',
        content: '',
        date: '',
        frequency: '',
      });
      navigate(`/goals/${response.id}`);
    } else {
      alert('등록 중 오류가 발생했습니다.');
    }
  };
  

  return (
    <Wrapper>
      <div>
      <GoalForm onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            value={currentUser?.userId || ''}
            style={{ display: 'none' }}
            readOnly
          />
          <Label>목표 제목</Label>
          <GoalInput type="text" name="title" onChange={handleChange}/>
          <Label>내용</Label>
          <ContentInput type="text" name="content" onChange={handleChange}/>
          <Label>시작날짜</Label>
          <GoalInput type="date" name="date" onChange={handleChange}/>
          <Label>주기</Label>
          <Select name="frequency" onChange={handleChange} value={formData.frequency}>
  <option value="">-- 선택하세요 --</option>
  <option value="DAILY">DAILY</option>
  <option value="WEEKLY">WEEKLY</option>
  <option value="MONTHLY">MONTHLY</option>
</Select>
          <GoalButton color="tomato" type="submit">목표 등록하기</GoalButton>
        </GoalForm>
      </div>
    </Wrapper>
  );
};

export default CreateGoal;

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
