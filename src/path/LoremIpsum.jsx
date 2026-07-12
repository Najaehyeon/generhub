import { useState } from "react";
import "../styles/LoremIpsum.css";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet-async";

// 임시 더미 데이터 소스
const dummySource = "로렘 입숨은 전통적인 dummy text로, 글꼴, 레이아웃 등을 테스트하기 위해 사용합니다. 애플의 하드웨어와 소프트웨어 디자인은 단순함과 직관성을 추구하며 사용자에게 최고의 경험을 제공합니다. 미니멀리즘은 단순히 불필요한 것을 덜어내는 것이 아니라 가장 본질적인 것에 집중하는 예술입니다. 완벽함이란 더 이상 더할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 완성됩니다.";

export default function LoremIpsum() {
    const [type, setType] = useState("paragraphs"); // paragraphs, sentences, words
    const [count, setCount] = useState(3);
    const [generatedText, setGeneratedText] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = () => {
        let result = "";

        if (type === "paragraphs") {
            result = Array(Number(count)).fill(dummySource).join("\n\n");
        } else if (type === "sentences") {
            const sentences = dummySource.split(". ");
            result = Array(Number(count))
                .fill(0)
                .map((_, i) => sentences[i % sentences.length] + ".")
                .join(" ");
        } else if (type === "words") {
            // 공백 기준으로 단어를 분리하여 요청한 개수만큼 조합
            const words = dummySource.split(" ");
            result = Array(Number(count))
                .fill(0)
                .map((_, i) => words[i % words.length])
                .join(" ");
        }

        setGeneratedText(result);
        setIsCopied(false);
    };

    const handleCopy = async () => {
        if (!generatedText) return;
        try {
            await navigator.clipboard.writeText(generatedText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    return (
        <div className="LoremIpsum">
            <Helmet>
                <title>더미 텍스트 생성기 | 제너허브</title>
                <meta name="description" content="웹디자인, UI/UX 레이아웃 구성에 필요한 로렘 입숨(Lorem Ipsum)과 한글 더미 텍스트를 무료로 생성해보세요. 글자 수, 문단 수를 지정하여 원하는 크기의 임시 텍스트를 즉시 복사할 수 있습니다." />
                <meta property="og:title" content="더미 텍스트 생성기 | 제너허브" />
                <meta property="og:description" content="디자이너와 개발자를 위한 필수 도구! 디자인 레이아웃 테스트를 위한 로렘 입숨 및 한글 임시 텍스트를 클릭 한 번으로 생성하고 복사하세요." />
                <meta property="og:url" content="https://generhub.com/loremIpsum" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"업무/개발"} />
            <div className="generator-container">
                <h2 className="generator-title">Lorem Ipsum 생성기</h2>
                <p className="generator-subtitle">프로젝트에 필요한 깔끔한 더미 텍스트를 빠르게 만들어보세요.</p>

                {/* 설정 컨트롤 영역 */}
                <div className="control-panel">
                    <div className="segmented-control">
                        <button
                            className={`segment-btn ${type === "paragraphs" ? "active" : ""}`}
                            onClick={() => setType("paragraphs")}
                        >
                            단락 (Paragraphs)
                        </button>
                        <button
                            className={`segment-btn ${type === "sentences" ? "active" : ""}`}
                            onClick={() => setType("sentences")}
                        >
                            문장 (Sentences)
                        </button>
                        <button
                            className={`segment-btn ${type === "words" ? "active" : ""}`}
                            onClick={() => setType("words")}
                        >
                            단어 (Words)
                        </button>
                    </div>

                    <div className="input-group">
                        <input
                            type="number"
                            className="count-input"
                            value={count}
                            min="1"
                            max="500" // 단어 수 조절을 고려해 맥스치 상향 조정
                            onChange={(e) => setCount(e.target.value)}
                        />
                        <button className="generate-btn" onClick={handleGenerate}>
                            생성하기
                        </button>
                    </div>
                </div>

                {/* 결과창 영역 */}
                {generatedText && (
                    <div className="result-panel">
                        <div className="result-header">
                            <span>생성된 결과</span>
                            <button
                                className={`copy-btn ${isCopied ? "copied" : ""}`}
                                onClick={handleCopy}
                            >
                                {isCopied ? "✓ 복사 완료" : "복사하기"}
                            </button>
                        </div>
                        <div className="result-body">
                            {generatedText.split("\n\n").map((para, idx) => (
                                <p key={idx} className="result-paragraph">{para}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}