"use client"
import { useEffect } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import styles from "./canvas.module.css";
import { MODE } from "@/app/utils/constant";


export default function Canvas() {

  const {
    canvasRef,
    textAreaRef,
    textInputFocusChange,
    canvasXY,
    prepareCanvas,
    mouseDown,
    mouseReleas,
    mouseMove,
    mode
  }: any = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
    {
      mode === MODE.TEXT ? <textarea 
      //onBlur={textInputFocusChange}
      style={{
        cursor:'text',
        position: 'absolute',
        top: canvasXY.y + 20,
        left: canvasXY.x + 20,
      }} ref={textAreaRef}/> : null
    }
    
    <canvas id="canvas" className={styles.canvas}
      onMouseDown={mouseDown}
      onMouseUp={mouseReleas}
      onMouseMove={mouseMove}
      ref={canvasRef}
    >
    </canvas>
    </>
    
  );
}
