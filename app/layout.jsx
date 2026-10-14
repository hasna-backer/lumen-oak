import './globals.css';

export const metadata = {
  title: 'Lumen & Oak — Interior Architecture Studio',
  description:
    'Lumen & Oak is a fictional interior architecture studio crafting calm, light-filled homes. Demo portfolio site built with Next.js, Tailwind and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
