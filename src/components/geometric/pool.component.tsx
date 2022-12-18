import { Graphics } from "@inlet/react-pixi";
import * as Pixi from "pixi.js";
import { useCallback } from "react";
import { getComplexRoots } from "../../services/complexAlgebra";

export const Pool: React.FC = () => {
    const mesh = `
	

	precision highp float;

	uniform vec2 resol;
	uniform float v;
	uniform int n;
	uniform float scale;
	uniform float roots[12];

	const int MAX_ITS = 80;

	vec2 cmul(vec2 x, vec2 y) {
		return vec2(x.x * y.x - x.y * y.y, x.x * y.y + x.y * y.x);
	}

	vec2 cdiv(vec2 x, vec2 y) {
		float d = (y.x * y.x + y.y * y.y);
		return vec2((x.x * y.x + x.y * y.y) / d, (y.x * x.y - x.x * y.y) / d);
		
	}

	vec2 cpow(vec2 x, int p) {
		vec2 res = vec2(1, 0);
		for (int i = 0; i <= MAX_ITS; i++) {
			if (i == p) {break;}
			res = cmul(res, x);
		}
		return res;
	}

	vec2 transform(float phi) {
		return vec2(cos(phi), sin(phi));
	}

	float cdist(vec2 x, vec2 y) {
		return (x.x - y.x) * (x.x - y.x) + (x.y - y.y) * (x.y - y.y);
	}

	void main( void ) {

	vec2 pos = ( gl_FragCoord.xy / resol.xy) * scale * 2.0;
	pos.x = pos.x - scale;
	pos.y = pos.y - scale;
	pos.x = pos.x*(resol.x / resol.y);
	
	vec3 color = vec3(1.0);
	
	vec2 zi = pos;
	for (int i = 0; i < MAX_ITS; i++) {
		zi = zi - cdiv(cpow(zi, n) - vec2(1), float(n) * cpow(zi, n-1));
	}
	color = vec3(length(zi));

	int mi = 1;
	float md =  cdist(transform(roots[1]), pos);
	for (int i = 0; i < MAX_ITS; i++) {
		if (i == n) { break; }

		vec2 point = transform(roots[i]);

		float dst = cdist(point, zi);
		if (dst <= md) {
			md = dst;
			mi = i;
		}
	}

	color = vec3(float(mi) * 0.3);

	for (int i = 0; i < MAX_ITS; i++) {
		if (i == n) { break; }
		vec2 point = transform(roots[i]);

		if (cdist(pos, point) < 0.01) {
			color = vec3(1., 0., 0.);
		}
	}

	// float d = cdist(pos, vec2(0.));
	// if (d >= 0.99 && d <= 1.01 ) { color = vec3(1.);}


	gl_FragColor = vec4(color, v);

	}
	`;
	const n = 3
	const roots = getComplexRoots(n)
	console.log(roots)
    const uniforms = {
        resol: [window.innerWidth, window.innerHeight],
        v: 1,
        n: n,
        scale: 2,
		roots: roots
    };
    const draw = useCallback((g) => {
        const shad = new Pixi.Filter(undefined, mesh, uniforms);
        g.clear();
        g.drawRect(0, 0, window.innerWidth, window.innerHeight);
        g.filters = [shad];
    }, []);
    return <Graphics draw={draw} />;
};
