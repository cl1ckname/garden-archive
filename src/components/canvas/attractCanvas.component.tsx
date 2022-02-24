import { Sprite, Stage } from "@inlet/react-pixi"
import { Viewport as PixiViewport } from "pixi-viewport"
import * as PIXI from "pixi.js"
import { Dispatch, SetStateAction } from "react"
import { Attract } from "../geometric/attract.component"
import Viewport from "../viewport.component"
import circle from './circle.png'

interface Draggable extends PIXI.DisplayObject {
    data: PIXI.InteractionData | null;
    dragging: boolean;
}

export interface AttractDrawProps {
    points: {x: number, y: number}[]
    iters: number,
    colorFunction: number,
    ratio: number,
    points_number: number
}

export interface AttractCanvasProps {
    attractDrawProps: AttractDrawProps
    setAttractProps: Dispatch<SetStateAction<AttractDrawProps>>
}

export const AttractCanvas: React.FC<AttractCanvasProps> = (props: AttractCanvasProps) => {
    const onDragStart = (event: PIXI.InteractionEvent, ind: number) => {
        const sprite = event.currentTarget as Draggable;
        const vp = sprite.parent as PixiViewport
        sprite.alpha = 0.5;
        sprite.data = event.data;
        sprite.dragging = true;
        vp.drag({ pressDrag: false})
    };
    const onDragEnd = (event: PIXI.InteractionEvent, ind: number) => {
        const sprite = event.currentTarget as Draggable;
        const propsCopy = Object.assign({}, props.attractDrawProps)
        const vp = sprite.parent as PixiViewport
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.data = null;
        propsCopy.points[ind].x = event.data.global.x
        propsCopy.points[ind].y = event.data.global.y
        props.setAttractProps(propsCopy)
        vp.drag()
    };

    const onDragMove = (event: PIXI.InteractionEvent, ind: number) => {
        const sprite = event.currentTarget as Draggable;
        if (sprite.dragging) {
            const newPosition = sprite.data!.getLocalPosition(sprite.parent);
            sprite.x = newPosition.x;
            sprite.y = newPosition.y;
        }
    };
    return <Stage options={{ backgroundAlpha: 0 }}
        width={window.innerWidth * 1.5}
        height={window.innerHeight * 1.5}>
        <Viewport width={window.innerWidth} height={window.innerHeight}>
            {props.attractDrawProps.points.map((p, ind) => <Sprite image={circle}
                x={p.x} y={p.y}
                scale={{ x: 0.1, y: 0.1 }}
                interactive
                buttonMode
                pointerdown={(event) => onDragStart(event, ind)}
                pointerup={(event) => onDragEnd(event, ind)}
                pointerupoutside={(event) => onDragEnd(event, ind)}
                pointermove={(event) => onDragMove(event, ind)} />)}
            <Attract drawParams={props.attractDrawProps}/>
        </Viewport>
    </Stage>
}