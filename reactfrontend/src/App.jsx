import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import GlobalStyle from './GlobalStyle';
import useThemeStore from './store/ThemeStore';
import Nav from './components/common/Nav';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/users/Login';
import SignIn from './pages/users/SignIn';
import PostList from './pages/posts/PostList';
import UserProfile from './pages/users/UserProfile';
import PostDetail from './pages/posts/PostDetail';
import CreateGoal from './pages/activity/CreateGoal';
import GoalDetail from './pages/activity/GoalDetail';
import MyGoals from './pages/activity/MyGoals';
import Header from './components/common/Header';
import EditGoal from './pages/activity/EditGoal';
import CreatePost from './pages/posts/CreatePost';

function App() {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<Login />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/:user_id" element={<UserProfile />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/goals" element={<MyGoals />} />
          <Route path="/goals/create" element={<CreateGoal />} />
          <Route path="/goals/:goal_no" element={<GoalDetail />} />
          <Route path="/goals/edit/:goal_no" element={<EditGoal />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
