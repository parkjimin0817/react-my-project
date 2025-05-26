import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';

const CreateGoal = () => {
  const { postMyGoals } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: currentUser?.user_id || '',
    title: '',
    content: '',
    date: '',
    frequency: '',
  });

  useEffect(() => {
    if (!currentUser) {
      alert('로그인 후 이용해주세요.');
      navigate(-1);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      user_id: currentUser.user_id,
    }));
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('폼 데이터 : ', formData);
    const res = await postMyGoals(formData); // 바로 formData 넘기기

    console.log('등록 목표 : ', res);

    if (res?.success) {
      alert('새로운 목표 등록 완료!');
      setFormData({
        title: '',
        content: '',
        date: '',
        frequency: '',
      });
      navigate(`/goals`);
    } else {
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Wrapper>
      <div>
        <GoalForm onSubmit={handleSubmit}>
          {/* <input type="text" name="user_id" value={currentUser?.user_id || ''} style={{ display: 'none' }} readOnly /> */}
          <Label>목표 제목</Label>
          <GoalInput type="text" name="title" onChange={handleChange} />
          <Label>내용</Label>
          <ContentInput type="text" name="content" onChange={handleChange} />
          <Label>시작날짜</Label>
          <GoalInput type="date" name="date" onChange={handleChange} />
          <Label>주기</Label>
          <Select name="frequency" onChange={handleChange} value={formData.frequency}>
            <option value="">-- 선택하세요 --</option>
            <option value="Daily">DAILY</option>
            <option value="Weekly">WEEKLY</option>
            <option value="Monthly">MONTHLY</option>
          </Select>
          <GoalButton color="tomato" type="submit">
            목표 등록하기
          </GoalButton>
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
