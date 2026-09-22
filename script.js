/* ==========================================
   MIDLYMPICS 2026 - INTERACTIVE SCRIPT
   ================================---------- */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. OFFICIAL GAMES DATA (9 EVENTS) --- */
    const officialGames = [
        {
            number: "01",
            name: "Chess",
            symbol: "♟️",
            desc: "The timeless battlefield of tactical calculation, strategic sacrifice, and positional dominance.",
            history: "Originating in India during the 6th century as Chaturanga, chess evolved through Persia and Europe into the definitive global test of cognitive foresight and analytical depth.",
            skill: "Deep tactical pattern recognition, calculation tree visualization, time management, and psychological resilience under pressure."
        },
        {
            number: "02",
            name: "Go",
            symbol: "⚪",
            desc: "An ancient abstract strategy board game characterized by profound complexity, territorial control, and global balance.",
            history: "Invented in ancient China more than 2,500 years ago, Go remains one of the oldest board games continuously played today, celebrated for its vast mathematical search space.",
            skill: "Intuitive gestalt pattern recognition, multi-step strategic scoping, shape evaluation, and territorial equilibrium assessment."
        },
        {
            number: "03",
            name: "Othello (Reversi)",
            symbol: "⚫",
            desc: "A game of disk-flipping reversals where momentum shifts instantly and fluid mobility dictates ultimate victory.",
            history: "Developed in late 19th-century England and popularized in modern Japan, Reversi/Othello rewards dynamic adaptation and structural corner control.",
            skill: "Dynamic positional evaluation, mobility restriction, parity calculation, and endgame flipping optimization."
        },
        {
            number: "04",
            name: "Checkers",
            symbol: "🔴",
            desc: "A rapid diagonal duel of forced captures, geometric precision, and calculated sacrifices.",
            history: "Tracing its roots back to Alquerque in ancient times, modern checkers has evolved into a fully solved yet fiercely contested game of precise tactical angles.",
            skill: "Multi-jump calculation, opposition control, structural symmetry breaking, and king-row advancement planning."
        },
        {
            number: "05",
            name: "Connect Four",
            symbol: "🔵",
            desc: "Vertical grid strategy requiring acute offensive alignment and vigilant defensive threat neutralization.",
            history: "Introduced commercially in the 1974, Connect Four is a classic solved game of gravity-dependent alignment requiring rigorous upstream calculation.",
            skill: "Threat space mapping, parity control, odd-even row dominance, and trap setup visualization."
        },
        {
            number: "06",
            name: "Ludo",
            symbol: "🎲",
            desc: "A high-stakes contest combining tactical risk management, probability assessment, and decisive board navigation.",
            history: "Derived from the ancient Indian cross and circle game Pachisi, Ludo combines probabilistic probability with aggressive competitive maneuvering.",
            skill: "Probability calculation, risk versus reward management, opponent pacing estimation, and path optimization."
        },
        {
            number: "07",
            name: "Scrabble",
            symbol: "🔤",
            desc: "The ultimate lexicon arena balancing linguistic creativity, spatial board synergy, and statistical tile tracking.",
            history: "Invented during the Great Depression by architect Alfred Mosher Butts, Scrabble merges vocabulary mastery with rigorous mathematical scoring strategy.",
            skill: "Anagram generation, board hook utilization, rack management, statistical tile tracking, and defensive blocking."
        },
        {
            number: "08",
            name: "Tetris",
            symbol: "🧱",
            desc: "High-speed spatial reasoning, lightning-fast geometry rotation, and flawless structural architecture.",
            history: "Created in Soviet Russia in 1984 by Alexey Pajitnov, Tetris stands as the premier benchmark for real-time visual-spatial processing and reflexes.",
            skill: "Real-time spatial rotation, stack surface profiling, risk mitigation, and sustained focus under exponential speed scaling."
        },
        {
            number: "09",
            name: "Coding",
            symbol: "💻",
            desc: "Algorithmic problem-solving, structural programming efficiency, and rapid logic implementation.",
            history: "Emerging alongside modern computational science, competitive programming represents the pinnacle of logical synthesis and digital architecture.",
            skill: "Data structure mastery, algorithmic complexity reduction, bug isolation speed, and clean syntax execution."
        }
    ];

    /* --- 2. RENDER GAMES GRID --- */
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = officialGames.map(game => `
            <div class="game-card glass-panel" data-game="${game.name}">
                <div>
                    <div class="game-card-header">
                        <span class="game-number">EVENT ${game.number}</span>
                        <span class="game-symbol">${game.symbol}</span>
                    </div>
                    <h3>${game.name}</h3>
                    <p class="game-desc">${game.desc}</p>
                </div>
                <div>
                    <div class="game-details-expand">
                        <h4>Historical Background</h4>
                        <p>${game.history}</p>
                        <h4>Competitive Skill</h4>
                        <p>${game.skill}</p>
                    </div>
                    <button class="read-history-btn" aria-expanded="false">
                        <span>Read History</span>
                        <span class="arrow">↓</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Game Card Expand Interaction
        document.querySelectorAll('.read-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.game-card');
                const isExpanded = card.classList.contains('expanded');
                
                // Toggle state
                card.classList.toggle('expanded', !isExpanded);
                e.currentTarget.setAttribute('aria-expanded', !isExpanded);
                e.currentTarget.querySelector('span').textContent = isExpanded ? 'Read History' : 'Hide History';
                e.currentTarget.querySelector('.arrow').textContent = isExpanded ? '↓' : '↑';
            });
        });
    }

    /* --- 3. MOBILE NAVIGATION TOGGLE --- */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const siteNav = document.getElementById('siteNav');

    if (mobileMenuToggle && siteNav) {
        mobileMenuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('active');
        });

        // Close menu on link click
        siteNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('active');
            });
        });
    }

    /* --- 4. CUSTOM CAPTCHA GENERATOR --- */
    const symbols = ['♟️', '♞', '♝', '♜', '♛', '♚', '⚪', '⚫', '🎲', '🧱', '💻'];
    let currentCaptchaSolution = '';

    function generateCaptcha() {
        const promptEl = document.getElementById('captchaPrompt');
        const optionsEl = document.getElementById('captchaOptions');
        const hiddenValid = document.getElementById('captchaValid');

        if (!promptEl || !optionsEl) return;

        hiddenValid.value = 'false';

        // Pick 3 random symbols for sequence, leave 4th as missing (?)
        let shuffled = [...symbols].sort(() => 0.5 - Math.random());
        let seq = shuffled.slice(0, 4);
        currentCaptchaSolution = seq[3]; // The missing one

        // Display sequence with missing last item
        promptEl.textContent = `${seq[0]}   ${seq[1]}   ${seq[2]}   [ ? ]`;

        // Generate 4 options including correct answer and 3 random decoys
        let decoys = symbols.filter(s => s !== currentCaptchaSolution).sort(() => 0.5 - Math.random()).slice(0, 3);
        let options = [currentCaptchaSolution, ...decoys].sort(() => 0.5 - Math.random());

        optionsEl.innerHTML = options.map(opt => `
            <button type="button" class="captcha-btn" data-val="${opt}">${opt}</button>
        `).join('');

        // Bind click events to options
        optionsEl.querySelectorAll('.captcha-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                optionsEl.querySelectorAll('.captcha-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');

                const selectedVal = e.target.getAttribute('data-val');
                if (selectedVal === currentCaptchaSolution) {
                    hiddenValid.value = 'true';
                    document.getElementById('captchaError').style.display = 'none';
                } else {
                    hiddenValid.value = 'false';
                }
            });
        });
    }

    generateCaptcha();

    /* --- 5. REGISTRATION & CSV EXPORT LOGIC --- */
    const registrationForm = document.getElementById('registrationForm');
    const successScreen = document.getElementById('successScreen');
    const downloadCsvBtn = document.getElementById('downloadCsvBtn');
    const applyAgainBtn = document.getElementById('applyAgainBtn');

    let lastRegisteredParticipant = null;

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const country = document.getElementById('country').value.trim();
            const age = parseInt(document.getElementById('age').value, 10);
            const preferredGame = document.getElementById('preferredGame').value;
            const discordUsername = document.getElementById('discordUsername').value.trim() || 'N/A';
            const captchaValid = document.getElementById('captchaValid').value;
            const captchaError = document.getElementById('captchaError');

            // Validation checks
            if (!fullName || !email || !country || !isNaN(age) === false || !preferredGame) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Age validation
            if (age < 13 || age > 120) {
                alert('Please enter a valid age between 13 and 120.');
                return;
            }

            // Captcha validation
            if (captchaValid !== 'true') {
                captchaError.style.display = 'block';
                return;
            }

            // Check duplicate email in localStorage
            let existingRegistrations = JSON.parse(localStorage.getItem('midlympics_registrations') || '[]');
            const isDuplicate = existingRegistrations.some(reg => reg.email === email);

            if (isDuplicate) {
                alert('An application with this email address has already been submitted and recorded locally.');
                return;
            }

            // Generate Unique Participant ID: MID26-XXXXXX
            const randomDigits = Math.floor(100000 + Math.random() * 900000);
            const participantID = `MID26-${randomDigits}`;
            const registrationTimestamp = new Date().toISOString();

            const newRecord = {
                participantID,
                fullName,
                email,
                country,
                age,
                preferredGame,
                discordUsername,
                registrationTimestamp
            };

            // Save to LocalStorage
            existingRegistrations.push(newRecord);
            localStorage.setItem('midlympics_registrations', JSON.stringify(existingRegistrations));

            lastRegisteredParticipant = newRecord;

            // Display Success Screen
            registrationForm.style.display = 'none';
            successScreen.style.display = 'block';

            document.getElementById('resName').textContent = fullName;
            document.getElementById('resGame').textContent = preferredGame;
            document.getElementById('resId').textContent = participantID;
        });
    }

    // CSV Generation & Download
    if (downloadCsvBtn) {
        downloadCsvBtn.addEventListener('click', () => {
            if (!lastRegisteredParticipant) return;

            const p = lastRegisteredParticipant;
            const csvHeaders = "Participant ID,Name,Email,Country,Age,Game,Discord Username,Registration Time\n";
            const csvRow = `"${p.participantID}","${p.fullName}","${p.email}","${p.country}",${p.age},"${p.preferredGame}","${p.discordUsername}","${p.registrationTimestamp}"`;
            
            const csvContent = csvHeaders + csvRow;
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            // Sanitize filename: remove / \ : * ? " < > |
            const sanitizedName = p.fullName.replace(/[\/\\:\*\?"<>\|]/g, '_').toUpperCase();
            const filename = `${sanitizedName}.csv`;

            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Apply Again / Reset Form
    if (applyAgainBtn) {
        applyAgainBtn.addEventListener('click', () => {
            registrationForm.reset();
            registrationForm.style.display = 'block';
            successScreen.style.display = 'none';
            generateCaptcha();
        });
    }

    /* --- 6. ARCHIVAL DOCUMENTS MODAL --- */
    const docModal = document.getElementById('docModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const documentTexts = {
        declaration: {
            title: "Founding Declaration (22 September 2026)",
            content: `
                <h4>Article I: Institutional Establishment</h4>
                <p>The International Board Games Committee (IBGC) is hereby officially established on this 22nd day of September, 2026, as the supreme international governing body for elite digital mind sports and competitive board game championships.</p>
                
                <h4>Article II: Mission & Purpose</h4>
                <p>To organize, promote, and govern structured international tournaments across classic table-top disciplines and digital intelligence fields, upholding uncompromising standards of sportsmanship, intellectual equity, and fair play.</p>
                
                <h4>Article III: The Midlympics Mandate</h4>
                <p>The Midlympics is instituted as the flagship quadrennial and inaugural competitive arena dedicated to advancing human curiosity, strategic rigor, and tactical mastery into professional careers.</p>
            `
        },
        gameslist: {
            title: "Official Games Catalog (Midlympics 2026)",
            content: `
                <h4>Sanctioned Disciplines</h4>
                <p>The inaugural 2026 Midlympics program features precisely 9 standardized official competitive disciplines:</p>
                <p><strong>01. Chess</strong> — Tactical calculation and positional dominance.</p>
                <p><strong>02. Go</strong> — Territorial control and global strategic equilibrium.</p>
                <p><strong>03. Othello (Reversi)</strong> — Dynamic disk-flipping and momentum shift management.</p>
                <p><strong>04. Checkers</strong> — Geometric precision and forced capture strategy.</p>
                <p><strong>05. Connect Four</strong> — Vertical threat space alignment and parity calculation.</p>
                <p><strong>06. Ludo</strong> — Probabilistic risk management and path optimization.</p>
                <p><strong>07. Scrabble</strong> — Linguistic dexterity and mathematical board synergy.</p>
                <p><strong>08. Tetris</strong> — High-speed spatial reasoning and structural architecture.</p>
                <p><strong>09. Coding</strong> — Algorithmic efficiency and structural logic implementation.</p>
            `
        }
    };

    document.querySelectorAll('.view-doc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const docKey = e.target.getAttribute('data-doc');
            const docData = documentTexts[docKey];

            if (docData && docModal) {
                modalTitle.textContent = docData.title;
                modalBody.innerHTML = docData.content;
                docModal.classList.add('active');
            }
        });
    });

    if (modalClose && docModal) {
        modalClose.addEventListener('click', () => {
            docModal.classList.remove('active');
        });

        docModal.addEventListener('click', (e) => {
            if (e.target === docModal) {
                docModal.classList.remove('active');
            }
        });
    }

});
