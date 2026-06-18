"use client";

import { useState } from "react";


/* ---------------- data ---------------- */
const STATS = [
    { value: "10,000", pl: "+", label: "NGOs & Section 8 Cos. Registered" },
    { value: "18", pl: "", label: "Avg. Days to Incorporate" },
    { value: "200", pl: "+", label: "CA / CS Experts" },
    { value: "98", pl: "%", label: "On-Time Filing Rate" },
];

const BENEFITS = [
    { ic: "bx-receipt", t: "12A & 80G Tax Benefits", p: "The company's income can be exempt under 12A, while donors claim deductions under 80G." },
    { ic: "bx-medal", t: "Higher Credibility", p: "MCA-registered status is trusted by CSR funders, grant agencies and donors over Trusts/Societies." },
    { ic: "bx-wallet-alt", t: "No Minimum Capital", p: "Start your NGO with any amount of capital — there is no minimum prescribed by law." },
    { ic: "bx-shield-quarter", t: "Separate Legal Entity", p: "Limited liability for members; the company can own property and contract in its own name." },
    { ic: "bx-money-withdraw", t: "Stamp Duty Exemption", p: "Section 8 companies enjoy exemption from stamp duty on incorporation in most states." },
    { ic: "bx-globe", t: "CSR & Foreign Funding", p: "Eligible for CSR-1 (corporate CSR funds) and FCRA registration for foreign donations." },
];

const IDEAL = [
    { ic: "bx-heart", t: "NGOs & Foundations", p: "Charitable organisations seeking donations & grants." },
    { ic: "bx-book-open", t: "Education & Research", p: "Schools, academies and research/science bodies." },
    { ic: "bx-leaf", t: "Social Enterprises", p: "Mission-led ventures focused on social impact." },
    { ic: "bx-buildings", t: "CSR & Welfare Bodies", p: "Corporate foundations channelling CSR funds." },
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
    "Rent agreement & NOC from owner (if rented)",
    "Proposed name & charitable objectives",
    "Estimated 3-year income & expenditure statement",
    "Brief note on proposed work & grounds for the application",
];

const PROCESS = [
    { day: "Day 1–2", t: "Consultation & DSC", p: "Free expert call, document collection, and Digital Signature Certificates for directors." },
    { day: "Day 3–5", t: "Name Approval", p: "We check availability and reserve your unique NGO name via SPICe+ Part A." },
    { day: "Day 6–10", t: "Licence & MoA/AoA", p: "Draft MoA (INC-13) & AoA and file the Section 8 licence application with declarations." },
    { day: "Day 11–18", t: "Licence & Incorporation", p: "The RoC grants the Section 8 licence and issues your Certificate of Incorporation, with PAN & TAN." },
    { day: "Post-reg", t: "12A, 80G & Bank A/C", p: "Open your bank account and apply for 12A & 80G tax exemptions with our support." },
    { day: "Done!", t: "Your NGO is Live", p: "Your Section 8 Company is registered and ready to receive donations & grants legally.", done: true },
];

/* incorporation base shared by Growth / Pro / Master */
const BASE = [
    "Register your Section 8 Company at the Ministry of Corporate Affairs",
    "Section 8 licence application",
    "Drafting & filing by experienced professionals",
    "Expert advice and assistance",
    "MCA processing & CIN",
    "Company PAN & TAN",
    "MOA (INC-13) & AOA drafting",
    "Allotment of 2 DINs",
    "2 × Digital Signature Certificates (DSC)",
    "Current account opening support",
];
const GROWTH_ADD = [
    "12A registration (income-tax exemption)",
    "80G registration (donor tax deduction)",
    "NITI Aayog (NGO Darpan) registration",
    "CSR-1 Certificate",
    "MSME / Udyam registration",
    "ISO certification",
    "150 CSR companies data (funding support)",
    "Priority processing & dedicated support",
];
const PRO_ADD = [
    "FCRA consultancy support",
    "Dedicated CA/CS manager",
    "1-year ROC & NGO compliance support",
    "Accounting & Bookkeeping guidance",
];
const SOFTWARE = [
    "Donation management",
    "Member management",
    "Receipt generation",
    "Expense tracking",
    "Accounting support",
    "Staff / user access control",
    "Daily collection reports",
    "MIS reports",
    "Branch management",
    "Secure cloud backup",
];

const PLANS = [
    {
        tier: "Consult",
        price: "999",
        features: [
            "Consultation with NGO expert",
            "Name availability guidance",
            "Registration roadmap"
        ]
    },

    {
        tier: "Basic",
        price: "2,999",
        features: [
            "Section 8 Company incorporation with the MCA",
            "Section 8 licence application",
            "Drafting & filing by experienced professionals",
            "2 Digital Signature Certificates (DSC)",
            "2 Director Identification Numbers (DIN)",
            "Company name approval",
            "MOA (INC-13) & AOA drafting",
            "Company PAN & TAN",
            "MCA processing & CIN allotment"
        ]
    },

    {
        tier: "Smart",
        price: "14,999",
        badge: "MOST POPULAR",
        features: [
            "12A registration",
            "80G registration",
            "NITI Aayog registration",
            "CSR-1 Certificate",
            "Current account opening support",
            "ISO certification ★"
        ]
    },

    {
        tier: "Master",
        price: "24,999",
        features: [
            "Everything in Smart",
            "NGO Darpan",
            "CSR Funding Guidance",
            "Compliance Support"
        ]
    },

    {
        tier: "Premium",
        price: "29,999",
        active: true,
        features: [
            "Company Income Tax Return filing",
            "Financial statements preparation",
            "Year-round NGO compliance management",
            "Full NGO King software suite ★",
            "Quarterly review with an expert ★",
            "Priority support ★"
        ]
    }
];


const COMPARE = [
    ["Governing Law", "Companies Act, 2013", "Indian Trusts Act, 1882", "Societies Registration Act, 1860"],
    ["Registering Authority", "Registrar of Companies (RoC)", "Sub-Registrar", "Registrar of Societies"],
    ["Min. Members", "2 directors / 2 members", "2 trustees", "7 members"],
    ["Credibility", "Highest", "Moderate", "Moderate"],
    ["Preferred for CSR / Grants / FCRA", "Best suited", "Limited", "Limited"],
    ["Transparency & Governance", "High", "Low", "Moderate"],
    ["Ideal For", "NGOs seeking grants & CSR", "Private / family charity", "Membership-based welfare"],
];

const WHY = [
    { ic: "bx-user-voice", t: "Dedicated Experts", p: "A personal CA/CS manager from start to incorporation." },
    { ic: "bx-rupee", t: "Transparent Pricing", p: "Flat fees, government charges included — zero surprises." },
    { ic: "bx-task", t: "End-to-End NGO Help", p: "From the Section 8 licence to 12A, 80G & CSR-1." },
    { ic: "bx-support", t: "Lifetime Support", p: "Compliance, accounting and filing help after you register." },
];

const TESTIMONIALS = [
    { av: "SM", n: "Sunita Menon", r: "Education Foundation, Pune", q: "Registered our education foundation as a Section 8 company smoothly. The team also got our 12A and 80G — donors love the tax benefit." },
    { av: "DG", n: "Deepak Gupta", r: "Healthcare NGO, Jaipur", q: "Transparent pricing and a dedicated manager throughout. They handled the Section 8 licence and NGO Darpan end to end." },
    { av: "AR", n: "Ananya Rao", r: "Environment Nonprofit, Bengaluru", q: "We needed CSR-1 to receive corporate funds. Vakilkaro guided us from incorporation to CSR-1 without any hassle." },
];

const FAQS = [
    { q: "How long does Section 8 registration take?", a: "With complete and verified documents, registration — including the Section 8 licence — is typically completed in 10–20 working days, depending on MCA and RoC processing times." },
    { q: "How many people are required to start a Section 8 Company?", a: "A minimum of 2 directors and 2 members (they can be the same individuals). At least one director must be a resident of India." },
    { q: "Is there a minimum capital requirement?", a: "No. A Section 8 Company can be started with any amount of capital — there is no minimum prescribed by law." },
    { q: "Can a Section 8 Company get 12A & 80G?", a: "Yes. After incorporation we help you obtain 12A (exempting the company's income from tax) and 80G (allowing your donors to claim a deduction). These are included in our Growth and Pro plans." },
    { q: "Can it receive CSR or foreign donations?", a: "Yes. With CSR-1 registration it can receive corporate CSR funds, and with FCRA registration (subject to eligibility) it can accept foreign contributions." },
    { q: "Can profits be distributed to members?", a: "No. A Section 8 Company's income and profits must be applied only towards promoting its objectives — no dividend can be distributed to its members." },
];

const WA = "https://wa.me/911141000000?text=Hi%20Vakilkaro%2C%20I%20want%20to%20register%20a%20Section%208%20Company";

/* ---------------- component ---------------- */
export default function Section8Page() {
    const [navOpen, setNavOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [loginTab, setLoginTab] = useState("otp");
    const [activePlan, setActivePlan] = useState(1);

    const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Section 8 Company Registration", consent: true });
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
        // TODO: POST `form` to your CRM / backend here.
        setDone({
            firstName: form.name.trim().split(" ")[0] || "there",
            refId: "VK-S8-" + Math.floor(10000 + Math.random() * 89999),
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
                                <div className="eyebrow">Section 8 Company · NGO / NPO Registration</div>
                                <h1>Register Your <span className="g">Section 8 (NGO) Company</span> Online</h1>
                                <p className="h2sub">100% online · Expert CA/CS support · Section 8 licence, MoA/AoA, plus 12A & 80G guidance · incorporation in 10–20 working days.</p>
                            </div>
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

                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="vk-form w-100" id="enquiry">
                                <span className="ff-pill">Instant Rewards</span>
                                {!done ? (
                                    <>
                                        <h3 className="ff-title">Need Help with Section 8 / NGO Registration?</h3>
                                        <p className="ff-sub">Fill up the form below — our expert will call you back</p>
                                        <div className="live"><span className="dot" /> 17 founders enquired in the last 24 hrs</div>
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
                                                    <option>Section 8 Company Registration</option>
                                                    <option>12A & 80G Registration</option>
                                                    <option>CSR-1 Registration</option>
                                                    <option>FCRA Registration</option>
                                                    <option>Trust / Society Registration</option>
                                                    <option>NGO Compliance Package</option>
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
                                        <p className="ff-price">Section 8 registration from <s>₹19,999</s> <b>₹11,999</b> incl. govt fees <span style={{ color: "var(--green)", fontWeight: 700 }}>· + GST excluded</span></p>
                                    </>
                                ) : (
                                    <div className="ff-success">
                                        <div className="ok"><i className="bx bx-check" /></div>
                                        <h3>Thank you, {done.firstName}!</h3>
                                        <p>Your enquiry is received. A Vakilkaro expert will call you within <b>30 minutes</b> to register your Section 8 Company.</p>
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
                            <p className="sub">Every new customer gets a head start with bonus VakilCoins — redeemable as a cash discount on any booking, including your Section 8 registration.</p>
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
                            <h2 className="serif" style={{ fontSize: 36, margin: "10px 0 14px" }}>What is a Section 8 Company?</h2>
                            <p className="about-body">A Section 8 Company is a non-profit organisation (NPO) registered under Section 8 of the Companies Act, 2013, to promote charitable objectives such as education, art, science, sports, research, social welfare, religion, charity or protection of the environment.</p>
                            <p className="about-body">Its income and profits are applied solely toward its objectives and cannot be distributed as dividend to members. It combines the credibility and governance of a company with the purpose of an NGO.</p>
                            <ul className="about-list">
                                <li><i className="bx bx-check-shield" /> Separate legal entity with limited liability for members</li>
                                <li><i className="bx bx-check-shield" /> Eligible for 12A & 80G income-tax exemptions</li>
                                <li><i className="bx bx-check-shield" /> Preferred for CSR funding, grants & donations over Trusts/Societies</li>
                            </ul>
                        </div> */}
                        <div className="col-lg">
                            <div className="glance">
                                <h4>Section 8 at a glance</h4>
                                <p>The credibility of a company with the purpose of an NGO — built for grants and impact.</p>
                                <div className="glance-row">
                                    <div><b>2</b><small>Min. directors</small></div>
                                    <div><b>Nil</b><small>Min. capital</small></div>
                                    <div><b>10–20</b><small>Working days</small></div>
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
                        <div className="eyebrow">Why register as Section 8</div>
                        <h2>Benefits of a Section 8 Company</h2>
                        <p>The most credible non-profit structure — built for tax benefits, grants and lasting social impact.</p>
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
                        <h2>Who Should Register a Section 8 Company?</h2>
                        <p>Ideal for purpose-driven organisations that want credibility, tax benefits and access to grants.</p>
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
                        <p>A simple, well-organised checklist — our experts verify everything before filing your Section 8 application.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-id-card" /> For Directors & Members</h4>
                                <ul>{DOCS_MEMBERS.map((d) => <li key={d}><i className="bx bx-check" /> {d}</li>)}</ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="dcol">
                                <h4><i className="bx bx-building-house" /> Office & Objective Documents</h4>
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
                        <p>End-to-end on the MCA portal, including the Section 8 licence. A dedicated manager updates you at every stage.</p>
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

                        <span className="section-8-eyebrow">
                            NO HIDDEN CHARGES
                        </span>

                        <h2>Our Plans</h2>

                        <p>
                            Pick a plan that matches your NGO's stage.
                            Each price is our professional fee — clear and fixed.
                            Government fees & GST are charged separately, only as applicable.
                        </p>

                    </div>

                    {/* PLAN TABS */}

                    <div className="row g-3 section-8-tabs">

                        {PLANS.map((plan, index) => (

                            <div className="col" key={index}>

                                <button
                                    className={`section-8-tab ${activePlan === index ? "active" : ""
                                        }`}
                                    onClick={() => setActivePlan(index)}
                                >

                                    {plan.badge && (
                                        <span className="section-8-badge">
                                            {plan.badge}
                                        </span>
                                    )}

                                    <h3>₹{plan.price}</h3>

                                    <span>{plan.tier}</span>

                                </button>

                            </div>

                        ))}

                    </div>

                    {/* DETAIL CARD */}

                    <div className="section-8-card">

                        <div className="row align-items-center">

                            <div className="col-lg-6">

                                <div className="section-8-price-wrap">

                                    <h2>
                                        ₹{PLANS[activePlan].price}
                                    </h2>

                                    <span>
                                        {PLANS[activePlan].tier}
                                    </span>

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
                                                    <span>Section 8 licence + SPICe+</span>
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
                                                    <span>~₹1,000–2,000</span>
                                                </li>

                                                <li>
                                                    <span>12A / 80G filing</span>
                                                    <span>₹0 (online)</span>
                                                </li>
                                            </ul>

                                            <div className="note">
                                                *Nil MCA fee for Section 8 companies. Final govt.
                                                fees vary by state and are charged at actuals.
                                                GST @ 18% applies on our professional fee.
                                            </div>
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <hr />

                        {/* Govt Fees Box */}


                        <div className="section-8-plus">
                            Everything in Basic, plus:
                        </div>

                        <div className="row mt-4">

                            {PLANS[activePlan].features.map((item, i) => (

                                <div
                                    className="col-lg-4 col-md-6 mb-3"
                                    key={i}
                                >

                                    <div className="section-8-feature">

                                        <i className="bx bx-check-circle"></i>

                                        <span>{item}</span>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="section-8-btns">

                            <a
                                href="#enquiry"
                                className="btn section-8-register-btn"
                            >
                                <i className="bx bx-paper-plane"></i>
                                Register Now
                            </a>

                            <a
                                href="#enquiry"
                                className="btn section-8-callback-btn"
                            >
                                <i className="bx bx-phone-call"></i>
                                Request a Callback
                            </a>

                        </div>

                    </div>

                    <div className="section-8-note">
                        ★ = exclusive value-adds most providers don't include.
                    </div>

                </div>

            </section>




            {/* ===== COMPARISON ===== */}
            <section className="section" id="compare">
                <div className="container">
                    <div className="sec-head">
                        <div className="eyebrow">Choose the right structure</div>
                        <h2>Section 8 Company vs Trust vs Society</h2>
                        <p>How the popular non-profit structures in India compare for founders.</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered cmp-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th className="hl">Section 8 Company</th>
                                    <th>Trust</th>
                                    <th>Society</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE.map((row) => (
                                    <tr key={row[0]}>
                                        <td>{row[0]}</td>
                                        <td className="hl">{row[1]}</td>
                                        <td>{row[2]}</td>
                                        <td>{row[3]}</td>
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
                        <h2>Ready to register your Section 8 (NGO) Company?</h2>
                        <p>Get a free consultation with a Vakilkaro expert today — licence & incorporation in as little as 10 working days.</p>
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
                            <p className="about-f mt-3">India's trusted legaltech partner for company, NGO and tax registrations — making compliance simple, transparent and fast.</p>
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