import { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';

function App() {
  const generators = [
    // --- 로또 ---
    {
      title: "로또 번호 생성기",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ffygtkvIbUYeHYIvrM-HDaWOpdHHhRshgT21eQD6ZQ&s=10",
      link: "lotto",
      category: "로또",
      popular: true,
    },

    // --- 게임/재미 ---
    {
      title: "닉네임 생성기",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/16499/16499830.png",
      link: "nickname",
      category: "게임/재미",
      popular: true,
    },
    {
      title: "원판 돌리기(룰렛)",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/6116/6116773.png",
      link: "roulette",
      category: "게임/재미",
      popular: false,
    },
    // --- 업무/개발 ---
    {
      title: "비밀번호 생성기",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/891/891399.png",
      link: "password",
      category: "업무/개발",
      popular: true,
    },
    {
      title: "랜덤 컬러(HEX) 추출기",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/6125/6125139.png",
      link: "color",
      category: "업무/개발",
      popular: false,
    },
    {
      title: "더미 텍스트 생성기",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/2921/2921252.png",
      link: "lorem-ipsum",
      category: "업무/개발",
      popular: false,
    },

    // --- 일상/습관 ---
    {
      title: "오늘의 메뉴 추천",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/1046/1046747.png",
      link: "menu",
      category: "일상/습관",
      popular: true,
    },
    {
      title: "아이스브레이킹 주제 추천",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/1207/1207253.png",
      link: "icebreaking",
      category: "일상/습관",
      popular: false,
    },

    // --- 기타 ---
    {
      title: "여행지 랜덤 추천",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/201/201623.png",
      link: "travel",
      category: "기타",
      popular: false,
    },
    {
      title: "오늘의 운세 & 타로",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/2285/2285513.png",
      link: "fortune",
      category: "기타",
      popular: true,
    },
    {
      title: "명언 및 글귀 생성기",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/4260/4260270.png",
      link: "quotes",
      category: "기타",
      popular: false,
    }
  ];

  const [categoryId, setCategoryId] = useState(0);
  const buttons = [
    "전체",
    "인기",
    "로또",
    "게임/재미",
    "업무/개발",
    "일상/습관",
    "기타",
  ];

  const filteredGenerators = generators.filter((item) => {
    if (categoryId === 0) return true;
    if (categoryId === 1) return item.popular;
    return item.category === buttons[categoryId];
  })

  return (
    <div className='App'>
      <section className='intro'>
        <p>세상의 모든 위대한 시작은 사소한 우연이었습니다.
          <br /><strong>제너허브</strong>는 의도되지 않은 규칙성과 순수한 무작위성의 가치를 수호합니다.
          <br />더 많은 생성기를 기대해주세요.</p>
      </section>
      <nav className="category-nav">
        {
          buttons.map((button, index) => (
            <button
              key={index}
              className={categoryId === index ? 'nav-btn-active' : 'nav-btn'}
              onClick={() => setCategoryId(index)}
            >
              {button}
            </button>
          ))
        }
      </nav>
      <section className='generator-list'>
        {filteredGenerators.map((item, index) => (
          <a href={item.link} key={index}>
            <div className='generator-card'>
              <img className='thumbnail' src={item.imgUrl} alt={item.title} />
              <span>{item.title}</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}

export default App
