class SmartDailyApp {
  constructor() {
    this.currentPage = 'dashboard';
    this.currentWordIndex = 0;
    this.favorites = JSON.parse(localStorage.getItem('smartDailyFavorites') || '[]');
    this.learnedWords = JSON.parse(localStorage.getItem('smartDailyLearned') || '[]');
    this.studyState = null;
    this.stickyTodos = this.loadStickyTodos();

    this.layoutEditing = false;
    this.layoutConfig = this.loadLayoutConfig();
    this.init();
  }

  init() {
    this.initParticles();
    this.initClock();
    this.initNavigation();
    this.initSearch();
    this.initSoundToggle();
    this.renderHotTopics();
    this.renderCategoryCards();
    this.renderWord();
    this.renderSentences();
    this.renderNewsVocab();
    this.initNewsGrids();
    this.initEnglishPlugin();
    this.initFavorites();
    this.initModal();
    this.initRefresh();
    this.initDownload();
    this.initStickyNote();
    this.initLayoutEditor();
    this.applyLayoutConfig();
    this.loadLeisureCache();
    this.initLeisure();
    this.checkDailyUpdate();
    this.initMobileOptimizations();
  }

  /* ===== 移动端优化 ===== */
  initMobileOptimizations() {
    // 检测是否为移动设备
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    // 移动端触摸优化：防止双击缩放
    document.addEventListener('touchend', (e) => {
      if (e.target.closest('.flashcard') || e.target.closest('.study-btn') || e.target.closest('.visual-option')) {
        e.preventDefault();
        e.target.click();
      }
    }, { passive: false });

    // 键盘模式自动聚焦优化
    const kbInput = document.getElementById('kbInput');
    if (kbInput) {
      kbInput.addEventListener('blur', () => {
        // 在移动端，延迟重新聚焦，避免软键盘收起
        if (this.isMobile && this.studyState && this.studyState.mode === 'keyboard' && !this.studyState.keyboardChecked) {
          setTimeout(() => kbInput.focus(), 300);
        }
      });
    }
  }

  toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileMenuOverlay');
    sidebar.classList.add('mobile-open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileMenuOverlay');
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  setMobileNavActive(el) {
    document.querySelectorAll('.mobile-nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    // 同步侧边栏
    const page = el.dataset.page;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  }

  initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*0.4+0.1}`;
      container.appendChild(p);
    }
  }

  initClock() {
    const update = () => {
      const now = new Date();
      document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      document.getElementById('dateDisplay').textContent = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    };
    update();
    setInterval(update, 1000);
  }

  initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('mouseenter', () => audioManager.hover());
      item.addEventListener('click', () => {
        audioManager.click();
        const page = item.dataset.page;
        this.switchPage(page);
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        // 移动端关闭菜单
        if (this.isMobile) {
          this.closeMobileMenu();
        }
      });
    });
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('mouseenter', () => audioManager.hover());
      card.addEventListener('click', () => {
        audioManager.click();
        const cat = card.dataset.category;
        this.switchPage(cat);
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector(`.nav-item[data-page="${cat}"]`)?.classList.add('active');
      });
    });
  }

  switchPage(page) {
    // 记录浏览历史用于返回
    if (this.currentPage && this.currentPage !== page) {
      if (!this.pageHistory) this.pageHistory = [];
      this.pageHistory.push(this.currentPage);
    }
    this.currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`)?.classList.add('active');
    if (page === 'favorites') this.renderFavorites();
    if (page === 'english') {
      this.renderWord();
      this.renderSentences();
      this.renderNewsVocab();
    }
    if (page === 'leisure') this.renderLeisureData();
    // 同步移动端底部导航
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
    // 同步侧边栏
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateMobileBackButton();
  }

  goBack() {
    if (!this.pageHistory || this.pageHistory.length === 0) {
      this.switchPage('dashboard');
      return;
    }
    const prevPage = this.pageHistory.pop();
    this.currentPage = prevPage;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${prevPage}`)?.classList.add('active');
    if (prevPage === 'favorites') this.renderFavorites();
    if (prevPage === 'english') {
      this.renderWord();
      this.renderSentences();
      this.renderNewsVocab();
    }
    if (prevPage === 'leisure') this.renderLeisureData();
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === prevPage);
    });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${prevPage}"]`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateMobileBackButton();
  }

  updateMobileBackButton() {
    const backBtn = document.getElementById('mobileBackBtn');
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (!backBtn || !menuBtn) return;
    if (this.currentPage !== 'dashboard') {
      backBtn.style.display = 'flex';
      menuBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'none';
      menuBtn.style.display = 'flex';
    }
  }

  initSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      if (!q) { document.querySelectorAll('.news-card').forEach(c => c.style.display = ''); return; }
      document.querySelectorAll('.news-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  initSoundToggle() {
    const btn = document.getElementById('soundToggle');
    const icon = btn.querySelector('.sound-icon');
    icon.textContent = audioManager.enabled ? '🔊' : '🔇';
    btn.addEventListener('click', () => {
      const on = audioManager.toggle();
      icon.textContent = on ? '🔊' : '🔇';
      this.showToast(on ? '音效已开启' : '音效已关闭', 'info');
    });
  }

  renderHotTopics() {
    const list = document.getElementById('hotTopics');
    const catMap = {
      'AI 技术': 'ai',
      '财经股市': 'finance',
      '英语学习': 'english',
      '计算机': 'tech',
      '气象地质': 'science',
      '知识科普': 'knowledge',
      '体育': 'sports',
      '娱乐': 'entertainment',
      '国际新闻': 'international'
    };
    list.innerHTML = hotTopics.map(t => `
      <div class="topic-item" onclick="app.openNews('${catMap[t.category] || 'tech'}', ${t.rank - 1})">
        <div class="topic-rank ${t.hot ? 'hot' : t.rank <= 3 ? 'warm' : 'normal'}">${t.rank}</div>
        <div class="topic-info">
          <div class="topic-title">${t.title}</div>
          <div class="topic-meta"><span>🏷️ ${t.category}</span><span>🕐 ${t.time}</span></div>
        </div>
        <div class="topic-arrow">→</div>
      </div>
    `).join('');
  }

  renderCategoryCards() {
    // 动态更新数字
    const counts = {
      ai: newsData.ai.length,
      finance: newsData.finance.length,
      english: newsData.english.length,
      tech: newsData.tech.length,
      science: newsData.science.length,
      knowledge: newsData.knowledge.length,
      sports: newsData.sports.length,
      entertainment: newsData.entertainment.length,
      international: newsData.international.length
    };
    const total = Object.values(counts).reduce((a, b) => a + b, 0) + newsData.history.length;
    const totalEl = document.getElementById('totalNewsCount');
    if (totalEl) totalEl.textContent = total;

    document.querySelectorAll('.category-card').forEach(card => {
      const cat = card.dataset.category;
      const info = card.querySelector('.category-info p');
      if (info && counts[cat] !== undefined) {
        info.textContent = `${counts[cat]} 条新资讯`;
      }
    });
  }

  renderWord() {
    const w = wordData[this.currentWordIndex];
    document.getElementById('dailyWord').textContent = w.word;
    document.getElementById('dailyPhonetic').textContent = w.phonetic;
    document.getElementById('dailyMeaning').textContent = w.meaning;
    document.getElementById('dailyExample').innerHTML = `"${w.example}"<span class="example-trans">${w.exampleTrans}</span>`;
    const miniWordEl = document.getElementById('miniWord');
    if (miniWordEl) miniWordEl.textContent = w.word;
    const miniMeaningEl = document.getElementById('miniMeaning');
    if (miniMeaningEl) miniMeaningEl.textContent = w.meaning;
    const learnedCountEl = document.getElementById('learnedCount');
    if (learnedCountEl) learnedCountEl.textContent = this.learnedWords.length;
    const progressFill = document.querySelector('#tab-word .progress-fill');
    if (progressFill) progressFill.style.width = `${(this.learnedWords.length / 10) * 100}%`;
  }

  renderSentences() {
    const list = document.getElementById('sentenceList');
    list.innerHTML = sentenceData.map((s, i) => `
      <div class="sentence-item" onclick="app.speak('${s.en.replace(/'/g, "\\'")}')">
        <div class="sentence-en">${s.en}</div>
        <div class="sentence-cn">${s.cn}</div>
        <div class="sentence-source">— ${s.source} · ${s.tag}</div>
      </div>
    `).join('');
  }

  renderNewsVocab() {
    const list = document.getElementById('newsVocabList');
    list.innerHTML = newsVocabData.map(v => `
      <div class="vocab-tag" onclick="app.speak('${v.word}');app.showToast('${v.word}: ${v.meaning}', 'info')">
        ${v.word}
      </div>
    `).join('');
  }

  initNewsGrids() {
    const render = (data, id) => {
      const grid = document.getElementById(id);
      if (!grid) return;
      grid.innerHTML = data.map(item => this.createNewsCard(item)).join('');
    };
    render(newsData.ai, 'aiNewsGrid');
    render(newsData.finance, 'financeNewsGrid');
    render(newsData.english, 'englishNewsGrid');
    render(newsData.tech, 'techNewsGrid');
    render(newsData.science, 'scienceNewsGrid');
    render(newsData.sports, 'sportsNewsGrid');
    render(newsData.entertainment, 'entertainmentNewsGrid');
    render(newsData.international, 'internationalNewsGrid');
    render(newsData.history, 'historyNewsGrid');
    this.initKnowledge();
  }

  createNewsCard(item) {
    const isFav = this.favorites.includes(item.id);
    return `
      <div class="news-card" data-id="${item.id}" onclick="app.toggleExpand(this, '${item.id}')">
        <div class="news-image" style="background: ${this.getGradient(item.category)}">
          <span style="z-index:1">${item.icon}</span>
          <span class="news-category">${item.category}</span>
        </div>
        <div class="news-content">
          <div class="news-title">${item.title}</div>
          <div class="news-summary">${item.summary}</div>
          <div class="news-footer">
            <div class="news-meta">
              <span>📰 ${item.source}</span>
              <span>🕐 ${item.date}</span>
              <span>⏱️ ${item.readTime}</span>
            </div>
            <div class="news-actions">
              <button class="news-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation();app.toggleFavorite('${item.id}')">
                ${isFav ? '⭐' : '☆'}
              </button>
              <button class="news-btn" onclick="event.stopPropagation();app.downloadItem('${item.id}')">💾</button>
            </div>
          </div>
        </div>
        <div class="news-expand" style="display:none">
          <div class="expand-divider"></div>
          <div class="expand-body">
            <div class="expand-icon-large">${item.icon}</div>
            <h3 class="expand-title">${item.title}</h3>
            <div class="expand-meta">
              <span>📰 ${item.source}</span>
              <span>🕐 ${item.date}</span>
              <span>⏱️ ${item.readTime}</span>
            </div>
            <div class="expand-summary">${item.content ? item.content.replace(/\n/g, '<br>') : item.summary}</div>
            <div class="expand-actions">
              <a href="${item.url}" target="_blank" class="expand-btn primary" onclick="event.stopPropagation()">阅读原文 →</a>
              <button class="expand-btn" onclick="event.stopPropagation();app.toggleFavorite('${item.id}')">${isFav ? '⭐ 已收藏' : '☆ 收藏'}</button>
              <button class="expand-btn" onclick="event.stopPropagation();app.downloadItem('${item.id}')">💾 下载</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  toggleExpand(card, id) {
    audioManager.click();
    const expand = card.querySelector('.news-expand');
    const isExpanded = expand.style.display === 'block';
    document.querySelectorAll('.news-expand').forEach(e => {
      e.style.display = 'none';
      e.closest('.news-card').classList.remove('expanded');
    });
    if (!isExpanded) {
      expand.style.display = 'block';
      card.classList.add('expanded');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  initKnowledge() {
    const grid = document.getElementById('knowledgeNewsGrid');
    if (!grid || typeof knowledgeData === 'undefined') return;
    grid.innerHTML = knowledgeData.map(item => this.createNewsCard(item)).join('');
    document.querySelectorAll('.knowledge-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        audioManager.switch();
        document.querySelectorAll('.knowledge-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const filterTag = tag.dataset.tag;
        const data = filterTag === 'all' ? knowledgeData : knowledgeData.filter(item => item.tags && item.tags.includes(filterTag));
        grid.innerHTML = data.map(item => this.createNewsCard(item)).join('');
      });
    });
  }

  getGradient(category) {
    const map = {
      'AI 技术': 'var(--gradient-1)',
      '财经股市': 'var(--gradient-2)',
      '英语学习': 'var(--gradient-3)',
      '计算机': 'var(--gradient-5)',
      '气象地质': 'var(--gradient-4)',
      '知识科普': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '体育': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      '娱乐': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      '国际新闻': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      '经典回顾': 'linear-gradient(135deg, #8b7355 0%, #c2b280 100%)'
    };
    return map[category] || 'var(--gradient-1)';
  }

  initEnglishPlugin() {
    // 英语学习中心 Tabs
    document.querySelectorAll('.english-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        audioManager.switch();
        document.querySelectorAll('.english-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.english-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`epanel-${tab.dataset.etab}`)?.classList.add('active');
      });
    });

    // 每日英语子 Tabs
    document.querySelectorAll('.daily-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        audioManager.switch();
        document.querySelectorAll('.daily-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.daily-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`dpanel-${tab.dataset.dtab}`)?.classList.add('active');
      });
    });

    // 原有的每日一词按钮
    const nextBtn = document.getElementById('nextWordBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        audioManager.word();
        this.currentWordIndex = (this.currentWordIndex + 1) % wordData.length;
        this.renderWord();
      });
    }
    const collectBtn = document.getElementById('collectWordBtn');
    if (collectBtn) {
      collectBtn.addEventListener('click', () => {
        audioManager.favorite();
        const w = wordData[this.currentWordIndex];
        if (!this.learnedWords.includes(w.word)) {
          this.learnedWords.push(w.word);
          localStorage.setItem('smartDailyLearned', JSON.stringify(this.learnedWords));
          this.renderWord();
          this.showToast(`已收藏单词: ${w.word}`, 'success');
        } else {
          this.showToast('该单词已收藏', 'info');
        }
      });
    }
    const speakBtn = document.getElementById('speakWordBtn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        this.speak(wordData[this.currentWordIndex].word);
      });
    }

    // 初始化单词书
    this.renderWordBooks();
    this.initStudySetup();
    this.initKeyboardInput();
  }

  renderWordBooks() {
    const grid = document.getElementById('wordbookGrid');
    if (!grid || typeof wordBooks === 'undefined') return;
    grid.innerHTML = wordBooks.map(book => `
      <div class="wordbook-card" style="--book-color: ${book.color}" onclick="app.selectWordBook('${book.id}')">
        <div class="wordbook-icon">${book.icon}</div>
        <div class="wordbook-info">
          <h4 class="wordbook-name">${book.name}</h4>
          <p class="wordbook-desc">${book.desc}</p>
          <div class="wordbook-meta">
            <span>📖 ${book.total} 词</span>
            <span class="wordbook-arrow">开始 →</span>
          </div>
        </div>
        <div class="wordbook-shine"></div>
      </div>
    `).join('');
  }

  selectWordBook(bookId) {
    audioManager.click();
    // 切换到背单词 tab
    document.querySelectorAll('.english-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.english-tab[data-etab="study"]')?.classList.add('active');
    document.querySelectorAll('.english-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('epanel-study')?.classList.add('active');
    // 自动选择单词书
    const select = document.getElementById('studyBookSelect');
    if (select) select.value = bookId;
    this.showToast(`已选择: ${wordBooks.find(b => b.id === bookId)?.name}`, 'info');
  }

  initStudySetup() {
    // 填充单词书下拉框
    const select = document.getElementById('studyBookSelect');
    if (select && typeof wordBooks !== 'undefined') {
      wordBooks.forEach(book => {
        const opt = document.createElement('option');
        opt.value = book.id;
        opt.textContent = `${book.icon} ${book.name} (${book.total}词)`;
        select.appendChild(opt);
      });
    }

    // 学习模式选择
    document.querySelectorAll('.mode-option').forEach(opt => {
      opt.addEventListener('click', () => {
        audioManager.switch();
        document.querySelectorAll('.mode-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      });
    });

    // 每日目标滑块
    const goalSlider = document.getElementById('dailyGoal');
    const goalVal = document.getElementById('dailyGoalVal');
    if (goalSlider && goalVal) {
      goalSlider.addEventListener('input', (e) => {
        goalVal.textContent = e.target.value;
      });
    }

    // 开始学习按钮
    const startBtn = document.getElementById('btnStartStudy');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startStudy());
    }
  }

  startStudy() {
    const bookId = document.getElementById('studyBookSelect')?.value;
    if (!bookId) {
      this.showToast('请先选择一本单词书', 'error');
      return;
    }
    const book = wordBooks.find(b => b.id === bookId);
    if (!book) return;

    const mode = document.querySelector('.mode-option.active')?.dataset.mode || 'card';
    const goal = parseInt(document.getElementById('dailyGoal')?.value || '10');

    this.studyState = {
      book: book,
      mode: mode,
      goal: goal,
      words: [...book.words].sort(() => Math.random() - 0.5).slice(0, Math.min(goal, book.words.length)),
      currentIndex: 0,
      results: [],
      flipped: false,
      keyboardChecked: false
    };

    document.getElementById('studySetup').style.display = 'none';
    document.getElementById('studyInterface').style.display = 'block';
    document.getElementById('studyComplete').style.display = 'none';

    // 显示对应模式
    document.querySelectorAll('.study-mode-area').forEach(a => a.classList.remove('active'));
    document.getElementById(`mode-${mode}`)?.classList.add('active');

    this.updateStudyProgress();
    this.renderStudyWord();
    audioManager.click();
    // 初始化卡片滑动
    this.initCardSwipe();
    // 移动端键盘模式自动聚焦
    if (this.isMobile && mode === 'keyboard') {
      setTimeout(() => document.getElementById('kbInput')?.focus(), 500);
    }
  }

  updateStudyProgress() {
    const s = this.studyState;
    const pct = ((s.currentIndex) / s.goal) * 100;
    document.getElementById('studyProgressFill').style.width = `${pct}%`;
    document.getElementById('studyProgressText').textContent = `${Math.min(s.currentIndex + 1, s.goal)} / ${s.goal}`;
  }

  renderStudyWord() {
    const s = this.studyState;
    if (s.currentIndex >= s.words.length) {
      this.showStudyComplete();
      return;
    }
    const w = s.words[s.currentIndex];
    s.flipped = false;
    s.keyboardChecked = false;

    // 卡片模式
    document.getElementById('cardWord').textContent = w.word;
    document.getElementById('cardPhonetic').textContent = w.phonetic;
    document.getElementById('cardMeaning').textContent = w.meaning;
    document.getElementById('cardExample').textContent = w.example;
    document.getElementById('cardExampleTrans').textContent = w.exampleTrans;
    document.getElementById('flashcardInner').style.transform = '';

    // 键盘模式
    document.getElementById('kbMeaning').textContent = w.meaning;
    document.getElementById('kbPhoneticHint').textContent = '';
    const kbInput = document.getElementById('kbInput');
    if (kbInput) {
      kbInput.value = '';
      kbInput.disabled = false;
      kbInput.className = 'keyboard-input';
      // 移动端延迟聚焦，等界面渲染完成
      if (this.isMobile) {
        setTimeout(() => kbInput.focus(), 400);
      } else {
        kbInput.focus();
      }
    }
    document.getElementById('kbFeedback').textContent = '';
    document.getElementById('kbFeedback').className = 'keyboard-feedback';
    document.getElementById('kbSceneEmoji').textContent = w.image || '📖';
    document.getElementById('kbSceneDesc').textContent = w.scene || '';

    // 图文模式
    document.getElementById('visualScene').textContent = w.image || '📖';
    document.getElementById('visualSceneDesc').textContent = w.scene || '';
    document.getElementById('visualMeaning').textContent = w.meaning;
    this.renderVisualOptions(w);
  }

  renderVisualOptions(correctWord) {
    const container = document.getElementById('visualOptions');
    if (!container) return;
    // 从所有单词书中随机选3个错误答案
    const allWords = wordBooks.flatMap(b => b.words);
    const wrongOptions = allWords.filter(w => w.word !== correctWord.word).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...wrongOptions, correctWord].sort(() => Math.random() - 0.5);
    
    container.innerHTML = options.map(opt => `
      <button class="visual-option" onclick="app.checkVisualAnswer('${opt.word}', '${correctWord.word}')">${opt.word}</button>
    `).join('');
  }

  flipCard() {
    audioManager.click();
    this.studyState.flipped = !this.studyState.flipped;
    const inner = document.getElementById('flashcardInner');
    inner.style.transform = this.studyState.flipped ? 'rotateY(180deg)' : '';
  }

  initCardSwipe() {
    const card = document.getElementById('flashcard');
    if (!card || card.dataset.swipeInited) return;
    card.dataset.swipeInited = '1';

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // 如果水平滑动距离大于垂直滑动，阻止滚动
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    card.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const minSwipe = 60;

      // 水平滑动：左滑忘记，右滑记得
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
        if (dx > 0) {
          this.markWord(true); // 右滑 = 记得
        } else {
          this.markWord(false); // 左滑 = 忘记
        }
      } else if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        // 轻触翻转
        this.flipCard();
      }
    }, { passive: true });
  }

  speakCurrentWord() {
    const s = this.studyState;
    if (s && s.words[s.currentIndex]) {
      this.speak(s.words[s.currentIndex].word);
    }
  }

  markWord(remembered) {
    audioManager.click();
    const s = this.studyState;
    s.results.push({ word: s.words[s.currentIndex], remembered });
    s.currentIndex++;
    this.updateStudyProgress();
    this.renderStudyWord();
  }

  checkKeyboardAnswer() {
    const s = this.studyState;
    if (s.keyboardChecked) {
      // 已经检查过，进入下一个
      s.currentIndex++;
      this.updateStudyProgress();
      this.renderStudyWord();
      return;
    }
    const input = document.getElementById('kbInput');
    const feedback = document.getElementById('kbFeedback');
    const w = s.words[s.currentIndex];
    const val = input.value.trim().toLowerCase();
    
    if (!val) {
      feedback.textContent = '请输入单词';
      feedback.className = 'keyboard-feedback hint';
      return;
    }
    
    s.keyboardChecked = true;
    input.disabled = true;
    
    if (val === w.word.toLowerCase()) {
      feedback.innerHTML = `✅ 正确！<span class="correct-word">${w.word}</span> ${w.phonetic}`;
      feedback.className = 'keyboard-feedback correct';
      audioManager.success();
      s.results.push({ word: w, remembered: true });
      setTimeout(() => {
        s.currentIndex++;
        this.updateStudyProgress();
        this.renderStudyWord();
      }, 1500);
    } else {
      feedback.innerHTML = `❌ 正确答案是 <span class="correct-word">${w.word}</span> ${w.phonetic}<br><span class="word-meaning-fb">${w.meaning}</span>`;
      feedback.className = 'keyboard-feedback wrong';
      audioManager.click();
      s.results.push({ word: w, remembered: false });
      setTimeout(() => {
        s.currentIndex++;
        this.updateStudyProgress();
        this.renderStudyWord();
      }, 2500);
    }
  }

  showKeyboardHint() {
    const s = this.studyState;
    const w = s.words[s.currentIndex];
    const feedback = document.getElementById('kbFeedback');
    const firstLetter = w.word.charAt(0).toUpperCase();
    feedback.innerHTML = `💡 提示：首字母是 <strong>${firstLetter}</strong>，共 ${w.word.length} 个字母`;
    feedback.className = 'keyboard-feedback hint';
  }

  checkVisualAnswer(selected, correct) {
    const s = this.studyState;
    const buttons = document.querySelectorAll('.visual-option');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.classList.add('correct');
      } else if (btn.textContent === selected && selected !== correct) {
        btn.classList.add('wrong');
      }
    });
    
    const remembered = selected === correct;
    if (remembered) {
      audioManager.success();
    } else {
      audioManager.click();
    }
    s.results.push({ word: s.words[s.currentIndex], remembered });
    
    setTimeout(() => {
      s.currentIndex++;
      this.updateStudyProgress();
      this.renderStudyWord();
    }, remembered ? 1200 : 2000);
  }

  showStudyComplete() {
    document.querySelectorAll('.study-mode-area').forEach(a => a.classList.remove('active'));
    document.getElementById('studyComplete').style.display = 'block';
    const s = this.studyState;
    const correct = s.results.filter(r => r.remembered).length;
    const wrong = s.results.filter(r => !r.remembered).length;
    document.getElementById('completeTotal').textContent = s.results.length;
    document.getElementById('completeCorrect').textContent = correct;
    document.getElementById('completeWrong').textContent = wrong;
    
    // 保存学习记录
    const learned = JSON.parse(localStorage.getItem('smartDailyLearned') || '[]');
    s.results.filter(r => r.remembered).forEach(r => {
      if (!learned.includes(r.word.word)) learned.push(r.word.word);
    });
    localStorage.setItem('smartDailyLearned', JSON.stringify(learned));
    
    // 更新首页统计
    document.getElementById('entryLearnedCount').textContent = learned.length;
    audioManager.success();
  }

  restartStudy() {
    this.startStudy();
  }

  showStudySetup() {
    document.getElementById('studySetup').style.display = 'block';
    document.getElementById('studyInterface').style.display = 'none';
    document.getElementById('studyComplete').style.display = 'none';
  }

  initKeyboardInput() {
    const input = document.getElementById('kbInput');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkKeyboardAnswer();
        }
      });
    }
  }

  speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  }

  toggleFavorite(id) {
    audioManager.favorite();
    const idx = this.favorites.indexOf(id);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.showToast('已取消收藏', 'info');
    } else {
      this.favorites.push(id);
      this.showToast('已添加到收藏', 'success');
    }
    localStorage.setItem('smartDailyFavorites', JSON.stringify(this.favorites));
    this.initNewsGrids();
    if (this.currentPage === 'favorites') this.renderFavorites();
  }

  renderFavorites() {
    const all = [
      ...newsData.ai, ...newsData.finance, ...newsData.english,
      ...newsData.tech, ...newsData.science, ...newsData.knowledge,
      ...newsData.sports, ...newsData.entertainment, ...newsData.international,
      ...newsData.history
    ];
    const favs = all.filter(item => this.favorites.includes(item.id));
    const grid = document.getElementById('favoritesGrid');
    grid.innerHTML = favs.length ? favs.map(item => this.createNewsCard(item)).join('') : '<div style="text-align:center;padding:60px;color:var(--text-muted)"><div style="font-size:48px;margin-bottom:16px">⭐</div><div>暂无收藏内容</div><div style="font-size:13px;margin-top:8px">浏览资讯时点击 ☆ 即可收藏</div></div>';
  }

  initFavorites() {
    document.getElementById('exportFavorites')?.addEventListener('click', () => this.exportFavorites());
    document.getElementById('exportCloud')?.addEventListener('click', () => this.showToast('云端备份功能开发中...', 'info'));
    document.getElementById('clearFavorites')?.addEventListener('click', () => {
      if (confirm('确定要清空所有收藏吗？')) {
        this.favorites = [];
        localStorage.setItem('smartDailyFavorites', '[]');
        this.renderFavorites();
        this.showToast('收藏已清空', 'info');
      }
    });
  }

  exportFavorites() {
    audioManager.download();
    const all = [
      ...newsData.ai, ...newsData.finance, ...newsData.english,
      ...newsData.tech, ...newsData.science, ...newsData.knowledge,
      ...newsData.sports, ...newsData.entertainment, ...newsData.international,
      ...newsData.history
    ];
    const favs = all.filter(item => this.favorites.includes(item.id));
    const data = { exportDate: new Date().toISOString(), favorites: favs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-daily-favorites-${new Date().toLocaleDateString('zh-CN')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('收藏已导出到本地', 'success');
  }

  downloadItem(id) {
    audioManager.download();
    const all = [
      ...newsData.ai, ...newsData.finance, ...newsData.english,
      ...newsData.tech, ...newsData.science, ...newsData.knowledge,
      ...newsData.sports, ...newsData.entertainment, ...newsData.international,
      ...newsData.history
    ];
    const item = all.find(i => i.id === id);
    if (!item) return;
    const body = item.content || item.summary;
    const content = `${item.title}\n\n来源: ${item.source}\n日期: ${item.date}\n阅读时间: ${item.readTime}\n\n${body}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.slice(0, 30)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('资料已下载到本地', 'success');
  }

  initModal() {
    document.getElementById('modalClose').addEventListener('click', () => {
      document.getElementById('modalOverlay').classList.remove('active');
    });
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('active');
      }
    });
  }

  openNews(category, index) {
    const data = newsData[category];
    if (!data || !data[index]) return;
    const item = data[index];
    document.getElementById('modalBody').innerHTML = `
      <div style="text-align:center;margin-bottom:20px;font-size:64px">${item.icon}</div>
      <h2 style="font-family:'Noto Serif SC',serif;font-size:22px;margin-bottom:12px">${item.title}</h2>
      <div style="display:flex;gap:16px;justify-content:center;margin-bottom:20px;font-size:13px;color:var(--text-muted)">
        <span>📰 ${item.source}</span><span>🕐 ${item.date}</span><span>⏱️ ${item.readTime}</span>
      </div>
      <div style="line-height:1.8;color:var(--text-secondary);margin-bottom:24px">${item.content ? item.content.replace(/\n/g, '<br>') : item.summary}</div>
      <div style="display:flex;gap:12px;justify-content:center">
        <button onclick="app.toggleFavorite('${item.id}')" style="padding:10px 24px;border:1px solid var(--glass-border);background:var(--glass-bg);border-radius:var(--radius-lg);cursor:pointer;font-size:14px">${this.favorites.includes(item.id) ? '⭐ 已收藏' : '☆ 收藏'}</button>
      </div>
    `;
    document.getElementById('modalOverlay').classList.add('active');
  }

  initRefresh() {
    document.getElementById('refreshBtn').addEventListener('click', () => {
      audioManager.click();
      this.showToast('正在刷新最新资讯...', 'info');
      setTimeout(() => {
        this.showToast('资讯已更新至最新', 'success');
        audioManager.success();
      }, 1500);
    });
  }

  initDownload() {
    document.getElementById('downloadAllBtn').addEventListener('click', () => {
      audioManager.download();
      this.exportFavorites();
    });
  }

  checkDailyUpdate() {
    const last = localStorage.getItem('smartDailyLastUpdate');
    const today = new Date().toLocaleDateString('zh-CN');
    if (last !== today) {
      setTimeout(() => {
        audioManager.notify();
        this.showToast('🌅 早安！今日资讯已更新，共 35 条', 'success');
        localStorage.setItem('smartDailyLastUpdate', today);
      }, 2000);
    }
  }

  // ==================== 便利贴 ====================
  loadStickyTodos() {
    const today = new Date().toLocaleDateString('zh-CN');
    const data = JSON.parse(localStorage.getItem('smartDailySticky') || '{}');
    if (data.date !== today) {
      return { date: today, items: [] };
    }
    return data;
  }

  saveStickyTodos() {
    localStorage.setItem('smartDailySticky', JSON.stringify(this.stickyTodos));
  }

  initStickyNote() {
    const dateEl = document.getElementById('stickyDate');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
    }
    this.renderStickyTodos();
    const input = document.getElementById('stickyInput');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.addStickyTodo();
      });
    }
  }

  renderStickyTodos() {
    const list = document.getElementById('stickyTodoList');
    if (!list) return;
    if (!this.stickyTodos.items || this.stickyTodos.items.length === 0) {
      list.innerHTML = '<div class="sticky-empty">今天还没有待办事项<br>在下方添加第一条吧 ✨</div>';
      return;
    }
    list.innerHTML = this.stickyTodos.items.map((item, i) => `
      <div class="sticky-todo-item ${item.done ? 'done' : ''}">
        <button class="todo-check" onclick="app.toggleStickyTodo(${i})">${item.done ? '✅' : '⭕'}</button>
        <span class="todo-text">${this.escapeHtml(item.text)}</span>
        <button class="todo-delete" onclick="app.deleteStickyTodo(${i})">✕</button>
      </div>
    `).join('');
  }

  addStickyTodo() {
    const input = document.getElementById('stickyInput');
    const text = input.value.trim();
    if (!text) return;
    audioManager.click();
    this.stickyTodos.items.push({ text, done: false });
    this.saveStickyTodos();
    this.renderStickyTodos();
    input.value = '';
    input.focus();
  }

  toggleStickyTodo(index) {
    audioManager.click();
    this.stickyTodos.items[index].done = !this.stickyTodos.items[index].done;
    this.saveStickyTodos();
    this.renderStickyTodos();
  }

  deleteStickyTodo(index) {
    audioManager.click();
    this.stickyTodos.items.splice(index, 1);
    this.saveStickyTodos();
    this.renderStickyTodos();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==================== 布局编辑器 ====================
  loadLayoutConfig() {
    const defaultConfig = {
      order: ['hot-topics', 'categories', 'english', 'sticky'],
      hidden: [],
      cols: {},
      rows: {}
    };
    const saved = localStorage.getItem('smartDailyLayout');
    if (!saved) return defaultConfig;
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed };
    } catch {
      return defaultConfig;
    }
  }

  saveLayoutConfig() {
    localStorage.setItem('smartDailyLayout', JSON.stringify(this.layoutConfig));
  }

  applyLayoutConfig() {
    const grid = document.getElementById('dashboardGrid');
    if (!grid) return;
    const wrappers = Array.from(grid.querySelectorAll('.layout-card-wrapper'));
    
    // 按配置顺序重新排列
    const ordered = [];
    this.layoutConfig.order.forEach(id => {
      const found = wrappers.find(w => w.dataset.layoutId === id);
      if (found && !this.layoutConfig.hidden.includes(id)) {
        ordered.push(found);
      }
    });
    
    // 把未在配置中的放最后
    wrappers.forEach(w => {
      if (!ordered.includes(w) && !this.layoutConfig.hidden.includes(w.dataset.layoutId)) {
        ordered.push(w);
      }
    });
    
    // 重新插入 DOM
    ordered.forEach(el => grid.appendChild(el));
    
    // 隐藏被隐藏的
    wrappers.forEach(w => {
      if (this.layoutConfig.hidden.includes(w.dataset.layoutId)) {
        w.style.display = 'none';
      } else {
        w.style.display = '';
      }
    });

    // 应用保存的宽度
    if (this.layoutConfig.cols) {
      Object.entries(this.layoutConfig.cols).forEach(([id, col]) => {
        const w = grid.querySelector(`.layout-card-wrapper[data-layout-id="${id}"]`);
        if (w) w.dataset.col = col;
      });
    }
    // 应用保存的高度
    if (this.layoutConfig.rows) {
      Object.entries(this.layoutConfig.rows).forEach(([id, row]) => {
        const w = grid.querySelector(`.layout-card-wrapper[data-layout-id="${id}"]`);
        if (w) w.dataset.row = row;
      });
    }
    
    this.renderHiddenCardsPanel();
  }

  initLayoutEditor() {
    const btn = document.getElementById('layoutToggleBtn');
    if (btn) {
      btn.addEventListener('click', () => this.toggleLayoutEdit());
    }
    this.initDragAndDrop();
  }

  toggleLayoutEdit() {
    this.layoutEditing = !this.layoutEditing;
    const btn = document.getElementById('layoutToggleBtn');
    const bar = document.getElementById('layoutEditorBar');
    const body = document.body;
    
    if (this.layoutEditing) {
      audioManager.switch();
      btn.classList.add('active');
      bar.classList.add('active');
      body.classList.add('layout-edit-mode');
      this.showToast('布局编辑模式已开启，拖拽卡片可调整顺序', 'info');
    } else {
      audioManager.click();
      btn.classList.remove('active');
      bar.classList.remove('active');
      body.classList.remove('layout-edit-mode');
    }
    
    // 更新所有卡片的拖拽状态
    document.querySelectorAll('.layout-card-wrapper').forEach(wrapper => {
      wrapper.draggable = true;
      if (this.layoutEditing) {
        wrapper.classList.add('editing');
      } else {
        wrapper.classList.remove('editing');
      }
    });
  }

  initDragAndDrop() {
    const grid = document.getElementById('dashboardGrid');
    if (!grid) return;

    let draggedEl = null;

    grid.addEventListener('dragstart', (e) => {
      // 必须处于编辑模式才允许拖拽
      if (!this.layoutEditing) {
        e.preventDefault();
        return;
      }
      // 找到最近的 wrapper（点击手柄时 e.target 是手柄本身）
      draggedEl = e.target.closest('.layout-card-wrapper');
      if (!draggedEl) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.effectAllowed = 'move';
      // 设置透明拖拽图像（可选，避免显示默认的半透明效果）
      try {
        const rect = draggedEl.getBoundingClientRect();
        e.dataTransfer.setDragImage(draggedEl, e.clientX - rect.left, e.clientY - rect.top);
      } catch (err) {
        // 某些浏览器不支持 setDragImage，忽略错误
      }
      draggedEl.classList.add('dragging');
    });

    grid.addEventListener('dragend', (e) => {
      if (draggedEl) {
        draggedEl.classList.remove('dragging');
        draggedEl = null;
      }
      document.querySelectorAll('.layout-drop-indicator').forEach(el => el.remove());
    });

    grid.addEventListener('dragover', (e) => {
      if (!this.layoutEditing || !draggedEl) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      const afterEl = this.getDragAfterElement(grid, e.clientY);
      const indicator = document.querySelector('.layout-drop-indicator') || this.createDropIndicator();

      if (afterEl) {
        grid.insertBefore(indicator, afterEl);
      } else {
        grid.appendChild(indicator);
      }
    });

    grid.addEventListener('drop', (e) => {
      if (!this.layoutEditing || !draggedEl) return;
      e.preventDefault();

      const afterEl = this.getDragAfterElement(grid, e.clientY);
      if (afterEl) {
        grid.insertBefore(draggedEl, afterEl);
      } else {
        grid.appendChild(draggedEl);
      }

      document.querySelectorAll('.layout-drop-indicator').forEach(el => el.remove());
      audioManager.click();

      this.updateLayoutOrder();
    });

    // 为每个 wrapper 设置 draggable=true（确保浏览器识别为可拖拽）
    document.querySelectorAll('.layout-card-wrapper').forEach(wrapper => {
      wrapper.draggable = true;
    });
  }

  getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.layout-card-wrapper:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  createDropIndicator() {
    const el = document.createElement('div');
    el.className = 'layout-drop-indicator';
    return el;
  }

  updateLayoutOrder() {
    const wrappers = document.querySelectorAll('.layout-card-wrapper');
    this.layoutConfig.order = Array.from(wrappers).map(w => w.dataset.layoutId);
    this.saveLayoutConfig();
  }

  toggleCardWidth(id) {
    audioManager.click();
    const wrapper = document.querySelector(`.layout-card-wrapper[data-layout-id="${id}"]`);
    if (!wrapper) return;
    const current = wrapper.dataset.col || 'full';
    const next = current === 'full' ? 'half' : 'full';
    wrapper.dataset.col = next;
    if (!this.layoutConfig.cols) this.layoutConfig.cols = {};
    this.layoutConfig.cols[id] = next;
    this.saveLayoutConfig();
    this.showToast(next === 'full' ? '已切换为全宽' : '已切换为半宽', 'info');
  }

  toggleCardHeight(id) {
    audioManager.click();
    const wrapper = document.querySelector(`.layout-card-wrapper[data-layout-id="${id}"]`);
    if (!wrapper) return;
    const current = parseInt(wrapper.dataset.row) || 1;
    const next = current >= 3 ? 1 : current + 1;
    wrapper.dataset.row = next;
    if (!this.layoutConfig.rows) this.layoutConfig.rows = {};
    this.layoutConfig.rows[id] = next;
    this.saveLayoutConfig();
    this.showToast(`已切换为${next}倍高度`, 'info');
  }

  hideLayoutCard(id) {
    audioManager.click();
    if (!this.layoutConfig.hidden.includes(id)) {
      this.layoutConfig.hidden.push(id);
      this.saveLayoutConfig();
      this.applyLayoutConfig();
      this.showToast('卡片已隐藏，可在下方「已隐藏的卡片」中恢复', 'info');
    }
  }

  showLayoutCard(id) {
    audioManager.click();
    const idx = this.layoutConfig.hidden.indexOf(id);
    if (idx > -1) {
      this.layoutConfig.hidden.splice(idx, 1);
      this.saveLayoutConfig();
      this.applyLayoutConfig();
      this.showToast('卡片已恢复显示', 'success');
    }
  }

  restoreLayoutCards() {
    audioManager.click();
    this.layoutConfig = {
      order: ['hot-topics', 'categories', 'english', 'sticky'],
      hidden: [],
      cols: {},
      rows: {}
    };
    this.saveLayoutConfig();
    this.applyLayoutConfig();
    this.showToast('布局已恢复默认', 'success');
  }

  saveLayoutEdit() {
    this.toggleLayoutEdit();
    this.showToast('布局已保存', 'success');
  }

  renderHiddenCardsPanel() {
    const panel = document.getElementById('hiddenCardsPanel');
    const list = document.getElementById('hiddenCardsList');
    if (!panel || !list) return;
    
    const cardNames = {
      'hot-topics': { name: '🔥 今日热点', icon: '🔥' },
      'categories': { name: '📂 学科分类', icon: '📂' },
      'english': { name: '🎯 英语学习中心', icon: '🎯' },
      'sticky': { name: '📝 便利贴', icon: '📝' }
    };
    
    if (this.layoutConfig.hidden.length === 0) {
      panel.style.display = 'none';
      return;
    }
    
    panel.style.display = 'block';
    list.innerHTML = this.layoutConfig.hidden.map(id => {
      const info = cardNames[id] || { name: id, icon: '📦' };
      return `
        <div class="hidden-card-item">
          <span>${info.icon} ${info.name}</span>
          <button onclick="app.showLayoutCard('${id}')">+ 恢复显示</button>
        </div>
      `;
    }).join('');
  }

  toggleHiddenPanel() {
    const panel = document.getElementById('hiddenCardsPanel');
    if (panel) panel.style.display = 'none';
  }

  // ==================== 课后时间 ====================
  initLeisure() {
    // Tab切换
    document.querySelectorAll('.leisure-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        audioManager.switch();
        document.querySelectorAll('.leisure-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.leisure-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`lpanel-${tab.dataset.ltab}`)?.classList.add('active');
      });
    });

    // 检查是否需要自动更新（每天10点后首次访问）
    this.checkLeisureAutoUpdate();
  }

  checkLeisureAutoUpdate() {
    const lastUpdate = localStorage.getItem('smartDailyLeisureUpdate');
    const now = new Date();
    const today10am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);

    // 如果今天10点后还没有更新过
    if (now >= today10am) {
      if (!lastUpdate || new Date(lastUpdate) < today10am) {
        // 静默尝试更新数据
        this.fetchLeisureData(true);
      }
    }
  }

  renderLeisureData() {
    const data = typeof leisureData !== 'undefined' ? leisureData : null;
    if (!data) return;

    // 更新时间
    const updateEl = document.getElementById('leisureUpdateTime');
    if (updateEl && data.updateTime) {
      updateEl.textContent = `更新时间: ${data.updateTime}`;
    }

    // 渲染B站视频
    this.renderBilibili(data.bilibili || []);
    // 渲染播客
    this.renderPodcast(data.podcast || []);
  }

  renderBilibili(videos) {
    const grid = document.getElementById('bilibiliGrid');
    if (!grid) return;
    if (!videos.length) {
      grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)"><div style="font-size:48px;margin-bottom:12px">📺</div><div>暂无数据</div><div style="font-size:13px;margin-top:8px">点击上方刷新按钮获取最新数据</div></div>';
      return;
    }

    grid.innerHTML = videos.map((v, i) => {
      const bvid = v.bvid || '';
      const link = bvid ? `https://b23.tv/${bvid}` : '#';
      const duration = v.duration ? this.formatDuration(v.duration) : '';
      const view = v.stat && v.stat.view ? this.formatNumber(v.stat.view) : '0';
      const like = v.stat && v.stat.like ? this.formatNumber(v.stat.like) : '0';
      const danmaku = v.stat && v.stat.danmaku ? this.formatNumber(v.stat.danmaku) : '0';
      const rcmd = v.rcmd_reason || '';

      return `
        <a class="bilibili-card" href="${link}" target="_blank" onclick="audioManager.click()">
          <div class="bilibili-cover">
            <img src="${v.pic || ''}" alt="${this.escapeHtml(v.title || '')}" loading="lazy" onerror="this.style.display='none'">
            ${duration ? `<span class="bilibili-duration">${duration}</span>` : ''}
            ${rcmd ? `<span class="bilibili-rcmd">${this.escapeHtml(rcmd)}</span>` : ''}
          </div>
          <div class="bilibili-info">
            <div class="bilibili-title">${this.escapeHtml(v.title || '')}</div>
            <div class="bilibili-up">
              <img src="${v.owner && v.owner.face ? v.owner.face : ''}" alt="" onerror="this.style.display='none'">
              <span>${this.escapeHtml(v.owner && v.owner.name ? v.owner.name : '未知UP')}</span>
            </div>
            <div class="bilibili-stats">
              <span>▶ ${view}</span>
              <span>👍 ${like}</span>
              <span>💬 ${danmaku}</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  renderPodcast(podcasts) {
    const grid = document.getElementById('podcastGrid');
    if (!grid) return;
    if (!podcasts.length) {
      grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)"><div style="font-size:48px;margin-bottom:12px">🎙️</div><div>暂无数据</div><div style="font-size:13px;margin-top:8px">点击上方刷新按钮获取最新数据</div></div>';
      return;
    }

    grid.innerHTML = podcasts.map((p, i) => {
      const url = p.url || '#';
      const count = p.latest_count ? this.formatNumber(p.latest_count) : '0';
      const daily = p.daily_change || 0;
      const monthly = p.monthly_change || 0;

      return `
        <a class="podcast-card" href="${url}" target="_blank" onclick="audioManager.click()">
          <div class="podcast-rank ${i < 3 ? 'top3' : ''}">${i + 1}</div>
          <div class="podcast-info">
            <div class="podcast-title">${this.escapeHtml(p.title || '')}</div>
            <div class="podcast-count">📊 ${count} 订阅</div>
            <div class="podcast-growth">
              <span class="${daily > 5000 ? 'hot-growth' : ''}">📈 日增 ${this.formatNumber(daily)}</span>
              <span>📈 月增 ${this.formatNumber(monthly)}</span>
            </div>
          </div>
          <div class="podcast-arrow">→</div>
        </a>
      `;
    }).join('');
  }

  formatNumber(num) {
    if (typeof num !== 'number') return num;
    if (num >= 10000) return (num / 10000).toFixed(1).replace('.0', '') + '万';
    return num.toString();
  }

  formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  async refreshLeisureData() {
    audioManager.click();
    const btn = document.getElementById('btnRefreshLeisure');
    if (btn) btn.classList.add('spinning');

    this.showToast('正在获取最新数据...', 'info');
    await this.fetchLeisureData(false);

    if (btn) btn.classList.remove('spinning');
  }

  async fetchLeisureData(silent) {
    let bilibiliUpdated = false;
    let podcastUpdated = false;

    // 尝试获取小宇宙播客数据（支持CORS）
    try {
      const response = await fetch('https://api.xyzrank.top/v1/stats?sort_by=latest_count&limit=15');
      if (response.ok) {
        const data = await response.json();
        if (data && data.data) {
          leisureData.podcast = data.data.map(item => ({
            podcast_id: item.podcast_id || '',
            title: item.title || '',
            url: item.url || '',
            latest_count: item.latest_count || 0,
            daily_change: item.daily_change || 0,
            monthly_change: item.monthly_change || 0,
            updated_at: item.updated_at || ''
          }));
          podcastUpdated = true;
        }
      }
    } catch (e) {
      console.log('小宇宙API获取失败:', e);
    }

    // 尝试获取B站数据（可能有CORS问题）
    try {
      const response = await fetch('https://api.bilibili.com/x/web-interface/popular?ps=15', {
        headers: {
          'Referer': 'https://www.bilibili.com/'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.code === 0 && data.data && data.data.list) {
          leisureData.bilibili = data.data.list.map(item => ({
            bvid: item.bvid || '',
            title: item.title || '',
            desc: item.desc || '',
            pic: item.pic || '',
            duration: item.duration || 0,
            owner: {
              name: item.owner ? item.owner.name : '',
              face: item.owner ? item.owner.face : ''
            },
            stat: {
              view: item.stat ? item.stat.view : 0,
              like: item.stat ? item.stat.like : 0,
              danmaku: item.stat ? item.stat.danmaku : 0
            },
            tname: item.tname || '',
            pubdate: item.pubdate || 0,
            rcmd_reason: item.rcmd_reason ? item.rcmd_reason.content : ''
          }));
          bilibiliUpdated = true;
        }
      }
    } catch (e) {
      console.log('B站API获取失败:', e);
    }

    // 更新时间
    if (bilibiliUpdated || podcastUpdated) {
      leisureData.updateTime = new Date().toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('smartDailyLeisureUpdate', new Date().toISOString());

      // 缓存到localStorage
      localStorage.setItem('smartDailyLeisureCache', JSON.stringify(leisureData));

      // 重新渲染
      this.renderLeisureData();

      if (!silent) {
        this.showToast('数据已更新!', 'success');
      }
    } else {
      if (!silent) {
        this.showToast('获取在线数据失败，显示本地缓存数据', 'info');
      }
    }
  }

  loadLeisureCache() {
    try {
      const cached = localStorage.getItem('smartDailyLeisureCache');
      if (cached) {
        const data = JSON.parse(cached);
        if (data && typeof leisureData !== 'undefined') {
          leisureData.bilibili = data.bilibili || leisureData.bilibili;
          leisureData.podcast = data.podcast || leisureData.podcast;
          leisureData.updateTime = data.updateTime || leisureData.updateTime;
        }
      }
    } catch (e) {
      console.log('加载课后时间缓存失败:', e);
    }
  }

  subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail')?.value?.trim();
    if (!email || !email.includes('@')) {
      this.showToast('请输入有效的邮箱地址', 'error');
      return;
    }
    this.showToast('订阅成功！感谢您的关注', 'success');
    document.getElementById('newsletterEmail').value = '';
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const app = new SmartDailyApp();
