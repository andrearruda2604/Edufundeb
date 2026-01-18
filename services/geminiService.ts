import { GoogleGenAI, Type } from "@google/genai";
import { AuditIssue, Severity, StudentRecord, QuizQuestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const auditStudentDataWithGemini = async (students: StudentRecord[]): Promise<AuditIssue[]> => {
  // Fallback to Mock Data if no API Key is present
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.warn("Using Mock Gemini Response (No valid API Key found)");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing delay

    return [
      {
        recordId: "102",
        studentName: "Maria Oliveira",
        field: "CPF",
        issueType: "INVALID_FORMAT",
        description: "CPF com todos os dígitos iguais ou formato inválido (000.000.000-00).",
        severity: Severity.CRITICAL,
        suggestedAction: "Solicitar documento original e corrigir no ERP."
      },
      {
        recordId: "102",
        studentName: "Maria Oliveira",
        field: "Deficiência / Laudo",
        issueType: "MISSING_DOC",
        description: "Aluno marcado com deficiência mas sem laudo anexado.",
        severity: Severity.HIGH,
        suggestedAction: "Anexar laudo médico ou desmarcar opção de deficiência."
      },
      {
        recordId: "103",
        studentName: "Pedro Santos",
        field: "Grade / Idade",
        issueType: "AGE_MISMATCH",
        description: "Idade (16 anos) incompatível com a etapa de ensino (Creche).",
        severity: Severity.CRITICAL,
        suggestedAction: "Verificar data de nascimento ou enturmação."
      },
      {
        recordId: "104",
        studentName: "Ana Costa",
        field: "CPF",
        issueType: "DUPLICATE",
        description: "CPF duplicado com o aluno João Silva (ID 101).",
        severity: Severity.HIGH,
        suggestedAction: "Verificar qual aluno possui o CPF correto."
      }
    ];
  }

  const model = "gemini-3-flash-preview";

  const prompt = `
    Atue como um auditor especialista no Censo Escolar Brasileiro e Fundeb.
    Analise a lista de estudantes abaixo (formato JSON) e identifique inconsistências que possam bloquear repasses financeiros ou gerar glosas.
    
    Regras de Auditoria para aplicar:
    1. CPF Inválido: CPFs com todos dígitos iguais ou formato incorreto.
    2. Duplicidade: Alunos diferentes com mesmo CPF.
    3. Deficiência sem Laudo: 'hasDisability' é true, mas 'disabilityDocAttached' é false.
    4. Idade x Série: Verifique se a idade é compatível com a série (Ex: 15 anos na Creche é erro grave).
    5. Transporte: Verificar se o transporte está preenchido corretamente.

    Dados dos Estudantes:
    ${JSON.stringify(students)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recordId: { type: Type.STRING },
              studentName: { type: Type.STRING },
              field: { type: Type.STRING },
              issueType: { type: Type.STRING },
              description: { type: Type.STRING },
              severity: { type: Type.STRING, enum: [Severity.LOW, Severity.MEDIUM, Severity.HIGH, Severity.CRITICAL] },
              suggestedAction: { type: Type.STRING }
            },
            required: ["recordId", "studentName", "field", "issueType", "description", "severity", "suggestedAction"]
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) return [];

    return JSON.parse(responseText) as AuditIssue[];

  } catch (error) {
    console.error("Gemini Audit Error:", error);
    // Return mock data on error as well to ensure demo works
    return [
      {
        recordId: "ERROR",
        studentName: "Sistema",
        field: "API Connection",
        issueType: "CONNECTION_ERROR",
        description: "Não foi possível conectar à IA. Exibindo dados de exemplo.",
        severity: Severity.LOW,
        suggestedAction: "Verifique sua conexão ou API Key."
      }
    ];
  }
};

export const generateSaebIntervention = async (
  grade: string,
  subject: string,
  weakness: string
): Promise<QuizQuestion[]> => {
  if (!apiKey) {
    console.error("API Key not found");
    return [];
  }

  const model = "gemini-3-flash-preview";

  const prompt = `
    Crie um mini-simulado de intervenção pedagógica para alunos do ${grade}.
    Foco na disciplina: ${subject}.
    Tópico de Dificuldade Específico: ${weakness}.
    
    Estilo: Questões objetivas (múltipla escolha) similares à Prova Paraná e SAEB.
    Quantidade: 3 questões.
    
    O objetivo é ajudar o professor a recuperar essa habilidade específica na turma.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              descriptor: { type: Type.STRING, description: "Código do descritor SAEB/BNCC (ex: D12)" },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.NUMBER, description: "Index da resposta correta (0-3)" },
              explanation: { type: Type.STRING, description: "Breve explicação pedagógica para o professor" }
            },
            required: ["id", "descriptor", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) return [];

    return JSON.parse(responseText) as QuizQuestion[];

  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return [];
  }
};
