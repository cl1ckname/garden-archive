export const MandelbrotSet = `
precision highp float;

uniform vec2 resol;
uniform float scale;
uniform float xx;
uniform float yy;

uniform int colors[12];

vec3 hex2rgb(int h) {
	float rIntValue = mod(float(h / 256 / 256), 256.) / 255.;
	float gIntValue = mod(float(h / 256      ), 256.) / 255.;
	float bIntValue = mod(float(h            ), 256.) / 255.;
	return vec3(rIntValue, gIntValue, bIntValue);
}

vec2 cmul(vec2 x, vec2 y) {
	return vec2(x.x * y.x - x.y * y.y, x.x * y.y + x.y * y.x);
}

const int max_iters = 2000;

void main( void ) {
	float escale = exp(scale);
	vec2 c = ( gl_FragCoord.xy / resol.xy ) * escale * 2.;
	c.x -= escale - xx;
	c.y -= escale + yy;
	c.x = c.x*(resol.x / resol.y);
	vec3 color = vec3(0.0, 1., 0.);
	
	vec2 zi = vec2(0.);	
	
	int mi;
	for (int i = 0; i < max_iters; i++) {
		if (zi.x*zi.x + zi.y*zi.y >= 4. / escale) {break;}
		zi = cmul(zi, zi) + c;
		mi = i;
	}

	int colorInd = int(float(mi) * 10. / float(max_iters));
	if (mi == max_iters) {color = vec3(1.);}
	for (int i = 0; i < 12; i++) {
		if (i == colorInd) {
			color = hex2rgb(colors[i]);
			break;
		}
	}
	// color = vec3(float(mi) / float(max_iters));
	// if (c.x  < 0.2 && c.x > -0.2 && c.y < 0.2 * escale && c.y > -0.2 * escale) {color = vec3(1., 0, 0);}
	gl_FragColor = vec4( color, 1.0 );
}
`