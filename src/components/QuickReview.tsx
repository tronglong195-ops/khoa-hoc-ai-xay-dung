import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface Flashcard {
  question: string;
  answer: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuickReviewProps {
  summaryPoints: string[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  sessionId: string;
}

export const QuickReview: React.FC<QuickReviewProps> = ({
  summaryPoints,
  flashcards,
  quiz,
  sessionId,
}) => {
  // Flashcard flip states
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>(() => {
    try {
      const saved = localStorage.getItem(`quiz_answers_${sessionId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`quiz_submitted_${sessionId}`) === 'true';
    } catch {
      return false;
    }
  });

  const handleSelectAnswer = (qIndex: number, oIndex: number) => {
    if (submitted) return;
    const updated = { ...selectedAnswers, [qIndex]: oIndex };
    setSelectedAnswers(updated);
    try {
      localStorage.setItem(`quiz_answers_${sessionId}`, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    try {
      localStorage.setItem(`quiz_submitted_${sessionId}`, 'true');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleResetQuiz = () => {
    setSubmitted(false);
    setSelectedAnswers({});
    try {
      localStorage.removeItem(`quiz_answers_${sessionId}`);
      localStorage.removeItem(`quiz_submitted_${sessionId}`);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="mt-12 pt-8 border-t-2 border-[#D8D4C8] dark:border-[#1C3B5E] space-y-12">
      {/* 1. Tóm tắt nhanh */}
      <section className="bg-amber-50/60 dark:bg-[#0D233A] border border-amber-200 dark:border-amber-900/50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F26B1D] text-white rounded">
            Lớp bổ trợ
          </span>
          <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white">
            Tóm tắt nhanh kiến thức cốt lõi
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">
          * Rút gọn trực tiếp từ tài liệu gốc phía trên, dùng để ôn tập nhanh trước khi vào phòng lab.
        </p>
        <ul className="space-y-2.5">
          {summaryPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm md:text-base text-gray-800 dark:text-gray-200">
              <span className="font-mono text-[#F26B1D] font-bold">0{index + 1}.</span>
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Flashcards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F26B1D]"></span>
              Flashcards ghi nhớ (Nhấp thẻ để lật)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              5 khái niệm quan trọng nhất cần nắm vững
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card, idx) => {
            const isFlipped = flippedIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                className={`cursor-pointer min-h-[160px] p-5 rounded-lg border transition-all duration-300 flex flex-col justify-between select-none ${
                  isFlipped
                    ? 'bg-[#0B1E33] text-white border-[#F26B1D] shadow-md'
                    : 'bg-white dark:bg-[#122B45] text-gray-800 dark:text-gray-200 border-[#D8D4C8] dark:border-[#1C3B5E] hover:border-[#F26B1D]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="font-mono">THẺ #{idx + 1}</span>
                    <span className="text-[11px] underline">
                      {isFlipped ? 'Đáp án' : 'Câu hỏi'}
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-medium leading-snug">
                    {isFlipped ? card.answer : card.question}
                  </p>
                </div>
                <div className="text-right text-[11px] text-gray-400 pt-3 border-t border-gray-200/20">
                  {isFlipped ? 'Chạm để xem câu hỏi' : 'Chạm để xem giải thích'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Quiz */}
      <section className="bg-white dark:bg-[#0D233A] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D8D4C8] dark:border-[#1C3B5E]">
          <div>
            <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              Trắc nghiệm nhanh (5 Câu hỏi)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Kiểm tra khả năng tiếp thu sau khi đọc tài liệu
            </p>
          </div>
          {submitted && (
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold px-3 py-1 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 rounded border border-green-300">
                Điểm: {calculateScore()} / {quiz.length} ({Math.round((calculateScore() / quiz.length) * 100)}%)
              </div>
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Làm lại
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {quiz.map((q, qIdx) => {
            const userAnswer = selectedAnswers[qIdx];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div key={qIdx} className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
                    Q{qIdx + 1}
                  </span>
                  <h4 className="font-semibold text-sm md:text-base text-[#0B1E33] dark:text-gray-100 leading-snug">
                    {q.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-2 pl-7">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAnswer === oIdx;
                    let optionStyle = 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#142D4B]';

                    if (submitted) {
                      if (oIdx === q.correctAnswer) {
                        optionStyle = 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#F26B1D] bg-orange-50/50 dark:bg-[#18395B] text-[#F26B1D] font-medium';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectAnswer(qIdx, oIdx)}
                        className={`text-left p-3 rounded-md border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && oIdx === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="pl-7 text-xs bg-gray-50 dark:bg-[#142D4B] p-3 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-[#F26B1D]">Giải thích: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < quiz.length}
              className={`px-5 py-2 rounded font-semibold text-sm transition-colors ${
                Object.keys(selectedAnswers).length === quiz.length
                  ? 'bg-[#F26B1D] text-white hover:bg-orange-600 shadow-md'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Nộp bài kiểm tra ({Object.keys(selectedAnswers).length}/{quiz.length})
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
