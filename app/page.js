"use client";

import { useState } from "react";

/* ---------------- data ---------------- */
const STATS = [
  { value: "10,000", pl: "+", label: "Trademarks Filed" },
  { value: "24", pl: "h", label: "Filing Guarantee" },
  { value: "50", pl: "+", label: "TM Attorneys" },
  { value: "98", pl: "%", label: "Client Satisfaction" },
];

const BENEFITS = [
  { ic: "bx-shield-quarter", t: "Exclusive Rights", p: "Get the sole right to use your brand name and logo for your registered class across India." },
  { ic: "bx-gavel", t: "Legal Protection", p: "Take legal action against anyone who copies or misuses your registered mark." },
  { ic: "bx-registered", t: "™ & ® Symbols", p: "Use ™ the moment you file and ® once your trademark is registered." },
  { ic: "bx-medal", t: "Brand Trust & Value", p: "A registered brand builds credibility with customers, partners and investors." },
  { ic: "bx-transfer-alt", t: "A Business Asset", p: "Your trademark is intellectual property that can be sold, licensed or franchised." },
  { ic: "bx-map", t: "Nationwide Validity", p: "Protection across all of India for 10 years — renewable indefinitely." },
];

const IDEAL = [
  { ic: "bx-bulb", t: "Startups & Founders", p: "Protect your name before you scale." },
  { ic: "bx-store", t: "D2C & Retail Brands", p: "Secure your label across marketplaces." },
  { ic: "bx-briefcase", t: "Service Businesses", p: "Own your name, logo & tagline." },
  { ic: "bx-package", t: "Manufacturers & Exporters", p: "Safeguard product brands at scale." },
];

const DOCS_APPLICANT = [
  "PAN card of the applicant / authorised signatory",
  "Aadhaar / address proof of the applicant",
  "Incorporation certificate (for company / LLP)",
  "Udyam (MSME) certificate — for the lower govt fee",
  "Signed Form TM-48 authorisation (we draft it for you)",
];
const DOCS_MARK = [
  "Brand name / word mark to be registered",
  "Logo in high-resolution (if a logo mark)",
  "List of goods / services & the class",
  "Date of first use, if already in use (with proof)",
  "Tagline / slogan, if you want it protected",
];

const PROCESS = [
  { day: "Day 1", t: "Free Brand & Class Search", p: "We run a knock-out search to check your mark is available in the right class." },
  { day: "Within 24 hrs", t: "Application Filing", p: "Your TM attorney drafts and files the application — you can use ™ right away." },
  { day: "2–4 months", t: "Examination", p: "The Registry examines the mark and issues an examination report." },
  { day: "If raised", t: "Objection / Opposition", p: "We draft and file replies to any objection and represent you at hearings." },
  { day: "Journal", t: "Publication", p: "The mark is published in the Trade Marks Journal for a 4-month window." },
  { day: "Registered!", t: "® Granted", p: "Your trademark is registered and protected for 10 years — we track renewals.", done: true },
];

const PLANS = [
  {
    tier: "Starter", price: "1,999", was: "2,999", note: "Launch offer", cta: "Brand Secure",
    bestfor: "Best for solo founders & small businesses",
    feats: [
      "Trademark application filing (1 class)",
      "Use ™ with your brand from day one",
      "Free class search + expert TM consultation",
      "Drafting & filing by a TM attorney",
      "24-hour filing guarantee",
      "MSME / Startup govt-fee discount help",
      "Lifetime tracking · EMI · no hidden charges",
    ],
  },
  {
    tier: "Standard", price: "3,999", was: "6,999", note: "Launch offer", cta: "Brand Build",
    badge: "Best Value", bestfor: "Most chosen — best value for new & growing brands",
    feats: [
      "Trademark application filing (1 class)",
      "Use ™ with your brand from day one",
      "Comprehensive knock-out TM search report",
      "3 custom logo concepts + final files",
      "Free consultation till you get your TM mark",
      "Dedicated relationship manager",
      "24-hr filing · MSME help · full support",
    ],
  },
  {
    tier: "Premium", price: "8,999", was: "14,999", note: "Launch offer", cta: "Go Pro",
    badge: "Most Popular", feat: true, bestfor: "Complete protection — start to finish",
    feats: [
      "Trademark filing + knock-out search report",
      "Use ™ with your brand from day one",
      "End-to-end handling till registration",
      "Trademark objection reply included",
      "1-year Trademark Watch (copycat alerts)",
      "Priority processing + dedicated manager",
      "Renewal & deadline reminders — never lapse",
    ],
  },
  {
    tier: "All-In-One", price: "12,999", was: "21,999", note: "Launch offer", cta: "Brand 360",
    bestfor: "Launch & protect your brand — all in one",
    feats: [
      "Trademark filing + search + 3 logo concepts",
      "Use ™ with your brand from day one",
      "Objection reply + advocate hearing",
      "1-year Trademark Watch + renewal reminders",
      "FREE MSME registration included",
      "Brand audit — domain + social handle check",
      "Priority advocate support + dedicated manager",
    ],
  },
  {
    tier: "Trust Bundle", price: "5,499", was: "8,499", note: "Launch offer", cta: "TM + ISO + MSME",
    bestfor: "Build instant trust & credibility (TM + ISO + MSME)",
    feats: [
      "Trademark application filing (1 class)",
      "Use ™ with your brand from day one",
      "ISO 9001 certification included",
      "FREE MSME registration included",
      "Free class search + expert consultation",
      "Drafting & filing by a TM attorney",
      "EMI + full support · no hidden charges",
    ],
  },
  {
    tier: "Rescue", price: "4,499", was: "4,999", note: "Objection cover", cta: "Filing + Objection",
    bestfor: "File fresh with built-in objection-reply cover",
    feats: [
      "Trademark application filing (1 class)",
      "Use ™ with your brand from day one",
      "Attorney-drafted objection reply",
      "Section 9 & Section 11 objection handling",
      "Hearing-date tracking + advocate consultation",
    ],
  },
];

const CMP_HEAD = [
  { name: "Brand Secure", price: "₹1,999" },
  { name: "Brand Build", price: "₹3,999" },
  { name: "Brand Pro", price: "₹8,999", hl: true },
  { name: "Brand 360", price: "₹12,999" },
  { name: "TM·ISO·MSME", price: "₹5,499" },
  { name: "Filing + Objection", price: "₹4,499" },
];
const CMP_ROWS = [
  ["Use ™ from day one", [1, 1, 1, 1, 1, 1]],
  ["TM filing + class search", [1, 1, 1, 1, 1, 1]],
  ["Knock-out search report", [0, 1, 1, 1, 0, 0]],
  ["3 logo concepts", [0, 1, 0, 1, 0, 0]],
  ["Dedicated manager", [0, 1, 1, 1, 0, 0]],
  ["Objection reply", [0, 0, 1, 1, 0, 1]],
  ["Advocate hearing", [0, 0, 0, 1, 0, 0]],
  ["1-year Trademark Watch", [0, 0, 1, 1, 0, 0]],
  ["ISO 9001 certificate", [0, 0, 0, 0, 1, 0]],
  ["FREE MSME registration", [0, 0, 0, 1, 1, 0]],
];

const WHY = [
  { ic: "bx-user-voice", t: "TM Attorneys", p: "Experienced trademark attorneys draft and file every application." },
  { ic: "bx-rupee", t: "Transparent Pricing", p: "Flat professional fees; government charges at actuals — zero surprises." },
  { ic: "bx-time-five", t: "24-Hour Filing", p: "We file within 24 hours so you can use ™ right away." },
  { ic: "bx-shield-quarter", t: "Objection & Watch", p: "Objection-reply cover and 1-year Trademark Watch keep your brand safe." },
];

const TESTIMONIALS = [
  { av: "NK", n: "Neha Kulkarni", r: "D2C Skincare, Mumbai", q: "Filed our brand within a day and we started using ™ immediately. The class search saved us from a clash we hadn't spotted." },
  { av: "SV", n: "Sahil Verma", r: "Cloud Kitchen, Jaipur", q: "Got an objection on our mark and Vakilkaro's attorney drafted the reply and represented us. Sailed through to registration." },
  { av: "RT", n: "Ritu Tandon", r: "Apparel Brand, Delhi", q: "The TM + ISO + MSME bundle was great value — three things sorted in one go, with a manager guiding us throughout." },
];

const FAQS = [
  { q: "How soon can I file, and use the ™ symbol?", a: "We file your application within 24 hours of receiving documents, and you can use ™ the moment it's filed. The ® symbol can be used once the mark is registered." },
  { q: "How long does full trademark registration take?", a: "If there's no objection or opposition, registration usually takes about 8–18 months, depending on the Registry." },
  { q: "What is a trademark class?", a: "Goods and services are grouped into 45 classes. A basic application covers one class; we run a free class search to make sure you file in the right one(s)." },
  { q: "What happens if my trademark is objected?", a: "Our attorneys draft and file the objection reply and represent you at hearings. Objection-reply cover is included from the Brand Pro plan and in the Filing + Objection plan." },
  { q: "How long is a registered trademark valid?", a: "A registered trademark is valid for 10 years and can be renewed indefinitely. We track and remind you of renewals." },
  { q: "Who can apply, and are there fee discounts?", a: "Individuals, proprietors, companies, LLPs, startups and NGOs can apply. Individuals, startups and MSMEs (with a Udyam certificate) get a lower government fee — we help you claim it." },
];

const WA = "https://wa.me/911141000000?text=Hi%20Vakilkaro%2C%20I%20want%20to%20register%20a%20Trademark";

/* ---------------- component ---------------- */
export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState("otp");

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Trademark Registration", consent: true });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null); // null | {firstName, refId}

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (form.phone.replace(/\D/g, "").length !== 10) err.phone = true;
    if (!form.consent) err.consent = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    // TODO: POST `form` to your CRM / backend here.
    setDone({
      firstName: form.name.trim().split(" ")[0] || "there",
      refId: "VK-TM-" + Math.floor(10000 + Math.random() * 89999),
    });
  }

  function openLogin(e) {
    if (e) e.preventDefault();
    setShowLogin(true);
  }

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="topbar">
        <div className="container">
          <div className="bar">
            <span><i className="bx bxs-badge-check" /> ISO 9001:2015 Certified</span>
            <span className="d-none d-md-inline-flex"><i className="bx bxs-star" /> 4.9/5 · 10,000+ Clients</span>
            <a className="d-none d-md-inline-flex" href="tel:+919828123489"><i className="bx bxs-phone" /> +91 9828123489</a>
            <span className="right" onClick={openLogin}><i className="bx bx-user-circle" /> <b>Customer Login</b></span>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg sticky-top nav-vk">
        <div className="container">
          <a className="navbar-brand" href="#top">
            <img
              src="/vakillogo.png"
              alt="Vakilkaro"
              style={{ height: "50px", width: "auto" }}
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={"collapse navbar-collapse" + (navOpen ? " show" : "")}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#about">Overview</a></li>
              <li className="nav-item"><a className="nav-link" href="#benefits">Benefits</a></li>
              <li className="nav-item"><a className="nav-link" href="#process">Process</a></li>
              <li className="nav-item"><a className="nav-link" href="#pricing">Pricing</a></li>
              <li className="nav-item"><a className="nav-link" href="#compare">Compare</a></li>
              <li className="nav-item"><a className="nav-link" href="#faq">FAQs</a></li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <span className="nav-phone nav-collapse-phone"><i className="bx bxs-phone" /> +91 9828123489</span>
              <a className="btn btn-login2 btn-sm" href="#login" onClick={openLogin}><i className="bx bx-user" /> Login</a>
              <a className="btn btn-gold btn-sm" href="#enquiry"><i className="bx bx-bolt-circle" /> Talk to Expert</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="hero" id="top">
        <div className="container py-4 py-lg-2">
          <div className="row align-items-stretch g-4">
            {/* left */}
            <div className="col-lg-6 d-flex flex-column">
              <div className="h2head pt-2 pt-lg-4">
                <div className="eyebrow">Trademark Registration · Brand Protection</div>
                <h1>Protect Your Brand — Register Your <span className="g">Trademark</span> Online</h1>
                <p className="h2sub">100% online · TM attorney support · 24-hour filing guarantee · use the ™ symbol from day one · free brand & class search.</p>
              </div>
              {/* ambassador photo — drop your licensed cutout at /public/ambassador.png */}
              <div className="h2photo flex-grow-1">
                <div className="ph-frame">
                  <i className="bx bxs-user ph-ic" />
                  <span className="ph-note">Place your licensed cutout<br /><b>ambassador.png</b><br />(transparent background)</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="celeb" src="/ambassador.png" alt="Vakilkaro Brand Ambassador" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <div className="rate-badge">
                  <div className="rb-top"><b>4.9</b><i className="bx bxs-star" /></div>
                  <div className="rb-sub">Our ratings from 10,000+<br />customers on <span className="g-logo">Google</span></div>
                </div>
                <div className="amb-card">
                  <small>We are proud to welcome</small>
                  <div className="amb-big">YOUR AMBASSADOR</div>
                  <small>as Brand Ambassador of</small>
                  <span className="amb-logo">Vakil<b>karo</b></span>
                </div>
              </div>
            </div>

            {/* right: form */}
            <div className="col-lg-6 d-flex align-items-center">
              <div className="vk-form w-100" id="enquiry">
                <span className="ff-pill">Free Consultation</span>
                {!done ? (
                  <>
                    <h3 className="ff-title">Need Help with Trademark Registration?</h3>
                    <p className="ff-sub">Fill up the form below — our expert will call you back</p>
                    <div className="live"><span className="dot" /> 17 brands enquired in the last 24 hrs</div>
                    <form onSubmit={submit} noValidate>
                      <div className="mb-2">
                        <label className="form-label">Full Name <span className="req">*</span></label>
                        <input className={"form-control" + (errors.name ? " is-invalid" : "")} name="name" value={form.name} onChange={update} placeholder="Enter Your Name" />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Email Address</label>
                        <input className="form-control" name="email" type="email" value={form.email} onChange={update} placeholder="Enter Your Email" />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Mobile Number <span className="req">*</span></label>
                        <div className="phone-wrap">
                          <span className="phone-cc">+91</span>
                          <input className={"form-control" + (errors.phone ? " is-invalid" : "")} name="phone" inputMode="numeric" maxLength={10}
                            value={form.phone}
                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                            placeholder="Enter Your Phone" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Service Required</label>
                        <select className="form-select" name="service" value={form.service} onChange={update}>
                          <option>Trademark Registration</option>
                          <option>Trademark Objection Reply</option>
                          <option>TM + ISO + MSME Bundle</option>
                          <option>Trademark Renewal</option>
                          <option>Logo / Brand Design</option>
                          <option>Other Legal / Tax Service</option>
                        </select>
                      </div>
                      <div className="form-check consent my-2">
                        <input className="form-check-input" type="checkbox" id="consent" name="consent" checked={form.consent} onChange={update} />
                        <label className="form-check-label" htmlFor="consent">
                          I have read & agree to the <a href="#">Terms</a>, disclaimer & refund policy, and am ready to accept calls, SMS & emails.
                        </label>
                      </div>
                      <button className="btn btn-gold w-100 py-2" type="submit"><i className="bx bx-paper-plane" /> SUBMIT YOUR QUERY</button>
                    </form>
                    <div className="ff-or">or talk to us instantly</div>
                    <a className="btn btn-wa2 w-100" href={WA} target="_blank" rel="noopener noreferrer"><i className="bx bxl-whatsapp" /> Chat on WhatsApp</a>
                    <div className="ff-foot">
                      <span><i className="bx bx-lock-alt" /> 100% Confidential</span>
                      <span><i className="bx bx-time-five" /> 30-min Callback</span>
                      <span><i className="bx bx-shield-quarter" /> No Spam</span>
                    </div>
                    <p className="ff-price">Trademark filing from <s>₹2,999</s> <b>₹1,999</b> <span style={{ color: "var(--green)", fontWeight: 700 }}>+ govt fee & GST</span></p>
                  </>
                ) : (
                  <div className="ff-success">
                    <div className="ok"><i className="bx bx-check" /></div>
                    <h3>Thank you, {done.firstName}!</h3>
                    <p>Your enquiry is received. A Vakilkaro TM expert will call you within <b>30 minutes</b> to file your trademark.</p>
                    <a className="btn btn-wa2" href={WA} target="_blank" rel="noopener noreferrer"><i className="bx bxl-whatsapp" /> Chat now on WhatsApp</a>
                    <p className="mt-3 mb-0" style={{ fontSize: 12.5, color: "var(--faint)" }}>Reference ID: <b>{done.refId}</b></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== VAKILCOINS ===== */}
      <section className="coins">
        <div className="container">
          <div className="row align-items-center g-4 py-5">
            <div className="col-lg-7">
              <h2 className="serif">Start your Vakilkaro journey<br />and earn from day one</h2>
              <p className="sub">Every new customer gets a head start with bonus VakilCoins — redeemable as a cash discount on any booking, including your trademark filing.</p>
              <div className="coin-step"><div className="n">1</div><div className="tx"><b>Create your profile</b> <span>— earn 200 welcome coins instantly</span></div></div>
              <div className="coin-step"><div className="n">2</div><div className="tx"><b>Complete your first booking</b> <span>— earn coins on your spend + 500 bonus</span></div></div>
              <div className="coin-step"><div className="n">3</div><div className="tx"><b>Refer a business friend</b> <span>— earn 1,000 coins on their first paid order</span></div></div>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <a className="btn btn-gold" href="#login" onClick={openLogin}><i className="bx bx-wallet" /> Login to your VakilCoins wallet</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="rcard"><div className="ic">🎁</div><div><div className="v">+200</div><div className="l">Welcome bonus coins · already credited</div></div></div>
              <div className="rcard"><div className="ic">✅</div><div><div className="v">+500</div><div className="l">Per order completion bonus</div></div></div>
              <div className="rcard"><div className="ic">🤝</div><div><div className="v">+1,000</div><div className="l">Per successful referral</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="statbar">
        <div className="container">
          <div className="row">
            {STATS.map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="stat">
                  <div className="v">{s.value}<span className="pl">{s.pl}</span></div>
                  <div className="l">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* <div className="col-lg-6">
              <div className="eyebrow">Understand the basics</div>
              <h2 className="serif" style={{ fontSize: 36, margin: "10px 0 14px" }}>What is a Trademark?</h2>
              <p className="about-body">A trademark is a unique sign — a brand name, logo, slogan or symbol — that identifies your goods or services and sets them apart from competitors. Registering it under the Trade Marks Act, 1999 gives you exclusive legal rights to that mark across India.</p>
              <p className="about-body">Once you file, you can use ™ immediately; after registration you can use ® and stop others from copying your brand. A trademark is a valuable business asset that can be sold, licensed or franchised.</p>
              <ul className="about-list">
                <li><i className="bx bx-check-shield" /> Exclusive right to use your brand name & logo in its class</li>
                <li><i className="bx bx-check-shield" /> Legal protection against copycats and infringement</li>
                <li><i className="bx bx-check-shield" /> Use ™ from day one of filing, ® after registration</li>
              </ul>
            </div> */}
            <div className="col-lg">
              <div className="glance">
                <h4>Trademark at a glance</h4>
                <p>File in 24 hours, use ™ immediately, and protect your brand for a decade.</p>
                <div className="glance-row">
                  <div><b>24h</b><small>Filing guarantee</small></div>
                  <div><b>10 yrs</b><small>Validity (renewable)</small></div>
                  <div><b>45</b><small>Classes</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section section-alt" id="benefits">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Why register a trademark</div>
            <h2>Benefits of Trademark Registration</h2>
            <p>Lock in your brand identity, build trust and turn your name into a protected business asset.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {BENEFITS.map((b) => (
              <div className="col" key={b.t}>
                <div className="bcard">
                  <div className="ic"><i className={"bx " + b.ic} /></div>
                  <h4>{b.t}</h4>
                  <p>{b.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IDEAL FOR ===== */}
      <section className="section" id="idealfor">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Is it right for you?</div>
            <h2>Who Should Register a Trademark?</h2>
            <p>Anyone building a brand they don't want copied — from solo founders to large manufacturers.</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
            {IDEAL.map((i) => (
              <div className="col" key={i.t}>
                <div className="icard">
                  <div className="ic"><i className={"bx " + i.ic} /></div>
                  <h4>{i.t}</h4>
                  <p>{i.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOCUMENTS ===== */}
      <section className="section section-alt" id="documents">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Keep these ready</div>
            <h2>Documents Required</h2>
            <p>A simple, well-organised checklist — our TM attorneys verify everything before filing.</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="dcol">
                <h4><i className="bx bx-id-card" /> For the Applicant</h4>
                <ul>{DOCS_APPLICANT.map((d) => <li key={d}><i className="bx bx-check" /> {d}</li>)}</ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dcol">
                <h4><i className="bx bx-purchase-tag" /> For the Brand / Mark</h4>
                <ul>{DOCS_MARK.map((d) => <li key={d}><i className="bx bx-check" /> {d}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section" id="process">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Simple & transparent</div>
            <h2>The Trademark Process</h2>
            <p>From a free brand search to your ® certificate — a dedicated manager updates you at every stage.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {PROCESS.map((s, idx) => (
              <div className="col" key={s.t}>
                <div className={"tstep" + (s.done ? " done" : "")}>
                  <div className="num">{s.done ? <i className="bx bx-check" /> : idx + 1}</div>
                  <div className="day">{s.day}</div>
                  <h4>{s.t}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section section-alt" id="pricing">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">No hidden charges</div>
            <h2>Transparent Pricing</h2>
            <p>All prices are professional / platform fees. Government fee & GST are charged at actuals and vary by applicant type (MSME / Startup / Individual vs Company / LLP). Launch offer.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {PLANS.map((p) => (
              <div className="col" key={p.cta}>
                <div className={"vk-plan" + (p.feat ? " feat" : "")}>
                  {p.badge && <span className="badge-pop">{p.badge}</span>}
                  <span className="tier">{p.tier}</span>
                  <div className="price">₹{p.price}<small> + govt fee & GST</small></div>
                  <span className="gst"><s>₹{p.was}</s> · {p.note}</span>
                  <ul>{p.feats.map((f) => <li key={f}><i className="bx bx-check" /> {f}</li>)}</ul>
                  <p className="plan-for">{p.bestfor}</p>
                  <a className={"btn " + (p.feat ? "btn-gold" : "btn-ghost2")} href="#enquiry">{p.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="section" id="compare">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">Choose the right plan</div>
            <h2>Compare Trademark Plans</h2>
            <p>All prices are professional / platform fees · Government fee & GST additional · Launch offer.</p>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered cmp-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Features</th>
                  {CMP_HEAD.map((c) => (
                    <th key={c.name} className={c.hl ? "hl" : ""}>{c.name}<br /><small>{c.price}</small></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP_ROWS.map(([label, vals]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={(CMP_HEAD[i].hl ? "hl " : "") + (v ? "yes" : "")}>{v ? "✓" : "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section section-alt" id="whyus">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow">The Vakilkaro advantage</div>
            <h2>Why 10,000+ Brands Choose Us</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
            {WHY.map((w) => (
              <div className="col" key={w.t}>
                <div className="wcard">
                  <div className="ic"><i className={"bx " + w.ic} /></div>
                  <h4>{w.t}</h4>
                  <p>{w.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="sec-head"><div className="eyebrow">Loved by brands</div><h2>What Our Clients Say</h2></div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {TESTIMONIALS.map((t) => (
              <div className="col" key={t.n}>
                <div className="tcard">
                  <div className="stars">★★★★★</div>
                  <p>&ldquo;{t.q}&rdquo;</p>
                  <div className="who"><div className="av">{t.av}</div><div><b>{t.n}</b><small>{t.r}</small></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="sec-head"><div className="eyebrow">Got questions?</div><h2>Frequently Asked Questions</h2></div>
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            {FAQS.map((f, i) => (
              <div className={"qa" + (openFaq === i ? " open" : "")} key={f.q}>
                <button className="q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q} <i className="bx bx-plus" />
                </button>
                {openFaq === i && <div className="a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container">
          <div className="ctaband">
            <h2>Ready to protect your brand?</h2>
            <p>Get a free brand & class search with a Vakilkaro TM expert today — filing guaranteed within 24 hours.</p>
            <div className="cta-row">
              <a className="btn btn-gold" href="#enquiry"><i className="bx bx-paper-plane" /> Get Started Now</a>
              <a className="btn btn-ghost2" href="tel:+919828123489" style={{ borderColor: "rgba(255,255,255,.3)", color: "#fff" }}><i className="bx bxs-phone" /> Call an Expert</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <img
                src="/Logo.png"
                alt="Vakilkaro"
                style={{
                  height: "50px",
                  width: "auto",

                  display: "block"
                }}
              />
              <p className="about-f mt-3">India's trusted legaltech partner for trademark, company, NGO and tax registrations — making compliance simple, transparent and fast.</p>
            </div>
            <div className="col-6 col-lg-3">
              <h5>Services</h5>
              <a href="/">Trademark Registration</a>
              <a href="pvt-ltd">Private Limited Company</a>
              <a href="farmer-producer-company">Farmer-Producers Company</a>
              <a href="section-8">Section 8 / NGO</a>
            </div>
            <div className="col-6 col-lg-2">
              <h5>Company</h5>
              <a href="#about">About Us</a>
              <a href="#whyus">Why Vakilkaro</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQs</a>
            </div>
            <div className="col-lg-2">
              <h5>Contact</h5>
              <a href="tel:+919828123489"><i className="bx bxs-phone" /> +91 9828123489</a>
              <a href="mailto:help@vakilkaro.co.in"><i className="bx bx-envelope" /> help@vakilkaro.co.in</a>
            </div>
          </div>
          <div className="fbar">
            <span>© 2026 Vakilkaro. All rights reserved.</span>
            <span>Privacy Policy · Terms of Use · Refund Policy</span>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING ELEMENTS ===== */}
      <div className="float-bar">
        <a className="btn btn-ghost2" href="tel:+919828123489"><i className="bx bxs-phone" /> Call</a>
        <a className="btn btn-gold" href="#enquiry"><i className="bx bx-paper-plane" /> Free Consultation</a>
      </div>
      <a className="callback-tab" href="#enquiry"><i className="bx bx-phone-call" /> Request Callback</a>
      <a className="wa-fab" href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><i className="bx bxl-whatsapp" /></a>

      {/* ===== LOGIN MODAL ===== */}
      {showLogin && (
        <div className="lm-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}>
          <div className="lm">
            <div className="lm-head">
              <button className="lm-close" onClick={() => setShowLogin(false)} aria-label="Close">×</button>
              <span className="lm-coin"><i className="bx bxs-coin" /> VakilCoins Wallet</span>
              <h3>Customer Login</h3>
              <p>Access your VakilCoins, redeem rewards & track your filings.</p>
            </div>
            <div className="lm-body">
              <div className="lm-tabs">
                <button className={loginTab === "otp" ? "active" : ""} onClick={() => setLoginTab("otp")}>Login with OTP</button>
                <button className={loginTab === "pwd" ? "active" : ""} onClick={() => setLoginTab("pwd")}>Password</button>
              </div>
              {loginTab === "otp" ? (
                <form onSubmit={(e) => { e.preventDefault(); alert("Connect this to your login / VakilCoins wallet backend."); }}>
                  <label className="form-label">Mobile Number</label>
                  <div className="phone-wrap mb-3">
                    <span className="phone-cc">+91</span>
                    <input className="form-control" inputMode="numeric" maxLength={10} placeholder="Registered mobile" />
                  </div>
                  <button className="btn btn-gold w-100"><i className="bx bx-mobile-vibration" /> Send OTP</button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); alert("Connect this to your login / VakilCoins wallet backend."); }}>
                  <label className="form-label">Email or Mobile</label>
                  <input className="form-control mb-2" placeholder="you@company.com" />
                  <label className="form-label">Password</label>
                  <input className="form-control mb-3" type="password" placeholder="Your password" />
                  <button className="btn btn-gold w-100"><i className="bx bx-log-in" /> Login to Wallet</button>
                </form>
              )}
              <div className="lm-note"><i className="bx bx-lock-alt" /> Secured login · your data is encrypted</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
