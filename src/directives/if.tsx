import React from "react";


export const reactIf = (condition: boolean | null | undefined, node: React.ReactNode, elseNode?: React.ReactNode) => {
    if(condition) {
        return node;
    } else {
        return elseNode ?? <></>;
    }
};
