/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Check status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Lazy loader for GoogleGenAI to prevent crashing at startup if the key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in the environment.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Run Smart Automation Diagnostic with Gemini AI
app.post('/api/diagnose', async (req, res) => {
  const { name, email, company, projectDetails } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos: name, email y company.' });
  }

  const detailsText = projectDetails || "Sin requerimientos específicos descritos. Optimización general de planta.";

  // Define JSON schema for structured Gemini Output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.INTEGER, description: "Un puntaje de automatización actual entre 10 y 90." },
      efficiencyPotential: { type: Type.INTEGER, description: "Porcentaje estimado de incremento en eficiencia (ej. 35)." },
      downtimeReduction: { type: Type.INTEGER, description: "Porcentaje estimado de reducción en tiempos muertos (ej. 45)." },
      summary: { type: Type.STRING, description: "Resumen ejecutivo detallado en español de la situación y propuesta industrial." },
      suggestedNodes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "Id del nodo (ej: plc_1, filter_1)" },
            label: { type: Type.STRING, description: "Nombre corto del nodo, ej: 'Sensor Vibración PLC' o 'Webhook ERP'" },
            type: { type: Type.STRING, description: "Tipo de nodo: sensor, processor, alert, database, ai" },
            description: { type: Type.STRING, description: "Descripción del propósito del nodo en la red de automatización." }
          },
          required: ["id", "label", "type", "description"]
        }
      },
      recommendedWorkflows: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING, description: "Nombre del workflow n8n de automatización." },
            trigger: { type: Type.STRING, description: "Desoncadente como un webhook o lectura periódica." },
            actions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de acciones a ejecutar."
            },
            description: { type: Type.STRING, description: "Descripción detallada del flujo." }
          },
          required: ["id", "name", "trigger", "actions", "description"]
        }
      },
      maintenanceStrategy: { type: Type.STRING, description: "Recomendación para un plan de mantenimiento predictivo industrial." }
    },
    required: ["score", "efficiencyPotential", "downtimeReduction", "summary", "suggestedNodes", "recommendedWorkflows", "maintenanceStrategy"]
  };

  try {
    const ai = getGeminiClient();
    
    const systemPrompt = `Eres el Arquitecto de Automatización e IA Principal de Tech Flow AI (TAI). 
    Tu tarea es analizar el estado de automatización de una empresa según los detalles del proyecto descritos por el usuario, y generar un informe completo de diagnóstico técnico y estructural en español.
    Sigue estrictamente el esquema de respuesta JSON suministrado. 
    Analiza a fondo el problema técnico, diagnostica ineficiencias de datos silados y propón soluciones de orquestación utilizando nodos (ej: integración con n8n, sensores IoT, ERP/CRM, etc.).`;

    const userPrompt = `
      --- INFORMACIÓN DEL CLIENTE ---
      Nombre del Solicitante: ${name}
      Empresa: ${company}
      Email de Contacto: ${email}
      
      --- DETALLES DEL PROYECTO / PROBLEMA ---
      ${detailsText}
    `;

    const completion = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7
      }
    });

    const parsedData = JSON.parse(completion.text || '{}');
    
    return res.json({
      success: true,
      data: parsedData,
      demoMode: false
    });

  } catch (error: any) {
    console.warn('Gemini API calls fell back due to:', error.message);
    
    // Fallback Mock data when GEMINI_API_KEY is not defined or fails, maintaining high fidelity
    const mockDiagnostics = {
      score: 42,
      efficiencyPotential: 38,
      downtimeReduction: 45,
      summary: `Diagnóstico preliminar para ${company}. Actualmente, la infraestructura describe un alto nivel de procesamiento manual y silos informáticos. La desconexión entre planta y la capa de gestión (ERP/CRM) previene operaciones fluidas. Sugerimos implantar nodos n8n inteligentes y protocolos de comunicación IoT Edge.`,
      suggestedNodes: [
        { id: 'plc_vibe_1', label: 'Sensor Vibración Turbina (PLC)', type: 'sensor', description: 'Monitorea vibraciones de motor e impulsa telemetría de alta frecuencia.' },
        { id: 'n8n_core', label: 'Orquestador n8n Neural', type: 'processor', description: 'Central de lógica que captura telemetría, filtra anomalías y rutea logs de fallas.' },
        { id: 'slack_mod', label: 'Canal de Protocolo Activo', type: 'alert', description: 'Dispatcher que notifica directamente incidentes críticos al equipo móvil.' },
        { id: 'postgres_db', label: 'Time-Series DB (PostgreSQL)', type: 'database', description: 'Almacena históricos para modelos predictivos y resguardo de datos.' },
        { id: 'ai_engine', label: 'Clasificador de Estados TAI', type: 'ai', description: 'Modelo liviano que califica alarmas de telemetría y predice fatiga de material.' }
      ],
      recommendedWorkflows: [
        {
          id: 'flow_predictive',
          name: 'Monitoreo de Anomalías Mecánicas',
          trigger: 'Lectura de sensor > 1.8g RMS vibración',
          actions: ['Analizar tendencia histórica en DB', 'Invocar IA para clasificación', 'Abrir ticket en Jira/ERP', 'Bajar velocidad de línea vía SCADA'],
          description: 'Evita roturas mecánicas catastróficas reduciendo la velocidad y alertando instantáneamente al técnico de guardia.'
        },
        {
          id: 'flow_sync',
          name: 'Sincronización Silo Planta-Cloud',
          trigger: 'Fin de lote de producción en PLC principal',
          actions: ['Transformar JSON en n8n', 'Subir reporte a SAP/Odoo ERP', 'Actualizar dashboards de almacén'],
          description: 'Sincroniza inventarios fabricados en tiempo real eliminando llamadas manuales y errores de entrada de datos.'
        }
      ],
      maintenanceStrategy: 'Instalar sensores térmicos y de vibración sobre puntos pivotales de máquinas. Planificar calibraciones automáticas trimestrales y ruteo dinámico de alarmas basado en criticidad.'
    };

    return res.json({
      success: true,
      data: mockDiagnostics,
      demoMode: true,
      notice: 'Configure su GEMINI_API_KEY en Settings > Secrets para experimentar un análisis personalizado con IA en tiempo real.'
    });
  }
});

// Setup Vite Dev Server / Static Asset Handler
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static files serving enabled');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap();
