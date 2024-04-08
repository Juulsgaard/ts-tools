import {dts} from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const external = [];

export default [
	{
		input: 'src/index.ts',
		external,
		output: {
			dir: 'dist',
			format: "esm",
			preserveModules: true,
		},
		plugins: [esbuild()]
	},
	{
		input: 'src/index.ts',
		external,
		plugins: [dts()],
		output: {
			file: 'dist/index.d.ts'
		}
	}
]
