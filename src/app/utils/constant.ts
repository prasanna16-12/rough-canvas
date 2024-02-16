import { Options, TextOption } from "./typings";

export const MODE = {
  PENCIL: "PENCIL",
  ERASER: "ERASER",
  TEXT: "TEXT",
  LINE: "LINE",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  CLEAR: "CLEAR",
  SELECT: "SELECT",
};

export const COLORS = {
  BLACK: "#000000",
  RED: "#df322f",
  GREEN: "#309e44",
  CANVAS_BG: "#fff8dc",
  BLUE: "#0885ff",
  LAVENDER: "#6964db",
};

export const FONTS = {
  HELVETICA_SANS_SERIF: "Helvetica",
  ARIAL_SANS_SERIF: "Arial",
  ARIAL_BLACK_SANS_SERIF: "Arial Black",
  VERDANA_SANS_SERIF: "Verdana",
  TAHOMA_SANS_SERIF: "Tahoma",
  TREBUCHET_M_S_SANS_SERIF: "Trebuchet MS",
  IMPACT_SANS_SERIF: "Impact",
  GILL_SANS_SANS_SERIF: "Gill Sans",
  TIMES_NEW_ROMAN_SERIF: "Times New Roman",
  GEORGIA_SERIF: "Georgia",
  PALATINO_SERIF: "Palatino",
  BASKERVILLE_SERIF: "Baskerville",
  ANDAL_MONO_MONOSPACE: "Andalé Mono",
  COURIER_MONOSPACE: "Courier",
  LUCIDA_MONOSPACE: "Lucida",
  MONACO_MONOSPACE: "Monaco",
  BRADLEY_HAND_CURSIVE: "Bradley Hand",
  BRUSH_SCRIPT_M_T_CURSIVE: "Brush Script MT",
  LUMINARI_FANTASY: "Luminari",
  COMIC_SANS_M_S_CURSIVE: "Comic Sans MS",
};

export const TEXT_STYLE = {
  BOLD: 'bold',
  italic: 'italic'

}

export const TEXT_OPTIONS: TextOption = {
  fontFamily: FONTS.HELVETICA_SANS_SERIF,
  fontSize: 32,
  color: COLORS.BLACK,
  textAlign: "start",
  bold: '',
  italic: '',  
}

export const FILL_STYLE = {
  SOLID: "solid",
  ZIGZAG: "zigzag",
  CROSS_HATCH: "cross-hatch",
  HACHURE: "hachure",
  DOTS: "dots",
  DASHED: "dashed",
};

export const STROKE_STYLE_DASH = {
  NO_DASH: undefined,
  SMALL: [5, 5],
  LARGE: [20, 5],
};

export const PENCIL_DEFAULT_OPTION: Options = {
  roughness: 0,
  bowing: 1,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};

export const ERASER_DEFAULT_OPTION: Options = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.CANVAS_BG,
  strokeWidth: 10,
  strokeLineDash: undefined,
};

export const RECTANGLE_DEFAULT_OPTION: Options = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};

export const LINE_DEFAULT_OPTION: Options = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};

export const CIRCLE_DEFAULT_OPTION: Options = {
  roughness: 0,
  bowing: 0,
  stroke: COLORS.BLACK,
  fill: undefined,
  strokeWidth: 1,
  strokeLineDash: undefined,
};
