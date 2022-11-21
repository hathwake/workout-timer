import React, { ButtonHTMLAttributes, DOMAttributes } from "react";
import { reactIf } from "../../directives/if";

import "./button.css";

export type ButtonProps = React.PropsWithChildren<{
    htmlType?: ButtonHTMLAttributes<any>["type"],
    block?: boolean;
    danger?: boolean;
    onClick?: DOMAttributes<any>["onClick"];
    type?: "primary" | "link" | "action";
    icon?: React.ReactNode;
    disabled?: boolean;
    height?: string;
}>

export const Button: React.FC<ButtonProps> = (props) => {
    let {
        children,
        htmlType,
        block,
        danger,
        type,
        onClick,
        icon,
        disabled,
        height
    } = props;

    const classes = [
        "ui-button"
    ];

    if(block) {
        classes.push("ui-button-block");
    }
    if(danger) {
        classes.push("ui-button-danger");
    }
    if(type === "primary") {
        classes.push("ui-button-primary");
    } else if(type === "link") {
        classes.push("ui-button-link");
    } else if(type === "action") {
        classes.push("ui-button-action");
    }

    if(type === "link" && height === undefined) {
        height = "24px";
    }

    const cssVariables: React.CSSProperties = {
        "--btn-height": height
    } as any;

    return <button
        disabled={disabled}
        type={htmlType ?? "button"}
        className={classes.join(" ")}
        style={{...cssVariables}}

        onClick={onClick}
    >
        {reactIf(icon !== undefined,
            <span className="ui-button-icon">
                {icon}
            </span>
        )}
        {children}
    </button>;
};