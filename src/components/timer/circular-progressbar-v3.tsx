import "./circular-progressbar-v3.css";


export interface CircularProgressbarProps {
    radius: number;
    innerProgress: number;
    outerProgress: number;
    strokeWidth: number;
    style?: React.CSSProperties;
    innerGradient?: [string, string];
    outerGradient?: [string, string];
    gradientPrefix?: string;
    padding?: number;
}

export const CircularProgressbar: React.FC<CircularProgressbarProps> = (props) => {
    let {
        innerProgress,
        outerProgress,
        strokeWidth,
        style,
        radius,
        innerGradient,
        outerGradient,
        gradientPrefix,
        padding,
    } = props;

    innerProgress = Math.min(1, Math.max(0, innerProgress));
    outerProgress = Math.min(1, Math.max(0, outerProgress));

    const viewportSize = 2*strokeWidth + 2*radius;

    const defaultColor = "black";

    const innerVariables: React.CSSProperties = {
    } as any;
    const outerVariables: React.CSSProperties = {
    } as any;

    return <div style={style} className="wrapper">
        <svg viewBox={`0 0 ${viewportSize} ${viewportSize}`}>
            <g className="outer" strokeWidth={strokeWidth} fill="none">
                <path stroke="black" d={`M ${radius} 0 A 1 1 0 0 0 ${radius} ${2*radius}`} className="circle-left"></path>
                <path stroke="black" d={`M ${radius} ${2*radius} A 1 1 0 0 0 ${radius} 0`} className="circle-right"></path>
            </g>
        </svg>
    </div>;
};