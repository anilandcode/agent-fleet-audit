import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import "./landing-redesign.css";

export const metadata: Metadata = {
  title: "Agent Fleet Audit — Production agent governance",
  description: "Audit, observe, and govern multi-agent systems before they become production incidents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
