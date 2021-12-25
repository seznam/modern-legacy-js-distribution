const path = require('path');
const fs = require('fs');

const POLYFILL_FILE_EXTENSION = '.polyfills.js';
const staticRoot = path.join(__dirname, '../');
const polyfillRoot = path.resolve(__dirname, '../src/polyfills/');

const getPolyfills = (fileName) => {
	const polyfillFileName = fileName + POLYFILL_FILE_EXTENSION;
	const pathToPolyfill =
		'./' + path.relative(staticRoot, path.join(polyfillRoot, polyfillFileName));

	if (fs.existsSync(pathToPolyfill)) {
		return pathToPolyfill;
	}

	return null;
};

const composePolyfills = (filePath) => {
	const fileName = path.basename(filePath, '.js');
	const pathToPolyfill = getPolyfills(fileName);

	if (pathToPolyfill) {
		return [pathToPolyfill, filePath];
	}

	return filePath;
};

module.exports = { getPolyfills, composePolyfills };
