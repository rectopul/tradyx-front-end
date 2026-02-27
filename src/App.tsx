import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { PageLayout } from "./components/layout/PageLayout.tsx";
import { ThemeProvider } from "./lib/theme-provider.tsx";
import UserDashboard from "./pages/UserDashBoard.tsx";
import SignupForm from "./pages/Signup.tsx";
import { PrivateRoute } from "./components/auth/PrivateRoute.tsx";
import { UserProvider } from "./contexts/UserProvider.tsx";
import UserSettingsPage from "./pages/UserSettings.tsx";
import { NewLoginForm } from "./components/auth/NewLoginForm.tsx";
import CryptoPasswordRecovery from "./components/auth/CryptoPasswordRecovery.tsx";
import ResetPasswordForm from "./components/auth/ResetPasswordForm.tsx";
import ChallengeGoals from "./components/challenge/ChallengeGoals.tsx";
import { TradeProvider } from "./contexts/TradeContext.tsx";
import { DepositPage } from "./pages/Deposits.tsx";
import { WithdrawPage } from "./pages/WithdrawPage.tsx";
import { WithdrawAccountPage } from "./pages/WithdrawAccountPage.tsx";
import ReferralDashboard from "./pages/ReferralDashboard.tsx";
import { OrdersPage } from "./pages/OrdersPage.tsx";
import { SupportPage } from "./pages/SupportPage.tsx";
import { WithdrawAccountSetup } from "./components/WithdrawAccountSetup.tsx";
import { TransactionList } from "./components/transactions/TransactionsList.tsx";
import { useEffect } from "react";
import { asset } from "./utils/helpers.ts";
const queryClient = new QueryClient();

function App() {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.setAttribute(
                "href",
                asset("/assets/images/tradyx-ico.ico")
            );
        }
    }, []);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="light">
                    <Routes>
                        {/* Authentication routes without layout */}
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<NewLoginForm />} />
                        <Route
                            path="/reset-password"
                            element={<ResetPasswordForm />}
                        />
                        <Route
                            path="/password-recovery"
                            element={<CryptoPasswordRecovery />}
                        />

                        {/* Routes that use PageLayout */}
                        <Route element={<PrivateRoute />}>
                            <Route
                                element={
                                    <UserProvider>
                                        <TradeProvider>
                                            <PageLayout>
                                                <Outlet />
                                            </PageLayout>
                                        </TradeProvider>
                                    </UserProvider>
                                }
                            >
                                <Route path="/" element={<UserDashboard />} />
                                <Route
                                    path="/deposit"
                                    element={<DepositPage />}
                                />
                                <Route
                                    path="/withdraw"
                                    element={<WithdrawPage />}
                                />
                                <Route
                                    path="/withdraw_account"
                                    element={<WithdrawAccountPage />}
                                />
                                <Route
                                    path="/withdraw_account/setup"
                                    element={<WithdrawAccountSetup />}
                                />
                                <Route
                                    path="/transactions"
                                    element={
                                        <>
                                            <TransactionList />
                                        </>
                                    }
                                />
                                <Route
                                    path="/challenges"
                                    element={
                                        <>
                                            <ChallengeGoals />
                                        </>
                                    }
                                />
                                <Route
                                    path="/purchases"
                                    element={<OrdersPage />}
                                />
                                <Route
                                    path="/referrals"
                                    element={<ReferralDashboard />}
                                />
                                <Route
                                    path="/profile"
                                    element={<UserSettingsPage />}
                                />
                                <Route
                                    path="/support"
                                    element={<SupportPage />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                    <Toaster richColors />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
