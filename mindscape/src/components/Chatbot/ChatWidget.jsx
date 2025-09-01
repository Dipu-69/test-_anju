import { useState, useRef, useEffect } from 'react'
import { Paper, IconButton, TextField, CircularProgress } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'

const API_URL = import.meta.env.VITE_CHAT_API_URL // Optional backend

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help with exam stress tips. How are you feeling today?' }
  ])
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const newMsg = { role: 'user', content: input.trim() }
    setMessages((m) => [...m, newMsg])
    setInput('')
    setLoading(true)
    try {
      if (!API_URL) {
        await new Promise((r) => setTimeout(r, 500))
        setMessages((m) => [...m, { role: 'assistant', content: 'Try a 2-minute box breathing and split study into 25-minute focus blocks.' }])
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, newMsg] })
        })
        const data = await res.json()
        setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'I’m here for you. Can you share a bit more?' }])
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I had trouble responding. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-brand-500 hover:bg-brand-400 text-white w-14 h-14 shadow-glow"
      >
        <ChatIcon />
      </button>

      {open && (
        <Paper elevation={8} className="fixed bottom-20 right-5 z-50 w-[92vw] sm:w-[380px] max-h-[70vh] flex flex-col bg-ink-800/95 border border-white/10">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="font-semibold">Mindscape Assistant</div>
            <IconButton size="small" onClick={() => setOpen(false)} aria-label="Close chat"><CloseIcon /></IconButton>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-xl px-3 py-2 ${m.role === 'assistant' ? 'bg-white/10' : 'bg-brand-500 text-white ml-auto'}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-white/70"><CircularProgress size={16} /> Typing…</div>}
            <div ref={endRef} />
          </div>
          <div className="p-2 border-t border-white/10 flex gap-2">
            <TextField
              size="small"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              fullWidth
            />
            <IconButton color="primary" onClick={send} aria-label="Send message"><ChatIcon /></IconButton>
          </div>
          <div className="px-3 py-2 text-[11px] text-white/60">
            Not a crisis tool. If you’re in danger, call your local emergency number.
          </div>
        </Paper>
      )}
    </>
  )
}