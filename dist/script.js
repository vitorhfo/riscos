

      // ---------------------------
// 1) Seleção dos elementos da interface
// ---------------------------
// Busca todos os slides da apresentação, o container principal e os botões/indicadores visuais.
const slides = [...document.querySelectorAll('.slide')];
      const deck = document.querySelector('.deck');
      const prev = document.querySelector('#prev');
      const next = document.querySelector('#next');
      const introEnter = document.querySelector('#introEnter');
      const current = document.querySelector('#currentSlide');
      const total = document.querySelector('#totalSlides');
      const progress = document.querySelector('#progressBar');
      const modal = document.querySelector('#imageModal');
      const modalImage = document.querySelector('#modalImage');
      const modalGroup = document.querySelector('#modalGroup');
      const modalTitle = document.querySelector('#modalTitle');
      const modalCaptionTitle = document.querySelector('#modalCaptionTitle');
      const modalCaptionText = document.querySelector('#modalCaptionText');
      const modalDots = document.querySelector('#modalDots');
      const modalClose = document.querySelector('#modalClose');
      const modalPrev = document.querySelector('#modalPrev');
      const modalNext = document.querySelector('#modalNext');
      const modalStage = document.querySelector('.modal-stage');

      // ---------------------------
      // 2) Banco de imagens por categoria
      // ---------------------------
      // Cada grupo guarda as imagens relacionadas a uma cor ou a um conjunto de defeitos do cliente.
      // Isso permite abrir um carrossel específico para cada categoria.
      const galleries = {
        amarelo: {
          label: 'Cor amarela',
          items: [
            { src: 'assets/amarelas/amarela_boa.jpg', title: 'Dentro da faixa • 100–140 µm', text: 'Corpo de prova preservado após o ensaio.', alt: 'Corpo de prova amarelo dentro da faixa e preservado após o ensaio' },
            { src: 'assets/amarelas/amarela_ruim.jpg', title: 'Camada elevada • 180–230 µm', text: 'Corpo de prova com desplacamento após o ensaio.', alt: 'Corpo de prova amarelo com camada elevada e desplacamento' },
            { src: 'assets/amarelas/ambas.jpg', title: 'Comparativo amarelo', text: 'As duas condições observadas lado a lado.', alt: 'Comparativo dos corpos de prova amarelos dentro da faixa e com camada elevada' },
          ],
        },
        cinza: {
          label: 'Cor cinza',
          items: [
            { src: 'assets/cinzas/cinza_boa.jpg', title: 'Dentro da faixa • 100–140 µm', text: 'Corpo de prova preservado após o ensaio.', alt: 'Corpo de prova cinza dentro da faixa e preservado após o ensaio' },
            { src: 'assets/cinzas/cinza_ruim.jpg', title: 'Camada elevada • 180–230 µm', text: 'Corpo de prova com desplacamento após o ensaio.', alt: 'Corpo de prova cinza com camada elevada e desplacamento' },
            { src: 'assets/cinzas/cinza_ambas.jpg', title: 'Comparativo cinza', text: 'As duas condições observadas lado a lado.', alt: 'Comparativo dos corpos de prova cinzas dentro da faixa e com camada elevada' },
          ],
        },
        preto: {
          label: 'Cor preta',
          items: [
            { src: 'assets/pretas/pretas_boa.jpg', title: 'Dentro da faixa • 100–140 µm', text: 'Corpo de prova preservado após o ensaio.', alt: 'Corpo de prova preto dentro da faixa e preservado após o ensaio' },
            { src: 'assets/pretas/preta_ruim.jpg', title: 'Camada elevada • 180–230 µm', text: 'Corpo de prova com desplacamento após o ensaio.', alt: 'Corpo de prova preto com camada elevada e desplacamento' },
            { src: 'assets/pretas/pretas-comparativo.jpg', title: 'Comparativo preto', text: 'As duas condições observadas lado a lado.', alt: 'Comparativo dos corpos de prova pretos dentro da faixa e com camada elevada' },
          ],
        },
        cliente: {
          label: 'Ocorrências no cliente',
          items: [
            { src: 'assets/defeitos_cliente/defeito_cliente.jpg', title: 'Ocorrências localizadas', text: 'Registros em regiões de fixação. Evidência para investigação; a causa ainda precisa ser confirmada.', alt: 'Montagem fotográfica com ocorrências de pintura em regiões de fixação no cliente' },
            { src: 'assets/defeitos_cliente/desplacamento_no_cliente.jpg', title: 'Desplacamento no cliente', text: 'Perda de pintura ao redor de pontos de fixação, compatível com uma condição que o ensaio pode não ter representado.', alt: 'Desplacamento de pintura ao redor de pontos de fixação no cliente' },
          ],
        },
      };
      // ---------------------------
      // 3) Estado atual da apresentação
      // ---------------------------
      // index: slide atualmente exibido.
      // touchStartX: posição inicial do swipe no toque.
      // modalTouchStartX: posição inicial do swipe dentro do modal.
      // activeGallery: galeria aberta no momento.
      // galleryIndex: imagem selecionada dentro da galeria atual.
      let index = 0;
      let touchStartX = 0;
      let modalTouchStartX = 0;
      let activeGallery = null;
      let galleryIndex = 0;

      // Atualiza o contador total de slides no topo da apresentação.
      total.textContent = String(slides.length).padStart(2, '0');

      // ---------------------------
      // 4) Navegação entre slides
      // ---------------------------
      // A função show() garante que o slide solicitado fique visível, respeitando os limites do array.
      function show(target) {
        const nextIndex = Math.max(0, Math.min(slides.length - 1, target));
        if (nextIndex === index) return;
        const direction = nextIndex > index ? 1 : -1;
        slides[index].classList.remove('is-active');
        slides[index].classList.toggle('was-active', direction > 0);
        index = nextIndex;
        slides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === index);
          if (i !== index && direction < 0) slide.classList.remove('was-active');
        });
        update();
      }

      // Atualiza a interface conforme o slide atual.
      // Mantém contador, progresso, nav e estado do deck sincronizados.
      function update() {
        current.textContent = String(index + 1).padStart(2, '0');
        progress.style.width = `${((index + 1) / slides.length) * 100}%`;
        prev.disabled = index === 0;
        next.disabled = index === slides.length - 1;
        deck.classList.toggle('is-intro', index === 0);
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
        history.replaceState(null, '', `#${index + 1}`);
        requestAnimationFrame(() => fitSlide(slides[index]));
      }

      // Ajusta o zoom do conteúdo para caber na área visible do slide.
      function fitSlide(slide) {
        const content = slide.querySelector('.content');
        if (!content) return;
        content.style.transform = '';
        const styles = getComputedStyle(slide);
        const availableHeight = slide.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
        const availableWidth = slide.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        const scale = Math.min(1, availableHeight / content.scrollHeight, availableWidth / content.scrollWidth);
        if (scale < .995) content.style.transform = `scale(${Math.max(scale * .985, .62)})`;
      }

      function fitCurrentSlide() {
        requestAnimationFrame(() => fitSlide(slides[index]));
      }

      // ---------------------------
      // 5) Modal de imagens e carrossel
      // ---------------------------
      // renderGallery() atualiza o modal com a foto e legenda corretas da galeria ativa.
      function renderGallery() {
        if (!activeGallery) return;
        const gallery = galleries[activeGallery];
        const item = gallery.items[galleryIndex];
        modalGroup.textContent = `${gallery.label} • ${galleryIndex + 1} de ${gallery.items.length}`;
        modalTitle.textContent = item.title;
        modalImage.src = item.src;
        modalImage.alt = item.alt;
        modalCaptionTitle.textContent = item.title;
        modalCaptionText.textContent = item.text;
        modalDots.replaceChildren(...gallery.items.map((_, dotIndex) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `modal-dot${dotIndex === galleryIndex ? ' is-active' : ''}`;
          dot.setAttribute('aria-label', `Ver imagem ${dotIndex + 1}`);
          if (dotIndex === galleryIndex) dot.setAttribute('aria-current', 'true');
          dot.addEventListener('click', () => { galleryIndex = dotIndex; renderGallery(); });
          return dot;
        }));
      }

      // Abre a galeria ampliada e define qual imagem será exibida primeiro.
      function openGallery(name, start = 0) {
        if (!galleries[name]) return;
        activeGallery = name;
        galleryIndex = Math.max(0, Math.min(galleries[name].items.length - 1, start));
        renderGallery();
        document.body.classList.add('modal-open');
        modal.showModal();
        modalClose.focus();
      }

      // Navega para a próxima ou anterior imagem da galeria atual.
      function stepGallery(direction) {
        if (!activeGallery) return;
        const length = galleries[activeGallery].items.length;
        galleryIndex = (galleryIndex + direction + length) % length;
        renderGallery();
      }

      // Fecha o modal e limpa o estado da galeria aberta.
      function closeGallery() {
        if (modal.open) modal.close();
      }

      // ---------------------------
      // 6) Eventos de interação
      // ---------------------------
      // Conecta os botões e elementos da página às funções de navegação e abertura do modal.
      prev.addEventListener('click', () => show(index - 1));
      next.addEventListener('click', () => show(index + 1));
      introEnter.addEventListener('click', () => show(1));
      document.querySelectorAll('[data-gallery]').forEach((trigger) => {
        trigger.addEventListener('click', () => openGallery(trigger.dataset.gallery, Number(trigger.dataset.start || 0)));
      });
      modalClose.addEventListener('click', closeGallery);
      modalPrev.addEventListener('click', () => stepGallery(-1));
      modalNext.addEventListener('click', () => stepGallery(1));
      modal.addEventListener('click', (event) => { if (event.target === modal) closeGallery(); });
      modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); activeGallery = null; modalImage.removeAttribute('src'); });

      // Permite avançar/retroceder com teclado, além de navegação por swipe em telas touch.
      document.addEventListener('keydown', (event) => {
        if (modal.open) {
          if (event.key === 'ArrowRight') { event.preventDefault(); stepGallery(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); stepGallery(-1); }
          return;
        }
        if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) { event.preventDefault(); show(index + 1); }
        if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); show(index - 1); }
        if (event.key === 'Home') show(0);
        if (event.key === 'End') show(slides.length - 1);
      });
      document.addEventListener('touchstart', (event) => { if (!modal.open) touchStartX = event.changedTouches[0].clientX; }, { passive: true });
      document.addEventListener('touchend', (event) => {
        if (modal.open) return;
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 48) show(index + (distance < 0 ? 1 : -1));
      }, { passive: true });
      modalStage.addEventListener('touchstart', (event) => { modalTouchStartX = event.changedTouches[0].clientX; }, { passive: true });
      modalStage.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].clientX - modalTouchStartX;
        if (Math.abs(distance) > 48) stepGallery(distance < 0 ? 1 : -1);
      }, { passive: true });

      // Ajusta o slide quando a janela é redimensionada ou quando as imagens terminam de carregar.
      window.addEventListener('resize', fitCurrentSlide);
      document.querySelectorAll('img').forEach((img) => img.addEventListener('load', fitCurrentSlide, { once: true }));

      // ---------------------------
      // 7) Estado inicial da apresentação
      // ---------------------------
      // Ao abrir a página com hash, como #3, o script reaproveita o slide correto.
      const initial = Number(location.hash.slice(1)) - 1;
      if (Number.isInteger(initial) && initial >= 0 && initial < slides.length) {
        slides[0].classList.remove('is-active');
        index = initial;
        slides[index].classList.add('is-active');
      }
      update();
