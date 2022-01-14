//built-in from nodejs
import path from 'path';

// @rollup - 비교적 최신
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import alias from '@rollup/plugin-alias';
import strip from '@rollup/plugin-strip';

// rollup
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import postcss from 'postcss';
// import replace from 'rollup-plugin-replace';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-polyfill-node';

// external
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import { stubFalse } from 'lodash';
// import { strict } from 'assert';
// import { postcss } from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
			onwarn: (warning, handler) => {
				const { code, frame } = warning;
		
				// if (code === "anchor-is-valid" || code === "a11y-autofocus")
					// return;
		
				// if (code === "css-unused-selector" && frame.includes("shape"))
				// 	return;
				// if (code === "css-unused-selector")
				// 	return;				
		
				handler(warning);
			},
			preprocess: sveltePreprocess({
				scss: {
					prependData: '@import "src/scss/main.scss";',					
				},
				postcss: postcss({ 
					plugins: [ autoprefixer() ],
				}),
	
			})
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// replace({
		// 	values: {
		// 		'crypto.randomBytes': 'require("randombytes")',
		// 	}
		// }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		globals(),
		builtins(),
		
		alias({
			entries: [
				{ find: '~', replacement: path.resolve(__dirname, 'src/') }
			]
		}),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		production && strip({
			include: '**/*.(svelte|js)'
		}),
		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
