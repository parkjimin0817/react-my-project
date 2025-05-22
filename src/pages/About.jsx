import React from 'react';
import Wrapper from '../components/common/Wrapper';
import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper>
      <AboutDiv>
        <h2>"작은 목표부터 큰 변화까지, 당신의 성장을 함께합니다."</h2>
        <div>
          <p>
            하루하루 쌓이는 기록 속에서 우리는 조금씩 나아갑니다. 이 웹사이트는 당신의 목표를 정리하고, 추적하고,
            응원하는 공간입니다. 복잡한 기능 없이도 쉽게 시작하고, 따뜻한 커뮤니티와 함께 꾸준히 성장해보세요. 지금,
            당신의 변화를 시작해보세요.
          </p>
        </div>
      </AboutDiv>
    </Wrapper>
  );
};

export default About;

const AboutDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
