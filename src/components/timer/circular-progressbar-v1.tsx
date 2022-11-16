import "./circular-progressbar-v1.css";


export interface CircularProgressbarProps {
    innerProgress: number;
    outerProgress: number;
    strokeWidth: number;
    style?: React.CSSProperties;
    innerGradient?: [string, string];
    outerGradient?: [string, string];
    gradientPrefix?: string;
    padding?: number;
    radius: number;
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
        radius,
    } = props;

    innerProgress = Math.min(1, Math.max(0, innerProgress));
    outerProgress = Math.min(1, Math.max(0, outerProgress));

    const viewportSize = 2 * radius + 2 * strokeWidth;

    const viewBox = `0 0 ${viewportSize} ${viewportSize}`;
    const cx = `${radius + strokeWidth}`;
    const cy = `${radius + strokeWidth}`;

    const defaultColor = "black";

    const innerGradientId = `${gradientPrefix ?? ""}_inner`;
    const outerGradientId = `${gradientPrefix ?? ""}_outer`;

    if (!padding) {
        padding = 0;
    }

    const outerRadius = radius;
    const innerRadius = radius - strokeWidth - padding;

    const innerVariablesStyle: React.CSSProperties = {
        "--radius": innerRadius,
        "--progress": innerProgress
    } as any;
    const outerVariablesStyle: React.CSSProperties = {
        "--radius": outerRadius,
        "--progress": outerProgress
    } as any;

    return <div style={style}>
        <svg
            className="progress-bar"
            viewBox={viewBox}
            style={{ transform: "rotate(-90deg)" }}
        >
            <defs>
                <linearGradient id={innerGradientId}>
                    <stop offset="0%" stopColor={innerGradient?.[0] ?? defaultColor} />
                    <stop offset="100%" stopColor={innerGradient?.[1] ?? defaultColor} />
                </linearGradient>
                <linearGradient id={outerGradientId}>
                    <stop offset="0%" stopColor={outerGradient?.[0] ?? defaultColor} />
                    <stop offset="100%" stopColor={outerGradient?.[1] ?? defaultColor} />
                </linearGradient>
            </defs>

            <circle style={{ ...outerVariablesStyle }}
                cx={cx}
                cy={cy}
                r={outerRadius}
                strokeWidth={strokeWidth}
                stroke={`url(#${outerGradientId}`}
            ></circle>

            <circle style={{ ...innerVariablesStyle, }}
                cx={cx}
                cy={cy}
                r={innerRadius}
                strokeWidth={strokeWidth}
                stroke={`url(#${innerGradientId}`}
            ></circle>
        </svg>
    </div>;
};