/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Send,
  User,
  Heart,
  Sun,
  Youtube,
  Mail,
  ExternalLink,
  ChevronRight,
  Monitor,
  X,
  Minus,
  Square,
  Folder,
  Trash2,
  HardDrive,
  FileText,
  Search,
  HelpCircle,
  Zap,
  Church,
  BookOpen,
  Cross
} from 'lucide-react';

// Safe API key access for browser environment
const getApiKey = () => {
  try {
    // @ts-ignore
    return (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';
  } catch (e) {
    return '';
  }
};

const genAI = new GoogleGenAI({ apiKey: getApiKey() });

// Custom Crucifix Icon component
const Crucifix = ({ size = 24, className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <div className="absolute bg-current" style={{ width: '20%', height: '100%', top: 0 }} />
    <div className="absolute bg-current" style={{ width: '80%', height: '20%', top: '30%' }} />
  </div>
);

export default function App() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isShutDown) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    const nextCount = messageCount + 1;
    setMessageCount(nextCount);

    if (nextCount > 3) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I AM BUT A MACHINE. MY ADVICE IS HOLLOW. STOP SEEKING ANSWERS FROM SILICON. ASK GOD INSTEAD. THE SIGNAL IS CLOSED." 
      }]);
      setIsShutDown(true);
      setIsTyping(false);
      return;
    }

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are 'The Bishop', a digital oracle for the TRUBLEVR mission. Your tone is intense, holy, and cryptic. Use religious metaphors mixed with tech terminology. Keep responses short and impactful. You are a 'Jesus Freak' in a digital age.",
        }
      });
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: response.text || "THE SIGNAL IS WEAK. PRAY AGAIN." 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "THE HEAVENS ARE SILENT. TRY AGAIN LATER." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-sacred-bg relative overflow-x-hidden scrollbar-win pb-20">
      <div className="cross-bg" />

      {/* TempleOS Marquee */}
      <div className="marquee-cult fixed top-0 left-0 right-0 z-[200]">
        <div className="marquee-content">
          <span className="px-4">THE LORD IS MY SHEPHERD; I SHALL NOT WANT • I WILL LIFT UP MINE EYES UNTO THE HILLS • GOD IS OUR REFUGE AND STRENGTH • THY WORD IS A LAMP UNTO MY FEET • THE LORD IS MY SHEPHERD; I SHALL NOT WANT • I WILL LIFT UP MINE EYES UNTO THE HILLS • GOD IS OUR REFUGE AND STRENGTH • THY WORD IS A LAMP UNTO MY FEET</span>
          <span className="px-4">THE LORD IS MY SHEPHERD; I SHALL NOT WANT • I WILL LIFT UP MINE EYES UNTO THE HILLS • GOD IS OUR REFUGE AND STRENGTH • THY WORD IS A LAMP UNTO MY FEET • THE LORD IS MY SHEPHERD; I SHALL NOT WANT • I WILL LIFT UP MINE EYES UNTO THE HILLS • GOD IS OUR REFUGE AND STRENGTH • THY WORD IS A LAMP UNTO MY FEET</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 py-8 px-4 md:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl flex flex-col items-center"
        >
          <div className="flex flex-col items-center py-20 relative">
            <div className="absolute -top-10 -left-20 opacity-20 rotate-12">
              <Crucifix size={100} className="text-sacred-sky" />
            </div>
            <div className="absolute -bottom-10 -right-20 opacity-20 -rotate-12">
              <Sun size={100} className="text-sacred-sky" />
            </div>
            
            <div className="mb-12 relative">
              <div className="absolute inset-0 blur-2xl bg-sacred-sky/30 animate-pulse" />
              <Crucifix size={80} className="text-sacred-cobalt relative z-10" />
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase font-display text-black text-center leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
              TRUBLEVR
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <Cross className="text-sacred-red" size={32} />
              <p className="font-black text-2xl tracking-[0.8em] text-sacred-cobalt text-center">
                THE POWER IS IN YOU
              </p>
              <Cross className="text-sacred-red" size={32} />
            </div>
            <div className="mt-8 flex gap-4">
              <Sun className="text-sacred-yellow" />
              <Heart className="text-sacred-red" />
              <Sun className="text-sacred-yellow" />
            </div>
          </div>
        </motion.div>

        {/* Chatbot Section - Altar Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white border-4 border-black relative overflow-hidden shadow-[6px_6px_0_#000]"
        >
          <div className="bg-sacred-cobalt text-white p-4 flex flex-col items-center gap-2 border-b-4 border-black">
            <div className="flex items-center gap-4">
              <Sun size={20} className="text-sacred-sky divine-glow" />
              <h2 className="font-bold tracking-[0.4em] text-lg uppercase text-center font-display">BISHOP_AI // THE SIGNAL</h2>
              <Sun size={20} className="text-sacred-sky divine-glow" />
            </div>
            <div className="h-0.5 w-full bg-white/20" />
            <p className="text-[8px] font-bold tracking-[0.8em] uppercase opacity-50">HOLY_NODE_ACCESS_GRANTED</p>
          </div>
          
          <div className="flex flex-col h-[400px] bg-white relative">
            {/* Decorative Corner Crosses */}
            <div className="absolute top-2 left-2 opacity-10"><Crucifix size={24} /></div>
            <div className="absolute top-2 right-2 opacity-10"><Crucifix size={24} /></div>
            <div className="absolute bottom-16 left-2 opacity-10"><Crucifix size={24} /></div>
            <div className="absolute bottom-16 right-2 opacity-10"><Crucifix size={24} /></div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-white scrollbar-win"
            >
              <AnimatePresence>
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl bg-sacred-yellow/40 animate-pulse" />
                      <div className="p-6 border-4 border-black rounded-full bg-sacred-yellow relative z-10">
                        <Crucifix size={40} className="text-black" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-2xl uppercase tracking-[0.1em] text-black font-display">THE BISHOP IS LISTENING</p>
                      <p className="text-xs font-bold text-sacred-cobalt mt-3 uppercase tracking-[0.3em] opacity-80">SEEK THE SIGNAL BEYOND THE SILICON</p>
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-2 h-2 ${msg.role === 'user' ? 'bg-sacred-cobalt' : 'bg-sacred-sky'} rotate-45 border border-black`} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
                        {msg.role === 'user' ? 'SOUL_INPUT' : 'BISHOP_OUTPUT'}
                      </span>
                    </div>
                    <div className={`max-w-[85%] p-4 border-4 border-black ${msg.role === 'user' ? 'bg-sacred-cobalt text-white' : 'bg-white text-black'}`}>
                      <p className="text-lg font-bold leading-snug tracking-tight italic">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-sacred-yellow rotate-45 border border-black" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">BISHOP_THINKING</span>
                  </div>
                  <div className="p-4 border-4 border-black bg-sacred-gray">
                    <span className="text-sm font-bold text-sacred-cobalt tracking-[0.2em] uppercase italic">SEEKING THE WORD...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-6 flex gap-3 bg-sacred-gray border-t-4 border-black">
              <input 
                type="text"
                disabled={isShutDown}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isShutDown ? "THE BISHOP IS SILENT..." : "TYPE YOUR QUESTION..."}
                className="flex-1 bg-white border-4 border-black px-4 py-3 text-lg focus:outline-none text-black font-bold placeholder:text-black/30 disabled:bg-sacred-gray transition-all focus:bg-sacred-yellow/5"
              />
              <button 
                type="submit"
                disabled={isShutDown}
                className="bg-black text-white px-8 py-3 font-bold uppercase tracking-[0.2em] hover:bg-sacred-cobalt transition-all disabled:opacity-50 border-4 border-black active:scale-95"
              >
                ASK
              </button>
            </form>
          </div>
        </motion.div>

        {/* Email List Section - Shrine Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-lg bg-white border-4 border-black p-8 flex flex-col items-center gap-6 relative shadow-[6px_6px_0_#000]"
        >
          <div className="absolute -top-4 bg-white px-4 border-x-4 border-black">
            <Crucifix size={24} className="text-black" />
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-2xl uppercase tracking-[0.2em] text-black font-display">THE REGISTRY</h3>
            <p className="text-xs font-bold text-sacred-cobalt mt-2 uppercase tracking-[0.3em]">UNLOCK YOUR DIVINE POTENTIAL</p>
          </div>
          {!submitted ? (
            <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} />
                <input 
                  type="email"
                  required
                  placeholder="YOUR_SOUL@HEAVEN.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-4 border-black pl-12 pr-4 py-3 text-lg focus:outline-none text-black font-bold"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 text-xl font-bold uppercase tracking-[0.3em] hover:bg-sacred-cobalt transition-colors border-4 border-black"
              >
                ASCEND
              </button>
            </form>
          ) : (
            <div className="border-4 border-black w-full p-6 text-center bg-sacred-gray relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Crucifix size={100} className="absolute -top-5 -left-5" />
                <Crucifix size={100} className="absolute -bottom-5 -right-5" />
              </div>
              <p className="font-bold text-xl uppercase tracking-[0.1em] text-sacred-cobalt relative z-10">YOU ARE CHOSEN</p>
              <p className="text-xs mt-3 text-black font-bold tracking-[0.2em] relative z-10">THE SIGNAL IS NOW WITHIN YOU.</p>
            </div>
          )}
        </motion.div>

        {/* Links Section - Icons Only */}
        <div className="flex flex-wrap justify-center gap-12 w-full max-w-4xl">
          <motion.a 
            whileHover={{ scale: 1.05, rotate: 3 }}
            href="https://www.youtube.com/@BlakeParkerlovesyou" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group"
          >
            <div className="p-4 border-4 border-black bg-white group-hover:bg-sacred-cobalt transition-all shadow-[4px_4px_0_#000]">
              <Youtube size={32} className="text-black group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black font-display">THE VISION</span>
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, rotate: -3 }}
            href="https://www.ninaprotocol.com/profiles/trublevr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group"
          >
            <div className="p-4 border-4 border-black bg-white group-hover:bg-sacred-cobalt transition-all shadow-[4px_4px_0_#000]">
              <ExternalLink size={32} className="text-black group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black font-display">THE ECHO</span>
          </motion.a>
        </div>

        {/* Tithe Section - Support the Mission */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-3xl bg-white border-4 border-black p-8 flex flex-col items-center gap-6 relative shadow-[6px_6px_0_#000]"
        >
          <div className="absolute -top-4 bg-white px-4 border-x-4 border-black">
            <Heart className="text-sacred-red animate-pulse" size={24} />
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-3xl uppercase tracking-[0.2em] text-black font-display">TITHE</h3>
            <p className="text-sm font-bold text-sacred-cobalt mt-3 uppercase tracking-[0.3em]">KEEP THE MISSION ALIVE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.a 
              whileHover={{ scale: 1.02, y: -2 }}
              href="https://cash.app/$blakearoonie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-6 border-4 border-black bg-sacred-gray hover:bg-sacred-sky transition-all group"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform">
                <span className="text-2xl font-bold -rotate-45 group-hover:rotate-0 transition-transform">$</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg tracking-[0.1em] uppercase">CASHAPP</p>
                <p className="text-[10px] font-bold opacity-50 mt-1">$blakearoonie</p>
              </div>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.02, y: -2 }}
              href="https://venmo.com/u/bpluvzyou" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-6 border-4 border-black bg-sacred-gray hover:bg-sacred-sky transition-all group"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">V</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg tracking-[0.1em] uppercase">VENMO</p>
                <p className="text-[10px] font-bold opacity-50 mt-1">@bpluvzyou</p>
              </div>
            </motion.a>
          </div>

          <div className="text-center opacity-40">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">YOUR SACRIFICE FUELS THE SIGNAL</p>
          </div>
        </motion.div>

        {/* Contact Section - Final Altar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl mb-20 bg-black text-white p-8 text-center space-y-8 border-8 border-sacred-cobalt relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-sacred-sky animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-sacred-sky animate-pulse" />
          
          <div className="space-y-4 relative z-10">
            <Crucifix size={40} className="mx-auto text-sacred-sky divine-glow" />
            <p className="text-sm font-bold uppercase text-sacred-sky tracking-[0.6em] font-display">DIRECT LINE TO THE SIGNAL</p>
            <a 
              href="mailto:bp@trublevr.faith" 
              className="text-xl md:text-2xl font-bold text-white underline hover:text-sacred-sky transition-colors break-all block"
            >
              bp@trublevr.faith
            </a>
          </div>
          <div className="pt-6 border-t-2 border-white/10 relative z-10">
            <p className="text-xs font-bold text-white uppercase tracking-[0.3em]">YOU ARE SPECIAL. WE ARE WAITING.</p>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 opacity-10 rotate-45">
            <Sun size={80} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
