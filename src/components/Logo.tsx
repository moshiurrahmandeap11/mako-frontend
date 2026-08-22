import Link from 'next/link';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
  markId?: string;
}

export function LogoMark({ size = 'md', id }: { size?: 'sm' | 'md' | 'lg'; id?: string }) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  return (
    <div
      id={id}
      className={`relative ${sizeClasses[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-full h-full">
        <g stroke="#39FF88" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Chat Bubble Outline */}
          <path d="M 120,90 H 380 A 50,50 0 0 1 430,140 V 310 A 50,50 0 0 1 380,360 H 350 L 380,415 L 310,360 H 120 A 50,50 0 0 1 70,310 V 140 A 50,50 0 0 1 120,90 Z" />
          {/* Hollow Letter L */}
          <path d="M 155,160 V 290 H 235" />
          {/* Hollow AI Sparkle Star */}
          <path d="M 315,165 Q 315,225 375,225 Q 315,225 315,285 Q 315,225 255,225 Q 315,225 315,165 Z" />
        </g>
      </svg>
    </div>
  );
}

export default function Logo({
  href = '/',
  size = 'md',
  showText = true,
  className = '',
  onClick,
  id,
  markId,
}: LogoProps) {
  const textSizes = {
    sm: 'text-sm tracking-[0.16em]',
    md: 'text-xl tracking-[0.2em]',
    lg: 'text-2xl tracking-[0.22em]',
  };

  const content = (
    <div id={id} className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <LogoMark size={size} id={markId} />
      {showText && (
        <span className={`font-extrabold text-white transition-colors duration-300 group-hover:text-[#39FF88] ${textSizes[size]}`}>
          Labto AI
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div onClick={onClick}>{content}</div>;
}
