import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCheck,
  ClipboardList,
  Copy,
  Eye,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  details,
  photos,
  quoteItems,
  type DetailId,
  type QuoteChecks,
} from "./config";
import { buildChecklist } from "./contact";
import { CTA, Eyebrow, Photo } from "./ui";
import { InteriorReveal } from "./InteriorReveal";
import "./interior.css";

export function DetailExplorer({
  priorities,
  onToggle,
}: {
  priorities: string[];
  onToggle: (value: string) => void;
}) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const openDetail = (index: number) => {
    setActive(index);
    setIsOpen(true);
    if (window.matchMedia("(max-width: 700px)").matches) {
      const bounds = visualRef.current?.getBoundingClientRect();
      if (
        bounds &&
        (bounds.top < 16 || bounds.bottom > window.innerHeight - 110)
      ) {
        visualRef.current?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }
    }
  };
  const closeDetail = () => {
    setIsOpen(false);
    requestAnimationFrame(() =>
      visualRef.current
        ?.querySelector<HTMLButtonElement>(`.hotspot[aria-pressed="true"]`)
        ?.focus({ preventScroll: true }),
    );
  };
  const detail = details[active];
  const selected = priorities.includes(detail.priority);
  return (
    <section id="diferenciais" className="section explorer">
      <div className="section-heading">
        <div>
          <Eyebrow number="01">APRENDA A OLHAR ALÉM DA FOTO</Eyebrow>
          <h2>
            Você vê uma cozinha.
            <br />
            <em>Vamos olhar mais de perto?</em>
          </h2>
        </div>
        <p>
          Toque para abrir o móvel por dentro. Explore vistas ilustrativas e
          descubra o que perguntar antes do orçamento.
        </p>
      </div>
      <div className="explorer-layout">
        <div
          className={`explorer-visual ${isOpen ? "interior-open" : ""}`}
          ref={visualRef}
        >
          <Photo photo={photos.hero} />
          <span className="photo-credit">DO PERFIL DA PROJ’MÓVEIS</span>
          <div className="scan-corner top-left" />
          <div className="scan-corner bottom-right" />
          {details.map((d, i) => (
            <button
              key={d.id}
              className={`hotspot ${active === i ? "active" : ""}`}
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              aria-label={`Explorar ${d.name.toLowerCase()}`}
              aria-pressed={active === i}
              onClick={() => openDetail(i)}
              aria-expanded={isOpen && active === i}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {active === i && <span className="hotspot-label">{d.label}</span>}
            </button>
          ))}
          <p className="explorer-hint">
            <ScanLine size={17} /> Toque em um ponto para abrir por dentro.
          </p>
          {isOpen && <InteriorReveal active={active} onClose={closeDetail} />}
        </div>
        <div className="explorer-content">
          <div className="detail-tabs" aria-label="Escolha um detalhe">
            {details.map((d, i) => (
              <button
                key={d.id}
                aria-pressed={active === i}
                onClick={() => openDetail(i)}
              >
                {d.name}
              </button>
            ))}
          </div>
          <div className="detail-body" aria-live="polite">
            <div className="detail-index">
              <span>DETALHE {String(active + 1).padStart(2, "0")}</span>
              <span> / 05</span>
            </div>
            <h3>{detail.title}</h3>
            <div className="observation">
              <Eye size={18} />
              <div>
                <h4>O que aparece na imagem</h4>
                <p>{detail.visible}</p>
              </div>
            </div>
            <div className="observation hidden-detail">
              <ScanLine size={18} />
              <div>
                <h4>O que a foto não responde</h4>
                <p>{detail.invisible}</p>
              </div>
            </div>
            <blockquote>
              <span>LEVE ESTA PERGUNTA PARA O ORÇAMENTO</span>
              <p>“{detail.question}”</p>
            </blockquote>
            <button
              className={`save-detail ${selected ? "selected" : ""}`}
              aria-pressed={selected}
              onClick={() => onToggle(detail.priority)}
            >
              {selected ? <Check size={18} /> : <Plus size={18} />}{" "}
              {selected
                ? "Adicionado às minhas prioridades"
                : "Isso importa no meu projeto"}
            </button>
            <p className="save-help">
              Sua escolha acompanha a conversa no final.
            </p>
          </div>
          <div className="detail-pagination">
            <span>{detail.benefit}</span>
            <button
              aria-label="Próximo detalhe"
              onClick={() => openDetail((active + 1) % details.length)}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
      <p className="source-note">
        A foto original é do perfil da empresa. As vistas internas são
        simulações educativas geradas com IA; não documentam a construção desse
        móvel.
      </p>
    </section>
  );
}

export function QuoteGuide({
  checks,
  onChange,
}: {
  checks: QuoteChecks;
  onChange: (id: DetailId, value: "clear" | "confirm") => void;
}) {
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState(false);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);
  const reviewed = Object.keys(checks).length;
  const pending = quoteItems.filter((i) => checks[i.id] === "confirm");
  async function copy() {
    try {
      await navigator.clipboard.writeText(buildChecklist(checks));
      setStatus("Roteiro copiado. Você pode usar em qualquer orçamento.");
    } catch {
      setFallback(true);
      setStatus("Selecione o roteiro abaixo e copie.");
      setTimeout(() => {
        fallbackRef.current?.focus();
        fallbackRef.current?.select();
      }, 0);
    }
  }
  return (
    <section id="comparar" className="quote-section">
      <div className="section">
        <div className="section-heading">
          <div>
            <Eyebrow number="02">AGORA, COLOQUE EM PRÁTICA</Eyebrow>
            <h2>
              Antes de comparar preços,
              <br />
              <em>compare a mesma entrega.</em>
            </h2>
          </div>
          <p>
            Tem um orçamento em mãos? Veja o que ele esclarece. Ainda não tem?
            Use como roteiro para pedir o primeiro.
          </p>
        </div>
        <div className="quote-layout">
          <div className="quote-sheet">
            <div className="sheet-header">
              <ClipboardList size={22} />
              <div>
                <h3>O que está no seu orçamento?</h3>
                <p>Cinco pontos para uma comparação mais justa.</p>
              </div>
              <span className="sheet-corner" />
            </div>
            {quoteItems.map((item, i) => (
              <fieldset key={item.id} className="quote-row">
                <legend>
                  <span>0{i + 1}</span>
                  {item.title}
                </legend>
                <p>{item.description}</p>
                <div className="quote-options">
                  {(["clear", "confirm"] as const).map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={checks[item.id] === value}
                      onClick={() => onChange(item.id, value)}
                    >
                      {checks[item.id] === value ? (
                        <Check size={14} />
                      ) : (
                        <span className="option-circle" />
                      )}
                      {value === "clear" ? "Está claro" : "Quero confirmar"}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <aside className="quote-result">
            <div className="result-top">
              <span>SEU ROTEIRO</span>
              <CheckCheck size={19} />
            </div>
            <div className="review-count">
              <strong>{String(reviewed).padStart(2, "0")}</strong>
              <span>
                / 05
                <br />
                pontos revisados
              </span>
            </div>
            <div
              className="guide-progress"
              aria-label={`${reviewed} de 5 pontos revisados`}
            >
              {quoteItems.map((i) => (
                <span key={i.id} className={checks[i.id] ? "done" : ""} />
              ))}
            </div>
            <div aria-live="polite">
              <h3>
                {reviewed === 0
                  ? "Um preço só conta parte da história."
                  : pending.length
                    ? `${pending.length} ${pending.length === 1 ? "ponto para esclarecer." : "pontos para esclarecer."}`
                    : reviewed < 5
                      ? "Bom começo. Continue conferindo."
                      : "Agora você tem mais clareza para conversar."}
              </h3>
              <p>
                {reviewed === 0
                  ? "Marque o que você já sabe e o que precisa perguntar. Nenhum preço ou documento é necessário."
                  : pending.length
                    ? "Leve estas dúvidas para o atendimento. São elas que ajudam a entender diferenças entre propostas."
                    : "Sua marcação indica o que está claro para você. Ela não certifica a qualidade de uma proposta."}
              </p>
              {pending.length > 0 && (
                <ul>
                  {pending.map((i) => (
                    <li key={i.id}>
                      <ArrowRight size={14} />
                      {i.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <CTA>Levar minhas dúvidas para a conversa</CTA>
            <button className="copy-guide" onClick={copy}>
              <Copy size={15} />
              Copiar meu roteiro
            </button>
            <p className="copy-status" role="status">
              {status}
            </p>
            {fallback && (
              <textarea
                ref={fallbackRef}
                aria-label="Roteiro para copiar"
                readOnly
                rows={8}
                value={buildChecklist(checks)}
              />
            )}
            <p className="result-foot">
              Sem ranking de fornecedores.
              <br />
              Sem confundir preço alto com qualidade.
            </p>
          </aside>
        </div>
        <div className="quote-bottom">
          <span>
            Preço importa. <strong>Saber o que ele inclui também.</strong>
          </span>
          <a href="#ambientes">
            Veja isso nos ambientes
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
