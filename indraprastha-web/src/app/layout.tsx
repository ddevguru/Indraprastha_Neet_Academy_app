import type { Metadata } from "next";
import "./globals.css";
import DisableInspect from "@/components/DisableInspect";

export const metadata: Metadata = {
  title: "Indraprastha NEET Academy – Crack NEET 2026/2027 with NCERT Line-by-Line",
  description:
    "India's most trusted NEET coaching academy. NCERT Line-by-Line teaching, 70,000+ students trained, 9+ years of excellence. Enroll now for NEET 2026/2027 batch.",
  keywords: "NEET coaching, NEET 2026, NEET 2027, NCERT coaching, medical entrance, Indraprastha Academy",
  openGraph: {
    title: "Indraprastha NEET Academy – Crack NEET 2026/2027",
    description: "India's most trusted NEET coaching. NCERT Line-by-Line teaching methodology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_app.jpeg" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('indraprastha_theme') || 'dark';
                  if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.add('dark-theme');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.remove('dark-theme');
                  }
                } catch(e) {}

                // Immediate protection before React mounts
                try {
                  document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });
                  document.addEventListener('keydown', function(e) {
                    var k = (e.key || '').toLowerCase();
                    if (e.key === 'F12' || e.keyCode === 123 || e.key === 'PrintScreen' || e.keyCode === 44 ||
                        ((e.ctrlKey || e.metaKey) && (k === 'u' || k === 's' || k === 'p')) ||
                        ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k' || k === 's')) ||
                        ((e.ctrlKey || e.metaKey) && e.altKey && (k === 'i' || k === 'j' || k === 'c' || k === 'u'))) {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.key === 'PrintScreen' || e.keyCode === 44) {
                        try { if (navigator.clipboard) navigator.clipboard.writeText(''); } catch(err) {}
                      }
                      return false;
                    }
                  });
                  document.addEventListener('keyup', function(e) {
                    if (e.key === 'PrintScreen' || e.keyCode === 44) {
                      try { if (navigator.clipboard) navigator.clipboard.writeText(''); } catch(err) {}
                    }
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="dark-theme">
        <DisableInspect />
        {children}
      </body>
    </html>
  );
}
