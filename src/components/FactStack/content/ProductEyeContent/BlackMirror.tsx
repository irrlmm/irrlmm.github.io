import { useEffect, useRef } from "react";

type Props = {
  /** number of blocks across the shorter side (8–16 looks cam‑like) */
  pixelBlocks?: number;
  /** max brightness swing (0…1). 0.25 = ±25 % */
  amplitude?: number;
  /** how many times per second the noise map refreshes (default 15) */
  noiseFps?: number;
  className?: string;
  /** kept for backward‑compat; ignored */
  src?: string;
};

const BlackMirror: React.FC<Props> = ({
  pixelBlocks = 32,
  amplitude = 0.25,
  noiseFps = 15,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTime = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      return console.error("WebGL not supported");
    }

    // ───────────────────────────── Shaders
    const vert = `
      attribute vec2 aPos;
      attribute vec2 aUV;
      varying vec2  vUV;
      void main() {
        vUV = aUV;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }`;

    const frag = `
      precision mediump float;
      uniform float  uPixel;   // size of a block in UV units
      uniform float  uTime;    // seconds
      uniform float  uAspect;  // viewport aspect (width / height)
      uniform float  uAmp;     // brightness swing 0…1
      uniform float  uRate;    // refreshes per second
      varying vec2   vUV;

      /* 2-D hash → 0-1 */
      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
      }

      void main(){
        /* aspect-correct so every block is square */
        vec2 uvSq = vec2(vUV.x * uAspect, vUV.y);
        vec2 tile = floor(uvSq / uPixel);

        /* fractional frame index based on requested rate */
        float ft    = uTime * uRate;
        float frame = floor(ft);
        float blend = fract(ft);

        vec2 randOffA = vec2(
          fract(sin(frame       * 12.9898) * 43758.5453),
          fract(sin(frame       * 78.233 ) * 21314.1231)
        );
        vec2 randOffB = vec2(
          fract(sin((frame+1.0) * 12.9898) * 43758.5453),
          fract(sin((frame+1.0) * 78.233 ) * 21314.1231)
        );

        float nA = hash(tile + randOffA);
        float nB = hash(tile + randOffB);

        float n  = mix(nA, nB, blend);   // linear interpolation

        /* cam-style dull grey + wobble */
        /* darker baseline grey (reduce from 0.40 to 0.25) */
        float grey = 0.4 + uAmp * n;

        gl_FragColor = vec4(vec3(grey), 1.0);
      }`;

    // ───────────────────────────── Compile & link
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(sh);
      return sh;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const uTimeLoc = gl.getUniformLocation(prog, "uTime");

    // ───────────────────────────── Full‑screen quad
    const quad = new Float32Array([
      -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1,
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const stride = 4 * 4; // 4 floats per vertex * 4 bytes
    const locPos = gl.getAttribLocation(prog, "aPos");
    const locUV = gl.getAttribLocation(prog, "aUV");
    gl.enableVertexAttribArray(locPos);
    gl.enableVertexAttribArray(locUV);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(locUV, 2, gl.FLOAT, false, stride, 8);

    // ───────────────────────────── Uniforms
    const uPixel = gl.getUniformLocation(prog, "uPixel");
    gl.uniform1f(uPixel, 1 / pixelBlocks);
    const uAmp = gl.getUniformLocation(prog, "uAmp");
    gl.uniform1f(uAmp, amplitude ?? 0.25);
    const uRate = gl.getUniformLocation(prog, "uRate");
    gl.uniform1f(uRate, noiseFps);
    const uAspect = gl.getUniformLocation(prog, "uAspect");

    // ───────────────────────────── Resize handler
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ───────────────────────────── Render loop
    const render = (t: number) => {
      if (startTime.current === null) {
        startTime.current = t;
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTimeLoc, (t - startTime.current) * 0.001);
      gl.uniform1f(uAspect, canvas.width / canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // ───────────────────────────── Cleanup
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [pixelBlocks, amplitude, noiseFps]);

  // React element
  return <canvas ref={canvasRef} className={className} />;
};

export default BlackMirror;
