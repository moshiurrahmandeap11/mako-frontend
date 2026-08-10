import Link from 'next/link';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const innerCircleClasses = {
    sm: 'w-4 h-4 border-[2px]',
    md: 'w-5 h-5 border-[3px]',
    lg: 'w-6.5 h-6.5 border-[3px]',
  };

  const dotClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 transition-transform duration-300 group-hover:scale-105`}>
      <div className={`${innerCircleClasses[size]} rounded-full border-slate-950 border-t-transparent`} />
      <div className={`absolute ${dotClasses[size]} rounded-full bg-slate-950`} />
    </div>
  );
}

export default function Logo({ href = '/', size = 'md', showText = true, className = '' }: LogoProps) {
  const textSizes = {
    sm: 'text-sm tracking-[0.16em]',
    md: 'text-xl tracking-[0.2em]',
    lg: 'text-2xl tracking-[0.22em]',
  };

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <LogoMark size={size} />
      {showText && (
        <span className={`font-extrabold text-white transition-colors duration-300 group-hover:text-amber-400 ${textSizes[size]}`}>
          Labto AI
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
