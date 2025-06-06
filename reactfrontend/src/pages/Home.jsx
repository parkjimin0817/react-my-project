import React from 'react';
import Wrapper from '../components/common/Wrapper';
import styled from 'styled-components';
import usePostStore from '../store/PostStore';
import { useEffect } from 'react';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import useGoalStore from '../store/GoalStore';
import useUserStore from '../store/UserStore';

const Home = () => {
  const { getPosts, posts, isLoading: postsLoading, error: postsError } = usePostStore((state) => state);
  const { getMyGoals, goals, isLoading: goalsLoading, error: goalsError } = useGoalStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getMyGoals(currentUser.user_id);
    }
  }, [currentUser]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleGoalClick = (goal_no) => {
    navigate(`/goals/${goal_no}`);
  };

  const displayedPosts = posts.slice(0, 3);
  const displayedGoals = goals.filter((goal) => goal.user_id && goal.user_id === currentUser.user_id).slice(0, 3);

  return (
    <Wrapper>
      <Div>
        <HomeSectionTitle>오늘의 게시글</HomeSectionTitle>
        {displayedPosts.length === 0 ? (
          <CheckLogin>게시글이 없어요!</CheckLogin>
        ) : (
          displayedPosts.map((post) => (
            <Post key={post.id} style={{ marginBottom: '20px' }} onClick={() => handlePostClick(post.id)}>
              <p>{post.title}</p>
              {post.img && <img src={post.img} alt="post" style={{ width: '200px', height: '200px' }} />}
            </Post>
          ))
        )}
      </Div>
      <Div>
        <HomeSectionTitle>나의 목표</HomeSectionTitle>
        {!currentUser ? (
          <CheckLogin>로그인 후 확인해요!</CheckLogin>
        ) : displayedGoals.length === 0 ? (
          <CheckLogin>아직 목표가 없어요!</CheckLogin>
        ) : (
          displayedGoals.map((goal) => (
            <Goal key={goal.goal_no} style={{ marginBottom: '20px' }} onClick={() => handleGoalClick(goal.goal_no)}>
              <GoalTitle>{goal.goal_title} </GoalTitle>
              <p>시작날짜 : {goal.start_date}</p>
              <GoalFrequency>{goal.frequency}</GoalFrequency>
            </Goal>
          ))
        )}
      </Div>
    </Wrapper>
  );
};

export default Home;

const Div = styled.div`
  display: flex;
  width: 1000px;
  height: 330px;
  padding-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.text};
`;

const HomeSectionTitle = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
`;

const Post = styled.div`
  width: 250px;
  height: 280px;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  background: ${({ theme }) => theme.nav};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
  }
`;

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

const CheckLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
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
