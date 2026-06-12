/**
 * @file lib/constants/watchDetail.ts
 * @description Deep editorial content for Heritage watch detail pages.
 *
 * Phase 9A — Heritage Watch Detail Experience.
 *
 * Extends the shallow metadata in lib/constants/collection.ts with the
 * full editorial narrative required by the watch detail page:
 *
 *   - heroEyebrow / heroQuote     — Hero section atmosphere
 *   - artworkOriginTitle / body   — Artwork genesis (3 paragraphs)
 *   - artworkRegion / Period / Medium / Lineage — Origin metadata
 *   - lessonTitle / lessonBody    — "The Lesson" philosophical teaching
 *   - craftsmen (role-based)      — 3 process roles per watch
 *   - movement specs              — Calibre, frequency, jewels, reserve, finish
 *   - ownershipPhilosophy         — Custodianship statement (not commercial)
 *   - editionTotal / editionMark  — Numbered edition presentation
 *   - salonInvitation             — Watch-specific Private Salon copy
 *
 * No prices. No commerce. Pure storytelling and craft.
 *
 * Sprint 3 upgrade: these fields will migrate to Firestore Watch documents.
 * The shape is designed to hydrate cleanly into the Watch type.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface WatchCraftsman {
  /** Functional role in the craft process — never a person's name. */
  role: string;
  /** City and state of work. */
  location: string;
  /** Generational standing or academic/institutional role. */
  generation: string;
  /** 2–3 sentences describing the craft contribution to this dial. */
  tradition: string;
}

export interface WatchOwnershipPhilosophy {
  /** The philosophy title — frames custodianship, not purchase. */
  title: string;
  /** 3 paragraphs. No price, no scarcity marketing. Pure philosophy. */
  body: readonly string[];
}

export interface WatchDetailContent {
  /** Must match the HeritageWatchId from collection.ts. */
  watchId: string;

  // ── Hero ──────────────────────────────────────────────────────────────────
  /** Eyebrow above the h1. Format: "Heritage 0N · Region · Century" */
  heroEyebrow: string;
  /** Single powerful italic line. The emotional hook. */
  heroQuote: string;

  // ── Artwork Origin ────────────────────────────────────────────────────────
  /** Section heading for Artwork Origin. */
  artworkOriginTitle: string;
  /** 3 editorial paragraphs on the art form's genesis and history. */
  artworkOriginBody: readonly string[];
  /** Specific region of origin (city/district, state). */
  artworkRegion: string;
  /** Time period with CE notation. */
  artworkPeriod: string;
  /** Medium and physical materials of the original art form. */
  artworkMedium: string;
  /** Dynasty, caste, institution, or lineage of original practitioners. */
  artworkLineage: string;

  // ── The Lesson ────────────────────────────────────────────────────────────
  /** Section heading for The Lesson. */
  lessonTitle: string;
  /**
   * 3 paragraphs: the philosophical or moral teaching embedded in this
   * art form. Written for a collector. Never preachy, never generic.
   */
  lessonBody: readonly string[];

  // ── Atelier Craftsmen (role-based, not named) ─────────────────────────────
  /** 3 roles: art specialist, technical specialist, horology finisher. */
  craftsmen: readonly WatchCraftsman[];

  // ── Movement ──────────────────────────────────────────────────────────────
  movementCalibre: string;
  movementFrequency: string;
  movementJewels: string;
  movementReserve: string;
  movementFinish: string;

  // ── Ownership Philosophy ──────────────────────────────────────────────────
  ownershipPhilosophy: WatchOwnershipPhilosophy;
  /** Number of pieces in this edition. Always 7 for Heritage Collection. */
  editionTotal: number;
  /** One sentence describing the physical edition marking. */
  editionMark: string;

  // ── Private Salon ─────────────────────────────────────────────────────────
  /** Watch-specific CTA copy for the Private Salon section. */
  salonInvitation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — All 7 Heritage Watches
// ─────────────────────────────────────────────────────────────────────────────

export const WATCH_DETAIL_CONTENT: Record<string, WatchDetailContent> = {

  // ── HERITAGE_01 — Chand Baori ─────────────────────────────────────────────
  HERITAGE_01: {
    watchId: "HERITAGE_01",
    heroEyebrow: "Heritage 01  ·  Rajputana  ·  8th Century CE",
    heroQuote: "Some descend to rise above time.",

    artworkOriginTitle: "The Stepwell That Worships Mathematics",
    artworkOriginBody: [
      "In Abhaneri, a village 95 kilometres east of Jaipur, King Chanda of the Nikumbha dynasty ordered the construction of a structure unlike anything built before or since. Chand Baori descends 30 metres into the Rajasthani earth across thirteen stories and 3,500 individually cut stone steps. It was completed over the course of a century — meaning its architect never saw its completion.",
      "Stepwells were not merely civic infrastructure. In a land where monsoon arrived once a year and drought was existential, water was sacred. The builders of Chand Baori embedded this theology into geometry itself: every step is identical in width and depth, creating a visual mandala that appears to repeat infinitely as you descend. The closer you approach the water, the more perfect the pattern becomes.",
      "Unlike temples built to reach skyward, Chand Baori was built downward — toward the earth, toward water, toward the source. Indian theological tradition calls this adho-gati — the sacred descent. To go down was not to diminish. It was to reach what sustains all life.",
    ],
    artworkRegion: "Abhaneri, Rajasthan",
    artworkPeriod: "8th–9th Century CE",
    artworkMedium: "Hand-cut Rajput sandstone, geometric dry-lay masonry",
    artworkLineage: "Commissioned by King Chanda, Nikumbha Dynasty",

    lessonTitle: "What Geometry Teaches",
    lessonBody: [
      "Chand Baori contains no ornamentation. No painted murals, no gilded idols, no decorative excess. The beauty of Chand Baori is entirely structural — it emerges from perfect repetition applied with unwavering discipline. The builders understood something that most architects forget: the most profound beauty does not require invention. It requires precision.",
      "The lesson of the stepwell is that true mastery is invisible. When you stand at its edge and look down, you do not see the effort. You see only the pattern. 3,500 steps appear effortless because each was executed with absolute care. This is the highest form of craft — where the work disappears and only its truth remains.",
      "A Levora dial does not attempt to replicate this visual perfection. It attempts to carry its philosophy. Every engraved ring on the Chand Baori dial is a statement: mastery is not about making something look impressive. It is about making each step so precisely that the whole becomes inevitable.",
    ],

    craftsmen: [
      {
        role: "The Brass Engraver",
        location: "Jaipur, Rajasthan",
        generation: "Fourth Generation",
        tradition: "A lineage of precision engravers working in the old city of Jaipur since before the partition of India. Each concentric layer of the Chand Baori dial's geometry requires a separate engraving pass, calibrated to within 2 microns across the entire dial surface — the same tolerance required in Swiss movement finishing.",
      },
      {
        role: "The Architectural Interpreter",
        location: "Abhaneri, Rajasthan",
        generation: "Heritage Conservator & Archaeological Consultant",
        tradition: "The geometric system of Chand Baori's steps was formally documented in partnership with the Archaeological Survey of India before any dial engraving could begin. Each proportion in the dial's concentric rings corresponds to a measured interval from the actual stepwell structure.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre SW200-1",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "26 jewels",
    movementReserve: "38 hours",
    movementFinish: "Rhodium-plated bridges · Côtes de Genève · Bevelled edges · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Own the Descent",
      body: [
        "The person who acquires HERITAGE_01 is not purchasing a watch. They are accepting custodianship of an idea — that patience and geometry, applied with absolute precision over time, produce something that transcends the individual who made it.",
        "Chand Baori was built over a century. No single craftsman saw its completion. The king who commissioned it died before it was finished. Yet it stands — perfect and inevitable — because each person who contributed did so without ego. This is what the collector inherits: not just a timepiece, but a philosophy of completion beyond the self.",
        "The Chand Baori edition closes when seven pieces are placed. It will never be recommissioned. The stepwell exists once. The dial exists seven times.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece is hallmarked with the Nikumbha dynasty symbol and individually serialised I/VII through VII/VII. The edition numeral is engraved on the exhibition caseback alongside the artisan's certification mark.",

    salonInvitation: "The acquisition of the Chand Baori requires an orientation to its architectural philosophy. A private viewing is strictly by appointment with a Levora horology specialist in New Delhi.",
  },

  // ── HERITAGE_02 — Pichwai ─────────────────────────────────────────────────
  HERITAGE_02: {
    watchId: "HERITAGE_02",
    heroEyebrow: "Heritage 02  ·  Nathdwara  ·  17th Century CE",
    heroQuote: "The artist did not sign his name. He signed with devotion.",

    artworkOriginTitle: "The Painting That Serves the Temple",
    artworkOriginBody: [
      "In the Nathdwara temple of Rajasthan, every ceremony is accompanied by a painting hung behind the deity. These paintings are called Pichwai — pichha meaning 'behind', vai meaning 'hanging'. They are not made for display. They are made for God.",
      "The Pichwai tradition began when the Nathdwara temple was established in the 17th century as a refuge for the deity Shrinathji, carried from Mathura to protect him from Mughal destruction. The paintings that accompanied him on that journey — and those made to honour him since — depict only the deity's world: the forest where he played, the cows he tended, the lotuses that floated around him.",
      "For three hundred years, Pichwai artists worked exclusively for the temple, receiving their sustenance from temple funds. No painting was made for sale. No artist signed his name — because in Pichwai philosophy, the artist is not the creator. He is the instrument. Shrinathji creates through the artist's hands.",
    ],
    artworkRegion: "Nathdwara, Rajasthan",
    artworkPeriod: "17th Century CE — ongoing sacred tradition",
    artworkMedium: "Natural mineral pigments on handwoven cotton cloth, with 22-karat gold leaf embellishment",
    artworkLineage: "Temple artists of Nathdwara, in continuous practice since 1671 CE",

    lessonTitle: "The Art of Ego Dissolution",
    lessonBody: [
      "Three hundred years of Pichwai artists made work that outlived their names. Not because they were forgotten, but because they chose not to be remembered. To sign a painting made for God would be to claim credit for what was given through you — a category error no serious Pichwai master would make.",
      "The lesson is not humility in the passive sense. It is something more radical: the recognition that the highest craft operates when the self gets out of the way. The artist who chases recognition will never make a Pichwai, because a Pichwai can only be made by an artist who has stopped chasing recognition.",
      "This creates an interesting paradox for a luxury maison that prides itself on exclusivity. Levora does not resolve this paradox. We sit inside it. The dial is extraordinary precisely because it was made by someone who refused to take credit for being extraordinary.",
    ],

    craftsmen: [
      {
        role: "The Pichwai Heritage Artist",
        location: "Nathdwara, Rajasthan",
        generation: "Seventh Generation Temple Lineage",
        tradition: "Among the last practitioners trained directly under the Nathdwara temple system. The micro-enamel motifs on the Pichwai dial use the same mineral pigments as the original temple paintings — sourced from the same Rajasthani stone quarries used since the 17th century.",
      },
      {
        role: "The Minakari Enameller",
        location: "Jaipur, Rajasthan",
        generation: "Third Generation",
        tradition: "Minakari — painting with fire and metal oxides — is applied under 10× magnification using a brush of five hairs. The Pichwai dial requires eleven individual kiln firings at precisely 800°C to build the colour depth of traditional temple paintings. No two firings produce identical results.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre ETA 2824-2",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "25 jewels",
    movementReserve: "38 hours",
    movementFinish: "Côtes de Genève · Perlage · Blued screws · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Carry What Was Never for Sale",
      body: [
        "For three centuries, no Pichwai painting was made for a collector. Every piece went to the temple. The acquisition of HERITAGE_02 is not the end of this tradition — it is its most deliberate adaptation.",
        "The Pichwai dial is the first time this art form has been abstracted from devotional context and placed in a portable object meant to be worn. This is either a transgression or an act of preservation. The answer depends entirely on what the collector does with it.",
        "To wear HERITAGE_02 is to carry a tradition that survived Mughal persecution and colonial disruption by refusing to become commercial. The collector who acquires it continues this protection — not through sequestration, but through proximity. The tradition lives because someone chose to keep it alive.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece carries a wax seal mark in the presentation box — the traditional temple seal of Nathdwara — and is individually numbered in Devanagari script alongside the Roman edition numeral on the exhibition caseback.",

    salonInvitation: "A private consultation for the Pichwai dial includes an examination of its eleven-layer enamel construction under 10× magnification. It is a necessary prerequisite to understanding the material depth of the devotion.",
  },

  // ── HERITAGE_03 — Warli ───────────────────────────────────────────────────
  HERITAGE_03: {
    watchId: "HERITAGE_03",
    heroEyebrow: "Heritage 03  ·  Maharashtra  ·  3,000 Years of Practice",
    heroQuote: "What is the minimum needed to say everything?",

    artworkOriginTitle: "Three Thousand Years of a Single Language",
    artworkOriginBody: [
      "The Warli people of Maharashtra have painted on the mud walls of their homes using only two tools for over three thousand years: a bamboo stick and rice paste. The bamboo is chewed into a bristle brush. The rice paste is the paint. The wall is the canvas. Everything else is unnecessary.",
      "Warli uses only four geometric forms: the circle, the triangle, the square, and the line. The circle is the sun, the moon, and the eternal cycle. The triangle is the male and female body. The square is the sacred space — the village, the home. From these four forms, an entire cosmology is constructed: fertility rituals, harvest celebrations, wedding ceremonies, the cycle of death and rebirth.",
      "Unlike most Indian art forms that developed under royal or temple patronage, Warli never had a patron. It was never made for a court or a deity — only for the community. It was taught mother to daughter, always at home, always on the wall that would be re-painted next season. Warli was never meant to last. It was meant to be practised.",
    ],
    artworkRegion: "Palghar district, Maharashtra (Dahanu, Jawhar, Mokhada)",
    artworkPeriod: "3,000 BCE — ongoing living tradition",
    artworkMedium: "Rice paste (chawal ki lapet) on mud-plaster walls",
    artworkLineage: "Oral matrilineal tradition of the Warli tribal community",

    lessonTitle: "The Minimum That Contains Everything",
    lessonBody: [
      "Warli is a philosophy of compression. Four shapes contain the entire cosmos. No colour is needed because colour would be addition, and Warli does not add — it arranges. The human figure in Warli is two triangles: one pointing up for the torso, one down for the legs. This is not a limitation. It is a definition.",
      "There is a question embedded in Warli: what is the minimum needed to say everything? Not the minimum that is interesting, not the minimum that is legible — but the minimum that contains the entire universe. Three thousand years of practice suggest the answer is: four shapes, rice paste, and a bamboo brush.",
      "A Levora collector who understands Warli understands something about luxury itself: the most sophisticated things are not the most decorated. The Warli dial has fewer visual elements than any other Heritage piece. It is also, arguably, the most philosophically complete.",
    ],

    craftsmen: [
      {
        role: "The Warli Tradition Bearer",
        location: "Dahanu, Maharashtra",
        generation: "Living Oral Tradition — Unbroken Lineage",
        tradition: "The Warli dial is the only piece in the Heritage Collection where the art was applied by a practitioner within the living tradition. No adaptation was made to the Warli motifs — the figures were transferred from wall to dial using a reverse-cast technique developed across 14 months of collaboration between the tradition bearer and the Levora atelier.",
      },
      {
        role: "The Silver Etching Specialist",
        location: "Pune, Maharashtra",
        generation: "Second Generation Precision Craftsman",
        tradition: "Warli's white-on-dark aesthetic required the invention of a new technique: silver paste etching on a hand-patinated brass base. The development process required 14 months before the first successful dial was produced. Every pass of the etching stylus is calibrated to replicate the pressure variation of a bamboo brush on mud.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre SW200-1",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "26 jewels",
    movementReserve: "38 hours",
    movementFinish: "Rhodium-plated bridges · Côtes de Genève · Bevelled edges · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Inherit a Language",
      body: [
        "Warli was never made to last. Each painting was redone each season. The medium — rice paste on mud — guaranteed impermanence. The Levora dial is the first time the Warli language has been permanently fixed: not on a wall that will be re-plastered, but on a brass canvas that will outlive everyone who made it.",
        "This creates an obligation. To own HERITAGE_03 is to become custodian of a compression — three thousand years of philosophy reduced to four essential shapes. The collector who acquires it assumes direct patronage of the Warli Kala Kendra in Dahanu, ensuring the living teaching tradition is sustained.",
        "The collector does not merely own a dial. They fund the conditions under which the next generation of Warli practitioners continues to ask the only question that matters: what is the minimum needed to say everything?",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece carries a rice-paper inlay certificate signed by the tradition bearer in tribal script, sealed inside the presentation box alongside the edition numeral engraved on the exhibition caseback.",

    salonInvitation: "The Warli is the most philosophically stripped piece in the Heritage Collection. A private conversation with our specialist explores why the simplest dial required the longest development process.",
  },

  // ── HERITAGE_04 — Pattachitra ─────────────────────────────────────────────
  HERITAGE_04: {
    watchId: "HERITAGE_04",
    heroEyebrow: "Heritage 04  ·  Odisha  ·  12th Century CE",
    heroQuote: "In Pattachitra, empty space is not permitted. The border is as sacred as the centre.",

    artworkOriginTitle: "The Scroll Without End",
    artworkOriginBody: [
      "In 12th century Puri, Odisha, the artists of the Jagannath temple were assigned a specific ritual function: to paint the cosmology of Lord Jagannath on treated cloth using pigments bound with wood apple resin. These were not devotional decorations. They were theological documents — visual scriptures depicting the entire mythological universe of Jagannath in intricate, interlocking scenes.",
      "The Pattachitra tradition established a visual law that has not changed in 800 years: every millimetre of the canvas must be filled. The borders of the painting are as detailed as its centre. What Western art calls 'negative space', Pattachitra treats as spiritual vacancy — a rupture in the divine fabric that must be repaired.",
      "The Chitrakars — the hereditary painter caste of Puri — ground their own pigments from stone, shell, and organic sources collected from specific sacred sites. White came from conch shell. Black from lamp soot. Red from hingul. Green from leaves. Each colour had a source, and each source was sacred. A Pattachitra was not made from store-bought paint. It was made from the world.",
    ],
    artworkRegion: "Puri, Odisha",
    artworkPeriod: "12th Century CE — 800+ years of continuous practice",
    artworkMedium: "Natural mineral pigments bound with wood apple resin on treated cloth",
    artworkLineage: "Chitrakar hereditary artists of the Jagannath temple, Puri",

    lessonTitle: "The Theology of Fullness",
    lessonBody: [
      "Pattachitra operates on a single, non-negotiable premise: emptiness is an error. This is not a stylistic preference. It is a theological position. In the Pattachitra universe, the divine fills everything — there is no void in the cosmos, therefore there is no void in the painting.",
      "This teaches the opposite lesson from Warli. Where Warli asks what minimum is needed, Pattachitra asks what fullness requires. Both are correct. The difference is not between competing philosophies — it is between two truthful observations about different aspects of reality. Some things require stripping away. Other things require filling completely.",
      "To look at a Pattachitra is to practise attention. The painting refuses to be understood quickly. Every viewing reveals something new, because there is always more to see. This is its philosophical gift: the insistence that the world, examined with enough care, will never run out of meaning.",
    ],

    craftsmen: [
      {
        role: "The Pattachitra Chitrakar",
        location: "Puri, Odisha",
        generation: "Twelfth Generation Hereditary Artist",
        tradition: "Among the few remaining Chitrakars practising the complete traditional method — from grinding natural pigments to applying wood apple binder. The Pattachitra dial's central motif was hand-painted in miniature using a brush made from a single squirrel hair, which remains the traditional tool of the tradition.",
      },
      {
        role: "The Gold Leaf Applier",
        location: "Puri, Odisha",
        generation: "Fifth Generation Heritage Craftsman",
        tradition: "The 22-karat gold leaf on the Pattachitra dial is applied using the ancient technique — burnished with a smooth agate stone in a specific circular motion to achieve the flat, matte gold that distinguishes temple Pattachitra from commercial adaptations.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre ETA 2824-2",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "25 jewels",
    movementReserve: "38 hours",
    movementFinish: "Perlage decoration · Côtes de Genève · 22-karat gold rotor · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Hold the Infinite on the Wrist",
      body: [
        "A traditional Pattachitra can take six months to complete. The Levora Pattachitra dial — at 40mm — took nine months. Compression at miniature scale is more demanding than expansion at scroll scale. Every motif had to be re-imagined at 1/200th of its original size while preserving the theological accuracy that makes the tradition valid.",
        "The collector who acquires HERITAGE_04 holds the most narrative-dense object in the Heritage Collection. The dial contains more visual information per square millimetre than any other piece. This is not decoration. This is theology — the belief that meaning requires fullness, and fullness requires obsession.",
        "The Pattachitra edition closes at seven pieces. When the seventh is placed, this particular act of compression — this version of fullness — will not be repeated. The cosmology will have been transferred, seven times, from cloth to brass to wrist.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece bears the traditional Chitrakar hallmark — an applied wood apple resin seal — embedded in the presentation box. The exhibition caseback carries the edition numeral and the artisan's certification mark in the style of a Pattachitra border motif.",

    salonInvitation: "The Pattachitra cosmology cannot be comprehended at a glance. A private viewing at the Levora Salon is structured as an unhurried, guided reading of the dial's intricate narrative architecture.",
  },

  // ── HERITAGE_05 — Tanjore ─────────────────────────────────────────────────
  HERITAGE_05: {
    watchId: "HERITAGE_05",
    heroEyebrow: "Heritage 05  ·  Thanjavur  ·  16th Century CE",
    heroQuote: "Gold does not represent devotion. In Tanjore, gold is devotion — literal, applied, weighed.",

    artworkOriginTitle: "The Painting Built from Precious Materials",
    artworkOriginBody: [
      "In 16th century Thanjavur, under the patronage of the Nayaka rulers and later refined under the Marathas, Indian painters abandoned flat canvas and invented a new form: three-dimensional relief painting. The Tanjore technique builds a gesso surface from chalk paste mixed with fine sawdust, sculpts it into raised relief, then covers it entirely with 22-karat gold foil and sets it with real semi-precious stones.",
      "A Tanjore painting is not primarily a visual experience. It is a physical one. The gold foil catches light differently at every angle. The stones are set so they appear to be worn by the deity — actual jewellery, not depicted jewellery. A Tanjore God is literally adorned with precious materials, not merely painted as if adorned.",
      "The tradition reached its zenith under the Maratha court, where artists competed not in the originality of their subject matter — all Tanjore paintings depict the same divine subjects — but in the quality of their gold work and the precision of their stone setting. A Tanjore painting was evaluated the way a goldsmith evaluates a piece of jewellery: by weight, material quality, and technical execution.",
    ],
    artworkRegion: "Thanjavur (Tanjore), Tamil Nadu",
    artworkPeriod: "16th Century CE — height under Maratha patronage, 18th Century CE",
    artworkMedium: "Chalk-and-sawdust gesso relief, 22-karat gold foil, semi-precious stones",
    artworkLineage: "Nayaka and Maratha court artists, Thanjavur",

    lessonTitle: "Devotion as Material Weight",
    lessonBody: [
      "Tanjore's philosophical contribution is the most uncomfortable in this collection: it insists that the quality of devotion can be measured. Not in metaphysical terms, but in literal ones — in the purity of the gold, in the quality of the stones, in the precision of the setting. A Tanjore painting made with inferior gold is not a lesser artwork; it is a lesser offering.",
      "This challenges the modern instinct to separate aesthetic merit from material value. We are trained to believe that a great painting on cheap materials is still a great painting. Tanjore disagrees. The artist who substituted inferior gold was not merely economising — he was reducing the quality of the offering to the deity, which was a moral failure, not merely an aesthetic one.",
      "For the Levora collector, this teaching carries a specific resonance. The Tanjore dial is built exactly as the tradition demands: genuine 22-karat gold foil, a raised gesso base, and a single cabochon ruby. These are not decorative choices. They are theological ones. The dial is not adorned. It is constructed from devotion.",
    ],

    craftsmen: [
      {
        role: "The Tanjore Relief Artist",
        location: "Thanjavur, Tamil Nadu",
        generation: "Fifth Generation Hereditary Craftsman",
        tradition: "The gesso relief on the Tanjore dial requires three applications of chalk-and-sawdust paste, each dried for 48 hours before the next is applied. The relief is carved by hand using traditional tools unchanged since the Maratha period. Each dial takes six weeks of preparation before gold application begins.",
      },
      {
        role: "The Gold Foil Applier",
        location: "Thanjavur, Tamil Nadu",
        generation: "Fourth Generation Gilding Specialist",
        tradition: "The application of 22-karat gold foil to a curved dial surface required a new technique: the foil is applied in 47 overlapping sections using a method adapted from traditional Tanjore gilding, modified for the dial's micro-scale. Each section is burnished with an agate tool, the same instrument used in Maratha-period temple gilding.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The setting of the single cabochon ruby at the 12 o'clock position is performed using fine jewellery stone-setting tools. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre SW200-1",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "26 jewels",
    movementReserve: "38 hours",
    movementFinish: "Rhodium-plated bridges · Gold-toned rotor · Côtes de Genève · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Carry Literal Devotion",
      body: [
        "HERITAGE_05 is the heaviest dial in the Heritage Collection. The gesso relief base, the gold foil, and the ruby setting add measurable physical weight beyond a standard dial. When you wear the Tanjore, you feel it. This is not incidental. This is the tradition expressing itself through physics.",
        "To acquire HERITAGE_05 is to take on the Tanjore premise: that devotion has weight, that the quality of care given to something can be materially verified, that there is no separation between spiritual intent and physical execution.",
        "Seven pieces. Each one carries the same weight of gold, the same precision of ruby, the same six weeks of gesso preparation. When the seventh is placed, this particular material argument for devotion will be complete.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece is accompanied by a gemological certificate for the individual cabochon ruby — including carat weight, geographic origin, and quality grading. The exhibition caseback bears the edition numeral and the goldsmith's mark.",

    salonInvitation: "A private consultation for the Tanjore involves an examination of the material weight of the offering, including the historical provenance of the singular cabochon ruby set at the zenith.",
  },

  // ── HERITAGE_06 — Madhubani ───────────────────────────────────────────────
  HERITAGE_06: {
    watchId: "HERITAGE_06",
    heroEyebrow: "Heritage 06  ·  Mithila, Bihar  ·  Ancient to Present",
    heroQuote: "For a thousand years, this art was kept secret. The world was not invited.",

    artworkOriginTitle: "The Private Language of Mithila",
    artworkOriginBody: [
      "The Ramayana describes Sita's wedding to Rama as the occasion on which Madhubani painting was first made — painted on the walls of Janakpur by her father's command to consecrate the marriage. If this origin is historical, Madhubani is over two thousand years old. If it is mythological, it tells us something equally important: this art form was present at the founding of the most revered marriage in Hindu tradition.",
      "For the centuries that followed, Madhubani was painted exclusively by women on the interior walls of their homes in the Mithila region of Bihar. It was taught privately — mother to daughter, indoors, away from public sight. Men were not the intended audience. British colonisers who passed through Mithila had no record of it. Madhubani was a secret kept by millions of women for a thousand years.",
      "The secret ended accidentally. In 1934, a severe earthquake destroyed most of Mithila's mud-walled houses. As the walls came down, the paintings were suddenly visible from the street. A British colonial officer photographed them. The world discovered Madhubani not because the women chose to reveal it, but because the walls fell.",
    ],
    artworkRegion: "Mithila region, Bihar (Madhubani, Darbhanga, Sitamarhi districts)",
    artworkPeriod: "Mythological origin: Treta Yuga · Historical documentation: post-1934",
    artworkMedium: "Natural pigments (turmeric, indigo, lamp black, ochre) applied with bamboo-tip and fingertip",
    artworkLineage: "Matrilineal oral tradition of Mithila women",

    lessonTitle: "What Is Kept Secret Is Preserved",
    lessonBody: [
      "Madhubani survived for a thousand years because it was not shared. This is a paradox for an age that equates sharing with survival — when everything must be documented, posted, and distributed to be considered real. Madhubani's secrecy was precisely what kept it alive. The women of Mithila did not need validation from outside their community.",
      "The lesson is not that secrecy is inherently good. It is that privacy creates conditions for depth. The Madhubani tradition had a thousand years to develop in isolation — without critics, without markets, without the requirement to explain itself to an audience that did not understand its context. What was revealed when the walls fell was not a nascent tradition struggling to be noticed. It was a fully formed visual language of extraordinary sophistication.",
      "The Levora Madhubani dial takes an art form that survived through secrecy and places it on an object worn publicly. This is either a betrayal or a continuation. We believe it is a continuation — because the Madhubani women kept it secret not for the sake of secrecy, but for the sake of the tradition's integrity. That integrity is what we have kept intact.",
    ],

    craftsmen: [
      {
        role: "The Madhubani Master",
        location: "Madhubani, Bihar",
        generation: "Padma Shri Recipient — National Award for Madhubani Art",
        tradition: "The dial motifs — fish, peacock, lotus, and the Kohbar forest — were translated from wall-scale to dial-scale using a process co-developed with the master: first drawn on cloth using the traditional bamboo-tip method, then laser-transferred to the brass base. No motif was altered without the master's approval.",
      },
      {
        role: "The Laser Engraving Specialist",
        location: "Pune, Maharashtra",
        generation: "First Generation Heritage Application Technician",
        tradition: "Replicating bamboo-stroke pressure variation using a laser required 18 months of calibration. The laser pressure varies between 0.2 and 0.8 bar across each stroke to reproduce the lighter and heavier marks characteristic of bamboo on cloth.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre ETA 2824-2",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "25 jewels",
    movementReserve: "38 hours",
    movementFinish: "Côtes de Genève · Perlage · Blued screws · Arabesque-engraved rotor · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Carry a Kept Secret",
      body: [
        "For a thousand years, Madhubani was the private language of millions of women given no other medium. The poetry they could not write, the stories they could not publish, the records of their marriages and births and griefs — all of it went into the walls. The walls fell in 1934. The language survived.",
        "The collector who acquires HERITAGE_06 inherits a specific responsibility: to know what was kept secret, and why, and what that keeping made possible. A Madhubani on a wall was a private act. A Madhubani on a wrist is a public one. The difference is the collector's choice — what they tell about what they wear, and to whom.",
        "Seven pieces. Each carries a tradition that survived earthquake, colonisation, and a thousand years of deliberate invisibility. What it cannot survive is indifference.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece is accompanied by a hand-signed certificate from the collaborating Madhubani master, written in Maithili script on handmade lokta paper, alongside the edition numeral engraved on the exhibition caseback.",

    salonInvitation: "The history of the Madhubani is not intended for public broadcast. A private consultation at the Levora Salon is an opportunity to hear the narrative that was kept secret for a millennium.",
  },

  // ── HERITAGE_07 — Bidriware ───────────────────────────────────────────────
  HERITAGE_07: {
    watchId: "HERITAGE_07",
    heroEyebrow: "Heritage 07  ·  Bidar, Karnataka  ·  14th Century CE",
    heroQuote: "The deep beauty of Bidri is inseparable from its darkness.",

    artworkOriginTitle: "Where Persian Geometry Became Indian Metal",
    artworkOriginBody: [
      "In 14th century Bidar — the capital of the Bahmani Sultanate — Persian craftsmen arrived in the Deccan carrying a metalworking technique unknown in India: pure silver inlaid into a zinc-and-copper alloy so that the contrasting materials, when oxidised, would reveal the design in perfect clarity. This technique, brought from the courts of Persia, encountered the artistic traditions of the Deccan and produced something neither origin could have created alone.",
      "The zinc-copper alloy of Bidriware is sourced exclusively from the specific soil of Bidar. Only this soil — uniquely rich in ammonium chloride — produces the intense, permanent blackening when the finished piece is packed in it. Craftsmen have attempted to replicate Bidriware in other Indian cities and failed. The darkening will not happen elsewhere. The technique is geographically bound.",
      "For six hundred years, Bidar has produced Bidriware objects: hookah bases, perfume containers, cufflinks, belt buckles, serving vessels. Every piece follows the same logic: the silver design is cut as grooves into the base metal, pure silver wire is hammered into those grooves, and then the piece is buried in Bidar soil for 72 hours. The base blackens. The silver remains bright. The design emerges from darkness.",
    ],
    artworkRegion: "Bidar, Karnataka",
    artworkPeriod: "14th Century CE — under Bahmani and later Bidar Sultanate",
    artworkMedium: "Pure silver inlay in zinc-copper alloy, oxidised with Bidar soil ammonium chloride",
    artworkLineage: "Persian craftsmen under the Bahmani Sultanate, adapted through six centuries of Deccani tradition",

    lessonTitle: "Beauty That Requires Darkness",
    lessonBody: [
      "Bidriware cannot exist without its specific darkness. Remove the oxidation and the silver disappears into a grey zinc surface. The design becomes invisible. Bidri's beauty is not merely set against the darkness — it is created by it. The darkness is not the background. It is the medium.",
      "This is a precise philosophical teaching about contrast: certain qualities can only be perceived in the presence of their opposite. Courage requires fear. Clarity requires confusion. The silver of Bidri requires the black of the alloy. Neither alone is sufficient. The meaning exists only in the relationship between them.",
      "There is a second lesson embedded in the technique: Bidri cannot be rushed. The 72-hour oxidation in Bidar soil cannot be accelerated. No chemical shortcut produces the same depth of black. The tradition contains this waiting as a structural feature — the beauty is time-locked, and the time cannot be borrowed from elsewhere.",
    ],

    craftsmen: [
      {
        role: "The Bidri Master",
        location: "Bidar, Karnataka",
        generation: "Sixth Generation — Complete Process Custodian",
        tradition: "The last practitioner who performs the complete Bidriware process from alloy preparation to final oxidation. The Levora Bidriware dial is the first piece made at sub-40mm scale, requiring miniature inlaying tools with tips of 0.3mm — ten times finer than standard Bidri production tools.",
      },
      {
        role: "The Silver Inlay Specialist",
        location: "Bidar, Karnataka",
        generation: "Fourth Generation",
        tradition: "The silver wire used in the Bidriware dial is drawn to 99.99% purity and gauged to 0.3mm for the finest dial motifs. Each groove is cut by hand using a tankon tool, and the silver is hammered in cold — no heat is applied, as heat would close the grooves before inlaying is complete.",
      },
      {
        role: "The Horology Finisher",
        location: "Le Brassus, Switzerland",
        generation: "Second Generation",
        tradition: "The Swiss atelier responsible for applying the Indian-crafted dial to the Swiss movement and completing the final 47-step assembly process. Protective sealing is applied to the Bidriware dial face to prevent post-assembly oxidation while preserving the existing depth of black finish. The certification mark appears on the exhibition caseback.",
      },
    ],

    movementCalibre: "Calibre SW200-1",
    movementFrequency: "28,800 vph · 4 Hz",
    movementJewels: "26 jewels",
    movementReserve: "38 hours",
    movementFinish: "Rhodium-plated bridges · Côtes de Genève · Oxidised-steel rotor · Exhibition caseback",

    ownershipPhilosophy: {
      title: "To Understand What Darkness Makes Possible",
      body: [
        "HERITAGE_07 represents an uncompromising absolute — in concept, technique, and appearance. It is black and silver. There is no warmth in the dial's palette. The contrast is absolute. This is not aesthetic minimalism. It is the Bidri philosophy materialised: beauty exists in contrast, and contrast requires the willingness to embrace the dark part of the equation.",
        "The collector who acquires HERITAGE_07 is making a statement about their understanding of beauty — that it requires depth, that depth requires difficulty, and that the most meaningful things cannot be extracted from their context and remain meaningful. The silver of this dial is only beautiful because of 72 hours of darkness in Bidar soil. Take away the process and you take away the point.",
        "This is the final Heritage edition to be placed. When the seventh Bidriware is acquired, the Heritage Collection closes — seven art forms, seven dialects of the same devotion, each teaching its own lesson about what it means to make something with complete integrity.",
      ],
    },
    editionTotal: 7,
    editionMark: "Each piece is individually oxidised in a sealed container of authentic Bidar soil — a portion of which is enclosed in the presentation box as a material record of the process. The exhibition caseback bears the edition numeral and the Bidri master's hallmark.",

    salonInvitation: "The acquisition of the Bidriware requires an orientation to its uncompromising philosophy and striking contrast. A private consultation at the Levora Salon is mandatory prior to placement.",
  },

} as const;

/**
 * Utility: retrieve watch detail content by slug.
 * Returns undefined if the slug does not match any watch.
 */
export function getWatchDetailBySlug(slug: string): WatchDetailContent | undefined {
  const entry = Object.values(WATCH_DETAIL_CONTENT).find(
    (w) => w.watchId === slug.toUpperCase().replace(/-/g, "_")
  );
  return entry;
}
