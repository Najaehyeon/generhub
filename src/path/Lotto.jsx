import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import '../styles/Lotto.css';
import PageHeader from '../components/PageHeader';
import { Helmet } from 'react-helmet-async';

function Lotto() {
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // 로또 번호 생성 함수 (1~45 중 6개 고르기 + 오름차순 정렬)
    const generateLottoNumbers = () => {
        setIsGenerating(true);
        setNumbers([]); // 애니메이션 효과를 위해 기존 번호 초기화

        setTimeout(() => {
            const lottoSet = new Set();
            while (lottoSet.size < 6) {
                const randomNumber = Math.floor(Math.random() * 45) + 1;
                lottoSet.add(randomNumber);
            }
            const sortedNumbers = Array.from(lottoSet).sort((a, b) => a - b);
            setNumbers(sortedNumbers);
            setIsGenerating(false);
        }, 400); // 부드러운 전환을 위한 약간의 딜레이
    };

    // 번호 대역별 로또 공 색상 클래스 지정
    const getBallColorClass = (num) => {
        if (num <= 10) return 'ball-yellow';
        if (num <= 20) return 'ball-blue';
        if (num <= 30) return 'ball-red';
        if (num <= 40) return 'ball-gray';
        return 'ball-green';
    };

    return (
        <div className="Lotto">
            <Helmet>
                <title>로또 번호 생성기 | 제너허브</title>
                <meta name="description" content="이번 주 행운의 주인공은 누구? 제너허브 로또 번호 생성기에서 어떤 조건도 섞이지 않은 순수한 무작위 로또 번호 조합을 추출해보세요. 당신만의 행운의 번호 6자리를 즉시 추첨해 드립니다." />
                <meta property="og:title" content="로또 번호 생성기 | 제너허브" />
                <meta property="og:description" content="이번 주 1등 명당은 바로 여기! 제너허브의 순수한 랜덤 추첨으로 행운의 로또 번호를 조합하고 대박의 기회를 잡아보세요." />
                <meta property="og:url" content="https://generhub.com/lotto" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"인기"} />

            {/* 메인 컨텐츠 영역 */}
            <div className="lotto-card">
                <div className="lotto-intro">
                    <img
                        className="lotto-icon"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ffygtkvIbUYeHYIvrM-HDaWOpdHHhRshgT21eQD6ZQ&s=10"
                        alt="로또 아이콘"
                    />
                    <h2>로또 번호 생성기</h2>
                    <p>순수한 무작위성이 선사하는 행운을 시험해보세요.</p>
                </div>

                {/* 번호 표시 영역 */}
                <div className="ball-container">
                    {numbers.length > 0 ? (
                        numbers.map((num, idx) => (
                            <div
                                key={idx}
                                className={`lotto-ball ${getBallColorClass(num)} ${isGenerating ? '' : 'pop-in'}`}
                            >
                                {num}
                            </div>
                        ))
                    ) : (
                        <div className="placeholder-text">
                            {isGenerating ? "행운의 번호를 추첨하는 중..." : "아래 버튼을 눌러 번호를 생성하세요."}
                        </div>
                    )}
                </div>

                {/* 제어 버튼 */}
                <button
                    className="generate-btn"
                    onClick={generateLottoNumbers}
                    disabled={isGenerating}
                >
                    {numbers.length > 0 ? "다시 생성하기" : "번호 생성하기"}
                </button>
            </div>
        </div>
    );
}

export default Lotto;