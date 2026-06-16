# Implementation Plan - Personal Portfolio Website

Create a modern, cinematic, and responsive personal portfolio website for Imamul Hoque Ishmam using Next.js, TypeScript, Tailwind CSS, Three.js, Lenis, Framer Motion, and GSAP, strictly following the content and structure defined in the user's portfolio README.md.

---

## User Review Required

> [!IMPORTANT]
> The portfolio is designed around a **cinematic dark theme** (using rich dark slate/charcoal tones and subtle light/shadow accents) to represent the visual storytelling, photography, and film editing focus.
> 
> Please review the following key decisions:
> 1. **Image Asset**: The hero section requires the image `imamul_Hoque_Ishmam.jpeg`. Please place this file in the `public/` directory (`c:/Users/hp/Desktop/Job Task/imamul-hoque/public/imamul_Hoque_Ishmam.jpeg`) before proceeding.
> 2. **Three.js Background Style**: A custom floating interactive particle/grain field is planned to evoke cinematic dust particles and light leaks. This runs globally behind the layout with a low performance footprint.
> 3. **Typography**: We propose using standard serif headings (e.g., Playfair Display or Outfit via Google Fonts) for cinematic aesthetics, paired with clean, geometric body text (Geist/Inter).

---

## Open Questions

> [!NOTE]
> * Would you like to add an interactive gallery or video player popup modal under the "Cinematography & Direction" or "Advanced Video Editing & Color Grading" sections to showcase actual video/photo projects?
> * Do you have preferred social media icon styling (e.g., outline, filled, or custom animated hover transitions)?

---

## Verbatim README.md Portfolio Structure
Below is the exact structure and content requested by the user, which will be integrated verbatim:

```markdown
## Personal Portfolio Website

## navbar
left side e Ishmam 
right side e Home, About, Services, Contact
mobile responsive e 3 dash line button

## hero section

### left side
name : Imamul Hoque Ishmam

name er nice short intro:
"Storyteller behind the lens – Film Director, Editor & Photographer | Transforming creative concepts into high-quality cinematic reality."

### right side
[image](imamul_Hoque_Ishmam.jpeg)

## "About me" section

The Storyteller Behind the Lens: Bringing Visions to Life

​"A great story shouldn't just be told; it should be felt." — This core belief drives my passion every time I step behind the camera.

​I am a Film Director, Video Editor, and Photographer. In simpler words, I am a visual storyteller. The world behind the lens is my canvas, where I blend reality with imagination to create impactful visual experiences.

​My journey began with capturing the ordinary world through a camera frame. That curiosity quickly evolved into a deep-rooted passion for photography. For me, freezing a moment in time, playing with light and shadow, and capturing raw human emotions is nothing short of magic.

​However, the urge to make those stories move and breathe led me into the world of film direction. As a director, my ultimate goal is to ensure that every shot resonates with the audience. From conceptualization and framing to guiding the performance, I thrive on the challenge of turning a script into a cinematic reality.

​But the true rhythm of a film is born on the editing table. This is why video editing and post-production are core pillars of my expertise. I see editing as a craft where pacing, precise cuts, advanced color grading, and meticulous sound design come together to give footage its soul. Ensuring the perfect balance of audio-visual elements and setting the right cinematic mood is my signature style.

​I believe that every project is a fresh opportunity to innovate, experiment, and push creative boundaries. Whether you want to transform a concept into a cinematic masterpiece, polish a video with high-end editing, or capture a defining moment through photography—I am here to bring that vision to life.

​Let’s collaborate and create something unforgettable!

## "Cinematography & Direction" section

Bringing scripts to life with cinematic framing and purposeful lighting. I direct narratives and camera movements to build a powerful connection with the audience.

## "Advanced Video Editing & Color Grading" section

Crafting seamless cuts and advanced color grading to define the story's mood. I transform raw footage into high-impact, professional cinematic pieces.

## "Visual Storytelling" section

Capturing raw emotions and untold narratives through films and photography. I focus on unique angles and fine details that leave a lasting impression.

## "Audio Design & Foley" section

Designing immersive soundscapes and custom Foley effects to elevate the visuals. I ensure a balanced, realistic, and cinematic audio experience.

## "Let's collaborate" section
Let's collaborate
gmail: ishmamihi777@gmail.com

## footer
Facebook: https://www.facebook.com/Imamul.Hoque.Ishmam.71
Instagram user name: ishmam_777
Twitter user name : ishmam_777

copyright text

### use technology for this portfolio
 next.js , typescript , tailwind css,twMerge, framer motion,  react icons, GSAP, lucide-react,
 lenis for Smooth Scroll, Three.js for background
```

---

## Proposed Changes

We will group the implementation into structural/styling files, standard portfolio components, and integration of specialized modules (Three.js and Lenis).

### Project Configuration & Core Styles

Establish global styling, layouts, fonts, and animation wrappers.

#### [MODIFY] [layout.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/app/layout.tsx)
- Integrate custom Google Fonts (`Outfit` or `Playfair Display` for cinematic headlines, `Geist` or `Inter` for clean text).
- Wrap the main application structure with `SmoothScroll` and render the global canvas wrapper `ThreeBackground` behind page content.

#### [MODIFY] [globals.css](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/app/globals.css)
- Add Tailwind CSS configurations, defining variables for dark cinematic colors (e.g., deep dark greys, light-leak gold accents, soft borders).
- Write custom utilities for styling custom scrollbars, glassmorphism headers, and smooth transitions.

---

### Layout Components

Components responsible for navigation, backdrop visuals, and global behaviors.

#### [NEW] [ThreeBackground.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/ThreeBackground.tsx)
- Set up a full-viewport WebGL canvas using standard Three.js.
- Create an elegant dust particle cloud animation (using `THREE.Points` and a custom shader or material) that floats gently, responding dynamically to mouse coordinates.

#### [NEW] [SmoothScroll.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/SmoothScroll.tsx)
- Create a client-side wrapper integrating Lenis for smooth scroll behavior across all devices.

#### [NEW] [Navbar.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/Navbar.tsx)
- Left side: Logo ("Ishmam") with hover effects.
- Right side: Menu links ("Home", "About", "Services", "Contact") pointing to ID sections.
- Mobile layout: Fully responsive Hamburger icon ("3-dash button" using lucide-react) showing a smooth slide-in sidebar using Framer Motion.

---

### Content Sections

Interactive and beautifully designed content sections directly displaying the portfolio info.

#### [NEW] [Hero.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/Hero.tsx)
- Left side: Elegant typographic layout presenting name "Imamul Hoque Ishmam" and the short intro sentence.
- Add primary action button ("Let's Collaborate") and secondary action button ("View Services") with GSAP/Framer Motion magnetic effects.
- Right side: Picture frame for `imamul_Hoque_Ishmam.jpeg` with tilt effect and subtle cinematic lens-flare overlay.

#### [NEW] [About.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/About.tsx)
- Display the section title: "The Storyteller Behind the Lens: Bringing Visions to Life".
- Highlight the quote statement: "A great story shouldn't just be told; it should be felt." — with a bold cinematic font style.
- Split design: Text content paragraphs on one side, and visual block decoration/photo gallery reference on the other side.
- Implement fade-in scrolling effects using Framer Motion.

#### [NEW] [Services.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/Services.tsx)
- Display grid cards representing the four key expertise sections:
  1. **Cinematography & Direction** (with a clapperboard/camera icon)
  2. **Advanced Video Editing & Color Grading** (with a sliders/cutting icon)
  3. **Visual Storytelling** (with a film/lens icon)
  4. **Audio Design & Foley** (with a volume/sound wave icon)
- Each card will have custom hover states, glowing borders, and fade-in animations on scroll.

#### [NEW] [Contact.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/Contact.tsx)
- Section "Let's collaborate".
- Highlight the email: `ishmamihi777@gmail.com` with a "Click to Copy" action or email link.
- Build a premium feedback/message form interface or direct email invite.

#### [NEW] [Footer.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/components/Footer.tsx)
- Add direct link profiles:
  - Facebook: `https://www.facebook.com/Imamul.Hoque.Ishmam.71`
  - Instagram: `@ishmam_777`
  - Twitter: `@ishmam_777`
- Display standard copyright notes at the bottom.

#### [MODIFY] [page.tsx](file:///c:/Users/hp/Desktop/Job%20Task/imamul-hoque/app/page.tsx)
- Assemble components in structural order. Include wrapper containers to manage page sections.

---

## Verification Plan

### Automated Tests
We will verify standard linting and building parameters:
- `npm run lint` - Validate that all TypeScript files comply with rules.
- `npm run build` - Ensure the Next.js production build completes without any compilation errors.

### Manual Verification
- **Visual & Design Inspection**: Ensure that the layout, fonts, colors, and responsive hamburger menu align with a premium cinematic design standard.
- **Scroll Behavior**: Confirm that Lenis smooth scroll and Framer Motion section fade-in effects operate seamlessly.
- **Three.js Check**: Ensure Three.js canvas handles resizing perfectly and doesn't conflict with main scroll content.
- **Interactive Check**: Click to copy email operates correctly, mobile hamburger opens/closes smoothly, and navbar links navigate to their corresponding sections.
