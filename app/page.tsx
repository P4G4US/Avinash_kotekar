"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const logo = "https://avinashkotekar.com/wp-content/uploads/2021/07/LOGO.png";

const categoryOptions = ["All", "Lifestyle", "Real Estate", "Jewellery", "Hospitality", "Portrait", "Travel"] as const;
type Category = (typeof categoryOptions)[number];
type PhotoCategory = Exclude<Category, "All">;

const photographs: Array<{
  src: string;
  alt: string;
  label: string;
  categories: PhotoCategory[];
}> = [
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/PArk-HyattHyd.jpg",
    alt: "Guest enjoying a cocktail in warm ambient light",
    label: "Hospitality",
    categories: ["Hospitality", "Travel"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Jewellery.jpg",
    alt: "Sapphire and diamond jewellery campaign",
    label: "Jewellery",
    categories: ["Jewellery"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Hyatt.jpg",
    alt: "Fine dining plate with wine",
    label: "Food & beverage",
    categories: ["Hospitality", "Lifestyle"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Interior.jpg",
    alt: "Luxury living and dining interior",
    label: "Architecture",
    categories: ["Real Estate", "Travel"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Skinvest.jpg",
    alt: "Poolside skincare campaign",
    label: "Lifestyle",
    categories: ["Lifestyle"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Chef.jpg",
    alt: "Chef preparing for service",
    label: "Portrait",
    categories: ["Portrait", "Hospitality"],
  },
  {
    src: "https://avinashkotekar.com/wp-content/uploads/2026/03/Industry.jpg",
    alt: "Industrial product composition",
    label: "Product",
    categories: ["Real Estate", "Travel"],
  },
];

const galleryTop = [photographs[3], photographs[0], photographs[5], photographs[1], photographs[6], photographs[4], photographs[2]];
const galleryBottom = [photographs[2], photographs[6], photographs[1], photographs[4], photographs[0], photographs[3], photographs[5]];

const campaigns = [
  { ...photographs[1], title: "Objects of Desire", year: "2026" },
  { ...photographs[2], title: "The Table, Set", year: "2026" },
  { ...photographs[0], title: "After Hours", year: "2026" },
  { ...photographs[4], title: "A Summer State", year: "2026" },
  { ...photographs[3], title: "Rooms With Rhythm", year: "2026" },
];

const categoryDescriptions: Record<PhotoCategory, string> = {
  Lifestyle: "People, ritual and tactile details, photographed with a calm editorial eye.",
  "Real Estate": "Spaces and built environments shaped by light, material and considered composition.",
  Jewellery: "Polished objects, texture and quiet drama for luxury product stories.",
  Hospitality: "Atmosphere-led imagery for places, tables and the feeling of being welcomed.",
  Portrait: "Human presence, gesture and character held in a single considered frame.",
  Travel: "A sense of place, movement and discovery across destinations and experiences.",
};

const navItems = ["About", "Clients", "Campaign", "Thoughts", "Sale", "Testimonials", "Contact"];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/avinashkotekar/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/Avikotekar", icon: "facebook" },
  { label: "Pinterest", href: "https://in.pinterest.com/avinashphot", icon: "pinterest" },
  { label: "WhatsApp", href: "https://wa.me/917721008880", icon: "whatsapp" },
] as const;

const thoughts = [
  {
    number: "01",
    title: "Why atmosphere outlives a trend",
    excerpt: "A note on creating images that hold onto a feeling long after the campaign has left the feed.",
    body: "Trends can create quick recognition, but atmosphere creates memory. I begin by asking what a place, product or experience should feel like before deciding how it should look. Light, texture and pace then become part of one visual language.",
  },
  {
    number: "02",
    title: "The stillness before service",
    excerpt: "What an empty dining room can reveal about hospitality, anticipation and care.",
    body: "Before guests arrive, every detail is intentional—the angle of a chair, the reflection on a glass, the warmth of a lamp. Photographing that quiet preparation lets an audience feel the promise of the experience.",
  },
  {
    number: "03",
    title: "Where strategy meets light",
    excerpt: "Turning a campaign objective into decisions that can be seen, felt and repeated.",
    body: "The strongest visual systems are both expressive and useful. A clear brand objective guides casting, composition, colour and the rhythm of a shot list, so each frame works alone and as part of a larger story.",
  },
];

const prints = [
  { title: "Blue Hour", category: "Hospitality study", description: "A quiet study in cobalt light, made for spaces that stay with you after dark.", image: photographs[0] },
  { title: "Still Life No. 03", category: "Fine-art edition", description: "A restrained composition of reflective surfaces and soft contrast, printed as a limited edition.", image: photographs[1] },
  { title: "Sunday Light", category: "Architectural study", description: "Warm light moving across a considered interior, captured as a tactile piece for a private wall.", image: photographs[3] },
];

function RevealSection({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className: string;
  id: string;
  labelledBy: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} reveal-section`}
      id={id}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

function Logo() {
  return <img className="brand-logo" src={logo} alt="Avinash Kotekar" />;
}

type SocialIconName = (typeof socialLinks)[number]["icon"];

function SocialIcon({ name }: { name: SocialIconName }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (name === "instagram") {
    return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.4" cy="6.7" r=".85" fill="currentColor" stroke="none" /></svg>;
  }

  if (name === "facebook") {
    return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none" /></svg>;
  }

  if (name === "pinterest") {
    return <svg {...common}><path d="M8.5 21l1.6-6.4a5.7 5.7 0 0 1-.8-3.1c0-2.6 1.9-4.7 4.4-4.7 2.1 0 3.4 1.5 3.4 3.3 0 2.2-1.3 5.4-3.1 5.4-.9 0-1.6-.8-1.4-1.7l.5-2.1c.2-.9.4-1.7.4-2.3 0-1-.5-1.7-1.4-1.7-1.1 0-2 1.1-2 2.7 0 1 .3 1.7.3 1.7l-1.2 5c-.3 1.3-.4 2.6-.3 3.9" /></svg>;
  }

  return <svg {...common}><path d="M20.3 3.7A10.1 10.1 0 0 0 4.6 16.1L3.5 20.5l4.5-1.1A10.1 10.1 0 1 0 20.3 3.7Z" /><path d="M8.7 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .6.3.6 1.1 1.7 2.2 2.3 1.1.6 1.5.7 1.8.4l.7-.8c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.3.6-.1.8-.8 1.7-1.7 1.9-.8.2-1.8 0-3.1-.6-1.3-.6-2.5-1.5-3.5-2.6-.9-1-1.5-2.1-1.7-3-.2-1 0-1.8.3-2.5Z" /></svg>;
}

export default function Home() {
  const [activeCampaign, setActiveCampaign] = useState(2);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [categoryView, setCategoryView] = useState<PhotoCategory | null>(null);
  const [activePrint, setActivePrint] = useState<(typeof prints)[number] | null>(null);

  const selectedPhotos = activeCategory === "All"
    ? photographs
    : photographs.filter((photo) => photo.categories.includes(activeCategory));
  const marqueeTop = activeCategory === "All" ? galleryTop : selectedPhotos;
  const marqueeBottom = activeCategory === "All" ? galleryBottom : [...selectedPhotos].reverse();

  const openCategoryForPhoto = (photo: (typeof photographs)[number]) => {
    const category = photo.categories[0];
    setActiveCategory(category);
    setCategoryView(category);
  };

  const closeCategoryView = () => setCategoryView(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const moveGlow = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveGlow);
    };
  }, []);

  useEffect(() => {
    if (!categoryView) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCategoryView();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [categoryView]);

  const moveCampaign = (direction: number) => {
    setActiveCampaign((current) =>
      (current + direction + campaigns.length) % campaigns.length,
    );
  };

  return (
    <main>
      <div className="ambient-haze" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <a className="skip-link" href="#about">Skip to content</a>

      <header className="site-header">
        <a className="logo-link" href="#top" aria-label="Avinash Kotekar home">
          <Logo />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="desktop-socials" aria-label="Social media">
          {socialLinks.map((social) => (
            <a className="social-icon-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
              <SocialIcon name={social.icon} />
            </a>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="menu-trigger" type="button" aria-label="Open navigation">
              Menu <span aria-hidden="true">↗</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="mobile-sheet">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <div className="mobile-nav-brand"><Logo /></div>
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <SheetClose asChild key={item}>
                  <a href={`#${item.toLowerCase()}`}>
                    <span>0{index + 1}</span>{item}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mobile-socials" aria-label="Social media">
              {socialLinks.map((social) => (
                <a className="social-icon-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-masthead">
          <div className="hero-title-block">
            <p className="hero-kicker">Photographer · Creative Director</p>
            <h1 id="hero-title">
              Atmosphere, <em>shaped</em> into images<span aria-hidden="true">.</span>
            </h1>
          </div>
          <div className="hero-mast-actions">
            <label className="category-filter">
              <span>Filter selected work</span>
              <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as Category)}>
                {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <div className="hero-logo-display">
              <img src={logo} alt="Avinash Kotekar" className="enlarged-logo" />
            </div>
          </div>
        </div>

        <div className="image-ribbons" aria-label="Selected photography">
          <div className="marquee-row marquee-forward">
            {[...marqueeTop, ...marqueeTop].map((photo, index) => (
              <figure
                className="moving-frame"
                key={`forward-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => openCategoryForPhoto(photo)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openCategoryForPhoto(photo);
                  }
                }}
                aria-label={`View all ${photo.categories[0]} photographs`}
              >
                <img src={photo.src} alt={index < photographs.length ? photo.alt : ""} />
                <figcaption>
                  <span>{photo.label}</span>
                  <small>AK · {String((index % photographs.length) + 1).padStart(2, "0")}</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="marquee-row marquee-reverse" aria-hidden="true">
            {[...marqueeBottom, ...marqueeBottom].map((photo, index) => (
              <figure className="moving-frame" key={`reverse-${index}`}>
                <img src={photo.src} alt="" />
                <figcaption>
                  <span>{photo.label}</span>
                  <small>AK · {String((index % photographs.length) + 1).padStart(2, "0")}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {categoryView && (
        <div className="category-view" role="dialog" aria-modal="true" aria-labelledby="category-view-title">
          <button className="category-view-backdrop" type="button" aria-label="Close category view" onClick={closeCategoryView} />
          <div className="category-view-panel">
            <div className="category-view-header">
              <div>
                <p className="eyebrow">Category archive · {selectedPhotos.length} frames</p>
                <h2 id="category-view-title">{categoryView}<em>.</em></h2>
                <p>{categoryDescriptions[categoryView]}</p>
              </div>
              <button className="close-button" type="button" onClick={closeCategoryView} aria-label="Close category view">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="category-view-grid">
              {photographs.filter((photo) => photo.categories.includes(categoryView)).map((photo, index) => (
                <figure key={`${photo.src}-${index}`}>
                  <img src={photo.src} alt={photo.alt} />
                  <figcaption><span>{photo.label}</span><small>AK · {String(index + 1).padStart(2, "0")}</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <RevealSection className="about-section" id="about" labelledBy="about-title">
        <div className="about-index">
          <p className="eyebrow">Approach · 00</p>
          <span>Based in India<br />Working worldwide</span>
        </div>
        <div className="owner-portrait" role="img" aria-label="Owner portrait placeholder">
          <div className="portrait-mark">AK</div>
          <span>Owner portrait<br />to be added</span>
        </div>
        <div className="about-copy">
          <h2 id="about-title">A visual language with <em>purpose.</em></h2>
          <div className="about-columns about-long-copy">
            <p>With over nine years of experience across photography and creative direction, I create visuals that balance strong aesthetics with clear brand intent. My work begins with understanding what a brand needs to communicate and shaping a visual language that is relevant, consistent, and purposeful. I work closely with teams to understand the product, audience, and campaign objectives before execution begins. This approach allows for clear concept development, structured shoot planning, and precise on-set direction, ensuring every image supports the larger narrative. My work spans hospitality, food &amp; beverage, architecture, lifestyle, and luxury products. Over the years I have collaborated with brands such as Red Bull, Marriott Bonvoy, JW Marriott, Westin, Le Méridien, and Skinvest. Through my work, I focus on building visual stories that capture atmosphere, design, and experience while remaining aligned with the brand’s identity.</p>
          </div>
        </div>
        <div className="collaboration-bar" id="clients" aria-label="Brand collaborations">
          <div className="collaboration-intro">
            <span>Brand collaborations</span>
            <p>Selected organisations photographed across hospitality, culture and lifestyle.</p>
          </div>
          <div className="brand-list">
            <strong>Red Bull</strong><strong>Marriott Bonvoy</strong><strong>JW Marriott</strong><strong>Westin</strong><strong>Le Méridien</strong><strong>Skinvest</strong>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="campaign-section" id="campaign" labelledBy="campaign-title">
        <div className="section-intro">
          <p className="eyebrow">Selected campaigns · 01</p>
          <h2 id="campaign-title">Built around<br /><em>one clear feeling.</em></h2>
          <p>Drag your attention through the frame. Each campaign is shaped as a visual world—not a collection of isolated images.</p>
        </div>

        <div className="campaign-stage">
          <div className="campaign-stack" aria-live="polite">
            {campaigns.map((campaign, index) => {
              let offset = index - activeCampaign;
              if (offset > Math.floor(campaigns.length / 2)) offset -= campaigns.length;
              if (offset < -Math.floor(campaigns.length / 2)) offset += campaigns.length;
              const style = {
                "--offset": offset,
                "--abs-offset": Math.abs(offset),
                zIndex: campaigns.length - Math.abs(offset),
              } as CSSProperties;

              return (
                <button
                  className={`campaign-card ${offset === 0 ? "is-active" : ""}`}
                  key={campaign.title}
                  onClick={() => setActiveCampaign(index)}
                  style={style}
                  type="button"
                  aria-label={`Show campaign ${campaign.title}`}
                  aria-current={offset === 0 ? "true" : undefined}
                >
                  <img src={campaign.src} alt={campaign.alt} />
                  <span className="campaign-card-shade" />
                  <span className="campaign-card-copy">
                    <span>{campaign.label}</span>
                    <strong>{campaign.title}</strong>
                    <small>{campaign.year}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="campaign-controls">
            <button type="button" onClick={() => moveCampaign(-1)} aria-label="Previous campaign">←</button>
            <div className="campaign-dots" role="tablist" aria-label="Choose campaign">
              {campaigns.map((campaign, index) => (
                <button
                  key={campaign.title}
                  className={index === activeCampaign ? "active" : ""}
                  onClick={() => setActiveCampaign(index)}
                  type="button"
                  role="tab"
                  aria-label={campaign.title}
                  aria-selected={index === activeCampaign}
                />
              ))}
            </div>
            <button type="button" onClick={() => moveCampaign(1)} aria-label="Next campaign">→</button>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="thoughts-section" id="thoughts" labelledBy="thoughts-title">
        <div className="wide-heading">
          <div>
            <p className="eyebrow">Journal · 02</p>
            <h2 id="thoughts-title">Thoughts from<br /><em>behind the frame.</em></h2>
          </div>
          <p>Process notes on image-making, observation and building a visual world for brands.</p>
        </div>
        <div className="thoughts-list">
          {thoughts.map((thought) => (
            <details className="thought-card" key={thought.number}>
              <summary>
                <span className="thought-number">{thought.number}</span>
                <span className="thought-title">{thought.title}</span>
                <span className="thought-excerpt">{thought.excerpt}</span>
                <span className="thought-plus" aria-hidden="true">+</span>
              </summary>
              <div className="thought-body">
                <p>{thought.body}</p>
              </div>
            </details>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="sale-section" id="sale" labelledBy="sale-title">
        <div className="sale-heading">
          <p className="eyebrow">The print room · 03</p>
          <h2 id="sale-title">Photography,<br /><em>made tangible.</em></h2>
          <p>A rotating collection of archival photography-based art, available in limited fine-art editions.</p>
        </div>
        <div className="print-grid">
          {prints.map((print, index) => (
            <article className="print-card" key={print.title}>
              <button className="print-image" type="button" onClick={() => setActivePrint(print)} aria-label={`Preview ${print.title}`}>
                <img src={print.image.src} alt={print.image.alt} />
                <span>Edition 0{index + 1}</span>
                <i aria-hidden="true">Preview ↗</i>
              </button>
              <div className="print-info">
                <div><p>{print.category}</p><h3>{print.title}</h3></div>
                <a href={`mailto:hello@avinashkotekar.com?subject=${encodeURIComponent(`Print enquiry: ${print.title}`)}`}>
                  Enquire <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="sale-note">Edition sizes, paper options and pricing are shared on request.</p>
        <Sheet open={Boolean(activePrint)} onOpenChange={(open) => { if (!open) setActivePrint(null); }}>
          <SheetContent side="right" className="sale-preview-sheet">
            {activePrint && (
              <>
                <SheetHeader>
                  <p className="eyebrow">Preview · fine-art edition</p>
                  <SheetTitle>{activePrint.title}</SheetTitle>
                </SheetHeader>
                <div className="sale-preview-media"><img src={activePrint.image.src} alt={activePrint.image.alt} /></div>
                <div className="sale-preview-copy">
                  <p>{activePrint.category}</p>
                  <h3>{activePrint.description}</h3>
                  <span>Archival print · Edition sizes and paper options shared on request.</span>
                  <a href={`mailto:hello@avinashkotekar.com?subject=${encodeURIComponent(`Print enquiry: ${activePrint.title}`)}`}>Enquire about this print <i aria-hidden="true">↗</i></a>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </RevealSection>

      <RevealSection className="testimonials-section" id="testimonials" labelledBy="testimonials-title">
        <div className="testimonial-heading">
          <p className="eyebrow">Client notes · 04</p>
          <h2 id="testimonials-title">What it feels like<br />to work <em>together.</em></h2>
          <p>Short, specific words from people who have experienced the process.</p>
        </div>
        <div className="testimonial-grid" tabIndex={0} aria-label="Client testimonials. Scroll horizontally for more.">
          <article className="testimonial-card">
            <img src={photographs[5].src} alt={photographs[5].alt} />
            <div className="testimonial-copy">
              <span>Hospitality · Creative partnership</span>
              <blockquote>“Creative, dependable, and so easy to collaborate with.”</blockquote>
              <p>Forum Shah <small>Long-term collaborator</small></p>
            </div>
          </article>
          <article className="testimonial-card">
            <img src={photographs[4].src} alt={photographs[4].alt} />
            <div className="testimonial-copy">
              <span>Photography · Visual storytelling</span>
              <blockquote>“Every frame he captures is not just a picture but a narrative.”</blockquote>
              <p>Abhikendu Gupta <small>Creative collaborator</small></p>
            </div>
          </article>
        </div>
      </RevealSection>

      <RevealSection className="contact-section" id="contact" labelledBy="contact-title">
        <div className="contact-visual">
          <img src={photographs[0].src} alt={photographs[0].alt} />
          <span>Every strong image begins with a conversation.</span>
        </div>
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Get connected · 05</p>
            <h2 id="contact-title">Let’s make<br />something <em>unmissable.</em></h2>
          </div>
          <div className="contact-detail">
            <p>Share the brand, brief and timeline. We’ll shape the visual world around it.</p>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                const values = new FormData(event.currentTarget);
                const name = String(values.get("name") || "");
                const body = [
                  `Name: ${name}`,
                  `Email: ${String(values.get("email") || "")}`,
                  `Phone: ${String(values.get("phone") || "")}`,
                  "",
                  "Requirement:",
                  String(values.get("requirement") || ""),
                ].join("\\n");
                window.location.href = `mailto:hello@avinashkotekar.com?subject=${encodeURIComponent(`Project enquiry from ${name || "website visitor"}`)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <label className="contact-field">
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <div className="contact-field-row">
                <label className="contact-field">
                  <span>Email ID</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="contact-field">
                  <span>Phone Number</span>
                  <input name="phone" type="tel" autoComplete="tel" required />
                </label>
              </div>
              <label className="contact-field">
                <span>Requirement</span>
                <textarea name="requirement" rows={2} placeholder="Tell us a little about the project" required />
              </label>
              <div className="contact-form-footer">
                <span>We’ll reply with a date to talk.</span>
                <button className="contact-submit" type="submit">Send <i aria-hidden="true">↗</i></button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-line">
          <Logo />
          <div className="footer-socials" aria-label="Social media">
            {socialLinks.map((social) => (
              <a className="social-icon-link" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
          <p>Copyright © 2026 Avinash Kotekar · All Rights Reserved</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </RevealSection>
    </main>
  );
}
