export const statusColors = {
  binding: "#1d63d5",
  draft: "#fc6906",
  strategy: "#f0b26a",
  general: "#d9c9aa",
  none: "#f00614",
};

export const aggregateCoverage = [
  {
    key: "binding",
    label: "Binding COP instruments",
    count: 5,
    detail:
      "The article identifies five countries with enacted dedicated laws, regulations, or binding COP instruments.",
  },
  {
    key: "draft",
    label: "Draft pathways",
    count: 3,
    detail:
      "Nigeria, Rwanda, and Zimbabwe are described as having draft bill or policy pathways in motion.",
  },
  {
    key: "strategy",
    label: "Strategy or guidelines only",
    count: 3,
    detail:
      "Zambia, Malawi, and Lesotho are identified as having dedicated strategies or guidelines without primary legislative backing.",
  },
  {
    key: "general",
    label: "General legal coverage",
    count: 39,
    detail:
      "The article states that over thirty countries rely on broader cybercrime, penal, or data protection frameworks with only partial relevance.",
  },
  {
    key: "none",
    label: "No identifiable framework",
    count: 5,
    detail:
      "Eritrea, Libya, Gambia, Guinea-Bissau, and Burundi are identified as having no identifiable framework in the brief.",
  },
];

export const countries = [
  {
    name: "Ghana",
    region: "West Africa",
    status: "binding",
    actor: "Cyber Security Authority",
    x: 286,
    y: 392,
    summary:
      "The brief cites Ghana as having a Cybersecurity Act with child-specific provisions and a National COP Framework issued in 2024.",
    instruments: [
      "Cybersecurity Act 2020 with child-specific provisions",
      "National Child Online Protection Framework 2024",
    ],
    flags: ["Platform obligations", "National framework", "Institutional champion"],
    evidence:
      "Ghana is one of the jurisdictions the brief treats as having binding child online safety coverage.",
    opportunity:
      "Use Ghana as a benchmark for institutional mandate, implementation design, and regional peer pressure.",
  },
  {
    name: "Mauritius",
    region: "Southern Africa",
    status: "binding",
    actor: "ICT Authority",
    x: 667,
    y: 613,
    summary:
      "Mauritius is identified as having a telecommunications directive implementing binding child online protection measures in 2025.",
    instruments: ["Telecommunication Directive 4 of 2025"],
    flags: ["Binding directive", "Telecom regulation", "Provider obligations"],
    evidence:
      "The brief places Mauritius inside the enacted or binding-instrument category.",
    opportunity:
      "Surface Mauritius as a model for regulator-led implementation within licensed provider ecosystems.",
  },
  {
    name: "Tanzania",
    region: "East Africa",
    status: "binding",
    actor: "Parliament / child protection law reform",
    x: 544,
    y: 434,
    summary:
      "The article highlights Tanzania’s 2024 Child Protection Laws Miscellaneous Amendments Act as a core acceleration point.",
    instruments: ["Child Protection Laws Miscellaneous Amendments Act 2024"],
    flags: ["Legislative amendment", "Child protection law", "Binding coverage"],
    evidence:
      "Tanzania is used in the brief as a leading example of dedicated legislative movement during 2023 to 2025.",
    opportunity:
      "Position Tanzania as evidence that targeted statutory amendments can move faster than entirely new frameworks.",
  },
  {
    name: "Kenya",
    region: "East Africa",
    status: "binding",
    actor: "Communications Authority / ODPC",
    x: 551,
    y: 396,
    summary:
      "Kenya’s Industry Guidelines for Child Online Protection are treated as binding on licensed ICT providers, even though they are not a standalone statute.",
    instruments: [
      "Industry Guidelines for Child Online Protection and Safety in Kenya",
      "ODPC enforcement activity relating to children’s data",
    ],
    flags: ["Binding guidelines", "Age verification", "DPA involvement"],
    evidence:
      "The brief treats Kenya as having one of the strongest multi-layered systems, while still arguing for consolidation into primary legislation.",
    opportunity:
      "Support implementation and use Kenya to test what a future consolidated COP law should absorb.",
  },
  {
    name: "Cameroon",
    region: "Central Africa",
    status: "binding",
    actor: "Parliament / ANTIC",
    x: 360,
    y: 366,
    summary:
      "Cameroon is cited as having a robust child online protection framework with a 2023 law-level instrument.",
    instruments: ["Law No. 2023/009 on child online protection"],
    flags: ["Binding law", "Francophone momentum", "Institutional champion"],
    evidence:
      "The article uses Cameroon to illustrate the narrowing policy gap in Francophone Africa.",
    opportunity:
      "Use Cameroon as a Francophone peer case for sub-regional harmonisation arguments.",
  },
  {
    name: "Nigeria",
    region: "West Africa",
    status: "draft",
    actor: "National Assembly / coalition pressure",
    x: 315,
    y: 352,
    summary:
      "The brief identifies Nigeria’s Child Online Access Protection Bill HB.244 as having passed the House in December 2025 and awaiting Senate action.",
    instruments: ["Child Online Access Protection Bill HB.244"],
    flags: ["Draft bill", "Coalition model", "High-feasibility priority"],
    evidence:
      "Nigeria is the brief’s clearest high-impact and high-feasibility advocacy target.",
    opportunity:
      "Push the bill through the Senate and connect it to implementation architecture early.",
  },
  {
    name: "Rwanda",
    region: "East Africa",
    status: "draft",
    actor: "Ministerial and policy pathway",
    x: 533,
    y: 417,
    summary:
      "Rwanda is described as having a ministerial order, a five-year action plan, and primary COP legislation reportedly under consideration.",
    instruments: [
      "Ministerial Order on Child Online Protection 2024",
      "Five-Year Action Plan",
    ],
    flags: ["Draft pathway", "Parental consent", "Action plan"],
    evidence:
      "The brief treats Rwanda as part of the next legislative tier behind current binding leaders.",
    opportunity:
      "Support finalisation of primary legislation while protecting the rights-respecting design the article calls for.",
  },
  {
    name: "Zimbabwe",
    region: "Southern Africa",
    status: "draft",
    actor: "Policy development",
    x: 548,
    y: 562,
    summary:
      "Zimbabwe is identified as developing a draft Child Online Protection Policy.",
    instruments: ["Draft Child Online Protection Policy"],
    flags: ["Draft policy", "Emerging pathway", "Southern Africa"],
    evidence:
      "The article places Zimbabwe in the draft-policy category rather than the enacted or strategy-only categories.",
    opportunity:
      "Push for a transition from policy drafting to legal and institutional backing.",
  },
  {
    name: "Zambia",
    region: "Southern Africa",
    status: "strategy",
    actor: "ZICTA / strategy launch",
    x: 500,
    y: 533,
    summary:
      "Zambia launched a National Child Online Protection Strategy for 2025 to 2029 without corresponding primary legislation.",
    instruments: ["National COP Strategy 2025 to 2029"],
    flags: ["Strategy only", "Implementation stage", "National regulator"],
    evidence:
      "The brief treats Zambia as significant movement, but still below the threshold of durable legislative coverage.",
    opportunity:
      "Support implementation while advocating legislative anchoring.",
  },
  {
    name: "Malawi",
    region: "Southern Africa",
    status: "strategy",
    actor: "MACRA / draft strategy",
    x: 534,
    y: 539,
    summary:
      "Malawi is cited as having a draft strategy and a MACRA COP initiative, but no tangible legislative backing yet.",
    instruments: ["Draft National COP Strategy", "MACRA COP Initiative"],
    flags: ["Draft strategy", "Regulatory initiative", "Implementation gap"],
    evidence:
      "The brief places Malawi alongside Zambia and Lesotho in the strategy-first category.",
    opportunity:
      "Advance from strategy language to enforceable obligations and implementation mechanisms.",
  },
  {
    name: "Lesotho",
    region: "Southern Africa",
    status: "strategy",
    actor: "Guidelines pathway",
    x: 516,
    y: 596,
    summary:
      "Lesotho is named as having COP Guidelines from 2024, but not primary legislative backing.",
    instruments: ["COP Guidelines 2024"],
    flags: ["Guidelines only", "Transposed standards", "No statute"],
    evidence:
      "The article uses Lesotho to show that guideline growth does not equal legislative permanence.",
    opportunity:
      "Use the guideline base as a launch point for stronger legal consolidation.",
  },
  {
    name: "South Africa",
    region: "Southern Africa",
    status: "general",
    actor: "Information Regulator / multi-law framework",
    x: 489,
    y: 612,
    summary:
      "South Africa is treated as having an advanced but fragmented system across POPIA, the Cybercrimes Act, the Children’s Act, and related protections.",
    instruments: ["POPIA", "Cybercrimes Act", "Children’s Act", "FPB and regulator actions"],
    flags: ["Advanced framework", "DPA involvement", "Age assurance debate"],
    evidence:
      "The brief argues South Africa is strong in substance but still vulnerable because protections remain fragmented.",
    opportunity:
      "Advocate for a standalone law that consolidates existing protections into a child-specific framework.",
  },
  {
    name: "Senegal",
    region: "West Africa",
    status: "general",
    actor: "DPA directive",
    x: 213,
    y: 320,
    summary:
      "Senegal is used as a key example of data protection authorities issuing children’s data directives in 2024.",
    instruments: ["Children’s data directive 2024"],
    flags: ["DPA entry point", "Francophone momentum", "General framework"],
    evidence:
      "The article highlights Senegal as proof that data protection authorities can become practical COP actors before dedicated laws exist.",
    opportunity:
      "Expand DPA-led rule-setting as a bridge toward stronger national frameworks.",
  },
  {
    name: "Mali",
    region: "West Africa",
    status: "general",
    actor: "DPA directive",
    x: 239,
    y: 315,
    summary:
      "Mali’s 2024 children’s data directive is cited as another example of DPA-led movement in Francophone Africa.",
    instruments: ["Children’s data directive 2024"],
    flags: ["DPA entry point", "Francophone momentum", "General framework"],
    evidence:
      "The brief uses Mali and Senegal together to show an alternative pathway when dedicated COP law is politically harder.",
    opportunity:
      "Push children’s data rules further into design obligations, transparency, and profiling limits.",
  },
  {
    name: "Uganda",
    region: "East Africa",
    status: "general",
    actor: "General law / constitutional risk",
    x: 513,
    y: 411,
    summary:
      "Uganda is cited as a warning that poorly designed online safety provisions can trigger constitutional and rights concerns.",
    instruments: ["Computer Misuse (Amendment) Act 2022"],
    flags: ["Rights risk", "Judicial pushback", "General legal coverage"],
    evidence:
      "The article references a Constitutional Court decision from March 2026 striking down several provisions.",
    opportunity:
      "Use Uganda to insist on proportionality, scope limits, and explicit safeguards in future COP legislation.",
  },
  {
    name: "Ethiopia",
    region: "East Africa",
    status: "general",
    actor: "General legal coverage",
    x: 527,
    y: 360,
    summary:
      "Ethiopia is listed among the large digital economies that rely on broader legal frameworks rather than dedicated COP instruments.",
    instruments: ["General cyber and child protection coverage"],
    flags: ["General framework", "Priority target", "UN CRC leverage"],
    evidence:
      "The brief places Ethiopia in the high-impact, medium-feasibility priority bracket.",
    opportunity:
      "Use February 2026 CRC recommendations to push for dedicated policy or legislation.",
  },
  {
    name: "Djibouti",
    region: "East Africa",
    status: "general",
    actor: "Digital Code",
    x: 539,
    y: 331,
    summary:
      "Djibouti is noted as having adopted a Digital Code in 2025, signalling movement in Francophone legal architecture.",
    instruments: ["Digital Code 2025"],
    flags: ["Digital code", "Francophone development", "General framework"],
    evidence:
      "The article cites Djibouti as part of the broader pattern of Francophone legislative motivation.",
    opportunity:
      "Test whether broad digital codes can be pushed into child-specific obligations rather than remain generic.",
  },
  {
    name: "Gabon",
    region: "Central Africa",
    status: "general",
    actor: "Age verification ordinance",
    x: 372,
    y: 425,
    summary:
      "Gabon’s 2026 social media age verification ordinance is cited as a notable development on age assurance in Francophone Africa.",
    instruments: ["Social Media Age Verification Ordinance 2026"],
    flags: ["Age verification", "Ordinance", "Francophone development"],
    evidence:
      "The brief uses Gabon to show that age verification is emerging, but still highly uneven across the continent.",
    opportunity:
      "Push age verification debates toward rights-respecting technical standards and transparency.",
  },
  {
    name: "Eritrea",
    region: "East Africa",
    status: "none",
    actor: "No identifiable framework",
    x: 541,
    y: 299,
    summary:
      "The article identifies Eritrea as having no identifiable legislation, regulation, or policy framework on child online safety.",
    instruments: ["No identifiable framework named in the brief"],
    flags: ["No framework", "Gap state", "Priority watch"],
    evidence:
      "Eritrea is one of five countries the brief places in the no-framework category.",
    opportunity:
      "Use regional and AU pressure to establish a minimum policy foothold.",
  },
  {
    name: "Libya",
    region: "North Africa",
    status: "none",
    actor: "No identifiable framework",
    x: 430,
    y: 178,
    summary:
      "The brief identifies Libya as having no identifiable child online safety framework in any form.",
    instruments: ["No identifiable framework named in the brief"],
    flags: ["No framework", "Gap state", "North Africa"],
    evidence:
      "Libya is explicitly listed in the article’s no-framework category.",
    opportunity:
      "Establish baseline policy framing before debating design details.",
  },
  {
    name: "Gambia",
    region: "West Africa",
    status: "none",
    actor: "No identifiable framework",
    x: 205,
    y: 328,
    summary:
      "The article identifies Gambia as having no identifiable child online safety legislation, regulation, or policy framework.",
    instruments: ["No identifiable framework named in the brief"],
    flags: ["No framework", "Gap state", "West Africa"],
    evidence:
      "Gambia is named directly in the no-framework group.",
    opportunity:
      "Build the case for a baseline child-protection and digital-rights entry point.",
  },
  {
    name: "Guinea-Bissau",
    region: "West Africa",
    status: "none",
    actor: "No identifiable framework",
    x: 198,
    y: 346,
    summary:
      "Guinea-Bissau is listed as having no identifiable child online safety framework in the brief.",
    instruments: ["No identifiable framework named in the brief"],
    flags: ["No framework", "Gap state", "West Africa"],
    evidence:
      "Guinea-Bissau appears in the article’s no-framework category.",
    opportunity:
      "Use regional harmonisation arguments to build a first formal framework.",
  },
  {
    name: "Burundi",
    region: "East Africa",
    status: "none",
    actor: "No identifiable framework",
    x: 521,
    y: 434,
    summary:
      "The brief identifies Burundi as having no identifiable legislation, regulation, or policy framework on child online safety.",
    instruments: ["No identifiable framework named in the brief"],
    flags: ["No framework", "Gap state", "East Africa"],
    evidence:
      "Burundi is one of the five no-framework jurisdictions in the article.",
    opportunity:
      "Link national agenda-setting to sub-regional standards and AU domestication pressure.",
  },
];

export const timelineEvents = [
  { year: "2020", title: "ITU COP guidelines", accent: "general" },
  { year: "Feb 2024", title: "AU COP Policy adopted", accent: "binding" },
  { year: "2024", title: "Tanzania amendments and Ghana framework", accent: "binding" },
  { year: "2024", title: "Mali and Senegal DPA directives", accent: "draft" },
  { year: "2025", title: "Kenya guidelines and Zambia strategy", accent: "draft" },
  { year: "2026", title: "Gabon ordinance and rights-risk warnings", accent: "none" },
];

export const patterns = [
  {
    eyebrow: "Pattern 01",
    title: "The 2023 to 2025 period produced more dedicated COP action than any prior period cited in the brief.",
    body:
      "The article ties this acceleration to the February 2024 AU policy and stronger UNICEF and ITU engagement. Tanzania, Kenya, and Nigeria are the clearest examples of this concentration effect.",
  },
  {
    eyebrow: "Pattern 02",
    title: "Francophone Africa is narrowing the policy lag through directives, ordinances, and law-level instruments.",
    body:
      "Cameroon, Senegal, Mali, Djibouti, and Gabon are used to show that movement is no longer concentrated only in Anglophone jurisdictions.",
  },
  {
    eyebrow: "Pattern 03",
    title: "Data protection authorities are becoming practical entry points where dedicated COP law is absent.",
    body:
      "The article specifically highlights directives from Mali and Senegal, action from Kenya’s ODPC, and South Africa’s regulator engagement on age assurance.",
  },
  {
    eyebrow: "Pattern 04",
    title: "Continental policy without national domestication remains the brief’s central implementation risk.",
    body:
      "The article uses the Malabo Convention as a cautionary precedent: adoption alone does not produce enforcement or durable domestic alignment.",
  },
];

export const gaps = [
  {
    title: "Platform accountability deficit",
    severity: 5,
    body:
      "Across most of the continent, major platforms operate without binding child-safety obligations designed for local regulatory conditions.",
    where:
      "The brief points to social media, messaging, gaming, and AI-powered services as the highest-risk platform domains.",
    test:
      "A stronger framework needs proportionate platform duties, enforceable obligations, and clear oversight of trust and safety practices.",
  },
  {
    title: "Age verification and child-specific data protection",
    severity: 4,
    body:
      "The article argues that child protection online is structurally weak when age assurance, consent standards, and design obligations remain under-specified.",
    where:
      "Kenya, Gabon, South Africa, and Rwanda are cited as important but uneven reference points.",
    test:
      "A stronger framework needs technical standards, child-specific design limits, transparency requirements, and profiling restrictions.",
  },
  {
    title: "Enforcement and institutional capacity deficit",
    severity: 5,
    body:
      "The brief emphasizes that legal text is only as effective as the institutions tasked with investigation, prosecution, and cross-border coordination.",
    where:
      "Digital forensic capability, judicial competence, and rights-respecting enforcement remain unevenly distributed.",
    test:
      "A stronger framework needs trained investigators, prosecutors, judges, and durable cross-border cooperation mechanisms.",
  },
  {
    title: "Participation and evidence deficit",
    severity: 4,
    body:
      "Children remain largely absent from policy design, and the evidence base remains shallow outside a limited set of regional studies.",
    where:
      "The brief specifically cites the Disrupting Harm studies as the strongest evidence base, but limited in scope.",
    test:
      "A stronger framework needs structured child participation, community consultation, and repeated Africa-specific research cycles.",
  },
  {
    title: "Digital literacy and prevention",
    severity: 3,
    body:
      "The article argues that legal frameworks remain reactive unless prevention, education, and community capacity are built into the policy response.",
    where:
      "Several strategies mention literacy, but systematic curriculum integration remains largely absent.",
    test:
      "A stronger framework needs child-facing, parent-facing, and educator-facing digital safety programming with institutional backing.",
  },
];

export const drivers = [
  {
    title: "International organisations",
    body:
      "UNICEF, the Council of Europe, and the ITU are described as catalytic actors across countries with advanced frameworks.",
  },
  {
    title: "Institutional champions",
    body:
      "The article identifies regulators and agencies in Ghana, Kenya, Cameroon, Zambia, and South Africa as examples of mandate-backed champions.",
  },
  {
    title: "Coalition pressure",
    body:
      "Coalition-based advocacy and technical partnerships are described as more effective than generic appeals to government.",
  },
];

export const barriers = [
  {
    title: "Competing legislative priorities",
    body:
      "The brief argues COP often loses political bandwidth unless it is framed as a child protection, public health, and productivity issue.",
  },
  {
    title: "Regulatory capture and platform lobbying",
    body:
      "Platform accountability provisions are identified as some of the most politically contested parts of digital legislation.",
  },
  {
    title: "Surveillance and rights concerns",
    body:
      "Uganda, Nigeria, and South Sudan are used as warnings that poorly designed online safety law can be weaponised against rights and civic space.",
  },
];

export const recommendations = [
  {
    id: "civil-society",
    label: "Civil Society",
    items: [
      {
        title: "Prioritise domestication of the AU COP Policy",
        rationale:
          "The article treats the AU policy as the primary continental mandate that can be translated into national legal architecture.",
        outcome:
          "Country-specific legislative proposals anchored in existing national institutions.",
      },
      {
        title: "Build a national COP coalition modelled on Nigeria’s approach",
        rationale:
          "The brief argues coalition pressure and technical partnership are key ingredients in moving bills and implementation agendas.",
        outcome:
          "Broader political support and stronger draft-stage influence.",
      },
      {
        title: "Use DPAs as strategic entry points",
        rationale:
          "Mali and Senegal show that children’s data directives can move even before dedicated COP laws are enacted.",
        outcome:
          "Immediate rule-setting on data practices while primary law catches up.",
      },
      {
        title: "Insist on rights-respecting design",
        rationale:
          "The brief uses Uganda and South Sudan as direct warnings against vague, overbroad, or abuse-prone legal language.",
        outcome:
          "More durable legislation with explicit safeguards for expression, access, and oversight.",
      },
    ],
  },
  {
    id: "au-recs",
    label: "AU / RECs",
    items: [
      {
        title: "Develop an AU COP Policy implementation scorecard",
        rationale:
          "The article argues that public scorekeeping would create competitive pressure and reveal laggards.",
        outcome:
          "A repeatable continental monitoring mechanism.",
      },
      {
        title: "Leverage RECs for sub-regional harmonisation",
        rationale:
          "The brief specifically points to ECOWAS, the EAC, and SADC as institutional routes for reducing regulatory arbitrage.",
        outcome:
          "Stronger regional standards and less fragmented platform oversight.",
      },
    ],
  },
  {
    id: "donors",
    label: "Donors",
    items: [
      {
        title: "Fund implementation, not only legislation",
        rationale:
          "The brief is explicit that implementation capacity is where frameworks often fail.",
        outcome:
          "Digital forensics, training, prosecutorial capacity, and judicial readiness.",
      },
      {
        title: "Commission Africa-specific evidence",
        rationale:
          "The article says the evidence base remains too narrow, especially beyond Eastern and Southern Africa.",
        outcome:
          "A broader and more current understanding of harms, including AI-generated risks and sextortion.",
      },
      {
        title: "Support platform accountability mechanisms",
        rationale:
          "Regulators need technical capacity to evaluate algorithms, moderation, and age-verification systems.",
        outcome:
          "More credible oversight of platform conduct in African contexts.",
      },
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    items: [
      {
        title: "Apply global standards uniformly",
        rationale:
          "The brief argues African users should not wait for local regulatory mandates before receiving stronger child-safety features.",
        outcome:
          "Immediate uplift in baseline platform protections across African markets.",
      },
      {
        title: "Invest in African-language content moderation",
        rationale:
          "The article treats linguistic under-capacity as a major weakness in current trust and safety operations.",
        outcome:
          "Better moderation quality and local relevance in harm detection and response.",
      },
    ],
  },
];

export const priorities = [
  {
    title: "Nigeria",
    x: 78,
    y: 22,
    size: 28,
    ring: "orange",
    body:
      "The brief treats Nigeria as high impact and high feasibility because coalition infrastructure exists and the bill already has visible legislative momentum.",
  },
  {
    title: "Kenya",
    x: 70,
    y: 33,
    size: 24,
    ring: "blue",
    body:
      "Kenya is framed as a strong implementation case where binding guidelines exist but consolidation into primary legislation remains unfinished.",
  },
  {
    title: "South Africa",
    x: 62,
    y: 38,
    size: 24,
    ring: "blue",
    body:
      "South Africa is positioned as a high-value target for consolidation because multiple protections already exist across fragmented laws.",
  },
  {
    title: "DPA engagement",
    x: 58,
    y: 28,
    size: 22,
    ring: "blue",
    body:
      "The brief recommends using functioning data protection authorities as practical rule-setting entry points while broader law develops.",
  },
  {
    title: "Rwanda",
    x: 48,
    y: 47,
    size: 20,
    ring: "orange",
    body:
      "Rwanda sits in the high-impact and medium-feasibility tier because ministerial and planning infrastructure already exists.",
  },
  {
    title: "Malawi",
    x: 40,
    y: 55,
    size: 18,
    ring: "orange",
    body:
      "The brief recommends supporting MACRA and moving from strategy work to associated regulations and stronger legal backing.",
  },
  {
    title: "Ethiopia",
    x: 35,
    y: 42,
    size: 20,
    ring: "red",
    body:
      "Ethiopia is framed as a strategic medium-feasibility target, with the February 2026 CRC recommendations providing leverage.",
  },
  {
    title: "ECOWAS",
    x: 28,
    y: 50,
    size: 20,
    ring: "blue",
    body:
      "The brief recommends an ECOWAS directive as a route to sub-regional harmonisation and reduced regulatory arbitrage.",
  },
  {
    title: "Zambia",
    x: 52,
    y: 58,
    size: 18,
    ring: "orange",
    body:
      "Zambia is identified as an implementation-stage jurisdiction where strategy backing should evolve into legislation.",
  },
  {
    title: "AU scorecard",
    x: 18,
    y: 78,
    size: 20,
    ring: "blue",
    body:
      "A public AU implementation scorecard is treated as a long-term structural tool for pressure, benchmarking, and visibility.",
  },
  {
    title: "Evidence generation",
    x: 34,
    y: 84,
    size: 22,
    ring: "orange",
    body:
      "The brief calls for broader Francophone, Lusophone, and North African evidence generation to close the research gap.",
  },
  {
    title: "Model legislation",
    x: 54,
    y: 88,
    size: 20,
    ring: "blue",
    body:
      "Continental model legislation is treated as a long-term structural asset for consistency and rights-respecting design.",
  },
  {
    title: "Rights-impact reviews",
    x: 74,
    y: 82,
    size: 18,
    ring: "red",
    body:
      "The brief recommends rights-impact assessments of recent cyber laws to identify misuse and overbreadth risks early.",
  },
];

export const methodNotes = [
  {
    title: "Classification note",
    body:
      "This platform preserves the brief’s exact aggregate counts. The brief itself distinguishes between standalone law and robust multi-layered frameworks in a few countries, but also groups five jurisdictions into a top-tier binding or enacted category for summary purposes.",
  },
  {
    title: "Scope note",
    body:
      "The article refers to both 54 AU member states in the state-of-play section and 55 countries in the executive summary. The interface follows the headline figure of 55 AU states reviewed and flags the inconsistency here rather than smoothing it away.",
  },
  {
    title: "Map note",
    body:
      "The interactive map covers the countries explicitly named in the supplied brief text. The companion country-by-country mapping referenced by the brief was not present in the workspace, so unnamed jurisdictions are represented through the exact aggregate counts rather than individually classified on the map.",
  },
  {
    title: "Source note",
    body:
      "All content on this page is derived from the supplied DIID policy brief text and its cited examples. No additional country classifications were inferred beyond what the brief explicitly states.",
  },
];
