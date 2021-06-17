export interface Project {
  id: string;
  _schema?: number;
  name: string;
  cpsIdentifier: string;
  projectNumber: string;
  description: string;
  ministry: string;
  program: string;
  sponsor: string;
  manager: string;
  financialContact: string;
  start: string;
  end?: string;
  estimatedEnd?: string;
  progress: number;
  phase?: string;
}
