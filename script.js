/* ===== Dr. Jefferson Ferreira — Site estático ===== */
(function(){
  const WA_PHONE = "556696004188";
  const WA = (msg) => `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;

  /* ---------- Header scroll ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- Soluções (tabs) ---------- */
  const SOLUCOES = {
    trabalhista: [
      { h: "Estabilidade da Gestante", p: "Demissão durante a gravidez é ilegal. Defendemos seu direito à estabilidade, reintegração ou indenização completa." },
      { h: "Demissão Sem Justa Causa", p: "Análise técnica da rescisão para garantir verbas e combater demissões indevidas ou discriminatórias." },
      { h: "Verbas e Cálculos Rescisórios", p: "Revisão completa de FGTS, aviso prévio, férias e 13º para garantir que você receba tudo o que é seu." },
      { h: "Horas Extras e Assédio", p: "Cobrança de horas extras, adicional noturno, assédio moral e relações disfarçadas (pejotização)." },
    ],
    transito: [
      { h: "Recurso de Multas Indevidas", p: "Análise técnica buscando erros formais, vícios processuais e irregularidades — mesmo quando você acha que errou." },
      { h: "Suspensão de CNH", p: "Defesa técnica em processos administrativos por pontos ou infração grave, com recurso em todas as instâncias." },
      { h: "Cassação de Carteira", p: "Atuação técnica nos casos mais graves de cassação da habilitação, com defesa para reverter a decisão." },
      { h: "Condutores Profissionais", p: "Defesa para motoristas de app, caminhoneiros, taxistas e todos que dependem da CNH para o sustento." },
    ],
  };
  const SHIELD = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L4 7v4c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V7l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>';

  const grid = document.getElementById("solucoes-grid");
  const ctaLink = document.getElementById("solucao-cta");
  const ctaText = document.getElementById("solucao-cta-text");

  function renderTab(key){
    grid.innerHTML = SOLUCOES[key].map((s, i) => `
      <div class="sol-card" style="animation-delay:${i*60}ms">
        <div class="sol-icon">${SHIELD}</div>
        <h4>${s.h}</h4>
        <p>${s.p}</p>
      </div>
    `).join("");
    if (key === "trabalhista") {
      ctaLink.href = WA("Olá Dr. Jefferson, preciso de ajuda com um caso trabalhista.");
      ctaText.textContent = "Consultar sobre caso trabalhista";
    } else {
      ctaLink.href = WA("Olá Dr. Jefferson, preciso de ajuda com uma multa ou CNH.");
      ctaText.textContent = "Consultar sobre multa ou CNH";
    }
  }
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected","false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected","true");
      renderTab(btn.dataset.tab);
    });
  });
  renderTab("trabalhista");

  /* ---------- Linha do tempo do processo ---------- */
  const ETAPAS = [
    { n: "01", t: "Contato Inicial", d: "Você fala diretamente com o Dr. Jefferson pelo WhatsApp. Escuta atenta, sem julgamentos e sem cobrança nessa primeira conversa.", prazo: "Resposta em até 2h" },
    { n: "02", t: "Análise Estratégica do Caso", d: "Estudo completo dos documentos, identificação de provas e definição da melhor tese jurídica para o seu objetivo.", prazo: "Até 48h após envio dos documentos" },
    { n: "03", t: "Plano de Ação e Honorários", d: "Apresentação clara das possibilidades, riscos reais e honorários transparentes. Você decide com toda a informação na mão.", prazo: "Reunião de alinhamento" },
    { n: "04", t: "Protocolo e Acompanhamento", d: "Ingresso da ação ou recurso e acompanhamento ativo de cada movimentação processual, com atualizações periódicas.", prazo: "Atualizações mensais garantidas" },
    { n: "05", t: "Resultado e Recebimento", d: "Execução da sentença, levantamento de valores e orientação final. Seu caso só termina quando o direito é efetivado.", prazo: "Suporte até o encerramento" },
  ];
  const tlList = document.getElementById("timeline-list");
  tlList.innerHTML = ETAPAS.map((e, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    return `
      <li class="timeline-item ${side} reveal" style="transition-delay:${i*0.12}s">
        <span class="timeline-ring" aria-hidden="true"></span>
        <span class="timeline-dot" aria-hidden="true"></span>
        <article class="timeline-card">
          <div class="timeline-head">
            <span class="timeline-num">${e.n}</span>
            <span class="timeline-bar"></span>
          </div>
          <h3>${e.t}</h3>
          <p>${e.d}</p>
          <div class="timeline-prazo">${e.prazo}</div>
        </article>
      </li>
    `;
  }).join("");
  document.querySelectorAll("#timeline-list .reveal").forEach(el => io.observe(el));

  /* ---------- FAQ ---------- */
  const FAQ = [
    { q: "Fui demitida grávida. O que fazer?", a: "A lei é clara: a demissão de gestante é ilegal. A trabalhadora tem direito à estabilidade desde a confirmação da gravidez até 5 meses após o parto — independentemente de a empresa saber ou não da gravidez. Você tem direito à reintegração ou ao pagamento de todos os salários e direitos do período estabilitário." },
    { q: "Sofri um acidente de trabalho e fui demitido, o que devo fazer?", a: "Reúna toda a documentação do acidente (atestados, CAT, laudos e comunicações). Há proteções específicas para vítimas de acidente de trabalho; é possível questionar demissões, buscar indenização, estabilidade acidentária e revisão de verbas. Procure orientação imediata para avaliar prazos e medidas administrativas e judiciais adequadas ao seu caso." },
    { q: "Vale a pena recorrer de multa mesmo se eu achar que errei?", a: "Sim, e você pode se surpreender com o resultado. O auto de infração precisa seguir requisitos formais. Erros de preenchimento, ausência de assinatura, equipamentos sem aferição ou prazo incorreto podem levar ao cancelamento da multa." },
    { q: "Como funciona o atendimento? Preciso ir ao escritório?", a: "Não. Todo o atendimento é 100% online pelo WhatsApp. Você envia os documentos por mensagem, fazemos a análise completa e retornamos com a estratégia de defesa. Rápido, seguro e sem burocracia." },
    { q: "Minha CNH pode ser suspensa por acúmulo de pontos. O que fazer?", a: "Aja imediatamente — o prazo é crucial. Há um processo administrativo antes da suspensão e você tem direito à defesa. É possível recorrer das multas que geraram pontos ou buscar medidas judiciais para suspender os efeitos." },
    { q: "Não recebi minhas verbas rescisórias corretamente. O que posso fazer?", a: "Você tem direito a receber tudo o que a lei prevê. Revisamos saldo de salário, aviso prévio, férias proporcionais, 13º, FGTS e multa de 40%. Havendo irregularidade, é possível ingressar com reclamação trabalhista para reaver os valores com correção e juros." },
  ];
  const faqEl = document.getElementById("faq-list");
  faqEl.innerHTML = FAQ.map((f, i) => `
    <div class="faq-item reveal ${i===0?'open':''}" style="transition-delay:${i*0.06}s">
      <button class="faq-q" aria-expanded="${i===0}">
        <span>${f.q}</span>
        <span class="faq-plus" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div class="faq-a"><div class="faq-a-inner"><div class="faq-a-text">${f.a}</div></div></div>
    </div>
  `).join("");
  document.querySelectorAll("#faq-list .reveal").forEach(el => io.observe(el));
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const opening = !item.classList.contains("open");
      item.classList.toggle("open", opening);
      btn.setAttribute("aria-expanded", opening ? "true" : "false");
    });
  });
})();
