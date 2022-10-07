import { useEffect, useRef } from "react";
import { Analyser } from "tone";
import { useWindowDimensions } from "../../hooks";

type Props = {
  analyser: Analyser | null;
};

export function Visualizer({ analyser }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const { height, width } = useWindowDimensions();

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (analyser === null) return;

    const analyserValues = analyser.getValue();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let barHeight;
    let x = 0;
    const barWidth = (width / 128) * 2.5;

    for (let i = 0; i < 128; i++) {
      barHeight = Number(analyserValues[i]) * 500;
      ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
      ctx.fillRect(x, 200 - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvasCtxRef.current = canvas.getContext("2d");
    const ctx = canvasCtxRef.current;

    if (!ctx) {
      return;
    }

    let animationFrameId = 0;

    const render = () => {
      draw(ctx);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={width}
        height={200}
        tabIndex={0}
        aria-label="Audio Visualizer"
      >
        Audio frequency visualizer
      </canvas>
    </div>
  );
}
