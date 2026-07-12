import { useState } from "react";
import { Link } from "react-router";
import "../styles/Color.css";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet-async";

export default function Color() {
    const [color, setColor] = useState("#007AFF"); // 초기값: Apple Blue
    const [copied, setCopied] = useState(false);

    // 애플 감성의 감각적인 컬러를 뽑기 위한 랜덤 HEX 생성기
    const generateAppleColor = () => {
        // 너무 탁하거나 어두운 색을 배제하기 위해 HSL 기반으로 생성 후 HEX 변환
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 20) + 70; // 70% ~ 90% (선명함)
        const lightness = Math.floor(Math.random() * 15) + 55;  // 55% ~ 70% (밝고 부드러움)

        const hex = hslToHex(hue, saturation, lightness);
        setColor(hex);
        setCopied(false);
    };

    // HSL을 HEX로 변환하는 헬퍼 함수
    const hslToHex = (h, s, l) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.floor(255 * color).toString(16).padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    };

    // 클립보드 복사 함수
    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // 1.5초 후 토스트 안내 문구 초기화
    };

    return (
        <div className="Color">
            <Helmet>
                <title>색상 코드 생성기 | 제너허브</title>
                <meta name="description" content="웹디자인, 일러스트, PPT에 사용할 예쁜 색조합을 찾으시나요? 제너허브 색상 코드 생성기에서 클릭 한 번으로 감각적인 HEX, RGB 무작위 컬러와 팔레트 영감을 얻어보세요." />
                <meta property="og:title" content="색상 코드 생성기 | 제너허브" />
                <meta property="og:description" content="디자인 영감이 필요할 때! 클릭 한 번으로 HEX, RGB 무작위 색상 코드를 생성하고 나만의 특별한 컬러 팔레트를 찾아보세요." />
                <meta property="og:url" content="https://generhub.com/color" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"업무/개발"} />
            <div className="generator-container">
                <div
                    className="color-preview"
                    style={{ backgroundColor: color }}
                />

                <div className="color-info" onClick={copyToClipboard}>
                    <span className="hex-code">{color}</span>
                    <span className="copy-badge">{copied ? "복사 완료!" : "클릭하여 복사하기"}</span>
                </div>

                <button className="generate-btn" onClick={generateAppleColor}>
                    새로운 컬러 생성
                </button>
            </div>
        </div>
    );
}