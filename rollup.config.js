import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
	resolve(),
	json(),
	commonjs({
		include: /node_modules/,
	}),
	typescript({ tsconfig: './tsconfig.json' }),
	babel({ babelHelpers: 'bundled' }),
	production && terser(),
];

const pkg = require('./package.json');
const libraryName = pkg.name;

export default {
	input: 'src/main.ts',
	output: [
		{
			file: `dist/${libraryName}.ems.js`,
			format: 'esm',
			name: libraryName,
			sourcemap: true,
		},
		{
			file: `dist/${libraryName}.umd.js`,
			format: 'umd',
			name: libraryName,
			sourcemap: true,
		},
	],
	plugins,
};
