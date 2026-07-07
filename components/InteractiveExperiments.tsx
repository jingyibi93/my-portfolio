/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Play, Volume2, RotateCcw, Activity } from 'lucide-react';

interface InteractiveExperimentsProps {
  type: 'canvas' | 'audio';
  isEn: boolean;
}

export default function InteractiveExperiments({ type, isEn }: InteractiveExperimentsProps) {
  if (type === 'canvas') {
    return <GravityTideCanvas isEn={isEn} />;
  } else {
    return <SonicChimesSynth isEn={isEn} />;
  }
}

/* =======================================
 * 1. Generative Gravity Tide Canvas
 * ======================================= */
function GravityTideCanvas({ isEn }: { isEn: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [params, setParams] = useState({
    speed: 0.008,
    amplitude: 35,
    layers: 4,
    colorTheme: 'teal',
  });
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, force: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing on container, not window size alone
    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = Math.max(containerRef.current.clientHeight, 300);
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let animationFrameId: number;
    let offset = 0;

    // Fluid colors matching gallery design
    const themes: Record<string, string[]> = {
      teal: ['rgba(92, 111, 104, 0.4)', 'rgba(61, 64, 58, 0.25)', 'rgba(194, 155, 127, 0.2)', 'rgba(244, 243, 239, 0.15)'],
      terracotta: ['rgba(156, 63, 58, 0.35)', 'rgba(193, 164, 120, 0.25)', 'rgba(61, 64, 58, 0.15)', 'rgba(236, 235, 230, 0.1)'],
      sapphire: ['rgba(30, 41, 59, 0.4)', 'rgba(140, 130, 117, 0.3)', 'rgba(12, 74, 96, 0.2)', 'rgba(255, 255, 255, 0.1)']
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse spring interpolate
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const currentColors = themes[params.colorTheme] || themes.teal;
      offset += params.speed;

      // Draw active backdrop layers
      for (let i = 0; i < params.layers; i++) {
        ctx.beginPath();
        const layerOffset = i * (Math.PI / 4.5);
        const waveColor = currentColors[i % currentColors.length];
        ctx.fillStyle = waveColor;

        // Trace wave curve
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 3) {
          // Dynamic math integrating mouse distance
          const dx = x - mouseRef.current.x;
          const dy = canvas.height / 1.7 - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceFactor = Math.max(0, 1 - distance / 220) * mouseRef.current.force;

          const baseAmp = params.amplitude * (1 - i * 0.15);
          const localAmp = baseAmp + (forceFactor * 45);
          const frequency = 0.0035 + (i * 0.0008) + (forceFactor * 0.003);

          const y = (canvas.height / 1.7) +
            Math.sin(x * frequency + offset + layerOffset) * localAmp +
            Math.cos(x * 0.002 - offset * 0.5) * (localAmp * 0.4) +
            (forceFactor * -15);

          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      // Draw neat cursor focus circle
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [params, isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.force = 1.8;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseRef.current.force = 0.5;
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handleDoubleClick = () => {
    setParams({
      speed: 0.008,
      amplitude: 35,
      layers: 4,
      colorTheme: params.colorTheme === 'teal' ? 'terracotta' : params.colorTheme === 'terracotta' ? 'sapphire' : 'teal'
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[320px] bg-[#fdfdfc] border border-stone-200 rounded-sm overflow-hidden flex flex-col justify-between p-4 font-sans select-none">
      <div className="flex justify-between items-start z-10 pointer-events-none">
        <div>
          <span className="text-[10px] tracking-widest text-stone-400 font-mono">SIMULATION E-012</span>
          <h4 className="text-sm font-medium text-stone-800 tracking-tight mt-0.5">
            {isEn ? 'Fluid Gravity Field' : '流体力重力场'}
          </h4>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <button 
            id="theme-btn-teal"
            onClick={() => setParams(p => ({ ...p, colorTheme: 'teal' }))} 
            className={`w-3 h-3 rounded-full border ${params.colorTheme === 'teal' ? 'border-stone-800 scale-110' : 'border-stone-200'} bg-[#5c6f68] transition-all`}
            title="Teal"
          />
          <button 
            id="theme-btn-terracotta"
            onClick={() => setParams(p => ({ ...p, colorTheme: 'terracotta' }))} 
            className={`w-3 h-3 rounded-full border ${params.colorTheme === 'terracotta' ? 'border-stone-800 scale-110' : 'border-stone-200'} bg-[#9c3f3a] transition-all`}
            title="Terracotta"
          />
          <button 
            id="theme-btn-sapphire"
            onClick={() => setParams(p => ({ ...p, colorTheme: 'sapphire' }))} 
            className={`w-3 h-3 rounded-full border ${params.colorTheme === 'sapphire' ? 'border-stone-800 scale-110' : 'border-stone-200'} bg-[#1e293b] transition-all`}
            title="Sapphire"
          />
        </div>
      </div>

      <canvas
        id="gravity-tide-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none z-0"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerEnter={handlePointerEnter}
        onDoubleClick={handleDoubleClick}
      />

      <div className="flex justify-between items-end z-10 pointer-events-none text-[10px] text-stone-400 font-mono mt-auto">
        <div className="flex items-center gap-1.5 bg-[#fdfdfc]/80 backdrop-blur-xs py-0.5 px-1.5 rounded-xs border border-stone-100">
          <Activity className="w-3 h-3 animate-pulse text-emerald-600" />
          <span>FPS: 60 // {params.colorTheme.toUpperCase()}</span>
        </div>
        <div className="text-right pointer-events-auto">
          <button 
            id="btn-intensity"
            onClick={() => setParams(p => ({ ...p, amplitude: p.amplitude === 35 ? 60 : p.amplitude === 60 ? 15 : 35 }))}
            className="text-[10px] text-indigo-900 border border-stone-200 bg-[#fdfdfc]/80 hover:bg-stone-50 hover:border-stone-300 py-0.5 px-2 rounded-sm transition-all cursor-pointer mr-1"
          >
            {isEn ? `Amp: ${params.amplitude}px` : `振幅: ${params.amplitude}px`}
          </button>
          <span className="hidden sm:inline">
            {isEn ? 'Double click to shift state' : '双击画布切换基色'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =======================================
 * 2. Sonic Chimes Synthesizer
 * ======================================= */
function SonicChimesSynth({ isEn }: { isEn: boolean }) {
  const [decay, setDecay] = useState(2.2);
  const [porosity, setPorosity] = useState(0.4); // 0 = metal chime, 1 = dry woodblock
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Frequencies corresponding to clean pentatonic chime keys
  const notes = [
    { name: 'C4', freq: 261.63, subZh: '宫', subEn: 'Gong' },
    { name: 'D4', freq: 293.66, subZh: '商', subEn: 'Shang' },
    { name: 'E4', freq: 329.63, subZh: '角', subEn: 'Jiao' },
    { name: 'G4', freq: 392.00, subZh: '徵', subEn: 'Zhi' },
    { name: 'A4', freq: 440.00, subZh: '羽', subEn: 'Yu' },
    { name: 'C5', freq: 523.25, subZh: '少宫', subEn: 'High Gong' },
    { name: 'D5', freq: 587.33, subZh: '少商', subEn: 'High Shang' },
    { name: 'E5', freq: 659.25, subZh: '少角', subEn: 'High Jiao' },
  ];

  const playSynthesizedChime = (frequency: number, index: number) => {
    // Lazy initialize standard web audio API context securely (user gesture triggered)
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Oscillator node
      const osc = ctx.createOscillator();
      // Waveform adjusts depending on materials selection
      // Porosity: lower is pure sine (metallic chime), higher adds odd harmonics (triangle/wood block)
      if (porosity < 0.25) {
        osc.type = 'sine';
      } else if (porosity < 0.6) {
        osc.type = 'triangle';
      } else {
        // Pseudo woodblock using a square wave with bandpass filtering
        osc.type = 'sawtooth';
      }

      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // 2. High-pass/Band-pass filter to replicate hollow woodblock or sharp metallic bell
      const filter = ctx.createBiquadFilter();
      if (porosity >= 0.6) {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(frequency * 1.5, ctx.currentTime);
        filter.Q.setValueAtTime(4.0, ctx.currentTime);
      } else {
        filter.type = 'peaking';
        filter.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
        filter.Q.setValueAtTime(1.0);
        filter.gain.setValueAtTime(5, ctx.currentTime);
      }

      // 3. Amplifier envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
      // Bell/wood strike attack (extremely instant)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);

      // Connect nodes: Osc -> Filter -> Gain -> Destination
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Trigger strike
      osc.start();
      osc.stop(ctx.currentTime + decay);

      // Visual feedback node trigger
      setActiveNode(index);
      setTimeout(() => {
        setActiveNode(null);
      }, 350);
    } catch (e) {
      console.error('Web Audio Synth play failed or blocked:', e);
    }
  };

  return (
    <div className="w-full h-auto bg-[#fdfdfc] border border-stone-200 rounded-sm p-4 font-sans select-none flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] tracking-widest text-stone-400 font-mono">SYNTH E-045</span>
            <h4 className="text-sm font-medium text-stone-800 tracking-tight mt-0.5">
              {isEn ? 'Pentatonic Resonator Matrix' : '五声音律金属谐振器'}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
            <Volume2 className="w-3.5 h-3.5 text-stone-500" />
            <span>WEB AUDIO API</span>
          </div>
        </div>
        
        <p className="text-xs text-stone-500 mt-2 mb-4 leading-relaxed">
          {isEn 
            ? 'Adjust sliders to change physical properties. Tap the tactile wood-like pads below to synthesize acoustic reverberations.'
            : '调节上方滑块改变物理共振参数。轻按下方触感面板，运用数学算式在底层合成声音余震。'}
        </p>

        {/* Physical parameter adjust knobs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 border-y border-stone-100 py-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span className="uppercase">{isEn ? 'Porosity (Timber-bell)' : '材质孔致性 (木质 - 金属)'}</span>
              <span>{(porosity * 100).toFixed(0)}%</span>
            </div>
            <input 
              id="range-porosity"
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={porosity} 
              onChange={(e) => setPorosity(parseFloat(e.target.value))}
              className="w-full accent-stone-700 h-1 bg-stone-100 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span className="uppercase">{isEn ? 'Decay Time (Reverberation)' : '声学衰减时间 (回响)'}</span>
              <span>{decay.toFixed(1)}s</span>
            </div>
            <input 
              id="range-decay"
              type="range" 
              min="0.3" 
              max="4.5" 
              step="0.1"
              value={decay} 
              onChange={(e) => setDecay(parseFloat(e.target.value))}
              className="w-full accent-stone-700 h-1 bg-stone-100 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grid mapping */}
      <div className="grid grid-cols-4 gap-2.5">
        {notes.map((note, idx) => {
          const isNodeActive = activeNode === idx;
          return (
            <button
              id={`synth-pad-${idx}`}
              key={note.name}
              onClick={() => playSynthesizedChime(note.freq, idx)}
              className={`h-16 relative rounded-xs transition-all duration-100 flex flex-col justify-between p-2 select-none border text-left cursor-pointer outline-hidden
                ${isNodeActive 
                  ? 'bg-[#d2b98c] border-[#8c734e] text-stone-900 scale-[0.97] shadow-inner' 
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
            >
              {/* Wooden texture background indicator */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none rounded-xs" />
              
              <div className="flex justify-between w-full">
                <span className="text-[10px] font-mono font-medium tracking-tight">
                  {note.name}
                </span>
                <span className="text-[9px] scale-90 self-start font-serif font-semibold text-stone-400">
                  {isEn ? note.subEn : note.subZh}
                </span>
              </div>
              
              <span className="text-[10px] text-right font-mono text-stone-400 w-full block">
                {note.freq.toFixed(1)}Hz
              </span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
