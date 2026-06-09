//packages & components
import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./Main";
import Header from "../component/Header";
import { patchQuizData } from "../data/patchQuizData"; // 💡 데이터 임포트

//styled-components
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #1e1e1e; /* 배그 감성의 다크 테마로 배경 개선 */
  margin: 0;
  padding: 0;
  color: #ffffff;
`;

const TextWapper = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PatchNote = styled.span`
  font-size: 28px;
  font-weight: 700;
  background: #2a2a2a;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #444;
  
  &:hover {
    border-color: #f2a900;
  }
`;

const Text = styled.a`
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f2a900;
  }
`;

/* 💡 여기서부터 퀴즈 UI 전용 스타일드 컴포넌트 */
const QuizContainer = styled.div`
  max-width: 650px;
  margin: 40px auto;
  background: #2a2a2a;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.5);
  border-top: 5px solid #f2a900; /* 배그 포인트 컬러 */
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const QuizTitle = styled.h3`
  font-size: 22px;
  color: #f2a900;
  margin: 0;
`;

const HintButton = styled.button`
  background: transparent;
  border: 1px solid #888;
  color: #aaa;
  padding: 4px 10px;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;

const HintText = styled.p`
  background: #333;
  padding: 10px;
  border-left: 3px solid #555;
  font-size: 14px;
  color: #ccc;
  margin: 10px 0;
`;

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 25px;
  color: #f5f5f5;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 선택지 버튼: 유저 액션(정답여부, 선택여부)에 따라 동적 배경색 지정
const OptionButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  text-align: left;
  background: ${(props) => {
    if (props.$isRevealed) {
      if (props.$isCorrect) return "#1e4620"; // 정답 초록색
      if (props.$isSelected) return "#611a1a"; // 유저가 고른 오답 빨간색
    }
    return props.$isSelected ? "#3d3d3d" : "#333333";
  }};
  color: #ffffff;
  border: ${(props) => {
    if (props.$isRevealed) {
      if (props.$isCorrect) return "2px solid #4caf50";
      if (props.$isSelected) return "2px solid #f44336";
    }
    return props.$isSelected ? "2px solid #f2a900" : "1px solid #444";
  }};
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.$disabled ? "" : "#444444")};
    border-color: ${(props) => (props.$disabled ? "" : "#f2a900")};
  }
`;

const FeedbackBox = styled.div`
  margin-top: 25px;
  padding: 20px;
  background: #1e1e1e;
  border-radius: 6px;
  border-left: 4px solid ${(props) => (props.$isCorrect ? "#4caf50" : "#f44336")};
`;

const FeedbackResult = styled.h4`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: ${(props) => (props.$isCorrect ? "#4caf50" : "#f44336")};
`;

const RationaleText = styled.p`
  margin: 0 0 15px 0;
  font-size: 15px;
  color: #ddd;
  line-height: 1.4;
`;

const NextButton = styled.button`
  background: #f2a900;
  color: #000000;
  font-weight: 700;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  
  &:hover {
    background: #ffa500;
  }
`;

export default function PatchPage() {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState([]); // 중복 방지용 스택 기록

  // 💡 랜덤으로 문제를 하나 뽑아오는 핵심 동력 함수
  const getRandomQuiz = () => {
    if (!patchQuizData || patchQuizData.length === 0) return;

    // 만약 모든 문제를 한 바퀴 다 풀었다면 중복 방지 히스토리 초기화 (무한 루프 락 해제)
    let availableQuizzes = patchQuizData.filter((q) => !history.includes(q.id));
    if (availableQuizzes.length === 0) {
      availableQuizzes = patchQuizData;
      setHistory([]);
    }

    const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
    const chosenQuiz = availableQuizzes[randomIndex];

    setCurrentQuiz(chosenQuiz);
    setHistory((prev) => [...prev, chosenQuiz.id]); // 푼 문제 목록에 추가
    
    // 다음 문제 진입 시 상태값들 말끔하게 초기화
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  // 컴포넌트 마운트 시 첫 번째 무작위 퀴즈 자동 로드
  useEffect(() => {
    getRandomQuiz();
  }, []);

  const handleOptionClick = (option) => {
    if (isSubmitted) return; // 이미 제출된 문제면 클릭 차단
    setSelectedOption(option);
    setIsSubmitted(true); // 오지선다는 클릭하자마자 바로 채점 피드백 출력 구조가 직관적입니다
  };

  if (!currentQuiz) return <Container><Header name="patch" /></Container>;

  const isUserCorrect = selectedOption === currentQuiz.answer;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header name="patch" />
        
        {/* 상단 패치노트 아웃링크 */}
        <TextWapper>
          <PatchNote>
            <Text href="https://pubg.com/ko/news?category=patch_notes" target="_blank" rel="noreferrer">
              공식 패치 노트 보러가기 →
            </Text>
          </PatchNote>
        </TextWapper>

        {/* 💡 실시간 무한 랜덤 객관식 퀴즈 컴포넌트 본체 */}
        <QuizContainer>
          <QuizHeader>
            <QuizTitle>PUBG 실시간 패치/상식 퀴즈</QuizTitle>
            <HintButton onClick={() => setShowHint(!showHint)}>
              {showHint ? "힌트 숨기기" : "힌트 보기"}
            </HintButton>
          </QuizHeader>

          {showHint && <HintText>💡 {currentQuiz.hint}</HintText>}

          {/* 질문 영역 */}
          <QuestionText>Q. {currentQuiz.question}</QuestionText>

          {/* 5지선다 버튼 레이아웃 */}
          <OptionsList>
            {currentQuiz.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === currentQuiz.answer;

              return (
                <OptionButton
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  $isSelected={isSelected}
                  $isCorrect={isCorrectAnswer}
                  $isRevealed={isSubmitted}
                  $disabled={isSubmitted}
                >
                  {idx + 1}. {option}
                </OptionButton>
              );
            })}
          </OptionsList>

          {/* 💡 문제를 풀었을 때만 나타나는 정답 피드백 및 해설 박스 */}
          {isSubmitted && (
            <FeedbackBox $isCorrect={isUserCorrect}>
              <FeedbackResult $isCorrect={isUserCorrect}>
                {isUserCorrect ? "🎯 정답입니다! 축하합니다." : "❌ 아쉽습니다! 오답입니다."}
              </FeedbackResult>
              
              <RationaleText>
                <strong>정답: {currentQuiz.answer}</strong> <br />
                {currentQuiz.rationale}
              </RationaleText>

              {/* 다음 무한 랜덤 문제 트리거 */}
              <NextButton onClick={getRandomQuiz}>다음 문제 풀기 →</NextButton>
            </FeedbackBox>
          )}
        </QuizContainer>
      </Container>
    </>
  );
}