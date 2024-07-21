'use client';
import { Hahmlet } from "next/font/google";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Container from "@mui/material/Container/Container";
import "./globals.css";
import GlobalStyles from "@mui/material/GlobalStyles";

const hahmlet = Hahmlet({
  subsets: ['latin'],
  variable: '--font-hahmlet',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <title>My page</title>
      <meta name="description" content="My page description" />
      <body className={`${hahmlet.className} ${hahmlet.variable}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm" sx={{ backgroundColor: 'white', minWidth: '360px' }}>
          {children}
        </Container>
      </LocalizationProvider>
      </body>
    </html>
  );
}

