import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { photos, type CompanyPhoto } from "./config";
export function Photo({
  photo,
  className = "",
  eager = false,
}: {
  photo: CompanyPhoto;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={`company-photo ${className}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        width={photo.sourceWidth}
        height={photo.sourceHeight}
        style={{
          width: `${(photo.sourceWidth / photo.width) * 100}%`,
          height: `${(photo.sourceHeight / photo.height) * 100}%`,
          left: `${(-photo.x / photo.width) * 100}%`,
          top: `${(-photo.y / photo.height) * 100}%`,
        }}
      />
    </div>
  );
}
export function Brand() {
  return (
    <a href="#" className="brand" aria-label="Proj’Móveis Design, início">
      <Photo photo={photos.logo} />
      <span className="brand-type">
        proj’<span>móveis design</span>
      </span>
    </a>
  );
}
export function CTA({
  children = "Conversar sobre meu projeto",
  href = "#seu-projeto",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a className={`button ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <p className="eyebrow">
      {number ? (
        <span className="section-number">{number}</span>
      ) : (
        <span className="eyebrow-dot" />
      )}
      {children}
    </p>
  );
}
