import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Fleet Audit — Production agent governance",
  description: "Audit, observe, and govern multi-agent systems before they become production incidents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
