import { Graphics } from "@inlet/react-pixi";
import * as Pixi from "pixi.js";
import { useCallback } from "react";
import { ColorCollection } from "../../services/colorFunctionCollection";
import { getComplexRoots } from "../../services/complexAlgebra";
import { PoolProps } from "../canvas/poolCanvas.component";
import { PoolShader } from "./shaders/NewtonPool";

export const Pool: React.FC<PoolProps> = (props: PoolProps) => {
	const n = props.n
	const roots = getComplexRoots(n, props.angle)
	const colors = getColorList(props);
    const uniforms = {
        resol: [window.innerWidth, window.innerHeight],
        v: 1,
        n: n,
        scale: props.scale,
		roots: roots,
		max_its: props.iters,
		colors,
		xx: props.x,
		yy: props.y,
    };
    const draw = useCallback((g) => {
        const shad = new Pixi.Filter(undefined, PoolShader, uniforms);
        g.clear();
        g.drawRect(0, 0, window.innerWidth, window.innerHeight);
        g.filters = [shad];
    }, [props]);
    return <Graphics draw={draw} />;
};

function getColorList(props: PoolProps) {
	const colorF = ColorCollection[props.colorFunc].func;
	const colors = [];
	for (let i = 0; i < props.n; i++) {
		colors.push(colorF("primary", i, props.n));
	}
	return colors;
}

