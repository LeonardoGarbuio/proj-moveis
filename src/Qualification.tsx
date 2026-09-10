import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { details, quoteItems, site } from "./config";
import {
  buildMessage,
  whatsappLink,
  type Answers,
  type ValueBrief,
} from "./contact";
import { Eyebrow } from "./ui";

export function Qualification({
  brief,
  onToggle,
}: {
  brief: ValueBrief;
  onToggle: (value: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    environment: "",
    city: "",
    measures: "Ainda não sei",
    blueprint: "Ainda não sei",
    timing: "Ainda não sei",
    budget: "",
  });
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const output = useRef<HTMLTextAreaElement>(null);
  const update = (key: keyof Answers, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));
  const move = (value: number) => {
    setStep(value);
    setError("");
    setPreview(false);
    setTimeout(() => heading.current?.focus(), 0);
  };
  const message = buildMessage(answers, brief);
  const link = whatsappLink(site.whatsapp, message);
  const pending = quoteItems.filter((i) => brief.checks[i.id] === "confirm");
  useEffect(() => {
    if (preview) {
      output.current?.focus({ preventScroll: true });
      output.current?.scrollIntoView({ block: "center" });
    }
  }, [preview]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensagem copiada!");
    } catch {
      output.current?.focus();
      output.current?.select();
      setStatus("Selecione e copie o texto acima para continuar.");
    }
  }
  return (
    <section id="seu-projeto" className="section qualification">
      <div className="form-intro">
        <Eyebrow number="05">UMA CONVERSA COM MAIS CONTEXTO</Eyebrow>
        <h2>
          Vamos falar do que
          <br />
          <em>importa para você?</em>
        </h2>
        <p>
          Seu ambiente, sua rotina e as escolhas que fazem diferença. A conversa
          começa por aí.
        </p>
        <div className="personal-brief">
          <span className="mini-label">O QUE VOCÊ LEVA DESTA VISITA</span>
          {brief.priorities.length ? (
            <ul>
              {brief.priorities.map((p) => (
                <li key={p}>
                  <Check size={16} />
                  <span>{p}</span>
                  <button
                    aria-label={`Remover prioridade: ${p}`}
                    onClick={() => onToggle(p)}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Marque o que importa para você. Pode escolher aqui, sem voltar ao
              início.
            </p>
          )}
          <details className="priority-picker">
            <summary>
              {brief.priorities.length
                ? "Ajustar minhas prioridades"
                : "Escolher minhas prioridades"}
              <ArrowRight size={15} />
            </summary>
            <div>
              {details.map((d) => (
                <button
                  aria-pressed={brief.priorities.includes(d.priority)}
                  onClick={() => onToggle(d.priority)}
                  key={d.id}
                >
                  {brief.priorities.includes(d.priority) && <Check size={14} />}{" "}
                  {d.priority}
                </button>
              ))}
            </div>
          </details>
          {pending.length > 0 && (
            <p className="pending-note">
              <MessageCircle size={16} />
              {pending.length}{" "}
              {pending.length === 1
                ? "dúvida do roteiro vai"
                : "dúvidas do roteiro vão"}{" "}
              junto na mensagem.
            </p>
          )}
        </div>
        <small>
          Você revisa tudo antes de continuar. Sem envio automático.
        </small>
      </div>
      <div className="form-card">
        <div className="progress-label">
          <span>SEU PROJETO, COM CONTEXTO</span>
          <span>ETAPA {step + 1} DE 3</span>
        </div>
        <div className="progress">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i <= step ? "filled" : ""} />
          ))}
        </div>
        <h3 tabIndex={-1} ref={heading}>
          {
            [
              "Qual espaço você está pensando?",
              "Em que momento está seu projeto?",
              "Confira antes de conversar.",
            ][step]
          }
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 0 && (!answers.environment || !answers.city.trim())) {
              setError("Escolha um ambiente e informe sua cidade.");
              return;
            }
            if (step < 2) move(step + 1);
            else {
              setPreview(true);
              setStatus("");
            }
          }}
        >
          {step === 0 && (
            <>
              <fieldset>
                <legend>
                  Qual ambiente? <span>*</span>
                </legend>
                <div className="environment-options">
                  {[
                    "Cozinha",
                    "Quarto",
                    "Sala",
                    "Comercial / escritório",
                    "Mais de um ambiente",
                    "Outro",
                  ].map((a) => (
                    <button
                      type="button"
                      key={a}
                      aria-pressed={answers.environment === a}
                      onClick={() => update("environment", a)}
                    >
                      {a}
                      {answers.environment === a && <Check size={15} />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label htmlFor="city">
                Em qual cidade? <span>*</span>
              </label>
              <input
                id="city"
                autoComplete="address-level2"
                placeholder="Ex.: Flores da Cunha, RS"
                value={answers.city}
                onChange={(e) => update("city", e.target.value)}
                maxLength={100}
                required
              />
              <p className="field-help">
                A disponibilidade para seu endereço será confirmada no
                atendimento.
              </p>
            </>
          )}
          {step === 1 && (
            <>
              {(
                [
                  [
                    "measures",
                    "Você tem as medidas?",
                    [
                      "Ainda não sei",
                      "Sim, tenho as medidas",
                      "Tenho algumas medidas",
                      "Ainda não medi",
                    ],
                  ],
                  [
                    "blueprint",
                    "Já tem projeto ou planta?",
                    [
                      "Ainda não sei",
                      "Tenho projeto/planta",
                      "Tenho referências ou imagem de IA",
                      "Não tenho",
                    ],
                  ],
                  [
                    "timing",
                    "Quando pensa em executar?",
                    [
                      "Ainda não sei",
                      "Assim que possível",
                      "Nos próximos 3 meses",
                      "Daqui a 3 a 6 meses",
                      "Estou apenas planejando",
                    ],
                  ],
                ] as const
              ).map(([key, label, options]) => (
                <div className="select-field" key={key}>
                  <label htmlFor={key}>{label}</label>
                  <select
                    id={key}
                    value={answers[key]}
                    onChange={(e) => update(key, e.target.value)}
                  >
                    {options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
              <p className="field-help">
                Fotos, medidas e referências podem ser enviadas depois, na
                conversa.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="budget">
                Investimento aproximado <small>(opcional)</small>
              </label>
              <input
                id="budget"
                placeholder="Pode deixar para conversar depois"
                value={answers.budget}
                onChange={(e) => update("budget", e.target.value)}
                maxLength={100}
              />
              <div className="review">
                <h4>SUA IDEIA, ATÉ AQUI</h4>
                <dl>
                  {[
                    ["Ambiente", answers.environment],
                    ["Cidade", answers.city],
                    ["Medidas", answers.measures],
                    ["Projeto/planta", answers.blueprint],
                    ["Previsão", answers.timing],
                  ].map(([a, b]) => (
                    <div key={a}>
                      <dt>{a}</dt>
                      <dd>{b}</dd>
                    </div>
                  ))}
                </dl>
                {brief.priorities.length > 0 && (
                  <p>
                    <strong>Prioridades:</strong> {brief.priorities.join(" · ")}
                  </p>
                )}
                {pending.length > 0 && (
                  <p>
                    <strong>Quero esclarecer:</strong>{" "}
                    {pending.map((p) => p.title).join(" · ")}
                  </p>
                )}
              </div>
            </>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button
                type="button"
                className="back"
                onClick={() => move(step - 1)}
              >
                <ChevronLeft size={17} />
                Voltar
              </button>
            )}
            <button type="submit" className="button">
              {step === 2 ? "Ver minha mensagem" : "Continuar"}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="privacy">
            <ShieldCheck size={14} /> Suas respostas ficam só nesta página.
          </p>
        </form>
        {preview && (
          <div
            className="message-preview"
            role="region"
            aria-label="Prévia da mensagem"
          >
            <h4>Uma conversa que já começa pelo valor.</h4>
            <textarea
              ref={output}
              aria-label="Mensagem para copiar"
              readOnly
              value={message}
              rows={12}
            />
            {!site.demonstration && link ? (
              <a
                className="button"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                Abrir no WhatsApp
                <ArrowUpRight size={17} />
              </a>
            ) : (
              <p className="field-help">
                Prévia de apresentação. Nenhuma mensagem foi enviada.
              </p>
            )}
            <button className="button secondary" onClick={copy}>
              Copiar mensagem
            </button>
            <p className="copy-status" role="status">
              {status}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
