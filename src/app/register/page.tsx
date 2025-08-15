import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <AuthForm type="register" />
      </main>
      <Footer />
    </div>
  );
}
