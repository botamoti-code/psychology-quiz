"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import { questions } from '@/data/questions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  // prevent crash if invalid index
  if (!question) return null;

  const isCorrect = selectedOption === question.correctAnswer;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/result?score=${score + (isCorrect ? 0 : 0)}`); 
      // score is already updated during handleOptionClick due to setScore
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-10 px-4 sm:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-violet-700 font-semibold bg-white/40 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <BrainCircuit size={20} />
            <span className="hidden sm:inline">心理学クイズ</span>
          </div>
          <div className="text-sm font-bold tracking-wide bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-5 py-2 rounded-full shadow-md shadow-violet-200">
            Q {currentIndex + 1} / {questions.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 sm:p-10 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                {question.text}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  let buttonVariant: any = 'outline';
                  let isSelected = selectedOption === index;
                  
                  if (isAnswered) {
                    if (index === question.correctAnswer) {
                      buttonVariant = 'primary';
                    } else if (isSelected && index !== question.correctAnswer) {
                      buttonVariant = 'secondary';
                    } else {
                      buttonVariant = 'ghost';
                    }
                  } else if (isSelected) {
                    buttonVariant = 'primary';
                  }

                  return (
                    <Button
                      key={index}
                      variant={buttonVariant}
                      fullWidth
                      className={cn(
                        "justify-start text-left h-auto py-4 px-6 rounded-2xl transition-all shadow-sm",
                        isAnswered && index === question.correctAnswer && "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-transparent shadow-emerald-200",
                        isAnswered && isSelected && index !== question.correctAnswer && "bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200",
                        !isAnswered && "hover:border-violet-400 hover:bg-violet-50/50"
                      )}
                      onClick={() => handleOptionClick(index)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-base sm:text-lg">{option}</span>
                        {isAnswered && index === question.correctAnswer && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="text-white shrink-0 ml-3" />
                          </motion.div>
                        )}
                        {isAnswered && isSelected && index !== question.correctAnswer && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <XCircle className="text-rose-500 shrink-0 ml-3" />
                          </motion.div>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50/90 to-fuchsia-50/90 border-violet-100 mt-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {isCorrect ? (
                      <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                        <CheckCircle2 size={28} />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                        <XCircle size={28} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn("text-xl sm:text-2xl font-bold mb-3", isCorrect ? "text-emerald-700" : "text-rose-700")}>
                      {isCorrect ? "正解！" : "残念..."}
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base bg-white/60 p-4 rounded-xl shadow-sm border border-white/40">
                      <span className="block font-bold text-violet-800 mb-1">【解説】</span>
                      {question.explanation.replace('【', '').replace('】', ' - ')}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={handleNext} 
                    className="rounded-full pl-8 pr-6 shadow-violet-200/50 py-6 text-lg"
                  >
                    {currentIndex < questions.length - 1 ? '次の問題へ' : '結果を見る'}
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
