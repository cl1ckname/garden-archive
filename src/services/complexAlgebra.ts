

export function getComplexRoots(n: number, margin: number = 0) {
	const rot = 2*Math.PI / n;
	const roots = []
	let phi = margin
	for (let i = 0; i < n; i++) {
		roots.push(phi)
		phi += rot
	}
	return roots
}