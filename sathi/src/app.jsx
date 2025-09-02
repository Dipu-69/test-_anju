import { Outlet } from "react-router-dom";
import AppShell from "./components/layout/app-shell";

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}