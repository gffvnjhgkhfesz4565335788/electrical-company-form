import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrical Service Request",
  description: "Submit your request for electrical services.",
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
