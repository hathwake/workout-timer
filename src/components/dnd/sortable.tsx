import {
    DndContext,
    useSensor,
    useSensors,
    TouchSensor,
    MouseSensor,

} from "@dnd-kit/core";
import {
    restrictToVerticalAxis
} from "@dnd-kit/modifiers";
import {
    SortableContext,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export const SortableItem: React.FC<React.PropsWithChildren<{
    item: any
}>> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.item });



    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}
            {...listeners}
        >
            {props.children}
        </div>
    );
};

export const Sortable: React.FC<{
    items: any[],
    genContent: (item: any, index: any) => React.ReactNode
}> = ({ items, genContent }) => {

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(MouseSensor),
    );

    const modifiers = [
        restrictToVerticalAxis
    ];

    return <DndContext sensors={sensors} modifiers={modifiers}>
        <SortableContext items={items}>
            {items.map((item, index) => {
                return <SortableItem key={index} item={item}>
                    {genContent(item, index)}
                </SortableItem>;
            })}
        </SortableContext>
    </DndContext>;
};
