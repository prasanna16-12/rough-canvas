"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/app/components/tool/tool.module.css";
import { faA, faCircle, faEraser, faMinus, faPen, faSquare } from "@fortawesome/free-solid-svg-icons";
import { MODE } from "@/app/utils/constant";
import { useCanvas } from "@/app/hooks/useCanvas";
import PencilTool from "./pencil";
import ERASER from "./eraser";
import { useEffect, useRef, useState } from "react";
import RectangleTool from "./line";
import LineTool from "./line";



export default function Tool() {

  const tool = useRef<HTMLElement>(null);
  let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

  const grab = (e) => {
    e.stopPropagation()
    if (e.target.nodeName !== "INPUT") {
      startPosX = e.clientX;
      startPosY = e.clientY;
      document.addEventListener('mousemove', mouseMove);

      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', mouseMove);
      });
    }

  }

  const mouseMove = (e) => {

    newPosX = startPosX - e.clientX;
    newPosY = startPosY - e.clientY;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;

    // set the element's new position:
    tool.current.style.top = (tool.current.offsetTop - newPosY) + "px";
    tool.current.style.left = (tool.current.offsetLeft - newPosX) + "px";
  }


  const {
    hardClearCanvas,
    eraser,
    pencil,
    text,
    mode,
    line,
    rectangle,
    circle,
    setPencilOption,
    pencilOption,
    setEraserOption,
    eraserOption,
    setRectangleOption,
    rectangleOption,
    setCircleOption,
    circleOption,
    setLineOption,
    lineOption,
  }: any = useCanvas();

  return (
    <div className={styles.tool} ref={tool} onMouseDown={grab}>
      <div >
        <button className={mode === MODE.PENCIL ? styles.selectedBtn : undefined} onClick={pencil}><FontAwesomeIcon icon={faPen} size="lg" />
        </button>
        <button className={mode === MODE.ERASER ? styles.selectedBtn : undefined} onClick={eraser}><FontAwesomeIcon icon={faEraser} size="lg" /></button>
        <button className={mode === MODE.TEXT ? styles.selectedBtn : undefined} onClick={text}><FontAwesomeIcon icon={faA} size="lg" /></button>
        <button className={mode === MODE.LINE ? styles.selectedBtn : undefined} onClick={line}><FontAwesomeIcon icon={faMinus} size="lg" /></button>
        <button className={mode === MODE.RECTANGLE ? styles.selectedBtn : undefined} onClick={rectangle}><FontAwesomeIcon icon={faSquare} size="lg" /></button>
        <button className={mode === MODE.CIRCLE ? styles.selectedBtn : undefined} onClick={circle}><FontAwesomeIcon icon={faCircle} size="lg" /></button>

      </div>
      <div style={{ marginRight: '1rem', display: 'flex' }}>
        {
          mode === MODE.PENCIL ? <PencilTool options={pencilOption} setOptions={setPencilOption} /> : null
        }
        {
          mode === MODE.ERASER ? <ERASER options={eraserOption} setOptions={setEraserOption} /> : null
        }
        {
          mode === MODE.RECTANGLE ? <PencilTool options={rectangleOption} setOptions={setRectangleOption} /> : null
        }
        {
          mode === MODE.CIRCLE ? <PencilTool options={circleOption} setOptions={setCircleOption} /> : null
        }
        {
          mode === MODE.LINE ? <LineTool options={lineOption} setOptions={setLineOption} /> : null
        }
        <button style={{marginLeft: '0rem'}} onClick={hardClearCanvas}>clear</button>
      </div>

    </div>
  );
}



// mode === "TEXT" ? styles.selectedBtn : undefined
