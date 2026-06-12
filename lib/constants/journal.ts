import { JournalArticle } from "@/types/journal";
import { generateArchivalSvg } from "@/lib/utils/archivalSvg";

/**
 * @file lib/constants/journal.ts
 * @description The Levora Archive Journal content. 
 * Curated articles adhering strictly to a museum/historical editorial standard.
 */

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "J-001",
    slug: "why-pattachitra-rejects-empty-space",
    title: "Why Pattachitra Rejects Empty Space",
    excerpt: "In the 12th-century art of Pattachitra, negative space is not an aesthetic choice; it is a theological error. We examine the discipline of absolute fullness.",
    category: "Heritage Archive",
    publishDate: "2026-06-12",
    readTime: 6,
    heroSvgPlaceholder: generateArchivalSvg("parchment", "manuscript", 101),
    content: [
      {
        id: "b1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "b2",
        type: "paragraph",
        text: "In contemporary graphic design and modern horology, 'negative space' is considered a virtue. It is the breathing room that allows a central motif to command attention. But in the 12th-century Odisha tradition of Pattachitra, negative space is not an aesthetic preference. It is a theological error. To leave a section of the canvas blank is to imply that the divine is absent from that portion of the universe."
      },
      {
        id: "b3",
        type: "pull-quote",
        text: "Emptiness implies absence, and in the cosmology of Jagannath, absence is an impossibility.",
        attribution: "Levora Curatorial Team"
      },
      {
        id: "b4",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "b5",
        type: "paragraph",
        text: "Originating in Puri, Odisha, over eight centuries ago, Pattachitra was developed by the Chitrakar caste. These hereditary painters were not commissioned to create decorative art; they were tasked with producing visual scriptures. When the wooden idols of the Jagannath temple were kept away from public view during the 'Anavasara' period, Pattachitra paintings were hung in their place for the devotees to worship. The painting was the deity."
      },
      {
        id: "b6",
        type: "image-full",
        svgContent: generateArchivalSvg("charcoal", "engraving", 102),
        caption: "Cross-hatching abstraction representing the density of Chitrakar border motifs."
      },
      {
        id: "b7",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "b8",
        type: "technical-note",
        title: "The Wood Apple Binder",
        details: "Pattachitra uses exclusively natural mineral and organic pigments (lamp soot, conch shell, hingul). The binder is derived from the gum of the kaitha (wood apple) tree, which must be boiled and strained over several days. This organic resin ensures the pigment bonds permanently with the treated cloth canvas, creating a surface that withstands centuries of high humidity."
      },
      {
        id: "b9",
        type: "paragraph",
        text: "Translating this density onto a 40mm watch dial requires extreme technical discipline. The central motifs and the infinitely detailed borders must be executed under 10× magnification using a brush comprising a single squirrel hair. The technical challenge is not merely painting small; it is maintaining the structural integrity of the 'horror vacui' (fear of empty space) without the dial becoming visually chaotic."
      },
      {
        id: "b10",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "b11",
        type: "lesson-block",
        title: "The Discipline of Fullness",
        lesson: "Pattachitra teaches that true attention leaves nothing untouched. It demands that we treat the periphery with the same absolute reverence as the center. It is a rejection of hierarchy in visual space."
      },
      {
        id: "b12",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "b13",
        type: "paragraph",
        text: "For the horological collector, the Levora Pattachitra edition presents a radical departure from the minimalist Bauhaus dials that dominate modern watchmaking. To wear it is to wear a dense, uncompromising worldview. It requires a collector who is willing to look closely, repeatedly, and discover a new detail hidden in the border weeks after the initial acquisition."
      },
      {
        id: "b14",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "b15",
        type: "paragraph",
        text: "We live in an era that worships simplification. Pattachitra stands as a monumental counter-argument. It suggests that perhaps the universe is not simple, and that our attempt to make it so is a failure of attention. True mastery, the Chitrakars argue, is the ability to hold infinite complexity in a single frame."
      }
    ]
  },
  {
    id: "J-002",
    slug: "the-geometry-of-chand-baori",
    title: "The Geometry of Chand Baori",
    excerpt: "How a 9th-century Rajput stepwell anticipated the mathematical precision required in modern haute horlogerie.",
    category: "Craftsmanship Studies",
    publishDate: "2026-06-10",
    readTime: 5,
    heroSvgPlaceholder: generateArchivalSvg("bronze", "geometry", 201),
    content: [
      {
        id: "c1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "c2",
        type: "paragraph",
        text: "Architecture is typically defined by its elevation—how high it reaches into the sky. The Chand Baori stepwell in Abhaneri, Rajasthan, reverses this vector. It reaches thirty meters into the earth. But its true significance lies not in its depth, but in its absolute, unforgiving geometric repetition."
      },
      {
        id: "c3",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "c4",
        type: "paragraph",
        text: "Constructed during the 8th and 9th centuries by King Chanda of the Nikumbha Dynasty, Chand Baori was a response to the arid climate of Rajasthan. It was designed to conserve water and provide a cool gathering place. However, the sheer mathematical rigor of its 3,500 perfectly symmetrical steps elevates it from civic infrastructure to a temple of applied geometry."
      },
      {
        id: "c5",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "c6",
        type: "two-column",
        leftText: "The stepwell comprises 13 stories of interlocking triangular steps. The optical illusion created by the descent is one of infinite recursion.",
        rightText: "In horology, transferring this recursion to a brass dial requires concentric micro-engraving, maintaining 2-micron tolerances between each step."
      },
      {
        id: "c7",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "c8",
        type: "pull-quote",
        text: "The highest form of craft is where the effort disappears, and only the pattern remains.",
        attribution: "Levora Curatorial Archive"
      },
      {
        id: "c9",
        type: "paragraph",
        text: "Chand Baori contains no ornamental excess. Its beauty is derived entirely from its structural integrity. It teaches that profound beauty does not require invention; it requires precision."
      },
      {
        id: "c10",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "c11",
        type: "paragraph",
        text: "Collectors of the Chand Baori edition are custodians of this exactitude. They understand that true luxury is not loud. It is the quiet, undeniable authority of perfect repetition."
      },
      {
        id: "c12",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "c13",
        type: "paragraph",
        text: "To look into Chand Baori is to look into a mirror of human capability. It reminds us that long before the advent of computer-aided design, human hands, guided by absolute mathematical discipline, achieved perfection in the stone."
      }
    ]
  },
  {
    id: "J-003",
    slug: "philosophy-behind-warli-minimalism",
    title: "The Philosophy Behind Warli Minimalism",
    excerpt: "Three thousand years of a single language: why the Warli tribe paints the cosmos using only four shapes.",
    category: "Heritage Archive",
    publishDate: "2026-06-08",
    readTime: 7,
    heroSvgPlaceholder: generateArchivalSvg("charcoal", "geometry", 301),
    content: [
      {
        id: "d1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "d2",
        type: "paragraph",
        text: "There is a profound difference between modern minimalism, which is often a stylistic choice to remove clutter, and Warli minimalism, which is a three-thousand-year-old philosophical definition of reality."
      },
      {
        id: "d3",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "d4",
        type: "paragraph",
        text: "The Warli community of Maharashtra has painted on the mud walls of their homes for millennia. Unlike courtly or temple arts, Warli was never patronized by kings or priests. It was an oral, matrilineal tradition, painted with chewed bamboo sticks and rice paste. It was ephemeral by design, meant to be washed away by the monsoon and repainted for the next harvest."
      },
      {
        id: "d5",
        type: "heritage-fact",
        title: "The Four Essential Shapes",
        fact: "The Warli visual vocabulary consists entirely of the circle (representing the sun/moon), the triangle (derived from mountains/trees, representing human forms), the square (the sacred enclosure or Chaukat), and the line."
      },
      {
        id: "d6",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "d7",
        type: "paragraph",
        text: "To translate an ephemeral mud-and-rice paste tradition onto a permanent horological canvas required inventing a new technique. Levora developed a silver paste etching method on hand-patinated brass. The technical challenge was not merely replicating the shapes, but replicating the varying pressure of a bamboo brush—the slight imperfections that give Warli its kinetic energy."
      },
      {
        id: "d8",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "d9",
        type: "pull-quote",
        text: "What is the minimum required to say everything? Warli answers: four shapes, rice paste, and a wall.",
        attribution: "Levora Master Craftsman"
      },
      {
        id: "d10",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "d11",
        type: "paragraph",
        text: "The Warli dial is the most visually stripped piece in the Levora Heritage Collection. The collector who acquires it does not seek the visual weight of gold or jewels. They seek the ultimate philosophical compression."
      },
      {
        id: "d12",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "d13",
        type: "paragraph",
        text: "By permanently fixing the Warli forms onto a brass dial, we enact a profound shift. We take something meant to be washed away by time, and we place it inside a machine designed to measure time. It is a tribute to a language that outlives the walls it was painted on."
      }
    ]
  },
  {
    id: "J-004",
    slug: "how-bidriware-creates-black-metal",
    title: "How Bidriware Creates Black Metal",
    excerpt: "The 14th-century Deccani alchemy that uses the soil of a specific fortress to turn zinc into absolute darkness.",
    category: "Craftsmanship Studies",
    publishDate: "2026-06-05",
    readTime: 6,
    heroSvgPlaceholder: generateArchivalSvg("parchment", "macro", 401),
    content: [
      {
        id: "e1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "e2",
        type: "paragraph",
        text: "In the art of Bidriware, darkness is not painted onto the metal. The darkness is the metal itself, coaxed into existence by an alchemical reaction that can only occur using the soil of a specific geographic coordinate."
      },
      {
        id: "e3",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "e4",
        type: "paragraph",
        text: "Brought to the Bahmani Sultanate in the 14th century by Persian craftsmen, the technique evolved in the city of Bidar. It involves cutting grooves into a zinc-copper alloy, hammering pure silver wire into the grooves, and then oxidizing the piece. The defining characteristic of Bidriware is its geographic tether: craftsmen have tried to replicate the process elsewhere and failed."
      },
      {
        id: "e5",
        type: "heritage-fact",
        title: "The Soil of Bidar Fort",
        fact: "The intense blackening of the base metal is achieved by packing the finished piece in unlit soil collected specifically from the ruins of the Bidar Fort, which is uniquely rich in ammonium chloride and potassium nitrate."
      },
      {
        id: "e6",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "e7",
        type: "two-column",
        leftText: "The inlay process requires hammering pure silver wire into pre-cut grooves using a delicate chisel. The silver must sit perfectly flush with the zinc-copper base.",
        rightText: "The final oxidation takes 72 hours. It cannot be rushed. The soil reacts with the zinc, turning it pitch black, while the pure silver remains entirely unaffected."
      },
      {
        id: "e8",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "e9",
        type: "lesson-block",
        title: "The Necessity of Contrast",
        lesson: "Bidriware teaches that silver is merely grey until it is surrounded by darkness. True brilliance cannot be perceived in a vacuum; it requires the presence of its absolute opposite to be understood."
      },
      {
        id: "e10",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "e11",
        type: "paragraph",
        text: "A Bidriware dial is an acquisition of alchemy. The collector carries a physical piece of the Deccan plateau. It appeals to those who understand that authentic luxury is tied inextricably to its terroir."
      },
      {
        id: "e12",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "e13",
        type: "paragraph",
        text: "In an age of globalized manufacturing, Bidriware refuses to be moved. It demands that if you want its darkness, you must come to the soil of Bidar. It is a defiant statement of rootedness."
      }
    ]
  },
  {
    id: "J-005",
    slug: "why-collectors-value-hand-finished-dials",
    title: "Why Collectors Value Hand-Finished Dials",
    excerpt: "Exploring the psychological and horological significance of the artisan's invisible signature: the micro-imperfection.",
    category: "Collector Notes",
    publishDate: "2026-06-01",
    readTime: 8,
    heroSvgPlaceholder: generateArchivalSvg("bronze", "engraving", 501),
    content: [
      {
        id: "f1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "f2",
        type: "paragraph",
        text: "A CNC machine can produce a perfect dial. It can execute a guilloché pattern with absolute mathematical precision, devoid of any deviation. Yet, at the highest echelons of haute horlogerie, collectors actively reject this perfection in favor of hand-finishing. This is not nostalgia. It is an understanding of what constitutes true value."
      },
      {
        id: "f3",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "f4",
        type: "paragraph",
        text: "Historically, the value of a timepiece was tied to the time it took to make it. Before industrialization, every component was filed, polished, and engraved by hand. The advent of mass production decoupled time from manufacturing. Today, a watch can be stamped out in seconds."
      },
      {
        id: "f5",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "f6",
        type: "technical-note",
        title: "The Human Tolerance",
        details: "When a master engraver cuts into brass, their heartbeat, their breathing, and their fatigue dictate the depth of the cut. Under a 10× loupe, a hand-engraved line reveals micro-variations in depth and width. A machine's line is dead; a hand-cut line catches light unevenly, giving it a 'living' shimmer."
      },
      {
        id: "f7",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "f8",
        type: "pull-quote",
        text: "We do not pay for perfection. We pay for the evidence of human struggle towards perfection.",
        attribution: "Levora Horology Director"
      },
      {
        id: "f9",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "f10",
        type: "paragraph",
        text: "For the serious collector, the micro-imperfection is the ultimate provenance. It is the proof of humanity. When a collector acquires a Levora Heritage piece, they are buying the 14 months of calibration, the ruined dials, the frustration, and the eventual triumph of the artisan."
      },
      {
        id: "f11",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "f12",
        type: "paragraph",
        text: "Perfection is a commodity. It can be bought, programmed, and scaled. Human effort, with all its inherent risk of failure, is the only true scarcity left in watchmaking."
      }
    ]
  },
  {
    id: "J-006",
    slug: "difference-between-swiss-precision-and-heritage-art",
    title: "The Difference Between Swiss Precision and Heritage Art",
    excerpt: "Swiss watchmaking seeks to master time. Indian heritage art seeks to transcend it. We examine the synthesis of these opposing philosophies.",
    category: "Horology & Movements",
    publishDate: "2026-05-28",
    readTime: 9,
    heroSvgPlaceholder: generateArchivalSvg("charcoal", "manuscript", 601),
    content: [
      {
        id: "g1",
        type: "heading",
        level: "h2",
        text: "Opening Thesis"
      },
      {
        id: "g2",
        type: "paragraph",
        text: "Levora operates at the intersection of two distinct cultural imperatives. In the Vallée de Joux, the objective is the absolute, unyielding measurement of the second. In the ateliers of Rajasthan and Odisha, the objective is the representation of the eternal. Bringing these two forces together requires more than assembly; it requires philosophical reconciliation."
      },
      {
        id: "g3",
        type: "heading",
        level: "h2",
        text: "Historical Context"
      },
      {
        id: "g4",
        type: "paragraph",
        text: "Swiss horology was born from necessity and mathematics—a Protestant work ethic applied to escapements and mainsprings. Indian heritage arts were born from theology and cosmology—a devotional mandate applied to stone, cloth, and metal. One tradition breaks time into fractions; the other views time as a cyclical illusion."
      },
      {
        id: "g5",
        type: "heading",
        level: "h2",
        text: "Technical Analysis"
      },
      {
        id: "g6",
        type: "two-column",
        leftText: "The Calibre SW200-1 operates at 4 Hz, dividing every second into eight beats. It demands lubrication, regulation, and a sterile environment.",
        rightText: "The Tanjore dial is built from chalk, sawdust, and 22-karat gold foil. It demands patience, humidity for the gesso to set, and a tolerance for organic variation."
      },
      {
        id: "g7",
        type: "heading",
        level: "h2",
        text: "Philosophical Lesson"
      },
      {
        id: "g8",
        type: "lesson-block",
        title: "The Engine and the Altar",
        lesson: "The movement is the engine of mortality, ticking away the finite seconds of a human life. The dial is the altar of immortality, representing concepts that do not age or degrade. A Levora watch is a machine where mortality carries immortality on its back."
      },
      {
        id: "g9",
        type: "heading",
        level: "h2",
        text: "Collector Perspective"
      },
      {
        id: "g10",
        type: "paragraph",
        text: "A collector does not choose Levora simply for Swiss reliability or Indian aesthetics. They choose it for the tension between the two. The exhibition caseback reveals the cold, rhodium-plated logic of the gear train, while the dial presents the warm, uncompromising weight of heritage."
      },
      {
        id: "g11",
        type: "heading",
        level: "h2",
        text: "Closing Reflection"
      },
      {
        id: "g12",
        type: "paragraph",
        text: "Precision is how we navigate the world. Art is why we bother navigating it at all. In housing them together, we create an artifact that honors both the brevity of the hour and the permanence of the culture."
      }
    ]
  }
];
