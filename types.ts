export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface StudentRecord {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  grade: string;
  hasDisability: boolean;
  disabilityDocAttached: boolean;
  transportationType: string; // 'MUNICIPAL', 'ESTADUAL', 'NONE'
}

export interface AuditIssue {
  recordId: string;
  studentName: string;
  field: string;
  issueType: string;
  description: string;
  severity: Severity;
  suggestedAction: string;
}

export interface VaarCondition {
  id: string;
  title: string;
  description: string;
  status: 'GREEN' | 'YELLOW' | 'RED';
  metric: number; // 0 to 100
  target: number;
  // Detailed info
  details?: string;
  legalRef?: string;
  deadline?: string;
  requiredDocs?: string[];
}

export enum SchoolStage {
  CRECHE = 'Creche',
  PRE_ESCOLA = 'Pré-Escola',
  FUNDAMENTAL_INICIAIS = 'Ens. Fund. Anos Iniciais',
  FUNDAMENTAL_FINAIS = 'Ens. Fund. Anos Finais',
  EJA = 'EJA',
  ESPECIAL = 'Educação Especial'
}

export interface FinancialProjection {
  stage: SchoolStage;
  studentCount: number;
  weight: number;
  iqepBonus: number; // Índice de Qualidade (PR)
  baseValue: number;
  total: number;
}

// SAEB Predictor Types
export interface SchoolPerformance {
  id: string;
  name: string;
  participationRate: number; // Percentage 0-100
  avgScorePort: number; // 0-10 scale
  avgScoreMath: number; // 0-10 scale
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  weakSpot: string; // e.g., "Geometria", "Interpretação de Texto"
}

export interface QuizQuestion {
  id: string;
  descriptor: string; // BNCC skill code
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

// Full Time Manager Types
export interface FullTimeSchoolData {
  id: string;
  name: string;
  totalStudents: number;
  fullTimeStudents: number; // Matrículas Integrais atuais
  potentialSlots: number; // Capacidade física para ampliar
  fundingReceived: number;
  status: 'EXPANDING' | 'STABLE' | 'NEEDS_ACTION';
}

// 70/30 Expense Types
export enum ExpenseCategory {
  PAYROLL_70 = 'Folha de Pagamento (70%)',
  MAINTENANCE_30 = 'Manutenção e Desenvolvimento (30%)',
  CAPITAL = 'Despesas de Capital (Investimento)'
}

export interface FinancialRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  isProjected: boolean; // if true, it's a future simulation
}