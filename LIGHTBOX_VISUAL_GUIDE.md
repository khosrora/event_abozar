# 🎬 Lightbox - تجربه بصری

## 📸 State 1: Normal (Thumbnail)

```
┌──────────────────────────────┐
│                              │
│    [Thumbnail Image]         │
│    (click to expand)         │
│                              │
└──────────────────────────────┘
```

---

## 🎯 State 2: Hover

```
┌──────────────────────────────┐
│   🌫️ BACKDROP BLUR           │
│   📸────────────────────────  │
│   |  ╔════════════════╗     │
│   |  ║ [Zoom Image]   ║     │
│   |  ║    DIMMED      ║     │
│   |  ║   🔍 ZOOM      ║     │
│   |  ║    ICON        ║     │
│   |  ║   ✨ GLOW      ║     │
│   |  ╚════════════════╝     │
│   |  [Info: Click to zoom]  │
│   |                         │
└──────────────────────────────┘

Features:
- Image brightness: 75%
- Overlay gradient: black/60
- Zoom icon with glow effect
- Pulsing animation
- Badge info shows on hover
```

---

## 🎨 State 3: Modal Open (Full Screen)

```
═══════════════════════════════════════════════════════════
║                                                         ║
║ 🌌 DARK BACKDROP (black/80) + BLUR                     ║
║                                                         ║
║    ┌──────────────────────────────────────────────┐   ║
║    │ 📷 عرض تمام‌صفحه        [❌ Close Button]   │   ║
║    ├──────────────────────────────────────────────┤   ║
║    │                                              │   ║
║    │                                              │   ║
║    │           [LARGE HIGH-RES IMAGE]            │   ║
║    │                                              │   ║
║    │            WITH SHADOW & GLOW               │   ║
║    │                                              │   ║
║    │                                              │   ║
║    ├──────────────────────────────────────────────┤   ║
║    │ 📌 عنوان تصویر: [Image Title Here]          │   ║
║    │                                              │   ║
║    │ ⌨️  Esc to close | Click outside | 💾 Save  │   ║
║    └──────────────────────────────────────────────┘   ║
║                                                         ║
═══════════════════════════════════════════════════════════

Elements:
✓ Glassmorphic header (backdrop blur)
✓ Close button with hover rotation
✓ Image with drop shadow
✓ Loading spinner (if needed)
✓ Footer with info & shortcuts
✓ Smooth animations
✓ Keyboard navigation ready
```

---

## 🎯 Hover States

### Thumbnail Hover
```
Normal Image
    ↓
Zoom 110% + Brightness 75% + Overlay
    ↓
Zoom Icon appears with glow
    ↓
Info badge shows: "برای بزرگنمایی کلیک کنید"
```

### Close Button Hover
```
Default
    ↓
Background: white/10
    ↓
Rotate 90°
    ↓
Back to default on mouse leave
```

---

## 🎬 Animations

### 1️⃣ Fade In
```
Opacity: 0 → 100%
Duration: 0.3s
Timing: ease-out
Applied to: Backdrop, overlay
```

### 2️⃣ Scale In
```
Transform: scale(0.95) → scale(1)
Opacity: 0 → 100%
Duration: 0.4s
Timing: cubic-bezier(0.34, 1.56, 0.64, 1) [Spring effect]
Applied to: Modal content
```

### 3️⃣ Pulse
```
Animation: continuous pulse
Applied to: Zoom icon
Effect: Subtle up-down breathing
```

### 4️⃣ Glow Effect
```
Glow circle:
  - Scale: 0 → 100%
  - Duration: 0.5s
  - Creates halo around zoom icon
```

---

## 💎 Design Elements

### Colors
```
Background:        black/80 (dark, transparent)
Backdrop Blur:     blur-sm, blur-md
Borders:           white/10, white/20, white/30
Buttons:           black/30 (glassmorphic)
Text:              white, white/70, white/60, white/50, white/40
Shadows:           shadow-2xl, drop-shadow-2xl
```

### Typography
```
Header:    text-white/70 (subtle)
Title:     text-white (bold)
Subtitle:  text-white/60 (info)
Hint:      text-white/40 (very subtle)
```

### Spacing
```
Modal padding:     p-4
Header spacing:    mb-4
Image padding:     p-4
Footer padding:    p-4
Borders:           pt-2, border-t
```

---

## 🎛️ Interactive Elements

### 1. Thumbnail
```
Cursor:    pointer
Hover:     scale(1.1) + brightness(0.75)
Click:     Opens modal
Keyboard:  Enter/Space to activate
```

### 2. Close Button
```
Type:      Button (icon)
Hover:     Rotate 90° + bg-white/10
Active:    Closes modal
```

### 3. Backdrop
```
Click:     Closes modal
Role:      Dismissible overlay
```

### 4. Modal Content
```
Click:     No action (stops propagation)
Keyboard:  Esc to close
```

---

## 📊 Layout Structure

```
Fixed Container (full screen)
├─ Backdrop (absolute fill)
│  └─ blur + dark color
│
└─ Modal (flex column)
   ├─ Header Row
   │  ├─ Badge (left)
   │  └─ Close Button (right)
   │
   ├─ Image Container (flex, flex-1)
   │  ├─ Loading Spinner (if needed)
   │  └─ Image (object-contain)
   │
   └─ Footer
      ├─ Title Section
      ├─ Divider
      └─ Controls Info
```

---

## 🔧 CSS Classes Breakdown

### Fixed Positioning
```css
fixed inset-0          /* Full screen coverage */
z-50                   /* Above everything */
flex items-center      /* Center vertically */
justify-center         /* Center horizontally */
```

### Backdrop Styling
```css
bg-black/80            /* Dark semi-transparent */
backdrop-blur-sm       /* Slight blur */
transition-opacity     /* Smooth fade */
duration-300           /* 0.3s transition */
```

### Modal Styling
```css
max-w-5xl              /* Max width on desktop */
max-h-[90vh]           /* Max height (90% viewport) */
rounded-2xl            /* Smooth corners */
shadow-2xl             /* Strong shadow */
bg-gradient-to-b       /* Subtle gradient */
from-black/80 to-black /* Gradient colors */
```

### Image Styling
```css
max-w-full             /* Don't overflow container */
max-h-full             /* Don't overflow container */
object-contain         /* Keep aspect ratio */
drop-shadow-2xl        /* Shadow effect */
animate-fadeIn         /* Fade in animation */
```

---

## 🎯 User Experience Flow

```
1. User sees thumbnail
   ↓
2. Hovers over thumbnail
   ↓
3. Image dims + zoom icon shows + info badge appears
   ↓
4. User clicks thumbnail
   ↓
5. Modal fades/scales in smoothly
   ↓
6. User sees large high-res image
   ↓
7. User can:
   - Close: Click X, press Esc, click outside
   - Save: Right-click on image
   - Read: View image title and info
```

---

## ✨ Polish Details

- ✅ Smooth transitions everywhere
- ✅ Keyboard shortcuts (Esc, Enter, Space)
- ✅ Loading state with spinner
- ✅ Accessibility features (ARIA, roles)
- ✅ Mobile-responsive
- ✅ Touch-friendly
- ✅ Visual feedback (hover, focus, active)
- ✅ Informative UI (badges, hints, shortcuts)
- ✅ Professional animations (spring effects)
- ✅ Beautiful color palette (white + black contrast)

---

## 📱 Responsive Behavior

### Mobile (< 768px)
```
┌───────────┐
│ 📷 عرض  ❌│
├───────────┤
│           │
│  [IMAGE]  │ (smaller max-width)
│           │
├───────────┤
│ 📌 Title  │
│ ⌨️ Info   │
└───────────┘
```

### Tablet (768px - 1024px)
```
┌────────────────────────┐
│ 📷 عرض      [❌ Close] │
├────────────────────────┤
│      [MEDIUM IMAGE]    │
├────────────────────────┤
│ 📌 Title | ⌨️ Info    │
└────────────────────────┘
```

### Desktop (> 1024px)
```
┌───────────────────────────────────────────┐
│ 📷 عرض تمام‌صفحه      [❌ Close Button]  │
├───────────────────────────────────────────┤
│          [LARGE HIGH-RES IMAGE]           │
├───────────────────────────────────────────┤
│ 📌 Title | ⌨️ Info | 💾 Save Hint        │
└───────────────────────────────────────────┘
```

---

## 🎨 Color Palette

```
Background:     #000000 (Black)
Overlay:        rgba(0,0,0,0.8) (80% Black)
Text Primary:   #FFFFFF (White)
Text Secondary: rgba(255,255,255,0.7) (White 70%)
Text Tertiary:  rgba(255,255,255,0.6) (White 60%)
Text Hint:      rgba(255,255,255,0.4) (White 40%)
Border Light:   rgba(255,255,255,0.1) (White 10%)
Border Medium:  rgba(255,255,255,0.2) (White 20%)
Border Heavy:   rgba(255,255,255,0.3) (White 30%)
Control BG:     rgba(0,0,0,0.3) (Black 30%)
Control Hover:  rgba(255,255,255,0.1) (White 10%)
```

---

نتیجه: یک تجربه کاملاً حرفه‌ای و جذاب! 🚀✨
