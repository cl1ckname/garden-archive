

export function getComplexRoots(n: number) {
	const rot = 2*Math.PI / n;
	const roots = []
	let phi = Math.PI * 0.3
	for (let i = 0; i < n; i++) {
		roots.push(phi)
		phi += rot
	}
	return roots
}