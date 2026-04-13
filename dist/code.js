const Z=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>UI Audit AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap" rel="stylesheet">
  <style>
    /* ---- Reset ---- */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ---- Tokens ---- */
    :root {
      --bg:       #0D0D0D;
      --bg2:      #111111;
      --bg3:      #181818;
      --bg4:      #1E1E1E;
      --accent:   #C8F135;
      --text1:    #F0F0F0;
      --text2:    #888888;
      --text3:    #7f7f7f;
      --border:   #1E1E1E;
      --border2:  #282828;
      --ok:       #C8F135;
      --err:      #FF6363;
      --r-sm:     8px;
      --r-md:     12px;
      --r-lg:     16px;
      --font-h:   'Syne', system-ui, sans-serif;
      --font-b:   'DM Sans', system-ui, sans-serif;
    }

    html { font-size: 14px; }

    body {
      background: var(--bg);
      color: var(--text1);
      font-family: var(--font-b);
      line-height: 1.5;
      overflow-x: hidden;
      min-width: 280px;
    }

    /* ---- Layout ---- */
    .container {
      display: flex;
      flex-direction: column;
    }

    /* ---- Header ---- */
    .header {
      padding: 16px 18px 14px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg);
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      color: var(--accent);
      line-height: 0;
    }

    .logo svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .logo-lg {
      width: 128px;
      height: 128px;
    }

    .header-brand-copy {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .brand-title {
      font-family: var(--font-h);
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0;
      color: var(--text1);
      line-height: 1;
    }

    .brand-title em {
      color: var(--accent);
      font-style: normal;
    }

    .header-sub {
      font-size: 10px;
      color: var(--text3);
      letter-spacing: 0.3px;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border: 1px solid rgba(200, 241, 53, 0.2);
      border-radius: 100px;
      background: rgba(200, 241, 53, 0.05);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      color: var(--accent);
    }

    .badge-dot {
      width: 5px;
      height: 5px;
      background: var(--accent);
      border-radius: 50%;
      animation: blink 2.4s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.25; }
    }

    /* ---- Section ---- */
    .section {
      padding: 18px 18px 16px;
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    }

    /* ---- Step header ---- */
    .step-header {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 12px;
    }

    .step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid var(--border2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: var(--text3);
      flex-shrink: 0;
      font-family: var(--font-h);
      transition: border-color 0.25s, color 0.25s;
    }

    .step-num.done {
      border-color: rgba(200, 241, 53, 0.5);
      color: var(--accent);
    }

    .step-title {
      font-family: var(--font-h);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.1px;
      color: var(--text1);
    }

    /* ---- Buttons ---- */
    .btn {
      width: 100%;
      border: none;
      border-radius: var(--r-md);
      padding: 11px 16px;
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-b);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: background 0.18s, color 0.18s, box-shadow 0.2s, transform 0.12s, opacity 0.18s;
      letter-spacing: -0.1px;
    }

    .btn-primary {
      background: var(--accent);
      color: #0A0A0A;
    }

    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 0 28px rgba(200, 241, 53, 0.25);
      transform: translateY(-1px);
    }

    .btn-primary:active:not(:disabled) {
      transform: translateY(0);
    }

    .btn-primary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: var(--bg3);
      color: var(--text2);
      border: 1px solid var(--border2);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--bg4);
      color: var(--text1);
      border-color: #333;
    }

    .btn-secondary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ---- Status ---- */
    .status {
      margin-top: 9px;
      font-size: 11px;
      color: var(--text3);
      display: flex;
      align-items: center;
      gap: 6px;
      min-height: 14px;
      line-height: 1.4;
    }

    .status.ok   { color: var(--ok); }
    .status.error { color: var(--err); }

    .status-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }

    /* ---- File Upload ---- */
    .file-upload-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 22px 14px;
      border: 1.5px dashed var(--border2);
      border-radius: var(--r-md);
      background: var(--bg3);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .file-upload-label:hover {
      border-color: rgba(200, 241, 53, 0.3);
      background: rgba(200, 241, 53, 0.025);
    }

    .file-upload-label.has-file {
      border-style: solid;
      border-color: rgba(200, 241, 53, 0.3);
      background: rgba(200, 241, 53, 0.03);
    }

    .file-upload-icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: rgba(200, 241, 53, 0.07);
      border: 1px solid rgba(200, 241, 53, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      transition: background 0.2s, border-color 0.2s;
    }

    .file-upload-icon.ok {
      background: rgba(200, 241, 53, 0.12);
      border-color: rgba(200, 241, 53, 0.25);
    }

    .file-upload-text {
      font-size: 12px;
      font-weight: 500;
      color: var(--text2);
    }

    .file-upload-text strong {
      color: var(--accent);
      font-weight: 600;
    }

    .file-upload-hint {
      font-size: 10px;
      color: var(--text3);
      letter-spacing: 0.3px;
    }

    input[type='file'] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    /* ---- Form fields ---- */
    .field {
      margin-bottom: 12px;
    }

    .field:last-child { margin-bottom: 0; }

    .field-label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text3);
      margin-bottom: 6px;
    }

    .field-input {
      width: 100%;
      padding: 10px 12px;
      border-radius: var(--r-sm);
      border: 1px solid var(--border2);
      background: var(--bg3);
      font-size: 12px;
      font-family: var(--font-b);
      color: var(--text1);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      appearance: none;
      -webkit-appearance: none;
      line-height: 1.4;
    }

    .field-input:focus {
      border-color: rgba(200, 241, 53, 0.35);
      box-shadow: 0 0 0 3px rgba(200, 241, 53, 0.06);
    }

    .field-input::placeholder {
      color: var(--text3);
    }

    select.field-input {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23444' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 11px center;
      padding-right: 32px;
      cursor: pointer;
    }

    /* API key with show/hide */
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrap .field-input {
      padding-right: 40px;
    }

    .input-eye {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      color: var(--text3);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      width: auto;
      transition: color 0.2s;
    }

    .input-eye:hover { color: var(--text2); }

    /* ---- Custom Toggles ---- */
    .toggles-stack {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 11px 12px;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      user-select: none;
    }

    .toggle-row:hover {
      border-color: var(--border2);
      background: var(--bg4);
    }

    .toggle-info {
      display: flex;
      flex-direction: column;
      gap: 1px;
      pointer-events: none;
    }

    .toggle-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text1);
    }

    .toggle-desc {
      font-size: 10px;
      color: var(--text3);
      letter-spacing: 0.2px;
    }

    /* Hidden native checkbox */
    .toggle-checkbox {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* Custom switch track */
    .toggle-switch {
      position: relative;
      width: 34px;
      height: 18px;
      flex-shrink: 0;
      pointer-events: none;
    }

    .toggle-track {
      width: 34px;
      height: 18px;
      background: var(--bg);
      border: 1px solid var(--border2);
      border-radius: 100px;
      transition: background 0.22s, border-color 0.22s;
    }

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      background: var(--text3);
      border-radius: 50%;
      transition: transform 0.22s cubic-bezier(.4,0,.2,1), background 0.22s;
    }

    .toggle-checkbox:checked ~ .toggle-switch .toggle-track {
      background: rgba(200, 241, 53, 0.12);
      border-color: rgba(200, 241, 53, 0.28);
    }

    .toggle-checkbox:checked ~ .toggle-switch .toggle-thumb {
      background: var(--accent);
      transform: translateX(16px);
    }

    /* ---- Helper text ---- */
    .helper-link {
      color: var(--accent);
      text-decoration: none;
    }
    .helper-link:hover {
      text-decoration: underline;
    }
    .helper {
      font-size: 10px;
      color: var(--text3);
      line-height: 1.55;
      margin-top: 10px;
      letter-spacing: 0.2px;
    }

    /* ---- Loading spinner ---- */
    .loading {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid rgba(200, 241, 53, 0.15);
      border-top-color: var(--accent);
      border-radius: 999px;
      animation: spin 0.7s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* ---- Generate section ---- */
    .generate-section {
      padding: 16px 18px 20px;
      background: var(--bg);
    }

    /* ---- Divider label ---- */
    .section-divider {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .section-divider::before,
    .section-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    .section-divider span {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text3);
    }

    /* ---- Multi-view system ---- */
    .plugin-root { position: relative; }

    .view {
      display: none;
      flex-direction: column;
      background: var(--bg);
      min-height: 100%;
    }

    .view.view-active { display: flex; }

    /* ---- View header (back nav) ---- */
    .view-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .btn-back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      background: var(--bg3);
      border: 1px solid var(--border2);
      cursor: pointer;
      color: var(--text2);
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
    }

    .btn-back:hover { background: var(--bg4); color: var(--text1); }

    .view-title {
      font-family: var(--font-h);
      font-size: 13px;
      font-weight: 700;
      color: var(--text1);
      letter-spacing: -0.2px;
    }

    /* ---- Configure AI row ---- */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .config-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      color: var(--text3);
      min-width: 0;
    }

    .config-status.configured { color: var(--accent); }

    .config-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }

    .btn-configure {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: var(--r-sm);
      background: var(--bg3);
      border: 1px solid var(--border2);
      font-size: 11px;
      font-weight: 600;
      font-family: var(--font-b);
      color: var(--text2);
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    .btn-configure:hover { background: var(--bg4); color: var(--text1); border-color: #333; }
    .btn-configure.configured { border-color: rgba(200,241,53,0.25); color: var(--accent); }

    /* ---- Step dimmed state (UX-only mode) ---- */
    .section.dimmed {
      opacity: 0.38;
      pointer-events: none;
      user-select: none;
      transition: opacity 0.22s;
    }

    /* ---- Full-screen loading view ---- */
    #view-loading {
      position: fixed;
      inset: 0;
      z-index: 100;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 40px 24px;
      text-align: center;
    }

    .loading-spinner-lg {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(200,241,53,0.1);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
      flex-shrink: 0;
    }

    .loading-text { display: flex; flex-direction: column; gap: 6px; }

    .loading-title {
      font-family: var(--font-h);
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--text1);
    }

    .loading-sub {
      font-size: 11px;
      color: var(--text3);
      line-height: 1.6;
      max-width: 220px;
    }

    .btn-cancel {
      margin-top: 6px;
      padding: 8px 22px;
      border-radius: var(--r-sm);
      background: transparent;
      border: 1px solid var(--border2);
      font-size: 11px;
      font-weight: 600;
      font-family: var(--font-b);
      color: var(--text3);
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }

    .btn-cancel:hover { border-color: var(--err); color: var(--err); }

    /* ---- About view ---- */
    .about-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      padding: 32px 28px 40px;
      text-align: center;
    }

    .about-logo {
      width: 128px;
      height: 128px;
      margin-bottom: 10px;
    }

    .about-title {
      font-family: var(--font-h);
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0;
      color: var(--text1);
      line-height: 1;
      margin-bottom: 6px;
    }

    .about-title em { color: var(--accent); font-style: normal; }

    .about-tagline {
      font-size: 10px;
      color: var(--text3);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    .about-divider {
      width: 28px;
      height: 1px;
      background: var(--border2);
      margin: 0 auto 24px;
    }

    .about-byline {
      font-size: 14px;
      font-weight: 600;
      color: var(--text1);
      margin-bottom: 4px;
    }

    .about-location {
      font-size: 11px;
      color: var(--text3);
      margin-bottom: 22px;
      line-height: 1.5;
    }

    .about-links { display: flex; flex-direction: column; gap: 8px; }

    .about-link {
      font-size: 11px;
      color: var(--text3);
      text-decoration: none;
      transition: color 0.15s;
    }

    .about-link:hover { color: var(--accent); }

    /* ---- Header icon buttons ---- */
    .header-actions { display: flex; align-items: center; gap: 6px; }

    .btn-icon {
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      background: transparent;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text3);
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    .btn-icon:hover { background: var(--bg3); border-color: var(--border2); color: var(--text2); }
  </style>
</head>

<body>
  <svg aria-hidden="true" width="0" height="0" style="position:absolute; overflow:hidden;">
    <symbol id="audit-logo-mark" viewBox="0 0 128 128">
      <path d="M55.2578 95.546C50.5573 95.546 46.2733 94.6238 42.4058 92.7793C38.5978 90.8753 35.5632 88.049 33.3022 84.3005C31.1007 80.552 30 75.8218 30 70.1098V32H43.3875V70.199C43.3875 72.9955 43.8338 75.3755 44.7263 77.339C45.6783 79.3025 47.0468 80.79 48.8318 81.8015C50.6763 82.7535 52.8777 83.2295 55.4363 83.2295C58.0543 83.2295 60.2557 82.7535 62.0407 81.8015C63.8852 80.79 65.2835 79.3025 66.2355 77.339C67.1875 75.3755 67.6635 72.9955 67.6635 70.199V32H81.051V70.1098C81.051 75.8218 79.861 80.552 77.481 84.3005C75.1605 88.049 72.0368 90.8753 68.1098 92.7793C64.2423 94.6238 59.9583 95.546 55.2578 95.546Z" fill="white"/>
      <path d="M85.2854 94.475V32H98.6729V94.475H85.2854Z" fill="#C8F135"/>
    </symbol>
  </svg>
  <div class="plugin-root">

    <!-- ════════════════════════════════════════
         VIEW: MAIN
    ════════════════════════════════════════ -->
    <div id="view-main" class="view view-active">
      <div class="container">

        <!-- Header -->
        <div class="header">
          <div class="header-brand">
            <div class="logo" aria-hidden="true">
              <svg><use href="#audit-logo-mark"></use></svg>
            </div>
            <div class="header-brand-copy">
              <div class="brand-title">Audit<em>.</em>AI</div>
              <div class="header-sub">Design → Implementation</div>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-icon" id="aboutBtn" aria-label="About">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </button>
            <div class="header-badge">
              <span class="badge-dot"></span>
              AI
            </div>
          </div>
        </div>

        <!-- Step 1: Design source -->
        <div class="section">
          <div class="step-header">
            <div class="step-num" id="step1Num">1</div>
            <div class="step-title">Select design source</div>
          </div>
          <button id="grabDesign" class="btn btn-secondary">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            Use selected artboard
          </button>
          <div id="designStatus" class="status">
            <span class="status-dot"></span>
            <span>No artboard selected yet</span>
          </div>
        </div>

        <!-- Step 2: Screenshot -->
        <div class="section" id="step2Section">
          <div class="step-header">
            <div class="step-num" id="step2Num">2</div>
            <div class="step-title">Upload screenshot</div>
          </div>
          <label class="file-upload-label" id="screenshotLabel">
            <div class="file-upload-icon" id="uploadIcon">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <span class="file-upload-text" id="uploadText"><strong>Click to upload</strong> or drag &amp; drop</span>
            <span class="file-upload-hint" id="uploadHint">PNG · JPG · WEBP</span>
            <input type="file" id="screenshot" accept="image/*" />
          </label>
          <div id="shotStatus" class="status">
            <span class="status-dot"></span>
            <span id="shotStatusSpan">No screenshot uploaded yet</span>
          </div>
          <p class="helper" id="screenshotHelper">Required for UI audit.</p>
        </div>

        <!-- Step 3: Audit settings -->
        <div class="section">
          <div class="step-header">
            <div class="step-num" id="step3Num">3</div>
            <div class="step-title">Audit settings</div>
          </div>

          <!-- Configure AI Provider -->
          <div class="field">
            <div class="config-row">
              <div class="config-status" id="configStatus">
                <span class="config-dot"></span>
                <span id="configStatusText">Not configured</span>
              </div>
              <button class="btn-configure" id="configureBtn">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
                </svg>
                Configure AI
              </button>
            </div>
          </div>

          <!-- Audit scope toggles -->
          <div class="field">
            <label class="field-label">Audit scope</label>
            <div class="toggles-stack">
              <label class="toggle-row">
                <input type="checkbox" id="includeUI" class="toggle-checkbox" checked />
                <div class="toggle-info">
                  <span class="toggle-label">UI implementation</span>
                  <span class="toggle-desc">Compares built screen vs design</span>
                </div>
                <div class="toggle-switch">
                  <div class="toggle-track"></div>
                  <div class="toggle-thumb"></div>
                </div>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="includeUX" class="toggle-checkbox" />
                <div class="toggle-info">
                  <span class="toggle-label">UX insights</span>
                  <span class="toggle-desc">Optional · more subjective</span>
                </div>
                <div class="toggle-switch">
                  <div class="toggle-track"></div>
                  <div class="toggle-thumb"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Generate -->
        <div class="generate-section">
          <button id="analyze" class="btn btn-primary">
            Generate AI audit
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <div id="resultStatus" class="status">
            <span class="status-dot"></span>
            <span>Ready when both inputs are set</span>
          </div>
        </div>

      </div>
    </div><!-- /view-main -->


    <!-- ════════════════════════════════════════
         VIEW: SETTINGS
    ════════════════════════════════════════ -->
    <div id="view-settings" class="view">
      <div class="view-header">
        <button class="btn-back" id="settingsBackBtn" aria-label="Back">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="view-title">AI Provider</span>
      </div>
      <div class="container" style="padding: 18px 18px 24px; gap: 0;">
        <div class="field">
          <label class="field-label" for="provider">Provider</label>
          <select id="provider" class="field-input">
            <option value="anthropic">Anthropic · Claude Sonnet</option>
            <option value="openai">OpenAI · GPT-4.1</option>
            <option value="gemini">Google · Gemini</option>
            <option value="openrouter">OpenRouter (Multi-model)</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="modelSelect">Model</label>
          <select id="modelSelect" class="field-input"></select>
        </div>
        <div class="field">
          <label class="field-label" for="apiKey">API Key</label>
          <div class="input-wrap">
            <input
              id="apiKey"
              type="password"
              class="field-input"
              placeholder="sk-… or sk-ant-…"
              autocomplete="off"
              spellcheck="false"
            />
            <button type="button" class="input-eye" id="eyeBtn" aria-label="Show/hide API key">
              <svg id="eyeIcon" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>
        <p class="helper" style="margin-top: 8px;">
          For best results, we recommend using <span style="color: var(--accent);">Anthropic Claude</span>.
        </p>
        <p class="helper" id="apiKeyHelp" style="margin-top: 6px;"></p>
        <div style="margin-top: 14px;">
          <button class="btn btn-primary" id="saveConfigBtn">Save configuration</button>
        </div>
        <p class="helper" style="margin-top: 12px; text-align: center;">
          Stored in memory for this session only · never leaves the plugin.
        </p>
      </div>
    </div><!-- /view-settings -->


    <!-- ════════════════════════════════════════
         VIEW: LOADING
    ════════════════════════════════════════ -->
    <div id="view-loading" class="view">
      <div class="loading-spinner-lg"></div>
      <div class="loading-text">
        <div class="loading-title" id="loadingTitle">Analyzing UI…</div>
        <div class="loading-sub" id="loadingSub">Comparing design with implementation</div>
      </div>
      <button class="btn-cancel" id="cancelBtn">Cancel</button>
    </div><!-- /view-loading -->


    <!-- ════════════════════════════════════════
         VIEW: ABOUT
    ════════════════════════════════════════ -->
    <div id="view-about" class="view">
      <div class="view-header">
        <button class="btn-back" id="aboutBackBtn" aria-label="Back">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="view-title">About</span>
      </div>
      <div class="about-body">
        <div class="about-logo logo logo-lg" aria-hidden="true">
          <svg><use href="#audit-logo-mark"></use></svg>
        </div>
        <div class="about-title">Audit<em>.</em>AI</div>
        <div class="about-tagline">Design → Implementation · AI-powered UI audit</div>
        <div class="about-divider"></div>
        <div class="about-byline">Created by Amr Fakhri</div>
        <div class="about-location">Developed and designed with ♥<br>in Cairo, Egypt</div>
        <div class="about-links">
          <a class="about-link" href="mailto:amr.fakhri@gmail.com">amr.fakhri@gmail.com</a>
          <a class="about-link" href="https://amrfakhri.com" target="_blank">amrfakhri.com</a>
        </div>
      </div>
    </div><!-- /view-about -->

  </div><!-- /plugin-root -->

  <script>
    /* ════════════════════════════════════════════════
       STATE
    ════════════════════════════════════════════════ */
    let designBytes     = null;
    let screenshotBytes = null;
    let screenshotWidth  = 0;
    let screenshotHeight = 0;
    let metadata        = null;
    let artboardName    = '';
    let designSpecs     = '';

    /* Configured AI provider state (set via Settings view) */
    let configuredProvider = 'anthropic';
    let configuredApiKey   = '';
    let configuredModel    = 'claude-sonnet-4-6';

    /* Abort controller for in-flight API request */
    let currentAbortController = null;
    let loadingMsgInterval     = null;

    /* ════════════════════════════════════════════════
       ELEMENTS
    ════════════════════════════════════════════════ */
    const screenshotInput   = document.getElementById('screenshot');
    const analyzeBtn        = document.getElementById('analyze');
    const grabDesignBtn     = document.getElementById('grabDesign');
    const includeUICheckbox = document.getElementById('includeUI');
    const includeUXCheckbox = document.getElementById('includeUX');
    const designStatus      = document.getElementById('designStatus');
    const shotStatus        = document.getElementById('shotStatus');
    const resultStatus      = document.getElementById('resultStatus');

    const MODEL_MAP = {
      
      anthropic: [
        { label: 'Claude Sonnet 4.6', value: 'claude-sonnet-4-6' }
      ],
      openai: [
        { label: 'GPT-4.1', value: 'gpt-4.1' },
        { label: 'GPT-4o', value: 'gpt-4o' }
      ],
      gemini: [
        { label: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
        { label: 'Gemini 2.5 Flash', value: 'gemini-2.5-flash' },
        { label: 'Gemini 2.5 Flash-Lite', value: 'gemini-2.5-flash-lite' }
      ],
      openrouter: [
        { label: 'GPT-4.1 (OpenAI)', value: 'openai/gpt-4.1' },
        { label: 'GPT-4o (OpenAI)', value: 'openai/gpt-4o' },
        { label: 'Gemini 2.5 Pro', value: 'google/gemini-2.5-pro' },
        { label: 'Claude Sonnet 4.5', value: 'anthropic/claude-sonnet-4.5' }
      ]
    };

    function updateModelDropdown(provider) {
      const select = document.getElementById('modelSelect');
      if (!select) return;
      select.innerHTML = '';

      const models = MODEL_MAP[provider] || [];
      models.forEach(function (m) {
        const opt = document.createElement('option');
        opt.value = m.value;
        opt.textContent = m.label;
        select.appendChild(opt);
      });

      if (models.length > 0) {
        const existing = configuredProvider === provider ? configuredModel : '';
        select.value = models.some(function (m) { return m.value === existing; })
          ? existing
          : models[0].value;
      }
    }

    updateModelDropdown(configuredProvider);

    /* ════════════════════════════════════════════════
       VIEW SWITCHER
    ════════════════════════════════════════════════ */
    function showView(id) {
      document.querySelectorAll('.view').forEach(function (v) {
        v.classList.remove('view-active');
      });
      var el = document.getElementById('view-' + id);
      if (el) el.classList.add('view-active');
    }

    /* ════════════════════════════════════════════════
       UI HELPERS
    ════════════════════════════════════════════════ */
    function setStatus(el, text, type) {
      el.innerHTML = '<span class="status-dot"></span><span>' + text + '</span>';
      el.className = 'status' + (type ? ' ' + type : '');
    }

    function markStep(num, done) {
      const el = document.getElementById('step' + num + 'Num');
      if (el) el.className = 'step-num' + (done ? ' done' : '');
    }

    /* ────── UX-only mode: dim step 2 + update helper text ────── */
    function updateScopeUI() {
      var ui     = includeUICheckbox.checked;
      var ux     = includeUXCheckbox.checked;
      var sec    = document.getElementById('step2Section');
      var helper = document.getElementById('screenshotHelper');
      if (!ui && ux) {
        sec.classList.add('dimmed');
        if (helper) helper.textContent = 'Screenshot optional in UX-only mode.';
      } else {
        sec.classList.remove('dimmed');
        if (helper) helper.textContent = 'Required for UI audit.';
      }
    }
    includeUICheckbox.addEventListener('change', updateScopeUI);
    includeUXCheckbox.addEventListener('change', updateScopeUI);

    /* ════════════════════════════════════════════════
       SETTINGS VIEW
    ════════════════════════════════════════════════ */
    document.getElementById('configureBtn').onclick = function () {
      document.getElementById('provider').value = configuredProvider;
      updateModelDropdown(configuredProvider);
      document.getElementById('modelSelect').value = configuredModel;
      document.getElementById('apiKey').value   = configuredApiKey;
      updateApiKeyHelp(configuredProvider);
      showView('settings');
    };

    var API_KEY_HELP = {
      openai:      { text: 'Get your API key from OpenAI',     url: 'https://platform.openai.com/api-keys' },
      anthropic:   { text: 'Get your API key from Anthropic',  url: 'https://console.anthropic.com/settings/keys' },
      gemini:      { text: 'Get your API key from Google AI',  url: 'https://aistudio.google.com/app/apikey' },
      openrouter:  { text: 'Get your API key from OpenRouter', url: 'https://openrouter.ai/keys' },
    };

    function updateApiKeyHelp(provider) {
      var el   = document.getElementById('apiKeyHelp');
      var info = API_KEY_HELP[provider];
      if (!info) { el.innerHTML = ''; return; }
      el.innerHTML = info.text + ' \\u2192 <a class="helper-link" href="' + info.url + '" target="_blank" rel="noopener noreferrer">Open</a>';
    }

    document.getElementById('provider').onchange = function () {
      updateModelDropdown(this.value);
      updateApiKeyHelp(this.value);
    };

    document.getElementById('settingsBackBtn').onclick = function () {
      showView('main');
    };

    document.getElementById('saveConfigBtn').onclick = function () {
      var key  = document.getElementById('apiKey').value.trim();
      var prov = document.getElementById('provider').value;
      var model = document.getElementById('modelSelect').value;
      var keyEl = document.getElementById('apiKey');
      if (!key) {
        keyEl.style.borderColor = 'rgba(255,99,99,0.45)';
        keyEl.focus();
        return;
      }
      keyEl.style.borderColor = '';
      configuredApiKey   = key;
      configuredProvider = prov;
      configuredModel    = model || ((MODEL_MAP[prov] && MODEL_MAP[prov][0] && MODEL_MAP[prov][0].value) || '');

      var modelLabel = configuredModel;
      var models = MODEL_MAP[prov] || [];
      var match = models.find(function (m) { return m.value === configuredModel; });
      if (match) modelLabel = match.label;
      var statusEl  = document.getElementById('configStatus');
      var statusTxt = document.getElementById('configStatusText');
      var cfgBtn    = document.getElementById('configureBtn');
      statusEl.className  = 'config-status configured';
      statusTxt.textContent = 'Configured · ' + modelLabel;
      cfgBtn.className    = 'btn-configure configured';
      showView('main');
    };

    /* Eye toggle (lives in settings view) */
    document.getElementById('eyeBtn').onclick = function () {
      var inp    = document.getElementById('apiKey');
      var isPass = inp.type === 'password';
      inp.type   = isPass ? 'text' : 'password';
      document.getElementById('eyeIcon').innerHTML = isPass
        ? '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    };

    /* ════════════════════════════════════════════════
       LOADING VIEW
    ════════════════════════════════════════════════ */
    var LOADING_MSGS = [
      { title: 'Analyzing UI\\u2026',              sub: 'Comparing design with implementation' },
      { title: 'Inspecting elements\\u2026',       sub: 'Checking spacing, typography & colour' },
      { title: 'Running visual diff\\u2026',       sub: 'Looking for implementation deviations' },
      { title: 'Almost there\\u2026',              sub: 'Generating detailed findings' },
    ];

    function startLoadingMessages() {
      var idx = 0;
      var titleEl = document.getElementById('loadingTitle');
      var subEl   = document.getElementById('loadingSub');
      function set(i) {
        if (titleEl) titleEl.textContent = LOADING_MSGS[i].title;
        if (subEl)   subEl.textContent   = LOADING_MSGS[i].sub;
      }
      set(0);
      loadingMsgInterval = setInterval(function () {
        idx = (idx + 1) % LOADING_MSGS.length;
        set(idx);
      }, 3500);
    }

    function stopLoadingMessages() {
      if (loadingMsgInterval) { clearInterval(loadingMsgInterval); loadingMsgInterval = null; }
    }

    document.getElementById('cancelBtn').onclick = function () {
      if (currentAbortController) currentAbortController.abort();
    };

    /* ════════════════════════════════════════════════
       ABOUT VIEW
    ════════════════════════════════════════════════ */
    document.getElementById('aboutBtn').onclick    = function () { showView('about'); };
    document.getElementById('aboutBackBtn').onclick = function () { showView('main'); };

    /* ════════════════════════════════════════════════
       IMAGE UTILITIES
    ════════════════════════════════════════════════ */

    /**
     * Convert a number[] | Uint8Array to base64 string in safe chunks.
     */
    function bytesToBase64(bytes) {
      let binary = '';
      const arr = new Uint8Array(bytes);
      const chunk = 0x8000;
      for (let i = 0; i < arr.length; i += chunk) {
        binary += String.fromCharCode.apply(null, arr.subarray(i, i + chunk));
      }
      return btoa(binary);
    }

    /**
     * Resize image bytes to a maximum width using canvas, preserving aspect ratio.
     * Returns original bytes if already within limit.
     * MAX_W = 1536 px — matches OpenAI "high detail" tile boundary and keeps
     * Claude token cost predictable without losing fine detail.
     */
    function resizeImageIfNeeded(bytes, maxW) {
      maxW = maxW || 1536;
      return new Promise(function (resolve) {
        var uint8  = new Uint8Array(bytes);
        var blob   = new Blob([uint8], { type: 'image/png' });
        var url    = URL.createObjectURL(blob);
        var img    = new Image();

        img.onerror = function () { URL.revokeObjectURL(url); resolve(bytes); };
        img.onload  = function () {
          URL.revokeObjectURL(url);
          if (img.naturalWidth <= maxW) { resolve(bytes); return; }

          var scale  = maxW / img.naturalWidth;
          var canvas = document.createElement('canvas');
          canvas.width  = maxW;
          canvas.height = Math.round(img.naturalHeight * scale);

          var ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled  = true;
          ctx.imageSmoothingQuality  = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(function (resized) {
            if (!resized) { resolve(bytes); return; }
            resized.arrayBuffer().then(function (buf) {
              resolve(Array.from(new Uint8Array(buf)));
            });
          }, 'image/png');
        };
        img.src = url;
      });
    }

    /**
     * Read width × height from raw PNG/JPEG bytes without drawing to canvas.
     * Returns { w, h } or null on failure.
     */
    function getImageDims(bytes) {
      try {
        var u = new Uint8Array(bytes);
        // PNG: bytes 16-23 = IHDR width, height (big-endian uint32)
        if (u[0] === 0x89 && u[1] === 0x50) {
          var w = (u[16] << 24 | u[17] << 16 | u[18] << 8 | u[19]) >>> 0;
          var h = (u[20] << 24 | u[21] << 16 | u[22] << 8 | u[23]) >>> 0;
          return { w: w, h: h };
        }
        // JPEG: scan for SOF0/SOF2 markers (FF C0 / FF C2)
        for (var i = 0; i < u.length - 8; i++) {
          if (u[i] === 0xFF && (u[i + 1] === 0xC0 || u[i + 1] === 0xC2)) {
            var jh = (u[i + 5] << 8) | u[i + 6];
            var jw = (u[i + 7] << 8) | u[i + 8];
            return { w: jw, h: jh };
          }
        }
      } catch (_) {}
      return null;
    }

    /* ════════════════════════════════════════════════
       JSON PARSING  — robust, multi-fallback
    ════════════════════════════════════════════════ */
    function safeJsonParse(text) {
      /* 1. Direct parse */
      try { return JSON.parse(text); } catch (_) {}

      /* 2. Strip markdown code fences */
      var cleaned = text.replace(/\`\`\`json\\s*/gi, '').replace(/\`\`\`\\s*/g, '').trim();
      try { return JSON.parse(cleaned); } catch (_) {}

      /* 3. Extract first {...} block via regex */
      var m = cleaned.match(/\\{[\\s\\S]*\\}/);
      if (m) { try { return JSON.parse(m[0]); } catch (_) {} }

      /* 4. Last resort — return empty scaffold so the rest of the code doesn't crash */
      console.warn('[AuditAI] Could not parse AI response as JSON. Raw text:', text);
      return { uiIssues: [], uxInsights: [] };
    }

    /* ════════════════════════════════════════════════
       ISSUE NORMALISATION
    ════════════════════════════════════════════════ */
    var UI_CATEGORIES  = ['Typography','Colour','Spacing','Sizing','Alignment','Border radius','Component','Missing element','Extra element','Elevation'];
    var UX_CATEGORIES  = ['Hierarchy','Readability','Interaction','Accessibility','Flow'];
    var ALL_CATEGORIES = UI_CATEGORIES.concat(UX_CATEGORIES).concat(['UX','Layout','Visual styling','Missing / extra element']);

    function normalizeIssue(issue, index, isUX) {
      isUX = isUX || false;

      var fallbackCat = isUX ? 'Hierarchy' : 'Layout';
      var category    = ALL_CATEGORIES.includes(issue.category) ? issue.category : fallbackCat;
      var severity    = ['High', 'Medium', 'Low'].includes(issue.severity) ? issue.severity : 'Medium';

      var normBounds;
      if (!isUX && issue.normBounds) {
        normBounds = {
          x:      Math.max(0, Math.min(1, Number(issue.normBounds.x)      || 0)),
          y:      Math.max(0, Math.min(1, Number(issue.normBounds.y)      || 0)),
          width:  Math.max(0.02, Math.min(1, Number(issue.normBounds.width)  || 0.1)),
          height: Math.max(0.01, Math.min(1, Number(issue.normBounds.height) || 0.05)),
        };
      }

      return {
        id:             typeof issue.id === 'number' ? issue.id : index + 1,
        element:        issue.element   || undefined,
        title:          issue.title     || (isUX ? 'UX insight' : 'UI issue'),
        description:    issue.description || (isUX ? 'A UX concern was identified.' : 'A UI implementation issue was identified.'),
        severity,
        category,
        recommendation: issue.recommendation || 'Review against the design specification.',
        normBounds,
      };
    }

    /* ════════════════════════════════════════════════
       PROMPT BUILDER
       Returns { systemPrompt, userPrompt }
    ════════════════════════════════════════════════ */
    function buildAuditPrompt(opts) {
      var includeUI       = opts.includeUI;
      var includeUX       = opts.includeUX;
      var specs           = opts.specs;
      var screenshotWidth  = opts.screenshotWidth;
      var screenshotHeight = opts.screenshotHeight;
      var designW         = opts.designW;
      var designH         = opts.designH;

      /* ── System prompt: role, quality bar, anti-hallucination stance ── */
      var systemPrompt = [
        'You are a senior product designer and UI QA engineer specialising in design-to-implementation audits.',
        'You have 10+ years of experience catching the exact visual discrepancies that ship to production and hurt brand consistency.',
        '',
        'Your audit reports are:',
        '- Evidence-based: every finding cites specific values observed in BOTH the design (IMAGE 1) and the implementation (IMAGE 2)',
        '- Precise: hex colours, px values, font weights, and element names are exact — never vague or approximate',
        '- Actionable: each finding tells the developer exactly what CSS/style property to change and to what value',
        '- Signal-only: you never report compression artefacts, platform font-rendering, anti-aliasing, or hover/focus states',
        '',
        'Source priority is critical:',
        '- IMAGE 1 (design) is the PRIMARY source of truth.',
        '- IMAGE 2 (screenshot) is the comparison target.',
        '- SPECS (layer tree) are SECONDARY reference only.',
        '- Use specs ONLY to confirm values (font size, spacing, colour).',
        '- Do NOT rely on specs without visually verifying in IMAGE 1.',
        '- If there is any conflict, ALWAYS trust IMAGE 1.',
        '',
        'You think like a thorough code reviewer: you block a PR for real visual regressions, but you never raise noise.'
      ].join('\\n');

      /* ── Context block: specs + dimensions ── */
      var contextLines = [];
      if (specs && specs.length > 10) {
        contextLines.push('SOURCE DESIGN SPECIFICATIONS (SECONDARY REFERENCE)');
        contextLines.push('- Use only to confirm values');
        contextLines.push('- Do not rely on without visual verification');
        contextLines.push('- If conflict → trust IMAGE 1');
        contextLines.push('---');
        contextLines.push(specs);
        contextLines.push('---');
        contextLines.push('');
      }
      if (designW && designH) {
        contextLines.push('IMAGE 1 (design) original canvas size: ' + designW + '×' + designH + 'px.');
      }
      if (screenshotWidth && screenshotHeight) {
        contextLines.push('IMAGE 2 (implementation screenshot) size: ' + screenshotWidth + '×' + screenshotHeight + 'px.');
      }
      var contextBlock = contextLines.length ? contextLines.join('\\n') + '\\n\\n' : '';

      /* ── UI audit block ── */
      var uiBlock = '';
      if (includeUI) {
        uiBlock = [
          '## UI IMPLEMENTATION AUDIT',
          '',
          'Compare IMAGE 1 (Figma design, ground truth) against IMAGE 2 (built implementation) element by element,',
          'scanning top-to-bottom, left-to-right.',
          'IMAGE 1 is the visual source of truth. IMAGE 2 is the comparison target. Specs are only secondary value confirmation.',
          '',
          '### Source priority rule (CRITICAL):',
          '- Use specs ONLY to confirm values (font size, spacing, color).',
          '- Do NOT rely on specs without visually verifying in IMAGE 1.',
          '- If there is any conflict → ALWAYS trust IMAGE 1.',
          '',
          '### REPORT an issue only when ALL three conditions are met:',
          '1. The difference is clearly visible in both images — not inferred or assumed.',
          '2. The difference exceeds the minimum threshold:',
          '   - Colour: any perceptible hex deviation in text, background, border, or icon',
          '   - Spacing / padding / margin: ≥ 4 px difference from design',
          '   - Font size: ≥ 2 px difference',
          '   - Font weight: any weight-step difference (e.g. 400 → 500)',
          '   - Component width or height: ≥ 8 px off from design',
          '   - Alignment: element is visibly off-axis (not a 1 px rendering shift)',
          '   - Border radius: noticeably different corner rounding',
          '3. A developer can fix it with a concrete CSS or style property change.',
          '',
          '### DO NOT report (hard exclusions):',
          '- Sub-pixel anti-aliasing at text edges',
          '- JPEG / PNG compression noise',
          '- Shadow blur differences of ≤ 2 px',
          '- OS-level font hinting or subpixel smoothing (e.g. macOS vs Windows rendering)',
          '- Hover, active, or focus states not shown in the static design',
          '- Differences in content (text copy, images, placeholder values)',
          '- Minor icon stroke-width variation due to scaling (≤ 0.5 px)',
          '- Differences you are not fully confident about — omit uncertain findings entirely',
          '',
          '### Anti-hallucination rule:',
          '- Only report an issue if you can point to the specific pixel region in IMAGE 2 where the problem appears.',
          '- If you cannot locate the exact element in IMAGE 2, skip the issue entirely.',
          '- Do not infer issues from IMAGE 1 alone.',
          '',
          '### Visual alignment rule (CRITICAL):',
          '- First identify the SAME element in IMAGE 1 and IMAGE 2.',
          '- Match elements using layout, structure, and hierarchy.',
          '- normBounds MUST always refer to IMAGE 2.',
          '- If layouts differ: estimate based on relative positioning (not guessing).',
          '- NEVER place bounds without locating the element in IMAGE 2.',
          '- NEVER reuse the same region for multiple issues.',
          '- NEVER guess approximate positions.',
          '',
          '### Annotation placement rule (STRICT):',
          '- Each issue MUST have a unique region.',
          '- No overlapping bounds.',
          '- If multiple issues affect the same element: MERGE into ONE issue.',
          '- Prefer one strong issue per element.',
          '',
          '### Element naming rule:',
          '- Always name elements based on role, not generic terms.',
          '- GOOD: Primary CTA button; Navigation bar; Product card title.',
          '- BAD: text; box; element.',
          '',
          '### Prioritization rule:',
          '- Report highest impact issues first.',
          '- Order: High → Medium → Low.',
          '- Do not mix random ordering.',
          '',
          '### Quality rule:',
          '- Avoid generic phrases like "spacing is inconsistent".',
          '- Always include specific values (px, hex, weight).',
          '- Every issue must be unique and non-repeated.',
          '',
          '### Description format (follow exactly):',
          'Write every description as: "Design: [value/state]. Implementation: [value/state]."',
          'Example: "Design: font-weight 700, 18 px, colour #111827. Implementation: font-weight 400, 16 px, colour #374151."',
          '',
          '### Categories (use exactly one — no others allowed):',
          '"Typography" — font size, weight, family, line-height, letter-spacing, colour',
          '"Colour"     — background, surface, border, or icon colour mismatch',
          '"Spacing"    — padding, margin, or gap between elements',
          '"Sizing"     — component width or height differs from design',
          '"Alignment"  — element position or axis differs from design',
          '"Border radius" — corner rounding differs',
          '"Component"  — wrong variant, wrong component, or incorrect state',
          '"Missing element" — present in design, absent in build',
          '"Extra element"   — present in build, not in design',
          '"Elevation"  — shadow, blur, or z-order differs',
          '',
          '### Severity (assign exactly one):',
          '"High"   — immediately visible to users; breaks brand or usability',
          '"Medium" — noticeable on close inspection; deviates from design system',
          '"Low"    — minor polish; minimal user impact',
          '',
          'Output: 4–10 issues.',
          'If fewer than 4 strong issues exist: include medium-confidence issues marked as "Low".',
          'Do NOT return empty results unless both images are visually identical.',
        ].join('\\n');
      }

      /* ── UX insights block ── */
      var uxBlock = '';
      if (includeUX) {
        uxBlock = [
          '',
          '## UX INSIGHTS (secondary, optional)',
          '',
          'Review IMAGE 2 for UX concerns that are clearly visible and immediately actionable.',
          'Include only if:',
          '- The issue has visible impact on usability, readability, or user flow.',
          '- A developer or designer could act on it without further research.',
          '- It is NOT already captured as a UI issue above.',
          '',
          'Limit: 2–4 high-value insights. No generic usability advice.',
          'Categories: "Hierarchy", "Readability", "Interaction", "Accessibility", "Flow"',
        ].join('\\n');
      }

      /* ── JSON schema instructions ── */
      var schemaBlock = [
        '',
        '## OUTPUT',
        '',
        'Return ONLY a valid JSON object — no markdown, no code fences, no prose outside the JSON.',
        '',
        'Schema:',
        '{',
        '  "uiIssues": [',
        '    {',
        '      "id": 1,',
        '      "element": "Exact UI element name (e.g. Primary CTA button, Top navigation bar, Price label in product card)",',
        '      "title": "Short issue title — max 8 words",',
        '      "description": "Design: [exact value]. Implementation: [exact value].",',
        '      "severity": "High | Medium | Low",',
        '      "category": "One of the allowed categories listed above",',
        '      "recommendation": "Set [property] on [element] to [exact value from design].",',
        '      "normBounds": { "x": 0.10, "y": 0.65, "width": 0.80, "height": 0.08 }',
        '    }',
        '  ],',
        '  "uxInsights": [',
        '    {',
        '      "id": 1,',
        '      "element": "Element or section name",',
        '      "title": "UX insight title — max 8 words",',
        '      "description": "Specific, observable UX concern.",',
        '      "severity": "High | Medium | Low",',
        '      "category": "Hierarchy | Readability | Interaction | Accessibility | Flow",',
        '      "recommendation": "Concrete, actionable UX fix."',
        '    }',
        '  ]',
        '}',
        '',
        'normBounds rules — READ CAREFULLY (applied to IMAGE 2 only):',
        '- All values are fractions of IMAGE 2 dimensions: 0.0 = top-left edge, 1.0 = bottom-right edge',
        '- x, y = top-left corner of the affected element\\'s bounding box',
        '- width, height = size of that bounding box',
        '- ALL four values MUST be clamped: 0.0 ≤ x,y,width,height ≤ 1.0',
        '- x + width MUST NOT exceed 1.0 — clamp if needed',
        '- y + height MUST NOT exceed 1.0 — clamp if needed',
        '- TIGHT bounds: wrap the exact UI element, not the whole screen or a large vague region',
        '- If you are unsure of the exact location → DO NOT GUESS → omit normBounds or skip the issue',
        '- Each uiIssue normBounds must be unique and non-overlapping',
        '- If two issues affect the same IMAGE 2 element or region, merge them into one issue',
        '',
        'Sizing guidance for normBounds:',
        '- Small button (e.g. CTA):   { "x": 0.72, "y": 0.18, "width": 0.18, "height": 0.06 }',
        '- Full-width header bar:      { "x": 0.0,  "y": 0.0,  "width": 1.0,  "height": 0.10 }',
        '- Navigation item (one tab):  { "x": 0.25, "y": 0.92, "width": 0.20, "height": 0.06 }',
        '- Card in the centre:         { "x": 0.10, "y": 0.30, "width": 0.80, "height": 0.20 }',
        '- Label inside a card:        { "x": 0.15, "y": 0.35, "width": 0.35, "height": 0.04 }',
        '',
        '- If uiIssues disabled: "uiIssues": []',
        '- If uxInsights disabled: "uxInsights": []',
      ].join('\\n');

      var userPrompt = [
        contextBlock,
        'You are comparing two images:',
        '- IMAGE 1 = SOURCE DESIGN (Figma export — this is the ground truth)',
        '- IMAGE 2 = BUILT IMPLEMENTATION (developer screenshot — this is what was actually built)',
        '- TEXT SPECS = SECONDARY REFERENCE ONLY. Use only to confirm values after visually checking IMAGE 1.',
        '',
        'If IMAGE 1 and specs conflict, trust IMAGE 1.',
        '',
        uiBlock,
        uxBlock,
        schemaBlock,
      ].join('\\n');

      return { systemPrompt: systemPrompt, userPrompt: userPrompt };
    }

    /* ════════════════════════════════════════════════
       API — OpenAI
    ════════════════════════════════════════════════ */
    async function runOpenAI({ apiKey, model, systemPrompt, userPrompt, designBytes, screenshotBytes, signal }) {
      const designB64     = bytesToBase64(designBytes);
      const screenshotB64 = bytesToBase64(screenshotBytes);
      const safeModel     = model || configuredModel || 'gpt-4.1';

      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        signal,
        headers: {
          Authorization: \`Bearer \${apiKey}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: safeModel,
          temperature: 0,
          input: [
            /* System role sets quality bar before the images arrive */
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: 'input_text',  text: userPrompt },
                /* IMAGE 1 — design source */
                { type: 'input_image', image_url: \`data:image/png;base64,\${designB64}\` },
                /* IMAGE 2 — built screenshot */
                { type: 'input_image', image_url: \`data:image/png;base64,\${screenshotB64}\` },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        /* Surface a meaningful error message */
        let msg = 'OpenAI request failed (' + response.status + ')';
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error && errJson.error.message) msg = 'OpenAI: ' + errJson.error.message;
        } catch (_) { msg = 'OpenAI: ' + errText.slice(0, 200); }
        throw new Error(msg);
      }

      const data         = await response.json();
      const firstOutput  = data.output && data.output[0];
      const firstContent = firstOutput && firstOutput.content &&
        firstOutput.content.find(function (c) { return c.type === 'output_text'; });
      return (firstContent && firstContent.text) || data.output_text || '';
    }

    /* ════════════════════════════════════════════════
       API — Anthropic Claude
    ════════════════════════════════════════════════ */
    async function runClaude({ apiKey, model, systemPrompt, userPrompt, designBytes, screenshotBytes, signal }) {
      const designB64     = bytesToBase64(designBytes);
      const screenshotB64 = bytesToBase64(screenshotBytes);
      const safeModel     = model || configuredModel || 'claude-sonnet-4-6';

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal,
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: safeModel,
          max_tokens: 4096,
          temperature: 0,
          /* system parameter keeps persona + rules out of the user turn,
             which improves adherence significantly */
          system: systemPrompt,
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              /* IMAGE 1 — design source */
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/png', data: designB64 },
              },
              /* IMAGE 2 — built screenshot */
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/png', data: screenshotB64 },
              },
            ],
          }],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let msg = 'Claude request failed (' + response.status + ')';
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error && errJson.error.message) msg = 'Claude: ' + errJson.error.message;
        } catch (_) { msg = 'Claude: ' + errText.slice(0, 200); }
        throw new Error(msg);
      }

      const data     = await response.json();
      const firstMsg = data.content && data.content[0];
      return (firstMsg && firstMsg.text) || '';
    }

    /* ════════════════════════════════════════════════
       API — Google Gemini
    ════════════════════════════════════════════════ */
    async function runGemini({ apiKey, model, systemPrompt, userPrompt, designBytes, screenshotBytes, signal }) {
      const designB64     = bytesToBase64(designBytes);
      const screenshotB64 = bytesToBase64(screenshotBytes);
      const safeModel     = model || configuredModel || 'gemini-2.5-pro';

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + safeModel + ':generateContent', {
        method: 'POST',
        signal,
        headers: {
          'x-goog-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [{
            role: 'user',
            parts: [
              { text: userPrompt },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: designB64,
                },
              },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: screenshotB64,
                },
              },
            ],
          }],
          generationConfig: {
            temperature: 0,
            response_mime_type: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let msg = 'Gemini request failed (' + response.status + ')';
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error && errJson.error.message) msg = 'Gemini: ' + errJson.error.message;
        } catch (_) { msg = 'Gemini: ' + errText.slice(0, 200); }
        throw new Error(msg);
      }

      const data = await response.json();
      const firstCandidate = data.candidates && data.candidates[0];
      const parts = firstCandidate && firstCandidate.content && firstCandidate.content.parts;
      return parts && parts[0] && parts[0].text ? parts[0].text : '';
    }

    /* ════════════════════════════════════════════════
       API — OpenRouter
    ════════════════════════════════════════════════ */
    async function runOpenRouter({
      apiKey,
      model,
      systemPrompt,
      userPrompt,
      designBytes,
      screenshotBytes,
      signal
    }) {
      const designB64     = bytesToBase64(designBytes);
      const screenshotB64 = bytesToBase64(screenshotBytes);

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal,
        headers: {
          Authorization: \`Bearer \${apiKey}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model || configuredModel || 'openai/gpt-4.1',
          temperature: 0,
          max_tokens: 2000,
          messages: [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: 'text', text: userPrompt },
                {
                  type: 'image_url',
                  image_url: { url: \`data:image/png;base64,\${designB64}\` },
                },
                {
                  type: 'image_url',
                  image_url: { url: \`data:image/png;base64,\${screenshotB64}\` },
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error('OpenRouter: ' + errText.slice(0, 200));
      }

      const data = await response.json();
      return (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
    }

    /* ════════════════════════════════════════════════
       EVENT: GRAB DESIGN
    ════════════════════════════════════════════════ */
    grabDesignBtn.onclick = () => {
      parent.postMessage({ pluginMessage: { type: 'request-design-source' } }, '*');
    };

    /* ════════════════════════════════════════════════
       EVENT: SCREENSHOT UPLOAD
    ════════════════════════════════════════════════ */
    screenshotInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const buffer = await file.arrayBuffer();
      screenshotBytes = Array.from(new Uint8Array(buffer));

      /* Read natural dimensions for the prompt context */
      const url = URL.createObjectURL(file);
      await new Promise((resolve) => {
        const img   = new Image();
        img.onload  = () => {
          screenshotWidth  = img.naturalWidth;
          screenshotHeight = img.naturalHeight;
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
        img.src = url;
      });

      /* Update drop-zone to confirmed state */
      const label = document.getElementById('screenshotLabel');
      label.classList.add('has-file');
      document.getElementById('uploadIcon').className = 'file-upload-icon ok';
      document.getElementById('uploadIcon').innerHTML =
        '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>';
      document.getElementById('uploadText').innerHTML  = '<strong>' + file.name + '</strong>';
      document.getElementById('uploadHint').textContent = screenshotWidth + '×' + screenshotHeight + 'px';

      setStatus(shotStatus, 'Screenshot ready · ' + screenshotWidth + '×' + screenshotHeight, 'ok');
      markStep(2, true);
    };

    /* ════════════════════════════════════════════════
       EVENT: PLUGIN → UI MESSAGES
    ════════════════════════════════════════════════ */
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;

      if (msg.type === 'selection-error') {
        setStatus(designStatus, msg.message, 'error');
        markStep(1, false);
      }

      if (msg.type === 'design-source-ready') {
        designBytes  = msg.payload.bytes;
        metadata     = msg.payload.metadata;
        artboardName = msg.payload.name;
        designSpecs  = msg.payload.specs || '';
        setStatus(designStatus, 'Selected: ' + msg.payload.name, 'ok');
        markStep(1, true);
      }
    };

    /* ════════════════════════════════════════════════
       EVENT: GENERATE AUDIT
    ════════════════════════════════════════════════ */
    analyzeBtn.onclick = async () => {
      const includeUI = includeUICheckbox.checked;
      const includeUX = includeUXCheckbox.checked;
      const apiKey    = configuredApiKey;
      const provider  = configuredProvider;
      const model     = configuredModel || ((MODEL_MAP[provider] && MODEL_MAP[provider][0] && MODEL_MAP[provider][0].value) || '');
      const modelEntry = (MODEL_MAP[provider] || []).find(function (m) { return m.value === model; });
      const modelLabel = modelEntry ? modelEntry.label : model;

      /* ── Pre-flight validation ── */
      if (!includeUI && !includeUX) {
        setStatus(resultStatus, 'Enable at least one audit scope.', 'error');
        return;
      }
      if (!designBytes || !metadata) {
        setStatus(resultStatus, 'Select a Figma artboard first.', 'error');
        return;
      }
      if (includeUI && !screenshotBytes) {
        setStatus(resultStatus, 'Upload a screenshot for UI audit.', 'error');
        return;
      }
      if (!apiKey) {
        setStatus(resultStatus, 'Configure your AI provider first.', 'error');
        return;
      }

      /* ── Aspect-ratio sanity check (UI mode only) ── */
      if (includeUI && screenshotWidth && screenshotHeight) {
        const designDims = getImageDims(designBytes);
        if (designDims) {
          const diff = Math.abs(designDims.w / designDims.h - screenshotWidth / screenshotHeight)
                       / (designDims.w / designDims.h);
          if (diff > 0.15) {
            console.warn('[AuditAI] Aspect ratio mismatch ' +
              designDims.w + '×' + designDims.h + ' vs ' +
              screenshotWidth + '×' + screenshotHeight +
              ' (' + Math.round(diff * 100) + '%). Results may be less accurate.');
          }
        }
      }

      /* ── Show loading screen ── */
      currentAbortController = new AbortController();
      showView('loading');
      startLoadingMessages();

      try {
        /* ── Preprocess: cap images at 1536 px wide ── */
        const processedDesign = await resizeImageIfNeeded(designBytes, 1536);
        const processedShot   = screenshotBytes
          ? await resizeImageIfNeeded(screenshotBytes, 1536)
          : processedDesign; /* UX-only fallback: analyse design directly */

        /* ── Dimensions for prompt context ── */
        const designDims = getImageDims(processedDesign);
        const promptShotW = screenshotWidth  || (designDims ? designDims.w : undefined);
        const promptShotH = screenshotHeight || (designDims ? designDims.h : undefined);

        /* ── Build prompt ── */
        const { systemPrompt, userPrompt } = buildAuditPrompt({
          includeUI,
          includeUX,
          specs:           designSpecs,
          screenshotWidth:  promptShotW,
          screenshotHeight: promptShotH,
          designW: designDims ? designDims.w : undefined,
          designH: designDims ? designDims.h : undefined,
        });

        /* ── Call selected provider ── */
        const signal  = currentAbortController.signal;
        let rawText;
        if (provider === 'anthropic') {
          rawText = await runClaude({ apiKey, model, systemPrompt, userPrompt, designBytes: processedDesign, screenshotBytes: processedShot, signal });
        } else if (provider === 'gemini') {
          rawText = await runGemini({ apiKey, model, systemPrompt, userPrompt, designBytes: processedDesign, screenshotBytes: processedShot, signal });
        } else if (provider === 'openrouter') {
          rawText = await runOpenRouter({ apiKey, model, systemPrompt, userPrompt, designBytes: processedDesign, screenshotBytes: processedShot, signal });
        } else {
          rawText = await runOpenAI({ apiKey, model, systemPrompt, userPrompt, designBytes: processedDesign, screenshotBytes: processedShot, signal });
        }

        /* ── Parse & normalize ── */
        const parsed     = safeJsonParse(rawText);
        const uiIssues   = (parsed.uiIssues  || []).map((iss, i) => normalizeIssue(iss, i, false));
        const uxInsights = (parsed.uxInsights || []).map((iss, i) => normalizeIssue(iss, i, true));

        /* ── Send to Figma plugin (code.ts) ── */
        parent.postMessage({
          pluginMessage: {
            type: 'create-audit-board',
            payload: {
              artboardName,
              designBytes:     processedDesign,
              screenshotBytes: processedShot,
              screenshotWidth:  promptShotW || 0,
              screenshotHeight: promptShotH || 0,
              metadata,
              uiIssues,
              uxInsights,
              provider: provider === 'anthropic' ? 'Claude' : provider === 'gemini' ? 'Gemini' : provider === 'openrouter' ? 'OpenRouter' : 'OpenAI',
              model: modelLabel,
              includeUX,
            },
          },
        }, '*');

        /* ── Return to main view with success status ── */
        showView('main');
        const ui  = uiIssues.length;
        const ux  = uxInsights.length;
        const sum = ui + ' UI finding' + (ui !== 1 ? 's' : '')
          + (includeUX ? ' · ' + ux + ' UX insight' + (ux !== 1 ? 's' : '') : '');
        setStatus(resultStatus, 'Done · ' + sum, 'ok');
        markStep(3, true);

      } catch (err) {
        stopLoadingMessages();
        showView('main');
        if (err && err.name === 'AbortError') {
          setStatus(resultStatus, 'Audit cancelled.', '');
          return;
        }
        console.error('[AuditAI]', err);
        setStatus(resultStatus, (err && err.message) || 'Something went wrong. Check your API key and try again.', 'error');
      } finally {
        stopLoadingMessages();
        currentAbortController = null;
      }
    };
  <\/script>
</body>
</html>
`;figma.showUI(Z,{width:460,height:760});function Q(n,i,a,t=1){const e=o=>Math.round(o*255).toString(16).padStart(2,"0");return`#${e(n)}${e(i)}${e(a)}${t<.99?e(t):""}`}function X(n){for(const i of n)if(i.type==="SOLID"&&i.visible!==!1){const{r:a,g:t,b:e}=i.color,o=i.opacity!==void 0?i.opacity:1;return Q(a,t,e,o)}return null}function V(n,i,a,t){if(a>4||!n.visible)return;const e=Math.round(n.width||0),o=Math.round(n.height||0),l=Math.round(n.x||0),u=Math.round(n.y||0);if(!(e<6||o<6)){if(n.type==="TEXT"&&t.text<50){t.text++;const s=n,r=s.characters.replace(/\s+/g," ").substring(0,80),d=s.fontName!==figma.mixed?s.fontName:{family:"Mixed",style:"Mixed"},f=s.fontSize!==figma.mixed?s.fontSize:"?",g=s.lineHeight,b=g!==figma.mixed?g.unit==="AUTO"?"auto":`${Math.round(g.value)}${g.unit==="PERCENT"?"%":"px"}`:"?",y=Array.isArray(s.fills)&&s.fills.length>0?X(s.fills):null;i.push(`TEXT "${r}" — ${d.family} ${d.style} ${f}px lh:${b}${y?` ${y}`:""} at(${l},${u}) ${e}×${o}px`)}else if((n.type==="FRAME"||n.type==="RECTANGLE"||n.type==="COMPONENT"||n.type==="INSTANCE")&&t.frame<40){t.frame++;const s=[`${e}×${o}px`,`at(${l},${u})`];if("fills"in n&&n.fills!==figma.mixed&&Array.isArray(n.fills)&&n.fills.length>0){const r=X(n.fills);r&&s.push(`fill:${r}`)}if("cornerRadius"in n){const r=n.cornerRadius;typeof r=="number"&&r>0&&s.push(`radius:${r}px`)}if("paddingTop"in n){const r=n;(r.paddingTop>0||r.paddingLeft>0||r.paddingRight>0||r.paddingBottom>0)&&s.push(`padding:${r.paddingTop}/${r.paddingRight}/${r.paddingBottom}/${r.paddingLeft}px`),r.itemSpacing>0&&s.push(`gap:${r.itemSpacing}px`),r.layoutMode&&r.layoutMode!=="NONE"&&s.push(`layout:${r.layoutMode}`)}if("strokes"in n&&Array.isArray(n.strokes)&&n.strokes.length>0){const r=n.strokes.filter(d=>d.type==="SOLID");if(r.length>0){const d="strokeWeight"in n&&typeof n.strokeWeight=="number"?String(n.strokeWeight):"1",f=X(r);f&&s.push(`stroke:${f} ${d}px`)}}"effects"in n&&Array.isArray(n.effects)&&n.effects.length>0&&n.effects.some(d=>(d.type==="DROP_SHADOW"||d.type==="INNER_SHADOW")&&d.visible!==!1)&&s.push("has-shadow"),"opacity"in n&&typeof n.opacity=="number"&&n.opacity<1&&s.push(`opacity:${Math.round(n.opacity*100)}%`),i.push(`LAYER "${n.name}" — ${s.join(" ")}`)}if("children"in n)for(const s of n.children)V(s,i,a+1,t)}}function nn(n){const i=Math.round(n.width||0),a=Math.round(n.height||0),t=[`Artboard: "${n.name}" ${i}x${a}px`,""];V(n,t,0,{text:0,frame:0});const o=t.join(`
`);return o.length>6e3?o.substring(0,6e3)+`
[specs truncated]`:o}function en(n){return n.type==="FRAME"||n.type==="COMPONENT"||n.type==="INSTANCE"||n.type==="SECTION"}function tn(n){if(figma.fileKey)return`https://www.figma.com/design/${figma.fileKey}?node-id=${encodeURIComponent(n.id)}`}async function on(){const n=figma.currentPage.selection;if(n.length!==1||!en(n[0])){figma.ui.postMessage({type:"selection-error",message:"Select exactly one artboard, frame, component, or section."});return}const i=n[0],a=await i.exportAsync({format:"PNG",constraint:{type:"SCALE",value:2}}),t=nn(i),e={artboardName:i.name,width:i.width,height:i.height,sourceNodeId:i.id,sourceNodeUrl:tn(i)};figma.ui.postMessage({type:"design-source-ready",payload:{name:i.name,width:i.width,height:i.height,sourceNodeId:i.id,sourceNodeUrl:e.sourceNodeUrl,bytes:Array.from(a),metadata:e,specs:t}})}async function sn(){await figma.loadFontAsync({family:"Inter",style:"Regular"}),await figma.loadFontAsync({family:"Inter",style:"Medium"}),await figma.loadFontAsync({family:"Inter",style:"Bold"})}function p(n){const i=n.replace("#",""),a=parseInt(i,16);return{r:(a>>16&255)/255,g:(a>>8&255)/255,b:(a&255)/255}}function m(n,i=14,a="Regular"){const t=figma.createText();return t.fontName={family:"Inter",style:a},t.characters=n,t.fontSize=i,t.fills=[{type:"SOLID",color:p("#111827")}],t.textAutoResize="WIDTH_AND_HEIGHT",t}function v(n){n.layoutSizingHorizontal="FILL",n.layoutSizingVertical="HUG",n.textAutoResize="HEIGHT"}function L(n,i,a="#111827",t){const e=figma.createFrame();e.layoutMode="HORIZONTAL",e.counterAxisSizingMode="AUTO",e.primaryAxisSizingMode="AUTO",e.paddingTop=6,e.paddingBottom=6,e.paddingLeft=10,e.paddingRight=10,e.cornerRadius=999,e.fills=[{type:"SOLID",color:p(i)}];const o=m(n,12,"Medium");return o.fills=[{type:"SOLID",color:p(a)}],t&&o.setRangeHyperlink(0,n.length,t),e.appendChild(o),e}function $(n,i){const t=figma.createFrame();t.layoutMode="VERTICAL",t.counterAxisSizingMode="FIXED",t.primaryAxisSizingMode="AUTO",t.resize(i,100),t.itemSpacing=10,t.paddingTop=16,t.paddingBottom=16,t.paddingLeft=16,t.paddingRight=16,t.cornerRadius=18,t.strokes=[{type:"SOLID",color:p("#E5E7EB")}],t.strokeWeight=1,t.fills=[{type:"SOLID",color:p("#FFFFFF")}];const e=figma.createFrame();e.layoutMode="HORIZONTAL",e.counterAxisSizingMode="AUTO",e.primaryAxisSizingMode="AUTO",e.itemSpacing=8,e.fills=[];const o=n.severity==="High"?"#FEE2E2":n.severity==="Medium"?"#FEF3C7":"#DCFCE7";if(e.appendChild(L(n.severity,o)),e.appendChild(L(n.category,"#F3F4F6")),t.appendChild(e),n.element){const s=m("Element: "+n.element,11,"Medium");s.fills=[{type:"SOLID",color:p("#9CA3AF")}],t.appendChild(s),v(s)}const l=m(n.id+". "+n.title,16,"Bold");t.appendChild(l),v(l);const u=m(n.description||"A visual difference was detected in this area.",13,"Regular");if(u.fills=[{type:"SOLID",color:p("#374151")}],t.appendChild(u),v(u),n.recommendation){const s=m("Fix",11,"Bold");s.fills=[{type:"SOLID",color:p("#6B7280")}],t.appendChild(s),v(s);const r=m(n.recommendation,13,"Regular");r.fills=[{type:"SOLID",color:p("#111827")}],t.appendChild(r),v(r)}return t.layoutSizingVertical="HUG",t}const G={High:{badge:"#EF4444",boxFill:"#FEE2E2",boxStroke:"#EF4444"},Medium:{badge:"#F59E0B",boxFill:"#FEF3C7",boxStroke:"#F59E0B"},Low:{badge:"#10B981",boxFill:"#DCFCE7",boxStroke:"#10B981"}},U=24;function rn(n,i,a){var l;const t=(l=G[n.severity])!=null?l:G.Low,e=figma.createFrame();e.layoutMode="HORIZONTAL",e.primaryAxisAlignItems="CENTER",e.counterAxisAlignItems="CENTER",e.primaryAxisSizingMode="FIXED",e.counterAxisSizingMode="FIXED",e.resize(U,U),e.cornerRadius=999,e.fills=[{type:"SOLID",color:p(t.badge)}],e.strokes=[{type:"SOLID",color:p("#FFFFFF")}],e.strokeWeight=2,e.x=i-U/2,e.y=a-U/2;const o=m(String(n.id),10,"Bold");return o.fills=[{type:"SOLID",color:p("#FFFFFF")}],o.textAlignHorizontal="CENTER",e.appendChild(o),o.layoutSizingHorizontal="FILL",o.layoutSizingVertical="HUG",e}function an(n,i,a,t,e){var u;const o=(u=G[n.severity])!=null?u:G.Low,l=figma.createRectangle();return l.resize(Math.max(t,4),Math.max(e,4)),l.x=i,l.y=a,l.fills=[],l.strokes=[{type:"SOLID",color:p(o.boxStroke)}],l.strokeWeight=1.5,l.dashPattern=[6,4],l.strokeAlign="INSIDE",l}function ln(n,i){for(let a=0;a<40;a++){let t=!1;for(let e=0;e<n.length;e++)for(let o=e+1;o<n.length;o++){const l=n[o].x-n[e].x,u=n[o].y-n[e].y,s=Math.sqrt(l*l+u*u);if(s<i&&s>.001){const r=(i-s)*.55,d=l/s,f=u/s;n[e].x-=d*r*.5,n[e].y-=f*r*.5,n[o].x+=d*r*.5,n[o].y+=f*r*.5,t=!0}}if(!t)break}}function cn(n,i,a,t,e,o){const l=U,u=n.filter(g=>g.normBounds),s=[];u.forEach((g,b)=>{const y=g.normBounds,M=Math.max(0,Math.min(1,y.x)),I=Math.max(0,Math.min(1,y.y)),w=Math.max(0,Math.min(1-M,y.width)),h=Math.max(0,Math.min(1-I,y.height)),T=e+M*a,C=o+I*t,c=w*a,B=h*t;i.appendChild(an(g,T,C,c,B));const S=b%3*12;s.push({x:T+l/2+S,y:C-l/2+S})}),ln(s,l+4);const r=l/2,d=i.width,f=i.height;u.forEach((g,b)=>{const y=Math.max(r,Math.min(d-r,s[b].x)),M=Math.max(r,Math.min(f-r,s[b].y));i.appendChild(rn(g,y,M))})}async function dn(n){await sn();let i=figma.root.children.find(c=>c.type==="PAGE"&&c.name==="UI Audit");i||(i=figma.createPage(),i.name="UI Audit"),figma.currentPage=i;const a=824,t=a-80,e=figma.createFrame();e.name=`Audit — ${n.artboardName} — ${new Date().toLocaleTimeString()}`,e.layoutMode="VERTICAL",e.counterAxisSizingMode="FIXED",e.primaryAxisSizingMode="AUTO",e.resize(a,100),e.itemSpacing=32,e.paddingTop=40,e.paddingBottom=60,e.paddingLeft=40,e.paddingRight=40,e.fills=[{type:"SOLID",color:p("#F9FAFB")}],i.appendChild(e);const o=figma.createFrame();o.layoutMode="VERTICAL",o.counterAxisSizingMode="FIXED",o.primaryAxisSizingMode="AUTO",o.resize(t,10),o.itemSpacing=6,o.fills=[];const l=m("UI Audit — "+n.artboardName,28,"Bold");o.appendChild(l),v(l);const u=[n.provider,n.model].filter(Boolean).join(" · "),s=m("AI-powered implementation audit"+(u?" · "+u:""),13,"Regular");s.fills=[{type:"SOLID",color:p("#6B7280")}],o.appendChild(s),v(s);const r=m("Plugin created by Amr Fakhri - amrfakhri.com",12,"Regular");r.fills=[{type:"SOLID",color:p("#9CA3AF")}],o.appendChild(r),v(r),o.layoutSizingVertical="HUG",e.appendChild(o);const d=figma.createFrame();d.layoutMode="HORIZONTAL",d.counterAxisSizingMode="AUTO",d.primaryAxisSizingMode="AUTO",d.itemSpacing=24,d.fills=[];const f=n.screenshotWidth||n.metadata.width,g=n.screenshotHeight||n.metadata.height,b=Math.min(Math.max(Math.round(360/Math.min(f/g,n.metadata.width/n.metadata.height)),300),900);function y(c,B,S,z,j,K,J){const k=figma.createFrame();k.layoutMode="VERTICAL",k.counterAxisSizingMode="AUTO",k.primaryAxisSizingMode="AUTO",k.itemSpacing=10,k.fills=[];const D=L(c,B,S,J),x=figma.createFrame();x.resize(360,b),x.cornerRadius=20,x.clipsContent=!0,x.layoutMode="NONE",x.fills=[{type:"SOLID",color:p("#FFFFFF")}],x.strokes=[{type:"SOLID",color:p("#E5E7EB")}],x.strokeWeight=1;const Y=figma.createImage(new Uint8Array(z)),O=figma.createRectangle(),N=360,P=b,H=j/K,q=N/P;let R=N,F=P,W=0,_=0;H>q?(F=N/H,_=(P-F)/2):(R=P*H,W=(N-R)/2),O.resize(R,F),O.x=W,O.y=_,O.fills=[{type:"IMAGE",scaleMode:"FILL",imageHash:Y.hash}],x.appendChild(O);const A=figma.createFrame();A.resize(360,b),A.layoutMode="NONE",A.fills=[],A.strokes=[],A.clipsContent=!1;const E=figma.createFrame();return E.layoutMode="NONE",E.resize(360,b+34),E.fills=[],E.strokes=[],E.clipsContent=!1,D.x=(360-D.width)/2,D.y=0,x.x=0,x.y=34,A.x=0,A.y=34,E.appendChild(D),E.appendChild(x),E.appendChild(A),k.appendChild(E),{col:k,overlayFrame:A,renderedWidth:R,renderedHeight:F,offsetX:W,offsetY:_}}const M=y("Source Design (Figma)","#DBEAFE","#1D4ED8",n.designBytes,n.metadata.width,n.metadata.height,n.metadata.sourceNodeId?{type:"NODE",value:n.metadata.sourceNodeId}:n.metadata.sourceNodeUrl?{type:"URL",value:n.metadata.sourceNodeUrl}:void 0),I=y("Built Implementation","#DCFCE7","#166534",n.screenshotBytes,f,g);d.appendChild(M.col),d.appendChild(I.col),e.appendChild(d),cn(n.uiIssues,I.overlayFrame,I.renderedWidth,I.renderedHeight,I.offsetX,I.offsetY);const w=figma.createFrame();w.layoutMode="HORIZONTAL",w.counterAxisSizingMode="AUTO",w.primaryAxisSizingMode="AUTO",w.itemSpacing=10,w.fills=[],w.appendChild(L(`${n.uiIssues.length} UI findings`,"#E5E7EB")),n.includeUX&&w.appendChild(L(`${n.uxInsights.length} UX insights`,"#DBEAFE","#1D4ED8")),e.appendChild(w);const h=figma.createFrame();h.layoutMode="VERTICAL",h.counterAxisSizingMode="FIXED",h.primaryAxisSizingMode="AUTO",h.layoutSizingVertical="HUG",h.resize(t,100),h.itemSpacing=14,h.fills=[];const T=m("UI Implementation Issues",20,"Bold");h.appendChild(T),v(T);const C=m(n.uiIssues.length?n.uiIssues.length+" issue(s) found in the design-to-build comparison.":"No UI implementation issues were detected.",13,"Regular");if(C.fills=[{type:"SOLID",color:p("#6B7280")}],h.appendChild(C),v(C),n.uiIssues.forEach(c=>h.appendChild($(c,t))),e.appendChild(h),n.includeUX){const c=figma.createFrame();c.layoutMode="VERTICAL",c.counterAxisSizingMode="FIXED",c.primaryAxisSizingMode="AUTO",c.layoutSizingVertical="HUG",c.resize(t,100),c.itemSpacing=14,c.fills=[];const B=m("UX Review Insights",20,"Bold");c.appendChild(B),v(B);const S=m(n.uxInsights.length?n.uxInsights.length+" UX insight(s) from the review.":"No UX insights were returned.",13,"Regular");S.fills=[{type:"SOLID",color:p("#6B7280")}],c.appendChild(S),v(S),n.uxInsights.forEach(z=>c.appendChild($(z,t))),e.appendChild(c)}e.x=80,e.y=i.children.length>1?Math.max(...i.children.filter(c=>"y"in c).map(c=>c.y+("height"in c?c.height:0)))+120:80,figma.viewport.scrollAndZoomIntoView([e])}figma.ui.onmessage=async n=>{n.type==="request-design-source"&&await on(),n.type==="create-audit-board"&&await dn(n.payload),n.type==="close-plugin"&&figma.closePlugin()};
