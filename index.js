export default function decircular(object) {
	const seenObjects = new WeakMap();

	function internalDecircular(value, path = []) {
		if (!(value !== null && typeof value === 'object')) {
			return value;
		}

		const existingPath = seenObjects.get(value);
		if (existingPath) {
			return `[Circular *${existingPath.join('.')}]`;
		}

		seenObjects.set(value, path);

		const newValue = Array.isArray(value) ? [] : {};

		for (const [key2, value2] of Object.entries(value)) {
			newValue[key2] = internalDecircular(value2, [...path, key2]);
		}

		seenObjects.delete(value);

		return newValue;
	}

	return internalDecircular(object);
}
