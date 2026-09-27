import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Shield, Swords, Star, Award } from 'lucide-react';
import { TribalLanguage } from '../types';
import { gameAudio } from '../utils/gameAudio';

export interface KulMeromBoardGameProps {
  selectedLanguage: TribalLanguage;
  onAddScore: (points: number) => void;
}

// 7-node triangular graph representation
// 0: Apex
// 1: Mid-Left, 2: Mid-Center, 3: Mid-Right
// 4: Base-Left, 5: Base-Center, 6: Base-Right
interface NodePos {
  id: number;
  x: number;
  y: number;
  label: string;
}

const BOARD_NODES: NodePos[] = [
  { id: 0, x: 200, y: 40, label: 'शिखर (Apex)' },
  { id: 1, x: 80, y: 140, label: 'बायां मध्य' },
  { id: 2, x: 200, y: 140, label: 'केंद्र' },
  { id: 3, x: 320, y: 140, label: 'दायां मध्य' },
  { id: 4, x: 40, y: 240, label: 'बायां आधार' },
  { id: 5, x: 200, y: 240, label: 'मध्य आधार' },
  { id: 6, x: 360, y: 240, label: 'दायां आधार' }
];

// Connected graph edges
const ADJACENCY: Record<number, number[]> = {
  0: [1, 2, 3],
  1: [0, 2, 4, 5],
  2: [0, 1, 3, 5],
  3: [0, 2, 5, 6],
  4: [1, 5],
  5: [1, 2, 3, 4, 6],
  6: [3, 5]
};

// Jump lines for Tiger capture: [from, over, to]
const JUMP_LINES: [number, number, number][] = [
  [0, 2, 5],
  [5, 2, 0],
  [1, 2, 3],
  [3, 2, 1],
  [4, 5, 6],
  [6, 5, 4]
];

export const KulMeromBoardGame: React.FC<KulMeromBoardGameProps> = ({
  selectedLanguage,
  onAddScore
}) => {
  // Board state: mapping nodeId -> 'tiger' | 'goat' | null
  const [board, setBoard] = useState<(string | null)[]>([
    'tiger', null, null, null, null, null, null
  ]);
  const [goatsInHand, setGoatsInHand] = useState(4);
  const [goatsCaptured, setGoatsCaptured] = useState(0);
  const [turn, setTurn] = useState<'goat' | 'tiger'>('goat');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [winner, setWinner] = useState<'goat' | 'tiger' | null>(null);
  const [feedback, setFeedback] = useState<string>('बकरियां (मेरोम) बोर्ड पर रखें और बाघ को घेरें!');
  const [playMode, setPlayMode] = useState<'ai' | 'pass'>('ai');

  // Trigger AI move when it's tiger's turn in AI mode
  useEffect(() => {
    if (turn === 'tiger' && playMode === 'ai' && !winner) {
      const timer = setTimeout(() => {
        makeTigerAIMove();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [turn, playMode, winner, board]);

  const resetGame = () => {
    setBoard(['tiger', null, null, null, null, null, null]);
    setGoatsInHand(4);
    setGoatsCaptured(0);
    setTurn('goat');
    setSelectedNode(null);
    setWinner(null);
    setFeedback('नया खेल शुरू! खाली स्थान पर बकरी (मेरोम) रखें।');
  };

  const handleNodeClick = (nodeId: number) => {
    if (winner) return;

    // --- PHASE 1: GOAT PLACEMENT ---
    if (turn === 'goat' && goatsInHand > 0) {
      if (board[nodeId] !== null) {
        setFeedback('यह स्थान पहले से भरा हुआ है! खाली स्थान चुनें।');
        gameAudio.playClick();
        return;
      }
      // Place goat
      const newBoard = [...board];
      newBoard[nodeId] = 'goat';
      setBoard(newBoard);
      setGoatsInHand((h) => h - 1);
      gameAudio.playBoardMove();
      setFeedback(`बकरी रखी गई। ${goatsInHand - 1 > 0 ? `शेष बकरियां: ${goatsInHand - 1}` : 'सभी बकरियां रख दी गईं!'}`);

      // Check if tiger is already trapped
      if (isTigerTrapped(newBoard)) {
        setWinner('goat');
        onAddScore(60);
        gameAudio.playSuccess();
        setFeedback('🎉 बकरियों ने बाघ को घेर लिया! बकरियों की जीत!');
      } else {
        setTurn('tiger');
      }
      return;
    }

    // --- PHASE 2: MOVEMENT ---
    if (turn === 'goat' && goatsInHand === 0) {
      // Select a goat to move
      if (board[nodeId] === 'goat') {
        setSelectedNode(nodeId);
        gameAudio.playClick();
        setFeedback('अब किसी खाली जुड़े हुए स्थान पर क्लिक करें।');
        return;
      }

      // Move selected goat to an empty adjacent node
      if (selectedNode !== null && board[nodeId] === null) {
        if (ADJACENCY[selectedNode]?.includes(nodeId)) {
          const newBoard = [...board];
          newBoard[selectedNode] = null;
          newBoard[nodeId] = 'goat';
          setBoard(newBoard);
          setSelectedNode(null);
          gameAudio.playBoardMove();

          if (isTigerTrapped(newBoard)) {
            setWinner('goat');
            onAddScore(60);
            gameAudio.playSuccess();
            setFeedback('🎉 बकरियों ने बाघ को घेर लिया! बकरियों की विजय!');
          } else {
            setTurn('tiger');
            setFeedback('बाघ की बारी...');
          }
        } else {
          setFeedback('अवैध चाल! केवल सीधी रेखा से जुड़े बिंदु पर जा सकते हैं।');
          gameAudio.playTryAgain();
        }
      }
    }

    // Pass and play mode for Tiger
    if (turn === 'tiger' && playMode === 'pass') {
      const tigerPos = board.indexOf('tiger');
      if (tigerPos === -1) return;

      // Check adjacent normal move
      if (board[nodeId] === null && ADJACENCY[tigerPos]?.includes(nodeId)) {
        const newBoard = [...board];
        newBoard[tigerPos] = null;
        newBoard[nodeId] = 'tiger';
        setBoard(newBoard);
        gameAudio.playBoardMove();
        setTurn('goat');
        setFeedback('बकरी की चाल...');
        return;
      }

      // Check jump capture
      const jump = JUMP_LINES.find(([from, over, to]) => from === tigerPos && to === nodeId);
      if (jump && board[jump[1]] === 'goat' && board[jump[2]] === null) {
        const newBoard = [...board];
        newBoard[tigerPos] = null;
        newBoard[jump[1]] = null; // Captured!
        newBoard[nodeId] = 'tiger';
        setBoard(newBoard);
        setGoatsCaptured((c) => c + 1);
        gameAudio.playBoardCapture();

        if (goatsCaptured + 1 >= 2) {
          setWinner('tiger');
          setFeedback('बाघ ने २ बकरियों का शिकार किया! बाघ जीत गया!');
        } else {
          setTurn('goat');
          setFeedback('बाघ ने एक बकरी पकड़ी! बकरी की चाल...');
        }
      }
    }
  };

  // AI Logic for Tiger
  const makeTigerAIMove = () => {
    const tigerPos = board.indexOf('tiger');
    if (tigerPos === -1 || winner) return;

    // 1. Try Jump Capture first
    const possibleJump = JUMP_LINES.find(
      ([from, over, to]) => from === tigerPos && board[over] === 'goat' && board[to] === null
    );

    if (possibleJump) {
      const [, over, to] = possibleJump;
      const newBoard = [...board];
      newBoard[tigerPos] = null;
      newBoard[over] = null;
      newBoard[to] = 'tiger';
      setBoard(newBoard);
      const newCaptures = goatsCaptured + 1;
      setGoatsCaptured(newCaptures);
      gameAudio.playBoardCapture();

      if (newCaptures >= 2) {
        setWinner('tiger');
        setFeedback('बाघ ने २ बकरियों का शिकार किया! बाघ जीत गया!');
      } else {
        setTurn('goat');
        setFeedback('बाघ ने एक बकरी पकड़ी! अब बकरी की चाल...');
      }
      return;
    }

    // 2. Otherwise try adjacent empty move
    const emptyAdjacent = (ADJACENCY[tigerPos] || []).filter((adj) => board[adj] === null);
    if (emptyAdjacent.length > 0) {
      // Pick randomly among empty nodes
      const nextPos = emptyAdjacent[Math.floor(Math.random() * emptyAdjacent.length)];
      const newBoard = [...board];
      newBoard[tigerPos] = null;
      newBoard[nextPos] = 'tiger';
      setBoard(newBoard);
      gameAudio.playBoardMove();
      setTurn('goat');
      setFeedback('बाघ चला। अब बकरियों की चाल...');
    } else {
      // Tiger is trapped!
      setWinner('goat');
      onAddScore(60);
      gameAudio.playSuccess();
      setFeedback('🎉 बकरियों ने बाघ को पूरी तरह घेर लिया! बकरियां जीतीं!');
    }
  };

  const isTigerTrapped = (currentBoard: (string | null)[]) => {
    const tigerPos = currentBoard.indexOf('tiger');
    if (tigerPos === -1) return false;
    // Check if any adjacent node is empty
    const hasEmptyAdj = (ADJACENCY[tigerPos] || []).some((adj) => currentBoard[adj] === null);
    if (hasEmptyAdj) return false;
    // Check if any jump is possible
    const hasJump = JUMP_LINES.some(
      ([from, over, to]) => from === tigerPos && currentBoard[over] === 'goat' && currentBoard[to] === null
    );
    return !hasJump;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-rose-950">
            कुल-मेरोम (Kul-Merom) &bull; बाघ और बकरी पारंपरिक रणनीति बोर्ड खेल
          </div>
          <div className="text-xs text-rose-800 mt-0.5">
            बकरियां (मेरोम) मिलकर बाघ (कुल) को घेरने का प्रयास करती हैं। बाघ छलांग लगाकर बकरियों का शिकार करता है!
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>पुनः शुरू करें</span>
        </button>
      </div>

      {/* Mode Switcher & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 p-2 rounded-2xl text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setPlayMode('ai'); resetGame(); }}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              playMode === 'ai' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            🤖 AI बाघ के विरुद्ध
          </button>
          <button
            onClick={() => { setPlayMode('pass'); resetGame(); }}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              playMode === 'pass' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            👥 २ खिलाड़ी (Pass & Play)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-900">
            🐐 शेष बकरियां: <span className="font-mono">{goatsInHand}</span>
          </span>
          <span className="text-rose-900">
            🐅 शिकार हुई: <span className="font-mono">{goatsCaptured} / २</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800">
            {turn === 'goat' ? '🐐 बकरी की बारी' : '🐅 बाघ की बारी'}
          </span>
        </div>
      </div>

      {/* Interactive SVG Board Canvas */}
      <div className="relative p-4 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 flex flex-col items-center justify-center overflow-hidden min-h-[290px]">
        <svg viewBox="0 0 400 280" className="w-full max-w-md h-auto select-none">
          {/* Board Grid Lines */}
          <line x1="200" y1="40" x2="40" y2="240" stroke="#78350f" strokeWidth="4" />
          <line x1="200" y1="40" x2="360" y2="240" stroke="#78350f" strokeWidth="4" />
          <line x1="40" y1="240" x2="360" y2="240" stroke="#78350f" strokeWidth="4" />
          {/* Middle horizontal line */}
          <line x1="80" y1="140" x2="320" y2="140" stroke="#78350f" strokeWidth="3" />
          {/* Vertical spine line */}
          <line x1="200" y1="40" x2="200" y2="240" stroke="#78350f" strokeWidth="3" />
          {/* Cross diagonals */}
          <line x1="80" y1="140" x2="200" y2="240" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="320" y1="140" x2="200" y2="240" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />

          {/* Interactive Nodes */}
          {BOARD_NODES.map((node) => {
            const occupant = board[node.id];
            const isSelected = selectedNode === node.id;
            const isConnectedToSelected = selectedNode !== null && ADJACENCY[selectedNode]?.includes(node.id) && occupant === null;

            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className="cursor-pointer group"
              >
                {/* Node Outer Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 26 : isConnectedToSelected ? 24 : 20}
                  fill={
                    occupant === 'tiger'
                      ? '#ffe4e6'
                      : occupant === 'goat'
                      ? '#dcfce7'
                      : isConnectedToSelected
                      ? '#fef08a'
                      : '#ffffff'
                  }
                  stroke={
                    occupant === 'tiger'
                      ? '#e11d48'
                      : occupant === 'goat'
                      ? '#16a34a'
                      : isConnectedToSelected
                      ? '#ca8a04'
                      : '#78350f'
                  }
                  strokeWidth={isSelected || isConnectedToSelected ? 4 : 2}
                  className="transition-all duration-150"
                />

                {/* Node Icon / Piece */}
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fontSize={occupant ? "20" : "11"}
                  fontWeight="bold"
                  fill={occupant ? "#000000" : "#a8a29e"}
                  className="select-none pointer-events-none"
                >
                  {occupant === 'tiger' ? '🐅' : occupant === 'goat' ? '🐐' : '●'}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Feedback Message Banner */}
        <div className="mt-2 p-2 bg-slate-900/90 text-white rounded-xl text-xs font-bold text-center w-full max-w-md">
          {feedback}
        </div>
      </div>

      {/* FLN Educational Note */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-rose-700" />
          <span>FLN कौशल: स्थानिक तर्क (Spatial Reasoning), समस्या समाधान व ज्यामितीय दिशा बोध</span>
        </span>
        <span className="font-bold text-rose-900">
          कुल-मेरोम &bull; आदिवासी रणनीति खेल
        </span>
      </div>
    </div>
  );
};
