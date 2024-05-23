/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { ChangeEvent, RefObject, createElement, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CIRCLE_DEFAULT_OPTION, COLORS, ERASER_DEFAULT_OPTION, FONTS, LINE_DEFAULT_OPTION, MODE, PENCIL_DEFAULT_OPTION, RECTANGLE_DEFAULT_OPTION, TEXT_OPTIONS } from '../utils/constant';
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs";
import { Drawable, Options } from "roughjs/bin/core";
import { calcAngleDegrees, getDistance } from "../utils/common";
import { TextOption } from "../utils/typings";
const CanvasContext = React.createContext({});

export const CanvasProvider = ({ children }: any) => {
  const [elements, setElements] = useState<any[]>([]);
  const [isCursorMoving, setIsCursorMoving] = useState<Boolean>(false)
  const [mode, setMode] = useState<string>(MODE.PENCIL)
  const canvasRef: any = useRef<HTMLCanvasElement>(null);
  const textAreaRef: any = useRef<HTMLTextAreaElement>(null);
  const [canvasXY, setCanvasXY] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const contextRef: any = useRef<CanvasRenderingContext2D>(null);
  const roughCanvasRef: any = useRef<RoughCanvas>(null)
  const generator = rough.generator();
  const [points, setPoints] = useState<any[]>([])
  const [keyPress, setKeyPress] = useState<string | null>(null)
  const [pencilOption, setPencilOption] = useState<Options>(PENCIL_DEFAULT_OPTION);
  const [eraserOption, setEraserOption] = useState<Options>(ERASER_DEFAULT_OPTION);
  const [circleOption, setCircleOption] = useState<Options>(CIRCLE_DEFAULT_OPTION);
  const [rectangleOption, setRectangleOption] = useState<Options>(RECTANGLE_DEFAULT_OPTION);
  const [lineOption, setLineOption] = useState<Options>(LINE_DEFAULT_OPTION);
  const [writing, setWriting] = useState<boolean>(false)
  const [textOption, setTextOption] = useState<TextOption>(TEXT_OPTIONS);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (writing) {
      setTimeout(() => {
        textArea.focus();
      }, 0);
    }
  }, [writing]);

  useEffect(() => {
    clearCanvas()

    if (elements && elements.length > 0) {
      elements.forEach((element) => {
        if (element.mode === MODE.TEXT) {
          drawText(element.x1, element.y1, element.roughElement)

        }
        else {
          roughCanvasRef.current.draw(element.roughElement)

        }
      });
    }
  }, [elements]);

  const updateElement = (e: ChangeEvent<HTMLCanvasElement>) => {
    console.log(e);

  }


  const createElement = (x1: number, y1: number, x2: number, y2: number, prevElement: Drawable | null) => {
    let roughElement: Drawable | null = null;


    if (mode === MODE.PENCIL || mode === MODE.ERASER) {
      setPoints(prevState => {
        return [...prevState, [x2, y2]]
      })
      roughElement = generator.curve(points, mode === MODE.PENCIL ? pencilOption : eraserOption);
      return {
        x1, y1, x2, y2, mode, roughElement, bound: {
          x1: null,
          y1: null,
          x2: null,
          y2: null,
        }
      }

    }

    if (mode === MODE.LINE) {
      if (keyPress === "ShiftLeft") {
        console.log(calcAngleDegrees(x1, y1, x2, y2));
        roughElement = generator.line(x1, y1, x2, y2, lineOption);
      }
      else {
        roughElement = generator.line(x1, y1, x2, y2, lineOption);
      }
      return {
        x1, y1, x2, y2, mode, roughElement, bound: {
          x1: null,
          y1: null,
          x2: null,
          y2: null,
        }
      }


    }

    if (mode === MODE.RECTANGLE) {
      if (keyPress === "ShiftLeft") {
        let width = x2 - x1 > y2 - y1 ? x2 - x1 : y2 - y1;
        roughElement = generator.rectangle(x1, y1, width, width, rectangleOption);
      }

      else {
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, rectangleOption);
      }
      return {
        x1, y1, x2, y2, mode, roughElement,
        bound: {
          x1: null,
          y1: null,
          x2: null,
          y2: null,
        }

      }
    }

    if (mode === MODE.CIRCLE) {
      if (keyPress === "ShiftLeft") {
        let diameter = getDistance(x1, y1, x2, y2);
        roughElement = generator.circle((x1 + x2) / 2, (y1 + y2) / 2, diameter, circleOption);
      }
      else {
        roughElement = generator.ellipse((x1 + x2) / 2, (y1 + y2) / 2, Math.abs(x2 - x1) * 2, Math.abs(y2 - y1) * 2, circleOption);
      }
      return {
        x1, y1, x2, y2, mode, roughElement, bound: {
          x1: null,
          y1: null,
          x2: null,
          y2: null,
        }
      }


    }
  }

  const prepareCanvas = () => {
    const canvas: HTMLCanvasElement = canvasRef.current
    document.addEventListener('keydown', ((e: KeyboardEvent) => {
      //console.log(e);
      setKeyPress(e.code)
    }));

    document.addEventListener('keyup', () => setKeyPress(null))

    const context: CanvasRenderingContext2D | null = canvas?.getContext("2d")
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    const roughCanvas: RoughCanvas = rough.canvas(canvas);
    roughCanvasRef.current = roughCanvas;

    context?.scale(devicePixelRatio, devicePixelRatio);
    contextRef.current = context;
  };

  const createTextElement = (text: string) => {

    const { x, y } = canvasXY;
    const textMeasure = contextRef.current.measureText(text)
    let options = {
      text: text,
      font: `${textOption.italic} ${textOption.bold} ${textOption.fontSize}px  ${textOption.fontFamily}`,
      textAlign: textOption.textAlign,
      textBaseline: "top",
      fillStyle: textOption.color,
      ...textMeasure
    }

    return {
      x1: x,
      y1: y,
      x2: textAreaRef.current.style.width + x,
      y2: textAreaRef.current.style.height + y,
      mode: MODE.TEXT,
      roughElement: options,
      bound: {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
      }
    }
  }
  const texthandleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
      textAreaRef.current.style.width = "auto";
      textAreaRef.current.style.width = `${e.target.scrollWidth + 16}px`;

    }
  }


  const textInputFocusChange = (e: MouseEvent) => {

    const id: string = (e.relatedTarget as any).id;
    if (['Font family', 'rangeInp', 'Color', 'expand', 'Text style'].includes(id)) {
      textAreaRef.current.focus();
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.width = "auto";
      return;
    }
    const element = createTextElement(textAreaRef.current.value)
    setElements((prevState) => [...prevState, element]);
    setMode(MODE.PENCIL)
  }

  const drawText = (x: number, y: number, options: any) => {

    contextRef.current.font = options.font;
    contextRef.current.fillStyle = options.fillStyle;
    contextRef.current.textAlign = options.textAlign;
    contextRef.current.textBaseline = options.textBaseline;
    const splitTexts = (options.text as string).split('\n');
    const topOffset: number = 0; //Number.parseInt(options.font)/8;

    let _y = y
    splitTexts.forEach((text, i) => {
      contextRef.current.fillText(text, x, _y + topOffset);
      _y = _y + (textOption.fontSize * 1.2);
    });
  }

  const mouseDown = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;



    if (mode === MODE.TEXT && !writing) {
      setCanvasXY({ x: offsetX, y: offsetY })
      setWriting(true)
      return;
    }
    else if (mode === MODE.TEXT && writing) {
      //console.log(textAreaRef.current.style);
      const element = createTextElement(textAreaRef.current.value)
      setElements((prevState) => [...prevState, element]);
      setMode(MODE.PENCIL)
      setWriting(false)
      return;
    }
    setCanvasXY({ x: offsetX, y: offsetY })
    setIsCursorMoving(true);
    const element = createElement(offsetX, offsetY, offsetX, offsetY, null);
    setElements((prevState) => [...prevState, element])

  };

  const mouseMove = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isCursorMoving) {
      return;
    }

    const index = elements.length - 1
    const { x1, y1 } = elements[index]
    const updatedElement = createElement(x1, y1, offsetX, offsetY, elements[index].roughElement);
    const elementsCopy = [...elements]
    elementsCopy[index] = updatedElement
    setElements(elementsCopy)
    return
  };



  const mouseReleas = () => {
    setIsCursorMoving(false);
    const index = elements.length - 1
    let lastElement = elements[index]
    //console.log(lastElement);
    //elements.push(lastElement)

    if (mode === MODE.PENCIL || mode === MODE.ERASER) {
      setPoints([])
    }
  };

  const hardClearCanvas = () => {
    setMode(MODE.PENCIL)
    setElements([])
    clearCanvas()
    canvasRef.current.style.cursor = 'crosshair'

  }

  const clearCanvas = () => {
    contextRef.current.fillStyle = "cornsilk"
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

  }

  const eraser = () => {
    setMode(MODE.ERASER)
  }

  const pencil = () => {
    setMode(MODE.PENCIL)
    canvasRef.current.style.cursor = 'crosshair'


  }

  const line = () => {
    setMode(MODE.LINE)
    canvasRef.current.style.cursor = 'crosshair'

  }

  const rectangle = () => {
    setMode(MODE.RECTANGLE)
    canvasRef.current.style.cursor = 'crosshair'

  }

  const circle = () => {
    setMode(MODE.CIRCLE)
    canvasRef.current.style.cursor = 'crosshair'


  }

  const text = () => {
    setMode(MODE.TEXT)
    canvasRef.current.style.cursor = 'text';
    setCanvasXY({
      x: 0, y: 0
    })

  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        textAreaRef,
        texthandleInput,
        textInputFocusChange,
        canvasXY,
        contextRef,
        prepareCanvas,
        mouseDown,
        mouseReleas,
        hardClearCanvas,
        eraser,
        pencil,
        mouseMove,
        text,
        mode,
        line,
        rectangle,
        circle,

        setPencilOption,
        pencilOption,

        setCircleOption,
        circleOption,

        setRectangleOption,
        rectangleOption,

        setEraserOption,
        eraserOption,

        setLineOption,
        lineOption,

        textOption,
        setTextOption,

        updateElement
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);