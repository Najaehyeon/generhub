import "../styles/Header.css";
import { Link } from "react-router";

export default function Header() {
    return (
        <header className='header'>
            <h1><Link to="/">GenerHub</Link></h1>
            <div className="search-container">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" className="search-input" placeholder="생성기 검색..." />
            </div>
        </header>
    )
}