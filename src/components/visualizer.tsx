import { useEffect, useRef } from "react";
import { Analyser } from "tone";

type Props = {
  analyser: Analyser | null;
};

export function Visualizer({ analyser }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (analyser === null) return;

    const analyserValues = analyser.getValue();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let barHeight;
    let x = 0;
    const barWidth = (400 / 128) * 2.5;

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
        width={400}
        height={200}
        tabIndex={0}
        aria-label="Second Brain"
      >
        Audio frequency visualizer
      </canvas>
    </div>
  );
}
