import houseDataRaw from '../content/houseData.json';

export interface FloorHeights {
  SAN: number; // -450
  T1: number;  // 0
  T2: number;  // 3600
  T3: number;  // 7000
  ST: number;  // 10400
  TUM: number; // 13400
}

export interface RectCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DoorDef {
  ma: string;
  hcn: [number, number, number, number];
  doc_x: boolean;
}

export interface DoorSpec {
  ten: string;
  rong: number;
  cao: number;
  be: number;
  so_luong: number;
}

export interface HouseDataSchema {
  nguon: string;
  don_vi: string;
  cao_do: FloorHeights;
  cua: Record<string, DoorSpec>;
  thong_so: Record<string, number>;
  vat_lieu: string[];
  mat_bang: {
    T1: any;
    T2: any;
    T3: any;
    MAI: any;
  };
}

export const houseData: HouseDataSchema = houseDataRaw as unknown as HouseDataSchema;

/**
 * Scale factor: 1 mm in CAD = 0.001 units (1 unit = 1 meter in Three.js)
 */
export const SCALE = 0.001;

/**
 * Calculate floor elevations in meters and heights in meters
 */
export function getFloorMetrics() {
  const cd = houseData.cao_do;
  return {
    T1: {
      baseElevation: cd.T1 * SCALE, // 0.0m
      height: (cd.T2 - cd.T1) * SCALE, // 3.6m (3600mm)
      targetElevation: cd.T2 * SCALE,
    },
    T2: {
      baseElevation: cd.T2 * SCALE, // 3.6m
      height: (cd.T3 - cd.T2) * SCALE, // 3.4m (3400mm)
      targetElevation: cd.T3 * SCALE,
    },
    T3: {
      baseElevation: cd.T3 * SCALE, // 7.0m
      height: (cd.ST - cd.T3) * SCALE, // 3.4m (3400mm)
      targetElevation: cd.ST * SCALE,
    },
    MAI: {
      baseElevation: cd.ST * SCALE, // 10.4m
      height: (cd.TUM - cd.ST) * SCALE, // 3.0m (3000mm)
      targetElevation: cd.TUM * SCALE,
    },
  };
}

/**
 * Utility to parse [x1, y1, x2, y2] into Three.js box dimensions and center position.
 * Three.js coordinate system:
 * X = CAD X
 * Y = Elevation (Z in CAD)
 * Z = CAD Y (inverted or mapped directly)
 */
export function rectToBoxProps(
  rect: [number, number, number, number],
  yElevation: number,
  height: number,
  centerOffsetX: number = 2.5,
  centerOffsetZ: number = 7.0
) {
  const [cadX1, cadY1, cadX2, cadY2] = rect;

  const width = Math.abs(cadX2 - cadX1) * SCALE;
  const depth = Math.abs(cadY2 - cadY1) * SCALE;
  const h = height;

  const minX = Math.min(cadX1, cadX2) * SCALE;
  const minZ = Math.min(cadY1, cadY2) * SCALE;

  // Center coordinate of box
  const posX = minX + width / 2 - centerOffsetX;
  const posY = yElevation + h / 2;
  const posZ = minZ + depth / 2 - centerOffsetZ;

  return {
    width: Math.max(0.02, width),
    height: Math.max(0.02, h),
    depth: Math.max(0.02, depth),
    position: [posX, posY, posZ] as [number, number, number],
  };
}
