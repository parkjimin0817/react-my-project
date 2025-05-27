import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/common/Wrapper';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useGoalStore from '../../store/GoalStore';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/UserStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('제목을 입력하세요.'),
  content: yup.string().required('내용을 입력하세요.'),
  date: yup.string().required('시작 날짜를 입력하세요.'),
  frequency: yup.string().required('주기를 선택하세요.'),
});

const EditGoal = () => {
  const { id } = useParams();
  const { getGoalById, updateGoal } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      date: '',
      frequency: '',
    },
  });

  useEffect(() => {
    if (!currentUser) {
      alert('로그인 후 이용해주세요.');
      navigate(-1);
      return;
    }

    const fetchGoal = async () => {
      const goal = await getGoalById(id);
      if (goal) {
        reset({
          title: goal.goalTitle,
          content: goal.goalDescription,
          date: goal.startDate,
          frequency: goal.frequency,
        });

        console.log('받아온 goal:', goal);
      } else {
        alert('목표를 찾을 수 없습니다.');
        navigate('/goals');
      }
      setLoading(false);
    };

    fetchGoal();
  }, [id, currentUser, navigate, getGoalById, reset]);

  const onSubmit = async (data) => {
    const updatedGoal = {
      goalTitle: data.title,
      goalDescription: data.content,
      startDate: data.date,
      frequency: data.frequency,
      userId: currentUser.userId,
    };

    const response = await updateGoal(id, updatedGoal);

    if (response && response.id) {
      alert('목표 수정 완료!');
      navigate(`/goals/${response.id}`);
    } else {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      <GoalForm onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('userId')} value={currentUser.userId} readOnly />

        <Label>목표 제목</Label>
        <GoalInput type="text" {...register('title')} />
        {errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}

        <Label>내용</Label>
        <ContentInput type="text" {...register('content')} />
        {errors.content && <ErrorMsg>{errors.content.message}</ErrorMsg>}

        <Label>시작날짜</Label>
        <GoalInput type="date" {...register('date')} />
        {errors.date && <ErrorMsg>{errors.date.message}</ErrorMsg>}

        <Label>주기</Label>
        <Select {...register('frequency')}>
          <option value="">-- 선택하세요 --</option>
          <option value="Daily">DAILY</option>
          <option value="Weekly">WEEKLY</option>
          <option value="Monthly">MONTHLY</option>
        </Select>
        {errors.frequency && <ErrorMsg>{errors.frequency.message}</ErrorMsg>}

        <GoalButton color="tomato" type="submit">
          목표 수정하기
        </GoalButton>
      </GoalForm>
    </Wrapper>
  );
};

export default EditGoal;

// 스타일
const GoalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: auto;
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

const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
`;

const GoalInput = styled(Input)`
  width: 300px;
`;

const ContentInput = styled(Input)`
  width: 300px;
  height: 300px;
`;

const GoalButton = styled(Button)`
  width: 300px;
`;

const Select = styled.select`
  width: 300px;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
`;
