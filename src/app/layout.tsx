import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danyal Tanveer — Portfolio",
  description:
    "Danyal Tanveer — Final-year CS undergrad at UCP. Full-Stack Engineer & NLP/ML Researcher. Building production backends, Transformer ensembles, and intelligent systems.",
  keywords: [
    "Danyal Tanveer",
    "Portfolio",
    "Full-Stack Developer",
    "NLP",
    "Machine Learning",
    "Next.js",
    "React",
    "BERT",
  ],
  authors: [{ name: "Danyal Tanveer" }],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
