
# A Journey Through Changing Landscapes

#### Description:

A Journey Through Changing Landscapes is a scrollytelling experience that teaches JavaScript fundamentals through an immersive, terrain-based narrative. Instead of presenting code concepts as abstract definitions, each section of the site places the user inside a physical landscape that reflects how that concept actually feels when you first encounter it. The result is a site that is part educational tool, part interactive story, and part motion design showcase.

The site is built across nine sections: Horizon, City, Forest, Mountains, Coast, Desert, Cave, Night Sky, and Journey. Each section has its own illustration, color palette, animated elements, and written narrative that connects a real landscape to a real JavaScript concept. As you scroll, the world transforms around you. Sections transition into each other through cinematic GSAP animations. The city illustration rises from below the horizon, a mist rolls in over the forest before mountains emerge, a dust storm sweeps across the coast before the desert reveals itself, and the screen goes completely black before the cave breathes in from the darkness. The whole experience ends where it began with a sunrise, completing the full circle of the journey.

The main files are organized cleanly. `index.html` contains the full nine-section structure using a consistent four-layer system inside every section: `layer__background` for the gradient, `layer__illustration` for the terrain image, `layer__elements` for animated SVGs and characters, and `layer__content` for the text cards and code blocks. This layering system made it straightforward to control z-index and animation independently across every section.

The `styles/` folder contains three files. `variables.css` holds the full design token system including primitive colors, semantic color modes for light, dark, and OS-preference themes, typography scale, spacing scale, and font family references. `styles.css` imports the tokens and builds the full visual language of the site on top of them including section heights, gradients, card styles, layer positioning, character positioning, cloud positioning, and a complete set of responsive media queries covering mobile, tablet, small desktop, desktop, large desktop, TV at 1920px, and 4K at 3840px.

`scripts/main.js` is where all the motion lives. It registers GSAP's ScrollTrigger and ScrollSmoother plugins, creates a global ScrollSmoother instance with smooth scrolling and effects enabled, and then builds out every animation section by section. The file uses a consistent pattern where initial states are set with `gsap.set()` at the top and each section has its own clearly commented block. Pinned showpiece sections use `gsap.timeline()` with `pin: true` inside a ScrollTrigger so the section locks in place while a full animation sequence plays out on scroll. The horizon is the main showpiece pin where the sun rises on load and as you scroll the clouds drift outward, the sun sets, the sky darkens, and the content block fades in before the section releases into the city. The forest has its own pin where Bigfoot walks across the screen and disappears. The coast pins for the airplane sequence. The desert pins for the compass and cacti reveal. The night sky and journey share a single dramatic pinned transition where the same cliff and character stay locked in place while the entire sky transforms from night to dawn around them.

The theme toggle in the top right corner lets users switch between Dark, Light, and OS Theme modes. The selected mode is saved to `localStorage` so it persists across page reloads. The `prefers-reduced-motion` media query is respected throughout and all GSAP animations are wrapped in a check so users who prefer reduced motion see the full content without any motion.

Key design choices came from wanting every element to feel intentional. The Tanker typeface was chosen for its bold display character that commands attention on large screens and TV presentations. Satoshi was chosen for body text for its clean, modern readability. The card system uses floating white rounded rectangles with subtle shadows to create a consistent visual language that sits on top of every illustration without competing with it. The left and right alternating card positions create a natural reading rhythm as you scroll through each section.

#### Links
Live site: [your GitHub Pages URL here]
Repo: [your repo URL here]

#### Tech Stack
HTML, CSS, JavaScript, GSAP, ScrollTrigger, ScrollSmoother

#### Reflection

**Metaphor summary:**
The site uses a journey through eight terrains as a metaphor for learning JavaScript. Each landscape reflects how a concept actually feels when you first encounter it. The city is overwhelming and chaotic just like staring at JavaScript for the first time. The forest gets quieter and more navigable once you learn to name things with variables. The mountains force you to make decisions just like conditionals. The coast listens and responds just like event listeners. The desert has universal rules baked into it like design tokens. The cave remembers everything just like localStorage. The night sky is where you look back and see how far you have come. And the journey is where it all connects.

**One section I'm most proud of:**
The city and coast sections are the ones I am most proud of. The city came together with the traffic light cycling, humans walking at different speeds, and the cinematic transition from the horizon. The coast felt the most complete as a full scene with the sun rising and setting, waves animating, airplanes flying across in formation during the pinned sequence, and the dramatic dust storm transition into the desert. Both sections felt like the vision I had at the start of the project actually came to life.

**One technical bug I solved:**
The biggest issue was the background illustration images getting cut off and cropped incorrectly. The original CSS used `object-fit: cover` with `height: 100%` on the illustration images which stretched and cropped them to fill the section container. The fix was switching to `position: absolute; bottom: 0; left: 0; width: 100%; height: auto` so each illustration anchors naturally to the bottom of its section at full width without any cropping. This one change made every section look dramatically better and was the foundation everything else was built on.

**One accessibility decision:**
Two accessibility decisions shaped the whole project. First, the `prefers-reduced-motion` check wraps every single GSAP animation so users who have reduced motion enabled in their OS settings see all the content fully readable without any animation running. Second, the theme toggle supports Dark, Light, and OS Theme modes so users can read the content in whatever lighting condition works best for them. Both preferences are saved to `localStorage` so they persist across sessions.

**What I'd improve with more time:**
The mobile experience needs the most work. The pinned sections and large illustrations don't translate as well to small screens as they do on desktop and TV. I would also want to refine some of the transitions between sections, particularly the forest to mountains and the desert to cave, to feel even more seamless. Adding more decorative detail elements to each section including more characters, environmental details, and subtle particle effects would make the world feel even more alive. And ideally I would add a sound layer with ambient audio for each terrain that fades in and out as you scroll through each section.