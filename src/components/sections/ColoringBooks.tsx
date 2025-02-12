import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface ColoringPage {
  id: string;
  title: string;
  image: string;
}

const coloringPages: ColoringPage[] = [
  {
    id: 'butterfly',
    title: 'Beautiful Butterfly',
    image: 'https://images.unsplash.com/photo-1559517042-5a5eb4f10920?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dog',
    title: 'Playful Puppy',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'flower',
    title: 'Spring Flower',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=300&q=80'
  }
];

export function ColoringBooks({ onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF0000');
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [selectedPage, setSelectedPage] = useState<ColoringPage | null>(null);

  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFD700', // Yellow
    '#FF69B4', // Pink
    '#800080', // Purple
  ];

  useEffect(() => {
    if (canvasRef.current && selectedPage) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineWidth = 5;
        setCtx(context);

        // Load the image
        const img = new Image();
        img.src = selectedPage.image;
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [selectedPage]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (ctx) {
      ctx.beginPath();
      const { x, y } = getCoordinates(e);
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (ctx) {
      ctx.closePath();
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    if ('touches' in e) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    if (ctx && canvasRef.current && selectedPage) {
      const canvas = canvasRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = selectedPage.image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  };

  const saveDrawing = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `kidzspark-coloring-${selectedPage?.id || 'page'}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  if (!selectedPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              Back
            </button>
            <h2 className="text-3xl font-bold text-center flex-1 text-orange-800">Coloring Books</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coloringPages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-center text-orange-800">{page.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedPage(null)}
            className="flex items-center gap-2 px-4 py-2 text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Pages
          </button>
          <h2 className="text-3xl font-bold text-center flex-1 text-orange-800">{selectedPage.title}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-[400px] border-2 border-orange-300 rounded-lg touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Eraser className="w-5 h-5" />
                Clear
              </button>
              <button
                onClick={saveDrawing}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
              >
                <Download className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}