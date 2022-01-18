"use strict";
import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';

export default { 
    input: "src/main.js",
      output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true
    },
    plugins: [
        clear({ targets: ["dist"] }),
        commonjs(),
      ]
}