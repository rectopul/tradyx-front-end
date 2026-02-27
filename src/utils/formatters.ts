import { FrequencyUnit } from "@/types/investmentPackages";

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

export const formatDateTime = (date: string): string => {
    const data = new Date(date);

    const day = String(data.getDate()).padStart(2, "0"); // Ajusta dia
    const month = String(data.getMonth() + 1).padStart(2, "0"); // Ajusta mês
    const year = data.getFullYear();
    const hours = String(data.getHours()).padStart(2, "0"); // Ajusta horas
    const minutes = String(data.getMinutes()).padStart(2, "0"); // Ajusta minutos

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR");
};

export const formatMonth = (monthStr: string): string => {
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });
};

export function checkCPF(strCPF: string): boolean {
    var Soma;
    var Resto: number;
    // Remove caracteres não numéricos
    strCPF = strCPF.replace(/\D/g, "");

    // CPF inválido se não tiver 11 dígitos
    if (strCPF.length !== 11 || /^(\d)\1{10}$/.test(strCPF)) return false;

    Soma = 0;

    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

// Função para aplicar máscara ao CPF
export function maskCPF(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
}

// Função para aplicar máscara ao telefone
export function maskPhone(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

export function removeSpecialChars(value: string) {
    return value.replace(/[^\d]/g, "");
}

// Get transaction icon color based on type
export const packageFrequency = (unit: FrequencyUnit): string => {
    switch (unit) {
        case "day":
            return "Dia";
        case "hour":
            return "Hora";
        case "month":
            return "Mês";
        case "week":
        default:
            return "Semana";
    }
};
