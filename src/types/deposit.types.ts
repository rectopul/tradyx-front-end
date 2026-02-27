export interface DepositUSDTResponse {
    success: boolean;
    message: string;
    data: {
        payment_id: string;
        payment_url: string;
        payment_address: string;
        payment_amount: number;
        qr_code: string;
        transaction_id: number;
    };
}
