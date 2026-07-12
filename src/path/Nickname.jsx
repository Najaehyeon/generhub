import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from '../components/PageHeader';
import { Helmet } from 'react-helmet-async';
import '../styles/Nickname.css';

function Nickname() {
    const navigate = useNavigate();

    // --- 상태 관리 ---
    const [type, setType] = useState('meaningful');
    const [length, setLength] = useState(3);

    // 제약 조건 필터
    const [noJongseong, setNoJongseong] = useState(false);
    const [mainVowelsOnly, setMainVowelsOnly] = useState(false);
    const [basicConsonantsOnly, setBasicConsonantsOnly] = useState(false); // [추가] 기본 자음 상태
    const [basicJongseongOnly, setBasicJongseongOnly] = useState(false);

    // 필수 글자 및 위치
    const [requiredChar, setRequiredChar] = useState('');
    const [charPosition, setCharPosition] = useState(0);

    const [generatedNickname, setGeneratedNickname] = useState('');

    useEffect(() => {
        setCharPosition(0);
    }, [length]);

    // --- 명사 데이터 세트 (총 120개) ---
    const nouns = [
        '바다', '구름', '나무', '새싹', '파도', '우주', '하늘', '태양', '새벽', '은하수',
        '노을', '단풍', '눈꽃', '이슬', '봄비', '햇살', '바람', '들꽃', '별빛', '달빛',
        '숲길', '시내', '산들', '여울', '무리', '은하', '샛별', '소나기', '아침', '저녁',
        '푸른숲', '하얀눈', '봄날', '여름', '가을', '겨울', '매화', '벚꽃', '연꽃', '국화',
        '사자', '호랑이', '토끼', '다람쥐', '고양이', '강아지', '나비', '돌고래', '펭귄', '사슴',
        '고래', '제비', '까치', '올빼미', '두루미', '반딧불', '꿀벌', '기린', '코끼리', '판다',
        '여우', '늑대', '수달', '해마', '물개', '거북이', '꾀꼬리', '독수리', '참새', '병아리',
        '라쿤', '코알라', '나무늘보', '물고기', '나침반', '치타', '표범', '라마', '알파카', '앵무새',
        '도토리', '치즈', '쿠키', '모찌', '초코', '라떼', '자두', '포도', '사과', '딸기',
        '망고', '레몬', '체리', '호두', '보리', '수수', '단팥', '인절미', '시나몬', '바닐라',
        '마카롱', '젤리', '사탕', '꿀떡', '시루떡', '꿀단지', '요거트', '푸딩', '감귤', '한라봉',
        '매실', '살구', '홍시', '석류', '유자', '코코아', '녹차', '식혜', '수정과', '달고나'
    ];

    // --- 유니코드 기반 완벽한 한글 랜덤 글자 생성기 ---
    const makeRandomChar = () => {
        const startCode = 44032;
        const endCode = 55203;

        const allowedVowelIndices = [0, 1, 4, 8, 13, 20];
        const allowedConsonantIndices = [0, 2, 3, 5, 6, 7, 9, 11, 12, 14, 15, 16, 17, 18];

        // [추가] 한글 종성(받침) 총 28개 중 기본 단일 받침 14개의 인덱스 번호 (0번은 받침 없음)
        // 1:ㄱ, 4:ㄴ, 7:ㄷ, 8:ㄹ, 16:ㅁ, 17:ㅂ, 19:ㅅ, 21:ㅇ, 22:ㅈ, 23:ㅊ, 24:ㅋ, 25:ㅌ, 26:ㅍ, 27:ㅎ
        const allowedJongseongIndices = [0, 1, 4, 8, 16, 17, 19, 21];

        let validChars = [];

        for (let code = startCode; code <= endCode; code++) {
            const relativeCode = code - startCode;

            // 1. 초성(자음) 필터링
            const chosung = Math.floor(relativeCode / 588);
            if (basicConsonantsOnly && !allowedConsonantIndices.includes(chosung)) continue;

            // 2. 중성(모음) 필터링
            const jung = Math.floor((relativeCode % 588) / 28);
            if (mainVowelsOnly && !allowedVowelIndices.includes(jung)) continue;

            // 3. 종성(받침) 필터링
            const jong = relativeCode % 28;
            if (noJongseong && jong !== 0) continue;

            // 4. 기본 받침 필터링 (토글이 켜졌을 때 허용 목록에 없는 겹받침이면 패스)
            if (basicJongseongOnly && !allowedJongseongIndices.includes(jong)) continue;

            validChars.push(String.fromCharCode(code));
        }

        if (validChars.length === 0) {
            return '아';
        }

        return validChars[Math.floor(Math.random() * validChars.length)];
    };

    const generateNickname = () => {
        let result = '';

        if (type === 'meaningful') {
            let filteredNouns = nouns;

            // 1. 자음 필터링 규칙 적용
            if (basicConsonantsOnly) {
                const allowedConsonantIndices = [0, 2, 3, 5, 6, 7, 9, 11, 12, 14, 15, 16, 17, 18];
                filteredNouns = filteredNouns.filter(noun => {
                    return noun.split('').every(char => {
                        const code = char.charCodeAt(0) - 44032;
                        if (code < 0 || code >= 11172) return false;
                        const chosung = Math.floor(code / 588);
                        // 허용된 기본 자음 배열에 포함되어 있어야만 통과
                        return allowedConsonantIndices.includes(chosung);
                    });
                });
            }

            // 2. 모음 필터링 규칙 적용
            if (mainVowelsOnly) {
                const allowedVowelIndices = [0, 1, 4, 8, 13, 20];
                filteredNouns = filteredNouns.filter(noun => {
                    return noun.split('').every(char => {
                        const code = char.charCodeAt(0) - 44032;
                        if (code < 0 || code >= 11172) return false;
                        const jung = Math.floor((code % 588) / 28);
                        return allowedVowelIndices.includes(jung);
                    });
                });
            }

            // 3. 종성 필터링 규칙 적용
            if (basicJongseongOnly) {
                // 1:ㄱ, 4:ㄴ, 7:ㄷ, 8:ㄹ, 16:ㅁ, 17:ㅂ, 19:ㅅ, 21:ㅇ, 22:ㅈ, 23:ㅊ, 24:ㅋ, 25:ㅌ, 26:ㅍ, 27:ㅎ
                const allowedJongseongIndices = [0, 1, 4, 8, 16, 17, 19, 21];
                filteredNouns = filteredNouns.filter(noun => {
                    return noun.split('').every(char => {
                        const code = char.charCodeAt(0) - 44032;
                        if (code < 0 || code >= 11172) return false;
                        const jong = code % 28;
                        return allowedJongseongIndices.includes(jong);
                    });
                });
            }

            // 4. 받침 필터링 규칙 적용
            if (noJongseong) {
                filteredNouns = filteredNouns.filter(noun => {
                    return noun.split('').every(char => {
                        const code = char.charCodeAt(0) - 44032;
                        return code >= 0 && code < 11172 && code % 28 === 0;
                    });
                });
            }

            // 안전장치 예외처리
            if (filteredNouns.length === 0) {
                filteredNouns = ['바다', '나무', '나비', '사자', '하늘'];
            }

            let baseWord = filteredNouns[Math.floor(Math.random() * filteredNouns.length)];

            if (baseWord.length < length) {
                while (baseWord.length < length) {
                    baseWord += makeRandomChar();
                }
            } else {
                baseWord = baseWord.slice(0, length);
            }

            if (requiredChar && requiredChar.trim().length > 0) {
                const char = requiredChar.trim()[0];
                let arr = baseWord.split('');
                let idx = charPosition === 0 ? Math.floor(Math.random() * arr.length) : charPosition - 1;
                if (idx < arr.length) arr[idx] = char;
                baseWord = arr.join('');
            }
            result = baseWord;

        } else {
            let arr = Array(length).fill('');

            if (requiredChar && requiredChar.trim().length > 0) {
                const char = requiredChar.trim()[0];
                let idx = charPosition === 0 ? Math.floor(Math.random() * length) : charPosition - 1;
                if (idx < length) arr[idx] = char;
            }

            for (let i = 0; i < length; i++) {
                if (arr[i] === '') {
                    arr[i] = makeRandomChar();
                }
            }
            result = arr.join('');
        }

        setGeneratedNickname(result);
    };

    return (
        <div className="Nickname">
            <Helmet>
                <title>닉네임 생성기 | 제너허브</title>
                <meta name="description" content="게임, SNS, 커뮤니티에서 사용할 창의적이고 독특한 닉네임을 찾으시나요? 제너허브의 순수한 무작위 닉네임 생성기로 마음에 쏙 드는 나만의 닉네임을 즉시 만들어보세요." />
                <meta property="og:title" content="닉네임 생성기 | 제너허브" />
                <meta property="og:description" content="클릭 한 번으로 만나는 무작위 닉네임! 게임, 인스타, 유튜브 등 나만의 특별한 닉네임을 제너허브에서 생성해보세요." />
                <meta property="og:url" content="https://generhub.com/nickname" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"게임/재미"} />

            <div className="nickname-card">
                <div className="nickname-intro">
                    <img className="nickname-icon" src="https://cdn-icons-png.flaticon.com/128/16499/16499830.png" alt="닉네임 아이콘" />
                    <h2>닉네임 생성기</h2>
                    <p>원하는 조건을 선택하고 버튼을 누르면 멋진 이름이 만들어집니다.</p>
                </div>

                <div className="settings-wrapper">
                    {/* 1. 단어 타입 */}
                    <div className="setting-section">
                        <label className="section-label">1. 단어 종류 선택</label>
                        <div className="segmented-control">
                            <button className={type === 'meaningful' ? 'active' : ''} onClick={() => setType('meaningful')}>
                                의미있는 단어
                            </button>
                            <button className={type === 'random' ? 'active' : ''} onClick={() => setType('random')}>
                                의미없는 무작위 단어 조합
                            </button>
                        </div>
                    </div>

                    {/* 2. 글자 수 선택 */}
                    <div className="setting-section">
                        <label className="section-label">2. 글자 수 고르기</label>
                        <div className="segmented-control">
                            {[2, 3, 4, 5, 6].map((num) => (
                                <button key={num} className={length === num ? 'active' : ''} onClick={() => setLength(num)}>
                                    {num}글자
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. 제약 조건 필터 */}
                    <div className="setting-section">
                        <label className="section-label">3. 고급 필터 (선택 사항)</label>
                        <div className="toggle-group">
                            {/* 받침 필터 */}
                            <div className="toggle-item">
                                <span className="toggle-text">받침 없는 글자만 만들기 (예: 바다, 나무)</span>
                                <div className="switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="noJong"
                                        checked={noJongseong}
                                        onChange={(e) => setNoJongseong(e.target.checked)}
                                    />
                                    <label htmlFor="noJong" className="switch"></label>
                                </div>
                            </div>

                            {/* 모음 필터 */}
                            <div className="toggle-item">
                                <span className="toggle-text">기본 모음만 사용하기 (ㅏ, ㅓ, ㅗ, ㅜ, ㅣ, ㅐ)</span>
                                <div className="switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="mainVowel"
                                        checked={mainVowelsOnly}
                                        onChange={(e) => setMainVowelsOnly(e.target.checked)}
                                    />
                                    <label htmlFor="mainVowel" className="switch"></label>
                                </div>
                            </div>

                            {/* 자음 필터 마크업 */}
                            <div className="toggle-item">
                                <span className="toggle-text">기본 자음만 사용하기 (쌍자음 ㄲ, ㄸ, ㅃ 등 제외)</span>
                                <div className="switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="basicConsonant"
                                        checked={basicConsonantsOnly}
                                        onChange={(e) => setBasicConsonantsOnly(e.target.checked)}
                                    />
                                    <label htmlFor="basicConsonant" className="switch"></label>
                                </div>
                            </div>
                            {/* 종성 필터 마크업 */}
                            <div className="toggle-item">
                                <span className="toggle-text">기본 받침만 사용하기 (ㄱ, ㄴ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ 만 사용)</span>
                                <div className="switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="basicJongseong"
                                        checked={basicJongseongOnly}
                                        onChange={(e) => setBasicJongseongOnly(e.target.checked)}
                                    />
                                    <label htmlFor="basicJongseong" className="switch"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. 필수 포함 글자 및 위치 */}
                    <div className="setting-section">
                        <label className="section-label">4. 꼭 넣고 싶은 한 글자 (선택)</label>
                        <input
                            type="text"
                            className="char-input"
                            placeholder="예시: 민, 영, 희 (여기에 적어주세요)"
                            maxLength={1}
                            value={requiredChar}
                            onChange={(e) => setRequiredChar(e.target.value)}
                        />

                        {requiredChar && (
                            <div className="position-selector">
                                <label className="sub-label">글자가 들어갈 위치를 지정해주세요</label>
                                <div className="radio-group">
                                    <label>
                                        <input type="radio" name="pos" checked={charPosition === 0} onChange={() => setCharPosition(0)} />
                                        아무 곳이나 상관없음
                                    </label>
                                    {Array(length).fill(0).map((_, idx) => (
                                        <label key={idx}>
                                            <input type="radio" name="pos" checked={charPosition === idx + 1} onChange={() => setCharPosition(idx + 1)} />
                                            {idx + 1}번째 칸에 넣기
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 결과 표시 영역 */}
                <div className="display-area">
                    {generatedNickname ? (
                        <div className="result-box">
                            <span className="result-tag">생성된 이름</span>
                            <h2 className="nickname-display">{generatedNickname}</h2>
                        </div>
                    ) : (
                        <p className="placeholder-text">원하는 옵션을 고르신 후 아래 버튼을 눌러주세요.</p>
                    )}
                </div>

                {/* 하단 생성 버튼 */}
                <button className="action-btn" onClick={generateNickname}>
                    닉네임 생성
                </button>
            </div>
        </div>
    );
}

export default Nickname;