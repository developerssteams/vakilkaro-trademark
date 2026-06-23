"use client";

import { useState } from "react";

/* ---------------- Section 8 Microfinance DATA ---------------- */
const STATS = [
    { value: "10,000", pl: "+", label: "Companies Registered" },
    { value: "30", pl: "", label: "Avg. Days to Licence" },
    { value: "200", pl: "+", label: "CA / CS Experts" },
    { value: "98", pl: "%", label: "On-Time Filing Rate" },
];

const BENEFITS = [
    { ic: "bx-shield-quarter", t: "No RBI Registration*", p: "Operate under the RBI's Section 8 exemption — no NBFC-MFI licence or prior approval for small-scale micro-lending." },
    { ic: "bx-rupee", t: "No ₹5 Crore Capital", p: "The ₹5–10 crore net-owned-fund rule for NBFC-MFIs doesn't apply — start with nominal capital." },
    { ic: "bx-buildings", t: "Separate Legal Entity", p: "A registered company that can lend, sign contracts and recover dues in its own name." },
    { ic: "bx-medal", t: "High Credibility", p: "Not-for-profit status builds trust with banks, CSR funders, donors and borrowers." },
    { ic: "bx-donate-heart", t: "Tax & CSR Benefits", p: "Eligible to apply for 12A/80G and to receive CSR funding and grants." },
    { ic: "bx-check-shield", t: "Legal Recovery Rights", p: "Enforce loan agreements and pursue defaulters as a recognised, registered lender." },
];

const IDEAL = [
    { ic: "bx-donate-heart", t: "NGOs & Social Entrepreneurs", p: "Extending financial inclusion to underserved communities." },
    { ic: "bx-group", t: "SHG & JLG Promoters", p: "Lending to self-help and joint-liability groups." },
    { ic: "bx-home-heart", t: "Women & Rural Lending", p: "Focused micro-credit for women and rural households." },
    { ic: "bx-laptop", t: "Fintech & Startup Founders", p: "Building a compliant micro-lending model at low cost." },
];

const DOCS_MEMBERS = [
    "PAN card of all directors / members",
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
    "Proposed name & microfinance objects / vision",
];

const PROCESS = [
    { day: "Day 1–3", t: "Consultation & DSC", p: "Viability check, document collection, and Digital Signature Certificates for directors." },
    { day: "Day 4–7", t: "Name & DIN", p: "Reserve a unique name (no 'Ltd' suffix) and obtain DINs for the directors." },
    { day: "Day 8–20", t: "MoA, AoA & Section 8 Licence", p: "Draft the microfinance & relevant objects and file the Section 8 licence application for you." },
    { day: "Day 21–35", t: "Incorporation Certificate", p: "After the licence, the RoC issues your Certificate of Incorporation with PAN & TAN." },
    { day: "Post-reg", t: "NITI Aayog, Software & Agreements", p: "Set up NGO Darpan, MSME, Finmitra software and loan agreements to start lending." },
    { day: "Done!", t: "You're Ready to Lend", p: "Your Section 8 microfinance company is incorporated, licensed and operational.", done: true },
];

const PLANS = [
    { tier: "Consult", price: "999", features: ["Eligibility & viability assessment for Section 8 microfinance", "Licence, objects, capital & compliance roadmap", "Document checklist + transparent cost break-up", "Fee fully adjusted if you proceed with any package"] },
    { tier: "Licence", price: "90,000", features: ["Section 8 company incorporation (DSC, DIN, name, MoA/AoA, PAN & TAN, COI)", "Microfinance & relevant objects drafted into the MoA", "NITI Aayog (NGO Darpan) registration", "Guidance on RBI micro-lending limits & pricing norms"] },
    { tier: "Launch", price: "1,25,000", badge: "MOST POPULAR", features: ["Loan Agreements Bundle — legally vetted templates", "Growth Agreements Bundle — investor / lender / partner templates", "Board Resolution & Policy pack", "MSME / Udyam registration", "1 Trademark application — protect your brand (govt class fee extra)", "GST registration certificate", "A dedicated relationship manager"] },
    { tier: "Operate", price: "1,50,000", features: ["Annual compliance management — board meetings, minutes & registers", "ROC annual filings & director KYC", "GST return filing", "Compliance calendar with deadline reminders", "Priority support"] },
    { tier: "Fintech", price: "1,90,000", active: true, features: ["Finmitra microfinance software — 1-year licence", "Loan-management & reporting setup on Finmitra", "Year-round legal & regulatory support", "Quarterly business review with an expert", "Priority on-call support"] },
];

const COMPARE = [
    ["RBI Registration", "Not required (exempt)*", "Mandatory", "Not required"],
    ["Min. Capital", "Nil", "₹5 crore (NOF)", "Varies"],
    ["Profit Motive", "Not-for-profit", "For-profit", "Member benefit"],
    ["Setup Cost & Time", "Low–moderate", "High", "Moderate"],
    ["Credibility for CSR / Grants", "High", "High", "Moderate"],
    ["Public Deposits", "Not allowed", "Not allowed", "Allowed (members)"],
    ["Ideal For", "Financial-inclusion founders", "Large-scale lenders", "Local cooperatives"],
];

const WHY = [
    { ic: "bx-user-voice", t: "Dedicated Experts", p: "A personal CA/CS manager from incorporation to licence." },
    { ic: "bx-rupee", t: "Transparent Pricing", p: "Flat professional fee, government charges at actuals." },
    { ic: "bx-been-here", t: "End-to-End Filing", p: "We handle the entire Section 8 licence process for you." },
    { ic: "bx-support", t: "Software + Compliance", p: "Finmitra software, agreements and year-round compliance support." },
];

const TESTIMONIALS = [
    { av: "AK", n: "Anil Kumar", r: "Founder, Lucknow", q: "Got our Section 8 microfinance licence without any RBI hassle. The team handled the entire Section 8 licence process end to end." },
    { av: "MJ", n: "Meena Joshi", r: "Microfinance Director, Indore", q: "The Finmitra software and ready loan agreements meant we started lending to SHGs within days of incorporation." },
    { av: "SR", n: "Suresh Reddy", r: "Social Entrepreneur, Hyderabad", q: "Transparent package pricing and a manager who explained every cost. Highly recommend for anyone starting micro-lending." },
];

const FAQS = [
    { q: "Do I need RBI approval for a Section 8 microfinance company?", a: "No prior RBI approval or NBFC-MFI registration is needed for small-scale micro-lending, under the RBI's Master Circular dated 1 July 2015 (exemption from Sections 45-IA, 45-IB & 45-IC), provided you do not accept public deposits and stay within micro-lending limits. Companies that grow to an asset size of ₹100 crore or more must register as an NBFC-MFI." },
    { q: "Is there a minimum capital requirement?", a: "No. Unlike the ₹5–10 crore net owned fund required for an NBFC-MFI, a Section 8 microfinance company has no statutory minimum capital — you can start with nominal capital." },
    { q: "How long does registration take?", a: "Typically 30–45 working days, since the Section 8 licence and the related filings add time over a standard company incorporation." },
    { q: "How much can we lend, and to whom?", a: "Collateral-free micro-loans to low-income households (broadly, annual household income up to ₹3 lakh), within the RBI's microfinance framework. You must follow the RBI's pricing and interest-rate guidelines and cannot accept public deposits." },
    { q: "Can the company earn income or profit?", a: "It can earn interest income, but as a not-for-profit Section 8 company the surplus must be reinvested toward its objects — profits cannot be distributed as dividends to members." },
    { q: "What does the ₹90,000 registration fee include?", a: "Section 8 incorporation, microfinance & relevant objects in the MoA, the Section 8 licence, plus NITI Aayog registration. Government fees and GST are charged separately. Agreements, trademark, compliance and the Finmitra software are available in the higher packages." },
];

const WA = "https://wa.me/919828123489?text=Hi%20Vakilkaro%2C%20I%20want%20to%20register%20a%20Section%208%20Microfinance%20Company";

/* ---------------- component ---------------- */
export default function Section8MicrofinancePage() {
    const [navOpen, setNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [loginTab, setLoginTab] = useState("otp");
    const [activePlan, setActivePlan] = useState(2);

    const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Section 8 Microfinance Company Registration", consent: true });
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
            refId: "VK-MF-" + Math.floor(10000 + Math.random() * 89999),
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
                                <div className="eyebrow">Section 8 Microfinance · RBI-Exempt Micro-Lending Licence</div>
                                <h1>Register Your <span className="g">Section 8 Microfinance Company</span> 100% Online</h1>
                                <p className="h2sub">Start micro-lending without RBI / NBFC-MFI registration or ₹5 crore capital · expert CA/CS support · end-to-end Section 8 licence &amp; registration.</p>
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
                                        <h3 className="ff-title">Need Help with Microfinance Registration?</h3>
                                        <p className="ff-sub">Fill up the form below — our expert will call you back</p>
                                        <div className="live"><span className="dot" /> 17 promoters enquired in the last 24 hrs</div>
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
                                                    <option>Section 8 Microfinance</option>
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
                                        <p className="ff-price">Registration from <b>₹90,000</b> <span style={{ color: "var(--green)", fontWeight: 700 }}>· + GST &amp; govt fees extra</span></p>
                                    </>
                                ) : (
                                    <div className="ff-success">
                                        <div className="ok"><i className="bx bx-check" /></div>
                                        <h3>Thank you, {done.firstName}!</h3>
                                        <p>Your enquiry is received. A Vakilkaro expert will call you within <b>30 minutes</b> to get your microfinance company registered.</p>
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
                            <p className="sub">Every new customer gets a head start with bonus VakilCoins — redeemable as a cash discount on any booking, including your microfinance company registration.</p>
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
                                <h4>Section 8 Microfinance at a glance</h4>
                                <p>Start regulated micro-lending the low-capital, RBI-exempt way — built for financial-inclusion founders.</p>
                                <div className="glance-row">
                                    <div><b>No RBI</b><small>Prior approval needed*</small></div>
                                    <div><b>₹0</b><small>Min. capital</small></div>
                                    <div><b>2</b><small>Min. directors</small></div>
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
                        <div className="eyebrow">Why the Section 8 route</div>
                        <h2>Benefits of a Section 8 Microfinance Company</h2>
                        <p>The fastest, lowest-cost legal route to start micro-lending for financial inclusion.</p>
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
                        <h2>Who Should Register a Microfinance Company?</h2>
                        <p>The Section 8 route suits mission-driven lenders starting small and scaling responsibly.</p>
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
                        <p>A simple checklist — our experts verify everything before filing your Section 8 licence application.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-id-card" /> For Directors &amp; Members</h4>
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
                        <p>From incorporation to the Section 8 licence — a dedicated manager handles every filing at every stage.</p>
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
                        <span className="section-8-eyebrow">TRANSPARENT PACKAGES</span>
                        <h2>Our Microfinance Packages</h2>
                        <p>Start with the licence, then add the tools you need to lend. Each price is our professional fee — GST and government fees are charged separately, only as applicable.</p>
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
                                        Professional fee — GST extra; govt. fees at actuals
                                        <button className="vk-i" type="button" aria-label="Fee break-up">
                                            <i className="bx bx-info-circle"></i>
                                        </button>
                                        <span className="vk-tip" role="tooltip">
                                            <h5>Govt. & statutory fees — billed at actuals</h5>
                                            <ul>
                                                <li><span>Name reservation (MCA)</span><span>~₹1,000</span></li>
                                                <li><span>Section 8 licence & filing</span><span>at actuals</span></li>
                                                <li><span>Stamp duty (MoA/AoA)</span><span>state-based</span></li>
                                                <li><span>PAN & TAN</span><span>~₹131</span></li>
                                                <li><span>DSC (per director)</span><span>~₹2,000</span></li>
                                            </ul>
                                            <div className="note">Trademark government class fee is billed separately at actuals. GST @ 18% applies on our professional fee.</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="section-8-plus">Everything in {activePlan > 0 ? PLANS[activePlan - 1].tier : "Basic"}, plus:</div>
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
                                <i className="bx bx-paper-plane"></i> Get This Package
                            </a>
                            <a href="#enquiry" className="btn section-8-callback-btn">
                                <i className="bx bx-phone-call"></i> Request a Callback
                            </a>
                        </div>
                    </div>
                    <div className="section-8-note">★ = exclusive value-adds & included extras most providers bill separately.</div>
                </div>
            </section>

            {/* ===== COMPARISON ===== */}
            <section className="section" id="compare">
                <div className="container">
                    <div className="sec-head">
                        <div className="eyebrow">Choose the right route</div>
                        <h2>Section 8 Microfinance vs NBFC-MFI vs Nidhi vs Co-operative</h2>
                        <p>How the routes to start micro-lending in India compare for new founders.</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered cmp-table align-middle mb-0">
                            <thead>
                                <tr><th>Parameter</th><th className="hl">Section 8 Microfinance</th><th>NBFC-MFI</th><th>Co-operative</th></tr>
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
                        <p style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 14, lineHeight: 1.55 }}>
                            *No prior RBI approval is needed for small-scale Section 8 micro-lending under the RBI exemption (Master Circular, 1 July 2015), subject to not accepting public deposits and following RBI pricing norms. Not-for-profit microfinance companies with an asset size of ₹100 crore or more must register as an NBFC-MFI.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== WHY US ===== */}
            <section className="section section-alt" id="whyus">
                <div className="container">
                    <div className="sec-head">
                        <div className="eyebrow">The Vakilkaro advantage</div>
                        <h2>Why Microfinance Founders Choose Us</h2>
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
                    <div className="sec-head"><div className="eyebrow">Loved by microfinance founders</div><h2>What Our Clients Say</h2></div>
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
                        <h2>Ready to start your Section 8 Microfinance Company?</h2>
                        <p>Get a free consultation with a Vakilkaro microfinance expert — licence, software and compliance, all in one place.</p>
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
                            <p className="about-f mt-3">India's trusted legaltech partner for company, microfinance, NGO and tax registrations — making compliance simple, transparent and fast.</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <h5>Services</h5>
                            <a href="/">Trademark Registration</a>
                            <a href="pvt-ltd">Private Limited Company</a>
                            <a href="section-8-microfinance">Section 8 Microfinance</a>
                            <a href="farmer-producer-company">Farmer Producer Company</a>
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