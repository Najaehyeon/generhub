import { useState } from "react";
import "../styles/Travel.css";
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/PageHeader";

// 1. 세계 최고 수준의 방대한 여행지 데이터베이스 세트
const travelData = {
    "한국": [
        // 대도시 및 에센셜
        "부산 해운대 & 광안리", "제주도 성산 일출봉 & 애월 해안도로", "경주 황리단길 & 안압지 야경",
        "여수 낭만포차 거리 & 향일암", "전주 한옥마을 먹거리 투어", "강릉 안목해변 커피거리",
        // 숨은 명소 및 대자연
        "평창 발왕산 천년주목숲길", "남해 다랭이마을 & 독일마을", "순천만 습지 갈대밭",
        "단양 도담삼봉 & 패러글라이딩", "울릉도 독도 일주", "인제 자작나무 숲",
        "신안 퍼플섬 (반월·박지도)", "포항 호미곶 & 스페이스워크"
    ],
    "일본/대만": [
        // 일본 (도시/전통/휴양)
        "교토 청수사 & 아라시야마 대나무숲 (일본)", "삿포로 오도리공원 & 비에이 청의 호수 (일본)",
        "오키나와 이시가키섬 & 만좌모 (일본)", "도쿄 시부야 스카이 & 아키하바라 (일본)",
        "오사카 도톤보리 & 유니버셜 스튜디오 (일본)", "후쿠오카 유후인 온천마을 (일본)",
        "하코네 아시노호 유람선 (일본)", "나오시마 예술의 섬 (일본)",
        // 대만
        "타이베이 지우분 & 시문딩 (대만)", "가오슝 연지담 & 보얼예술특구 (대만)",
        "화롄 타이루각 협곡 대자연 (대만)", "타이중 고美습지 일몰 (대만)",
        "이난 자오시 유황 온천 (대만)", "컨딩 국립공원 에메랄드 해변 (대만)"
    ],
    "동남아시아": [
        // 휴양지 끝판왕
        "발리 우붓 정글 그네 & 짱구 해변 (인도네시아)", "보라카이 화이트비치 스테이션 (필리핀)",
        "코타키나발루 세계 3대 석양 (말레이시아)", "푸켓 피피섬 스노클링 (태국)",
        "세부 오슬롭 고래상어 투어 (필리핀)", "롬복 길리 트라방안 섬 (인도네시아)",
        // 도시 및 문화유산
        "방콕 카오산로드 & 왓 아룬 야경 (태국)", "치앙마이 올드타운 한 달 살기 (태국)",
        "다낭 바나힐 골든브릿지 (베트남)", "싱가포르 마리나베이 샌즈 & 가든스 바이 더 베이",
        "하노이 하롱베이 크루즈 (베트남)", "씨엠립 앙코르와트 사원 신비 투어 (캄보디아)",
        "쿠알라룸푸르 페트로나스 트윈 타워 (말레이시아)", "라오스 루앙프라방 탁발 의식"
    ],
    "유럽": [
        // 서유럽/북유럽
        "파리 에펠탑 & 루브르 박물관 (프랑스)", "런던 타워브릿지 & 소호 거리 (영국)",
        "인터라켄 융프라우 & 그린델발트 (스위스)", "암스테르담 운하 크루즈 (네덜란드)",
        "아이슬란드 레이캬비크 오로라 헌팅", "노르웨이 피오르드 대협곡 드라이브",
        // 남유럽/지중해
        "로마 콜로세움 & 트레비 분수 (이탈리아)", "피렌체 두오모 성당 (이탈리아)",
        "바르셀로나 사그라다 파밀리아 (스페인)", "마드리드 프라도 미술관 (스페인)",
        "산토리니 이아마을 파란 지붕 (그리스)", "포르투 도우루 강변 야경 (포르투갈)",
        // 동유럽/중유럽
        "프라하 올드타운 광장 야경 (체코)", "부다페스트 국회의사당 야경 크루즈 (헝가리)",
        "비엔나 쇤브룬 궁전 (오스트리아)", "크로아티아 플리트비체 국립공원 요정의 호수"
    ],
    "북미/대양주": [
        // 북미 (미국/캐나다)
        "뉴욕 타임스퀘어 & 센트럴 파크 (미국)", "로스앤젤레스 산타모니카 & 할리우드 (미국)",
        "하와이 와이키키 해변 & 스노클링 (미국)", "샌프란시스코 금문교 & 피셔맨스 워프 (미국)",
        "라스베이거스 스트립 벨라지오 분수쇼 (미국)", "그랜드 캐니언 국립공원 대자연 (미국)",
        "밴프 국립공원 레이크 루이스 (캐나다)", "토론토 나이아가라 폭포 (캐나다)",
        // 대양주 (호주/뉴질랜드/휴양지)
        "시드니 오페라하우스 & 본다이 비치 (호주)", "멜버른 그레이트 오션 로드 (호주)",
        "케언즈 그레이트 배리어 리프 스쿠버다이빙 (호주)", "골드코스트 서퍼스 파라다이스 (호주)",
        "퀸스타운 밀포드 사운드 크루즈 (뉴질랜드)", "로토루아 마오리 전통 온천마을 (뉴질랜드)",
        "남태평양 타히티 보라보라 섬 수상 방갈로", "피지 난디 산호초 다이빙"
    ],
    "중남미/아프리카": [
        // 중남미
        "마추픽추 잉가 문명 잃어버린 도시 (페루)", "우유니 소금사막 세상에서 가장 큰 거울 (볼리비아)",
        "칸쿤 올인클루시브 에메랄드 리조트 (멕시코)", "멕시코시티 프리다 칼로 박물관 (멕시코)",
        "리오데자네이루 예수상 & 코파카바나 (브라질)", "파타고니아 토레스 델 파이네 국립공원 (칠레)",
        "부에노스아이레스 탱고 쇼 (아르헨티나)", "이구아수 폭포 악마의 목구멍 (브라질/아르헨티나)",
        // 아프리카/중동
        "케이프타운 테이블마운틴 & 희망봉 (남아공)", "세렝게티 국립공원 야생 사파리 투어 (탄자니아)",
        "카이로 피라미드 & 스핑크스 신비 투어 (이집트)", "모로코 마라케시 사막 투어 & 블루시티 셰프샤우엔",
        "두바이 부르즈 할리파 & 사막 사파리 (UAE)", "터키 카파도키아 열기구 투어",
        "마다가스카르 바오밥나무 거리", "세이셸 라디그 섬 인도양의 낙원"
    ]
};

export default function Travel() {
    const categories = Object.keys(travelData);

    const [selectedCategory, setSelectedCategory] = useState("한국");
    // 초기값은 선택된 카테고리의 첫 번째 여행지로 설정
    const [result, setResult] = useState(travelData["한국"][0]);
    const [isSpinning, setIsSpinning] = useState(false);

    // 2. 여행지 랜덤 추천 핸들러 (슬롯머신 같은 시각적 완성도 추가)
    const handleRecommend = () => {
        if (isSpinning) return; // 이미 추천 중이면 중복 클릭 방지

        const places = travelData[selectedCategory];
        setIsSpinning(true);

        let counter = 0;
        // 버튼을 눌렀을 때 마구 고르는 듯한 연출을 위해 인터벌 사용
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * places.length);
            setResult(places[randomIndex]);
            counter++;

            if (counter > 10) { // 10번 빠르게 바뀐 뒤 멈춤
                clearInterval(interval);
                setIsSpinning(false);
            }
        }, 60);
    };

    // 카테고리 변경 시 결과창도 자연스럽게 해당 카테고리의 첫 값으로 리셋
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setResult(travelData[category][0]);
    };

    return (
        <div className="Travel">
            <Helmet>
                <title>추천 여행지 생성기 | 제너허브</title>
                <meta name="description" content="이번 휴가 어디로 떠날지 고민되시나요? 제너허브 추천 여행지 생성기에서 국내부터 해외까지 당신의 다음 여정이 될 완벽한 랜덤 여행지를 추천받고 특별한 여행 계획을 시작해보세요." />
                <meta property="og:title" content="추천 여행지 생성기 | 제너허브" />
                <meta property="og:description" content="어디로 떠날지 모를 땐 클릭 한 번으로! 국내외 매력적인 무작위 추천 여행지를 제너허브에서 지금 바로 확인해보세요." />
                <meta property="og:url" content="https://generhub.com/travel" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"기타"} />
            <div className="generator-container">
                <span className="subtitle">어디로 놀러 가지?</span>
                <h1 className="title">여행지 랜덤 추천</h1>

                {/* 카테고리 섹션 */}
                <section className="category-group">
                    <label>카테고리</label>
                    <div className="category-container">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 추천 여행지 섹션 */}
                <section className="result-group">
                    <p className="tag">{selectedCategory}</p>
                    {/* 추천 중일 때 살짝 흐려지는 효과를 위한 클래스 조건부 부여 */}
                    <p className={`result ${isSpinning ? "spinning" : ""}`}>{result}</p>
                </section>

                {/* 여행지 추천 버튼 */}
                <button
                    className="generate-btn"
                    onClick={handleRecommend}
                    disabled={isSpinning}
                >
                    {isSpinning ? "고르는 중..." : "여행지 추천 받기"}
                </button>
            </div>
        </div>
    );
}