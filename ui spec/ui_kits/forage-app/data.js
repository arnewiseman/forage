// Sample dataset for the Forage UI kit. Structure mirrors the PRD's
// portland-jobs.json / growth-sectors.json. Values here are illustrative.
window.FORAGE_DATA = {
  examples: [
    "I managed ad campaigns and client relationships for 4 years",
    "Line cook, 6 years, ran prep and ordering",
    "Warehouse lead — scheduling, safety, inventory",
    "Bank teller, then small-business loan support"
  ],
  match: {
    title: "Advertising and Promotions Managers",
    code: "11-2011.00",
    summary: "Plan, direct, or coordinate advertising policies and programs, or produce collateral materials to create extra interest in a product or service.",
    skills: [
      { name: "Client relationship management", importance: 88 },
      { name: "Campaign planning", importance: 84 },
      { name: "Budget management", importance: 76 },
      { name: "Vendor negotiation", importance: 71 },
      { name: "Performance reporting", importance: 66 }
    ]
  },
  related: [
    { title: "Marketing Managers", code: "11-2021.00", overlap: 68, why: "Same planning, budget and vendor work — swaps ad buying for product positioning." },
    { title: "Public Relations Managers", code: "11-2032.00", overlap: 61, why: "Keeps the client and press relationships; adds message and crisis handling." },
    { title: "Customer Success Managers", code: "13-1161.01", overlap: 57, why: "Account management transfers almost whole; adds product and renewal metrics." },
    { title: "Market Research Analysts", code: "13-1161.00", overlap: 49, why: "Reporting transfers; needs survey design and more statistics." }
  ],
  gap: {
    have: ["Client relationship management", "Campaign planning", "Budget management", "Performance reporting"],
    missing: ["SQL and data querying", "Product positioning", "Pricing strategy"]
  },
  jobs: [
    { id: 1, role: "Marketing Manager, Retail", org: "Columbia Sportswear", place: "Portland, OR", mode: "Hybrid", type: "Full-time", posted: "3 days ago", pay: "$92k–$118k", match: 82, board: "Greenhouse", desc: "Own seasonal campaign planning across retail channels, manage agency partners and a $2M media budget." },
    { id: 2, role: "Senior Marketing Manager", org: "New Relic", place: "Portland, OR", mode: "Remote", type: "Full-time", posted: "6 days ago", pay: "$120k–$145k", match: 74, board: "Greenhouse", desc: "Lead demand-generation programs; partner with product marketing on positioning and pricing tests." },
    { id: 3, role: "Marketing Program Manager", org: "OHSU", place: "Portland, OR", mode: "On-site", type: "Full-time", posted: "1 week ago", pay: "$78k–$96k", match: 69, board: "Workday", desc: "Coordinate outreach programs for clinical service lines. Heavy stakeholder and vendor coordination." },
    { id: 4, role: "Customer Success Manager", org: "Puppet", place: "Portland, OR", mode: "Hybrid", type: "Full-time", posted: "2 days ago", pay: "$85k–$105k", match: 64, board: "Greenhouse", desc: "Own a book of mid-market accounts through onboarding, adoption and renewal." },
    { id: 5, role: "Communications Manager", org: "Portland Parks & Recreation", place: "Portland, OR", mode: "On-site", type: "Full-time", posted: "2 weeks ago", pay: "$74k–$88k", match: 58, board: "NEOGOV", desc: "Public-facing communications for park programs, events and capital projects." },
    { id: 6, role: "Marketing Coordinator", org: "Dutch Bros", place: "Beaverton, OR", mode: "Hybrid", type: "Contract", posted: "5 days ago", pay: "$32/hr", match: 51, board: "Greenhouse", desc: "Support regional campaign execution, asset trafficking and reporting." }
  ],
  sectors: [
    { name: "Health care & social assistance", growth: 14, openings: "4,100", note: "Largest absolute growth in the Portland metro." },
    { name: "Professional & technical services", growth: 9, openings: "2,350", note: "Marketing, analytics and consulting roles." },
    { name: "Construction", growth: 7, openings: "1,480", note: "Driven by infrastructure and housing starts." },
    { name: "Transportation & warehousing", growth: 5, openings: "1,120", note: "Steady demand for coordination and lead roles." },
    { name: "Manufacturing", growth: 2, openings: "860", note: "Flat overall; semiconductor supply chain is the exception." }
  ],
  resources: [
    { name: "WorkSource Oregon", what: "Free career counseling, iMatchSkills, and training funds", url: "https://www.worksourceoregon.org" },
    { name: "PCC Career Pathways", what: "Short-term certificates, most under 12 months", url: "https://www.pcc.edu" },
    { name: "QualityInfo (Oregon Employment Dept.)", what: "Portland metro occupation and wage data", url: "https://www.qualityinfo.org" }
  ]
};
