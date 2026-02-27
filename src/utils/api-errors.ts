import { AxiosError } from "axios";

// Interface para a estrutura de erro do Laravel
interface LaravelErrorResponse {
    success?: boolean;
    message: string;
    errors?: Record<string, string[]>;
    validation?: Record<string, string>;
}

export class ApiException extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;
    success: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        errors?: Record<string, string[]>,
        success: boolean = false
    ) {
        super(message);
        this.name = "ApiException";
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = success;

        // Isso é necessário em TypeScript quando estendemos classes nativas
        Object.setPrototypeOf(this, ApiException.prototype);
    }

    // Método auxiliar para criar a exceção a partir de um AxiosError
    static fromAxiosError(error: AxiosError): ApiException {
        const status = error.response?.status || 500;
        const data = error.response?.data as LaravelErrorResponse | undefined;

        // Mensagem padrão baseada no status HTTP
        let message = getDefaultMessageForStatus(status);
        let success = false;

        // Se temos dados da resposta, usamos a mensagem do servidor
        if (data?.message) {
            message = data.message;
        }

        if (data?.success !== undefined) {
            success = data.success;
        }

        // Tratamos erros de validação do Laravel
        let errors: Record<string, string[]> | undefined = undefined;

        // Laravel geralmente retorna erros de validação como errors: { campo: [mensagens] }
        if (data?.errors) {
            errors = data.errors;
        }
        // Alguns frameworks/APIs podem retornar como validation: { campo: mensagem }
        else if (data?.validation) {
            errors = Object.entries(data.validation).reduce(
                (acc, [key, value]) => {
                    acc[key] = Array.isArray(value) ? value : [value];
                    return acc;
                },
                {} as Record<string, string[]>
            );
        }
        // Para casos como {"success": false, "message": "Saldo insuficiente"}
        // Adiciona o message como um erro genérico para poder ser acessado via hasErrorFor
        else if (data?.message && !errors) {
            errors = {
                message: [data.message],
            };
        }

        return new ApiException(message, status, errors, success);
    }

    // Método para verificar se há erros de validação para um campo específico
    hasErrorFor(field: string): boolean {
        return !!(this.errors && this.errors[field]);
    }

    // Método para obter a primeira mensagem de erro para um campo
    getErrorFor(field: string): string | null {
        if (this.hasErrorFor(field)) {
            return this.errors![field][0];
        }
        return null;
    }

    // Método para obter todas as mensagens de erro para um campo
    getAllErrorsFor(field: string): string[] {
        if (this.hasErrorFor(field)) {
            return this.errors![field];
        }
        return [];
    }
}

// Função auxiliar para obter mensagem padrão baseada no status HTTP
function getDefaultMessageForStatus(status: number): string {
    switch (status) {
        case 400:
            return "Dados inválidos. Verifique as informações e tente novamente.";
        case 401:
            return "Sessão expirada. Por favor, faça login novamente.";
        case 403:
            return "Você não tem permissão para realizar esta ação.";
        case 404:
            return "O recurso solicitado não foi encontrado.";
        case 422:
            return "Dados inválidos. Verifique os campos e tente novamente.";
        case 429:
            return "Muitas tentativas. Por favor, aguarde um momento.";
        case 500:
            return "Erro interno do servidor. Tente novamente mais tarde.";
        default:
            return "Ocorreu um erro. Tente novamente mais tarde.";
    }
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        // Para erros de conexão
        if (error.code === "ECONNABORTED") {
            return "O servidor demorou muito para responder. Tente novamente.";
        }

        if (error.code === "ERR_NETWORK") {
            return "Não foi possível conectar ao servidor. Verifique sua conexão.";
        }

        // Convertemos para nossa ApiException para tratamento uniforme
        const apiError = ApiException.fromAxiosError(error);
        return apiError.message;
    }

    if (error instanceof ApiException) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Ocorreu um erro inesperado.";
}

// Exemplo de uso em uma função assíncrona
export async function handleApiRequest<T>(
    requestFn: () => Promise<T>
): Promise<T> {
    try {
        return await requestFn();
    } catch (error) {
        if (error instanceof AxiosError) {
            throw ApiException.fromAxiosError(error);
        }
        throw error;
    }
}
