import uiHtml from '../ui.html?raw';

figma.showUI(uiHtml, { width: 460, height: 760 });

type Severity = 'High' | 'Medium' | 'Low';
type Category =
  /* original */
  | 'Layout'
  | 'Spacing'
  | 'Typography'
  | 'Alignment'
  | 'Component'
  | 'Visual styling'
  | 'Missing / extra element'
  | 'UX'
  /* added by improved prompt */
  | 'Colour'
  | 'Sizing'
  | 'Border radius'
  | 'Missing element'
  | 'Extra element'
  | 'Elevation'
  | 'Hierarchy'
  | 'Readability'
  | 'Interaction'
  | 'Accessibility'
  | 'Flow';

type AuditIssue = {
  id: number;
  element?: string;
  title: string;
  description: string;
  severity: Severity;
  category: Category;
  recommendation?: string;
  normBounds?: { x: number; y: number; width: number; height: number };
};

type DesignMetadata = {
  artboardName: string;
  width: number;
  height: number;
  sourceNodeId?: string;
  sourceNodeUrl?: string;
};

// ─── Spec extraction ────────────────────────────────────────────────────────

function rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 0.99 ? toHex(a) : ''}`;
}

function getFillHex(fills: readonly Paint[]): string | null {
  for (const fill of fills) {
    if (fill.type === 'SOLID' && fill.visible !== false) {
      const { r, g, b } = fill.color;
      const a = (fill as SolidPaint).opacity !== undefined ? (fill as SolidPaint).opacity : 1;
      return rgbaToHex(r, g, b, a);
    }
  }
  return null;
}

function collectSpecs(
  node: SceneNode,
  lines: string[],
  depth: number,
  counter: { text: number; frame: number }
): void {
  if (depth > 4) return;
  if (!node.visible) return;

  const w = Math.round((node as LayoutMixin).width || 0);
  const h = Math.round((node as LayoutMixin).height || 0);
  const x = Math.round((node as LayoutMixin).x || 0);
  const y = Math.round((node as LayoutMixin).y || 0);

  if (w < 6 || h < 6) return;

  if (node.type === 'TEXT' && counter.text < 50) {
    counter.text++;
    const t = node as TextNode;
    const content = t.characters.replace(/\s+/g, ' ').substring(0, 80);
    const fn = t.fontName !== figma.mixed ? t.fontName : { family: 'Mixed', style: 'Mixed' };
    const fs = t.fontSize !== figma.mixed ? t.fontSize : '?';
    const lhRaw = t.lineHeight;
    const lh = lhRaw !== figma.mixed
      ? (lhRaw.unit === 'AUTO' ? 'auto' : `${Math.round(lhRaw.value)}${lhRaw.unit === 'PERCENT' ? '%' : 'px'}`)
      : '?';
    const col = Array.isArray(t.fills) && t.fills.length > 0
      ? getFillHex(t.fills as Paint[]) : null;
    lines.push(
      `TEXT "${content}" — ${fn.family} ${fn.style} ${fs}px lh:${lh}${col ? ` ${col}` : ''} at(${x},${y}) ${w}×${h}px`
    );
  } else if (
    (node.type === 'FRAME' || node.type === 'RECTANGLE' || node.type === 'COMPONENT' || node.type === 'INSTANCE') &&
    counter.frame < 40
  ) {
    counter.frame++;
    const parts: string[] = [`${w}×${h}px`, `at(${x},${y})`];

    if ('fills' in node && node.fills !== figma.mixed && Array.isArray(node.fills) && node.fills.length > 0) {
      const c = getFillHex(node.fills as Paint[]);
      if (c) parts.push(`fill:${c}`);
    }
    if ('cornerRadius' in node) {
      const cr = (node as FrameNode).cornerRadius;
      if (typeof cr === 'number' && cr > 0) parts.push(`radius:${cr}px`);
    }
    if ('paddingTop' in node) {
      const f = node as FrameNode;
      if (f.paddingTop > 0 || f.paddingLeft > 0 || f.paddingRight > 0 || f.paddingBottom > 0) {
        parts.push(`padding:${f.paddingTop}/${f.paddingRight}/${f.paddingBottom}/${f.paddingLeft}px`);
      }
      if (f.itemSpacing > 0) parts.push(`gap:${f.itemSpacing}px`);
      if (f.layoutMode && f.layoutMode !== 'NONE') parts.push(`layout:${f.layoutMode}`);
    }
    if ('strokes' in node && Array.isArray(node.strokes) && node.strokes.length > 0) {
      const solidStrokes = (node.strokes as Paint[]).filter((s): s is SolidPaint => s.type === 'SOLID');
      if (solidStrokes.length > 0) {
        const sw = 'strokeWeight' in node && typeof (node as GeometryMixin).strokeWeight === 'number'
          ? String((node as GeometryMixin).strokeWeight) : '1';
        const sc = getFillHex(solidStrokes);
        if (sc) parts.push(`stroke:${sc} ${sw}px`);
      }
    }
    if ('effects' in node && Array.isArray(node.effects) && node.effects.length > 0) {
      const hasShadow = (node.effects as Effect[]).some(
        (e) => (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.visible !== false
      );
      if (hasShadow) parts.push('has-shadow');
    }
    if ('opacity' in node && typeof node.opacity === 'number' && node.opacity < 1) {
      parts.push(`opacity:${Math.round(node.opacity * 100)}%`);
    }

    lines.push(`LAYER "${node.name}" — ${parts.join(' ')}`);
  }

  if ('children' in node) {
    for (const child of (node as ChildrenMixin).children) {
      collectSpecs(child, lines, depth + 1, counter);
    }
  }
}

function buildDesignSpecs(node: SceneNode): string {
  const w = Math.round((node as LayoutMixin).width || 0);
  const h = Math.round((node as LayoutMixin).height || 0);
  const lines: string[] = [`Artboard: "${node.name}" ${w}x${h}px`, ''];
  const counter = { text: 0, frame: 0 };
  collectSpecs(node, lines, 0, counter);
  const result = lines.join('\n');
  return result.length > 6000 ? result.substring(0, 6000) + '\n[specs truncated]' : result;
}

// ─── Plugin core ─────────────────────────────────────────────────────────────

function isSupportedSourceNode(
  node: SceneNode
): node is FrameNode | ComponentNode | InstanceNode | SectionNode {
  return (
    node.type === 'FRAME' ||
    node.type === 'COMPONENT' ||
    node.type === 'INSTANCE' ||
    node.type === 'SECTION'
  );
}

function getNodeUrl(node: SceneNode): string | undefined {
  if (!figma.fileKey) return undefined;
  return `https://www.figma.com/design/${figma.fileKey}?node-id=${encodeURIComponent(node.id)}`;
}

async function getSelectedDesignSource() {
  const selection = figma.currentPage.selection;

  if (selection.length !== 1 || !isSupportedSourceNode(selection[0])) {
    figma.ui.postMessage({
      type: 'selection-error',
      message: 'Select exactly one artboard, frame, component, or section.',
    });
    return;
  }

  const node = selection[0];

  const bytes = await node.exportAsync({
    format: 'PNG',
    constraint: { type: 'SCALE', value: 2 },
  });

  const specs = buildDesignSpecs(node as SceneNode);

  const metadata: DesignMetadata = {
    artboardName: node.name,
    width: node.width,
    height: node.height,
    sourceNodeId: node.id,
    sourceNodeUrl: getNodeUrl(node),
  };

  figma.ui.postMessage({
    type: 'design-source-ready',
    payload: {
      name: node.name,
      width: node.width,
      height: node.height,
      sourceNodeId: node.id,
      sourceNodeUrl: metadata.sourceNodeUrl,
      bytes: Array.from(bytes),
      metadata,
      specs,
    },
  });
}

async function ensureFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

// ─── Text helper ─────────────────────────────────────────────────────────────

function makeText(
  content: string,
  size = 14,
  weight: 'Regular' | 'Medium' | 'Bold' = 'Regular'
) {
  const t = figma.createText();
  t.fontName = { family: 'Inter', style: weight };
  t.characters = content;
  t.fontSize = size;
  t.fills = [{ type: 'SOLID', color: hexToRgb('#111827') }];
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  return t;
}

// Call AFTER appendChild so the node is inside an auto-layout parent.
// Sets FILL (stretch to parent width) and HUG (height wraps content).
function pinTextToParentWidth(t: TextNode) {
  t.layoutSizingHorizontal = 'FILL';
  t.layoutSizingVertical = 'HUG';
  t.textAutoResize = 'HEIGHT';
}

function makePill(
  text: string,
  bg: string,
  textColor = '#111827',
  hyperlink?: HyperlinkTarget
) {
  const pill = figma.createFrame();
  pill.layoutMode = 'HORIZONTAL';
  pill.counterAxisSizingMode = 'AUTO';
  pill.primaryAxisSizingMode = 'AUTO';
  pill.paddingTop = 6;
  pill.paddingBottom = 6;
  pill.paddingLeft = 10;
  pill.paddingRight = 10;
  pill.cornerRadius = 999;
  pill.fills = [{ type: 'SOLID', color: hexToRgb(bg) }];

  const label = makeText(text, 12, 'Medium');
  label.fills = [{ type: 'SOLID', color: hexToRgb(textColor) }];
  if (hyperlink) {
    label.setRangeHyperlink(0, text.length, hyperlink);
  }
  pill.appendChild(label);
  return pill;
}

function makeIssueCard(issue: AuditIssue, cardWidth: number) {
  const CARD_PADDING = 16;

  const card = figma.createFrame();
  card.layoutMode = 'VERTICAL';
  card.counterAxisSizingMode = 'FIXED';
  card.primaryAxisSizingMode = 'AUTO';
  card.resize(cardWidth, 100);
  card.itemSpacing = 10;
  card.paddingTop = CARD_PADDING;
  card.paddingBottom = CARD_PADDING;
  card.paddingLeft = CARD_PADDING;
  card.paddingRight = CARD_PADDING;
  card.cornerRadius = 18;
  card.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  card.strokeWeight = 1;
  card.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];

  // ── Pills row ────────────────────────────────────────────────────────────
  const top = figma.createFrame();
  top.layoutMode = 'HORIZONTAL';
  top.counterAxisSizingMode = 'AUTO';
  top.primaryAxisSizingMode = 'AUTO';
  top.itemSpacing = 8;
  top.fills = [];
  const sevBg = issue.severity === 'High' ? '#FEE2E2' : issue.severity === 'Medium' ? '#FEF3C7' : '#DCFCE7';
  top.appendChild(makePill(issue.severity, sevBg));
  top.appendChild(makePill(issue.category, '#F3F4F6'));
  card.appendChild(top);

  // ── Element label ────────────────────────────────────────────────────────
  if (issue.element) {
    const elLabel = makeText('Element: ' + issue.element, 11, 'Medium');
    elLabel.fills = [{ type: 'SOLID', color: hexToRgb('#9CA3AF') }];
    card.appendChild(elLabel);
    pinTextToParentWidth(elLabel);
  }

  // ── Title ────────────────────────────────────────────────────────────────
  const title = makeText(issue.id + '. ' + issue.title, 16, 'Bold');
  card.appendChild(title);
  pinTextToParentWidth(title);

  // ── Description ──────────────────────────────────────────────────────────
  const body = makeText(issue.description || 'A visual difference was detected in this area.', 13, 'Regular');
  body.fills = [{ type: 'SOLID', color: hexToRgb('#374151') }];
  card.appendChild(body);
  pinTextToParentWidth(body);

  // ── Recommendation ───────────────────────────────────────────────────────
  if (issue.recommendation) {
    const recLabel = makeText('Fix', 11, 'Bold');
    recLabel.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
    card.appendChild(recLabel);
    pinTextToParentWidth(recLabel);

    const rec = makeText(issue.recommendation, 13, 'Regular');
    rec.fills = [{ type: 'SOLID', color: hexToRgb('#111827') }];
    card.appendChild(rec);
    pinTextToParentWidth(rec);
  }

  // Set HUG vertical on card after all children are appended
  card.layoutSizingVertical = 'HUG';

  return card;
}

// ─── Annotation system ───────────────────────────────────────────────────────

const SEV_COLORS = {
  High:   { badge: '#EF4444', boxFill: '#FEE2E2', boxStroke: '#EF4444' },
  Medium: { badge: '#F59E0B', boxFill: '#FEF3C7', boxStroke: '#F59E0B' },
  Low:    { badge: '#10B981', boxFill: '#DCFCE7', boxStroke: '#10B981' },
} as const;

const BADGE_DIAMETER = 24;

// Numbered circle badge, severity-coloured with white stroke ring.
function makeAnnotationBadge(issue: AuditIssue, cx: number, cy: number): FrameNode {
  const colors = SEV_COLORS[issue.severity] ?? SEV_COLORS['Low'];
  const badge = figma.createFrame();
  badge.layoutMode = 'HORIZONTAL';
  badge.primaryAxisAlignItems = 'CENTER';
  badge.counterAxisAlignItems = 'CENTER';
  badge.primaryAxisSizingMode = 'FIXED';
  badge.counterAxisSizingMode = 'FIXED';
  badge.resize(BADGE_DIAMETER, BADGE_DIAMETER);
  badge.cornerRadius = 999;
  badge.fills = [{ type: 'SOLID', color: hexToRgb(colors.badge) }];
  badge.strokes = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  badge.strokeWeight = 2;
  badge.x = cx - BADGE_DIAMETER / 2;
  badge.y = cy - BADGE_DIAMETER / 2;

  const num = makeText(String(issue.id), 10, 'Bold');
  num.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  num.textAlignHorizontal = 'CENTER';
  badge.appendChild(num);
  num.layoutSizingHorizontal = 'FILL';
  num.layoutSizingVertical = 'HUG';
  return badge;
}

// Dashed bounding-box rectangle highlighting the issue region.
function makeAnnotationBox(issue: AuditIssue, bx: number, by: number, bw: number, bh: number): RectangleNode {
  const colors = SEV_COLORS[issue.severity] ?? SEV_COLORS['Low'];
  const box = figma.createRectangle();
  box.resize(Math.max(bw, 4), Math.max(bh, 4));
  box.x = bx;
  box.y = by;
  box.fills = [];
  box.strokes = [{ type: 'SOLID', color: hexToRgb(colors.boxStroke) }];
  box.strokeWeight = 1.5;
  box.dashPattern = [6, 4];
  box.strokeAlign = 'INSIDE';
  return box;
}

// Iterative force-directed push-apart — mutates the centers array in place.
function resolveCollisions(centers: Array<{ x: number; y: number }>, minDist: number): void {
  for (let iter = 0; iter < 40; iter++) {
    let moved = false;
    for (let i = 0; i < centers.length; i++) {
      for (let j = i + 1; j < centers.length; j++) {
        const dx = centers[j].x - centers[i].x;
        const dy = centers[j].y - centers[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist && dist > 0.001) {
          const overlap = (minDist - dist) * 0.55;
          const nx = dx / dist;
          const ny = dy / dist;
          centers[i].x -= nx * overlap * 0.5;
          centers[i].y -= ny * overlap * 0.5;
          centers[j].x += nx * overlap * 0.5;
          centers[j].y += ny * overlap * 0.5;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
}

// 3-pass: draw boxes → resolve badge collisions → clamp + draw badges.
function placeAnnotations(
  issues: AuditIssue[],
  overlay: FrameNode,
  renderedWidth: number,
  renderedHeight: number,
  offsetX: number,
  offsetY: number
): void {
  const BD = BADGE_DIAMETER;
  const issuesWithBounds = issues.filter((iss) => iss.normBounds);

  // Pass 1 — draw bounding boxes and collect desired badge positions.
  const centers: Array<{ x: number; y: number }> = [];
  issuesWithBounds.forEach((issue, index) => {
    const nb = issue.normBounds!;
    // Clamp raw normBounds to [0,1] — AI can occasionally return out-of-range values.
    const nx = Math.max(0, Math.min(1, nb.x));
    const ny = Math.max(0, Math.min(1, nb.y));
    const nw = Math.max(0, Math.min(1 - nx, nb.width));
    const nh = Math.max(0, Math.min(1 - ny, nb.height));

    const bx = offsetX + nx * renderedWidth;
    const by = offsetY + ny * renderedHeight;
    const bw = nw * renderedWidth;
    const bh = nh * renderedHeight;
    overlay.appendChild(makeAnnotationBox(issue, bx, by, bw, bh));

    // Stagger initial badge targets by index so the force-directed pass
    // starts from a more spread-out state and converges faster.
    const stagger = (index % 3) * 12;
    centers.push({ x: bx + BD / 2 + stagger, y: by - BD / 2 + stagger });
  });

  // Pass 2 — push overlapping badges apart.
  resolveCollisions(centers, BD + 4);

  // Pass 3 — clamp to overlay bounds and draw badges.
  const half = BD / 2;
  const overlayW = overlay.width;
  const overlayH = overlay.height;
  issuesWithBounds.forEach((issue, i) => {
    const cx = Math.max(half, Math.min(overlayW - half, centers[i].x));
    const cy = Math.max(half, Math.min(overlayH - half, centers[i].y));
    overlay.appendChild(makeAnnotationBadge(issue, cx, cy));
  });
}

async function createAuditBoard(payload: {
  artboardName: string;
  designBytes: number[];
  screenshotBytes: number[];
  screenshotWidth?: number;
  screenshotHeight?: number;
  metadata: DesignMetadata;
  uiIssues: AuditIssue[];
  uxInsights: AuditIssue[];
  provider?: string;
  model?: string;
  includeUX?: boolean;
}) {
  await ensureFonts();

  let page = figma.root.children.find(
    (p) => p.type === 'PAGE' && p.name === 'UI Audit'
  ) as PageNode | undefined;

  if (!page) {
    page = figma.createPage();
    page.name = 'UI Audit';
  }

  figma.currentPage = page;

  // Fixed width: 40 padding + 360 col + 24 gap + 360 col + 40 padding = 824
  const BOARD_WIDTH = 824;
  const CONTENT_WIDTH = BOARD_WIDTH - 80; // 744 — board padding 40 each side

  const board = figma.createFrame();
  board.name = `Audit — ${payload.artboardName} — ${new Date().toLocaleTimeString()}`;
  board.layoutMode = 'VERTICAL';
  board.counterAxisSizingMode = 'FIXED';
  board.primaryAxisSizingMode = 'AUTO';
  board.resize(BOARD_WIDTH, 100);
  board.itemSpacing = 32;
  board.paddingTop = 40;
  board.paddingBottom = 60;
  board.paddingLeft = 40;
  board.paddingRight = 40;
  board.fills = [{ type: 'SOLID', color: hexToRgb('#F9FAFB') }];
  page.appendChild(board);

  // ── Header ───────────────────────────────────────────────────────────────
  const header = figma.createFrame();
  header.layoutMode = 'VERTICAL';
  header.counterAxisSizingMode = 'FIXED';
  header.primaryAxisSizingMode = 'AUTO';
  header.resize(CONTENT_WIDTH, 10);
  header.itemSpacing = 6;
  header.fills = [];

  const headerTitle = makeText('UI Audit — ' + payload.artboardName, 28, 'Bold');
  header.appendChild(headerTitle);
  pinTextToParentWidth(headerTitle);

  const providerModel = [payload.provider, payload.model].filter(Boolean).join(' · ');
  const headerSub = makeText(
    'AI-powered implementation audit' + (providerModel ? ' · ' + providerModel : ''),
    13,
    'Regular'
  );
  headerSub.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
  header.appendChild(headerSub);
  pinTextToParentWidth(headerSub);

  const headerByline = makeText(
    'Plugin created by Amr Fakhri - amrfakhri.com',
    12,
    'Regular'
  );
  headerByline.fills = [{ type: 'SOLID', color: hexToRgb('#9CA3AF') }];
  header.appendChild(headerByline);
  pinTextToParentWidth(headerByline);

  header.layoutSizingVertical = 'HUG';
  board.appendChild(header);

  // ── Compare row ──────────────────────────────────────────────────────────
  const compareRow = figma.createFrame();
  compareRow.layoutMode = 'HORIZONTAL';
  compareRow.counterAxisSizingMode = 'AUTO';
  compareRow.primaryAxisSizingMode = 'AUTO';
  compareRow.itemSpacing = 24;
  compareRow.fills = [];

  const shotSrcWidth = payload.screenshotWidth || payload.metadata.width;
  const shotSrcHeight = payload.screenshotHeight || payload.metadata.height;
  const PREVIEW_H = Math.min(
    Math.max(Math.round(360 / Math.min(shotSrcWidth / shotSrcHeight, payload.metadata.width / payload.metadata.height)), 300),
    900
  );

  function makePreviewColumn(
    label: string,
    labelBg: string,
    labelTextColor: string,
    bytes: number[],
    originalWidth: number,
    originalHeight: number,
    labelLink?: HyperlinkTarget
  ) {
    const col = figma.createFrame();
    col.layoutMode = 'VERTICAL';
    col.counterAxisSizingMode = 'AUTO';
    col.primaryAxisSizingMode = 'AUTO';
    col.itemSpacing = 10;
    col.fills = [];

    const labelPill = makePill(label, labelBg, labelTextColor, labelLink);

    const imageFrame = figma.createFrame();
    imageFrame.resize(360, PREVIEW_H);
    imageFrame.cornerRadius = 20;
    imageFrame.clipsContent = true;
    imageFrame.layoutMode = 'NONE';
    imageFrame.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
    imageFrame.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
    imageFrame.strokeWeight = 1;

    const image = figma.createImage(new Uint8Array(bytes));
    const imageRect = figma.createRectangle();

    const previewWidth = 360;
    const previewHeight = PREVIEW_H;
    const imageAspect = originalWidth / originalHeight;
    const previewAspect = previewWidth / previewHeight;

    let renderedWidth = previewWidth;
    let renderedHeight = previewHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imageAspect > previewAspect) {
      renderedHeight = previewWidth / imageAspect;
      offsetY = (previewHeight - renderedHeight) / 2;
    } else {
      renderedWidth = previewHeight * imageAspect;
      offsetX = (previewWidth - renderedWidth) / 2;
    }

    imageRect.resize(renderedWidth, renderedHeight);
    imageRect.x = offsetX;
    imageRect.y = offsetY;
    imageRect.fills = [
      {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: image.hash,
      },
    ];

    imageFrame.appendChild(imageRect);

    // overlayFrame sits on top of imageFrame, same size, no clip — annotations go here
    const overlayFrame = figma.createFrame();
    overlayFrame.resize(360, PREVIEW_H);
    overlayFrame.layoutMode = 'NONE';
    overlayFrame.fills = [];
    overlayFrame.strokes = [];
    overlayFrame.clipsContent = false;

    // wrapper holds status pill + image + overlay stacked; overlay is absolute over image
    const wrapper = figma.createFrame();
    wrapper.layoutMode = 'NONE';
    wrapper.resize(360, PREVIEW_H + 34); // extra space for centered status pill
    wrapper.fills = [];
    wrapper.strokes = [];
    wrapper.clipsContent = false;

    // position status pill at top center
    labelPill.x = (360 - labelPill.width) / 2;
    labelPill.y = 0;
    imageFrame.x = 0;
    imageFrame.y = 34;
    overlayFrame.x = 0;
    overlayFrame.y = 34;

    wrapper.appendChild(labelPill);
    wrapper.appendChild(imageFrame);
    wrapper.appendChild(overlayFrame);
    col.appendChild(wrapper);

    return { col, overlayFrame, renderedWidth, renderedHeight, offsetX, offsetY };
  }

  const designCol = makePreviewColumn(
    'Source Design (Figma)',
    '#DBEAFE',
    '#1D4ED8',
    payload.designBytes,
    payload.metadata.width,
    payload.metadata.height,
    payload.metadata.sourceNodeId
      ? { type: 'NODE', value: payload.metadata.sourceNodeId }
      : payload.metadata.sourceNodeUrl
        ? { type: 'URL', value: payload.metadata.sourceNodeUrl }
        : undefined
  );

  const screenshotCol = makePreviewColumn(
    'Built Implementation',
    '#DCFCE7',
    '#166534',
    payload.screenshotBytes,
    shotSrcWidth,
    shotSrcHeight
  );

  compareRow.appendChild(designCol.col);
  compareRow.appendChild(screenshotCol.col);
  board.appendChild(compareRow);

  // ── Annotations — bounding boxes + collision-resolved numbered badges
  placeAnnotations(
    payload.uiIssues,
    screenshotCol.overlayFrame,
    screenshotCol.renderedWidth,
    screenshotCol.renderedHeight,
    screenshotCol.offsetX,
    screenshotCol.offsetY
  );

  // ── Summary pills ────────────────────────────────────────────────────────
  const summaryRow = figma.createFrame();
  summaryRow.layoutMode = 'HORIZONTAL';
  summaryRow.counterAxisSizingMode = 'AUTO';
  summaryRow.primaryAxisSizingMode = 'AUTO';
  summaryRow.itemSpacing = 10;
  summaryRow.fills = [];
  summaryRow.appendChild(makePill(`${payload.uiIssues.length} UI findings`, '#E5E7EB'));
  if (payload.includeUX) {
    summaryRow.appendChild(makePill(`${payload.uxInsights.length} UX insights`, '#DBEAFE', '#1D4ED8'));
  }
  board.appendChild(summaryRow);

  // ── UI issues section ────────────────────────────────────────────────────
  const uiSection = figma.createFrame();
  uiSection.layoutMode = 'VERTICAL';
  uiSection.counterAxisSizingMode = 'FIXED';
  uiSection.primaryAxisSizingMode = 'AUTO';
  uiSection.layoutSizingVertical = 'HUG';
  uiSection.resize(CONTENT_WIDTH, 100);
  uiSection.itemSpacing = 14;
  uiSection.fills = [];

  const uiSectionTitle = makeText('UI Implementation Issues', 20, 'Bold');
  uiSection.appendChild(uiSectionTitle);
  pinTextToParentWidth(uiSectionTitle);

  const uiSectionSubtitle = makeText(
    payload.uiIssues.length
      ? payload.uiIssues.length + ' issue(s) found in the design-to-build comparison.'
      : 'No UI implementation issues were detected.',
    13,
    'Regular'
  );
  uiSectionSubtitle.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
  uiSection.appendChild(uiSectionSubtitle);
  pinTextToParentWidth(uiSectionSubtitle);
  payload.uiIssues.forEach((issue) => uiSection.appendChild(makeIssueCard(issue, CONTENT_WIDTH)));
  board.appendChild(uiSection);

  // ── UX section ───────────────────────────────────────────────────────────
  if (payload.includeUX) {
    const uxSection = figma.createFrame();
    uxSection.layoutMode = 'VERTICAL';
    uxSection.counterAxisSizingMode = 'FIXED';
    uxSection.primaryAxisSizingMode = 'AUTO';
    uxSection.layoutSizingVertical = 'HUG';
    uxSection.resize(CONTENT_WIDTH, 100);
    uxSection.itemSpacing = 14;
    uxSection.fills = [];

    const uxSectionTitle = makeText('UX Review Insights', 20, 'Bold');
    uxSection.appendChild(uxSectionTitle);
    pinTextToParentWidth(uxSectionTitle);

    const uxSectionSubtitle = makeText(
      payload.uxInsights.length
        ? payload.uxInsights.length + ' UX insight(s) from the review.'
        : 'No UX insights were returned.',
      13,
      'Regular'
    );
    uxSectionSubtitle.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
    uxSection.appendChild(uxSectionSubtitle);
    pinTextToParentWidth(uxSectionSubtitle);
    payload.uxInsights.forEach((issue) => uxSection.appendChild(makeIssueCard(issue, CONTENT_WIDTH)));
    board.appendChild(uxSection);
  }

  board.x = 80;
  board.y =
    page.children.length > 1
      ? Math.max(
          ...page.children
            .filter((n) => 'y' in n)
            .map((n) => (n as SceneNode).y + ('height' in n ? (n as LayoutMixin).height : 0))
        ) + 120
      : 80;

  figma.viewport.scrollAndZoomIntoView([board]);
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'request-design-source') {
    await getSelectedDesignSource();
  }

  if (msg.type === 'create-audit-board') {
    await createAuditBoard(msg.payload);
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};
