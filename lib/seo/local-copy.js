// Per-city local copy. Each entry is a short paragraph that differentiates a
// service x city page from its siblings — references real neighborhoods, soil
// conditions, climate, or local landmarks.
//
// Workflow: AI drafts a starting point per pair, human reviews + edits before
// commit. Empty entries fall back to a region-level paragraph that does NOT
// pretend to be hyperlocal.

export const localCopy = {
  // --- Mississauga (HQ) ---
  "mississauga": "Mississauga is our home base, and we run our crews out of an office on Matheson Blvd East. From Port Credit's lakeside homes to the larger lots in Erin Mills and Streetsville, we work across the city year-round. Mississauga's clay-heavy soil and freeze-thaw cycles shape how we grade lawns, set pavers, and back-fill retaining walls — we account for both in every estimate.",

  // --- Toronto core ---
  "toronto": "Working in Toronto means tighter lots, laneway access, and HOA-style coordination with neighbours. Our crews are used to it — we handle permits where needed, schedule deliveries to avoid blocking driveways, and keep job sites tidy for downtown and midtown homes. Whether you're in the Beaches, High Park, or Forest Hill, we scope each project to the access constraints of your street.",

  "etobicoke": "Etobicoke is one of our most frequent service areas thanks to its proximity to our Mississauga base. The Kingsway and Humber Bay have the larger lots that suit hardscaping projects; Mimico and Long Branch tend to bring smaller-yard refresh work. We're comfortable with either, and our team knows the typical drainage patterns along the lakefront blocks.",

  "north-york": "North York covers a wide stretch from Willowdale through Don Mills and Lawrence Park. We've worked through all of it. The mid-century homes in Bayview Village often need full landscape redesigns to refresh tired front-yards; newer builds in Willowdale tend to want clean modern hardscape. We adapt the visual language to the home — no template plans.",

  "scarborough": "Scarborough's mix of post-war bungalows and newer infill builds means our scope ranges from quick sod refreshes in Agincourt to full backyard rebuilds in Guildwood. The Bluffs neighbourhoods have unique grading challenges we know how to plan around. Highland Creek's mature trees factor into where we can run heavy equipment.",

  // --- York Region ---
  "richmond-hill": "Richmond Hill projects skew toward larger backyard hardscape — patios, retaining walls, and full landscape redesigns. Oak Ridges and Bayview Hill homes often have the lot depth for multi-level designs. We handle the slope grading and water-management work that the area's clay soils demand.",

  "thornhill": "Thornhill sits between Richmond Hill and North York, and our work here tends to mirror both: established homes wanting a refresh, with enough lot to support meaningful hardscape. We can usually fit a full Thornhill project into a single week-long install window.",

  "newmarket": "Newmarket is a regular service area, particularly the newer developments in Summerhill Estates and Stonehaven. Clay-heavy soil and a slightly later spring than the GTA core mean we time projects carefully — we'll schedule installs once the ground has settled to avoid uneven settling later.",

  "aurora": "Aurora is one of the wealthier markets in our service area, and homes in the Hills of St. Andrew often have the kind of lot that justifies a multi-phase landscape plan. We're happy to phase a project over multiple seasons if it suits your budget and use of the property.",

  // --- Durham ---
  "ajax": "Ajax sits along Lake Ontario, and the mix of mature Pickering Village homes and newer Westney Heights builds gives us a range of project types. We coordinate with the longer drive from Mississauga by batching install days where possible — fewer trips, lower disruption to your week.",

  "oshawa": "Oshawa is the eastern edge of our regular GTA work. Northglen and Eastdale have the mature trees and larger lots that suit landscape redesigns; the downtown blocks tend to bring smaller front-yard refreshes. We'll usually combine multiple Oshawa jobs in the same week to keep travel reasonable.",

  // --- Brampton ---
  "brampton": "Brampton's growth has created two distinct markets for us: the established Bramalea homes wanting refreshes, and the newer Mount Pleasant and Springdale builds wanting a clean blank-slate landscape. Heart Lake's larger lots are well suited to multi-element hardscape projects.",

  // --- Halton / Wellington / Waterloo ---
  "guelph": "Guelph is far enough from our base that we focus on larger projects here — full landscape installs, retaining walls, and multi-phase designs that justify the travel. The University area's mature streetscape and South End's newer developments both bring regular work.",

  "cambridge": "Cambridge's three historic cores — Galt, Preston, and Hespeler — each have their own character, and the older streets often need careful planning around mature trees and tighter access. We're set up for this kind of work and have the right small-equipment to manage it.",

  "kitchener": "Kitchener is a regular destination for our larger hardscape and design projects. Doon and Forest Heights tend to bring full-yard redesigns; downtown work often involves coordinating with neighbours on access. We treat the Region of Waterloo as one travel block and try to batch nearby projects to make the trip efficient.",

  // --- Far cities (only the bigger services) ---
  "niagara-region": "The Niagara Region — from St. Catharines to Niagara-on-the-Lake — is one of our travel markets. We focus on larger hardscape, retaining wall, and design projects here that justify the drive. Smaller maintenance services aren't a good fit at this distance, and we'll be upfront about it.",

  "london": "London is at the outer edge of our service area, and we only take on larger landscape design and hardscape projects there. The drive is real, and we factor it into the quote rather than hide it. If you're a London homeowner wanting a full design + install, we can scope it; for small jobs, a local crew will serve you better.",

  "barrie": "Barrie is a travel market for us, and we focus on bigger landscape and hardscape installs here — projects where a multi-day install or design phase is worth the trip. South Shore and Allandale homes are typical of the work we do up there.",
};

export function getLocalCopy(citySlug) {
  return localCopy[citySlug] ?? null;
}
