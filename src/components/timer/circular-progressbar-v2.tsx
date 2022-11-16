import "./circular-progressbar-v2.css";


export interface CircularProgressbarProps {
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
        innerGradient,
        outerGradient,
        gradientPrefix,
        padding,
    } = props;

    innerProgress = Math.min(1, Math.max(0, innerProgress));
    outerProgress = Math.min(1, Math.max(0, outerProgress));

    const defaultColor = "black";

    const innerVariables: React.CSSProperties = {
        "--progress": `${innerProgress * 100}%`,
        "--bg-color-default": "grey",
        "--bg-color-0": innerGradient?.[0] ?? defaultColor,
        "--bg-color-1": innerGradient?.[1] ?? defaultColor,
    } as any;
    const outerVariables: React.CSSProperties = {
        "--progress": `${outerProgress * 100}%`,
        "--bg-color-default": "grey",
        "--bg-color-0": outerGradient?.[0] ?? defaultColor,
        "--bg-color-1": outerGradient?.[1] ?? defaultColor,
    } as any;

    return <div style={style} className="wrapper">
        <div className="outer" style={{...outerVariables}}></div>
        <div className="inner" style={{...innerVariables}}></div>

        <div className="mask"></div>
    </div>;
};