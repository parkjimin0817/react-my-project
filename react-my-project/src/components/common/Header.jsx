import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { CiSearch } from 'react-icons/ci';
import useThemeStore from '../../store/ThemeStore';
import useUserStore from '../../store/UserStore';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { currentUser } = useUserStore();

  return (
    <StyledHeader>
      <WelcomeDiv>{currentUser === null ? <h3>환영합니다</h3> : <h3>{currentUser.name}님 안녕하세요!</h3>}</WelcomeDiv>
      <SearchDiv>
        <SearchBar type="text" placeholder="게시글을 검색해보세요" />
        <SearchButton>
          <CiSearch color="white" />
        </SearchButton>
      </SearchDiv>

      <ThemeDiv>
        <button onClick={toggleTheme}>{theme === 'dark' ? '🌙 다크모드' : '🌞 라이트모드'}</button>
      </ThemeDiv>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: calc(100% - 250px);
  height: 80px;
  background: ${({ theme }) => theme.nav};
  top: 0;
  left: 250px;
`;

const WelcomeDiv = styled.div`
  width: 30%;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
`;

const SearchBar = styled(Input)`
  width: 300px;
  height: 40px;
  border-radius: 0;
  border: none;

  &:focus {
    border: none;
    outline: 2px solid #0aceff;
  }
`;

const SearchButton = styled.button`
  margin: 0;
  border-radius: 0;
  background: #ff6347;
  height: 40px;

  &:focus {
    border: none;
    outline: 2px solid #fa4221;
  }
`;

const ThemeDiv = styled.div`
  width: 30%;
`;
