import { MotionEffects } from "@/components/MotionEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function SiteChrome({ children }) {
  return (
    <div className="site-shell">
      <MotionEffects />
      <header className="site-header-wrap">
        <SiteHeader mode="fixed" />
      </header>

      {children}

      <SiteFooter />
    </div>
  );
}
