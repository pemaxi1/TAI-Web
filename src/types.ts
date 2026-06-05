/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DiagnosticRequest {
  name: string;
  email: string;
  company: string;
  projectDetails: string;
}

export interface RecommendedWorkflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  description: string;
}

export interface AutomatedNode {
  id: string;
  label: string;
  type: 'sensor' | 'processor' | 'alert' | 'database' | 'ai';
  description: string;
}

export interface DiagnosticResponse {
  score: number;
  efficiencyPotential: number;
  downtimeReduction: number;
  summary: string;
  suggestedNodes: AutomatedNode[];
  recommendedWorkflows: RecommendedWorkflow[];
  maintenanceStrategy: string;
  rawText: string;
}

// Types for the interactive flow simulator
export interface NetworkNode {
  id: string;
  label: string;
  type: 'sensor' | 'n8n' | 'cloud' | 'alert' | 'analytics' | 'scada';
  x: number;
  y: number;
  status: 'active' | 'error' | 'idle';
  value?: string;
  description: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  active: boolean;
  pulseOffset: number; // For animation synchronization
}

export interface Packet {
  id: string;
  edgeId: string;
  progress: number; // 0 to 1
  data: string;
}
