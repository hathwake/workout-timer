import React from "react";
import "./timer-action-button.css";

export interface TimerActionButtonProps {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: "small" | "default" | "large";
}

export const TimerActionButton: React.FC<React.PropsWithChildren<TimerActionButtonProps>> = (props) => {
    const {
        children,
        disabled,
        onClick,
        size
    } = props;

    const classes: string[] = [
        "timer-action-btn"
    ];

    switch(size) {
        case "small":
            classes.push("small");
            break;
        case "large":
            classes.push("large");
            break;
    }

    return <button className={classes.join(" ")} disabled={disabled} onClick={onClick}>
        {children}
    </button>;
};
