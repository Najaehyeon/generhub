import { useState } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Menu.css";
import { Helmet } from "react-helmet-async";

const MENU_DATA = [
    // === 한식 (1 ~ 50) ===
    { id: 1, name: "돼지김치찌개", category: "한식" },
    { id: 2, name: "차돌박이 된장찌개", category: "한식" },
    { id: 3, name: "소뚝배기불고기", category: "한식" },
    { id: 4, name: "제육볶음 정식", category: "한식" },
    { id: 5, name: "전주 비빔밥", category: "한식" },
    { id: 6, name: "한우 곰탕", category: "한식" },
    { id: 7, name: "뼈해장국", category: "한식" },
    { id: 8, name: "순대국밥", category: "한식" },
    { id: 9, name: "뚝배기 닭볶음탕", category: "한식" },
    { id: 10, name: "보쌈 정식", category: "한식" },
    { id: 11, name: "한우 육회비빔밥", category: "한식" },
    { id: 12, name: "낙지볶음", category: "한식" },
    { id: 13, name: "곱창전골", category: "한식" },
    { id: 14, name: "갈비탕", category: "한식" },
    { id: 15, name: "오징어볶음", category: "한식" },
    { id: 16, name: "부대찌개", category: "한식" },
    { id: 17, name: "청국장 찌개", category: "한식" },
    { id: 18, name: "콩나물국밥", category: "한식" },
    { id: 19, name: "매운 갈비찜", category: "한식" },
    { id: 20, name: "물냉면", category: "한식" },
    { id: 21, name: "비빔냉면", category: "한식" },
    { id: 22, name: "춘천 닭갈비", category: "한식" },
    { id: 23, name: "안동 찜닭", category: "한식" },
    { id: 24, name: "바지락 칼국수", category: "한식" },
    { id: 25, name: "수제비", category: "한식" },
    { id: 26, name: "소고기 육개장", category: "한식" },
    { id: 27, name: "선지해장국", category: "한식" },
    { id: 28, name: "우거지국밥", category: "한식" },
    { id: 29, name: "소머리국밥", category: "한식" },
    { id: 30, name: "황태해장국", category: "한식" },
    { id: 31, name: "오삼불고기", category: "한식" },
    { id: 32, name: "뚝배기 감자탕", category: "한식" },
    { id: 33, name: "고등어구이 정식", category: "한식" },
    { id: 34, name: "갈치조림", category: "한식" },
    { id: 35, name: "동태찌개", category: "한식" },
    { id: 36, name: "대구탕", category: "한식" },
    { id: 37, name: "꽃게탕", category: "한식" },
    { id: 38, name: "돌솥 비빔밥", category: "한식" },
    { id: 39, name: "강된장 보리밥", category: "한식" },
    { id: 40, name: "꼬막비빔밥", category: "한식" },
    { id: 41, name: "들깨 수제비", category: "한식" },
    { id: 42, name: "사골 떡만두국", category: "한식" },
    { id: 43, name: "김치볶음밥", category: "한식" },
    { id: 44, name: "낙곱새 전골", category: "한식" },
    { id: 45, name: "오리주물럭", category: "한식" },
    { id: 46, name: "궁중 떡볶이", category: "한식" },
    { id: 47, name: "감자전", category: "한식" },
    { id: 48, name: "해물파전", category: "한식" },
    { id: 49, name: "도토리묵무침", category: "한식" },
    { id: 50, name: "더덕구이", category: "한식" },

    // === 양식 (51 ~ 100) ===
    { id: 51, name: "까르보나라 파스타", category: "양식" },
    { id: 52, name: "알리오 올리오", category: "양식" },
    { id: 53, name: "볼로네제 파스타", category: "양식" },
    { id: 54, name: "쉬림프 로제 파스타", category: "양식" },
    { id: 55, name: "봉골레 파스타", category: "양식" },
    { id: 56, name: "트러플 크림 리조또", category: "양식" },
    { id: 57, name: "토마토 해산물 리조또", category: "양식" },
    { id: 58, name: "채끝 스테이크", category: "양식" },
    { id: 59, name: "안심 스테이크", category: "양식" },
    { id: 60, name: "마르게리따 피자", category: "양식" },
    { id: 61, name: "고르곤졸라 피자", category: "양식" },
    { id: 62, name: "페페로니 피자", category: "양식" },
    { id: 63, name: "수제 치즈버거 세트", category: "양식" },
    { id: 64, name: "바베큐 폭립", category: "양식" },
    { id: 65, name: "라자냐", category: "양식" },
    { id: 66, name: "뇨끼", category: "양식" },
    { id: 67, name: "바질 페스토 파스타", category: "양식" },
    { id: 68, name: "잠봉뵈르 샌드위치", category: "양식" },
    { id: 69, name: "클럽 샌드위치", category: "양식" },
    { id: 70, name: "에그인헬", category: "양식" },
    { id: 71, name: "라따뚜이", category: "양식" },
    { id: 72, name: "비프 스튜", category: "양식" },
    { id: 73, name: "클램 차우더 스프", category: "양식" },
    { id: 74, name: "미트볼 파스타", category: "양식" },
    { id: 75, name: "명란 크림 파스타", category: "양식" },
    { id: 76, name: "상하이 상하이 파스타", category: "양식" },
    { id: 77, name: "티본 스테이크", category: "양식" },
    { id: 78, name: "함박 스테이크", category: "양식" },
    { id: 79, name: "루꼴라 피자", category: "양식" },
    { id: 80, name: "콤비네이션 피자", category: "양식" },
    { id: 81, name: "포테이토 피자", category: "양식" },
    { id: 82, name: "베이컨 체다치즈 피자", category: "양식" },
    { id: 83, name: "쉬림프 타코", category: "양식" },
    { id: 84, name: "치킨 퀘사디아", category: "양식" },
    { id: 85, name: "소고기 브리또", category: "양식" },
    { id: 86, name: "풀드포크 버거", category: "양식" },
    { id: 87, name: "베이컨 에그 베네딕트", category: "양식" },
    { id: 88, name: "프렌치 토스트", category: "양식" },
    { id: 89, name: "몬테크리스토 샌드위치", category: "양식" },
    { id: 90, name: "치킨 시저 샐러드 wrap", category: "양식" },
    { id: 91, name: "피쉬 앤 칩스", category: "양식" },
    { id: 92, name: "맥앤치즈", category: "양식" },
    { id: 93, name: "버섯 크림 리조또", category: "양식" },
    { id: 94, name: "오징어 먹물 파스타", category: "양식" },
    { id: 95, name: "투움바 파스타", category: "양식" },
    { id: 96, name: "감바스 알 아히요", category: "양식" },
    { id: 97, name: "버팔로 윙 스틱", category: "양식" },
    { id: 98, name: "치즈 오믈렛", category: "양식" },
    { id: 99, name: "클래식 미트파이", category: "양식" },
    { id: 100, name: "바베큐 치킨 피자", category: "양식" },

    // === 일식/중식 (101 ~ 150) ===
    { id: 101, name: "등심 돈카츠", category: "일식/중식" },
    { id: 102, name: "안심 히레카츠", category: "일식/중식" },
    { id: 103, name: "모둠 초밥 (12p)", category: "일식/중식" },
    { id: 104, name: "사케동 (연어덮밥)", category: "일식/중식" },
    { id: 105, name: "규동 (소고기덮밥)", category: "일식/중식" },
    { id: 106, name: "가츠동 (돈까스덮밥)", category: "일식/중식" },
    { id: 107, name: "돈코츠 라멘", category: "일식/중식" },
    { id: 108, name: "소유 라멘", category: "일식/중식" },
    { id: 109, name: "카라구치 라멘", category: "일식/중식" },
    { id: 110, name: "붓카케 우동", category: "일식/중식" },
    { id: 111, name: "새우튀김 우동", category: "일식/중식" },
    { id: 112, name: "냉모밀", category: "일식/중식" },
    { id: 113, name: "텐동 (모둠튀김덮밥)", category: "일식/중식" },
    { id: 114, name: "짜장면", category: "일식/중식" },
    { id: 115, name: "차돌 짬뽕", category: "일식/중식" },
    { id: 116, name: "찹쌀 탕수육", category: "일식/중식" },
    { id: 117, name: "마라탕", category: "일식/중식" },
    { id: 118, name: "마라샹궈", category: "일식/중식" },
    { id: 119, name: "꿔바로우", category: "일식/중식" },
    { id: 120, name: "고추잡채와 꽃빵", category: "일식/중식" },
    { id: 121, name: "시오 라멘", category: "일식/중식" },
    { id: 122, name: "미소 라멘", category: "일식/중식" },
    { id: 123, name: "야끼소바", category: "일식/중식" },
    { id: 124, name: "카레 우동", category: "일식/중식" },
    { id: 125, name: "김치나베돈카츠", category: "일식/중식" },
    { id: 126, name: "에비동 (새우튀김덮밥)", category: "일식/중식" },
    { id: 127, name: "호르몬동 (대창덮밥)", category: "일식/중식" },
    { id: 128, name: "부타동 (돼지고기덮밥)", category: "일식/중식" },
    { id: 129, name: "치즈카츠", category: "일식/중식" },
    { id: 130, name: "오코노미야끼", category: "일식/중식" },
    { id: 131, name: "회덮밥", category: "일식/중식" },
    { id: 132, name: "간장게장 정식", category: "일식/중식" }, // 분류 조정용 일식풍/아시안 대안
    { id: 133, name: "간장새우덮밥", category: "일식/중식" },
    { id: 134, name: "간짜장", category: "일식/중식" },
    { id: 135, name: "쟁반짜장", category: "일식/중식" },
    { id: 136, name: "삼선짬뽕", category: "일식/중식" },
    { id: 137, name: "볶음밥과 짜장소스", category: "일식/중식" },
    { id: 138, name: "잡채밥", category: "일식/중식" },
    { id: 139, name: "마파두부밥", category: "일식/중식" },
    { id: 140, name: "유린기", category: "일식/중식" },
    { id: 141, name: "깐풍기", category: "일식/중식" },
    { id: 142, name: "크림새우", category: "일식/중식" },
    { id: 143, name: "칠리새우", category: "일식/중식" },
    { id: 144, name: "양장피", category: "일식/중식" },
    { id: 145, name: "멘보샤", category: "일식/중식" },
    { id: 146, name: "탄탄면", category: "일식/중식" },
    { id: 147, name: "우육면", category: "일식/중식" },
    { id: 148, name: "딤섬 모둠", category: "일식/중식" },
    { id: 149, name: "토마토달걀볶음", category: "일식/중식" },
    { id: 150, name: "멘치카츠", category: "일식/중식" },

    // === 다이어트 (151 ~ 175) ===
    { id: 151, name: "연어 아보카도 샐러드", category: "다이어트" },
    { id: 152, name: "닭가슴살 샐러드 보울", category: "다이어트" },
    { id: 153, name: "우삼겹 메밀면 샐러드", category: "다이어트" },
    { id: 154, name: "리코타 치즈 샐러드", category: "다이어트" },
    { id: 155, name: "하와이안 연어 포케", category: "다이어트" },
    { id: 156, name: "스파이시 튜너 포케", category: "다이어트" },
    { id: 157, name: "그릭 요거트 보울", category: "다이어트" },
    { id: 158, name: "아사이 베리 보울", category: "다이어트" },
    { id: 159, name: "두부면 토마토 파스타", category: "다이어트" },
    { id: 160, name: "훈제오리 샐러드 고구마 매시", category: "다이어트" },
    { id: 161, name: "곤약 현미 야채 볶음밥", category: "다이어트" },
    { id: 162, name: "단호박 에그 슬럿", category: "다이어트" },
    { id: 163, name: "소고기 샤브샤브", category: "다이어트" },
    { id: 164, name: "과일 컵 스무디 보울", category: "다이어트" },
    { id: 165, name: "닭가슴살 현미 떡볶이", category: "다이어트" },
    { id: 166, name: "쉬림프 에그 샐러드 보울", category: "다이어트" },
    { id: 167, name: "육회 샐러드", category: "다이어트" },
    { id: 168, name: "그릴드 버섯 샐러드", category: "다이어트" },
    { id: 169, name: "그릴드 치킨 포케", category: "다이어트" },
    { id: 170, name: "두부 유부초밥", category: "다이어트" },
    { id: 171, name: "키토 김밥", category: "다이어트" },
    { id: 172, name: "닭가슴살 샌드위치", category: "다이어트" },
    { id: 173, name: "통밀 아보카도 샌드위치", category: "다이어트" },
    { id: 174, name: "곤약면 비빔국수", category: "다이어트" },
    { id: 175, name: "토마토 카프레제 샐러드", category: "다이어트" },

    // === 카페/디저트 (176 ~ 200) ===
    { id: 176, name: "아메리카노", category: "카페/디저트" },
    { id: 177, name: "카페 라떼", category: "카페/디저트" },
    { id: 178, name: "바닐라 빈 라떼", category: "카페/디저트" },
    { id: 179, name: "우지 말차 라떼", category: "카페/디저트" },
    { id: 180, name: "아인슈페너", category: "카페/디저트" },
    { id: 181, name: "딸기 라떼", category: "카페/디저트" },
    { id: 182, name: "자몽 허니 블랙티", category: "카페/디저트" },
    { id: 183, name: "밀크티", category: "카페/디저트" },
    { id: 184, name: "크로플 크림 아일랜드", category: "카페/디저트" },
    { id: 185, name: "수플레 팬케이크", category: "카페/디저트" },
    { id: 186, name: "바스크 치즈 케이크", category: "카페/디저트" },
    { id: 187, name: "초코 가나슈 타르트", category: "카페/디저트" },
    { id: 188, name: "티라미수", category: "카페/디저트" },
    { id: 189, name: "소금빵", category: "카페/디저트" },
    { id: 190, name: "앙버터 스콘", category: "카페/디저트" },
    { id: 191, name: "휘낭시에 세트", category: "카페/디저트" },
    { id: 192, name: "레몬 파운드 케이크", category: "카페/디저트" },
    { id: 193, name: "망고 빙수", category: "카페/디저트" },
    { id: 194, name: "팥빙수", category: "카페/디저트" },
    { id: 195, name: "얼그레이 쉬폰 케이크", category: "카페/디저트" },
    { id: 196, name: "콜드브루 커피", category: "카페/디저트" },
    { id: 197, name: "카라멜 마끼아또", category: "카페/디저트" },
    { id: 198, name: "패션후르츠 에이드", category: "카페/디저트" },
    { id: 199, name: "청포도 모히또", category: "카페/디저트" },
    { id: 200, name: "딸기 생크림 케이크", category: "카페/디저트" }
];

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [recommendedMenu, setRecommendedMenu] = useState(null);
    const [history, setHistory] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const categories = ["전체", "한식", "양식", "일식/중식", "다이어트", "카페/디저트"];

    const handleRecommend = () => {
        let filtered = MENU_DATA;
        if (selectedCategory !== "전체") filtered = filtered.filter(m => m.category === selectedCategory);

        if (filtered.length === 0) {
            alert("조건에 맞는 메뉴가 없습니다. 필터를 변경해보세요!");
            return;
        }

        setIsAnimating(true);

        setTimeout(() => {
            let randomIndex;
            let picked;

            // filtered.length가 1보다 클 때만 중복 체크를 수행 (1개일 때는 어쩔 수 없이 기존 메뉴 노출)
            if (filtered.length > 1) {
                do {
                    randomIndex = Math.floor(Math.random() * filtered.length);
                    picked = filtered[randomIndex];
                } while (recommendedMenu && picked.id === recommendedMenu.id); // 이전 메뉴(recommendedMenu)의 id와 같으면 재추첨
            } else {
                // 필터된 메뉴가 1개뿐이라면 선택의 여지가 없으므로 바로 뽑기
                picked = filtered[0];
            }

            setRecommendedMenu(picked);
            setIsAnimating(false);

            setHistory(prev => [picked, ...prev.filter(h => h.id !== picked.id)].slice(0, 3));
        }, 400);
    };

    return (
        <div className="Menu">
            <Helmet>
                <title>오늘의 메뉴 추천 | 제너허브</title>
                <meta name="description" content="오늘 점심, 저녁 뭐 먹을지 고민되시나요? 제너허브 오늘의 메뉴 추천기에서 결정 장애를 한 번에 해결해보세요. 한식, 중식, 일식, 양식 중 당신의 입맛을 사로잡을 랜덤 메뉴를 추천해 드립니다." />
                <meta property="og:title" content="오늘의 메뉴 추천 | 제너허브" />
                <meta property="og:description" content="오늘 뭐 먹지? 메뉴 고르기 힘들 땐 제너허브에서! 클릭 한 번으로 오늘 당신이 먹을 최고의 무작위 추천 메뉴를 확인해보세요." />
                <meta property="og:url" content="https://generhub.com/menu" />
                <meta property="og:type" content="website" />
            </Helmet>
            <PageHeader badge={"일상/습관"} />

            <div className="generator-container">
                <span className="apple-subtitle">오늘 뭐 먹지?</span>
                <h1 className="apple-title">오늘 메뉴 추천</h1>

                {/* 필터 섹션 */}
                <div className="filter-section">
                    <div className="filter-group">
                        <label>카테고리</label>
                        <div className="chip-container">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`chip ${selectedCategory === cat ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 메인 추천 버튼 */}
                <button
                    className={`apple-submit-btn ${isAnimating ? "loading" : ""}`}
                    onClick={handleRecommend}
                    disabled={isAnimating}
                >
                    {isAnimating ? "메뉴 고르는 중..." : "오늘의 메뉴 추천받기"}
                </button>

                {/* 추천 결과창 */}
                {recommendedMenu && (
                    <div className={`result-card ${isAnimating ? "fade-out" : "fade-in"}`}>
                        <span className="result-tag">{recommendedMenu.category}</span>
                        <h2 className="result-name">{recommendedMenu.name}</h2>
                    </div>
                )}

                {/* 최근 추천 히스토리 */}
                {history.length > 0 && (
                    <div className="history-section">
                        <h4 className="history-title">최근 추천된 메뉴</h4>
                        <div className="history-list">
                            {history.map((item, index) => (
                                <div key={index} className="history-item">
                                    <span className="history-name">{item.name}</span>
                                    <span className="history-cate">{item.category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}