export interface Options {
  maxRandomnessOffset?: number;
  roughness?: number;
  bowing?: number;
  stroke?: string;
  strokeWidth?: number;
  curveFitting?: number;
  curveTightness?: number;
  curveStepCount?: number;
  fill?: string;
  fillStyle?: string;
  fillWeight?: number;
  hachureAngle?: number;
  hachureGap?: number;
  simplification?: number;
  dashOffset?: number;
  dashGap?: number;
  zigzagOffset?: number;
  seed?: number;
  strokeLineDash?: number[];
  strokeLineDashOffset?: number;
  fillLineDash?: number[];
  fillLineDashOffset?: number;
  disableMultiStroke?: boolean;
  disableMultiStrokeFill?: boolean;
  preserveVertices?: boolean;
  fixedDecimalPlaceDigits?: number;
  fillShapeRoughnessGain?: number;
}

export interface TextOption{
  fontFamily: string;
  fontSize: number;
  color: string;
  textAlign: 'start' | 'end' | 'left' | 'right' | 'center';
  bold: 'Bold' | '';
  italic : 'Italic' | '';
}