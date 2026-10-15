import test from "node:test";
import assert from "node:assert/strict";
import { thermalResistance } from "../dist/resistance.js";
test("series layers use thickness divided by conductivity", () => {
 const layers = [{thicknessMetres:0.1,conductivityWattsPerMetreKelvin:0.04},{thicknessMetres:0.02,conductivityWattsPerMetreKelvin:0.2}];
 assert.equal(thermalResistance(layers),2.6);
 assert.equal(layers[0].thicknessMetres,0.1);
});
test("reject invalid dimensions and empty assemblies", () => {
 assert.throws(()=>thermalResistance([]),RangeError);
 for (const value of [0,-1,NaN,Infinity]) {
  assert.throws(()=>thermalResistance([{thicknessMetres:value,conductivityWattsPerMetreKelvin:0.1}]),RangeError);
  assert.throws(()=>thermalResistance([{thicknessMetres:0.1,conductivityWattsPerMetreKelvin:value}]),RangeError);
 }
});
