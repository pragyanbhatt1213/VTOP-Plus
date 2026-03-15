export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-txt-primary font-semibold text-sm">VTOP Plus</div>
          <div className="text-txt-muted text-xs mt-1">Built for VIT Bhopal students</div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-txt-muted text-xs hover:text-txt-secondary transition-colors">GitHub</a>
          <a href="#" className="text-txt-muted text-xs hover:text-txt-secondary transition-colors">Report Issue</a>
          <a href="#privacy" className="text-txt-muted text-xs hover:text-txt-secondary transition-colors">Privacy</a>
        </div>
        <div className="text-txt-muted/50 text-xs font-mono">v1.0 · 2025</div>
      </div>
    </footer>
  );
}
