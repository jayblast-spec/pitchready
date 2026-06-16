import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchReady | Investor readiness',
  description: 'stress-test a pitch until the story, market, and ask are impossible to ignore',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
