"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Share2, MessageCircle, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const s = searchParams.get('score');
    if (s) {
      setScore(parseInt(s, 10));
    }
  }, [searchParams]);

  // Evaluate message based on score
  let evaluation = "";
  let message = "";
  if (score === 10) {
    evaluation = "心理学マスター！";
    message = "素晴らしい！あなたは人間の心理を深く理解しています。";
  } else if (score >= 7) {
    evaluation = "優秀な心理コミュニケーター";
    message = "日々の生活に心理学を活用できる十分な知識があります！";
  } else if (score >= 4) {
    evaluation = "心理学の探求者";
    message = "心理学の面白さに気づき始めたところですね。さらに学ぶと新しい世界が見えるかも！";
  } else {
    evaluation = "これからの成長に期待！";
    message = "伸びしろたっぷり。心理学を知ると人間関係がもっと楽になりますよ。";
  }

  const shareText = encodeURIComponent(`心理学クイズで10問中${score}問正解しました！\n評価：${evaluation}\n\nあなたも挑戦してみよう！\nhttps://psychology-quiz-final.vercel.app/\n#心理学クイズ #深層心理 #Webアプリ`);
  const shareUrl = `https://www.threads.net/intent/post?text=${shareText}`;
  const lineUrl = "https://lin.ee/placeholder"; // FIXME: LINE公式アカウントのURLに変更してください

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg text-center"
      >
        <Card className="p-8 sm:p-12 mb-6 border-fuchsia-200">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-24 h-24 bg-gradient-to-tr from-amber-200 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-200 border-4 border-white"
          >
            <Trophy size={48} className="text-white" />
          </motion.div>

          <h1 className="text-2xl font-bold text-slate-600 mb-2">最終スコア</h1>
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-6 drop-shadow-sm">
            {score} <span className="text-3xl text-slate-400 font-medium">/ 10</span>
          </div>

          <div className="bg-violet-50/80 rounded-2xl p-6 mb-8 border border-violet-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-violet-800 mb-2">{evaluation}</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{message}</p>
          </div>

          <div className="space-y-4">
            <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button fullWidth className="py-6 text-base bg-black hover:bg-zinc-800 text-white rounded-xl flex items-center justify-center gap-2 border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all" variant="secondary">
                <Share2 size={20} />
                Threadsで結果をシェア
              </Button>
            </a>

            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button fullWidth className="py-7 text-lg bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-200/50 hover:shadow-green-300/50 hover:-translate-y-0.5 transition-all outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-green-400" variant="secondary">
                <MessageCircle size={24} />
                <span className="font-bold tracking-wide">さらに心理学を学ぶ（LINE登録）</span>
              </Button>
            </a>
          </div>
        </Card>

        <Button variant="ghost" className="text-slate-500 hover:text-slate-800 transition-colors" onClick={() => router.push('/')}>
          <RotateCcw size={18} className="mr-2" />
          最初からやり直す
        </Button>
      </motion.div>
    </main>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
