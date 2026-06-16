// Bootstrap first, then our theme so our rules win where they overlap.
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Trademark Registration Online | Vakilkaro — India's #1 Legal & Financial Platform",
  description:
    "Register your trademark online with Vakilkaro. TM attorney support, 24-hour filing guarantee, free brand/class search, objection-reply cover & 1-year Trademark Watch. Plans from Rs.1,999 + govt fee & GST.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
