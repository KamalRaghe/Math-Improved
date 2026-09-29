
export default function PythagorasTriangle({ a, b, aClass = "", bClass = "" }) {
    return (
        <svg viewBox="0 0 240 190" width="240" height="190" role="img"
            aria-label={`Right triangle with legs ${a} and ${b}`}>
            <polygon points="40,150 200,150 40,30" fill="none" stroke="black" strokeWidth="3" strokeLinejoin="round" />
            {/* right-angle marker */}
            <polyline points="40,132 58,132 58,150" fill="none" stroke="black" strokeWidth="2" />
            <text className={aClass} x="120" y="178" textAnchor="middle" fontSize="22" fill="currentColor">{a}</text>
            <text className={bClass} x="16" y="96" textAnchor="middle" fontSize="22" fill="currentColor">{b}</text>
        </svg>
    );
}
