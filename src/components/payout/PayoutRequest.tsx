import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PayoutRequestForm from "./PayoutRequestForm";

const queryClient = new QueryClient();

function PayoutRequest() {
    return (
        <QueryClientProvider client={queryClient}>
            <PayoutRequestForm />
        </QueryClientProvider>
    );
}

export default PayoutRequest;
