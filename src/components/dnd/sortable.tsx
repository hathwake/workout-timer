import {
    DndContext,
    useSensor,
    useSensors,
    TouchSensor,
    MouseSensor,
    DragEndEvent,
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
import {MenuOutlined} from "@ant-design/icons";


export type SortableContentFunc = (params: {item: any, index: any, dragHandle: any}) => React.ReactNode;

export type SortableMoveFunc = (from: number, to: number) => void;

export const SortableItem: React.FC<{
    item: any,
    genContent: (dragHandle: any) => React.ReactNode
}> = (props) => {
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

    const dragHandle = <span {...listeners} {...attributes} style={{cursor: "move"}}>
        <MenuOutlined />
    </span>;

    return (
        <div ref={setNodeRef} style={style}>
            {props.genContent(dragHandle)}
        </div>
    );
};

export const Sortable: React.FC<{
    items: any[],
    genContent: SortableContentFunc,
    onMove: SortableMoveFunc,
    onDragStart?: () => void,
}> = ({ items, genContent, onMove, onDragStart }) => {

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(MouseSensor),
    );

    const modifiers = [
        restrictToVerticalAxis
    ];

    const handleDragEnd = (e: DragEndEvent) => {
        const {active, over} = e;

        if(over) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);

            onMove(oldIndex, newIndex);
        }
    };

    return <DndContext sensors={sensors} modifiers={modifiers} onDragStart={onDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={items}>
            {items.map((item, index) => {
                const genContentForIndex = (dragHandle: any) => {
                    return genContent({item, index, dragHandle});
                };
                return <SortableItem key={index} item={item} genContent={genContentForIndex}/>;
            })}
        </SortableContext>
    </DndContext>;
};
