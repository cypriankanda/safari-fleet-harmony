
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

// Custom event to trigger admin login dialog
const triggerAdminLogin = () => {
  const event = new Event('admin-login-request');
  window.dispatchEvent(event);
};

// Attach the function to the window object so it can be accessed globally
(window as any).triggerAdminLogin = triggerAdminLogin;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
