export const siteMeta = {
  heroEyebrow: "Trusted Landscaping Company in Mississauga & the GTA",
  heroTitle:
    "From Lawn Care to Stunning Hardscaping - We Enhance Your Garden Design to Shine",
  heroImage:
    "https://img1.wsimg.com/isteam/getty/2230286265/:/cr=t:18.5%25,l:0%25,w:100%25,h:62.99%25/rs=w:2480,h:1240,cg:true",
  aboutImage:
    "https://img1.wsimg.com/isteam/getty/1447969085/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1920,m",
};

const pexels = (id, width = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
export const about = {
  heading: "About HR Greenroots",
  missionHeading: "Our Mission",
  body: [
    "HR Greenroots Landscaping provides professional landscaping services in the GTA, specializing in lawn care, garden design, and hardscaping. We create beautiful and functional outdoor spaces for both residential and commercial properties.",
    "As a trusted landscaping company in the GTA, we take pride in our reliability, attention to detail, and customer satisfaction. Our goal is to transform your outdoor space into a functional, beautiful, and sustainable area for years to come.",
  ],
  image: "https://img1.wsimg.com/isteam/getty/157421297/:/cr=t:7.43%25,l:0%25,w:100%25,h:74.99%25/rs=w:1200,h:600,cg:true",
};

export const homeProofs = [
  { title: "Safety Promise", text: "We prioritize the safety of your property and our team on every landscaping, hardscaping, and garden design project." },
  { title: "Satisfaction Guaranteed", text: "As a trusted landscaping company in the GTA, we take pride in our reliability, attention to detail, and customer satisfaction." },
  { title: "5 Star Reviews", text: "Our goal is to transform your outdoor space into a functional, beautiful, and sustainable area for years to come." },
];

export const portfolioImages = [
  { src: "https://img1.wsimg.com/isteam/getty/157421297/:/cr=t:7.43%25,l:0%25,w:100%25,h:74.99%25/rs=w:1200,h:600,cg:true", alt: "Curated residential landscaping project" },
  { src: "https://img1.wsimg.com/isteam/getty/2230286265/:/cr=t:18.5%25,l:0%25,w:100%25,h:62.99%25/rs=w:2480,h:1240,cg:true", alt: "Interlocking paver pathway and garden edge" },
  { src: "https://img1.wsimg.com/isteam/getty/1428028931/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023", alt: "Armour stone steps and premium planting" },
  { src: "https://img1.wsimg.com/isteam/getty/1336596245/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023", alt: "Modern retaining wall installation" },
  { src: "https://img1.wsimg.com/isteam/getty/2046873646/:/rs=w:2120,h:1060,cg:true,m/cr=w:2120,h:1060", alt: "Deck services feature" },
  { src: "https://img1.wsimg.com/isteam/getty/2231257779/:/cr=t:14.2%25,l:0%25,w:100%25,h:71.6%25/rs=w:2046,h:1023,cg:true", alt: "Fence installation feature" },
];

export const testimonials = [
  { quote: "As a trusted landscaping company in the GTA, we take pride in our reliability, attention to detail, and customer satisfaction.", source: "About HR Greenroots" },
  { quote: "Our goal is to transform your outdoor space into a functional, beautiful, and sustainable area for years to come.", source: "Our Mission" },
  { quote: "We create beautiful and functional outdoor spaces for both residential and commercial properties.", source: "About HR Greenroots" },
];

export const blog = {
  heading: "Trusted Landscaping Services in Mississauga",
  body: "Trusted landscaping services for your home, including deck building, fence construction, interlocking stone installation, and irrigation systems.",
};

export const contact = {
  heading: "Better yet, see us in person!",
  body: "We love our customers, so feel free to visit during normal business hours to discuss your garden design and hardscaping needs.",
  address: "100 Matheson Blvd E unit 202, Mississauga, ON L4Z 3P8, Canada",
  phoneDisplay: "(647) 915-6507",
  phoneHref: "tel:6479156507",
  whatsapp: "https://wa.me/16479156507",
  instagram: "https://www.instagram.com/hrgreenroots",
  tiktok: "https://www.tiktok.com/@hr.greenroots",
  mapHref: "https://www.google.com/maps/search/?api=1&query=100+Matheson+Blvd+E+unit+202,+Mississauga,+ON+L4Z+3P8,+Canada",
  serviceAreas: "HR GREENROOTS proudly serves Toronto, Mississauga, Brampton, Richmond Hill, North York, Thornhill, Etobicoke, Scarborough, Ajax, Oshawa, Niagara Region, Guelph, Cambridge, Kitchener, London, Newmarket, Aurora, And Barrie providing dependable landscaping services throughout Ontario.",
  hours: [
    { day: "Mon", value: "09:00 a.m. - 05:00 p.m." },
    { day: "Tue", value: "09:00 a.m. - 05:00 p.m." },
    { day: "Wed", value: "09:00 a.m. - 05:00 p.m." },
    { day: "Thu", value: "09:00 a.m. - 05:00 p.m." },
    { day: "Fri", value: "09:00 a.m. - 05:00 p.m." },
    { day: "Sat", value: "Closed" },
    { day: "Sun", value: "Closed" },
  ],
};

export function getServiceImageAlt(service) {
  if (!service) return "Landscaping project image";

  if (service.heroTitle) {
    return service.heroTitle;
  }

  if (service.description) {
    return service.description;
  }

  return `${service.name} landscaping project image`;
}

export const services = [
  {
    slug: "sod-installation",
    name: "Sod Installation",
    layoutVariant: "visual",
    kicker: "Professional Sod Installation in Toronto & the GTA",
    heroTitle: "Roll out a fuller lawn without waiting a full season.",
    heroBody:
      "We prep, grade, and install premium sod so new builds, lawn replacements, and tired yards look finished quickly and root in evenly.",
    image: "https://img1.wsimg.com/isteam/getty/2191240437/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Premium sod installation with proper prep, grading, and aftercare for an instant, healthy lawn.",
    heroFacts: [
      { label: "Best for", value: "Fresh lawns" },
      { label: "Timeline", value: "Fast install" },
      { label: "Focus", value: "Rooting success" },
    ],
    paragraphs: [
      "HR Greenroots installs sod for clients who want an immediate lawn upgrade without waiting through a long regrowth cycle. We begin with proper soil preparation, grading, and leveling so the finished lawn looks smooth and drains the way it should.",
      "We use sod varieties suited to Ontario conditions and install them tightly for a clean finished surface. Whether the yard is brand new or replacing patchy grass, the goal is the same: a healthier lawn that looks complete right away and establishes evenly with the right aftercare.",
    ],
    benefits: [
      {
        title: "Instant curb appeal",
        text: "Fresh sod gives the property a clean, complete look the same day the install is finished.",
      },
      {
        title: "Prep before placement",
        text: "We correct grade issues, loosen the top layer, and prep the base instead of laying over weak conditions.",
      },
      {
        title: "Clear watering handoff",
        text: "You leave with straightforward aftercare guidance so the lawn roots in evenly and stays healthy.",
      },
    ],
    processSteps: [
      {
        title: "Strip and prepare",
        text: "Remove failing turf, improve the topsoil layer, and shape the lawn for drainage and smoothness.",
      },
      {
        title: "Lay and trim",
        text: "Install sod in a tight staggered pattern, trim the edges cleanly, and roll it in for solid contact.",
      },
      {
        title: "Set the lawn up",
        text: "Review watering, early mowing, and settlement expectations so the new lawn establishes properly.",
      },
    ],
    relatedSlugs: ["mulching-garden-beds", "landscape-design", "interlocking-pavers"],
  },
  {
    slug: "interlocking-pavers",
    name: "Interlocking & Pavers",
    layoutVariant: "process",
    kicker: "Interlocking & Paver Installation in Oakville & the GTA",
    heroTitle: "Hardscape surfaces that feel crisp, durable, and built into the site.",
    heroBody:
      "We install driveways, patios, walkways, and pool surrounds with strong base prep, clean edge control, and layouts that hold their finish over time.",
    image: "https://img1.wsimg.com/isteam/getty/2230286265/:/cr=t:18.5%25,l:0%25,w:100%25,h:62.99%25/rs=w:2480,h:1240,cg:true",
    description:
      "Durable interlocking and paver installations for patios, driveways, walkways, and outdoor living areas.",
    heroFacts: [
      { label: "Best for", value: "Patios + drives" },
      { label: "Base", value: "Compacted prep" },
      { label: "Result", value: "Clean lines" },
    ],
    paragraphs: [
      "Interlocking is one of the most visible upgrades on a property, so the finish needs to look sharp and perform well through seasonal weather changes. HR Greenroots installs paver systems for patios, walkways, driveways, and poolside surfaces with proper excavation and a stable compacted base.",
      "We help clients choose patterns, borders, and tones that suit the home and surrounding landscaping instead of forcing a generic layout. The result is a surface that improves circulation, handles daily use, and lifts the overall curb appeal of the property.",
    ],
    benefits: [
      {
        title: "Base-built durability",
        text: "Strong excavation, aggregate prep, and compaction help the finished surface resist shifting and low spots.",
      },
      {
        title: "Sharper circulation",
        text: "Walkways, patios, and driveway layouts are planned to improve how people move through the property.",
      },
      {
        title: "Material match",
        text: "We choose styles, borders, and scale that fit the home instead of treating every project the same.",
      },
    ],
    processSteps: [
      {
        title: "Layout and excavation",
        text: "Confirm the footprint, remove existing material, and excavate to the proper depth for the finished use.",
      },
      {
        title: "Base and setting bed",
        text: "Build the structural base, compact in lifts, and set grade so drainage and stability are handled first.",
      },
      {
        title: "Install and finish",
        text: "Lay the pavers cleanly, secure the edge, compact the surface, and finish the joints for a locked-in look.",
      },
    ],
    relatedSlugs: ["driveway-extensions", "retaining-wall", "stone-work"],
  },
  {
    slug: "deck-services",
    name: "Deck Services",
    layoutVariant: "copy",
    kicker: "Professional Deck Design & Installation in Mississauga & the GTA",
    heroTitle: "Outdoor decks that extend the house in a way that feels natural.",
    heroBody:
      "We design and build deck layouts that support lounging, dining, circulation, and long-term outdoor use without feeling tacked on.",
    image: "https://img1.wsimg.com/isteam/getty/2046873646/:/rs=w:2120,h:1060,cg:true,m/cr=w:2120,h:1060",
    description:
      "Custom residential deck design and installation planned for durability, comfort, and how the backyard will actually be used.",
    heroFacts: [
      { label: "Best for", value: "Outdoor living" },
      { label: "Use", value: "Dining + lounge" },
      { label: "Build", value: "Custom layouts" },
    ],
    paragraphs: [
      "A deck works best when it feels like part of the home instead of an add-on sitting in the yard. HR Greenroots plans deck projects around how clients want to relax, entertain, and move between the house, the lawn, and the rest of the landscape.",
      "We shape the layout, access points, and finish details to suit the property and the level of use the space will get. Whether the project is straightforward or more layered, the goal is a deck that feels comfortable, durable, and well integrated with the backyard around it.",
    ],
    benefits: [
      {
        title: "Better backyard flow",
        text: "Deck placement and stairs are planned around how the yard connects to the home and surrounding landscape.",
      },
      {
        title: "Built for real use",
        text: "We shape the deck around seating, dining, lounging, and access rather than only the footprint.",
      },
      {
        title: "Cleaner integration",
        text: "The finished deck is designed to sit naturally with planting, paving, and the home architecture.",
      },
    ],
    processSteps: [
      {
        title: "Plan the footprint",
        text: "Review how the space will be used, where the deck should sit, and how it should connect back to the house.",
      },
      {
        title: "Build the structure",
        text: "Construct the framing and platform with durability, safety, and clean alignment as the priority.",
      },
      {
        title: "Finish the outdoor room",
        text: "Refine access, edges, and visual integration so the deck feels complete inside the larger backyard plan.",
      },
    ],
    relatedSlugs: ["fence-installation", "landscape-design", "interlocking-pavers"],
  },
  {
    slug: "fence-installation",
    name: "Fence Installation",
    layoutVariant: "process",
    kicker: "Professional Fence Installation in Toronto & the GTA",
    heroTitle: "Privacy, definition, and a cleaner perimeter for the whole yard.",
    heroBody:
      "We install fencing that improves privacy and security while also helping the property feel better finished and more organized.",
    image: "https://img1.wsimg.com/isteam/getty/2231257779/:/cr=t:14.2%25,l:0%25,w:100%25,h:71.6%25/rs=w:2046,h:1023,cg:true",
    description:
      "Residential fence installation for privacy, security, and a cleaner edge around the property.",
    heroFacts: [
      { label: "Best for", value: "Privacy + edge" },
      { label: "Material", value: "Custom fit" },
      { label: "Result", value: "Defined yard" },
    ],
    paragraphs: [
      "Fence installation is not only about boundary lines. The right fence changes how a yard feels by adding privacy, improving security, and creating a more intentional edge around the space. HR Greenroots installs fence systems that work with the layout and style of the property rather than fighting against it.",
      "We help clients choose the right height, material, and configuration for the level of screening and appearance they want. The finished installation is meant to feel sturdy, tidy, and visually connected to the rest of the outdoor work on site.",
    ],
    benefits: [
      {
        title: "Stronger privacy control",
        text: "Fence height, layout, and spacing are chosen around the actual level of screening the property needs.",
      },
      {
        title: "Cleaner property edges",
        text: "A well-installed fence helps the full yard feel more finished, framed, and visually organized.",
      },
      {
        title: "Material-fit decisions",
        text: "We match the fence type to your priorities for durability, maintenance, budget, and look.",
      },
    ],
    processSteps: [
      {
        title: "Confirm layout",
        text: "Review the property line, openings, desired privacy level, and the most appropriate fence style.",
      },
      {
        title: "Set and build",
        text: "Install the structural elements carefully so the fence line stays straight, stable, and consistent.",
      },
      {
        title: "Refine the finish",
        text: "Tighten alignment, gates, transitions, and visual details so the final run reads cleanly across the yard.",
      },
    ],
    relatedSlugs: ["deck-services", "garden-shed", "landscape-design"],
  },
  {
    slug: "retaining-wall",
    name: "Retaining Wall",
    layoutVariant: "process",
    kicker: "Professional Retaining Wall Installation in Mississauga & the GTA",
    heroTitle: "Retaining walls that solve grade problems and still look composed.",
    heroBody:
      "We build retaining walls to manage slopes, hold soil, define levels, and make outdoor areas more usable without losing visual appeal.",
    image: "https://img1.wsimg.com/isteam/getty/1336596245/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Retaining wall installation for slope control, structure, and better use of challenging outdoor grades.",
    heroFacts: [
      { label: "Best for", value: "Grade changes" },
      { label: "Function", value: "Soil support" },
      { label: "Finish", value: "Usable levels" },
    ],
    paragraphs: [
      "Retaining walls become necessary when a slope limits how the space can be used or when the site needs structure to hold soil and create level transitions. HR Greenroots builds walls that address the grade issue first while still contributing to the finished look of the landscape.",
      "The goal is to make the area safer, more stable, and easier to use. Whether the wall supports a planting area, steps, a patio zone, or a yard edge, it should feel integrated into the landscape instead of reading like a purely technical fix.",
    ],
    benefits: [
      {
        title: "Grade control",
        text: "Retaining walls help stabilize slopes and create cleaner level changes where the yard needs support.",
      },
      {
        title: "Better usable space",
        text: "Once grade is controlled, more of the property can support pathways, planting, seating, or lawn.",
      },
      {
        title: "Structured appearance",
        text: "A well-designed wall adds definition and order instead of leaving the yard looking patched together.",
      },
    ],
    processSteps: [
      {
        title: "Assess the grade",
        text: "Review the slope, the retained height, and how the wall will relate to the surrounding layout and drainage.",
      },
      {
        title: "Prepare the base",
        text: "Excavate and build the support system needed for stability before the visible wall face goes in.",
      },
      {
        title: "Build and blend",
        text: "Install the wall cleanly and shape the adjacent space so the finished transition feels intentional.",
      },
    ],
    relatedSlugs: ["interlocking-pavers", "stone-work", "landscape-design"],
  },
  {
    slug: "garden-shed",
    name: "Garden Shed",
    layoutVariant: "copy",
    kicker: "Professional Garden Shed Installation in Toronto & the GTA",
    heroTitle: "Backyard storage that supports the space instead of cluttering it.",
    heroBody:
      "We plan and install garden sheds so tools, equipment, and seasonal items have a proper place without disrupting the look of the yard.",
    image: "https://img1.wsimg.com/isteam/getty/2184831377/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Garden shed planning and installation that improves storage, organization, and the visual order of the backyard.",
    heroFacts: [
      { label: "Best for", value: "Backyard storage" },
      { label: "Use", value: "Tools + equipment" },
      { label: "Result", value: "Cleaner yard" },
    ],
    paragraphs: [
      "A shed can either help the backyard feel organized or make it look more crowded, depending on how it is placed and detailed. HR Greenroots treats shed installation as part of the overall outdoor plan so it supports the space instead of interrupting it.",
      "We look at placement, access, visual balance, and how the structure will sit alongside lawn, planting, fencing, and other backyard elements. The result is storage that solves a practical need while still keeping the yard looking composed.",
    ],
    benefits: [
      {
        title: "More usable storage",
        text: "A dedicated shed keeps tools, maintenance items, and seasonal equipment out of view and easier to manage.",
      },
      {
        title: "Smarter placement",
        text: "We locate the shed where access works well without disrupting circulation or visual balance in the yard.",
      },
      {
        title: "Cleaner backyard feel",
        text: "The install supports a more ordered property instead of adding another object that competes with the landscape.",
      },
    ],
    processSteps: [
      {
        title: "Choose the location",
        text: "Review access, yard layout, and where the shed will sit most naturally in the overall property plan.",
      },
      {
        title: "Prepare the pad",
        text: "Build the support area properly so the structure sits level and stable over time.",
      },
      {
        title: "Finish the integration",
        text: "Refine the approach, edges, and surrounding yard relationship so the shed looks like it belongs there.",
      },
    ],
    relatedSlugs: ["fence-installation", "garden-suites", "mulching-garden-beds"],
  },
  {
    slug: "driveway-extensions",
    name: "Driveway Extensions",
    layoutVariant: "process",
    kicker: "Professional Driveway Extension Installation in the GTA",
    heroTitle: "Extra parking space without making the frontage feel overbuilt.",
    heroBody:
      "We extend driveways with materials and edge details that improve daily function while keeping the front of the home clean and well balanced.",
    image: "https://img1.wsimg.com/isteam/getty/612258092/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Driveway extension installation using hardwearing materials and clean edge control for a more functional frontage.",
    heroFacts: [
      { label: "Best for", value: "Extra parking" },
      { label: "Focus", value: "Front-yard fit" },
      { label: "Build", value: "Clean extension" },
    ],
    paragraphs: [
      "Driveway extensions need to do more than add square footage. They should improve parking and access while still feeling proportionate to the home and front yard. HR Greenroots installs extensions that are shaped around function, drainage, and curb appeal together.",
      "We pay close attention to edging, alignment, and how the new surface transitions into the existing frontage. The finished extension should feel planned from the beginning instead of reading like an afterthought on the side of the driveway.",
    ],
    benefits: [
      {
        title: "Better daily function",
        text: "Extra width or depth helps the property handle more vehicles and easier day-to-day access.",
      },
      {
        title: "Front-yard balance",
        text: "The extension is shaped to suit the house and frontage instead of overwhelming the landscape.",
      },
      {
        title: "Long-term surface stability",
        text: "Base prep, grading, and edge treatment help the extension hold its finish over time.",
      },
    ],
    processSteps: [
      {
        title: "Measure the need",
        text: "Confirm how much additional space is useful and how the extension should sit beside the existing drive.",
      },
      {
        title: "Prepare the footprint",
        text: "Excavate, establish grade, and build the supporting base so the new section performs properly.",
      },
      {
        title: "Blend the finish",
        text: "Install the surface and edges so the extension looks integrated with the original frontage.",
      },
    ],
    relatedSlugs: ["interlocking-pavers", "stone-work", "retaining-wall"],
  },
  {
    slug: "landscape-design",
    name: "Landscape Design",
    layoutVariant: "copy",
    kicker: "Professional Landscape Design in Oshawa & the GTA",
    heroTitle: "Landscape design that gives the whole property a clearer point of view.",
    heroBody:
      "We shape planting, circulation, material choices, and outdoor zones into a plan that feels cohesive before installation even starts.",
    image: "https://img1.wsimg.com/isteam/getty/935097076/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Landscape design services that bring planting, hardscape, and property flow into one intentional plan.",
    heroFacts: [
      { label: "Best for", value: "Full planning" },
      { label: "Includes", value: "Planting + hardscape" },
      { label: "Goal", value: "Cohesive layout" },
    ],
    paragraphs: [
      "Landscape design gives the property a clearer structure before any install decisions are locked in. HR Greenroots plans how movement, planting, grading, materials, and focal areas should work together so the final outdoor space feels coherent instead of pieced together one project at a time.",
      "This service is especially useful when a property needs direction, not just execution. We focus on usability and visual rhythm so the final landscape supports how the space should feel as well as how it should function.",
    ],
    benefits: [
      {
        title: "Clearer decision making",
        text: "A design plan helps materials, planting, and layout choices line up before construction starts.",
      },
      {
        title: "Stronger visual rhythm",
        text: "The property reads more intentionally when circulation, focal points, and planting depth are all considered together.",
      },
      {
        title: "Better long-term coherence",
        text: "Future improvements are easier to phase when the site already has a clear direction.",
      },
    ],
    processSteps: [
      {
        title: "Read the property",
        text: "Review grade, sun, access, problem areas, and how the outdoor space is currently being used.",
      },
      {
        title: "Shape the layout",
        text: "Organize planting, circulation, and feature zones into a plan that feels balanced and practical.",
      },
      {
        title: "Prepare for build",
        text: "Translate the concept into the next-step recommendations that make installation easier and more focused.",
      },
    ],
    relatedSlugs: ["interlocking-pavers", "stone-work", "mulching-garden-beds"],
  },
  {
    slug: "stone-work",
    name: "Stone Work",
    layoutVariant: "visual",
    kicker: "Professional Armour Stone Installation in Oakville & the GTA",
    heroTitle: "Stone elements that bring texture, structure, and permanence to the site.",
    heroBody:
      "We use armour stone and related stonework to define edges, steps, retaining features, and statement moments that feel grounded in the landscape.",
    image: "https://img1.wsimg.com/isteam/getty/157421297/:/cr=t:7.43%25,l:0%25,w:100%25,h:74.99%25/rs=w:1200,h:600,cg:true",
    description:
      "Armour stone and structural stonework for borders, steps, wall features, and stronger outdoor definition.",
    heroFacts: [
      { label: "Best for", value: "Steps + borders" },
      { label: "Material", value: "Natural stone" },
      { label: "Effect", value: "Lasting structure" },
    ],
    paragraphs: [
      "Stone work adds more than durability. It gives the landscape weight, contrast, and a sense of permanence that softer elements alone cannot create. HR Greenroots installs armour stone and related features where the property needs stronger definition, steps, borders, or feature elements.",
      "Because the material is visually prominent, placement and scale matter as much as installation quality. We focus on stonework that fits the site naturally and strengthens the layout instead of feeling oversized or disconnected from the rest of the design.",
    ],
    benefits: [
      {
        title: "Natural structure",
        text: "Stone elements create stronger edges, level changes, and feature moments without looking artificial.",
      },
      {
        title: "Long-wearing material",
        text: "Armour stone handles exposure and use well, making it a reliable choice for outdoor structure.",
      },
      {
        title: "More grounded composition",
        text: "Stone introduces visual weight that helps planting and hardscape areas feel more resolved together.",
      },
    ],
    processSteps: [
      {
        title: "Locate the feature",
        text: "Confirm where stonework will solve a structural or visual need within the overall property layout.",
      },
      {
        title: "Set the base and stone",
        text: "Prepare the support conditions and place the material with stability, alignment, and proportion in mind.",
      },
      {
        title: "Shape the transition",
        text: "Refine the adjoining grade, planting, or paving so the finished feature feels embedded in the landscape.",
      },
    ],
    relatedSlugs: ["retaining-wall", "interlocking-pavers", "landscape-design"],
  },
  {
    slug: "garden-suites",
    name: "Garden Suites",
    layoutVariant: "copy",
    kicker: "Professional Garden Suite Design & Construction in Toronto & the GTA",
    heroTitle: "Detached backyard suites planned as real extensions of the property.",
    heroBody:
      "We help shape garden suite projects so access, footprint, privacy, and surrounding landscape all work together from the start.",
    image: "https://img1.wsimg.com/isteam/getty/157421297/:/cr=t:7.43%25,l:0%25,w:100%25,h:74.99%25/rs=w:1200,h:600,cg:true",
    description:
      "Garden suite design and construction support for backyard living, rental, guest, or office use.",
    heroFacts: [
      { label: "Best for", value: "Backyard suites" },
      { label: "Uses", value: "Guest or rental" },
      { label: "Focus", value: "Site fit" },
    ],
    paragraphs: [
      "Garden suites introduce a much larger program into the backyard, so they need more than a footprint on paper. HR Greenroots looks at how the structure will sit on the site, how it will be approached, and how the surrounding landscape needs to support privacy, usability, and visual balance.",
      "Whether the goal is extra family space, a guest suite, an office, or a rental opportunity, the suite should feel integrated into the property. The outdoor layout around it matters just as much as the structure itself if the finished result is going to work well.",
    ],
    benefits: [
      {
        title: "Stronger site planning",
        text: "Garden suites work better when access, privacy, and yard use are planned alongside the structure.",
      },
      {
        title: "Smarter backyard organization",
        text: "The suite, lawn, walkways, and supporting landscape can be arranged to feel balanced rather than crowded.",
      },
      {
        title: "Better long-term usability",
        text: "Thoughtful placement helps the space function well for guests, family, tenants, or work use over time.",
      },
    ],
    processSteps: [
      {
        title: "Plan the siting",
        text: "Review placement, circulation, visibility, and how the suite should relate to the primary home and yard.",
      },
      {
        title: "Coordinate the footprint",
        text: "Shape the supporting outdoor areas so the structure has a practical and visually coherent setting.",
      },
      {
        title: "Finish the surrounding landscape",
        text: "Refine access, transitions, and exterior context so the suite feels like part of the property plan.",
      },
    ],
    relatedSlugs: ["garden-shed", "landscape-design", "fence-installation"],
  },
  {
    slug: "mulching-garden-beds",
    name: "Mulching & Garden Beds",
    layoutVariant: "visual",
    kicker: "Installation in Richmond Hill & the GTA",
    heroTitle: "Mulched beds and planting areas that make the whole yard read cleaner.",
    heroBody:
      "We refresh garden beds with mulch, edging, and planting-area cleanup so the property looks sharper and stays easier to maintain.",
    image: "https://img1.wsimg.com/isteam/getty/2191240437/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1023",
    description:
      "Mulching and garden bed upgrades for cleaner planting areas, improved moisture retention, and lower-maintenance curb appeal.",
    heroFacts: [
      { label: "Best for", value: "Bed refreshes" },
      { label: "Benefit", value: "Moisture control" },
      { label: "Look", value: "Sharper planting" },
    ],
    paragraphs: [
      "Mulching and garden bed work is often one of the fastest ways to make a property look more cared for. HR Greenroots refreshes planting areas so bed lines read clearly, mulch coverage looks even, and the overall landscape feels tidier and more maintained.",
      "This service also improves function. Mulch helps manage moisture, reduce weed pressure, and protect the soil surface, while a cleaner bed layout makes routine maintenance easier through the season.",
    ],
    benefits: [
      {
        title: "Stronger visual definition",
        text: "Fresh mulch and cleaner bed edges help planting zones stand out in a more polished way.",
      },
      {
        title: "Lower-maintenance beds",
        text: "Mulch helps suppress weeds, retain moisture, and reduce how quickly beds start to look tired again.",
      },
      {
        title: "Fast curb-appeal lift",
        text: "Refreshing the beds often sharpens the whole property without needing a full landscape rebuild.",
      },
    ],
    processSteps: [
      {
        title: "Clean and shape",
        text: "Tidy the bed areas, redefine the layout where needed, and prepare the surface for a consistent finish.",
      },
      {
        title: "Install the mulch",
        text: "Apply the right coverage depth so the beds look even and perform better through the season.",
      },
      {
        title: "Refine the presentation",
        text: "Leave the planting areas looking sharper, more defined, and easier to maintain moving forward.",
      },
    ],
    relatedSlugs: ["sod-installation", "landscape-design", "stone-work"],
  },
];

const serviceGalleryMap = {
  "sod-installation": [
    { src: pexels(5231242), alt: "Fresh sod installation for a healthy green lawn" },
    { src: pexels(5231241), alt: "Professional handling of lawn sod during installation" },
  ],
  "interlocking-pavers": [
    { src: pexels(13980136), alt: "Interlocking concrete pavers detail" },
    { src: pexels(17366750), alt: "Backyard paving stones for hardscape installation" },
  ],
  "deck-services": [
    { src: pexels(33017851), alt: "Wooden backyard deck in a landscaped setting" },
    { src: pexels(12700434), alt: "Finished outdoor deck with seating area" },
  ],
  "fence-installation": [
    { src: pexels(18832449), alt: "Wooden fence in a landscaped yard" },
    { src: pexels(19246179), alt: "Garden pathway bordered by a wooden fence" },
  ],
  "retaining-wall": [
    { src: pexels(16926659), alt: "Stone retaining structure with landscaped steps" },
    { src: pexels(33588656), alt: "Stonework and retaining wall style garden pathway" },
  ],
  "garden-shed": [
    { src: pexels(33719205), alt: "Garden shed nestled in a leafy backyard" },
    { src: pexels(11903184), alt: "Wooden shed in a clean residential backyard" },
  ],
  "driveway-extensions": [
    { src: pexels(8031952), alt: "Residential driveway paving and curb appeal" },
    { src: pexels(4044784), alt: "Wide residential driveway in front of a home" },
  ],
  "landscape-design": [
    { src: pexels(31746754), alt: "Modern landscaped garden with clean pathway design" },
    { src: pexels(34889793), alt: "Urban garden pathway with layered planting" },
  ],
  "stone-work": [
    { src: pexels(18231220), alt: "Stonework steps in a planted garden" },
    { src: pexels(34209689), alt: "Stone pathway and stair detail in a landscaped yard" },
  ],
  "garden-suites": [
    { src: pexels(28674473), alt: "Modern detached backyard shed-style structure" },
    { src: pexels(15822397), alt: "Backyard outbuilding in a landscaped garden" },
  ],
  "mulching-garden-beds": [
    { src: pexels(12029150), alt: "Bark mulch between shrubs and garden edging" },
    { src: pexels(12220735), alt: "Garden beds with healthy shrubs and ground cover" },
  ],
};

services.forEach((service) => {
  service.gallery = service.gallery?.length
    ? service.gallery
    : [
        { src: service.image, alt: getServiceImageAlt(service) },
        ...(serviceGalleryMap[service.slug] ?? []),
      ];
});
export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}





