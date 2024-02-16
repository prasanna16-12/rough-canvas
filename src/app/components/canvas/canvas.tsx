"use client"
import { useEffect } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import styles from "./canvas.module.css";
import { MODE } from "@/app/utils/constant";
import { TextOption } from "@/app/utils/typings";


export default function Canvas() {

  const {
    canvasRef,
    textAreaRef,
    texthandleInput,
    textInputFocusChange,
    canvasXY,
    prepareCanvas,
    mouseDown,
    mouseReleas,
    mouseMove,
    mode,
    textOption,
    updateElement,
  }: any = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
    {
      mode === MODE.TEXT? 
      <textarea 
      onBlur={textInputFocusChange}
      onInput={texthandleInput}

      style={{
        fontStyle:(textOption as TextOption).italic,
        fontWeight: (textOption as TextOption).bold,
        color:(textOption as TextOption).color,
        fontSize: (textOption as TextOption).fontSize + 'px',
        fontFamily: (textOption as TextOption).fontFamily,
        cursor:'text',
        position: 'absolute',
        top: canvasXY.y + 16,
        left:  canvasXY.x + 16,
      }} ref={textAreaRef}/> 
      : null
    }
    
    <canvas id="canvas" className={styles.canvas}
      onMouseDown={mouseDown}
      onMouseUp={mouseReleas}
      onMouseMove={mouseMove}
      onScrollCapture={updateElement}
      ref={canvasRef}
    >
    </canvas>
    </>
    
  );
}
