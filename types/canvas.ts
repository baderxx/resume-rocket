enum ElementTypes {
    TEXT = 'text',
    SHAPE = 'shape',
    IMAGE = 'image',
    VECTOR = 'vector'
}
enum ElementAlignment {
    START = 'start',
    END = 'end',
    CENTER = 'center'
}

type TextElementStyle = {
    fontFamily: string
    fontSize: string
    color: string
}

type ShapeElementStyle = {
    fill: string
    stroke?: string // optional
    strokeWidth?: number // optional
}

type TextElementSchema = {
    type: ElementTypes.TEXT
    content: string
    alignment: ElementAlignment
    style: Partial<TextElementStyle>
}

type ShapeElementSchema = {
    type: ElementTypes.SHAPE
    shapeType: 'rectangle' | 'circle'
    x: number
    y: number
    width?: number // optional
    height?: number // optional
    radius?: number // optional
    style: Partial<ShapeElementStyle>
}

type ImageElementStyle = {
    width: number
    height: number
}

type ImageElementSchema = {
    type: ElementTypes.IMAGE
    source: string
    style: Partial<ImageElementStyle>
}

type VectorElementStyle = {
    stroke: string
    strokeWidth: number
}

type VectorElementSchema = {
    type: ElementTypes.VECTOR
    points: number[]
    style: Partial<VectorElementStyle>
}

// function renderTextElement(context: CanvasRenderingContext2D, textElement: TextElementSchema) {
//     context.font = `${textElement.style?.fontSize} ${textElement.style?.fontFamily}`;
//     context.fillStyle = textElement.style?.color || 'black';
//     context.textAlign = textElement.alignment;
//     context.fillText(textElement.content, 10, 20); // Adjust coordinates as needed
// }
//
// function renderShapeElement(context: CanvasRenderingContext2D, shapeElement: ShapeElementSchema) {
//     context.fillStyle = shapeElement.style.fill;
//     context.strokeStyle = shapeElement.style.stroke || 'black';
//     context.lineWidth = shapeElement.style.strokeWidth || 1;
//
//     if (shapeElement.shapeType === 'rectangle') {
//         context.fillRect(shapeElement.x, shapeElement.y, shapeElement.width || 0, shapeElement.height || 0);
//         context.strokeRect(shapeElement.x, shapeElement.y, shapeElement.width || 0, shapeElement.height || 0);
//     } else if (shapeElement.shapeType === 'circle') {
//         context.beginPath();
//         context.arc(shapeElement.x, shapeElement.y, shapeElement.radius || 0, 0, 2 * Math.PI);
//         context.fill();
//         context.stroke();
//     }
// }
//
// function renderImageElement(context: CanvasRenderingContext2D, imageElement: ImageElementSchema) {
//     const img = new Image();
//     img.src = imageElement.source;
//     img.onload = () => {
//         context.drawImage(img, 10, 30, imageElement.style.width || img.width, imageElement.style.height || img.height);
//     };
// }
//
// function renderVectorElement(context: CanvasRenderingContext2D, vectorElement: VectorElementSchema) {
//     context.strokeStyle = vectorElement.style.stroke || 'black';
//     context.lineWidth = vectorElement.style.strokeWidth || 1;
//
//     context.beginPath();
//     context.moveTo(vectorElement.points[0], vectorElement.points[1]);
//
//     for (let i = 2; i < vectorElement.points.length; i += 2) {
//         context.lineTo(vectorElement.points[i], vectorElement.points[i + 1]);
//     }
//
//     context.stroke();
// }
//
// // Example usage:
//
// const canvas = document.createElement('canvas');
// document.body.appendChild(canvas);
//
// canvas.width = 200;
// canvas.height = 200;
//
// const context = canvas.getContext('2d');
//
// const textElement: TextElementSchema = {
//     type: ElementTypes.TEXT,
//     content: 'Some content',
//     alignment: ElementAlignment.START,
//     style: {
//         fontSize: '12px',
//         fontFamily: 'Arial',
//         color: 'red'
//     }
// };
//
// const shapeElement: ShapeElementSchema = {
//     type: ElementTypes.SHAPE,
//     shapeType: 'circle',
//     x: 100,
//     y: 100,
//     radius: 50,
//     style: {
//         fill: 'green',
//         stroke: 'blue',
//         strokeWidth: 2
//     }
// };
//
// const imageElement: ImageElementSchema = {
//     type: ElementTypes.IMAGE,
//     source: 'https://example.com/image.jpg',
//     style: {
//         width: 100,
//         height: 80
//     }
// };
//
// const vectorElement: VectorElementSchema = {
//     type: ElementTypes.VECTOR,
//     points: [10, 10, 50, 50, 100, 10],
//     style: {
//         stroke: 'black',
//         strokeWidth: 2
//     }
// };