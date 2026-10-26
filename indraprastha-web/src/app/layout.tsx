import type { Metadata } from "next";
import "./globals.css";
import DisableInspect from "@/components/DisableInspect";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.indraprasthaneetacademy.com"),
  title: "Indraprastha NEET Academy | NEET Preparation App",
  description:
    "Prepare for NEET with chapter-wise MCQs, previous year questions, CBT-mode practice, similar questions and performance analytics.",
  keywords: [
    "NEET preparation app",
    "NEET online question practice",
    "NEET previous year questions chapter wise",
    "NEET CBT mock test online",
    "NEET similar questions practice",
    "NEET Biology MCQs",
    "NEET Physics MCQs",
    "NEET Chemistry practice questions",
    "Indraprastha NEET Academy",
  ],
  alternates: {
    canonical: "https://www.indraprasthaneetacademy.com",
  },
  openGraph: {
    title: "Indraprastha NEET Academy | NEET Preparation App",
    description:
      "Prepare for NEET with chapter-wise MCQs, previous year questions, CBT-mode practice, similar questions and performance analytics.",
    url: "https://www.indraprasthaneetacademy.com",
    siteName: "Indraprastha NEET Academy",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indraprastha NEET Academy | NEET Preparation App",
    description:
      "Prepare for NEET with chapter-wise MCQs, previous year questions, CBT-mode practice, similar questions and performance analytics.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0F0905" />
        <link rel="icon" href="/logo_app.jpeg" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('indraprastha_theme');
                  var isLight = saved === 'light';
                  var root = document.documentElement;
                  if (isLight) {
                    root.setAttribute('data-theme', 'light');
                    root.classList.remove('dark-theme');
                    root.classList.add('light-theme');
                    root.style.colorScheme = 'light';
                    root.style.backgroundColor = '#FAF6F0';
                  } else {
                    root.setAttribute('data-theme', 'dark');
                    root.classList.add('dark-theme');
                    root.classList.remove('light-theme');
                    root.style.colorScheme = 'dark';
                    root.style.backgroundColor = '#0F0905';
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
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('indraprastha_theme');
                var isLight = saved === 'light';
                if (isLight) {
                  document.body.classList.remove('dark-theme');
                  document.body.classList.add('light-theme');
                  document.body.setAttribute('data-theme', 'light');
                  document.body.style.backgroundColor = '#FAF6F0';
                } else {
                  document.body.classList.add('dark-theme');
                  document.body.classList.remove('light-theme');
                  document.body.setAttribute('data-theme', 'dark');
                  document.body.style.backgroundColor = '#0F0905';
                }
              } catch(e) {}
            `,
          }}
        />
        <DisableInspect />
        {children}
      </body>
    </html>
  );
}
