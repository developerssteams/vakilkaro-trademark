"use client";

import { useState, useRef, useEffect } from "react";


/* ---------------- data ---------------- */
const STATS = [
    { value: "10,000", pl: "+", label: "Companies Incorporated" },
    { value: "14", pl: "", label: "Avg. Days to Incorporate" },
    { value: "200", pl: "+", label: "CA / CS Experts" },
    { value: "98", pl: "%", label: "On-Time Filing Rate" },
];

const BENEFITS = [
    { ic: "bx-shield-quarter", t: "Limited Liability", p: "Your personal assets stay protected — liability is limited to the capital you invest in the company." },
    { ic: "bx-trending-up", t: "Easy Fundraising", p: "VCs, angel investors and banks strongly prefer Pvt Ltd companies, making capital easier to raise." },
    { ic: "bx-buildings", t: "Separate Legal Entity", p: "The company can own property, open bank accounts and sue or be sued in its own name." },
    { ic: "bx-medal", t: "Higher Credibility", p: "MCA registration and 'Pvt Ltd' status build instant trust with clients, vendors and partners." },
    { ic: "bx-refresh", t: "Perpetual Succession", p: "The company exists independently — its life is unaffected by changes in ownership or directors." },
    { ic: "bx-rocket", t: "Startup India Benefits", p: "Eligible for tax holidays, easier compliance and government schemes under Startup India." },
];

const IDEAL = [
    { ic: "bx-bulb", t: "Startups", p: "Planning to raise funding from investors or VCs." },
    { ic: "bx-store", t: "Growing SMEs", p: "Businesses scaling operations and adding partners." },
    { ic: "bx-laptop", t: "Tech & SaaS", p: "Product companies needing ESOPs and equity structure." },
    { ic: "bx-globe", t: "NRIs & Foreigners", p: "100% FDI allowed via the automatic route in most sectors." },
];

const DOCS_MEMBERS = [
    "PAN card of all directors / shareholders",
    "Aadhaar / Voter ID / Passport (ID proof)",
    "Latest passport-size photographs",
    "Email ID & mobile number",
    "Bank statement / utility bill, not older than 2 months",
];
const DOCS_OFFICE = [
    "Recent electricity / utility bill of the premises",
    "Rent agreement (if the office is rented)",
    "No-Objection Certificate (NOC) from the owner",
    "Property ownership proof (if self-owned)",
    "Proposed company name & business objectives",
];

const PROCESS = [
    { day: "Day 1–2", t: "Consultation & DSC", p: "Free expert call, document collection, and Digital Signature Certificates for directors." },
    { day: "Day 3–4", t: "Name Approval", p: "We check availability and reserve your unique company name via SPICe+ Part A." },
    { day: "Day 5–9", t: "MoA, AoA & Filing", p: "Draft the MoA & AoA and submit the integrated SPICe+ form with the MCA." },
    { day: "Day 10–14", t: "Incorporation Certificate", p: "The RoC reviews and issues your Certificate of Incorporation, with PAN & TAN." },
    { day: "Post-reg", t: "Bank A/C & GST", p: "Open your company bank account, register for GST, and start compliance support." },
    { day: "Done!", t: "You're Incorporated", p: "Your Pvt Ltd company is live and ready to do business legally across India.", done: true },
];

const PLANS = [
    { tier: "Consult", price: "999", features: ["1-on-1 call with a company-registration expert", "Personalised structure advice: Pvt Ltd / OPC / LLP", "Full document checklist + clear cost breakdown", "Fee fully adjusted if you proceed with any plan"] },
    { tier: "Basic", price: "2,999", features: ["Private Limited incorporation with the MCA", "Drafting & filing by experienced professionals", "2 Digital Signature Certificates (DSC)", "2 Director Identification Numbers (DIN)", "Company name approval", "MOA & AOA drafting", "Company PAN & TAN", "MCA processing & CIN allotment"] },
    { tier: "Smart", price: "7,999", badge: "MOST POPULAR", features: ["GST registration", "INC-20A commencement of business filing", "ESI & PF registration", "1st Board Resolution documentation", "Consent letter drafting", "1 Trademark application — protect your brand", "A dedicated relationship manager"] },
    { tier: "Master", price: "16,999", features: ["Appointment of the Auditor", "MCA annual return filing + DIR-3 Director KYC", "GST return filing for 12 months", "Basic accounting setup", "Compliance calendar with deadline reminders"] },
    { tier: "Premium", price: "29,999", active: true, features: ["Company Income Tax Return filing", "Financial statements preparation", "Year-round compliance management", "Quarterly business review with an expert", "Priority support"] },
];

const COMPARE = [
    ["Governing Law", "Companies Act, 2013", "LLP Act, 2008", "Companies Act, 2013", "Partnership Act, 1932"],
    ["Min. Members", "2 directors / 2 shareholders", "2 partners", "1 member + 1 nominee", "2 partners"],
    ["Limited Liability", "Yes", "Yes", "Yes", "No"],
    ["Fundraising (VC / Angel)", "Best suited", "Difficult", "Limited", "Not possible"],
    ["Credibility", "Highest", "High", "Moderate", "Low"],
    ["Compliance", "Moderate–High", "Low", "Moderate", "Low"],
    ["Ideal For", "Startups & scale-ups", "Professional firms", "Solo founders", "Small local business"],
];

const WHY = [
    { ic: "bx-user-voice", t: "Dedicated Experts", p: "A personal CA/CS manager from start to incorporation." },
    { ic: "bx-rupee", t: "Transparent Pricing", p: "Flat fees, government charges at actuals — zero surprises." },
    { ic: "bx-time-five", t: "On-Time Filing", p: "Most companies incorporated in 7–14 working days." },
    { ic: "bx-support", t: "Lifetime Support", p: "Compliance, GST and bookkeeping help after you register." },
];

const TESTIMONIALS = [
    { av: "AM", n: "Arjun Mehta", r: "SaaS Startup, Bengaluru", q: "Incorporated our startup in just 11 days. The team handled DSC, name approval and GST end to end — completely hassle-free." },
    { av: "PK", n: "Priya Kapoor", r: "D2C Brand, Jaipur", q: "Transparent pricing and a dedicated CS manager who answered every doubt. Highly recommend Vakilkaro for Pvt Ltd registration." },
    { av: "RV", n: "Rahul Verma", r: "NRI Founder, Dubai", q: "As an NRI I expected it to be complex, but everything was done online with video verification. Got my COI without any trips to India." },
];

const FAQS = [
    { q: "How long does Pvt Ltd registration take?", a: "With complete and verified documents, registration is typically completed in 7–14 working days, depending on MCA and RoC processing times." },
    { q: "How many people are required to start a Pvt Ltd?", a: "A minimum of 2 directors and 2 shareholders (they can be the same individuals). At least one director must be a resident of India." },
    { q: "Is there a minimum capital requirement?", a: "No. You can start a Private Limited Company with as little as ₹1 in paid-up capital and increase your authorised capital later as your business grows." },
    { q: "What is included in your registration fee?", a: "Our packages include name approval, DSC & DIN for directors, MoA/AoA drafting, the SPICe+ filing, Certificate of Incorporation, and PAN & TAN. Government fees and stamp duty are billed at actuals." },
    { q: "Can NRIs or foreign nationals register a company in India?", a: "Yes. NRIs and foreign nationals can own up to 100% of a Pvt Ltd company in most sectors via the automatic FDI route. At least one director must be an Indian resident, and the process can be completed online." },
    { q: "What compliance is required after incorporation?", a: "Annual filings (AOC-4, MGT-7), board meetings, an AGM, statutory audit, income tax return and director KYC. Our Master and Premium plans handle all of this for you." },
];

const WA = "https://wa.me/919828123489?text=Hi%20Vakilkaro%2C%20I%20want%20to%20register%20a%20Private%20Limited%20Company";

/* ---------------- component ---------------- */
export default function PvtLtdPage() {
    const [navOpen, setNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [loginTab, setLoginTab] = useState("otp");
    const [activePlan, setActivePlan] = useState(2);

    const [videoVisible, setVideoVisible] = useState(true);
    const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const videoRef = useRef(null);



    const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Private Limited Company Registration", consent: true });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(null);

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
        setDone({
            firstName: form.name.trim().split(" ")[0] || "there",
            refId: "VK-PVT-" + Math.floor(10000 + Math.random() * 89999),
        });
    }
    function openLogin(e) { if (e) e.preventDefault(); setShowLogin(true); }


    // Video drag handlers
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - videoPosition.x,
            y: e.clientY - videoPosition.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setVideoPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch handlers for mobile
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({
            x: touch.clientX - videoPosition.x,
            y: touch.clientY - videoPosition.y
        });
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setVideoPosition({
            x: touch.clientX - dragStart.x,
            y: touch.clientY - dragStart.y
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Autoplay blocked:', err));
        }
    }, []);

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


            {/* ===== FLOATING VIDEO PLAYER ===== */}
            {videoVisible && (
                <div
                    className="floating-video"
                    style={{
                        transform: `translate(${videoPosition.x}px, ${videoPosition.y}px)`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    <div
                        className="video-header"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <span className="video-title">🎬 Private Limited Company Guide</span>
                        <button
                            className="video-close"
                            onClick={() => setVideoVisible(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <video
                        ref={videoRef}
                        src="/multi.mp4"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="video-player"
                    />
                    <div className="video-drag-hint">
                        <i className="bx bx-move"></i> Drag to reposition
                    </div>
                </div>
            )}

            {/* ===== HERO ===== */}
            <header className="hero" id="top">
                <div className="container py-4 py-lg-2">
                    <div className="row align-items-stretch g-4">
                        <div className="col-lg-6 d-flex flex-column">
                            <div className="h2head pt-2 pt-lg-4">
                                <div className="eyebrow">Private Limited Company · Pvt Ltd Registration</div>
                                <h1>Register Your <span className="g">Private Limited Company</span> 100% Online</h1>
                                <p className="h2sub">100% online · Expert CA/CS support · DSC, DIN, PAN, TAN & GST included · incorporation in 7–14 working days.</p>
                            </div>
                            <div className="h2photo flex-grow-1">
                                <div className="ph-frame">
                                    <i className="bx bxs-user ph-ic" />
                                    <span className="ph-note">
                                        Featured Brand Ambassador
                                        <br />
                                        <b>Vishal Malhotra</b>
                                    </span>
                                </div>

                                <img
                                    className="celeb"
                                    src="/vishal.jpeg"
                                    alt="Vishal"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                                <div className="rate-badge">
                                    <div className="rb-top"><b>4.9</b><i className="bx bxs-star" /></div>
                                    <div className="rb-sub">Our ratings from 10,000+<br />customers on <span className="g-logo">Google</span></div>
                                </div>
                                <div className="amb-card">
                                    <small>We are proud to welcome</small>
                                    <div className="amb-big">VISHAL MALHOTRA</div>
                                    <small>as Brand Ambassador of</small>
                                    {/* <span className="amb-logo">Vakil<b>karo</b></span> */}
                                    <img
                                        src="/vakillogo.png"
                                        alt="Vakilkaro"
                                        style={{ height: "30px", width: "auto" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="vk-form w-100" id="enquiry">
                                <span className="ff-pill">Fast Revert</span>
                                {!done ? (
                                    <>
                                        <h3 className="ff-title">Need Help with Company Registration?</h3>
                                        <p className="ff-sub">Fill up the form below — our expert will call you back</p>
                                        <div className="live"><span className="dot" /> 17 founders enquired in the last 24 hrs</div>
                                        <form onSubmit={submit} noValidate>

                                            <div className="mb-2">
                                                <label htmlFor="fullName" className="form-label">
                                                    Full Name <span className="req">*</span>
                                                </label>
                                                <input
                                                    id="fullName"
                                                    className={"form-control" + (errors.name ? " is-invalid" : "")}
                                                    name="name"
                                                    autoComplete="name"
                                                    value={form.name}
                                                    onChange={update}
                                                    placeholder="Enter Your Name"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="email" className="form-label">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    className="form-control"
                                                    name="email"
                                                    autoComplete="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={update}
                                                    placeholder="Enter Your Email"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="phone" className="form-label">
                                                    Mobile Number <span className="req">*</span>
                                                </label>

                                                <div className="phone-wrap">
                                                    <span className="phone-cc">+91</span>
                                                    <input
                                                        id="phone"
                                                        className={"form-control" + (errors.phone ? " is-invalid" : "")}
                                                        name="phone"
                                                        autoComplete="tel"
                                                        inputMode="numeric"
                                                        maxLength={10}
                                                        value={form.phone}
                                                        onChange={(e) =>
                                                            setForm((f) => ({
                                                                ...f,
                                                                phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                                                            }))
                                                        }
                                                        placeholder="Enter Your Phone"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="service" className="form-label">
                                                    Service Required
                                                </label>

                                                <select
                                                    id="service"
                                                    className="form-select"
                                                    name="service"
                                                    value={form.service}
                                                    onChange={update}
                                                >
                                                    <option>Private Limited Company Registration</option>
                                                    <option>One Person Company Registration</option>
                                                    <option>LLP Registration</option>
                                                    <option>NGO Registration</option>
                                                    <option>Trust Registration</option>
                                                    <option>Section 8 Company Registration</option>
                                                </select>
                                            </div>

                                            <div className="form-check consent my-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="consent"
                                                    name="consent"
                                                    checked={form.consent}
                                                    onChange={update}
                                                />

                                                <label className="form-check-label" htmlFor="consent">
                                                    I have read & agree to the <a href="#">Terms</a>, disclaimer &
                                                    refund policy, and am ready to accept calls, SMS & emails.
                                                </label>
                                            </div>

                                            <button className="btn btn-gold w-100 py-2" type="submit">
                                                <i className="bx bx-paper-plane" /> SUBMIT YOUR QUERY
                                            </button>

                                        </form>
                                        <div className="ff-or">or talk to us instantly</div>
                                        <a className="btn btn-wa2 w-100" href={WA} target="_blank" rel="noopener noreferrer"><i className="bx bxl-whatsapp" /> Chat on WhatsApp</a>
                                        <div className="ff-foot">
                                            <span><i className="bx bx-lock-alt" /> 100% Confidential</span>
                                            <span><i className="bx bx-time-five" /> 30-min Callback</span>
                                            <span><i className="bx bx-shield-quarter" /> No Spam</span>
                                        </div>
                                        <p className="ff-price">Incorporation from <b>₹2,999</b> professional fee <span style={{ color: "var(--green)", fontWeight: 700 }}>· + govt fees & GST extra</span></p>
                                    </>
                                ) : (
                                    <div className="ff-success">
                                        <div className="ok"><i className="bx bx-check" /></div>
                                        <h3>Thank you, {done.firstName}!</h3>
                                        <p>Your enquiry is received. A Vakilkaro expert will call you within <b>30 minutes</b> to get your company registered.</p>
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
                            <p className="sub">Every new customer gets a head start with bonus VakilCoins — redeemable as a cash discount on any booking, including your company registration.</p>
                            <div className="coin-step"><div className="n">1</div><div className="tx"><b>Create your profile</b> <span>— earn 200 welcome coins instantly</span></div></div>
                            <div className="coin-step"><div className="n">2</div><div className="tx"><b>Complete your first booking</b> <span>— earn coins on your spend + 500 completion bonus</span></div></div>
                            <div className="coin-step"><div className="n">3</div><div className="tx"><b>Refer a business friend</b> <span>— earn 1,000 coins when they pay their first order</span></div></div>
                            <div className="d-flex gap-3 flex-wrap mt-4">
                                <a className="btn btn-gold" href="#login" onClick={openLogin}><i className="bx bx-wallet" /> Login to your VakilCoins wallet</a>
                            </div>
                            <div className="coins-note">
                                <i className="bx bx-coin-stack"></i>
                                <div>
                                    <strong>Access your VakilCoins wallet</strong>
                                    <span>Redeem rewards, track filings & manage benefits in one place.</span>
                                </div>
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

            {/* ===== ABOUT (Pvt Ltd at a glance) ===== */}
            <section className="section" id="about">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg">
                            <div className="glance">
                                <h4>Pvt Ltd at a glance</h4>
                                <p>Built for credibility, funding and scale — the structure serious founders choose.</p>
                                <div className="glance-row">
                                    <div><b>2</b><small>Min. directors</small></div>
                                    <div><b>₹1</b><small>Min. capital</small></div>
                                    <div><b>7–14</b><small>Working days</small></div>
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
                        <div className="eyebrow">Why register as Pvt Ltd</div>
                        <h2>Benefits of a Private Limited Company</h2>
                        <p>The structure that maximises credibility, protection and funding potential for your business.</p>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {BENEFITS.map((b) => (
                            <div className="col" key={b.t}>
                                <div className="bcard"><div className="ic"><i className={"bx " + b.ic} /></div><h4>{b.t}</h4><p>{b.p}</p></div>
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
                        <h2>Who Should Register a Pvt Ltd?</h2>
                        <p>A Private Limited Company suits founders who want to grow, raise money and build credibility.</p>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                        {IDEAL.map((i) => (
                            <div className="col" key={i.t}>
                                <div className="icard"><div className="ic"><i className={"bx " + i.ic} /></div><h4>{i.t}</h4><p>{i.p}</p></div>
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
                        <p>A simple, well-organised checklist — our experts verify everything before filing your SPICe+ form.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-id-card" /> For Directors & Shareholders</h4>
                                <ul>{DOCS_MEMBERS.map((d) => <li key={d}><i className="bx bx-check" /> {d}</li>)}</ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-building-house" /> For Registered Office</h4>
                                <ul>{DOCS_OFFICE.map((d) => <li key={d}><i className="bx bx-check" /> {d}</li>)}</ul>
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
                        <h2>The Registration Process</h2>
                        <p>End-to-end on the MCA's integrated SPICe+ form. A dedicated manager updates you at every stage.</p>
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
            <section className="section-8" id="pricing">
                <div className="container">
                    <div className="section-8-header text-center">
                        <span className="section-8-eyebrow">NO HIDDEN CHARGES</span>
                        <h2>Our Plans</h2>
                        <p>Pick a plan that matches your stage. Each price is our professional fee — clear and fixed. Government fees & GST are charged separately, only as applicable.</p>
                    </div>

                    <div className="row g-3 section-8-tabs">
                        {PLANS.map((plan, index) => (
                            <div className="col" key={index}>
                                <button
                                    className={`section-8-tab ${activePlan === index ? "active" : ""}`}
                                    onClick={() => setActivePlan(index)}
                                >
                                    {plan.badge && (
                                        <span className="section-8-badge">{plan.badge}</span>
                                    )}
                                    <h3>₹{plan.price}</h3>
                                    <span>{plan.tier}</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="section-8-card">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="section-8-price-wrap">
                                    <h2>₹{PLANS[activePlan].price}</h2>
                                    <span>{PLANS[activePlan].tier}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                                <div className="fee-tooltip-wrap">

                                    <div className="vk-feeno">
                                        Professional fee only — GST & govt. fees

                                        <button
                                            className="vk-i"
                                            type="button"
                                            aria-label="Government fee breakdown"
                                        >
                                            <i className="bx bx-info-circle"></i>
                                        </button>

                                        {" "}extra

                                        <span className="vk-tip" role="tooltip">
                                            <h5>Govt. & statutory fees — billed at actuals</h5>

                                            <ul>
                                                <li>
                                                    <span>Name reservation (MCA)</span>
                                                    <span>~₹1,000</span>
                                                </li>

                                                <li>
                                                    <span>SPICe+ incorporation</span>
                                                    <span>₹0*</span>
                                                </li>

                                                <li>
                                                    <span>Stamp duty (MOA/AOA)</span>
                                                    <span>state-based</span>
                                                </li>

                                                <li>
                                                    <span>PAN & TAN issuance</span>
                                                    <span>~₹131</span>
                                                </li>

                                                <li>
                                                    <span>DSC (per director)</span>
                                                    <span>~₹2,000</span>
                                                </li>


                                            </ul>

                                            <div className="note">
                                                *Nil MCA fee for authorized capital up to ₹15 lakh. Final govt. fees vary by state & capital and are charged at actuals. GST @ 18% applies on our professional fee.
                                            </div>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="section-8-plus">Everything in Basic, plus:</div>
                        <div className="row mt-4">
                            {PLANS[activePlan].features.map((item, i) => (
                                <div className="col-lg-4 col-md-6 mb-3" key={i}>
                                    <div className="section-8-feature">
                                        <i className="bx bx-check-circle"></i>
                                        <span>{item}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="section-8-btns">
                            <a href="#enquiry" className="btn section-8-register-btn">
                                <i className="bx bx-paper-plane"></i> Register Now
                            </a>
                            <a href="#enquiry" className="btn section-8-callback-btn">
                                <i className="bx bx-phone-call"></i> Request a Callback
                            </a>
                        </div>
                    </div>
                    <div className="section-8-note">★ = exclusive value-adds most providers don't include.</div>
                </div>
            </section>

            {/* ===== COMPARISON ===== */}
            <section className="section" id="compare">
                <div className="container">
                    <div className="sec-head">
                        <div className="eyebrow">Choose the right structure</div>
                        <h2>Pvt Ltd vs LLP vs OPC vs Partnership</h2>
                        <p>How the popular business structures in India compare for founders.</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered cmp-table align-middle mb-0">
                            <thead>
                                <tr><th>Parameter</th><th className="hl">Private Limited</th><th>LLP</th><th>OPC</th><th>Partnership</th></tr>
                            </thead>
                            <tbody>
                                {COMPARE.map((row) => (
                                    <tr key={row[0]}>
                                        <td>{row[0]}</td>
                                        <td className="hl">{row[1]}</td>
                                        <td>{row[2]}</td>
                                        <td>{row[3]}</td>
                                        <td>{row[4]}</td>
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
                        <h2>Why 10,000+ Founders Choose Us</h2>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                        {WHY.map((w) => (
                            <div className="col" key={w.t}>
                                <div className="wcard"><div className="ic"><i className={"bx " + w.ic} /></div><h4>{w.t}</h4><p>{w.p}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="news">
                <div className="container">
                    <div className="sec-head">
                        <div className="eyebrow">In the News</div>
                        <h2>Vakilkaro in Media</h2>
                        <p>Trusted by leading publications and media houses across India.</p>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {/* NEWS 1 - Times of India */}
                        <div className="col">
                            <div className="news-card">
                                <div className="news-img">
                                    <img
                                        src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop&crop=center"
                                        alt="Times of India Feature"
                                        loading="lazy"
                                    />
                                    <div className="news-overlay"></div>
                                    <i className="bx bx-news news-icon"></i>
                                    <span className="news-badge">Featured</span>
                                    <span className="news-source-logo">📰 The Times of India</span>
                                </div>
                                <div className="news-body">
                                    <span className="news-source">The Times of India</span>
                                    <h4>Vakilkaro: India's Most Trusted LegalTech for MSMEs</h4>
                                    <p>With over 15,000+ successful trademark registrations, Vakilkaro emerges as the go-to platform for small businesses across 200+ cities.</p>
                                    <a href="#" className="news-link">
                                        Read Full Story <i className="bx bx-right-arrow-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* NEWS 2 - Hindustan Times + Brand Ambassador */}
                        <div className="col">
                            <div className="news-card">
                                <div className="news-img">
                                    <img
                                        src="/vishal_Copy.jpeg"
                                        alt="Vishal Malhotra Brand Ambassador Hindustan Times"
                                        loading="lazy"
                                    />
                                    <div className="news-overlay"></div>
                                    <i className="bx bx-user-check news-icon"></i>
                                    <span className="news-badge">Brand Ambassador</span>
                                    <span className="news-source-logo">📰 Hindustan Times</span>
                                </div>
                                <div className="news-body">
                                    <span className="news-source">Hindustan Times</span>
                                    <h4>Bollywood's Vishal Malhotra Joins Vakilkaro as Brand Face</h4>
                                    <p>Actor and entrepreneur Vishal Malhotra partners with Vakilkaro to spread awareness about intellectual property rights among India's youth.</p>
                                    <a href="#" className="news-link">
                                        Read Full Story <i className="bx bx-right-arrow-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* NEWS 3 - The Hindu BusinessLine */}
                        <div className="col">
                            <div className="news-card">
                                <div className="news-img">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
                                        alt="The Hindu BusinessLine Award"
                                        loading="lazy"
                                    />
                                    <div className="news-overlay"></div>
                                    <i className="bx bx-trophy news-icon"></i>
                                    <span className="news-badge">Award Winner</span>
                                    <span className="news-source-logo">🏆 BusinessLine</span>
                                </div>
                                <div className="news-body">
                                    <span className="news-source">The Hindu BusinessLine</span>
                                    <h4>Top 10 Game-Changing LegalTech Startups of 2025</h4>
                                    <p>Vakilkaro recognized for revolutionizing IP protection with AI-driven solutions, serving 50,000+ MSMEs across India.</p>
                                    <a href="#" className="news-link">
                                        Read Full Story <i className="bx bx-right-arrow-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* NEWS 4 - CNBC Awaaz */}
                        <div className="col">
                            <div className="news-card">
                                <div className="news-img">
                                    <img
                                        src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=400&fit=crop&crop=center"
                                        alt="CNBC Awaaz Interview"
                                        loading="lazy"
                                    />
                                    <div className="news-overlay"></div>
                                    <i className="bx bx-microphone news-icon"></i>
                                    <span className="news-badge">Exclusive</span>
                                    <span className="news-source-logo">📺 CNBC Awaaz</span>
                                </div>
                                <div className="news-body">
                                    <span className="news-source">CNBC Awaaz</span>
                                    <h4>How Vakilkaro is Making Trademark Registration Accessible for All</h4>
                                    <p>In an exclusive interview, founder Anshul shares how AI and automation are helping Indian entrepreneurs protect their brands at just ₹1,499.</p>
                                    <a href="#" className="news-link">
                                        Watch Interview <i className="bx bx-right-arrow-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <a href="#" className="btn btn-gold">
                            <i className="bx bx-news"></i> View All Media Coverage
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section" id="reviews">
                <div className="container">
                    <div className="sec-head"><div className="eyebrow">Loved by founders</div><h2>What Our Clients Say</h2></div>
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
                                <button className="q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q} <i className="bx bx-plus" /></button>
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
                        <h2>Ready to register your Private Limited Company?</h2>
                        <p>Get a free consultation with a Vakilkaro expert today — incorporation in as little as 7 working days.</p>
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
                            {/* ===== SOCIAL ICONS ===== */}
                            <div className="social-icons mt-3">
                                <a href="https://www.facebook.com/allvakilkaro" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/vakilkaro" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-instagram"></i>
                                </a>
                                <a href="https://www.youtube.com/channel/UCQ7bflrB-izpvrKLDR_Nktg" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-youtube"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/vakilkro/" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-linkedin"></i>
                                </a>
                                <a href="https://x.com/vakil_karo" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-twitter"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                    <i className="bx bxl-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <h5>Services</h5>
                            <a href="/">Trademark Registration</a>
                            <a href="pvt-ltd">Private Limited Company</a>
                            <a href="farmer-producer-company">Farmer-Producers Company</a>
                            <a href="section-8">Section 8 / NGO</a>
                            <a href="Limited-Liability-Partnership">Limited Liability Partnership</a>
                            <a href="section8-microfinance">Section 8 Microfinance</a>
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


