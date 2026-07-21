import { Coffee } from 'lucide-react'

const productLinks = ['Marketing AI', 'Customer AI', 'Finance AI', 'Sales Insight', 'Translator', 'Business Advisor']
const companyLinks = ['Tentang', 'Blog', 'Kontak', 'Karir']
const socialLinks = ['Instagram', 'TikTok', 'YouTube', 'Twitter']

export function Footer() {
  const handleClick = (e: React.MouseEvent) => e.preventDefault()

  return (
    <footer className="relative bg-coffee-dark overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2.5 text-white mb-4">
              <div className="p-1.5 rounded-xl bg-white/10 backdrop-blur-sm">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-poppins font-bold text-xl">Kopi<span className="text-emerald">AI</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Platform AI untuk UMKM Kedai Kopi Indonesia. 
              Dari biji kopi ke bisnis digital.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => (
                <button
                  key={link}
                  onClick={handleClick}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-medium">{link.slice(0, 2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Produk */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-white/90 mb-5 text-sm uppercase tracking-wider">Produk</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <button onClick={handleClick} className="text-white/50 hover:text-white transition-colors text-sm">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-white/90 mb-5 text-sm uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <button onClick={handleClick} className="text-white/50 hover:text-white transition-colors text-sm">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="font-semibold text-white/90 mb-5 text-sm uppercase tracking-wider">Dapatkan Bantuan</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Punya pertanyaan? Tim kami siap membantu kamu dari Senin-Jumat, 08:00-18:00 WIB.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium">
              hello@kopiai.id →
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © 2026 KopiAI. IDCamp Developer Challenge.
          </p>
          <div className="flex gap-6 text-xs">
            <button onClick={handleClick} className="text-white/40 hover:text-white/60 transition-colors">Kebijakan Privasi</button>
            <button onClick={handleClick} className="text-white/40 hover:text-white/60 transition-colors">Syarat & Ketentuan</button>
            <button onClick={handleClick} className="text-white/40 hover:text-white/60 transition-colors">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
