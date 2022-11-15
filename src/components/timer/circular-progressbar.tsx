import "./circular-progressbar.css";


export interface CircularProgressbarProps {
    progress: number;
    strokeWidth: number;
    style?: React.CSSProperties
}

export const CircularProgressbar: React.FC<CircularProgressbarProps> = ({ progress, strokeWidth, style }) => {
    progress = Math.min(1, Math.max(0, progress));

    const radius = 100;
    const viewportSize = 2*radius + 2*strokeWidth;

    const viewBox = `0 0 ${viewportSize} ${viewportSize}`;
    const cx = `${radius + strokeWidth}`;
    const cy = `${radius + strokeWidth}`;

    const svgStyle: {"--progress": number} = {"--progress": progress};

    return <div style={style}>
        <svg className="progress-bar" viewBox={viewBox} style={{...svgStyle as any, transform: "rotate(-90deg)"}} >
            <circle cx={cx} cy={cy} r={radius} strokeWidth={strokeWidth}></circle>
        </svg>  
    </div>;
};