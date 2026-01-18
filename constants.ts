import { VaarCondition, StudentRecord, SchoolPerformance, FullTimeSchoolData, FinancialRecord, ExpenseCategory } from './types';

export const MOCK_STUDENTS: StudentRecord[] = [
  {
    id: "101",
    name: "João Silva",
    cpf: "123.456.789-00",
    birthDate: "2015-05-10",
    grade: "3º Ano",
    hasDisability: false,
    disabilityDocAttached: false,
    transportationType: "MUNICIPAL"
  },
  {
    id: "102",
    name: "Maria Oliveira",
    cpf: "000.000.000-00", // Invalid CPF
    birthDate: "2016-02-20",
    grade: "2º Ano",
    hasDisability: true,
    disabilityDocAttached: false, // Inconsistency: Disability without doc
    transportationType: "NONE"
  },
  {
    id: "103",
    name: "Pedro Santos",
    cpf: "987.654.321-11",
    birthDate: "2008-08-15",
    grade: "Creche", // Inconsistency: Age vs Grade
    hasDisability: false,
    disabilityDocAttached: false,
    transportationType: "MUNICIPAL"
  },
  {
    id: "104",
    name: "Ana Costa",
    cpf: "123.456.789-00", // Duplicate CPF with João
    birthDate: "2015-05-10",
    grade: "3º Ano",
    hasDisability: false,
    disabilityDocAttached: false,
    transportationType: "MUNICIPAL"
  },
  {
    id: "105",
    name: "Lucas Pereira",
    cpf: "111.222.333-44",
    birthDate: "2012-11-01",
    grade: "5º Ano",
    hasDisability: true,
    disabilityDocAttached: true,
    transportationType: "RURAL_PROPRIO" 
  }
];

export const INITIAL_VAAR_CONDITIONS: VaarCondition[] = [
  {
    id: "1",
    title: "Provimento de Cargo de Gestor",
    description: "Seleção de diretores por mérito e desempenho.",
    status: "GREEN",
    metric: 100,
    target: 100,
    details: "O município deve possuir lei específica que regulamente a escolha de diretores escolares com base em critérios técnicos de mérito e desempenho, além de consulta pública.",
    legalRef: "Lei nº 14.113/2020, Art. 14, §1º, I",
    deadline: "15/09/2024",
    requiredDocs: [
      "Lei Municipal ou Decreto publicada no Diário Oficial",
      "Edital de abertura do processo seletivo",
      "Ata de resultado final homologada"
    ]
  },
  {
    id: "2",
    title: "Participação SAEB",
    description: "Mínimo de 80% de participação dos alunos.",
    status: "YELLOW",
    metric: 72,
    target: 80,
    details: "É obrigatória a participação de pelo menos 80% dos alunos matriculados nos anos avaliados pelo SAEB. O não atingimento desta meta bloqueia o repasse, salvo justificativa aceita pelo MEC.",
    legalRef: "Resolução CD/FNDE nº 1, de 27/07/2023",
    deadline: "30/11/2024",
    requiredDocs: [
      "Relatório de Presença no dia da aplicação",
      "Justificativa de ausências (Atestados médicos, transferências)"
    ]
  },
  {
    id: "3",
    title: "Alinhamento BNCC",
    description: "Referencial curricular homologado e alinhado.",
    status: "GREEN",
    metric: 100,
    target: 100,
    details: "O referencial curricular do município deve estar formalmente alinhado à Base Nacional Comum Curricular (BNCC) e aprovado pelo Conselho Municipal de Educação.",
    legalRef: "Lei nº 14.113/2020, Art. 14, §1º, III",
    deadline: "Concluído",
    requiredDocs: [
      "Resolução do CME homologando o currículo",
      "Documento Curricular Municipal (PDF)"
    ]
  },
  {
    id: "4",
    title: "Redução de Desigualdades",
    description: "Melhoria nos indicadores de equidade racial e socioeconômica.",
    status: "RED",
    metric: 45,
    target: 70,
    details: "Demonstrar redução das desigualdades educacionais socioeconômicas e raciais, medidas por meio de indicadores do INEP e evolução das notas do IDEB.",
    legalRef: "Lei nº 14.113/2020, Art. 14, §1º, IV",
    deadline: "31/12/2024",
    requiredDocs: [
      "Plano de Ação Pedagógica focado em equidade",
      "Relatório de monitoramento de aprendizagem por recorte racial"
    ]
  },
  {
    id: "5",
    title: "Colaboração Estado-Município",
    description: "Regime de colaboração ICMS Educativo formalizado.",
    status: "GREEN",
    metric: 100,
    target: 100,
    details: "Existência de lei estadual que distribua parte do ICMS com base em indicadores de qualidade de aprendizagem e regime de colaboração formalizado.",
    legalRef: "Constituição Federal, Art. 158",
    deadline: "Concluído",
    requiredDocs: [
      "Lei Estadual do ICMS Educativo",
      "Termo de Adesão ao Regime de Colaboração"
    ]
  }
];

export const FUNDEB_BASE_VALUE_2024 = 5200.00; // Valor aproximado anual por aluno

export const MOCK_SCHOOLS_PERFORMANCE: SchoolPerformance[] = [
  {
    id: "S01",
    name: "Escola Mun. Cecília Meireles",
    participationRate: 92,
    avgScorePort: 7.8,
    avgScoreMath: 7.2,
    riskLevel: 'LOW',
    weakSpot: "Fração e Decimais"
  },
  {
    id: "S02",
    name: "Escola Mun. Monteiro Lobato",
    participationRate: 74, // Critical: Below 80%
    avgScorePort: 5.2,
    avgScoreMath: 4.8,
    riskLevel: 'HIGH',
    weakSpot: "Geometria Espacial"
  },
  {
    id: "S03",
    name: "CMEI Pequeno Príncipe",
    participationRate: 85,
    avgScorePort: 6.5,
    avgScoreMath: 5.9,
    riskLevel: 'MEDIUM',
    weakSpot: "Interpretação de Texto"
  },
  {
    id: "S04",
    name: "Escola Mun. Tiradentes",
    participationRate: 79, // Warning: Near limit
    avgScorePort: 6.0,
    avgScoreMath: 5.5,
    riskLevel: 'MEDIUM',
    weakSpot: "Grandezas e Medidas"
  }
];

export const MOCK_FULL_TIME_DATA: FullTimeSchoolData[] = [
  {
    id: "S01",
    name: "Escola Mun. Cecília Meireles",
    totalStudents: 450,
    fullTimeStudents: 120,
    potentialSlots: 50,
    fundingReceived: 180000,
    status: 'EXPANDING'
  },
  {
    id: "S02",
    name: "Escola Mun. Monteiro Lobato",
    totalStudents: 300,
    fullTimeStudents: 0,
    potentialSlots: 100,
    fundingReceived: 0,
    status: 'NEEDS_ACTION'
  },
  {
    id: "S03",
    name: "CMEI Pequeno Príncipe",
    totalStudents: 150,
    fullTimeStudents: 150, // 100% Full Time
    potentialSlots: 0,
    fundingReceived: 225000,
    status: 'STABLE'
  },
  {
    id: "S04",
    name: "Escola Mun. Tiradentes",
    totalStudents: 500,
    fullTimeStudents: 250, // 50%
    potentialSlots: 50,
    fundingReceived: 375000,
    status: 'EXPANDING'
  }
];

export const FULL_TIME_BONUS_PER_STUDENT = 1500.00; // Valor aproximado de fomento anual extra

// MOCK FINANCIAL DATA
export const TOTAL_FUNDEB_REVENUE_YTD = 10000000; // 10 Milhões recebidos até o momento

export const MOCK_EXPENSES: FinancialRecord[] = [
  { id: '1', date: '2024-01-15', description: 'Folha Pagamento Professores Jan', amount: 580000, category: ExpenseCategory.PAYROLL_70, isProjected: false },
  { id: '2', date: '2024-01-20', description: 'Reforma Telhado Escola X', amount: 150000, category: ExpenseCategory.MAINTENANCE_30, isProjected: false },
  { id: '3', date: '2024-02-15', description: 'Folha Pagamento Professores Fev', amount: 585000, category: ExpenseCategory.PAYROLL_70, isProjected: false },
  { id: '4', date: '2024-02-22', description: 'Compra de Merenda', amount: 80000, category: ExpenseCategory.MAINTENANCE_30, isProjected: false },
  { id: '5', date: '2024-03-15', description: 'Folha Pagamento Professores Mar', amount: 590000, category: ExpenseCategory.PAYROLL_70, isProjected: false },
  { id: '6', date: '2024-03-10', description: 'Transporte Escolar (Terceirizado)', amount: 120000, category: ExpenseCategory.MAINTENANCE_30, isProjected: false },
  { id: '7', date: '2024-04-15', description: 'Folha Pagamento Professores Abr', amount: 590000, category: ExpenseCategory.PAYROLL_70, isProjected: false },
  // ... simulating a cumulative total below
  // Total Payroll YTD Mock: ~6.8M
  { id: 'summary_payroll', date: '2024-10-30', description: 'Acumulado Folha (Mai-Out)', amount: 4455000, category: ExpenseCategory.PAYROLL_70, isProjected: false },
  // Total M&D YTD Mock: ~2.5M
  { id: 'summary_maintenance', date: '2024-10-30', description: 'Acumulado Manutenção (Mai-Out)', amount: 2150000, category: ExpenseCategory.MAINTENANCE_30, isProjected: false },
];