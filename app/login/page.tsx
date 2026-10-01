import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] dark:bg-slate-950 flex items-center justify-center p-8 text-slate-500">
          Loading Portal Login...
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
