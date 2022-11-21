import React, { useState } from "react";
import { reactIf } from "../../directives/if";
import "./theme-switch.css";

export type ThemeState = "dark" | "light";

export type ThemeSwitchProps = React.PropsWithChildren<{
    state: ThemeState;
    onStateChange?: (state: ThemeState) => void;
}>

export const ThemeSwitch: React.FC<ThemeSwitchProps> = (props) => {
    const {
        state,
        onStateChange,
        children,
    } = props;

    const displayState: ThemeState = state === "dark" ? "light" : "dark";

    return <button
        className="ui-theme-switch"
        onClick={() => onStateChange?.(state === "dark" ? "light" : "dark")}
        data-state={displayState}
    >
        <svg xmlns="http://www.w3.org/2000/svg"
            // width="24"
            // height="24"
            viewBox="-3 -3 30 30"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ui-theme-switch"
        >
            <mask id="moon-mask">
                <circle cx="12" cy="12" r="12" fill="white"></circle>
                <circle className="moon-cutout" cx="18" cy="12" r="8" fill="black"></circle>
            </mask>

            <circle className="sun" cx="12" cy="12" r={displayState === "dark" ? 12 : 5} mask="url(#moon-mask)"></circle>

            <g className="sun-beams">
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </g>
        </svg>

        {children}
    </button>;
};
