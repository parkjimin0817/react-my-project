import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoGoal } from 'react-icons/go';
import useUserStore from '../../store/UserStore';

const Nav = () => {
  const { currentUser, logout } = useUserStore();
  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다. 또 와야돼요!');
  };
  return (
    <NavBar>
      <div>
        <GoGoal size={50} color="tomato" />
      </div>
      <MenuList>
        <UserBox>
          {currentUser === null ? (
            <>
              <StyledLink to="/user">Log In</StyledLink> |<StyledLink to="/user/signin">Sign In</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/" onClick={handleLogout}>
                Log Out
              </StyledLink>
              |<StyledLink to={`/user/${currentUser.id}`}>My Page</StyledLink>
            </>
          )}
        </UserBox>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/goals">My Goals</StyledLink>
        <StyledLink to="/posts">Community</StyledLink>
      </MenuList>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 250px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  background: ${({ theme }) => theme.nav};
`;
const StyledLink = styled(Link)`
  font-size: 18px;
  padding: 10px 10px 10px 10px;
`;
const UserBox = styled.div`
  width: 100%;
  padding: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;
