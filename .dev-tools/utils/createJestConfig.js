'use strict';

const paths = require('../config/paths');
const packageData = require(paths.appPackageJson);

const globals = {
	__VERSION__: packageData.version,
};
const moduleDirectories = ['node_modules'].concat(packageData.moduleRoots);


module.exports = (resolve, rootDir) => {
	const config = {
		collectCoverageFrom: ['src/**/*.{js,jsx}'],
		coverageDirectory: paths.coverageDirectory,
		testPathIgnorePatterns: [
			'<rootDir>[/\\\\](build|docs|node_modules|scripts|.dev-tools)[/\\\\]',
		],
		testURL: 'http://localhost',
		testRegex: 'src/.*\\.test\\.jsx?$',
		moduleDirectories,
		moduleNameMapper: {
			'^.+\\.(p?css|less|scss)$': resolve('config/jest/cssTransform.js'),
			'^.+\\.(gif|ttf|eot|svg)$': resolve('config/jest/fileTransform.js'),
		},
		// to match Webpack aliases
		// moduleNameMapper: {},
		globals,
	};

	if (rootDir) {
		config.rootDir = rootDir;
	}

	return config;
};
