import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { faqs, photos, projects, site, type QuoteChecks } from "./config";
import { Brand, CTA, Eyebrow, Photo } from "./ui";
import { DetailExplorer, QuoteGuide } from "./ValueExperience";
import { Qualification } from "./Qualification";
import "./styles.css";

function App() {
  const [menu, setMenu] = useState(false);
  const [hideBar, setHideBar] = useState(false);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [checks, setChecks] = useState<QuoteChecks>({});
  const togglePriority = (value: string) =>
    setPriorities((current) =>
      current.includes(value)
        ? current.filter((p) => p !== value)
        : [...current, value],
    );
  useEffect(() => {
    const form = document.querySelector("#seu-projeto");
    const observer = new IntersectionObserver(([entry]) =>
      setHideBar(entry.isIntersecting),
    );
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, []);
  return (
    <>
      <a href="#conteudo" className="skip">
        Pular para o conteúdo
      </a>
      <div className="topline">
        <span>MÓVEIS SOB MEDIDA. ESCOLHAS BEM PENSADAS.</span>
        <span>
          <MapPin size={11} />
          {site.city}
        </span>
      </div>
      <header className="header">
        <Brand />
        <nav
          id="main-nav"
          aria-label="Navegação principal"
          className={menu ? "open" : ""}
        >
          {[
            ["#diferenciais", "Olhe os detalhes"],
            ["#comparar", "Compare melhor"],
            ["#ambientes", "Ambientes"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#seu-projeto" className="header-cta">
          Seu projeto
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menu}
          aria-controls="main-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="conteudo">
        <section className="hero">
          <div className="hero-copy">
            <Eyebrow>SOB MEDIDA VAI ALÉM DAS MEDIDAS</Eyebrow>
            <h1>
              O preço está <br />
              no papel.
              <br />
              <em>
                A diferença está
                <br />
                no seu dia a dia.
              </em>
            </h1>
            <p>
              Antes de comparar orçamentos, descubra as escolhas que mudam como
              você vive o seu espaço.
            </p>
            <CTA href="#diferenciais">Descobrir o que faz diferença</CTA>
            <a className="text-link" href="#comparar">
              Já tenho um orçamento
              <ArrowRight size={15} />
            </a>
            <div className="hero-signature">
              <span className="signature-line" />
              <span>
                Design que você vê.
                <br />
                <strong>Escolhas que você entende.</strong>
              </span>
            </div>
          </div>
          <div className="hero-composition">
            <div className="hero-main-photo">
              <Photo photo={photos.hero} eager />
              <span className="photo-credit">
                AMBIENTE DO PERFIL PROJ’MÓVEIS
              </span>
              <span className="photo-axis">
                01 — COZINHA / MADEIRA + GRAFITE
              </span>
            </div>
            <div className="hero-secondary">
              <Photo photo={photos.bedroom} eager />
              <span>02 / ACOLHER</span>
            </div>
            <a href="#diferenciais" className="hero-discovery">
              <span className="discovery-icon">
                <Plus size={24} />
              </span>
              <div>
                <span>OLHE MAIS DE PERTO</span>
                <p>
                  A foto é só
                  <br />o começo.
                </p>
              </div>
              <ArrowUpRight size={22} />
            </a>
            <div className="hero-caption">
              <span>PROJ’</span>
              <p>
                Seu espaço merece
                <br />
                uma escolha consciente.
              </p>
            </div>
            <span className="vertical-caption">
              FLORES DA CUNHA, RS · MÓVEIS DESIGN
            </span>
          </div>
        </section>
        <div className="journey">
          <a href="#diferenciais">
            <span>01</span>Explore os detalhes
            <ArrowRight size={15} />
          </a>
          <a href="#comparar">
            <span>02</span>Compare com critério
            <ArrowRight size={15} />
          </a>
          <a href="#seu-projeto">
            <span>03</span>Converse com contexto
            <ArrowUpRight size={15} />
          </a>
        </div>
        <DetailExplorer priorities={priorities} onToggle={togglePriority} />
        <div className="insight">
          <span className="insight-symbol">≠</span>
          <p>
            O mesmo nome no orçamento
            <br />
            <strong>não significa a mesma entrega.</strong>
          </p>
          <span className="insight-aside">
            “Cozinha sob medida” é o começo da descrição.
            <br />
            Materiais, soluções e serviços completam a história.
          </span>
        </div>
        <QuoteGuide
          checks={checks}
          onChange={(id, value) =>
            setChecks((current) => ({ ...current, [id]: value }))
          }
        />
        <section id="ambientes" className="section projects">
          <div className="section-heading">
            <div>
              <Eyebrow number="03">DO PERFIL DA PROJ’MÓVEIS</Eyebrow>
              <h2>
                Além de gostar da foto,
                <br />
                <em>entenda a ideia.</em>
              </h2>
            </div>
            <a
              className="text-link"
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Conhecer o perfil
              <Instagram size={17} />
            </a>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <article className="project" key={p.id}>
                <div className="project-photo">
                  <Photo photo={p.photo} />
                  <span className="project-number">0{i + 1}</span>
                  <span className="project-photo-label">{p.category}</span>
                </div>
                <h3>{p.title}</h3>
                <details>
                  <summary>
                    O que observar neste ambiente
                    <Plus size={17} />
                  </summary>
                  <div className="story">
                    <span className="mini-label">A SOLUÇÃO VISÍVEL</span>
                    <p>{p.observation}</p>
                    <span className="mini-label">
                      TRAZENDO PARA A SUA ROTINA
                    </span>
                    <p>{p.question}</p>
                    <button
                      className="save-project"
                      aria-pressed={priorities.includes(p.priority)}
                      onClick={() => togglePriority(p.priority)}
                    >
                      {priorities.includes(p.priority) ? (
                        <Check size={15} />
                      ) : (
                        <Plus size={15} />
                      )}{" "}
                      {priorities.includes(p.priority)
                        ? "Ideia adicionada"
                        : "Quero levar essa ideia"}
                    </button>
                  </div>
                </details>
              </article>
            ))}
          </div>
          <p className="source-note">
            Imagens das publicações fornecidas. As observações descrevem o que
            está visível; não são relatos de clientes nem especificações
            técnicas.
          </p>
        </section>
        <section id="empresa" className="company-section">
          <div className="company-image">
            <Photo photo={photos.factory} />
            <span className="factory-label">
              <MapPin size={16} />
              FLORES DA CUNHA / RS
            </span>
          </div>
          <div className="company-copy">
            <Eyebrow number="04">QUEM ESTÁ POR TRÁS DO PROJETO</Eyebrow>
            <h2>
              Um endereço real.
              <br />
              Uma história na madeira.
              <br />
              <em>Uma conversa próxima.</em>
            </h2>
            <p>
              A Proj’Móveis Design cria móveis sob medida para espaços
              residenciais, comerciais e corporativos, em Flores da Cunha.
            </p>
            <div className="company-stats">
              <div>
                <strong>{site.experience}</strong>
                <span>anos de experiência</span>
              </div>
              <div>
                <strong>{site.projectsCount}</strong>
                <span>projetos executados</span>
              </div>
            </div>
            <p className="source-note">
              Experiência e projetos informados no material institucional da
              empresa.
            </p>
            <div className="company-address">
              <MapPin size={18} />
              <p>
                {site.address}
                <br />
                {site.city}
              </p>
            </div>
            <a className="text-link" href="#seu-projeto">
              Vamos conhecer o seu espaço
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="section process" id="processo">
          <div className="process-intro">
            <Eyebrow>DA SUA IDEIA À PROPOSTA</Eyebrow>
            <h2>
              Primeiro, entender.
              <br />
              <em>Depois, propor.</em>
            </h2>
            <p>
              Um caminho sugerido para dar clareza à conversa. Etapas e
              condições são combinadas no atendimento.
            </p>
          </div>
          <div className="process-steps">
            {[
              [
                "01",
                "Sua rotina",
                "Ambiente, necessidades e o que você quer resolver.",
              ],
              [
                "02",
                "As possibilidades",
                "Medidas, referências e escolhas para avaliar juntos.",
              ],
              [
                "03",
                "A proposta",
                "Especificações, serviços e condições para comparar.",
              ],
              [
                "04",
                "A execução",
                "Produção, instalação e ajustes conforme o combinado.",
              ],
            ].map(([n, a, b]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h3>{a}</h3>
                  <p>{b}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section faq">
          <div>
            <Eyebrow>ESCOLHER SEM FICAR NO ESCURO</Eyebrow>
            <h2>
              Uma dúvida a menos.
              <br />
              <em>Uma decisão melhor.</em>
            </h2>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <Qualification
          brief={{ priorities, checks }}
          onToggle={togglePriority}
        />
      </main>
      <footer>
        <div className="footer-top">
          <Brand />
          <p>
            O seu espaço.
            <br />
            <em>Entendido nos detalhes.</em>
          </p>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            <Instagram size={19} />
            @proj.moveis.design
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            {site.city} · {site.phoneLabel}
          </span>
          <small>
            {site.demonstration
              ? "Prévia de apresentação · Conteúdo institucional fornecido pela empresa."
              : "Proj’Móveis Design · Móveis sob medida."}
          </small>
          <a href="#conteudo">
            Voltar ao início
            <ArrowDown size={12} />
          </a>
        </div>
      </footer>
      <div className={`mobile-bar ${hideBar ? "hidden" : ""}`}>
        <span>
          {priorities.length
            ? `${priorities.length} ${priorities.length === 1 ? "prioridade escolhida" : "prioridades escolhidas"}`
            : "SEU ESPAÇO, SUAS PRIORIDADES"}
        </span>
        <CTA>
          {priorities.length
            ? "Levar minhas ideias para a conversa"
            : "Conversar sobre meu projeto"}
        </CTA>
      </div>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
