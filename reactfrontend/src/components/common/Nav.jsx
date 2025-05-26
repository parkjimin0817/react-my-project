import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5';
import { IoEarthOutline } from 'react-icons/io5';
import useUserStore from '../../store/UserStore';
import { GoHome } from 'react-icons/go';
import { FiTarget } from 'react-icons/fi';

const Nav = () => {
  const { currentUser, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다. 또 와야돼요!');
    navigate('/');
  };
  return (
    <NavBar>
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
              |<StyledLink to={`/user/${currentUser.user_id}`}>My Page</StyledLink>
            </>
          )}
        </UserBox>
        <MenuBox>
          <StyledLink to="/">
            <GoHome />
            Home
          </StyledLink>
          <StyledLink to="/about">
            <IoBookOutline />
            About
          </StyledLink>
          <StyledLink to="/goals">
            <FiTarget />
            My Goals
          </StyledLink>
          <StyledLink to="/posts">
            <IoEarthOutline />
            Community
          </StyledLink>
        </MenuBox>
      </MenuList>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.nav};
`;
const StyledLink = styled(Link)`
  color: #313131;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 200px;
  font-size: 18px;
  padding: 10px;

  &:hover {
    color: black;
    font-weight: 700;
  }
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
`;
const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const MenuList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 100px;
`;
