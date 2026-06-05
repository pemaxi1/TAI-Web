/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Share2, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tech Flow AI (TAI)',
        text: 'Orquestación Neural de Planta y Automatización Inteligente.',
        url: window.location.href
      }).catch(err => console.warn(err));
    } else {
      alert('Enlace copiado al portapapeles: ' + window.location.href);
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand column */}
        <div className="space-y-4 md:col-span-2 text-left">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black tracking-widest text-white">
              TAI
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta"></span>
            </div>
          </div>
          <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
            Tech Flow AI. Optimizando ecosistemas industriales mediante inteligencia artificial aplicada, orquestación de sistemas y automatización nodal integral para la industria del mañana.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="p-2 border border-white/5 hover:border-neon-cyan/50 rounded bg-white/5 text-slate-400 hover:text-neon-cyan transition-colors cursor-pointer"
              title="Compartir nodo técnico"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <a
              href="mailto:pemaxi16@gmail.com"
              className="p-2 border border-white/5 hover:border-[#FF00FF]/50 rounded bg-white/5 text-slate-400 hover:text-neon-magenta transition-colors cursor-pointer text-xs"
              title="Enviar correo técnico"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Directory columns */}
        <div className="text-left">
          <h4 className="font-mono text-[10px] tracking-widest text-[#FF00FF] uppercase font-bold mb-4">
            DIRECTORIO
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#servicios" className="hover:text-white transition-colors">
                Servicios Principales
              </a>
            </li>
            <li>
              <a href="#casos-exito" className="hover:text-white transition-colors">
                Casos de Éxito
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Políticas de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* Resources columns */}
        <div className="text-left">
          <h4 className="font-mono text-[10px] tracking-widest text-[#FF00FF] uppercase font-bold mb-4">
            RECURSOS
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                Soporte de Planta
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </li>
            <li>
              <a href="#tecnologia" className="hover:text-white transition-colors">
                API Docs (Beta)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Sistemas Homologados
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Kits de Integración IoT
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-slate-500">
        <p>© {currentYear} Tech Flow AI. Neural Automation Systems. Todos los derechos reservados.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Ingeniería síncrona disponible en LatAm y España
        </p>
      </div>
    </footer>
  );
}
