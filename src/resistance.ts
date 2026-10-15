export interface Layer { thicknessMetres: number; conductivityWattsPerMetreKelvin: number; }
/** Series conduction only; excludes surface films, cavities, and thermal bridges. */
export function thermalResistance(layers: readonly Layer[]): number {
  if (layers.length === 0) throw new RangeError("At least one layer is required");
  let total = 0;
  for (const layer of layers) {
    if (!Number.isFinite(layer.thicknessMetres) || layer.thicknessMetres <= 0 ||
        !Number.isFinite(layer.conductivityWattsPerMetreKelvin) || layer.conductivityWattsPerMetreKelvin <= 0)
      throw new RangeError("Thickness and conductivity must be finite and positive");
    const resistance = layer.thicknessMetres / layer.conductivityWattsPerMetreKelvin;
    if (!Number.isFinite(resistance))
      throw new RangeError("Layer resistance must be finite");
    total += resistance;
    if (!Number.isFinite(total))
      throw new RangeError("Total resistance must be finite");
  }
  return total;
}
