
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
import Credentials from "./pages/Credentials";
import AddCredential from "./pages/AddCredential";
import VerifyCredential from "./pages/VerifyCredential";
import ShareCredential from "./pages/ShareCredential";
import Settings from "./pages/Settings";
import ActivityLog from "./pages/ActivityLog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/add-credential" element={<AddCredential />} />
          <Route path="/verify" element={<VerifyCredential />} />
          <Route path="/share" element={<ShareCredential />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/activity" element={<ActivityLog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
