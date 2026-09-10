import { useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle, ScanLine } from "lucide-react";
import { details, type DetailId } from "./config";

export const interiorViews: Record<
  DetailId,
  { title: string; caption: string; takeaway: string }
> = {
  projeto: {
    title: "O espaço que a porta esconde.",
    caption: "Portas abertas revelam possibilidades de organização interna.",
    takeaway: "Peça para ver a distribuição por dentro.",
  },
  material: {
    title: "Cada camada tem uma função.",
    caption:
      "Uma vista em corte para entender frente, estrutura e prateleiras.",
    takeaway: "Compare a especificação de cada parte.",
  },
  acabamento: {
    title: "Aproxime. O detalhe está na borda.",
    caption:
      "O encontro entre frente, borda e lateral também faz parte da escolha.",
    takeaway: "Peça uma amostra ou uma foto de perto.",
  },
  ferragens: {
    title: "O movimento começa por dentro.",
    caption:
      "Gaveta aberta, corrediça e dobradiça visíveis: o mecanismo também conta.",
    takeaway: "Confirme modelo, carga e funcionamento.",
  },
  montagem: {
    title: "O que sustenta o resultado.",
    caption:
      "Rodapé removido para ilustrar os apoios e o nivelamento do conjunto.",
    takeaway: "Pergunte sobre instalação e ajustes.",
  },
};

export function InteriorReveal({
  active,
  onClose,
}: {
  active: number;
  onClose: () => void;
}) {
  const detail = details[active];
  const view = interiorViews[detail.id];
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [replay, setReplay] = useState(0);
  const renderKey = `${detail.id}-${replay}`;
  const loaded = readyKey === renderKey;
  const failed = errorKey === renderKey;
  const returnButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    returnButton.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={`interior-overlay ${loaded ? "is-ready" : ""}`}
      role="region"
      aria-label={`Interior ilustrativo: ${detail.name}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="interior-render" key={renderKey}>
        {!failed && (
          <img
            key={detail.id}
            src={`/images/interiors/${detail.id}.jpg`}
            alt={`${view.caption} Visualização conceitual gerada com IA, não uma especificação deste móvel.`}
            width="1024"
            height="1280"
            onLoad={() => setReadyKey(renderKey)}
            onError={() => {
              setErrorKey(renderKey);
            }}
          />
        )}
        {!loaded && !failed && (
          <div className="interior-loading" role="status">
            <LoaderCircle size={25} aria-hidden="true" />
            <span>Abrindo o detalhe…</span>
          </div>
        )}
        {failed && (
          <div className="interior-loading" role="alert">
            <ScanLine size={27} aria-hidden="true" />
            <span>Não foi possível carregar esta vista.</span>
            <button
              onClick={() => {
                setReplay((value) => value + 1);
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}
        <div className="interior-scan" aria-hidden="true" />
      </div>
      <div className="interior-top">
        <span>
          <ScanLine size={12} aria-hidden="true" /> SIMULAÇÃO COM IA
        </span>
        <button ref={returnButton} onClick={onClose}>
          <ArrowLeft size={15} aria-hidden="true" />
          Voltar
        </button>
      </div>
    </div>
  );
}
