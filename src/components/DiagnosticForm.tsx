/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, FileText, Download, CheckCircle, RefreshCw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { DiagnosticResponse } from '../types';

export default function DiagnosticForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [report, setReport] = useState<DiagnosticResponse | null>(null);
  const [demoBanner, setDemoBanner] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);

    // Multi-phase feedback loop to mimic technical neural scanning
    const phases = [
      'Orquestando puertos y buscando silos...',
      'Estableciendo canal neuronal con Gemini-3.5-flash...',
      'Mapeando telemetría y flujos n8n sugeridos...'
    ];

    for (let i = 0; i < phases.length; i++) {
      setLoadingPhase(phases[i]);
      await new Promise(resolve => setTimeout(resolve, 1100));
    }

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      
      if (result.success) {
        setReport(result.data);
        setDemoBanner(result.demoMode);
      } else {
        throw new Error(result.error || 'Fallo desconocido en el servidor');
      }
    } catch (err) {
      console.error('Error fetching diagnosis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDemo = () => {
    // Generate a simple raw data blob of the report
    if (!report) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(report, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `TAI_Diagnostics_${formData.company || 'Empresa'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="diagnostico-seccion" className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!loading && !report ? (
          /* Form Screen */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-[#13131e]/70 border border-white/10 rounded-lg p-8 glow-cyan relative overflow-hidden"
          >
            {/* Hologram aesthetic boundaries */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-magenta" style={{ content: '""' }} />

            <div className="text-center mb-8">
              <h3 className="font-display text-4xl font-extrabold text-white tracking-tight">
                Inicia la Sincronización
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                Completa el formulario para recibir un <span className="text-neon-cyan font-semibold">Diagnóstico de Automatización Gratis</span>. Nuestro equipo de ingeniería y modelos de IA evaluarán la topología tecnológica de tu negocio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    id="diagnose_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050505] border-b border-neon-cyan/40 focus:border-neon-cyan rounded-md p-3 text-sm text-white outline-none transition-color placeholder-slate-600 focus:placeholder-transparent"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-3 pointer-events-none text-xs text-slate-400 font-mono tracking-wider uppercase transition-all origin-left -translate-y-6 scale-90 group-focus-within:-translate-y-6 group-focus-within:scale-90 group-focus-within:text-neon-cyan peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
                    Identificador (Nombre)
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    required
                    id="diagnose_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#050505] border-b border-neon-cyan/40 focus:border-neon-cyan rounded-md p-3 text-sm text-white outline-none transition-color placeholder-slate-600 focus:placeholder-transparent"
                    placeholder=" "
                  />
                  <label className="absolute left-3 top-3 pointer-events-none text-xs text-slate-400 font-mono tracking-wider uppercase transition-all origin-left -translate-y-6 scale-90 group-focus-within:-translate-y-6 group-focus-within:scale-90 group-focus-within:text-neon-cyan">
                    Email de Contacto (Email)
                  </label>
                </div>
              </div>

              {/* Company */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  id="diagnose_company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#050505] border-b border-neon-cyan/40 focus:border-neon-cyan rounded-md p-3 text-sm text-white outline-none transition-color placeholder-slate-600 focus:placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute left-3 top-3 pointer-events-none text-xs text-slate-400 font-mono tracking-wider uppercase transition-all origin-left -translate-y-6 scale-90 group-focus-within:-translate-y-6 group-focus-within:scale-90 group-focus-within:text-neon-cyan">
                  Entidad Operativa (Empresa)
                </label>
              </div>

              {/* Project details */}
              <div className="relative group">
                <textarea
                  id="diagnose_details"
                  rows={4}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full bg-[#050505] border-b border-neon-cyan/40 focus:border-neon-cyan rounded-md p-3 text-sm text-white outline-none transition-color placeholder-slate-500 focus:placeholder-transparent"
                  placeholder="Ej: Tengo una línea de embotellado con PLCs que no sincronizan datos con SAP. Busco automatizar avisos térmicos."
                />
                <label className="absolute left-3 -top-5 pointer-events-none text-[10px] text-neon-cyan font-mono tracking-widest uppercase">
                  Parámetros del Proyecto
                </label>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  id="ejecutar_diagnostico_btn"
                  className="px-10 py-4 bg-gradient-to-r from-neon-cyan to-electric-violet hover:from-neon-cyan hover:to-neon-magenta text-white font-display text-sm font-extrabold uppercase tracking-widest rounded-md glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-3"
                >
                  <Send className="w-4 h-4 text-white" />
                  EJECUTAR DIAGNÓSTICO
                </button>
              </div>
            </form>
          </motion.div>
        ) : loading ? (
          /* Custom interactive scanning loader */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#0b0b14]/90 border border-neon-cyan/30 rounded-lg p-16 text-center shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan animate-scan" />
            
            <div className="flex flex-col items-center">
              {/* Rotating outer spinner, spinning nodes */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-cyan/20 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-2 rounded-full border border-neon-magenta/30 animate-spin" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-4 rounded-full border-t border-b border-neon-cyan animate-spin" style={{ animationDuration: '1.5s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-neon-cyan animate-pulse" />
                </div>
              </div>

              <h4 className="font-display text-lg font-bold text-white tracking-widest uppercase text-glow">
                PROCESANDO DIAGNÓSTICO...
              </h4>
              <p className="font-mono text-xs text-neon-magenta mt-2 tracking-wider min-h-[16px] animate-pulse">
                {loadingPhase}
              </p>
              
              <div className="w-48 bg-slate-800 h-1 rounded-full overflow-hidden mt-6">
                <div className="bg-neon-cyan h-full animate-pulse" style={{ width: '100%', animationDuration: '2.5s' }} />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Report Visualization Screen */
          <motion.div
            key="report"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b0b14] border border-white/10 rounded-lg p-8 glow-cyan relative overflow-hidden"
          >
            {/* Top diagnostic alert notification */}
            {demoBanner && (
              <div className="bg-amber-950/40 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-300 font-mono mb-6 flex items-center justify-center gap-2 rounded">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Modo Demostración Activo. Configura tu GEMINI_API_KEY en Secrets para diagnóstico real personalizado en vivo.
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#FF00FF]/95 uppercase font-bold bg-[#FF00FF]/5 px-2.5 py-1 rounded border border-[#FF00FF]/15">
                  Reporte de Topología Neural
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white mt-2">
                  Diagnóstico Técnico: {formData.company || 'Su Empresa'}
                </h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadDemo}
                  className="px-4 py-2 border border-white/10 hover:border-neon-cyan text-xs font-semibold rounded text-slate-300 hover:text-white hover:bg-neon-cyan/5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neon-cyan" />
                  Descargar JSON
                </button>
                <button
                  onClick={() => setReport(null)}
                  className="px-4 py-2 border border-white/10 hover:border-neon-magenta text-xs font-semibold rounded text-slate-300 hover:text-white hover:bg-neon-magenta/5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-neon-magenta" />
                  Nuevo Análisis
                </button>
              </div>
            </div>

            {/* Glowing Dials section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              
              {/* Dial 1 */}
              <div className="bg-slate-900/50 p-4 border border-white/5 rounded text-center">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                  Evolución Actual
                </span>
                <div className="text-3xl font-display font-black text-rose-500 tracking-tight">
                  {report?.score}/100
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Nivel Digital Inicial</span>
              </div>

              {/* Dial 2 */}
              <div className="bg-slate-900/50 p-4 border border-white/5 rounded text-center">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                  Eficiencia de Datos
                </span>
                <div className="text-3xl font-display font-black text-neon-cyan tracking-tight text-glow">
                  +{report?.efficiencyPotential}%
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Optimización Flujos</span>
              </div>

              {/* Dial 3 */}
              <div className="bg-slate-900/50 p-4 border border-white/5 rounded text-center">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                  Reducción Fallos
                </span>
                <div className="text-3xl font-display font-black text-neon-magenta tracking-tight">
                  -{report?.downtimeReduction}%
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Tiempos Muertos</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="bg-slate-950/80 rounded p-5 border border-white/5">
                <h4 className="font-mono text-[10px] tracking-widest text-[#FF00FF]/90 uppercase font-black mb-3">
                  Resumen Técnico de la Problemática
                </h4>
                <p className="font-display text-xs text-slate-300 leading-relaxed text-left">
                  {report?.summary}
                </p>
              </div>

              {/* Suggested Nodes list mapping */}
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-neon-cyan uppercase font-black mb-4">
                  Topología Nodal Recomendada
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report?.suggestedNodes.map((node) => (
                    <div
                      key={node.id}
                      className="bg-slate-900/40 p-3.5 border border-white/5 rounded-md hover:border-neon-cyan/20 transition-colors flex items-start gap-3"
                    >
                      <div className="p-1 px-1.5 rounded bg-neon-cyan/5 border border-neon-cyan/15 font-mono text-[9px] font-bold text-neon-cyan uppercase mt-0.5">
                        {node.type}
                      </div>
                      <div className="text-left">
                        <h5 className="font-display text-xs font-bold text-white uppercase">{node.label}</h5>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">{node.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested pipelines (n8n workflow styling) */}
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-[#FF00FF]/95 uppercase font-bold mb-4">
                  Flujos n8n de Orquestación Diseñados
                </h4>
                <div className="space-y-4">
                  {report?.recommendedWorkflows.map((work) => (
                    <div
                      key={work.id}
                      className="bg-slate-950/60 p-5 rounded border border-white/5 text-left"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5 mb-2.5">
                        <span className="font-display text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-neon-cyan" />
                          {work.name}
                        </span>
                        <span className="font-mono text-[9px] text-[#FF00FF] bg-[#FF00FF]/5 p-1 rounded border border-[#FF00FF]/15">
                          TRIGGER: {work.trigger}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {work.description}
                      </p>

                      {/* Steps pipeline */}
                      <div className="flex flex-wrap items-center gap-2">
                        {work.actions.map((act, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="font-mono text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded text-slate-200">
                              {act}
                            </span>
                            {i < work.actions.length - 1 && (
                              <span className="text-slate-600 font-bold font-mono text-[10px]">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance guidelines */}
              <div className="bg-slate-900/60 p-5 rounded border border-neon-magenta/15 text-left">
                <div className="flex items-center gap-2 text-[#FF00FF] mb-3">
                  <Zap className="w-4 h-4" />
                  <h4 className="font-mono text-[10px] tracking-widest uppercase font-black">
                    Estrategia de Mantenimiento Predictivo
                  </h4>
                </div>
                <p className="font-display text-xs text-slate-300 leading-relaxed">
                  {report?.maintenanceStrategy}
                </p>
              </div>

              {/* Verification & compliance tags */}
              <div className="border-t border-white/5 pt-5 text-center flex flex-wrap gap-4 items-center justify-center font-mono text-[9px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
                  Diseño de Hardware Modbus/TCP Conforme a Normas
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-neon-magenta" />
                  Integridad de Datos n8n Certificada
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
