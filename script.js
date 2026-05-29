/* ===== Data ===== */
const WA = (msg) => `https://wa.me/556696004188?text=${encodeURIComponent(msg)}`;

const SOLUCOES = {
  trabalhista: [
    { h: "Estabilidade da Gestante", p: "Demissão durante a gravidez é ilegal. Defendemos seu direito à estabilidade, reintegração ou indenização completa." },
    { h: "Demissão Sem Justa Causa", p: "Análise técnica da rescisão para garantir verbas e combater demissões abusivas ou discriminatórias." },
    { h: "Verbas e Cálculos Rescisórios", p: "Revisão completa de FGTS, aviso prévio, férias e 13º para garantir que você receba tudo o que é seu." },
    { h: "Horas Extras e Assédio", p: "Cobrança de horas extras, adicional noturno, assédio moral e relações disfarçadas (pejotização)." },
  ],
  transito: [
    { h: "Recurso de Multas Abusivas", p: "Análise técnica buscando erros formais, vícios processuais e irregularidades — mesmo quando você acha que errou." },
    { h: "Suspensão de CNH", p: "Defesa técnica em processos administrativos por pontos ou infração grave, com recurso em todas as instâncias." },
    { h: "Cassação de Carteira", p: "Atuação especializada nos casos mais graves de cassação da habilitação, com defesa para reverter a decisão." },
    { h: "Condutores Profissionais", p: "Defesa para motoristas de app, caminhoneiros, taxistas e todos que dependem da CNH para o sustento." },
  ],
};

const FAQ = [
  { q: "Fui demitida grávida. O que fazer?", a: "A lei é clara: a demissão de gestante é ilegal. A trabalhadora tem direito à estabilidade desde a confirmação da gravidez até 5 meses após o parto — independentemente de a empresa saber ou não da gravidez. Você tem direito à reintegração ou ao pagamento de todos os salários e direitos do período estabilitário." },
  { q: "Vale a pena recorrer de multa mesmo se eu achar que errei?", a: "Sim, e você pode se surpreender com o resultado. O auto de infração precisa seguir requisitos formais. Erros de preenchimento, ausência de assinatura, equipamentos sem aferição ou prazo incorreto podem levar ao cancelamento da multa." },
  { q: "Como funciona o atendimento? Preciso ir ao escritório?", a: "Não. Todo o atendimento é 100% online pelo WhatsApp. Você envia os documentos por mensagem, fazemos a análise completa e retornamos com a estratégia de defesa. Rápido, seguro e sem burocracia." },
  { q: "Minha CNH pode ser suspensa por acúmulo de pontos. O que fazer?", a: "Aja imediatamente — o prazo é crucial. Há um processo administrativo antes da suspensão e você tem direito à defesa. É possível recorrer das multas que geraram pontos ou buscar medidas judiciais para suspender os efeitos." },
  { q: "Não recebi minhas verbas rescisórias corretamente. O que posso fazer?", a: "Você tem direito a receber tudo o que a lei prevê. Revisamos saldo de salário, aviso prévio, férias proporcionais, 13º, FGTS e multa de 40%. Havendo irregularidade, é possível ingressar com reclamação trabalhista para reaver os valores com correção e juros." },
];

const DEPOIMENTOS = [
  { n: "Maria S.", i: "MS", t: "Caso Trabalhista · Estabilidade Gestante", d: "Fui demitida grávida e não sabia o que fazer. O Dr. Jefferson me explicou tudo e conseguimos a indenização completa. Profissional incrível, atencioso e rápido." },
  { n: "Ricardo L.", i: "RL", t: "Caso de Trânsito · Suspensão de CNH", d: "Estava com 3 multas e iam suspender minha CNH. Sou motorista de app. O Dr. Jefferson recorreu de duas e conseguiu cancelar. Salvou meu trabalho." },
  { n: "Carlos M.", i: "CM", t: "Caso Trabalhista · Verbas Rescisórias", d: "Trabalhei 5 anos e fui demitido sem receber tudo. Com a ajuda do Dr. Jefferson, recebi todas as verbas sonegadas. Super recomendo!" },
  { n: "Ana P.", i: "AP", t: "Caso de Trânsito · Recurso de Multa", d: "Recebi uma multa que jurei que não era minha. O advogado analisou e descobriu erro no preenchimento. Multa cancelada! Muito obrigado." },
];

const SHIELD_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L4 7v4c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V7l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>`;

/* ===== Header scroll ===== */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ===== Reveal on scroll ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const d = parseInt(e.target.dataset.delay || "0", 10);
      setTimeout(() => e.target.classList.add("visible"), d);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== Counters ===== */
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = parseInt(el.dataset.to, 10);
    const pre = el.dataset.prefix || "";
    const suf = el.dataset.suffix || "";
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(to * eased) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll(".counter").forEach((el) => counterIO.observe(el));

/* ===== Tabs / Soluções ===== */
const tabs = document.querySelectorAll(".tab");
const solGrid = document.getElementById("sol-grid");
const solCta = document.getElementById("sol-cta");
const solCtaLabel = document.getElementById("sol-cta-label");

function renderSolucoes(key) {
  solGrid.innerHTML = SOLUCOES[key].map((s, i) => `
    <div class="sol-card" style="animation:fade-up .5s ${i * 60}ms ease-out both">
      <div class="sol-icon">${SHIELD_SVG}</div>
      <h4>${s.h}</h4>
      <p>${s.p}</p>
    </div>
  `).join("");
  if (key === "trabalhista") {
    solCta.href = WA("Olá Dr. Jefferson, preciso de ajuda com um caso trabalhista.");
    solCtaLabel.textContent = "Consultar sobre caso trabalhista";
  } else {
    solCta.href = WA("Olá Dr. Jefferson, preciso de ajuda com uma multa ou CNH.");
    solCtaLabel.textContent = "Consultar sobre multa ou CNH";
  }
}
tabs.forEach((t) => t.addEventListener("click", () => {
  tabs.forEach((x) => x.classList.toggle("active", x === t));
  renderSolucoes(t.dataset.tab);
}));
renderSolucoes("trabalhista");

/* ===== Depoimentos ===== */
document.getElementById("dep-grid").innerHTML = DEPOIMENTOS.map((d) => `
  <article class="dep-card">
    <span class="quote">"</span>
    <p>${d.d}</p>
    <div class="dep-author">
      <div class="dep-avatar">${d.i}</div>
      <div>
        <div class="nm">${d.n}</div>
        <div class="tp">${d.t}</div>
        <div class="st">★★★★★</div>
      </div>
    </div>
  </article>
`).join("");

/* ===== FAQ ===== */
const faqList = document.getElementById("faq-list");
faqList.innerHTML = FAQ.map((f, i) => `
  <div class="faq-item${i === 0 ? " open" : ""}" data-idx="${i}">
    <button class="faq-q" aria-expanded="${i === 0}">
      <span>${f.q}</span>
      <span class="faq-plus">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="faq-a"><div><div class="faq-body">${f.a}</div></div></div>
  </div>
`).join("");
faqList.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const open = item.classList.toggle("open");
    item.querySelector(".faq-q").setAttribute("aria-expanded", String(open));
  });
});
