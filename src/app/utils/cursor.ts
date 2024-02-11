export const getCursorImage = (cursorImageSizePx: number) =>{
        const canvas = document.createElement("canvas");
        canvas.height = cursorImageSizePx * devicePixelRatio;;
        canvas.width = cursorImageSizePx * devicePixelRatio;;
        const context = canvas.getContext("2d")!;
        context.scale(devicePixelRatio, devicePixelRatio)
        context.lineWidth = .3;
        context.beginPath();
        context.arc(
          cursorImageSizePx / 2,
          cursorImageSizePx / 2,
          cursorImageSizePx / 4,
          0,
          2 * Math.PI,
        );
        context.fillStyle = 'white';
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        const previewDataURL = canvas.toDataURL('image/png');
        return previewDataURL    
}