import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, PenTool, Sparkles, Send, Check, Trash2 } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Message {
  id: string;
  name: string;
  content: string;
  inkColor: string;
  stamp: string;
  timestamp: string;
  visitorId: string;
}

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEn: boolean;
}

const INK_COLORS = [
  { name: 'Charcoal 黑炭', value: '#2A2928', class: 'bg-[#2A2928]' },
  { name: 'Prussian Blue 普鲁士蓝', value: '#102A43', class: 'bg-[#102A43]' },
  { name: 'Crimson Ink 绯红', value: '#9C2B2A', class: 'bg-[#9C2B2A]' },
  { name: 'Forest Pine 黛绿', value: '#1C3D27', class: 'bg-[#1C3D27]' },
];

const STAMPS = ['🌸', '🎨', '✨', '✍️', '☕️', '📌', '⚓️', '🧩'];

const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins (Harvard GSD)',
    content: 'Penny, your touch-resistive metal drawers are a wunderkammer. A profound critique of our sterile slab screen age! Splendid spatial work.',
    inkColor: '#102A43',
    stamp: '✨',
    timestamp: '2026-06-08',
    visitorId: 'system-seed'
  },
  {
    id: 'm2',
    name: 'Xin Xin',
    content: '这套关于“数字物性与触感界面”的数字画廊做的太妙了，互动非常有拉力和重感，一下子想起了我们在伦敦工坊敲木头布展的日子。',
    inkColor: '#9C2B2A',
    stamp: '🎨',
    timestamp: '2026-06-09',
    visitorId: 'system-seed'
  },
  {
    id: 'm3',
    name: 'Kenji Sato',
    content: 'Exquisite physical-digital hybrid design. The tension between wood cabinetry and modern pixel archives feels extremely tactile and satisfying.',
    inkColor: '#1C3D27',
    stamp: '☕️',
    timestamp: '2026-05-28',
    visitorId: 'system-seed'
  },
  {
    id: 'm4',
    name: 'Amélie Laurent (Paris Design)',
    content: 'Le sens du toucher... Penny capturing gravity and resistance in a purely virtual gallery is a beautiful poem. Bravo!',
    inkColor: '#2A2928',
    stamp: '🌸',
    timestamp: '2026-05-15',
    visitorId: 'system-seed'
  }
];

export default function GuestbookModal({ isOpen, onClose, isEn }: GuestbookModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedInk, setSelectedInk] = useState('#2A2928');
  const [selectedStamp, setSelectedStamp] = useState('🌸');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visitorId, setVisitorId] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [adminInputError, setAdminInputError] = useState(false);

  // Initialize or retrieve persistent client-side visitor id on component load
  useEffect(() => {
    let vid = localStorage.getItem('penny_visitor_id');
    if (!vid) {
      vid = `v-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
      localStorage.setItem('penny_visitor_id', vid);
    }
    setVisitorId(vid);

    const adminSaved = localStorage.getItem('penny_portfolio_admin_active');
    if (adminSaved === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Load and enrich messages with data from Firestore
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fbMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fbMessages.push({
            id: doc.id,
            name: data.name || '',
            content: data.content || '',
            inkColor: data.inkColor || '#2A2928',
            stamp: data.stamp || '🌸',
            timestamp: data.timestamp || '',
            visitorId: data.visitorId || 'system-seed'
          });
        });

        if (fbMessages.length === 0) {
          // If Firestore is completely empty, seed it with DEFAULT_MESSAGES
          for (const msg of DEFAULT_MESSAGES) {
            await setDoc(doc(db, 'messages', msg.id), {
              name: msg.name,
              content: msg.content,
              inkColor: msg.inkColor,
              stamp: msg.stamp,
              timestamp: msg.timestamp,
              visitorId: msg.visitorId
            });
            fbMessages.push(msg);
          }
        }

        if (isMounted) {
          setMessages(fbMessages);
        }
      } catch (e) {
        console.warn("Firestore fetch failed, falling back to local storage:", e);
        const saved = localStorage.getItem('penny_guestbook_messages');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const migrated = parsed.map((item: any) => {
              if (item.id === 'm2' && (item.name.includes('Xiao Wei') || item.content.includes('毕毕！'))) {
                return {
                  ...item,
                  name: 'Xin Xin',
                  content: '这套关于“数字物性与触感界面”的数字画廊做的太妙了，互动非常有拉力和重感，一下子想起了我们在伦敦工坊敲木头布展的日子。'
                };
              }
              return item;
            });
            if (isMounted) setMessages(migrated);
          } catch (err) {
            if (isMounted) setMessages(DEFAULT_MESSAGES);
          }
        } else {
          if (isMounted) setMessages(DEFAULT_MESSAGES);
        }
        try {
          handleFirestoreError(e, OperationType.LIST, 'messages');
        } catch (err) {}
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const currentVid = visitorId || localStorage.getItem('penny_visitor_id') || 'system-seed';
    const newId = `msg-${Date.now()}`;
    const newMsg: Message = {
      id: newId,
      name: name.trim().slice(0, 30),
      content: content.trim().slice(0, 500),
      inkColor: selectedInk,
      stamp: selectedStamp,
      timestamp: new Date().toISOString().split('T')[0],
      visitorId: currentVid
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('penny_guestbook_messages', JSON.stringify(updated));

    // Clear form and play success animation
    setName('');
    setContent('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2500);

    try {
      await setDoc(doc(db, 'messages', newId), {
        name: newMsg.name,
        content: newMsg.content,
        inkColor: newMsg.inkColor,
        stamp: newMsg.stamp,
        timestamp: newMsg.timestamp,
        visitorId: newMsg.visitorId
      });
    } catch (error) {
      console.error("Failed to write to Firestore:", error);
      try {
        handleFirestoreError(error, OperationType.WRITE, `messages/${newId}`);
      } catch (err) {}
    }
  };

  const handleFooterClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('penny_portfolio_admin_active');
      return;
    }
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setShowAdminInput(true);
      setClickCount(0);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = adminCodeInput.trim().toLowerCase();
    if (normalized === 'penny2026' || normalized === 'pennyadmin' || normalized === 'gravity2026') {
      setIsAdmin(true);
      localStorage.setItem('penny_portfolio_admin_active', 'true');
      setShowAdminInput(false);
      setAdminCodeInput('');
      setAdminInputError(false);
    } else {
      setAdminInputError(true);
      setAdminCodeInput('');
      setTimeout(() => setAdminInputError(false), 1500);
    }
  };

  const handleDelete = async (id: string) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('penny_guestbook_messages', JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      console.error("Failed to delete from Firestore:", error);
      try {
        handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
      } catch (err) {}
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1e1e1d]/50 backdrop-blur-xs cursor-pointer"
      />

      {/* Main Sketchbook Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        className="relative bg-[#faf7f0] border-[4px] border-black rounded-lg shadow-2xl w-full max-w-5xl h-[85vh] md:h-[75vh] flex flex-col md:flex-row overflow-hidden z-20"
      >
        {/* Book Binding / Spine effect on desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[12px] bg-gradient-to-r from-stone-300/40 via-stone-400/80 to-stone-300/40 z-30 -translate-x-1/2 border-l border-r border-stone-400/30" />

        {/* PAGE 1: Write Panel (Left on Desktop, Top on Mobile) */}
        <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto border-b-2 md:border-b-0 md:border-r-[2px] border-black/10 select-none">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-[#B33E2B]" />
                <h2 className="font-serif font-black text-xl sm:text-2xl text-stone-900 tracking-tight">
                  {isEn ? "Penny's Journal" : "给Penny留个言"}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="md:hidden p-1 bg-stone-200/50 hover:bg-stone-200 text-stone-600 rounded-full cursor-pointer transition-colors"
                title={isEn ? "Close" : "关闭"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-stone-500 leading-relaxed font-sans mb-5">
              {isEn 
                ? "Leave your reflections, thoughts, or tactile feedback. Your message will be drawn onto the physical ink visitor archive." 
                : "在这里留下你的展品观感、合作创意或数字触觉讨论。新写的留言将被墨水绘制保存在访客归档之中。"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">
                  {isEn ? "YOUR NAME / SIGNATURE" : "署名/昵称"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isEn ? "e.g., Architect Visitor" : "例如：触感设计师"}
                  className="w-full bg-white/60 hover:bg-white text-stone-900 px-4 py-2 text-sm rounded-md border-[2px] border-stone-300 focus:border-black focus:outline-none transition-all font-sans font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">
                  {isEn ? "MESSAGE / INK NOTES" : "留言内容"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={isEn ? "Write down your thoughts... (max 500 characters)" : "写下你的观展感受、回响或与Penny的留言..."}
                  className="w-full bg-white/60 hover:bg-white text-stone-900 px-4 py-3 text-sm rounded-md border-[2px] border-stone-300 focus:border-black focus:outline-none transition-all font-sans resize-none"
                  style={{ color: selectedInk }}
                />
              </div>

              {/* Ink Selection */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                  {isEn ? "CHOOSE INK TONE" : "选择墨水色彩"}
                </label>
                <div className="flex flex-wrap gap-3">
                  {INK_COLORS.map((ink) => (
                    <button
                      key={ink.value}
                      type="button"
                      onClick={() => setSelectedInk(ink.value)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-medium transition-all cursor-pointer ${
                        selectedInk === ink.value
                          ? 'border-black bg-stone-100 font-black shadow-xs'
                          : 'border-transparent bg-stone-200/40 text-stone-500 hover:bg-stone-200/80'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${ink.class}`} />
                      <span>{isEn ? ink.name.split(' ')[0] : ink.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stamp Sticker Selection */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                  {isEn ? "SELECT STAMP EMOJI" : "钤印图章"}
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-1 select-none">
                  {STAMPS.map((stamp) => (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => setSelectedStamp(stamp)}
                      className={`text-lg p-1.5 rounded-md border transition-all cursor-pointer ${
                        selectedStamp === stamp
                          ? 'border-black bg-amber-100 scale-110 shadow-xs'
                          : 'border-transparent hover:bg-stone-200/50'
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Tip */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border-l-4 border-emerald-500 p-2 text-xs text-emerald-800 rounded flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  <span>
                    {isEn 
                      ? "Ink applied! Your card has been cataloged." 
                      : "图章加盖成功！留言已写录于右侧册页。"}
                  </span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border-[2.5px] border-black bg-white text-black font-sans font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer shadow-none active:translate-y-0.5 filter drop-shadow-[3px_3px_0_rgba(179,62,43,1)] hover:drop-shadow-[1px_1px_0_rgba(0,0,0,1)]"
              >
                <span>{isEn ? "STAMP & RECORD INK" : "加盖图章并留言"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* PAGE 2: Record Feed (Right on Desktop, Bottom on Mobile) */}
        <div className="flex-1 bg-[#fcfaf4] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 select-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B33E2B]" />
                <h3 className="font-serif font-black text-lg sm:text-xl text-stone-900 tracking-tight">
                  {isEn ? "Visitor Archives" : "访客墨迹馆阁"}
                </h3>
              </div>
              
              {/* Close Button on Desktop */}
              <button 
                onClick={onClose}
                className="hidden md:flex items-center justify-center p-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer rounded-full border border-stone-200 hover:border-stone-400 bg-white shadow-xs"
                title={isEn ? "Close Booklet" : "合上画册"}
              >
                <X className="w-5 h-5 stroke-[2.2px]" />
              </button>
            </div>

            {/* Scrollable List of messages */}
            <div className="flex-1 overflow-y-auto pr-1 mt-4 space-y-4 max-h-[45vh] md:max-h-[58vh]">
              {isLoading ? (
                <div className="py-20 text-center text-xs text-stone-400 font-mono uppercase tracking-widest select-none flex flex-col items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin" />
                  <span>{isEn ? "[ Reading Ledger... ]" : "[ 翻阅墨迹归档中... ]"}</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="py-20 text-center text-xs text-stone-400 font-mono uppercase tracking-widest select-none">
                  {isEn ? "[ Empty Ledger ]" : "[ 暂无访客墨守 ]"}
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="relative p-4 rounded-md border-[2px] border-black/10 bg-[#faf8f2] shadow-[3px_3px_0_rgba(0,0,0,0.04)] hover:shadow-[3px_3px_0_rgba(0,0,0,0.08)] hover:border-black/20 transition-all flex flex-col gap-2 group"
                  >
                    {/* Big Stamp Sticker */}
                    <div className="absolute right-3 top-3 text-2xl select-none opacity-40 group-hover:opacity-85 group-hover:scale-110 transition-all duration-300 transform rotate-12 pointer-events-none">
                      {msg.stamp || '🌸'}
                    </div>

                    <div className="flex items-center justify-between pr-8 border-b border-stone-200/50 pb-1.5 select-none">
                      <span className="font-serif font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: msg.inkColor }} />
                        {msg.name}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {msg.timestamp}
                      </span>
                    </div>

                    <p 
                      className="text-xs leading-relaxed font-sans font-medium whitespace-pre-wrap select-text break-words pr-8 pb-1.5"
                      style={{ color: msg.inkColor }}
                    >
                      {msg.content}
                    </p>

                    {/* Delete comment button */}
                    {(msg.visitorId === visitorId || isAdmin) && (
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md border border-stone-200 hover:border-red-500/30 bg-white/90 hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-xs z-10"
                        title={isEn ? "Delete this message" : "删除留言"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="border-t border-black/5 pt-3 select-none text-[9px] font-mono text-center text-stone-400 uppercase tracking-[0.2em] mt-2">
              {showAdminInput ? (
                <form onSubmit={handleAdminSubmit} className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <input
                    type="password"
                    placeholder={adminInputError ? (isEn ? "WRONG CODE!" : "密匙有误！") : (isEn ? "SECRET KEY..." : "管理密匙...")}
                    value={adminCodeInput}
                    onChange={(e) => setAdminCodeInput(e.target.value)}
                    className={`w-32 bg-white px-2 py-0.5 text-[8px] rounded border focus:outline-none text-stone-900 text-center font-mono placeholder:font-mono ${
                      adminInputError ? 'border-red-500 bg-red-50 text-red-600' : 'border-stone-300 focus:border-black'
                    }`}
                  />
                  <button type="submit" className="text-[8px] font-mono hover:text-black uppercase tracking-wider px-2 py-0.5 border border-stone-300 rounded bg-stone-100 hover:bg-white text-stone-600 transition-colors pointer-events-auto cursor-pointer">
                    {isEn ? "DO" : "确认"}
                  </button>
                  <button type="button" onClick={() => setShowAdminInput(false)} className="text-[8px] font-mono hover:text-black uppercase tracking-wider px-2 py-0.5 border border-stone-300 rounded bg-stone-100 hover:bg-white text-stone-600 transition-colors pointer-events-auto cursor-pointer">
                    {isEn ? "ESC" : "退出"}
                  </button>
                </form>
              ) : (
                <div 
                  onClick={handleFooterClick}
                  className="cursor-pointer hover:text-stone-700 transition-colors flex items-center justify-center gap-2 select-none"
                  title={isEn ? "Click 3 times to authenticate" : "连击三次进入管理"}
                >
                  <span>{isEn ? "● ALL RIGHTS RESERVED | PENNY ART GALLERY JOURNAL" : "● 藏画笔墨珍存 | 艺术画廊留言访本"}</span>
                  {isAdmin && <span className="text-red-700 font-bold font-mono text-[9px] hover:underline cursor-pointer select-none"> [ADMIN ACTIVE]</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
