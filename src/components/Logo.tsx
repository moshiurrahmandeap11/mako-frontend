import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
  markId?: string;
}

export function LogoMark({
  size = "md",
  id,
}: {
  size?: "sm" | "md" | "lg";
  id?: string;
}) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  return (
    <div id={id} className={`relative ${sizeClasses[size]} shrink-0`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 54 54"
        className="w-full h-full"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.9907 46.0431L33.9492 46.0455L33.8519 46.0513C32.9869 46.1023 32.1446 46.1534 31.3415 46.2305H20.449L9.62536 53.77C8.74286 54.3435 6.01237 53.9821 6.286 51.0942C6.55963 48.2063 7.10808 45.2966 7.34811 44.2027C2.50798 41.6577 -0.327653 38.8525 0.0303043 25.615C0.409395 11.5961 1.85084 7 26.3274 7C27.5144 7.03823 28.7207 7.04655 29.9294 7.05487C40.5275 7.12789 51.3161 7.20223 50.9929 27.4576C50.7121 45.0582 41.5224 45.5995 33.991 46.0431L33.9907 46.0431Z"
          fill="#1DBF73"
        />
        <path
          d="M12.9504 20.7466C12.9504 19.4063 14.0431 18.3197 15.3911 18.3197H18.9975C20.3455 18.3197 21.4382 19.4063 21.4382 20.7466V24.3327C21.4382 25.6731 20.3455 26.7597 18.9975 26.7597H15.3911C14.0431 26.7597 12.9504 25.6731 12.9504 24.3327V20.7466Z"
          fill="white"
        />
        <path
          d="M29.5436 20.7466C29.5436 19.4063 30.6363 18.3197 31.9843 18.3197H35.5907C36.9387 18.3197 38.0314 19.4063 38.0314 20.7466V24.3327C38.0314 25.6731 36.9387 26.7597 35.5907 26.7597H31.9843C30.6363 26.7597 29.5436 25.6731 29.5436 24.3327V20.7466Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default function Logo({
  href = "/",
  size = "md",
  showText = true,
  className = "",
  onClick,
  id,
  markId,
}: LogoProps) {
  const heightClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-11",
  };

  const markSizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  if (!showText) {
    const content = (
      <div id={id} className={`inline-flex items-center cursor-pointer ${className}`}>
        <LogoMark size={size} id={markId} />
      </div>
    );

    if (href) {
      return (
        <Link href={href} onClick={onClick} className="inline-flex">
          {content}
        </Link>
      );
    }
    return content;
  }

  const content = (
    <div
      id={id}
      className={`relative ${heightClasses[size]} shrink-0 flex items-center cursor-pointer ${className}`}
    >
      {markId && (
        <div
          id={markId}
          className={`absolute left-0 top-0 ${markSizeClasses[size]} pointer-events-none opacity-0`}
        />
      )}
      <Image
        src="/labtoai-full.svg"
        alt="Labto AI"
        width={215}
        height={54}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
