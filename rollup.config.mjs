import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH === "true";

const banner = `/*!
 * Multiroom MA Card
 * Carte Lovelace pour gérer, grouper et alimenter les enceintes Music Assistant.
 */`;

export default {
  input: "src/multiroom-ma-card.ts",
  output: { file: "dist/multiroom-ma-card.js", format: "es", sourcemap: dev, banner },
  plugins: [
    nodeResolve(),
    typescript(),
    // Sortie non minifiée et indentée : les noms et les lignes restent stables d'une version à
    // l'autre, ce qui permet de mettre à jour la ressource en n'envoyant que les lignes modifiées.
    !dev && terser({ mangle: false, compress: false, format: { beautify: true, comments: /^!/ } }),
  ],
};
