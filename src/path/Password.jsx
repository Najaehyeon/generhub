import { useState, useEffect, useCallback } from "react";
import "../styles/Password.css";
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/PageHeader";

export default function Password() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    // 비밀번호 생성 로직
    const generatePassword = useCallback(() => {
        let charset = "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$&";

        let generated = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generated += charset[randomIndex];
        }
        setPassword(generated);
        setCopied(false);
    }, [length, includeUppercase, includeNumbers, includeSymbols]);

    // 초기 로드 시 및 옵션 변경 시 자동 생성
    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    // 클립보드 복사
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    // 비밀번호 강도 계산 (간이)
    const getStrength = () => {
        let score = 0;
        if (length >= 10) score++;
        if (length >= 14) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (score <= 2) return { text: "취약", color: "#FF453A", width: "33%" }; // Apple Red
        if (score <= 4) return { text: "보통", color: "#FF9F0A", width: "66%" }; // Apple Orange
        return { text: "안전", color: "#32D74B", width: "100%" }; // Apple Green
    };

    const strength = getStrength();

    return (
        <div className="Password">
            <Helmet>
                <title>암호 생성기 | 제너허브</title>
                <meta name="description" content="해킹 걱정 없는 안전한 비밀번호가 필요하신가요? 제너허브 암호 생성기로 대소문자, 숫자, 특수문자를 조합한 강력하고 안전한 무작위 비밀번호를 즉시 생성해보세요." />
                <meta property="og:title" content="암호 생성기 | 제너허브" />
                <meta property="og:description" content="클릭 한 번으로 만드는 강력한 보안 비밀번호! 제너허브에서 해킹 불가능한 무작위 암호를 안전하게 생성하세요." />
                <meta property="og:url" content="https://generhub.com/password" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"업무/개발"} />

            <div className="generator-container">
                <h2 className="generator-title">암호 생성기</h2>
                <p className="generator-subtitle">무작위로 구성된 안전한 암호를 생성합니다.</p>

                {/* 결과창 및 복사 버튼 */}
                <div className="result-box">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        className="password-display"
                    />
                    <button
                        className={`copy-button ${copied ? "copied" : ""}`}
                        onClick={handleCopy}
                    >
                        {copied ? "복사됨" : "복사하기"}
                    </button>
                </div>

                {/* 강도 표시 바 */}
                <div className="strength-meter">
                    <div className="strength-label">
                        <span>암호 강도</span>
                        <span style={{ color: strength.color, fontWeight: 600 }}>{strength.text}</span>
                    </div>
                    <div className="track">
                        <div
                            className="bar"
                            style={{ width: strength.width, backgroundColor: strength.color }}
                        ></div>
                    </div>
                </div>

                {/* 설정 섹션 */}
                <div className="options-container">
                    {/* 길이 조절 슬라이더 */}
                    <div className="option-row slider-row">
                        <div className="option-label">
                            <span>길이</span>
                            <span className="length-val">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="32"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="apple-slider"
                        />
                    </div>

                    <hr className="divider" />

                    {/* 토글 스위치들 */}
                    <div className="option-row">
                        <label className="toggle-label">
                            <span>대문자 포함 (A-Z)</span>
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="apple-switch"
                            />
                        </label>
                    </div>

                    <div className="option-row">
                        <label className="toggle-label">
                            <span>숫자 포함 (0-9)</span>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="apple-switch"
                            />
                        </label>
                    </div>

                    <div className="option-row">
                        <label className="toggle-label">
                            <span>특수문자 포함 (!@#$&)</span>
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="apple-switch"
                            />
                        </label>
                    </div>
                </div>

                {/* 새로고침 버튼 */}
                <button className="refresh-button" onClick={generatePassword}>
                    새로운 암호 생성
                </button>
            </div>
        </div>
    );
}