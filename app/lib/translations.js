// Comprehensive Khmer (km) and English (en) dictionary for all content and UI

export const translations = {
  en: {
    brand: "KHMER LIVING",
    brandSub: "THE LIFESTYLE ARCHIVE",
    navExplore: "Explore the archive",
    navAbout: "About the project",
    motionOn: "Motion on",
    motionOff: "Motion off",
    skipLink: "Skip to the archive",
    
    // Hero section
    heroKicker: "ONE COUNTRY. GENERATIONS OF STORIES.",
    heroTitlePast: "Cambodia,",
    heroTitlePastSub: "the way we lived.",
    heroTitlePresent: "Cambodia,",
    heroTitlePresentSub: "a world of change.",
    heroDescPast: "Before the city lights, life followed a different rhythm. Step into the wooden homes, dusty roads and everyday stories of a generation.",
    heroDescPresent: "From wooden homes to changing skylines. Travel between generations and discover how everyday Cambodian life has transformed.",
    heroExplore: "Explore everyday life",
    heroStatStories: "05 stories",
    heroStatEras: "02 eras",
    heroStatHeritage: "One shared heritage",
    heroScenePast: "THE ROOTS OF EVERYDAY LIFE",
    heroScenePresent: "A NEW CHAPTER, STILL CAMBODIA",
    
    // Timeline
    timelineKicker: "THE TIME MACHINE",
    timelineTitle: "Same place.",
    timelineTitleSub: "A different time.",
    eraPast: "The past",
    eraPastDecade: "1980s–90s",
    eraPresent: "The present",
    eraPresentDecade: "2020s",
    statusPast: "Heritage era · You are here",
    statusPresent: "Present era · You are here",
    statusLeaving: "Leaving this era…",
    statusDrawing: "Drawing a new world…",
    
    // Archive toolbar
    toolbarKicker: "THE EVERYDAY COLLECTION",
    toolbarTitle: "Little moments.",
    toolbarTitleSub: "Big changes.",
    searchPlaceholder: "Find a story… (e.g. food, bicycle, romance)",
    searchClear: "Clear search",
    searchNoMatch: "no direct match — press Enter to search anyway",
    
    // Cards list
    storiesCountAll: "05 stories to explore · Choose an illustration to step inside",
    storiesCountMatch: (matchCount, total) => `${matchCount} of ${total} stories matching your search`,
    noStoriesFound: "No stories found",
    noStoriesHint: "Try searching for “food”, “school” or “bicycle”, or reset the search.",
    showAllStories: "Show all stories",
    stepIntoStory: "Step into the story",
    kickerHeritage: "LIFE BEFORE THE CITY LIGHTS",
    kickerModern: "LIFE IN A CONNECTED CAMBODIA",
    storyLabel: "STORY",
    
    // Modal
    closeEntry: "Close entry",
    priceIndexTitle: "PRICE INDEX — 1980s ⇄ 2020s",
    archivePhotosTitle: (isHeritage) => `ARCHIVE PHOTOGRAPHS · ${isHeritage ? "1980s–90s" : "2020s"}`,
    photoCounter: (curr, total) => `PHOTO ${curr} OF ${total}`,
    prevPhoto: "← Prev",
    nextPhoto: "Next Photo ↻",
    infiniteScrollNote: (total) => `Infinite scroll active (loops 1 ⇄ ${total})`,
    noPhotosTitle: (isHeritage) => `NO ${isHeritage ? "HERITAGE" : "MODERN"} PHOTOGRAPHS ARCHIVED`,
    noPhotosDesc: (isHeritage, topic) => `There are currently no ${isHeritage ? "past" : "present"} photos added for ${topic}.`,
    photoPatternBadge: (prefix, folder) => `PATTERN: ${prefix}1.png, ${prefix}2.png… in /assets/images/${folder}/`,
    
    // Time warp button
    warpToPast: "TIME WARP · 1980s · HERITAGE",
    warpToPresent: "TIME WARP · 2020s · MODERN",
    warpingToPast: "RECONSTRUCTING 1980s…",
    warpingToPresent: "MATERIALIZING 2020s…",
    
    // About
    aboutKicker: "KEEPING OUR STORIES ALIVE",
    aboutTitle: "A changing country.",
    aboutTitleSub: "A connection that stays.",
    aboutDesc: "A comparison between Cambodia lifestyle in the 1980s and the current era, built for Vibe Coding Course Final Project.",
    aboutNote: "An authentic living archive documenting 10 generational realities across 5 dual-timeline facets.",
    curatedBy: "CURATED BY",
    source: "SOURCES & ORAL HISTORY",
    cardSourceLabel: "Source",
    curatorName: "Tyvirakpoung Piseth",
    sourceDesc: "1980s Heritage: Oral history shared by My Father (Soy Piseth) & My Uncle (Leang Phally). 2020s Present: Firsthand lifestyle observations by Tyvirakpoung Piseth.",
    entrySourceLabel: "SOURCE & ATTRIBUTION",
    
    // Footer
    footerBrand: "Khmer Living Archive / Cambodia Lifestyle",
    footerCourse: "ICT 340 · AUPP · Fall 2026",
  },
  
  km: {
    brand: "រស់នៅបែបខ្មែរ",
    brandSub: "បណ្ណសាររបៀបរស់នៅប្រចាំថ្ងៃ",
    navExplore: "រុករកបណ្ណសារ",
    navAbout: "អំពីគម្រោង",
    motionOn: "ចលនា: បើក",
    motionOff: "ចលនា: បិទ",
    skipLink: "រំលងទៅកាន់បណ្ណសារ",
    
    // Hero section
    heroKicker: "ប្រទេសមួយ។ សាច់រឿងច្រើនជំនាន់។",
    heroTitlePast: "កម្ពុជា,",
    heroTitlePastSub: "របៀបដែលយើងធ្លាប់រស់នៅ។",
    heroTitlePresent: "កម្ពុជា,",
    heroTitlePresentSub: "ពិភពលោកនៃការផ្លាស់ប្តូរ។",
    heroDescPast: "មុនពេលពន្លឺភ្លើងទីក្រុង ជីវិតមានចង្វាក់ខុសប្លែកពីបច្ចុប្បន្ន។ ឈានជើងចូលទៅកាន់ផ្ទះឈើ ផ្លូវដីហុយ និងរឿងរ៉ាវប្រចាំថ្ងៃនៃមនុស្សជំនាន់មុន។",
    heroDescPresent: "ពីផ្ទះឈើបុរាណមកកាន់អគារខ្ពស់កប់ពពក។ ធ្វើដំណើរឆ្លងកាត់ជំនាន់ និងស្វែងយល់ពីរបៀបដែលជីវិតប្រចាំថ្ងៃរបស់ប្រជាជនកម្ពុជាបានផ្លាស់ប្តូរ។",
    heroExplore: "រុករកជីវិតប្រចាំថ្ងៃ",
    heroStatStories: "០៥ សាច់រឿង",
    heroStatEras: "០២ យុគសម័យ",
    heroStatHeritage: "មរតករួមគ្នាតែមួយ",
    heroScenePast: "ឫសគល់នៃជីវិតប្រចាំថ្ងៃ",
    heroScenePresent: "ទំព័រថ្មីនៃកម្ពុជា",
    
    // Timeline
    timelineKicker: "ម៉ាស៊ីនពេលវេលា",
    timelineTitle: "ទីកន្លែងតែមួយ។",
    timelineTitleSub: "ពេលវេលាខុសគ្នា។",
    eraPast: "អតីតកាល",
    eraPastDecade: "ទសវត្សរ៍ ៨០–៩០",
    eraPresent: "បច្ចុប្បន្ន",
    eraPresentDecade: "ទសវត្សរ៍ ២០២០",
    statusPast: "សម័យអតីតកាល · អ្នកកំពុងនៅទីនេះ",
    statusPresent: "សម័យបច្ចុប្បន្ន · អ្នកកំពុងនៅទីនេះ",
    statusLeaving: "កំពុងចាកចេញពីសម័យនេះ…",
    statusDrawing: "កំពុងបង្ហាញពិភពថ្មី…",
    
    // Archive toolbar
    toolbarKicker: "បណ្តុំរឿងរ៉ាវប្រចាំថ្ងៃ",
    toolbarTitle: "រឿងរ៉ាវតូចៗ។",
    toolbarTitleSub: "ការផ្លាស់ប្តូរធំៗ។",
    searchPlaceholder: "ស្វែងរកសាច់រឿង… (ឧ. ម្ហូប, កង់, ស្នេហា)",
    searchClear: "សម្អាតការស្វែងរក",
    searchNoMatch: "គ្មានលទ្ធផលត្រូវគ្នាផ្ទាល់ — ចុច Enter ដើម្បីស្វែងរក",
    
    // Cards list
    storiesCountAll: "០៥ សាច់រឿងសម្រាប់រុករក · ចុចលើរូបគំនូរដើម្បីចូលអាន",
    storiesCountMatch: (matchCount, total) => `${matchCount} នៃ ${total} សាច់រឿងត្រូវគ្នានឹងការស្វែងរករបស់អ្នក`,
    noStoriesFound: "រកមិនឃើញសាច់រឿងទេ",
    noStoriesHint: "សាកល្បងស្វែងរកពាក្យ “ម្ហូប”, “សាលា” ឬ “កង់” ឬបង្ហាញសាច់រឿងទាំងអស់ឡើងវិញ។",
    showAllStories: "បង្ហាញសាច់រឿងទាំងអស់",
    stepIntoStory: "ឈានចូលអានសាច់រឿង",
    kickerHeritage: "ជីវិតមុនពេលមានពន្លឺភ្លើងក្រុង",
    kickerModern: "ជីវិតក្នុងយុគសម័យឌីជីថលនៃកម្ពុជា",
    storyLabel: "សាច់រឿង",
    
    // Modal
    closeEntry: "បិទផ្ទាំង",
    priceIndexTitle: "សន្ទស្សន៍តម្លៃទំនិញ — ទសវត្សរ៍ ៨០ ⇄ ២០២០",
    archivePhotosTitle: (isHeritage) => `រូបថតបណ្ណសារ · ${isHeritage ? "ទសវត្សរ៍ ៨០–៩០" : "ទសវត្សរ៍ ២០២០"}`,
    photoCounter: (curr, total) => `រូបថតទី ${curr} នៃ ${total}`,
    prevPhoto: "← មុន",
    nextPhoto: "រូបបន្ទាប់ ↻",
    infiniteScrollNote: (total) => `ដំណើរការរំកិលមិនចេះចប់ (វិលជុំ ១ ⇄ ${total})`,
    noPhotosTitle: (isHeritage) => `មិនទាន់មានរូបថតសម័យ${isHeritage ? "ដើម" : "ថ្មី"}ទេ`,
    noPhotosDesc: (isHeritage, topic) => `បច្ចុប្បន្នមិនទាន់មានរូបថតសម័យ${isHeritage ? "មុន" : "បច្ចុប្បន្ន"}សម្រាប់ "${topic}" នៅឡើយទេ។`,
    photoPatternBadge: (prefix, folder) => `គំរូឈ្មោះរូបភាព: ${prefix}1.png, ${prefix}2.png… ក្នុង /assets/images/${folder}/`,
    
    // Time warp button
    warpToPast: "បម្លាស់ប្តូរពេលវេលា · ទសវត្សរ៍ ៨០ · សម័យដើម",
    warpToPresent: "បម្លាស់ប្តូរពេលវេលា · ២០២០ · សម័យថ្មី",
    warpingToPast: "កំពុងស្ថាបនាទសវត្សរ៍ ៨០ ឡើងវិញ…",
    warpingToPresent: "កំពុងបម្លាស់មកទសវត្សរ៍ ២០២០…",
    
    // About
    aboutKicker: "ការរក្សាសាច់រឿងរបស់យើងឱ្យនៅរស់រវើក",
    aboutTitle: "ប្រទេសមួយដែលផ្លាស់ប្តូរ។",
    aboutTitleSub: "ទំនាក់ទំនងដែលនៅគង់វង្ស។",
    aboutDesc: "ការប្រៀបធៀបរបៀបរស់នៅរបស់ប្រជាជនកម្ពុជាក្នុងទសវត្សរ៍ឆ្នាំ១៩៨០ និងសម័យបច្ចុប្បន្ន រៀបចំសម្រាប់គម្រោងបញ្ចប់ការសិក្សាវគ្គ Vibe Coding។",
    aboutNote: "បណ្ណសាររស់នៅដែលកត់ត្រាការពិតជាក់ស្តែងចំនួន ១០ នៃមនុស្សពីរជំនាន់ ឆ្លងកាត់ ៥ ទិដ្ឋភាពនៃជីវិតប្រចាំថ្ងៃ។",
    curatedBy: "រៀបចំចងក្រងដោយ",
    source: "ប្រភព និងប្រវត្តិផ្ទាល់មាត់",
    cardSourceLabel: "ប្រភព",
    curatorName: "ពិសិដ្ឋ​ ទីវីរៈពង្ស ",
    sourceDesc: "សម័យដើមទសវត្សរ៍ ៨០: ប្រវត្តិផ្ទាល់មាត់ពី ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)។ សម័យបច្ចុប្បន្ន ២០២០: ការកត់ត្រាសង្កេតផ្ទាល់ជាក់ស្តែងដោយ ពិសិដ្ឋ​​ ទីវីរៈពង្ស។",
    entrySourceLabel: "ប្រភព និងការចងក្រង",
    
    // Footer
    footerBrand: "បណ្ណសាររស់នៅបែបខ្មែរ / របៀបរស់នៅកម្ពុជា",
    footerCourse: "ICT 340 · AUPP · ឆមាសរដូវស្លឹកឈើជ្រុះ ២០២៦",
  },
};

// Raw card content with full English and Khmer translations + hidden keywords for search
export const rawCardsData = [
  {
    num: "01",
    numKm: "០១",
    slug: "commute-and-mobility",
    imageConfig: {
      folder: "commute-and-mobility",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
    topic: {
      en: "Commute & Mobility",
      km: "ការធ្វើដំណើរ និងមធ្យោបាយធ្វើដំណើរ",
    },
    modern: {
      label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      headline: {
        en: "Smart Keys, Sleek Scooters & Traffic Boulevards",
        km: "សោស្មាតឃី ម៉ូតូស្កូតទ័រទំនើប និងមហាវិថីអ៊ូអរ",
      },
      details: {
        en: "Dominant use of automatic scooters (Honda Scoopy, PCX, Click, Zoomer-X); ride-hailing apps (Grab); paved roads.",
        km: "ការប្រើប្រាស់ម៉ូតូអូតូជាទូទៅ (Honda Scoopy, PCX, Click, Zoomer-X) កម្មវិធីកក់ការធ្វើដំណើរ (Grab) និងផ្លូវកៅស៊ូខ្វាត់ខ្វែង។",
      },
      role: {
        en: "Daily commute doubles as personal style and status.",
        km: "ការធ្វើដំណើរប្រចាំថ្ងៃឆ្លុះបញ្ចាំងពីស្ទីលផ្ទាល់ខ្លួន និងភាពទាន់សម័យ។",
      },
      chips: {
        en: ["⚡ Grab 24/7", "🛴 PCX & Click", "🗺️ Paved boulevards"],
        km: ["⚡ Grab ២៤ម៉ោង", "🛴 ម៉ូតូ PCX & Click", "🗺️ មហាវិថីកៅស៊ូ"],
      },
      source: {
        en: "Firsthand observation by Tyvirakpoung Piseth (Phnom Penh 2020s)",
        km: "ការកត់ត្រាសង្កេតផ្ទាល់ដោយ ពិសិដ្ឋ​ ទីវីរៈពង្ស  (រាជធានីភ្នំពេញ ទសវត្សរ៍ ២០២០)",
      },
    },
    heritage: {
      label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      headline: {
        en: "Steel Frames, Cyclos & Early Two-Strokes",
        km: "កង់តួដែកធ្ងន់ ស៊ីក្លូ និងម៉ូតូកន្ត្រាក់ជំនាន់ដំបូង",
      },
      details: {
        en: "Single-gear heavy steel bicycles, Cyclos, and early step-through motorbikes (Suzuki Viva 110, Honda Chaly, Honda C70/Dame).",
        km: "កង់ដែកធ្ងន់លេខទោល ស៊ីក្លូ និងម៉ូតូចាស់ៗសម័យមុន (Suzuki Viva 110, Honda Chaly, អាសង់កូរ៉េ C70/ដេម)។",
      },
      role: {
        en: "Manual kick-starts and long pedals on dirt roads; high value placed on a first family bike.",
        km: "ការធាក់កង់វែងឆ្ងាយលើផ្លូវដីហុយ និងការធាក់បញ្ឆេះម៉ូតូដោយដៃជើង កង់គ្រួសារដំបូងមានតម្លៃខ្ពស់ណាស់។",
      },
      chips: {
        en: ["🚲 Cyclo era", "🛞 Dirt roads", "🔑 Kick-start only"],
        km: ["🚲 សម័យស៊ីក្លូ", "🛞 ផ្លូវដីហុយ", "🔑 បញ្ឆេះដោយជើង"],
      },
      source: {
        en: "My Father (Soy Piseth) & My Uncle (Leang Phally)",
        km: "ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)",
      },
    },
    caption: {
      heritage: { en: "PEDALS & CYCLO RIDES", km: "ការធាក់កង់ និងជិះស៊ីក្លូ" },
      modern: { en: "SMART KEYS & CITY STREETS", km: "សោស្មាតឃី និងដងវិថីក្រុង" },
    },
    commonKeywords: [
      "commute", "mobility", "transport", "traffic", "road", "wheel", "ride",
      "ធ្វើដំណើរ", "មធ្យោបាយ", "ផ្លូវ", "ចរាចរណ៍"
    ],
    heritageKeywords: [
      "bicycle", "cyclo", "bike", "dirt", "viva", "chaly", "c70", "dame", "steel", "kick-start", "suzuki",
      "ជិះកង់", "កង់", "ស៊ីក្លូ", "ផ្លូវដី", "អាសង់", "សយ ពិសិដ្ឋ", "លាង ផល្លី"
    ],
    modernKeywords: [
      "scooter", "honda", "pcx", "click", "grab", "boulevard", "smart key", "zoomer", "automatic",
      "ហ្គ្រេប", "មហាវិថី", "ម៉ូតូ", "ឡាន", "ស្កូតទ័រ", "ពិសិដ្ឋ ទីវីរៈពង្ស"
    ],
  },
  {
    num: "02",
    numKm: "០២",
    slug: "morning-routine",
    imageConfig: {
      folder: "morning-routine",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
    topic: {
      en: "Morning Routine & School Prep",
      km: "ទម្លាប់ពេលព្រឹក និងការរៀបចំទៅរៀន",
    },
    modern: {
      label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      headline: {
        en: "Frictionless Mornings & Digital Schedules",
        km: "ពេលព្រឹកងាយស្រួល និងកាលវិភាគឌីជីថល",
      },
      details: {
        en: "Smartphone alarms; Telegram class announcements; 15-minute routine with indoor running water and electric heaters; instant street breakfast or delivery.",
        km: "ម៉ោងរោទិ៍ទូរស័ព្ទដៃ ការជូនដំណឹងថ្នាក់រៀនតាមតេឡេក្រាម ងូតទឹកក្តៅក្នុងផ្ទះត្រឹម១៥នាទី និងអាហារពេលព្រឹកតាមផ្លូវ ឬកុម្ម៉ង់ដឹកជញ្ជូន។",
      },
      chips: {
        en: ["🔴 Live Telegram", "⏰ 15-min routine"],
        km: ["🔴 តេឡេក្រាមថ្នាក់រៀន", "⏰ រៀបចំខ្លួន១៥នាទី"],
      },
      source: {
        en: "Firsthand observation by Tyvirakpoung Piseth (student routine, Phnom Penh 2020s)",
        km: "ការកត់ត្រាសង្កេតផ្ទាល់ដោយ ពិសិដ្ឋ​ ទីវីរៈពង្ស  (ទម្លាប់និស្សិត រាជធានីភ្នំពេញ ទសវត្សរ៍ ២០២០)",
      },
    },
    heritage: {
      label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      headline: {
        en: "Dawn Labor, Heavy Buckets & Wood Stoves",
        km: "ការងារទាបភ្លឺ យោងធុងទឹក និងដុតចង្ក្រានអុស",
      },
      details: {
        en: "5:00 AM start hauling water buckets from the river/pond on shoulder poles to fill clay jars (Peang); lighting charcoal/wood stoves (Changkran) to reheat rice and fry fish before a long bike commute.",
        km: "ក្រោកម៉ោង ៥ ព្រឹកយោងទឹកពីទន្លេ ឬស្រះដោយរែកអម្រែកដាក់ពាងធំៗ ដុតចង្ក្រានអុស ឬធ្យូងកម្តៅបាយកក និងបំពងត្រី មុនធាក់កង់ទៅរៀនយ៉ាងឆ្ងាយ។",
      },
      chips: {
        en: ["🪣 River dawn", "🔥 Changkran stove"],
        km: ["🪣 រែកទឹកទាបភ្លឺ", "🔥 ចង្ក្រានអុសជើងក្រាន"],
      },
      source: {
        en: "My Father (Soy Piseth) & My Uncle (Leang Phally)",
        km: "ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)",
      },
    },
    caption: {
      heritage: { en: "WATER JARS & WOOD-FIRED MORNINGS", km: "ពាងទឹក និងចង្ក្រានអុសពេលព្រឹក" },
      modern: { en: "ALARMS, CLASS CHATS & BREAKFAST", km: "ម៉ោងរោទិ៍ គ្រុបតេឡេក្រាម និងអាហារពេលព្រឹក" },
    },
    commonKeywords: [
      "morning", "routine", "school", "wake", "breakfast", "rice",
      "ពេលព្រឹក", "រៀន", "សាលា", "អាហារពេលព្រឹក"
    ],
    heritageKeywords: [
      "water", "stove", "river", "pond", "bucket", "changkran", "peang", "pneang", "haul", "charcoal", "fish", "firewood", "clay jar", "shoulder pole",
      "រែកទឹក", "ពាងទឹក", "ចង្ក្រានអុស", "បាយកក", "ត្រីងៀត", "សយ ពិសិដ្ឋ", "លាង ផល្លី"
    ],
    modernKeywords: [
      "alarm", "telegram", "smartphone", "heater", "running water", "instant", "chat", "delivery", "class", "15-minute",
      "ម៉ោងរោទិ៍", "តេឡេក្រាម", "ងូតទឹក", "ពិសិដ្ឋ ទីវីរៈពង្ស"
    ],
  },
  {
    num: "03",
    numKm: "០៣",
    slug: "free-time-and-entertainment",
    imageConfig: {
      folder: "free-time-and-entertainment",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
    topic: {
      en: "Free Time, Entertainment & Side Hustles",
      km: "ពេលទំនេរ ការកម្សាន្ត និងការងារក្រៅម៉ោង",
    },
    modern: {
      label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      headline: {
        en: "Screen Connectivity, Digital Escapes & Malls",
        km: "ការតភ្ជាប់អេក្រង់ ការកម្សាន្តឌីជីថល និងផ្សារទំនើប",
      },
      details: {
        en: "YouTube, Netflix, mobile gaming (MLBB/PUBG), coding projects; hanging out in air-conditioned malls (Aeon) and cafes; digital freelance side hustles.",
        km: "មើល YouTube, Netflix, លេងហ្គេមទូរស័ព្ទ (MLBB, PUBG), សរសេរកូដ ដើរលេងផ្សារទំនើបត្រជាក់ៗ (Aeon) និងហាងកាហ្វេ ព្រមទាំងការងារហ្វ្រីឡេនឌីជីថល។",
      },
      chips: {
        en: ["📺 Netflix+", "🎮 MLBB / PUBG", "💻 Digital hustles"],
        km: ["📺 មើល Netflix+", "🎮 ហ្គេម MLBB / PUBG", "💻 ការងារឌីជីថល"],
      },
      source: {
        en: "Firsthand observation by Tyvirakpoung Piseth (youth entertainment, Phnom Penh 2020s)",
        km: "ការកត់ត្រាសង្កេតផ្ទាល់ដោយ ពិសិដ្ឋ​ ទីវីរៈពង្ស  (ការកម្សាន្តយុវជន រាជធានីភ្នំពេញ ទសវត្សរ៍ ២០២០)",
      },
    },
    heritage: {
      label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      headline: {
        en: "Open-Air Games, Pagoda Hangouts & Community Labor",
        km: "ល្បែងប្រជាប្រិយ ជួបជុំនៅវត្ត និងការងារជួយសហគមន៍",
      },
      details: {
        en: "Folk games (Sey, Chhoung, street soccer), transistor radios, cassette tapes; pocket money earned through local errands, elder massage, and copying school notes.",
        km: "ល្បែងប្រជាប្រិយ (ទាត់សី ចោលឈូង បាល់ទាត់លើដីខ្សាច់) វិទ្យុត្រង់ស៊ីស្ទ័រ កាសែតចម្រៀង រកលុយចាយតាមរយៈការរត់ការទិញអីវ៉ាន់ ច្របាច់កំភួនជើងឱ្យចាស់ៗ និងចម្លងមេរៀន។",
      },
      chips: {
        en: ["📻 Transistor radio", "🎖️ Folk games"],
        km: ["📻 វិទ្យុកាសែត", "🎖️ ល្បែងប្រជាប្រិយ"],
      },
      source: {
        en: "My Father (Soy Piseth) & My Uncle (Leang Phally)",
        km: "ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)",
      },
    },
    caption: {
      heritage: { en: "SEY, CASSETTES & OPEN AIR", km: "ការទាត់សី កាសែតចម្រៀង និងទីវាល" },
      modern: { en: "PLAY, STREAM & CREATE", km: "លេងហ្គេម មើលវីដេអូ និងធ្វើការងារឌីជីថល" },
    },
    commonKeywords: [
      "free time", "entertainment", "hobby", "games", "leisure", "music", "play", "hustle",
      "ពេលទំនេរ", "កម្សាន្ត", "ហ្គេម", "លេង", "ចម្រៀង"
    ],
    heritageKeywords: [
      "sey", "chhoung", "radio", "cassette", "pagoda", "soccer", "errands", "massage", "chap sos", "copy", "notes", "transistor", "pocket money",
      "ទាត់សី", "ចោលឈូង", "វិទ្យុ", "កាសែត", "វត្តអារាម", "ច្របាច់ជើង", "ចម្លងមេរៀន", "សយ ពិសិដ្ឋ", "លាង ផល្លី"
    ],
    modernKeywords: [
      "youtube", "netflix", "pubg", "mlbb", "aeon", "mall", "cafe", "freelance", "side hustle", "coding", "mobile gaming", "streaming", "screen",
      "អ៊ីអន", "ផ្សារទំនើប", "ហាងកាហ្វេ", "សរសេរកូដ", "ពិសិដ្ឋ ទីវីរៈពង្ស"
    ],
  },
  {
    num: "04",
    numKm: "០៤",
    slug: "street-food-and-cost",
    imageConfig: {
      folder: "street-food-and-cost",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
    topic: {
      en: "Street Food & Cost of Living",
      km: "ម្ហូបតាមផ្លូវ និងកម្រិតជីវភាពរស់នៅ",
    },
    modern: {
      label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      headline: {
        en: "Global Palates, Boba & On-Demand Delivery",
        km: "រសជាតិចម្រុះជាតិសាសន៍ តែគុជ និងសេវាដឹកជញ្ជូនរហ័ស",
      },
      details: {
        en: "Base street snacks start around 4,000 KHR ($1.00); unlimited access to Korean BBQ, Japanese sushi, milk tea, and app delivery (Nham24/Foodpanda).",
        km: "ចំណីតាមផ្លូវចាប់ពី ៤,០០០ រៀល ($១.០០) ឡើងទៅ មានទាំងសាច់អាំងកូរ៉េ ស៊ូស៊ីជប៉ុន តែគុជ និងកុម្ម៉ង់តាមអេប (Nham24, Foodpanda)។",
      },
      chips: {
        en: ["🚴 Foodpanda Now", "🍜 Nham24", "🧋 Boba culture"],
        km: ["🚴 ដឹកជញ្ជូន Foodpanda", "🍜 អេប Nham24", "🧋 វប្បធម៌តែគុជ"],
      },
      source: {
        en: "Firsthand observation by Tyvirakpoung Piseth (app delivery & modern food scene, 2020s)",
        km: "ការកត់ត្រាសង្កេតផ្ទាល់ដោយ ពិសិដ្ឋ​ ទីវីរៈពង្ស  (សេវាដឹកជញ្ជូន និងម្ហូបសម័យថ្មី ទសវត្សរ៍ ២០២០)",
      },
    },
    heritage: {
      label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      headline: {
        en: "Cart Bells, Chive Cakes & Post-War Scarcity",
        km: "កណ្តឹងរទេះ នំកាឆាយ និងជីវិតខ្វះខាតក្រោយសង្គ្រាម",
      },
      details: {
        en: "100–500 Riel snacks; hyper-local staples only (Num Kchay, Num Krouk, Num Banh Chok, hand-pulled sticky candies, uncle-pushed ice cream carts); reliant on morning market hours.",
        km: "ចំណីញ៉ាំតម្លៃត្រឹម ១០០–៥០០ រៀល មានតែម្ហូបប្រពៃណីខ្មែរ (នំកាឆាយ នំគ្រក់ នំបញ្ចុក ស្ករទាញ ការ៉េមកោសរុញដោយកង់) និងពឹងផ្អែកលើម៉ោងផ្សារព្រឹក។",
      },
      chips: {
        en: ["🔔 Cart bells", "🪙 100–500 Riel"],
        km: ["🔔 កណ្តឹងរទេះលក់ដូរ", "🪙 តម្លៃ ១០០–៥០០ រៀល"],
      },
      source: {
        en: "My Father (Soy Piseth) & My Uncle (Leang Phally)",
        km: "ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)",
      },
    },
    priceIndex: [
      {
        item: { en: "Street snack", km: "ចំណីតាមផ្លូវ" },
        past: { en: "100–500 Riel", km: "១០០–៥០០ រៀល" },
        present: { en: "≈4,000 KHR ($1.00)", km: "≈ ៤,០០០ រៀល ($១.០០)" },
      },
      {
        item: { en: "Num Banh Chok bowl", km: "នំបញ្ចុកមួយចាន" },
        past: { en: "~200 Riel", km: "~ ២០០ រៀល" },
        present: { en: "~5,000 KHR", km: "~ ៥,០០០ រៀល" },
      },
      {
        item: { en: "Iced drink", km: "ភេសជ្ជៈត្រជាក់" },
        past: { en: "Iced Syrup ~100 Riel", km: "ទឹកសេរ៉ូ ~ ១០០ រៀល" },
        present: { en: "Boba ~8,000 KHR ($2.00)", km: "តែគុជ ~ ៨,០០០ រៀល ($២.០០)" },
      },
    ],
    caption: {
      heritage: { en: "CHIVE CAKES & CART BELLS", km: "នំកាឆាយ និងកណ្តឹងរទេះលក់ដូរ" },
      modern: { en: "BOBA & DOORSTEP DELIVERY", km: "តែគុជ និងសេវាដឹកដល់កន្លែង" },
    },
    commonKeywords: [
      "street food", "cost living", "food", "snack", "riel", "market", "price", "eat", "drink",
      "ម្ហូប", "អាហារ", "ចំណី", "តម្លៃ", "លុយរៀល", "ញ៉ាំ", "ឆ្ងាញ់"
    ],
    heritageKeywords: [
      "num kchay", "num krouk", "banh chok", "skor teanh", "ice cream", "cart", "bell", "scarcity", "post-war", "morning market", "syrup", "iced syrup", "100 riel", "500 riel",
      "នំកាឆាយ", "នំគ្រក់", "នំបញ្ចុក", "ស្ករទាញ", "ទឹកសេរ៉ូ", "ការ៉េមកោស", "កណ្តឹង", "ផ្សារព្រឹក", "រទេះ", "សយ ពិសិដ្ឋ", "លាង ផល្លី"
    ],
    modernKeywords: [
      "boba", "nham24", "foodpanda", "delivery", "korean", "bbq", "sushi", "japanese", "milk tea", "khr", "dollar", "app", "on-demand",
      "តែគុជ", "សាច់អាំង", "ស៊ូស៊ី", "ដឹកជញ្ជូន", "ពិសិដ្ឋ ទីវីរៈពង្ស"
    ],
  },
  {
    num: "05",
    numKm: "០៥",
    slug: "romance-and-date-culture",
    imageConfig: {
      folder: "romance-and-date-culture",
      pastPrefix: "past",
      presentPrefix: "present",
      pastCount: 2,
      presentCount: 2,
      ext: "png",
    },
    topic: {
      en: "Romance & Dating Culture",
      km: "ស្នេហា និងវប្បធម៌នៃការណាត់ជួប",
    },
    modern: {
      label: { en: "MODERN · 2020s", km: "សម័យថ្មី · ទសវត្សរ៍ ២០២០" },
      headline: {
        en: "Curated Feeds, Talking Stages & Ambiguity",
        km: "រូបភាពលើបណ្តាញសង្គម ដំណាក់កាលជជែក និងភាពមិនច្បាស់លាស់",
      },
      details: {
        en: "Romance filtered through Instagram stories and messaging rules; high fear of direct confession; ambiguous labels (situationships, breadcrumbing, FWB).",
        km: "ស្នេហាតាមរយៈ Instagram stories និងច្បាប់ឆ្លើយឆ្លងសារ ការខ្លាចមិនហ៊ានសារភាពត្រង់ៗ ទំនាក់ទំនងមិនច្បាស់លាស់ (situationship, talking stage)។",
      },
      chips: {
        en: ["💬 IG Stories", "🐍 Breadcrumbing"],
        km: ["💬 សារ IG Stories", "🐍 ទំនាក់ទំនងមិនច្បាស់លាស់"],
      },
      source: {
        en: "Firsthand observation by Tyvirakpoung Piseth (contemporary dating culture, 2020s)",
        km: "ការកត់ត្រាសង្កេតផ្ទាល់ដោយ ពិសិដ្ឋ​ ទីវីរៈពង្ស  (វប្បធម៌ណាត់ជួបយុវជន ទសវត្សរ៍ ២០២០)",
      },
    },
    heritage: {
      label: { en: "HERITAGE · 1980s–90s", km: "សម័យដើម · ទសវត្សរ៍ ៨០–៩០" },
      headline: {
        en: "Direct Confessions, Paper Notes & Clear Intentions",
        km: "ការសារភាពត្រង់ៗ សំបុត្រក្រដាស និងចិត្តស្មោះពិតប្រាកដ",
      },
      details: {
        en: "No multi-month guessing games; \"I love you\" carried genuine weight; courtship happened through folded paper notes and sharing bicycle rides home.",
        km: "គ្មានការទាយចិត្តរាប់ខែ ពាក្យថា \"ស្រឡាញ់\" មានទម្ងន់ពិតប្រាកដ ការស្រឡាញ់គ្នាតាមរយៈសំបុត្រក្រដាសបត់ និងការជូនគ្នាជិះកង់ទៅផ្ទះ។",
      },
      chips: {
        en: ["✉️ Paper notes", "🚲 Rides home"],
        km: ["✉️ សំបុត្របត់", "🚲 ជូនជិះកង់ទៅផ្ទះ"],
      },
      source: {
        en: "My Father (Soy Piseth) & My Uncle (Leang Phally)",
        km: "ឪពុករបស់ខ្ញុំ (សយ ពិសិដ្ឋ) និងអ៊ុំបង្កើតរបស់ខ្ញុំ (លាង ផល្លី)",
      },
    },
    caption: {
      heritage: { en: "PAPER NOTES & RIDES HOME", km: "សំបុត្រក្រដាស និងការជូនទៅផ្ទះ" },
      modern: { en: "STORIES, HEARTS & TYPING DOTS", km: "ស្ទូរី បេះដូង និងសារជជែក" },
    },
    commonKeywords: [
      "romance", "dating", "love", "couple", "date", "heart", "confession",
      "ស្នេហា", "សង្សារ", "ណាត់ជួប", "ស្រឡាញ់", "បេះដូង", "គូស្នេហ៍"
    ],
    heritageKeywords: [
      "paper note", "folded", "bicycle ride", "intentions", "genuine", "ride home", "escort", "letters", "honest",
      "សំបុត្រ", "សំបុត្របត់", "ជិះកង់ជូន", "សំបុត្រស្នេហ៍", "សយ ពិសិដ្ឋ", "លាង ផល្លី"
    ],
    modernKeywords: [
      "ig", "instagram", "story", "relationship", "fwb", "situationship", "breadcrumbing", "talking stage", "chat", "dm", "filter", "feed", "typing", "stories",
      "ជជែកស្នេហ៍", "សារ", "ស្ទូរី", "ពិសិដ្ឋ ទីវីរៈពង្ស"
    ],
  },
];

// Helper to get card in target language
export function getTranslatedCard(rawCard, lang = "en") {
  const l = lang === "km" ? "km" : "en";
  return {
    num: l === "km" ? rawCard.numKm : rawCard.num,
    rawNum: rawCard.num,
    slug: rawCard.slug,
    imageConfig: rawCard.imageConfig,
    topic: rawCard.topic[l] || rawCard.topic.en,
    modern: {
      label: rawCard.modern.label[l] || rawCard.modern.label.en,
      headline: rawCard.modern.headline[l] || rawCard.modern.headline.en,
      details: rawCard.modern.details[l] || rawCard.modern.details.en,
      role: rawCard.modern.role?.[l] || rawCard.modern.role?.en,
      chips: rawCard.modern.chips[l] || rawCard.modern.chips.en,
      source: rawCard.modern.source?.[l] || rawCard.modern.source?.en,
    },
    heritage: {
      label: rawCard.heritage.label[l] || rawCard.heritage.label.en,
      headline: rawCard.heritage.headline[l] || rawCard.heritage.headline.en,
      details: rawCard.heritage.details[l] || rawCard.heritage.details.en,
      role: rawCard.heritage.role?.[l] || rawCard.heritage.role?.en,
      chips: rawCard.heritage.chips[l] || rawCard.heritage.chips.en,
      source: rawCard.heritage.source?.[l] || rawCard.heritage.source?.en,
    },
    priceIndex: rawCard.priceIndex?.map((row) => ({
      item: row.item[l] || row.item.en,
      past: row.past[l] || row.past.en,
      present: row.present[l] || row.present.en,
    })),
    caption: {
      heritage: rawCard.caption?.heritage?.[l] || rawCard.caption?.heritage?.en,
      modern: rawCard.caption?.modern?.[l] || rawCard.caption?.modern?.en,
    },
    commonKeywords: rawCard.commonKeywords || [],
    heritageKeywords: rawCard.heritageKeywords || [],
    modernKeywords: rawCard.modernKeywords || [],
    keywords: [
      ...(rawCard.commonKeywords || []),
      ...(rawCard.heritageKeywords || []),
      ...(rawCard.modernKeywords || []),
    ],
  };
}

// Re-export modular search functions from dedicated search module
export {
  getCardHaystack,
  getActiveKeywords,
  searchTerms,
  scoreCard,
  filterCardsByTerms,
} from "./search.js";

