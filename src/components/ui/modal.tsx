import React, { useEffect, useRef } from "react";
import { reactIf } from "../../directives/if";

import "./modal.css";

export type ModalProps = React.PropsWithChildren<{
    open?: boolean;
    width?: string;
    onClose?: VoidFunction;
    title?: React.ReactNode;
}>

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        open,
        children,
        onClose,
        width,
        title,
    } = props;

    const dialogRef = useRef<HTMLDialogElement>(null);

    const currentDialog = dialogRef.current;

    useEffect(() => {
        if (currentDialog) {
            if (open) {
                currentDialog.showModal();
            } else {
                currentDialog.close();
            }
        }
    }, [open, currentDialog]);

    return <dialog
        ref={dialogRef}
        className="ui-modal"
        style={{width: width}}
        onClose={onClose}
    >
        {reactIf(title !== undefined, 
            <h1 className="ui-modal-title">
                {title}
            </h1>
        )}
        {children}
    </dialog>;
};
