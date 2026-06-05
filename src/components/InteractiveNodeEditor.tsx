/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, AlertTriangle, Cpu, Terminal, RefreshCw, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkNode, NetworkEdge, Packet } from '../types';

export default function InteractiveNodeEditor() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>('n8n_core');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYSTEM INIT: Plataforma de Orquestación Operativa TAI instanciada.',
    'INFRA: Canales de escucha activa (n8n Webhook / Modbus TCP) en puerto 502.',
    'LOG: Sincronización continua de datos de planta: Activa.'
  ]);

  // Default Nodes matching Section 2 "Orquestación Neuronal" and overall aesthetics
  const [nodes, setNodes] = useState<NetworkNode[]>([
    { id: 'plc_vibe', label: 'PLC Sensor (Planta)', type: 'sensor', x: 80, y: 150, status: 'active', value: '42.8 Hz', description: 'Capta vibraciones, revoluciones por minuto y telemetría de turbinas mecánicas.' },
    { id: 'n8n_core', label: 'Orquestador TAI (n8n)', type: 'n8n', x: 260, y: 150, status: 'active', value: 'Normal', description: 'Central automatizada en n8n que unifica telemetría con flujos de respuesta inteligentes.' },
    { id: 'cloud_erp', label: 'SAP Cloud ERP', type: 'cloud', x: 440, y: 150, status: 'active', value: 'Conectado', description: 'Sistema institucional central para control de stock, contabilidad y órdenes de trabajo.' },
    { id: 'alert_slack', label: 'Alarma de Emergencia', type: 'alert', x: 260, y: 260, status: 'idle', value: 'Espera IP', description: 'Tirador que remite llamadas telefónicas y alertas críticas automatizadas.' }
  ]);

  const [edges, setEdges] = useState<NetworkEdge[]>([
    { id: 'e1', source: 'plc_vibe', target: 'n8n_core', active: true, pulseOffset: 0 },
    { id: 'e2', source: 'n8n_core', target: 'cloud_erp', active: true, pulseOffset: 12 },
    { id: 'e3', source: 'n8n_core', target: 'alert_slack', active: false, pulseOffset: 24 }
  ]);

  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdCounter = useRef(0);

  // Generate real-time packets moving along active edges
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Find active edges
      const activeEdges = edges.filter(e => e.active);
      if (activeEdges.length === 0) return;

      // Pick a random active edge
      const randomEdge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
      
      // Determine what data packet carries based on edge
      let dataPayload = 'telemetry_pack_64b';
      if (randomEdge.id === 'e2') dataPayload = 'SAP_ERP_Payload_JSON';
      if (randomEdge.id === 'e3') dataPayload = 'ALERT_SLACK_HIGH_PRIO';

      packetIdCounter.current += 1;
      const newPacket: Packet = {
        id: `p_${packetIdCounter.current}`,
        edgeId: randomEdge.id,
        progress: 0,
        data: dataPayload
      };

      setPackets(prev => [...prev, newPacket]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, edges]);

  // Update packet progression
  useEffect(() => {
    if (!isPlaying) return;

    const frame = setInterval(() => {
      setPackets(prev => {
        return prev
          .map(p => ({ ...p, progress: p.progress + 0.015 }))
          .filter(p => p.progress < 1);
      });
    }, 30);

    return () => clearInterval(frame);
  }, [isPlaying]);

  // Log auxiliary routing messages when node structures change
  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 8)]);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    
    // Toggle status of node between active and error to show custom fault recovery!
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        const nextStatus = n.status === 'active' ? 'error' : 'active';
        
        if (nextStatus === 'error') {
          addLog(`⚠ FALLO CRÍTICO inyectado en [${n.label}]. Canal síncrono bloqueado.`);
          triggerFaultRecovery(nodeId);
        } else {
          addLog(`✔ RESTAURADO [${n.label}]. Re-calibrando conexiones neuronales.`);
          restoreNodeRecovery(nodeId);
        }
        
        return { ...n, status: nextStatus };
      }
      return n;
    }));
  };

  // Automated fault recovery simulation! Swith paths dynamically
  const triggerFaultRecovery = (failedNodeId: string) => {
    if (failedNodeId === 'cloud_erp') {
      // Redirect data to slack to notify technicians and cache locally!
      setEdges(prev => prev.map(e => {
        if (e.id === 'e2') return { ...e, active: false };
        if (e.id === 'e3') return { ...e, active: true };
        return e;
      }));
      setNodes(prev => prev.map(n => {
        if (n.id === 'alert_slack') return { ...n, status: 'active', value: 'ALERT_VIBE_ACTIVE' };
        return n;
      }));
      addLog(`IA ROUTING: Conexión SAP fallida. Redireccionando flujos n8n a [Alarma de Emergencia] local automáticamente.`);
    } else if (failedNodeId === 'plc_vibe') {
      addLog(`ERR SYSTEM: Pérdida total de señal desde PLC Planta. Activando redundancia virtual con IA.`);
    }
  };

  const restoreNodeRecovery = (restoredNodeId: string) => {
    if (restoredNodeId === 'cloud_erp') {
      setEdges(prev => prev.map(e => {
        if (e.id === 'e2') return { ...e, active: true };
        if (e.id === 'e3') return { ...e, active: false };
        return e;
      }));
      setNodes(prev => prev.map(n => {
        if (n.id === 'alert_slack') return { ...n, status: 'idle', value: 'Sano' };
        return n;
      }));
      addLog(`IA ROUTING: SAP ERP re-establecido. Retornando flujos a la topología cloud principal.`);
    }
  };

  const resetSimulation = () => {
    setNodes([
      { id: 'plc_vibe', label: 'PLC Sensor (Planta)', type: 'sensor', x: 80, y: 150, status: 'active', value: '42.8 Hz', description: 'Capta vibraciones, revoluciones por minuto y telemetría de turbinas mecánicas.' },
      { id: 'n8n_core', label: 'Orquestador TAI (n8n)', type: 'n8n', x: 260, y: 150, status: 'active', value: 'Normal', description: 'Central automatizada en n8n que unifica telemetría con flujos de respuesta inteligentes.' },
      { id: 'cloud_erp', label: 'SAP Cloud ERP', type: 'cloud', x: 440, y: 150, status: 'active', value: 'Conectado', description: 'Sistema institucional central para control de stock, contabilidad y órdenes de trabajo.' },
      { id: 'alert_slack', label: 'Alarma de Emergencia', type: 'alert', x: 260, y: 260, status: 'idle', value: 'Espera IP', description: 'Tirador que remite llamadas telefónicas y alertas críticas automatizadas.' }
    ]);
    setEdges([
      { id: 'e1', source: 'plc_vibe', target: 'n8n_core', active: true, pulseOffset: 0 },
      { id: 'e2', source: 'n8n_core', target: 'cloud_erp', active: true, pulseOffset: 12 },
      { id: 'e3', source: 'n8n_core', target: 'alert_slack', active: false, pulseOffset: 24 }
    ]);
    setPackets([]);
    setConsoleLogs([
      'SYSTEM RESTART: Simulación normalizada.',
      'IA ROUTING: Topología principal restaurada correctamente.'
    ]);
  };

  // Add customized nodes to make is highly modular!
  const addCustomNode = () => {
    const ids = ['postgres_local', 'python_ai', 'modbus_gateway'];
    const labels = ['PostgreSQL Local', 'TAI Predicción (Python)', 'Modbus TCP Gateway'];
    const types: any[] = ['scada', 'analytics', 'scada'];
    const descs = [
      'Almacena históricos redundantes locales en caso de caída del enlace principal.',
      'Analiza formas de onda espectrales en tiempo real para predecir fallos de rodamientos.',
      'Puente de hardware industrial Modbus / Profinet adaptado para micro-APIs.'
    ];

    const currentCount = nodes.length - 4;
    if (currentCount >= 3) {
      addLog('WARN: Nivel de simulación máxima alcanzada en este nodo de demostración.');
      return;
    }

    const newId = ids[currentCount];
    const newNode: NetworkNode = {
      id: newId,
      label: labels[currentCount],
      type: types[currentCount],
      x: 80 + currentCount * 180,
      y: 60,
      status: 'active',
      value: 'Online',
      description: descs[currentCount]
    };

    setNodes(prev => [...prev, newNode]);
    
    // Auto-connect to n8n core
    const newEdge: NetworkEdge = {
      id: `e_custom_${currentCount}`,
      source: 'n8n_core',
      target: newId,
      active: true,
      pulseOffset: 30
    };

    setEdges(prev => [...prev, newEdge]);
    addLog(`NUEVO VECTOR: Integrado nodo [${labels[currentCount]}] en la topología neural TAI.`);
  };

  return (
    <div id="interactive_node_workspace" className="bg-[#0b0b14] border border-white/10 rounded-lg p-5 flex flex-col justify-between h-full min-h-[480px]">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse"></div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Simulador de Orquestación Neural
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pausar Simulación' : 'Iniciar Simulación'}
            className="p-1 px-2.5 rounded border border-white/10 hover:border-neon-cyan text-slate-300 hover:text-white hover:bg-neon-cyan/10 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-neon-cyan" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="font-mono text-[10px] uppercase font-bold">{isPlaying ? 'Pausa' : 'Play'}</span>
          </button>

          <button
            onClick={addCustomNode}
            title="Integrar Nuevo Nodo"
            className="p-1 px-2.5 rounded border border-white/10 hover:border-[#FF00FF] text-slate-300 hover:text-white hover:bg-[#FF00FF]/15 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-neon-magenta" />
            <span className="font-mono text-[10px] uppercase font-bold">Añadir Nodo</span>
          </button>

          <button
            onClick={resetSimulation}
            title="Reestablecer topología"
            className="p-1.5 rounded border border-white/10 hover:border-amber-500 text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 min-h-[220px] bg-[#050505]/60 hover:bg-[#050505]/80 rounded-md border border-white/5 my-4 overflow-hidden group">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Active Edges Lines */}
          {edges.map((edge) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isError = sourceNode.status === 'error' || targetNode.status === 'error';

            return (
              <g key={edge.id}>
                {/* Background thicker glow vector */}
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={edge.active ? (isError ? '#ef4444' : '#00F0FF') : '#1e1e2f'}
                  strokeWidth={2}
                  className={edge.active ? 'opacity-30' : 'opacity-10'}
                />

                {/* Pulsing overlay line */}
                {edge.active && !isError && (
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="url(#cyan-gradient)"
                    strokeWidth={1.5}
                    className="animate-pulse-flow"
                  />
                )}
              </g>
            );
          })}

          {/* Gradients Definitions */}
          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#7000FF" stopOpacity={0.9} />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Flying Data Packets */}
        {packets.map((packet) => {
          const edge = edges.find(e => e.id === packet.edgeId);
          if (!edge) return null;
          const src = nodes.find(n => n.id === edge.source);
          const tgt = nodes.find(n => n.id === edge.target);
          if (!src || !tgt) return null;

          // Compute linear interpolation coordinates
          const x = src.x + (tgt.x - src.x) * packet.progress;
          const y = src.y + (tgt.y - src.y) * packet.progress;

          const isAlert = packet.data.includes('ALERT');

          return (
            <motion.div
              key={packet.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 pointer-events-none ${
                isAlert ? 'bg-red-500 glow-magenta' : 'bg-neon-cyan shadow-[0_0_12px_#00F0FF]'
              }`}
              style={{ left: x, top: y }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
            />
          );
        })}

        {/* Nodes layer */}
        {nodes.map((node) => {
          const isError = node.status === 'error';
          const isSelected = selectedNode === node.id;

          // Type specific colors
          let borderStyle = 'border-white/10 hover:border-neon-cyan';
          let bgStyle = 'bg-glass-bg';
          if (isError) {
            borderStyle = 'border-red-500/80 hover:border-red-500 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.25)]';
          } else if (node.status === 'active') {
            borderStyle = 'border-neon-cyan/45 hover:border-neon-cyan';
          }

          if (isSelected) {
            borderStyle += ' outline-1 outline-neon-cyan border-neon-cyan bg-slate-900/40';
          }

          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-md border min-w-[110px] text-left transition-all ${bgStyle} ${borderStyle} cursor-pointer z-20 group/node`}
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex items-center gap-1.5">
                <Cpu className={`w-3 h-3 ${isError ? 'text-red-400' : 'text-neon-cyan'}`} />
                <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase font-medium">
                  {node.type}
                </span>
                {isError && (
                  <AlertTriangle className="w-3 h-3 text-red-500 ml-auto animate-bounce" />
                )}
              </div>
              
              <h4 className="font-display text-[10px] font-bold text-white leading-tight mt-1 truncate">
                {node.label}
              </h4>
              
              {node.value && (
                <div className={`font-mono text-[9px] font-semibold mt-1 ${isError ? 'text-red-400' : 'text-neon-cyan'}`}>
                  {node.value}
                </div>
              )}

              {/* Hover Node details snippet */}
              <div className="absolute top-[102%] left-0 w-44 p-2 bg-[#050505]/95 rounded border border-white/15 opacity-0 group-hover/node:opacity-100 pointer-events-none transition-all duration-200 z-30 font-display text-[9px] text-slate-300 leading-normal">
                {node.description}
                <div className="text-[8px] text-neon-magenta/80 mt-1 uppercase font-mono">
                  {isError ? 'Presione para revivir' : 'Haga clic para inyectar error'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer console logging */}
      <div className="bg-[#050505]/90 border border-white/5 rounded p-3 h-28 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-slate-500 border-b border-white/5 pb-1 mb-1.5">
          <Terminal className="w-3 h-3 text-neon-magenta" />
          <span className="font-mono text-[9px] tracking-widest uppercase">Console Diagnostics Output AI</span>
        </div>
        
        <div className="flex-1 font-mono text-[10px] text-slate-400 overflow-y-auto space-y-1 select-none">
          {consoleLogs.map((log, idx) => (
            <div key={idx} className={`leading-relaxed truncate ${log.includes('⚠') ? 'text-red-400' : log.includes('IA ROUTING') ? 'text-neon-cyan font-semibold' : 'text-slate-400'}`}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
