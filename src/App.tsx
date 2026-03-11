/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RotateCcw, Send, Share2 } from 'lucide-react';
import { Question, DISCType, Scores, AnalysisResult } from './types';

const QUESTIONS: Question[] = [
  { title: "1. 朋友認為您是一個...", options: { D: "自信十足，霸氣十足的人", I: "熱心、樂於助人、受歡迎的人", S: "和藹可親、不與人爭的人", C: "有條不紊的完美主義者" } },
  { title: "2. 在團體活動中，您傾向...", options: { D: "勇於接受挑戰，敢於冒險", I: "展現樂觀、熱情與活力", S: "保持溫和謙和，安靜聆聽", C: "冷靜思考，採取謹慎行動" } },
  { title: "3. 什麼樣的環境能鼓舞您？", options: { D: "具領導地位，能決定重要事項", I: "同事相處愉快，頗受歡迎", S: "在穩定中求發展，節奏固定", C: "講求品質、重視效率與精確" } },
  { title: "4. 在壓力下，您最擔憂的是...", options: { D: "被他人利用或失去掌控", I: "失去社交圈的認同與接納", S: "面對衝突與巨大的環境改變", C: "遭受批評或處理不精確的事務" } },
  { title: "5. 做決策時，您的風格是...", options: { D: "直接了當，「我決定就行了」", I: "顧及感受，「大家開心最重要」", S: "配合大家，「我沒意見，隨大家」", C: "理智分析，「再研究比較一下數據」" } },
  { title: "6. 在團隊合作中，您扮演的角色是...", options: { D: "重實際、有膽識，追求成果", I: "惹人注目、充滿精力與創意", S: "忠實的聽眾，默默支持夥伴", C: "分析所有提案，確保合乎邏輯" } },
  { title: "7. 意見分歧時，您通常會...", options: { D: "強烈表達觀點，主導局勢", I: "積極溝通，嘗試協調與說服", S: "隨遇而安，容易讓步避免衝突", C: "保持冷靜，找尋事實依據辯論" } },
  { title: "8. 購物時，您的決策模式是...", options: { D: "心中已有定見，快速購買", I: "受店員態度或當下心情影響", S: "傾向在熟悉的店家或品牌購買", C: "仔細比價，考量品質與功能比例" } },
  { title: "9. 處理事情最核心的考量是...", options: { D: "結果與效率 (What)", I: "人的感受與共鳴 (Who)", S: "執行過程的穩定 (How)", C: "背後的道理與正確性 (Why)" } },
  { title: "10. 哪一項最符合您的溝通特點？", options: { D: "注重效率、數字與客觀證據", I: "重感覺、看心情、重視人脈關係", S: "溫和地表達，不希望引起衝突", C: "冷靜且愛分析，理多於情" } },
  { title: "11. 面對全新領域的學習，您會...", options: { D: "直接行動，從實踐中修正", I: "找伴共學，在互動中吸收", S: "需要清晰的指導與明確步驟", C: "先研讀完整的資料與說明書" } },
  { title: "12. 對於生活的理想節奏是...", options: { D: "充滿競爭、具備成就感的快節奏", I: "充滿驚喜、多采多姿的流動節奏", S: "安靜穩定、具有安全感的慢節奏", C: "精確安排、一切盡在掌控的節奏" } },
  { title: "13. 您的時間觀念通常表現為...", options: { D: "時間即成就，不容許浪費", I: "常因為投入有趣事物而忘了時間", S: "不喜歡被催促，照自己的節奏走", C: "嚴格安排，甚至提前規劃所有細節" } },
  { title: "14. 別人對您的第一印象通常是...", options: { D: "果斷、有威嚴的領袖", I: "風趣、熱情的交際好手", S: "可靠、體貼的親切夥伴", C: "冷靜、理性的專業職人" } },
  { title: "15. 當問題發生時，您的反應是...", options: { D: "迅速切入核心，立即解決", I: "尋求共識，希望大家一起思考", S: "循序漸進，確保每個細節都妥當", C: "深思熟慮，找出最精確的源頭" } },
  { title: "16. 您在組織中的理想定位是...", options: { D: "開疆闢土的指揮官", I: "凝聚士氣的啦啦隊", S: "守護和諧的後勤者", C: "確保品質的糾察官" } },
  { title: "17. 您的服裝與形象風格...", options: { D: "俐亮專業，展現自信氣勢", I: "時尚亮眼，隨心情變換流行", S: "舒適自然，給人溫暖親切感", C: "整齊細緻，展現對品質的追求" } },
  { title: "18. 當您身心疲累時，如何充電？", options: { D: "尋求勝負感的運動或挑戰", I: "參與社交活動，與人交流能量", S: "待在安靜環境，享受沈穩時光", C: "整理個人空間或鑽研興趣愛好" } },
  { title: "19. 您最核心的人生動機是...", options: { D: "成就感與對環境的掌控權", I: "獲得他人的讚賞與心理認同", S: "維持生活的平和與關係和諧", C: "達成知識的正確性與極致完美" } },
  { title: "20. 面對突發衝突，您的反應是...", options: { D: "迎頭應戰，爭論是非對錯", I: "用幽默化解，轉移尷尬焦點", S: "先避開現場，沈澱情緒後再說", C: "擺出數據與邏輯，據理力爭" } }
];

const ANALYSIS: Record<DISCType, AnalysisResult> = {
  D: { animal: "Dominance", desc: "您是天生的決策者。果敢且充滿目標感，在壓力下依然能迅速行動，追求卓越成就是您的生命底色。" },
  I: { animal: "Influence", desc: "您擁有驚人的感染力。熱情、友善且擅長交際，能用樂觀啟發團隊，是天生的溝通大師。" },
  S: { animal: "Steadiness", desc: "您是溫暖的守護者。展現出耐心與極高的同理心。穩定、可靠，是夥伴心中最安穩的支柱。" },
  C: { animal: "Compliance", desc: "您追求邏輯與精確。凡事有條不紊，具備深度分析能力，對品質與細節有著絕不妥協的專業堅持。" }
};

type AppState = 'start' | 'quiz' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ D: 0, I: 0, S: 0, C: 0 });

  const progress = useMemo(() => Math.round((currentIndex / QUESTIONS.length) * 100), [currentIndex]);

  const sortedResults = useMemo(() => {
    return (Object.keys(scores) as DISCType[])
      .map(key => ({ key, score: scores[key] }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const topType = sortedResults[0].key;

  const handleNext = (type: DISCType) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState('result');
    }
  };

  const handleReset = () => {
    setState('start');
    setCurrentIndex(0);
    setScores({ D: 0, I: 0, S: 0, C: 0 });
  };

  const handleSendToLine = () => {
    const msg = `【DISC 性格分析報告】\n\n核心特質：${ANALYSIS[topType].animal}\n\n分數分佈：\n- D (支配型): ${scores.D}\n- I (影響型): ${scores.I}\n- S (穩定型): ${scores.S}\n- C (謹慎型): ${scores.C}\n\n期待與您進一步探討此結果。`;
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(msg)}`);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen p-8 flex flex-col font-sans selection:bg-coffee/30">
      <header className="text-center mt-10 mb-16">
        <h1 className="serif text-4xl tracking-[0.2em] uppercase text-chanel">Insight</h1>
        <div className="h-[1px] w-12 bg-stone-800 mx-auto mt-4"></div>
        <p className="text-[10px] tracking-[0.3em] uppercase mt-4 text-stone-400">Behavioral Analysis</p>
      </header>

      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {state === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-grow flex flex-col justify-center text-center"
            >
              <h2 className="text-xl font-light tracking-widest mb-10 italic text-stone-700">探索您的內在原型</h2>
              <button
                onClick={() => setState('quiz')}
                className="group relative py-5 border border-stone-800 text-[11px] tracking-[0.4em] uppercase overflow-hidden transition-all hover:text-white"
              >
                <span className="relative z-10">Start Analysis</span>
                <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow"
            >
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4 serif text-2xl">
                  <span className="text-chanel">
                    {currentIndex + 1}
                    <span className="text-xs text-stone-400 ml-1 font-sans">/{QUESTIONS.length}</span>
                  </span>
                </div>
                <div className="w-full h-[1px] bg-stone-200">
                  <motion.div
                    className="h-[1px] bg-stone-800"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <h3 className="mt-8 text-lg font-medium leading-relaxed tracking-tight text-stone-800">
                  {QUESTIONS[currentIndex].title}
                </h3>
              </div>

              <div className="space-y-4">
                {(Object.entries(QUESTIONS[currentIndex].options) as [DISCType, string][]).map(([key, text]) => (
                  <button
                    key={key}
                    onClick={() => handleNext(key)}
                    className="btn-coffee w-full text-left p-5 text-sm tracking-wide rounded-sm shadow-sm hover:shadow-md hover:brightness-95 transition-all flex justify-between items-center group"
                  >
                    <span>{text}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col"
            >
              <div className="chanel-card p-8 text-center shadow-sm relative overflow-hidden">
                <div className="serif text-3xl mb-1 text-chanel">{ANALYSIS[topType].animal}</div>
                <div className="text-[10px] tracking-[0.3em] text-stone-400 mb-6 uppercase italic">The Core Essence</div>
                
                <p className="text-xs leading-loose text-stone-600 text-left border-t border-stone-50 pt-6 mb-8">
                  {ANALYSIS[topType].desc}
                </p>

                <div className="space-y-5">
                  {sortedResults.map((res) => (
                    <div key={res.key} className="flex items-center text-[10px] tracking-widest">
                      <span className={`w-6 font-bold ${res.key === topType ? 'text-stone-800' : 'text-stone-300'}`}>
                        {res.key}
                      </span>
                      <div className="flex-grow h-[1px] bg-stone-100 mx-4 relative">
                        <motion.div
                          className={`h-[1px] ${res.key === topType ? 'bg-stone-800' : 'bg-stone-300'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(res.score / QUESTIONS.length) * 100}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                      <span className="w-4 text-right text-stone-500">{res.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  onClick={handleSendToLine}
                  className="w-full py-4 bg-stone-900 text-white text-[11px] tracking-[0.3em] uppercase active:opacity-80 hover:bg-stone-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-3 h-3" />
                  Send Results to Analysis
                </button>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-4 border border-stone-200 text-stone-500 text-[10px] tracking-[0.3em] uppercase hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restart
                  </button>
                  <button
                    className="flex-1 py-4 border border-stone-200 text-stone-500 text-[10px] tracking-[0.3em] uppercase hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-3 h-3" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-10 text-center text-[9px] text-stone-300 tracking-[0.3em] uppercase">
        © 2026 Sophisticated Personality Analysis
      </footer>
    </div>
  );
}
