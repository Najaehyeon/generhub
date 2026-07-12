import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/index.css';
import App from './App.jsx';
import Color from './path/Color.jsx';
import Fortune from './path/Fortune.jsx';
import Icebreaking from './path/Icebreaking.jsx';
import LoremLpsum from './path/LoremIpsum.jsx';
import Lotto from './path/Lotto.jsx';
import Menu from './path/Menu.jsx';
import Nickname from './path/Nickname.jsx';
import Password from './path/Password.jsx';
import Roulette from './path/Roulette.jsx';
import Quotes from './path/Quotes.jsx';
import Travel from './path/Travel.jsx';
import Header from './components/Header.jsx';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Root() {
  return (
    <div className='Root'>
      <Helmet>
        <title>제너허브 | 랜덤생성기 창고</title>
        <meta name="description" content="의도되지 않은 규칙성과 순수한 무작위성의 가치를 수호하는 랜덤 생성기 저장소, 제너허브입니다." />
        <meta property="og:title" content="Generhub | 랜덤생성기 창고" />
        <meta property="og:description" content="의도되지 않은 규칙성과 순수한 무작위성의 가치를 수호하는 랜덤 생성기 저장소, 제너허브입니다." />
        <meta property="og:url" content="https://generhub.com/" />
      </Helmet>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: App },
      { path: "nickname", Component: Nickname },
      { path: "roulette", Component: Roulette },
      { path: "password", Component: Password },
      { path: "color", Component: Color },
      { path: "lorem-ipsum", Component: LoremLpsum },
      { path: "lotto", Component: Lotto },
      { path: "menu", Component: Menu },
      { path: "icebreaking", Component: Icebreaking },
      { path: "travel", Component: Travel },
      { path: "fortune", Component: Fortune },
      { path: "quotes", Component: Quotes },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <HelmetProvider>
    <RouterProvider router={router} />,
  </HelmetProvider>
);