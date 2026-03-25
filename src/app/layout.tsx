import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  title: '心理学クイズ - 深層心理への旅',
  description: '全10問の質問からあなたの知的心を満たす心理学クイズ。',
  openGraph: {
    title: '心理学クイズ - 深層心理への旅',
    description: '全10問の質問からあなたの知的心を満たす心理学クイズ。',
    type: 'website',
    siteName: '心理学クイズ',
  },
  twitter: {
    card: 'summary_large_image',
    title: '心理学クイズ - 深層心理への旅',
    description: '全10問の質問からあなたの知的心を満たす心理学クイズ。',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(notoSansJP.className, "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 text-slate-800 antialiased overflow-x-hidden")}>
        {children}
      </body>
    </html>
  );
}
