"use client";

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 sm:p-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600 shadow-inner"
          >
            <BrainCircuit size={40} strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-4 pb-1">
            日常で使える心理学クイズ
          </h1>
          
          <p className="text-slate-600 mb-10 leading-relaxed text-sm sm:text-base">
            全10問のクイズを通して、あなたの周りで起きている不思議な心理現象を楽しく学んでみましょう。
          </p>
          
          <Button 
            size="lg" 
            fullWidth 
            onClick={() => router.push('/quiz')}
            className="text-lg py-7 rounded-2xl shadow-violet-200/50"
          >
            クイズを始める
          </Button>
        </Card>
      </motion.div>
    </main>
  );
}
