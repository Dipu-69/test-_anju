import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/Chatbot/ChatWidget'

export default function MainLayout({ children }) {
  return (
    <div className="bg-ink-900 text-white min-h-screen flex flex-col">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-brand-500 text-white px-3 py-2 rounded">
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  )
}