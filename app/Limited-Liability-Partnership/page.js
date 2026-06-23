"use client";

import { useState } from "react";

/* ---------------- LLP DATA (from your LLP page) ---------------- */
const STATS = [
    { value: "10,000", pl: "+", label: "Businesses Registered" },
    { value: "12", pl: "", label: "Avg. Days to Incorporate" },
    { value: "200", pl: "+", label: "CA / CS Experts" },
    { value: "98", pl: "%", label: "On-Time Filing Rate" },
];

const BENEFITS = [
    { ic: "bx-shield-quarter", t: "Limited Liability", p: "Partners' personal assets stay protected — liability is limited to their agreed contribution." },
    { ic: "bx-rupee", t: "No Minimum Capital", p: "Start with any amount of capital contribution — there is no statutory minimum." },
    { ic: "bx-buildings", t: "Separate Legal Entity", p: "The LLP owns assets, signs contracts and can sue or be sued in its own name." },
    { ic: "bx-check-shield", t: "Lower Compliance", p: "Fewer filings and lower running costs than a private limited company." },
    { ic: "bx-coin-stack", t: "No Dividend Tax", p: "Profit shared with partners is tax-free in their hands — no dividend distribution tax." },
    { ic: "bx-slider-alt", t: "Flexible Structure", p: "Rights, duties and profit-sharing are set freely through the LLP agreement." },
];

const IDEAL = [
    { ic: "bx-briefcase-alt", t: "Professional Firms", p: "CAs, CSs, lawyers, architects & consultants." },
    { ic: "bx-store", t: "Small & Medium Businesses", p: "Service and trading firms wanting a credible structure." },
    { ic: "bx-rocket", t: "Startups (Not VC-Funded)", p: "Founders not raising equity or venture capital." },
    { ic: "bx-group", t: "Family & Joint Ventures", p: "Family businesses and partner-run ventures." },
];

const DOCS_MEMBERS = [
    "PAN card of all partners",
    "Aadhaar / Voter ID / Passport (ID proof)",
    "Latest passport-size photographs",
    "Bank statement / utility bill, not older than 2 months",
    "Email ID & mobile number",
];
const DOCS_OFFICE = [
    "Recent electricity / utility bill of the premises",
    "Rent agreement (if the office is rented)",
    "No-Objection Certificate (NOC) from the owner",
    "Property ownership proof (if self-owned)",
    "Proposed LLP name & business activity",
];

const PROCESS = [
    { day: "Day 1–2", t: "Consultation & DSC", p: "Free expert call, document collection, and Digital Signature Certificates for the partners." },
    { day: "Day 3–5", t: "Name Approval", p: "Reserve a unique LLP name via the RUN-LLP service." },
    { day: "Day 6–10", t: "FiLLiP Filing", p: "File the incorporation form with DPIN allotment for the designated partners." },
    { day: "Day 10–14", t: "Incorporation Certificate", p: "The RoC issues your Certificate of Incorporation with LLPIN, PAN & TAN." },
    { day: "Within 30 days", t: "LLP Agreement (Form 3)", p: "Draft and file the LLP agreement defining rights, duties and profit-sharing." },
    { day: "Done!", t: "You're Incorporated", p: "Your LLP is live and ready to operate legally across India.", done: true },
];

const PLANS = [
    { tier: "Consult", price: "999", features: ["1-on-1 call with an LLP / business-structure expert", "Personalised advice: LLP / Pvt Ltd / Partnership", "Full document checklist + clear cost breakdown", "Fee fully adjusted if you proceed with any plan"] },
    { tier: "Basic", price: "2,999", features: ["LLP incorporation with the MCA (FiLLiP)", "Drafting & filing by experienced professionals", "2 Digital Signature Certificates (DSC)", "2 Designated Partner Identification Numbers (DPIN)", "LLP name approval (RUN-LLP)", "LLP Agreement drafting & filing (Form 3)", "LLP PAN & TAN", "MCA processing & LLPIN allotment"] },
    { tier: "Smart", price: "6,999", badge: "MOST POPULAR", features: ["Current account opening support", "MSME / Udyam registration", "GST registration", "1 Trademark application — protect your brand", "A dedicated relationship manager"] },
    { tier: "Master", price: "13,999", features: ["Annual compliance: Form 11 (Annual Return)", "Form 8 (Statement of Account & Solvency)", "DPIN KYC for partners", "LLP Income Tax Return filing", "Financial statements preparation", "Basic accounting & bookkeeping guidance", "Compliance calendar with deadline reminders"] },
    { tier: "Premium", price: "22,999", active: true, features: ["GST Returns filing — one complete financial year", "Year-round LLP compliance management", "ISO Certificate", "Quarterly business review with an expert", "Priority support"] },
];

const COMPARE = [
    ["Governing Law", "LLP Act, 2008", "Companies Act, 2013", "Partnership Act, 1932", "—"],
    ["Min. Owners", "2 partners", "2 shareholders", "2 partners", "1 owner"],
    ["Limited Liability", "Yes", "Yes", "No", "No"],
    ["Separate Legal Entity", "Yes", "Yes", "No", "No"],
    ["Compliance Burden", "Low–moderate", "High", "Low", "Minimal"],
    ["Equity / VC Fundraising", "Limited", "Easy", "No", "No"],
    ["Ideal For", "Professionals & SMEs", "Startups raising capital", "Small local business", "Solo founders"],
];

const WHY = [
    { ic: "bx-user-voice", t: "Dedicated Experts", p: "A personal CA/CS manager from start to incorporation." },
    { ic: "bx-rupee", t: "Transparent Pricing", p: "Flat fees, government charges at actuals — zero surprises." },
    { ic: "bx-time-five", t: "On-Time Filing", p: "Most LLPs incorporated in 7–14 working days." },
    { ic: "bx-support", t: "Lifetime Support", p: "Compliance, accounting and filings handled after you register." },
];

const TESTIMONIALS = [
    { av: "RM", n: "Rahul Mehta", r: "Consulting LLP, Pune", q: "Registered our consulting LLP in under two weeks. DSCs, name approval and the LLP agreement were all handled smoothly." },
    { av: "PN", n: "Priya Nair", r: "Design Studio LLP, Kochi", q: "Transparent pricing and a manager who guided us through GST and the LLP agreement. Highly recommend." },
    { av: "VS", n: "Vikram Shah", r: "Architecture LLP, Ahmedabad", q: "From documents to incorporation, everything was online. Our architecture LLP was live without a single office visit." },
];

const FAQS = [
    { q: "How long does LLP registration take?", a: "With complete and verified documents, registration is typically completed in 7–14 working days, depending on MCA processing times." },
    { q: "How many partners are required?", a: "A minimum of 2 designated partners, with no upper limit. At least one designated partner must be a resident of India." },
    { q: "Is there a minimum capital requirement?", a: "No. There is no minimum capital — you can start your LLP with any amount of capital contribution." },
    { q: "Does an LLP need an audit?", a: "A statutory audit is required only if annual turnover exceeds ₹40 lakh or the capital contribution exceeds ₹25 lakh." },
    { q: "What annual compliance does an LLP have?", a: "Form 11 (Annual Return) and Form 8 (Statement of Account & Solvency) each year, plus the income tax return. Our Master and Premium plans handle all of this." },
    { q: "LLP or Private Limited — which is better?", a: "An LLP suits professionals and SMEs wanting limited liability with lower compliance; a private limited company suits startups raising equity or VC funding. Our experts will advise based on your goals." },
];

const WA = "https://wa.me/919828123489?text=Hi%20Vakilkaro%2C%20I%20want%20to%20register%20an%20LLP";

/* ---------------- component ---------------- */
export default function LppPage() {
    const [navOpen, setNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [loginTab, setLoginTab] = useState("otp");
    const [activePlan, setActivePlan] = useState(2);

    const [form, setForm] = useState({ name: "", email: "", phone: "", service: "LLP Registration", consent: true });
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
            refId: "VK-LLP-" + Math.floor(10000 + Math.random() * 89999),
        });
    }
    function openLogin(e) { if (e) e.preventDefault(); setShowLogin(true); }

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
                        <div className="col-lg-6 d-flex flex-column">
                            <div className="h2head pt-2 pt-lg-4">
                                <div className="eyebrow">Limited Liability Partnership · LLP Registration</div>
                                <h1>Register Your <span className="g">Limited Liability Partnership</span> 100% Online</h1>
                                <p className="h2sub">100% online · Expert CA/CS support · DSC, DPIN, name approval, LLP agreement, PAN & TAN included · incorporation in 7–14 working days.</p>
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
                                        <h3 className="ff-title">Need Help with LLP Registration?</h3>
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
                                                    <option>Limited Liability Partnership Registration</option>
                                                    <option>Farmer Producer Company Registration</option>
                                                    <option>Producer Company Compliance</option>
                                                    <option>NABARD / SFAC FPO Scheme Support</option>
                                                    <option>GST + Accounting Package</option>
                                                    <option>Co-operative Society Registration</option>
                                                    <option>Other Legal / Tax Service</option>
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
                                        <p>Your enquiry is received. A Vakilkaro expert will call you within <b>30 minutes</b> to get your LLP registered.</p>
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
                            <p className="sub">Every new customer gets a head start with bonus VakilCoins — redeemable as a cash discount on any booking, including your LLP registration.</p>
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

            {/* ===== ABOUT ===== */}
            <section className="section" id="about">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg">
                            <div className="glance">
                                <h4>LLP at a glance</h4>
                                <p>Limited liability with the flexibility of a partnership — ideal for professionals and growing businesses.</p>
                                <div className="glance-row">
                                    <div><b>2</b><small>Min. partners</small></div>
                                    <div><b>₹0</b><small>Min. capital</small></div>
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
                        <div className="eyebrow">Why register an LLP</div>
                        <h2>Benefits of a Limited Liability Partnership</h2>
                        <p>The structure that combines a company's protection with a partnership's simplicity.</p>
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
                        <h2>Who Should Register an LLP?</h2>
                        <p>An LLP suits businesses that want limited liability without heavy compliance.</p>
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
                        <p>A simple, well-organised checklist — our experts verify everything before filing your FiLLiP form.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-id-card" /> For Partners</h4>
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
                        <p>End-to-end on the MCA's FiLLiP form. A dedicated manager updates you at every stage.</p>
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
                                        <button className="vk-i" type="button" aria-label="Government fee breakdown">
                                            <i className="bx bx-info-circle"></i>
                                        </button>
                                        {" "}extra
                                        <span className="vk-tip" role="tooltip">
                                            <h5>Govt. & statutory fees — billed at actuals</h5>
                                            <ul>
                                                <li><span>Name reservation (RUN-LLP)</span><span>~₹200</span></li>
                                                <li><span>FiLLiP incorporation</span><span>capital-based</span></li>
                                                <li><span>LLP Agreement stamp duty</span><span>state-based</span></li>
                                                <li><span>PAN & TAN issuance</span><span>~₹131</span></li>
                                                <li><span>DSC (per partner)</span><span>~₹2,000</span></li>
                                            </ul>
                                            <div className="note">Final govt. fees vary by state & capital contribution and are charged at actuals. GST @ 18% applies on our professional fee.</div>
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
                        <h2>LLP vs Pvt Ltd vs Partnership vs Proprietorship</h2>
                        <p>How the popular business structures compare for founders.</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered cmp-table align-middle mb-0">
                            <thead>
                                <tr><th>Parameter</th><th className="hl">LLP</th><th>Private Limited</th><th>Partnership</th><th>Proprietorship</th></tr>
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
                        <h2>Why Businesses Choose Us</h2>
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
                        <h2>Ready to register your LLP?</h2>
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
                            <p className="about-f mt-3">India's trusted legaltech partner for company, LLP, NGO and tax registrations — making compliance simple, transparent and fast.</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <h5>Services</h5>
                            <a href="/">Trademark Registration</a>
                            <a href="pvt-ltd">Private Limited Company</a>
                            <a href="llp-registration">LLP Registration</a>
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