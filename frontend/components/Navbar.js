"use client";

const links = [
  { label: "Why SafeSpot", href: "#story" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Live Map", href: "#dashboard" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/70 backdrop-blur-md border-b border-zinc-800">
      <span className="text-white font-semibold tracking-tight text-lg">
        🌡️ SafeSpot
      </span>

      <ul className="flex gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
