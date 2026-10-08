"use client";

import { sitePath } from "@/lib/site-path";

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

type Category = "All" | "Hospitality" | "Food & Beverage" | "Architecture" | "Product & Jewellery" | "People & Lifestyle" | "Campaigns & Media";
type PhotoCategory = Exclude<Category, "All">;

const photographs: Array<{
  src: string;
  alt: string;
  label: string;
  categories: PhotoCategory[];
}> = [
  {
    src: sitePath("/portfolio/slider/hyatt.jpg"),
    alt: "A plated dish and wine at Hyatt",
    label: "Food & Beverage",
    categories: ["Food & Beverage", "Hospitality"],
  },
  {
    src: sitePath("/portfolio/slider/jewellery.jpg"),
    alt: "Sapphire jewellery worn with a warm studio backdrop",
    label: "Jewellery",
    categories: ["Product & Jewellery"],
  },
  {
    src: sitePath("/portfolio/slider/chef.jpg"),
    alt: "Chef in a white uniform against a dark background",
    label: "Portrait",
    categories: ["People & Lifestyle", "Food & Beverage"],
  },
  {
    src: sitePath("/portfolio/slider/park-hyatt.jpg"),
    alt: "Restaurant interior at Park Hyatt Hyderabad",
    label: "Hospitality",
    categories: ["Hospitality", "Architecture"],
  },
  {
    src: sitePath("/portfolio/slider/skinvest.jpg"),
    alt: "Skincare products beside a pool",
    label: "Product",
    categories: ["Product & Jewellery", "People & Lifestyle"],
  },
  {
    src: sitePath("/portfolio/slider/lifestyle-kid.jpg"),
    alt: "Woman enjoying a cocktail in warm light",
    label: "Lifestyle",
    categories: ["People & Lifestyle", "Hospitality"],
  },
  {
    src: sitePath("/portfolio/slider/interior.jpg"),
    alt: "A collection of contemporary residential interiors",
    label: "Architecture",
    categories: ["Architecture"],
  },
  {
    src: sitePath("/portfolio/slider/health-care.jpg"),
    alt: "Scenes of healthcare professionals and emergency care",
    label: "Healthcare",
    categories: ["Campaigns & Media"],
  },
  {
    src: sitePath("/portfolio/slider/industry.jpg"),
    alt: "Industrial components arranged for a product photograph",
    label: "Product",
    categories: ["Product & Jewellery"],
  },
  {
    src: sitePath("/portfolio/slider/homepage-slider.jpg"),
    alt: "A warmly lit restaurant interior",
    label: "Hospitality",
    categories: ["Hospitality", "Architecture"],
  },
  { src: sitePath("/portfolio/categories/food.webp"), alt: "Food and drink campaign photograph", label: "Food & Beverage", categories: ["Food & Beverage"] },
  { src: sitePath("/portfolio/categories/architecture.webp"), alt: "A contemporary bedroom interior", label: "Architecture", categories: ["Architecture"] },
  { src: sitePath("/portfolio/categories/jewellery-detail.webp"), alt: "Diamond jewellery against a dark textured background", label: "Jewellery", categories: ["Product & Jewellery"] },
  { src: sitePath("/portfolio/categories/portrait.webp"), alt: "Portrait of a woman framed by leaves", label: "Portrait", categories: ["People & Lifestyle"] },
  { src: sitePath("/portfolio/categories/healthcare.webp"), alt: "Healthcare campaign artwork", label: "Healthcare", categories: ["Campaigns & Media"] },
  { src: sitePath("/portfolio/campaigns/multi-intel.webp"), alt: "Dancer in the Multi Intel campaign", label: "Multi Intel", categories: ["Campaigns & Media"] },
  { src: sitePath("/portfolio/campaigns/beyond-classroom.webp"), alt: "Beyond Classroom campaign imagery", label: "Beyond Classroom", categories: ["Campaigns & Media"] },
  { src: sitePath("/portfolio/campaigns/m2bb.webp"), alt: "M2BB campaign artwork", label: "M2BB", categories: ["Campaigns & Media"] },
  { src: sitePath("/portfolio/campaigns/sunset.webp"), alt: "Figure silhouetted against a sunset", label: "Sunset", categories: ["Campaigns & Media"] },
  { src: sitePath("/portfolio/prints/print-1.webp"), alt: "Packaged product photographed for print", label: "Print Work", categories: ["Campaigns & Media", "Product & Jewellery"] },
  { src: sitePath("/portfolio/prints/print-2.webp"), alt: "Food packaging photographed for print", label: "Print Work", categories: ["Campaigns & Media", "Food & Beverage"] },
  { src: sitePath("/portfolio/prints/print-3.webp"), alt: "Snack packaging campaign artwork", label: "Print Work", categories: ["Campaigns & Media", "Food & Beverage"] },
  { src: sitePath("/portfolio/categories/corporate-portrait.webp"), alt: "Professional portrait of a woman in a white jacket", label: "Corporate Portrait", categories: ["People & Lifestyle"] },
  { src: sitePath("/portfolio/categories/new-work.webp"), alt: "People outside a tropical resort building", label: "New Work", categories: ["Hospitality"] },
  { src: sitePath("/portfolio/categories/iphone.webp"), alt: "Food photographed on an iPhone", label: "Shot on iPhone", categories: ["Food & Beverage"] },
  { src: sitePath("/portfolio/categories/yoga.webp"), alt: "Yoga practitioner balancing outdoors", label: "Yoga", categories: ["People & Lifestyle"] },
];
type Photograph = (typeof photographs)[number];

const galleryTop = photographs;
const galleryBottom = [...photographs].reverse();

const campaigns = [
  {
    ...photographs[15], title: "Multi Intel",
    purpose: "Show that a child's abilities extend across academics, sport, music, dance and other disciplines.",
    outcome: "A series of finished campaign visuals presenting students in different roles, created for Dhruv Global School's wider education campaign across outdoor and institutional media.",
    folder: "https://drive.google.com/drive/folders/1Jp1ARlZqdNB1EPskJBCIKoQJt5nnJYkD",
    images: [photographs[15].src, sitePath("/portfolio/campaigns/multi-intel/music.webp"), sitePath("/portfolio/campaigns/multi-intel/running.webp"), sitePath("/portfolio/campaigns/multi-intel/yoga.webp")],
  },
  {
    ...photographs[16], title: "Beyond Classroom",
    purpose: "Communicate education beyond conventional academics through imagination, exploration and holistic development.",
    outcome: "A campaign image and a collection of short films depicting children learning and exploring beyond the classroom, developed as part of the Dhruv Global School campaign.",
    folder: "https://drive.google.com/drive/folders/1aerM5sZ5pbkmTsUPCF8YvLl_fb-bKSOD",
    images: [photographs[16].src],
  },
  {
    ...photographs[17], title: "M2BB",
    purpose: "Build a visual series around people, books and the natural world.",
    outcome: "The final project folder contains eight finished compositions, including portraits and scenes featuring the sea, trees and earth imagery.",
    folder: "https://drive.google.com/drive/folders/1W4eWOolGuFnyjJ0FrQma899CwYxdTLDw",
    images: [photographs[17].src, sitePath("/portfolio/campaigns/m2bb/sea.webp"), sitePath("/portfolio/campaigns/m2bb/tree.webp"), sitePath("/portfolio/campaigns/m2bb/globe.webp"), sitePath("/portfolio/campaigns/m2bb/book.webp"), sitePath("/portfolio/campaigns/m2bb/portrait.webp"), sitePath("/portfolio/campaigns/m2bb/barren.webp"), sitePath("/portfolio/campaigns/m2bb/hand-earth.webp")],
  },
  {
    ...photographs[18], title: "Sunset",
    purpose: "Explore warm evening light and silhouetted figures through a connected photographic series.",
    outcome: "Eight selected photographs in the campaign folder form a consistent sunset-led visual story.",
    folder: "https://drive.google.com/drive/folders/1HzIsdVLWK7II8PbIvBxD_8YwSYDlaxWr",
    images: [photographs[18].src, sitePath("/portfolio/campaigns/sunset/mg-7717.webp"), sitePath("/portfolio/campaigns/sunset/mg-7674.webp"), sitePath("/portfolio/campaigns/sunset/mg-7649.webp"), sitePath("/portfolio/campaigns/sunset/2.webp"), sitePath("/portfolio/campaigns/sunset/3.webp"), sitePath("/portfolio/campaigns/sunset/4.webp"), sitePath("/portfolio/campaigns/sunset/6.webp")],
  },
];

const videos = [
  { src: sitePath("/portfolio/video/agua-5.mp4"), title: "Agua 5" },
  { src: sitePath("/portfolio/video/westin-goa.mp4"), title: "Westin Goa" },
];

const categoryDescriptions: Record<Category, string> = {
  All: "Photography and moving-image work across every category.",
  Hospitality: "Restaurants, spaces and the details that shape a guest experience.",
  "Food & Beverage": "Food, drink and the people behind the table.",
  Architecture: "Interiors and built spaces photographed through light and form.",
  "Product & Jewellery": "Product details, industrial objects and jewellery photography.",
  "People & Lifestyle": "Portraits, movement and people in lived settings.",
  "Campaigns & Media": "Campaign imagery, print work and moving-image projects.",
};
const workCategories = Object.keys(categoryDescriptions).filter((category) => category !== "All") as PhotoCategory[];

const navItems = ["About", "Clients", "Campaign", "Thoughts", "Sale", "Testimonials", "Contact"];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/avinashkotekar/" },
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

function SocialIcon() {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.4" cy="6.7" r=".85" fill="currentColor" stroke="none" /></svg>;
}

export default function Home() {
  const [activeCampaign, setActiveCampaign] = useState(2);
  const [openCampaignIndex, setOpenCampaignIndex] = useState<number | null>(null);
  const [campaignImageIndex, setCampaignImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [categoryView, setCategoryView] = useState<Category | null>(null);
  const [featuredPhoto, setFeaturedPhoto] = useState<Photograph | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photograph | null>(null);
  const [activePrint, setActivePrint] = useState<(typeof prints)[number] | null>(null);

  const selectedPhotos = activeCategory === "All"
    ? photographs
    : photographs.filter((photo) => photo.categories.includes(activeCategory));
  const categoryPhotos = categoryView === null ? [] : categoryView === "All"
    ? photographs
    : photographs.filter((photo) => photo.categories.includes(categoryView));
  const displayedPhoto = featuredPhoto && categoryPhotos.includes(featuredPhoto) ? featuredPhoto : categoryPhotos[0];
  const marqueeTop = activeCategory === "All" ? galleryTop : selectedPhotos;
  const marqueeBottom = activeCategory === "All" ? galleryBottom : [...selectedPhotos].reverse();

  const openCategory = (category: Category, photo?: Photograph) => {
    setActiveCategory(category);
    setCategoryView(category);
    setFeaturedPhoto(photo ?? (category === "All" ? photographs[0] : photographs.find((item) => item.categories.includes(category))) ?? null);
    setLightboxPhoto(null);
  };

  const openCategoryForPhoto = (photo: Photograph) => openCategory(photo.categories[0], photo);
  const closeCategoryView = () => { setLightboxPhoto(null); setCategoryView(null); };
  const moveLightbox = (direction: number) => {
    if (!lightboxPhoto || categoryPhotos.length < 2) return;
    const index = categoryPhotos.indexOf(lightboxPhoto);
    setLightboxPhoto(categoryPhotos[(index + direction + categoryPhotos.length) % categoryPhotos.length]);
  };

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
      if (event.key === "Escape") {
        if (lightboxPhoto) setLightboxPhoto(null);
        else closeCategoryView();
      }
      if (lightboxPhoto && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        const index = categoryPhotos.indexOf(lightboxPhoto);
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        setLightboxPhoto(categoryPhotos[(index + direction + categoryPhotos.length) % categoryPhotos.length]);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [categoryView, lightboxPhoto]);

  const moveCampaign = (direction: number) => {
    setActiveCampaign((current) =>
      (current + direction + campaigns.length) % campaigns.length,
    );
  };

  useEffect(() => {
    if (openCampaignIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (campaignImageIndex !== null) setCampaignImageIndex(null);
        else setOpenCampaignIndex(null);
      }
      if (campaignImageIndex !== null && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        const count = campaigns[openCampaignIndex].images.length;
        setCampaignImageIndex((campaignImageIndex + (event.key === "ArrowLeft" ? -1 : 1) + count) % count);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openCampaignIndex, campaignImageIndex]);

  return (
    <main>
      <div className="ambient-haze" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <a className="skip-link" href="#about">Skip to content</a>

      <header className="site-header">
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
              <SocialIcon />
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
                  <SocialIcon />
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
                aria-label={`View ${photo.label} and more in ${photo.categories[0]}`}
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

      <section className="work-index" aria-label="Browse work by category">
        <span>Explore the work</span>
        <div className="work-index-categories">
          <button type="button" className={activeCategory === "All" ? "active" : ""} onClick={() => openCategory("All")}>All work</button>
          {workCategories.map((category) => (
            <button type="button" key={category} className={activeCategory === category ? "active" : ""} onClick={() => openCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </section>

      {categoryView && (
        <div className="category-view" role="dialog" aria-modal="true" aria-labelledby="category-view-title">
          <button className="category-view-backdrop" type="button" aria-label="Close category view" onClick={closeCategoryView} />
          <div className="category-view-panel">
            <div className="category-view-header">
              <div>
                <p className="eyebrow">Category archive · {categoryPhotos.length} images{categoryView === "All" || categoryView === "Campaigns & Media" ? ` · ${videos.length} films` : ""}</p>
                <h2 id="category-view-title">{categoryView === "All" ? "All work" : categoryView}<em>.</em></h2>
                <p>{categoryDescriptions[categoryView]}</p>
              </div>
              <button className="close-button" type="button" onClick={closeCategoryView} aria-label="Close category view">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {displayedPhoto && (
              <button className="category-featured" type="button" onClick={() => setLightboxPhoto(displayedPhoto)} aria-label={`View ${displayedPhoto.label} image full size`}>
                <img src={displayedPhoto.src} alt={displayedPhoto.alt} />
                <span>{displayedPhoto.label} <small>View full size ↗</small></span>
              </button>
            )}
            <div className="category-view-grid">
              {categoryPhotos.map((photo, index) => (
                <button className={displayedPhoto === photo ? "active" : ""} type="button" key={`${photo.src}-${index}`} onClick={() => { setFeaturedPhoto(photo); setLightboxPhoto(photo); }} aria-label={`View ${photo.label} image full size`}>
                  <img src={photo.src} alt={photo.alt} />
                  <span>{photo.label}</span>
                </button>
              ))}
            </div>
            {(categoryView === "All" || categoryView === "Campaigns & Media") && (
              <div className="category-video-section">
                <h3>Moving image</h3>
                <div className="category-video-grid">
                  {videos.map((video) => (
                    <figure key={video.src}>
                      <video src={video.src} controls preload="metadata" playsInline aria-label={video.title} />
                      <figcaption>{video.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
          {lightboxPhoto && (
            <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${lightboxPhoto.label} full size image`}>
              <button className="photo-lightbox-backdrop" type="button" onClick={() => setLightboxPhoto(null)} aria-label="Close full size image" />
              <button className="photo-lightbox-close" type="button" onClick={() => setLightboxPhoto(null)} aria-label="Close full size image">×</button>
              {categoryPhotos.length > 1 && <button className="photo-lightbox-arrow photo-lightbox-prev" type="button" onClick={() => moveLightbox(-1)} aria-label="Previous image">←</button>}
              <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} />
              {categoryPhotos.length > 1 && <button className="photo-lightbox-arrow photo-lightbox-next" type="button" onClick={() => moveLightbox(1)} aria-label="Next image">→</button>}
              <p>{lightboxPhoto.label} · {categoryPhotos.indexOf(lightboxPhoto) + 1} / {categoryPhotos.length}</p>
            </div>
          )}
        </div>
      )}

      <RevealSection className="about-section" id="about" labelledBy="about-title">
        <div className="about-index">
          <p className="eyebrow">Approach · 00</p>
          <span>Based in India<br />Working worldwide</span>
        </div>
        <div className="owner-portrait">
          <img src={sitePath("/assets/AK.JPEG")} alt="Avinash Kotekar" />
          <div className="owner-caption">
            <span className="owner-name">Avinash Kotekar</span>
            <a className="owner-portfolio" href={sitePath("/portfolio/")}>Portfolio</a>
          </div>
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
                  onClick={() => { setActiveCampaign(index); setOpenCampaignIndex(index); }}
                  style={style}
                  type="button"
                  aria-label={`Open ${campaign.title} campaign`}
                  aria-current={offset === 0 ? "true" : undefined}
                >
                  <img src={campaign.src} alt={campaign.alt} />
                  <span className="campaign-card-shade" />
                  <span className="campaign-card-copy">
                    <span>{campaign.label}</span>
                    <strong>{campaign.title}</strong>
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
                  onClick={() => { setActiveCampaign(index); setOpenCampaignIndex(index); }}
                  type="button"
                  role="tab"
                  aria-label={`Open ${campaign.title} campaign`}
                  aria-selected={index === activeCampaign}
                />
              ))}
            </div>
            <button type="button" onClick={() => moveCampaign(1)} aria-label="Next campaign">→</button>
          </div>
        </div>
      </RevealSection>

      {openCampaignIndex !== null && (() => {
        const campaign = campaigns[openCampaignIndex];
        return (
          <div className="category-view campaign-detail" role="dialog" aria-modal="true" aria-labelledby="campaign-detail-title">
            <button className="category-view-backdrop" type="button" aria-label="Close campaign" onClick={() => { setCampaignImageIndex(null); setOpenCampaignIndex(null); }} />
            <div className="category-view-panel campaign-detail-panel">
              <div className="category-view-header">
                <div>
                  <p className="eyebrow">Campaign archive · {campaign.images.length} images</p>
                  <h2 id="campaign-detail-title">{campaign.title}<em>.</em></h2>
                </div>
                <button className="close-button" type="button" onClick={() => { setCampaignImageIndex(null); setOpenCampaignIndex(null); }} aria-label="Close campaign"><span aria-hidden="true">×</span></button>
              </div>
              <div className="campaign-detail-story">
                <div><h3>Purpose</h3><p>{campaign.purpose}</p></div>
                <div><h3>Outcome</h3><p>{campaign.outcome}</p></div>
              </div>
              <div className="campaign-detail-grid">
                {campaign.images.map((src, index) => (
                  <button key={src} type="button" onClick={() => setCampaignImageIndex(index)} aria-label={`View ${campaign.title} image ${index + 1} full size`}>
                    <img src={src} alt={`${campaign.title} campaign image ${index + 1}`} />
                  </button>
                ))}
              </div>
              <a className="campaign-folder-link" href={campaign.folder} target="_blank" rel="noopener noreferrer">Open full campaign folder ↗</a>
            </div>
            {campaignImageIndex !== null && (
              <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${campaign.title} full size image`}>
                <button className="photo-lightbox-backdrop" type="button" onClick={() => setCampaignImageIndex(null)} aria-label="Close full size image" />
                <button className="photo-lightbox-close" type="button" onClick={() => setCampaignImageIndex(null)} aria-label="Close full size image">×</button>
                {campaign.images.length > 1 && <button className="photo-lightbox-arrow photo-lightbox-prev" type="button" onClick={() => setCampaignImageIndex((campaignImageIndex - 1 + campaign.images.length) % campaign.images.length)} aria-label="Previous image">←</button>}
                <img src={campaign.images[campaignImageIndex]} alt={`${campaign.title} campaign image ${campaignImageIndex + 1}`} />
                {campaign.images.length > 1 && <button className="photo-lightbox-arrow photo-lightbox-next" type="button" onClick={() => setCampaignImageIndex((campaignImageIndex + 1) % campaign.images.length)} aria-label="Next image">→</button>}
                <p>{campaign.title} · {campaignImageIndex + 1} / {campaign.images.length}</p>
              </div>
            )}
          </div>
        );
      })()}

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
                ].join("\n");
                window.location.href = `mailto:Avinashrkotekar@gmail.com?subject=${encodeURIComponent(`Project enquiry from ${name || "website visitor"}`)}&body=${encodeURIComponent(body)}`;
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
                <SocialIcon />
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
