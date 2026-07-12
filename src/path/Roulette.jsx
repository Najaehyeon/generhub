import { Link } from "react-router";
import "../styles/Roulette.css";
import { useState, useRef, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet-async";

export default function Roulette() {
    const nextId = useRef(2);
    const nextColorId = useRef(1);
    const canvasRef = useRef(null);

    const isSpinning = useRef(false);
    const currentAngleRef = useRef(0);

    const [items, setItems] = useState([
        { id: 0, value: "", weight: 1, color: "salmon" },
        { id: 1, value: "+" } // 버튼용 객체
    ]);

    const [showResult, setShowResult] = useState(false);
    const [winningResult, setWinningResult] = useState("");

    const colorList = [
        // 레디시 / 핑크 계열
        "salmon", "peachpuff", "thistle", "mistyrose", "lavenderblush", "lightpink", "pink",
        // 옐로우 / 오렌지 계열
        "khaki", "beige", "lightyellow", "lemonchiffon", "papayawhip", "moccasin", "navajowhite",
        // 그린 계열
        "lightgreen", "honeydew", "mintcream", "palehighgreen", "palegreen", "lightseagreen",
        // 블루 / 시안 계열
        "skyblue", "powderblue", "lightcyan", "aliceblue", "azure", "lightskyblue", "paleturquoise",
        // 퍼플 / 라벤더 계열
        "lavender", "plum", "gainsboro", "whitesmoke", "ghostwhite"
    ];

    const onItemChanged = (e, targetId) => {
        const nextItems = items.map((item) => (
            item.id === targetId ? { ...item, value: e.target.value } : item
        ))
        setItems(nextItems);
    }

    const onWeightChanged = (e, targetId) => {
        if (e.target.value < 0) return;
        const nextWeights = items.map((item) => (
            item.id === targetId ? { ...item, weight: e.target.value } : item
        ))
        setItems(nextWeights);
    }

    // 2. 색상 중복 가능성을 최소화하도록 진화한 항목 추가 함수
    const addItem = () => {
        if (items.length >= 9) return; // 최대 개수 제한 유지

        // 현재 화면에 있는 항목들이 사용 중인 색상 모으기 (마지막 '+' 버튼 제외)
        const currentColors = items.slice(0, -1).map(item => item.color);

        // 전체 컬러 리스트 중 현재 화면에 '사용되지 않은' 색상들만 필터링
        let availableColors = colorList.filter(color => !currentColors.includes(color));

        // 만약 모든 색상이 한 번씩 다 쓰였다면, 전체 리스트에서 고를 수 있도록 리셋
        if (availableColors.length === 0) {
            availableColors = colorList;
        }

        // 남은 안전한 색상 후보군 중에서 무작위(Random)로 하나를 선택
        const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

        const newItem = {
            id: nextId.current++,
            value: "",
            weight: 1,
            color: randomColor // 인덱스 순서대로가 아닌, 겹치지 않는 랜덤 색상 부여
        };

        const nextItems = [...items];
        nextItems.splice(items.length - 1, 0, newItem);
        setItems(nextItems);
    };

    const removeItem = (targetId) => {
        if (items.length <= 2) return;
        const nextItems = items.filter(item => item.id !== targetId);
        setItems(nextItems);
    }

    // 1. 원판 그리기 (질문자님의 오리지널 텍스트 공식 100% 그대로 유지)
    const drawRoulette = (currentAngle = 0) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 매 프레임 잔상 지우기
        ctx.clearRect(0, 0, 400, 400);

        let previousTotalAngle = currentAngle;
        const validItems = items.slice(0, -1);
        const currentTotalWeight = validItems.reduce((sum, item) => sum + Number(item.weight), 0);

        if (currentTotalWeight === 0) return;

        validItems.forEach((item, index) => {
            const nowAngle = (2 * Math.PI / currentTotalWeight) * Number(item.weight);

            // 부채꼴 조각 그리기
            ctx.beginPath();
            ctx.moveTo(200, 200);
            ctx.arc(200, 200, 195, previousTotalAngle, previousTotalAngle + nowAngle);
            ctx.closePath();

            ctx.fillStyle = item.color;
            ctx.fill();

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // ⭐️ 질문자님의 원본 텍스트 매커니즘 그대로 유지
            ctx.font = "bold 16px Pretendard Variable";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(
                item.value,
                200 + 200 * Math.cos(previousTotalAngle + nowAngle / 2) / 2,
                200 + 200 * Math.sin(previousTotalAngle + nowAngle / 2) / 2
            );

            previousTotalAngle += nowAngle;
        });

        // 중앙 고정 핀 디자인 유지
        ctx.beginPath();
        ctx.arc(200, 200, 12, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "#1d1d1f";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(200, 200, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#1d1d1f";
        ctx.fill();
    }

    // 2. 룰렛 돌리기 함수 (질문자님 텍스트 공식에 맞춰 판정 수식 교정)
    const spinRoulette = () => {
        if (isSpinning.current) return;

        const validItems = items.slice(0, -1);
        if (validItems.length === 0 || validItems.every(item => !item.value.trim())) {
            alert("항목 내용을 입력해주세요.");
            return;
        }

        isSpinning.current = true;
        setShowResult(false);

        const currentTotalWeight = validItems.reduce((sum, item) => sum + Number(item.weight), 0);

        // 천천히 돌게 속도 조절 (최소 4바퀴 ~ 최대 7바퀴 랜덤)
        const randomDegree = Math.random() * 360 * 3 + 360 * 4;
        const targetAngle = currentAngleRef.current + (randomDegree * Math.PI) / 180;
        const startAngle = currentAngleRef.current;

        let progress = 0;

        const animate = () => {
            progress += 0.005; // 천천히 움직이도록 낮춘 프레임 수치

            const easeOutFactor = 1 - Math.pow(1 - progress, 3);
            currentAngleRef.current = startAngle + (targetAngle - startAngle) * easeOutFactor;

            drawRoulette(currentAngleRef.current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isSpinning.current = false;

                // ⭐️ [질문자님 오리지널 텍스트 매칭용 판정 공식]
                // 원판 회전량을 한 바퀴(2*PI) 범위로 정규화
                const finalAngle = currentAngleRef.current % (2 * Math.PI);

                // 12시 방향 화살표(▼) 위치를 계산하기 위해 3시 기준축에서 역산 분기 처리
                let targetPosOnCircle = (1.5 * Math.PI - finalAngle) % (2 * Math.PI);
                if (targetPosOnCircle < 0) {
                    targetPosOnCircle += 2 * Math.PI;
                }

                let accumulatedAngle = 0;
                let winner = validItems[0];

                // 순회하며 화살표가 꽂힌 가중치 구간 스캔
                for (let i = 0; i < validItems.length; i++) {
                    const itemAngle = (2 * Math.PI / currentTotalWeight) * Number(validItems[i].weight);
                    if (targetPosOnCircle >= accumulatedAngle && targetPosOnCircle < accumulatedAngle + itemAngle) {
                        winner = validItems[i];
                        break;
                    }
                    accumulatedAngle += itemAngle;
                }

                setWinningResult(winner.value || "이름 없는 항목");
                setShowResult(true);
            }
        };

        requestAnimationFrame(animate);
    }

    useEffect(() => {
        drawRoulette(currentAngleRef.current);
    }, [items]);

    return (
        <div className="Roulette">
            <Helmet>
                <title>원판 돌리기 | 제너허브</title>
                <meta name="description" content="오늘 점심 뭐 먹지? 내기나 추첨할 때 결정하기 힘들다면 제너허브 원판 돌리기를 이용해보세요. 항목을 입력하고 룰렛을 돌려 공정하고 완벽한 무작위 선택을 도와드립니다." />
                <meta property="og:title" content="원판 돌리기 | 제너허브" />
                <meta property="og:description" content="결정 장애 해결사! 점심 메뉴 고르기, 벌칙 내기, 순서 추첨까지 룰렛을 돌려 한 번에 해결하세요." />
                <meta property="og:url" content="https://generhub.com/roulette" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"게임/재미"} />
            <div className="roulette-card">
                <section className="lotto-intro">
                    <img
                        className="lotto-icon"
                        src="https://cdn-icons-png.flaticon.com/128/1714/1714180.png"
                        alt="룰렛 아이콘"
                    />
                    <h2>원판 돌리기</h2>
                    <p>원하는 항목을 넣고 원판을 돌려보세요.</p>
                </section>

                <section className="item-list-grid">
                    {items.map((item, index) => (
                        index === items.length - 1
                            ? <button
                                key={item.id}
                                onClick={addItem}
                                className="add-item-btn"
                            >
                                +
                            </button>
                            : <div key={item.id} className="item-group">
                                <input
                                    type="text"
                                    placeholder="항목 입력"
                                    value={item.value}
                                    onChange={(e) => onItemChanged(e, item.id)}
                                    className="item-input"
                                />
                                <input
                                    value={item.weight}
                                    type="number"
                                    className="weighting-input"
                                    onChange={(e) => onWeightChanged(e, item.id)}
                                />
                                <button
                                    className="delete-item-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    ✕
                                </button>
                            </div>
                    ))}
                </section>

                <section className="roulette-circle-section">
                    <div className="roulette-arrow">▼</div>
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={400}
                    ></canvas>
                    <button className="spin-btn" onClick={spinRoulette}>
                        START
                    </button>
                </section>
            </div>

            {showResult && (
                <div className="result-modal-overlay">
                    <div className="result-modal">
                        <h3>당첨 결과</h3>
                        <h1>{winningResult}</h1>
                        <button onClick={() => setShowResult(false)}>확인</button>
                    </div>
                </div>
            )}
        </div>
    )
}