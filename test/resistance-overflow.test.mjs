import test from "node:test";
import assert from "node:assert/strict";
import { thermalResistance } from "../dist/resistance.js";

test("rejects an individual resistance that overflows", () => {
  assert.throws(() => thermalResistance([
    { thicknessMetres: 1e308, conductivityWattsPerMetreKelvin: 1e-308 },
  ]), RangeError);
});

test("rejects accumulated resistance that overflows", () => {
  assert.throws(() => thermalResistance([
    { thicknessMetres: 1e308, conductivityWattsPerMetreKelvin: 1 },
    { thicknessMetres: 1e308, conductivityWattsPerMetreKelvin: 1 },
  ]), RangeError);
});
