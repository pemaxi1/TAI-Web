import React, { useState } from 'react';
import { Calendar, Clock, X, ChevronRight, Laptop, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [formData, setFormData] = useState({
    date: '2026-06-08',
    time: '14:00',
    topic: 'Automatización y Orquestación n8n'
  });

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      setIsOpen(false);
    }, 2500);
  };

  const navLinks = [
    { label: 'SERVICIOS', href: '#servicios' },
    { label: 'CASOS DE ÉXITO', href: '#casos-exito' },
    { label: 'TECNOLOGÍA', href: '#tecnologia' },
    { label: 'NOSOTROS', href: '#nosotros' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-extrabold tracking-widest text-white group-hover:text-neon-cyan transition-colors">
              TAI
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta"></span>
            </div>
          </a>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs font-semibold tracking-wider text-slate-400 hover:text-white hover:text-glow transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Grid Network Icon next to button */}
            <div className="hidden lg:flex items-center gap-1.5 text-slate-500 hover:text-neon-cyan transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="font-mono text-[10px] tracking-widest">v1.4.0</span>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              id="agendar_demo_btn"
              className="px-6 py-2 bg-gradient-to-r from-neon-cyan to-electric-violet hover:from-neon-cyan hover:to-neon-magenta text-white font-display text-xs font-bold uppercase tracking-wider rounded-md glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              AGENDAR DEMO
            </button>
          </div>
        </div>
      </nav>

      {/* Scheduler Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-glass-card/95 border border-white/10 rounded-lg p-6 glow-cyan overflow-hidden"
            >
              {/* Decorative side lines */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-magenta" />

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    Agendar Sesión Técnica
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sincronización directa con un especialista neuronal
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-1.5 text-slate-400 hover:text-white border border-white/5 hover:border-white/15 rounded bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {scheduled ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 rounded-full border border-neon-cyan/25 flex items-center justify-center bg-neon-cyan/10 mb-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-neon-cyan" />
                  </motion.div>
                  <h4 className="font-display font-semibold text-white mb-1 leading-snug">
                    ¡Sesión Agendada Exitosamente!
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Hemos enviado los detalles con la sala segura de Meet a tu dirección electrónica.
                  </p>
                  <div className="mt-4 p-3 bg-neon-cyan/5 border border-neon-cyan/10 rounded font-mono text-[10px] text-neon-cyan">
                    {formData.date} @ {formData.time} | {formData.topic}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSchedule} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] tracking-widest text-[#FF00FF]/80 uppercase">
                      Tema Tecnológico
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-[#050505] border-b border-neon-cyan/30 focus:border-neon-cyan rounded-md p-2 text-xs text-white outline-none"
                    >
                      <option value="Automatización y Orquestación n8n">Automatización y Orquestación n8n</option>
                      <option value="Monitoreo IoT y Mantenimiento Predictivo">Monitoreo IoT y Mantenimiento Predictivo</option>
                      <option value="Desarrollo SCADA/HMI a Medida">Desarrollo SCADA/HMI a Medida</option>
                      <option value="Fusión de Inteligencia Artificial">Fusión de Inteligencia Artificial (IA)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] tracking-widest text-[#FF00FF]/80 uppercase">
                        Fecha Deseada
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min="2026-06-06"
                        required
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#050505] border-b border-neon-cyan/30 focus:border-neon-cyan rounded-md p-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] tracking-widest text-[#FF00FF]/80 uppercase">
                        Horario Local
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        required
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#050505] border-b border-neon-cyan/30 focus:border-neon-cyan rounded-md p-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-neon-cyan to-electric-violet hover:from-neon-cyan hover:to-neon-magenta text-white font-display text-xs font-bold uppercase tracking-wider rounded-md glow-cyan hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2"
                    >
                      Confirmar Reserva de Demo
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-2 font-mono flex items-center justify-center gap-1.5">
                      <Laptop className="w-3 h-3 text-neon-cyan" />
                      Consultoría virtual remota segura.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
