export const MODE = {
  PENCIL: "PENCIL",
  ERASER: "ERASER",
  TEXT: "TEXT",
  LINE: "LINE",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  CLEAR: "CLEAR",
};

export const COLORS = {
  BLACK: '#000000',
  RED: '#df322f',
  GREEN: '#309e44',
  CANVAS_BG: '#fff8dc',
  BLUE: '#0885ff',
  LAVENDER: '#6964db'
}

export const FILL_STYLE = {
  SOLID:'solid',
  ZIGZAG:'zigzag',
  CROSS_HATCH:'cross-hatch',
  HACHURE:'hachure',
  DOTS:'dots',
  DASHED:'dashed'
}

export const STROKE_STYLE_DASH = {
  NO_DASH:undefined,
  SMALL:[5,5],
  LARGE:[20,5],
}


export const PENCIL_DEFAULT_OPTION = {
  roughness: 0,
  bowing: 1,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};


export const ERASER_DEFAULT_OPTION = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.CANVAS_BG,
  strokeWidth: 10,
  strokeLineDash: undefined,
};

export const RECTANGLE_DEFAULT_OPTION = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};

export const LINE_DEFAULT_OPTION = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};

export const CIRCLE_DEFAULT_OPTION = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};
