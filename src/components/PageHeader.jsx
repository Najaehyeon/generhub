import { Link } from "react-router";
import "../styles/PageHeader.css";

export default function PageHeader({ badge }) {
    return (
        <div className="page-header">
            <Link to="/" className="back-btn">← 전체 서비스</Link>
            <span className="badge">{badge}</span>
        </div>
    )
}