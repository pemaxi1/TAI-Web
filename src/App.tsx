/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Network,
  Zap,
  Globe,
  Radio,
  Server,
  Cloud,
  ChevronRight,
  Target,
  BarChart3,
  Bot
} from 'lucide-react';
import Navbar from './components/Navbar';
import InteractiveNodeEditor from './components/InteractiveNodeEditor';
import DiagnosticForm from './components/DiagnosticForm';
import Footer from './components/Footer';

export default function App() {

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const serviceCards = [
    {
      title: 'Automatización con n8n',
      subtitle: 'Workflows visuales y escalables. Integramos APIs, bases de datos y sistemas heredados sin fricción mediante lógica de nodos avanzada.',
      icon: Network,
      color: 'text-neon-cyan',
      bgGlow: 'before:bg-neon-cyan/10'
    },
    {
      title: 'Mantenimiento Industrial',
      subtitle: 'Sensores IoT y análisis predictivo para maquinaria pesada. Minimiza tiempos muertos y optimiza ciclos de vida del equipamiento estructural.',
      icon: Radio,
      color: 'text-[#FF00FF]',
      bgGlow: 'before:bg-neon-magenta/10'
    },
    {
      title: 'Sistemas de Control a Medida',
      subtitle: 'Desarrollo de Interfaces HMI/SCADA modernas y seguras. Paneles de control interactivos vitrificados para monitoreo de planta en tiempo real.',
      icon: Server,
      color: 'text-electric-violet',
      bgGlow: 'before:bg-electric-violet/10'
    }
  ];

  return (
    <div className="min-h-screen bg-true-black text-slate-100 selection:bg-neon-cyan selection:text-true-black relative font-sans pt-20">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] right-[5%] w-[500px] h-[500px] rounded-full bg-electric-violet/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-neon-magenta/5 blur-[110px] pointer-events-none" />

      {/* Header Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center overflow-hidden">
        
        {/* Active systems pulse tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/5 border border-neon-cyan/20 rounded-full mb-6 font-mono text-[10px] tracking-widest text-neon-cyan font-bold uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
          SISTEMAS NEURONALES ACTIVOS
        </motion.div>

        {/* Hero title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl lg:text-7.5xl font-black tracking-tight text-white max-w-4xl leading-[1.05]"
        >
          Transforma el{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-purple-500 to-neon-cyan text-glow animate-pulse">
            Caos
          </span>{' '}
          en Eficiencia con IA
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-lg max-w-2xl mt-6 leading-relaxed font-sans"
        >
          Especialistas en automatización industrial y mantenimiento inteligente para escalar tu negocio. Optimizamos flujos de datos complejos en operaciones precisas y predictivas.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full"
        >
          <a
            href="#diagnostico-seccion"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-magenta text-white font-display text-xs font-black uppercase tracking-wider rounded-md glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            OPTIMIZA TU EMPRESA HOY
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#orquestacion-neuronal-seccion"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/10 hover:border-neon-cyan/50 text-slate-300 hover:text-white font-display text-xs font-bold uppercase tracking-wider rounded-md bg-white/5 hover:bg-neon-cyan/5 hover:text-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            EXPLORAR NODOS
          </a>
        </motion.div>
      </header>

      {/* SECTION 2: ARQUITECTURA DEL RENDIMIENTO */}
      <section className="bg-[#050505]/40 border-y border-white/5 py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header block info */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Arquitectura del Rendimiento
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 font-sans leading-relaxed">
              Superamos los cuellos de botella operativos mediante la integración fluida de hardware industrial y lógica de software avanzada para erradicar procesos aislados.
            </p>
          </div>

          {/* Grid Layouts: Problem vs Metric */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Left Card: The Problem */}
            <div className="bg-slate-950/40 p-6 border border-red-500/15 hover:border-red-500/25 rounded-md lg:col-span-2 flex flex-col justify-between text-left group">
              <div className="flex items-center gap-3.5 pb-2.5">
                <div className="p-2 border border-red-500/20 bg-red-950/10 rounded">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase">
                  El Problema: Datos Silados
                </h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-4">
                Las líneas de producción tradicionales y los sistemas de gestión operan en un total aislamiento hermético, generando latencia severa, mantenimiento reactivo fuera de tiempo y una continua pérdida de eficiencia operativa.
              </p>
            </div>

            {/* Right Card: High-Impact Metric */}
            <div className="bg-[#0b0b14] p-6 border border-neon-cyan/20 rounded-md flex flex-col justify-center items-center text-center glow-cyan relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-neon-cyan/5 rounded-full blur-xl pointer-events-none" />
              <div className="font-display text-5xl sm:text-6xl font-black text-white text-glow">
                99.9%
              </div>
              <div className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-black mt-2">
                UPTIME GARANTIZADO
              </div>
            </div>
          </div>

          {/* Lower layout split: Orquestación Neuronal */}
          <div id="orquestacion-neuronal-seccion" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12 text-left">
            
            {/* Left details pane */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <span className="font-mono text-[10px] tracking-widest text-[#FF00FF]/95 uppercase font-bold bg-[#FF00FF]/5 self-start px-2 py-0.5 border border-[#FF00FF]/15 rounded">
                LA SOLUCIÓN TAI
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight">
                Orquestación Neuronal
              </h3>
              <p className="font-sans text-xs text-slate-340 leading-relaxed text-slate-350">
                Implementamos nodos de automatización inteligentes que conectan de manera unificada maquinaria de planta con plataformas cloud corporativas (ERP, CRM) en tiempo real. 
              </p>
              <p className="font-sans text-xs text-slate-340 leading-relaxed text-slate-350">
                Llevamos un paso adelante la toma de decisiones: Predicciones exactas de fallos estructurales antes de que ocurran mediante modelos predictivos robustos de Machine Learning integrados de fábrica.
              </p>

              <a
                href="#diagnostico-seccion"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neon-cyan hover:text-[#FF00FF] hover:text-glow transition-all"
              >
                Ver Arquitectura 
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right interactive flow simulator pane */}
            <div className="lg:col-span-7">
              <InteractiveNodeEditor />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VECTORES DE SERVICIO */}
      <section id="servicios" className="py-20 px-6 max-w-7xl mx-auto">
        
        {/* Caption */}
        <div className="text-left mb-12">
          <span className="font-mono text-[9px] tracking-widest text-neon-cyan font-bold uppercase block mb-2">
            PROTOCOLOS ACTIVOS
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Vectores de Servicio
          </h2>
        </div>

        {/* 3 cards Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {serviceCards.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`bg-slate-950/20 border border-white/5 hover:border-neutral-700 p-6 rounded-md text-left flex flex-col h-full justify-between transition-all duration-300 relative overflow-hidden group hover:bg-[#050505] before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none before:blur-2xl before:-translate-x-1/2 before:-translate-y-1/2 ${service.bgGlow}`}
              >
                <div className="z-10 relative">
                  {/* Icon container */}
                  <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-white/5 mb-6 group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/5 transition-colors">
                    <IconComponent className={`w-5 h-5 ${service.color}`} />
                  </div>
                  
                  <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* INTEGRATIONS LOGO BAND */}
      <section id="tecnologia" className="bg-[#050505]/60 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-mono text-[9px] tracking-widest text-slate-500 font-bold uppercase block mb-8">
            NODOS DE INTEGRACIÓN SOPORTADOS
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            
            {/* Logo 1: n8n */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors select-none">
              <Network className="w-5 h-5 text-neon-cyan" />
              <span className="font-mono text-sm font-bold tracking-wider">n8n</span>
            </div>

            {/* Logo 2: REST API */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors select-none">
              <Database className="w-5 h-5 text-[#FF00FF]" />
              <span className="font-mono text-sm font-bold tracking-wider">REST API</span>
            </div>

            {/* Logo 3: AWS / Azure */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors select-none">
              <Cloud className="w-5 h-5 text-electric-violet" />
              <span className="font-mono text-sm font-bold tracking-wider">AWS / Azure</span>
            </div>

            {/* Logo 4: IoT Edge */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors select-none">
              <Radio className="w-5 h-5 text-neon-cyan animate-pulse" />
              <span className="font-mono text-sm font-bold tracking-wider">IoT Edge</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SMART DIAGNOSTICS SUBMISSION SECTION */}
      <section id="nosotros" className="py-20 px-6 max-w-7xl mx-auto">
        <DiagnosticForm />
      </section>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
}
