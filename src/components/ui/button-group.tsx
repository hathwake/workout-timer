import React from "react";
import "./button-group.css";

export type ButtonGroupProps = React.PropsWithChildren<{

}>

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const {
        children
    } = props;

    return <div className="ui-button-group">
        {children}
    </div>;
};