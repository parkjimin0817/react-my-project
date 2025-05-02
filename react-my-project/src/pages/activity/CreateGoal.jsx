import React, { useState } from 'react';
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
    no: '',
    id: '',
    title: '',
    content: '',
    date: '',
    frequency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  };
  return (
    <Wrapper>
      <div>
        <h2>목표 만들기</h2>
        <GoalForm>
          <input type="text" name="id" value={currentUser.userId} style="display: none;" />
          <Label>목표 제목</Label>
          <GoalInput type="text" name="name" />
          <Label>내용</Label>
          <ContentInput type="text" name="id" />
          <Label>시작날짜</Label>
          <GoalInput type="date" name="email" />
          <Label>주기</Label>
          <Select name="frequency" id="">
            <option value="">DAILY</option>
            <option value="">WEEKLY</option>
            <option value="">MONTHLY</option>
          </Select>
          <GoalButton color="tomato">Sign In</GoalButton>
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
