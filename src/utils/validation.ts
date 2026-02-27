export const isValidCPF = (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleanCpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    const digit1 = remainder >= 10 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    const digit2 = remainder >= 10 ? 0 : remainder;

    return (
        digit1 === parseInt(cleanCpf.charAt(9)) &&
        digit2 === parseInt(cleanCpf.charAt(10))
    );
};

export const isValidPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length === 11;
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const detectPixKeyType = (
    pixKey: string
): "cpf" | "email" | "phone" | "random" => {
    const cleaned = pixKey.replace(/\D/g, "");

    if (cleaned.length === 11 && isValidCPF(pixKey)) {
        return "cpf";
    }

    if (cleaned.length === 11 && /^\d+$/.test(cleaned)) {
        return "phone";
    }

    if (isValidEmail(pixKey)) {
        return "email";
    }

    return "random";
};
