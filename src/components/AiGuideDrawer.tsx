import React, { useState } from 'react';
import { AiGuideState } from '../types';
import { Sparkles, X, Send, Compass, Lightbulb, GitFork, ArrowRight, BookOpen } from 'lucide-react';

interface AiGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeRegion?: string;
  onNavigateToCityByName?: (cityName: string) => void;
}

const PRESET_PROMPTS = [
  'Show me the future of AI',
  'Connect Bitcoin Privacy to History',
  'Summarize this region',
  'Show opposing viewpoints',
  'Suggest where to explore next',
  'Find experts in Quantum Tech',
];

export const AiGuideDrawer: React.FC<AiGuideDrawerProps> = ({
  isOpen,
  onClose,
  activeRegion = 'Global Atlas Map',
  onNavigateToCityByName,
}) => {
  const [guideState, setGuideState] = useState<AiGuideState>({
    isOpen,
    activeContextRegion: activeRegion,
    isLoading: false,
    messages: [
      {
        sender: 'ai',
        text: `Greetings, explorer. I am your ATLAS Spatial AI Guide. I am currently cartographing ${activeRegion}. Where shall we navigate today?`,
        keyTakeaways: [
          'Ideas on Atlas are mapped by conceptual proximity rather than chronological creation date.',
          'Cross-disciplinary expeditions yield 3.4x higher recall than linear feeds.',
          'You are currently near the Machine Intelligence & Sovereign Cryptography hubs.',
        ],
        suggestedNodes: ['Artificial Intelligence City', 'Bitcoin City', 'Design Harbor'],
        opposingViewpoints: [
          'Centralized AI infrastructure vs Open Weights Sovereignty',
          'Mathematical determinism vs Probabilistic emergent intelligence',
        ],
        recommendedTrail: ['Fundamentals', 'Architectures', 'Sovereignty', 'Future Horizons'],
        timestamp: 'Just now',
      },
    ],
  });

  const [inputQuery, setInputQuery] = useState('');

  if (!isOpen) return null;

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || guideState.isLoading) return;

    const userMessage = {
      sender: 'user' as const,
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGuideState((prev) => ({
      ...prev,
      isLoading: true,
      messages: [...prev.messages, userMessage],
    }));

    setInputQuery('');

    try {
      const response = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          region: activeRegion,
          action: 'guide',
        }),
      });

      const data = await response.json();

      const aiResponse = {
        sender: 'ai' as const,
        text: data.response || 'Coordinates calculated.',
        keyTakeaways: data.keyTakeaways,
        suggestedNodes: data.suggestedNodes,
        opposingViewpoints: data.opposingViewpoints,
        recommendedTrail: data.recommendedTrail,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setGuideState((prev) => ({
        ...prev,
        isLoading: false,
        messages: [...prev.messages, aiResponse],
      }));
    } catch (err) {
      console.error('AI Guide query error:', err);
      setGuideState((prev) => ({
        ...prev,
        isLoading: false,
        messages: [
          ...prev.messages,
          {
            sender: 'ai',
            text: `Re-anchoring spatial coordinates for "${queryText}". Exploring adjacent knowledge nodes reveals rich topological density.`,
            keyTakeaways: ['Ideas are connected spatially', 'Navigate node by node', 'Discover hidden synthesis'],
            suggestedNodes: ['Artificial Intelligence City', 'Open Source Valley'],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      }));
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex w-full max-w-lg flex-col border-r border-white/15 bg-[#070a10]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4 bg-blue-950/20">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              ATLAS AI Museum Guide
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] text-blue-300 font-mono">
                Gemini 3.6
              </span>
            </h3>
            <div className="text-[11px] font-mono text-white/50">
              Region: <span className="text-blue-400">{activeRegion}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {guideState.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Sender Label */}
            <div className="text-[10px] font-mono text-white/40 px-1">
              {msg.sender === 'user' ? 'You' : 'ATLAS AI Docent'} • {msg.timestamp}
            </div>

            {/* Bubble Content */}
            <div
              className={`rounded-2xl p-4 max-w-[92%] text-xs leading-relaxed space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-lg font-medium'
                  : 'bg-white/5 border border-white/10 text-white/90 backdrop-blur-md rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>

              {/* Key Takeaways */}
              {msg.keyTakeaways && msg.keyTakeaways.length > 0 && (
                <div className="rounded-xl bg-blue-950/40 border border-blue-500/20 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-400 uppercase">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Key Takeaways</span>
                  </div>
                  <ul className="space-y-1">
                    {msg.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-blue-100/90">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Nearby Nodes */}
              {msg.suggestedNodes && msg.suggestedNodes.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Suggested Nearby Nodes</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedNodes.map((nodeName, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigateToCityByName?.(nodeName)}
                        className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                      >
                        <span>{nodeName}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Opposing Viewpoints */}
              {msg.opposingViewpoints && msg.opposingViewpoints.length > 0 && (
                <div className="rounded-xl bg-amber-950/30 border border-amber-500/20 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>Dialectical Viewpoints</span>
                  </div>
                  <ul className="space-y-1">
                    {msg.opposingViewpoints.map((view, idx) => (
                      <li key={idx} className="text-[10px] text-amber-200/90 flex items-start gap-1">
                        <span className="text-amber-400 font-bold">↳</span>
                        <span>{view}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Knowledge Trail */}
              {msg.recommendedTrail && msg.recommendedTrail.length > 0 && (
                <div className="rounded-xl bg-purple-950/30 border border-purple-500/20 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-400 uppercase">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Synthesized Expedition Trail</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1 text-[10px] font-mono text-purple-200">
                    {msg.recommendedTrail.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="rounded bg-purple-500/20 px-2 py-0.5 border border-purple-500/30">
                          {idx + 1}. {step}
                        </span>
                        {idx < msg.recommendedTrail!.length - 1 && (
                          <span className="text-purple-400">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {guideState.isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 animate-pulse p-2">
            <Sparkles className="w-4 h-4" />
            <span>Calculating spatial coordinates & synthesizing docent tour...</span>
          </div>
        )}
      </div>

      {/* Presets Bar */}
      <div className="border-t border-white/10 p-2 bg-black/40 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {PRESET_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(prompt)}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/70 whitespace-nowrap hover:border-blue-500/40 hover:bg-blue-600/20 hover:text-white transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Query Input */}
      <div className="border-t border-white/10 p-3 bg-black/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(inputQuery);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask your AI Guide... e.g., 'Connect AI to Philosophy'"
            className="w-full rounded-full border border-white/20 bg-white/5 py-2.5 pl-4 pr-12 text-xs text-white placeholder-white/40 focus:border-blue-500 focus:bg-white/10 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || guideState.isLoading}
            className="absolute right-1.5 rounded-full bg-blue-600 p-2 text-white disabled:opacity-40 hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
