"use client"
import React, { RefObject, createElement, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CIRCLE_DEFAULT_OPTION, ERASER_DEFAULT_OPTION, LINE_DEFAULT_OPTION, MODE, PENCIL_DEFAULT_OPTION, RECTANGLE_DEFAULT_OPTION } from '../utils/constant';
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs";
import { Drawable, Options } from "roughjs/bin/core";
import { calcAngleDegrees, getDistance } from "../utils/common";
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
        else{
          roughCanvasRef.current.draw(element.roughElement)
        }
      });
    }
  }, [elements]);


  const createElement = (x1: number, y1: number, x2: number, y2: number, prevElement: Drawable | null) => {
    let roughElement: Drawable | null= null;


    if (mode === MODE.PENCIL || mode === MODE.ERASER) {
      setPoints(prevState => {
        return [...prevState, [x2, y2]]
      })
      roughElement = generator.curve(points, mode === MODE.PENCIL ? pencilOption : eraserOption);
    }

    if (mode === MODE.LINE) {
      if (keyPress === "ShiftLeft") {
        console.log(calcAngleDegrees(x1, y1, x2, y2));
        roughElement = generator.line(x1, y1, x2, y2, lineOption);
      }
      else {
        roughElement = generator.line(x1, y1, x2, y2, lineOption);
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
    }

    if (mode === MODE.CIRCLE) {
      if (keyPress === "ShiftLeft") {
        let diameter = getDistance(x1, y1, x2, y2) * 2;
        roughElement = generator.circle(x1, y1, diameter, circleOption);
      }
      else {
        roughElement = generator.ellipse(x1, y1, Math.abs(x2 - x1) * 2, Math.abs(y2 - y1) * 2, circleOption);
      }
    }
    return { x1, y1, x2, y2, mode, roughElement }
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
    contextRef.current.font = "32px serif";
  };

  const createTextElement = (text) =>{

    const {x, y} = canvasXY;
    const textMeasure = contextRef.current.measureText(text)
    contextRef.current.strokeText(text, x, y);
    let options = {
      text: text, 
      font:"12px serif",
      ...textMeasure
    }

    return{
      x1:x,
      y1:y,
      x2:null,
      y2:null,
      mode: MODE.TEXT,
      roughElement: options
    }
  }


  const textInputFocusChange = (e: Event) => {
    console.log(textAreaRef.current);
    
    const element = createTextElement(e.target?.value)
    setElements((prevState) => [...prevState, element]);
    setMode(MODE.PENCIL)
  }

  const drawText = (x,y,options) => {

    contextRef.current.font = options.font;
    contextRef.current.strokeText(options.text, x * 2, y * 2);
  }

  const mouseDown = ({ nativeEvent }: any) => {

    const { offsetX, offsetY } = nativeEvent;

    if (mode === MODE.TEXT && !writing) {
      setCanvasXY({ x: offsetX, y: offsetY })
      textAreaRef.current.focus();
      setWriting(true)
      return;
    }
    else if (mode === MODE.TEXT && writing) {
      console.log(textAreaRef.current.value);
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


  }


  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        textAreaRef,
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
        lineOption
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);