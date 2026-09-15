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
        en: "Today I ride a 2016 red Honda Scoopy. Depending on distance I also walk a lot, or take ride-hailing apps — Grab, TADA, PassApp — and the City Bus. Since I was twelve, my daily commute has exceeded 10 km, so travel is simply a normal part of the day.\n\nMy father's stories and my routine cover the same distance; the difference is the surface and the machine. He covered comparable ground on a small bicycle over dirt roads, while I do it on a scooter over paved streets.\n\nA modern motorcycle now costs about $600–$1,500 depending on brand and type. Back then my father's bicycle was worth roughly $20–$30, a purchase families measured against gold.",
        km: "សព្វថ្ងៃខ្ញុំបើក Honda Scoopy ពណ៌ក្រហម ឆ្នាំ ២០១៦។ អាស្រ័យលើចម្ងាយ ខ្ញុំក៏ដើរច្រើន ឬជិះកម្មវិធី Grab, TADA, PassApp និងឡានក្រុង។ តាំងពីអាយុ ១២ ឆ្នាំ ការធ្វើដំណើរប្រចាំថ្ងៃរបស់ខ្ញុំលើសពី ១០ គីឡូម៉ែត្រ ដូច្នេះការធ្វើដំណើរជាផ្នែកធម្មតានៃថ្ងៃ។\n\nរឿងរបស់ឪពុកខ្ញុំ និងទម្លាប់ខ្ញុំ គឺចម្ងាយដូចគ្នា ភាពខុសគ្នាគឺផ្ទៃផ្លូវ និងម៉ាស៊ីន។ គាត់ធ្វើដំណើរចម្ងាយស្មើគ្នាដោយកង់តូចលើផ្លូវដី ខណៈខ្ញុំធ្វើវាដោយម៉ូតូលើផ្លូវកៅស៊ូ។\n\nម៉ូតូសម័យថ្មីមានតម្លៃពី ៦០០ ដុល្លារ ដល់ ១,៥០០ ដុល្លារ អាស្រ័យលើម៉ាក និងប្រភេទ។ សម័យនោះកង់របស់ឪពុកខ្ញុំមានតម្លៃប្រហែល ២០–៣០ ដុល្លារ ដែលគ្រួសារវាស់ធៀបនឹងមាស។",
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
        en: "In the 1980s and 90s, most people moved on foot or on small-framed bicycles. In the countryside where my father lived, the routes were dirt and gravel; he only met paved roads after moving into the city. Walking was the default, and every errand was measured in distance and daylight.\n\nLater came motorcycles, cyclos, tuk-tuks and moto-taxis, but cars stayed out of reach — the family was not wealthy enough to own one. My father grew up with only my grandmother, so no one formally taught him to ride; he learned on his own.\n\nHis first bicycle was not bought by him. My grandmother and his aunts pooled their savings to buy it. In that era large purchases were measured against gold, and a bicycle like his was worth roughly $20–$30.",
        km: "ក្នុងទសវត្សរ៍ ៨០ និង ៩០ មនុស្សភាគច្រើនធ្វើដំណើរដោយថ្មើរជើង ឬកង់តូចៗ។ នៅជនបទដែលឪពុកខ្ញុំរស់នៅ ផ្លូវជាដី និងក្រួស គាត់បានឃើញផ្លូវកៅស៊ូតែពេលផ្លាស់មកទីក្រុង។ ការដើរជាមធ្យោបាយធម្មតា ហើយរាល់ការងារត្រូវគិតតាមចម្ងាយ និងពន្លឺថ្ងៃ។\n\nបន្ទាប់មកមានម៉ូតូ ស៊ីក្លូ ទុកទុក និងម៉ូតូឌុប ប៉ុន្តែឡាននៅតែក្រៅសមត្ថភាព — គ្រួសារមិនអាចទិញបាន។ ឪពុកខ្ញុំរស់នៅតែជាមួយយាយ ដូច្នេះគ្មាននរណាបង្រៀនគាត់បើកបរទេ គាត់រៀនដោយខ្លួនឯង។\n\nកង់ដំបូងរបស់គាត់មិនមែនគាត់ទិញទេ។ យាយ និងមីងៗរបស់គាត់ប្រមូលលុយទិញឱ្យ។ សម័យនោះ ការទិញធំៗគេវាស់ធៀបនឹងមាស ហើយកង់របស់គាត់មានតម្លៃប្រហែល ២០–៣០ ដុល្លារ។",
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
        en: "I am in university now and wake at seven, either to my alarm or to my father calling me. Water runs directly at home, and getting ready takes about ten minutes, while it took my father close to an hour.\n\nMy mother and aunt cook breakfast for me every morning, so I am lucky there. I rely heavily on my phone and iPad from the moment I wake, checking notifications from my class and friends.\n\nThe contrast sits in the morning itself: my father rose into physical reality — exercise, labor, then the ride to school. I rise, reach for my phone, and stay absorbed in electronics for nearly twelve hours a day.",
        km: "ខ្ញុំកំពុងរៀននៅសាកលវិទ្យាល័យ ហើយក្រោកពីគេងម៉ោង ៧ ដោយម៉ោងរោទិ៍ ឬដោយឪពុកហៅ។ ទឹកមានប្រើដោយផ្ទាល់នៅផ្ទះ ហើយការរៀបចំខ្លួនចំណាយត្រឹម ១០ នាទី ខណៈឪពុកខ្ញុំចំណាយជិតមួយម៉ោង។\n\nម្តាយ និងមីងរបស់ខ្ញុំចម្អិនអាហារពេលព្រឹកឱ្យខ្ញុំរាល់ថ្ងៃ ដូច្នេះខ្ញុំក៏មានសំណាងដែរ។ ខ្ញុំពឹងផ្អែកយ៉ាងខ្លាំងលើទូរស័ព្ទ និង iPad តាំងពីក្រោកពីគេង ដើម្បីពិនិត្យការជូនដំណឹងពីថ្នាក់រៀន និងមិត្តភក្តិ។\n\nភាពខុសគ្នាស្ថិតនៅក្នុងពេលព្រឹកខ្លួនឯង៖ ឪពុកខ្ញុំក្រោកចូលការពិតរូបវន្ត — ហាត់ប្រាណ ធ្វើការងារ បន្ទាប់មកបើកបរទៅសាលា។ ខ្ញុំក្រោក ចាប់ទូរស័ព្ទ និងនៅជាប់នឹងឧបករណ៍អេឡិចត្រូនិកជិត ១២ ម៉ោងក្នុងមួយថ្ងៃ។",
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
        en: "My father usually woke at four or five in the morning, woken by his uncle, to fetch water from a nearby river or well and fill the Peang (clay water jars). It was the first task of the day, and the whole household depended on it.\n\nMy uncle usually cooked the rice; the food was fish, eggs, and sometimes pork or beef jerky when they were lucky. They ate simply, with soy sauce and fish sauce. School started at seven, so my father had to leave home by six to arrive on time.",
        km: "ឪពុកខ្ញុំតែងតែក្រោកពីគេងម៉ោង ៤–៥ ព្រឹក ដោយពូរបស់គាត់ហៅ ដើម្បីទៅយកទឹកពីទន្លេ ឬអណ្តូងក្បែរផ្ទះ មកបំពេញពាង។ វាជាកិច្ចការដំបូងនៃថ្ងៃ ហើយគ្រួសារទាំងមូលពឹងផ្អែកលើវា។\n\nមីងរបស់ខ្ញុំតែងតែចម្អិនបាយ ម្ហូបមានត្រី ពងមាន់ ពេលខ្លះសាច់ជ្រូក ឬសាច់គោស្ងួត បើមានសំណាង។ ពួកគាត់ញ៉ាំសាមញ្ញៗ ជាមួយទឹកស៊ីអ៊ីវ និងទឹកត្រី។ សាលាចាប់ផ្តើមម៉ោង ៧ ដូច្នេះឪពុកខ្ញុំត្រូវចាកចេញពីផ្ទះម៉ោង ៦ ដើម្បីទាន់ពេល។",
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
        en: "In my free time I play games like Mobile Legends, EAFC, PUBG and Minecraft, and I watch a lot of podcasts, movies and YouTube on my iPad. Entertainment today is mostly on a screen, and I can move between playing, watching and chatting without ever leaving my room.\n\nI hang out with my friends at cafes and at the Aeon shopping mall almost every day after school. Air-conditioned cafes and malls have become the default meeting places — the modern equivalent of the rice fields and pagodas in my father's time.\n\nOn top of that, I hold an internship and run my own YouTube channel. Free time and work now overlap; the same phone and iPad I relax with also carry my content and side income.",
        km: "ក្នុងពេលទំនេរ ខ្ញុំលេងហ្គេមដូចជា Mobile Legends, EAFC, PUBG និង Minecraft ហើយមើលផតខាស ខ្សែភាពយន្ត និង YouTube ច្រើនតាម iPad។ ការកម្សាន្តសព្វថ្ងៃភាគច្រើននៅលើអេក្រង់ ហើយខ្ញុំអាចប្តូរពីលេង មើល ទៅជជែក ដោយមិនចាំបាច់ចាកចេញពីបន្ទប់។\n\nខ្ញុំទៅលេងជាមួយមិត្តភក្តិនៅហាងកាហ្វេ និងផ្សារទំនើប Aeon ស្ទើរតែរាល់ថ្ងៃបន្ទាប់ពីសាលា។ ហាងកាហ្វេ និងផ្សារដែលមានម៉ាស៊ីនត្រជាក់ក្លាយជាកន្លែងជួបជុំធម្មតា — ជំនួសវាលស្រែ និងវត្តអារាមក្នុងសម័យឪពុកខ្ញុំ។\n\nលើសពីនេះ ខ្ញុំក៏មានការហាត់ការ (internship) និងឆានែល YouTube ផ្ទាល់ខ្លួន។ ពេលទំនេរ និងការងារឥឡូវលាយឡំគ្នា ទូរស័ព្ទ និង iPad ដែលខ្ញុំសម្រាកក៏ជាឧបករណ៍បង្កើតខ្លឹមសារ និងចំណូលបន្ថែមដែរ។",
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
        en: "After school and chores, my father usually hung out with his friends. Their activities were simple — they mostly sat, talked and joked around. When they did play, it was real-world games: Sey, jumping, swimming in the river, volleyball and the like.\n\nThey listened to radio music, and gathered at rice fields, schools and pagodas; most community events back then were held at the pagoda anyway.\n\nMy father earned his pocket money by massaging older people, tutoring, running errands and coining — a traditional healing act of applying balm to the skin and scratching it with a coin until it turns red.",
        km: "បន្ទាប់ពីសាលា និងការងារផ្ទះ ឪពុកខ្ញុំតែងតែទៅលេងជាមួយមិត្តភក្តិ។ សកម្មភាពពួកគាត់សាមញ្ញណាស់ — ភាគច្រើនអង្គុយ និយាយ និងលេងសើចគ្នា។ ពេលលេងវិញ ជាល្បែងក្នុងជីវិតពិត៖ ទាត់សី លោតហាត់ ហែលទឹកក្នុងទន្លេ បាល់ទាត់ និងផ្សេងទៀត។\n\nពួកគាត់ស្តាប់ចម្រៀងតាមវិទ្យុ ហើយជួបជុំគ្នានៅវាលស្រែ សាលា និងវត្តអារាម ដោយកម្មវិធីសហគមន៍សម័យនោះភាគច្រើនរៀបចំនៅវត្ត។\n\nឪពុកខ្ញុំរកលុយចាយដោយការច្របាច់កំភួនជើងចាស់ៗ បង្រៀនមេរៀន រត់ការ និងកូនកាក់ — វិធីព្យាបាលប្រពៃណី ដោយលាបថ្នាំបន្ទោប រួចកោសស្បែកដោយកាក់ រហូតឡើងក្រហម។",
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
        en: "Now I can eat almost anything I crave — Korean, Japanese, fast food, traditional Cambodian, Chinese cuisine, hotpot and buffets, plus coffees and cakes. Convenience has no real limit.\n\nBut it comes with a price. Even the cheapest candy or ice-cream stick starts from 500 Riel; a bowl meal typically runs 4,000–5,000 Riel. Air-conditioned stores start around $3–$4, and buffets from $7–$8. Food is far more expensive than in my father's era.\n\nI do use delivery apps, something that did not exist back then. I don't rely on them much, though — only when I need food at home, and since I'm rarely home, that is not often.",
        km: "ឥឡូវនេះ ខ្ញុំអាចញ៉ាំស្ទើរតែអ្វីៗដែលខ្ញុំចង់៖ ម្ហូបកូរ៉េ ជប៉ុន អាហាររហ័ស ម្ហូបខ្មែរប្រពៃណី ម្ហូបចិន ស៊ុបហតផត ប៊ូហ្វេ ព្រមទាំងកាហ្វេ និងនំ។ ភាពងាយស្រួលគ្មានដែនកំណត់ពិតៗ។\n\nប៉ុន្តែវាមកជាមួយតម្លៃ។ សូម្បីស្ករ ឬការ៉េមដើមថោកបំផុតក៏ចាប់ផ្តើមពី ៥០០ រៀលឡើងទៅ ហើយអាហារមួយចានមានតម្លៃធម្មតា ៤,០០០–៥,០០០ រៀល។ ហាងមានម៉ាស៊ីនត្រជាក់ចាប់ផ្តើមពី ៣–៤ ដុល្លារ ហើយប៊ូហ្វេចាប់ផ្តើមពី ៧–៨ ដុល្លារ។ អាហារថ្លៃជាងសម័យឪពុកខ្ញុំច្រើនណាស់។\n\nខ្ញុំប្រើកម្មវិធីដឹកជញ្ជូន ដែលសម័យនោះមិនមានទេ។ ប៉ុន្តែខ្ញុំមិនសូវពឹងផ្អែកលើវាខ្លាំងទេ — តែពេលខ្ញុំត្រូវការអាហារនៅផ្ទះ ហើយដោយសារខ្ញុំមិនសូវនៅផ្ទះ ក៏មិនសូវប្រើដែរ។",
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
        en: "My father ate whatever was around. His street snacks were Num Pum (Cambodian waffles), Num Kchay, Num Krouk, Num Banh Chok, hand-pulled sticky candies and fruit ice cream. An ice-cream stick cost roughly 100 Riel.\n\nVendors sold from carts at random times, usually during the day. Because it was post-war, not much was available — there were few shops, and people ate what they could find.\n\nAs for drinks, there were Pepsi and Coke bottles, but the popular choices were shaved ice with syrup, Terk Sero, sugar-cane juice and iced water. Ice itself was very rare then, which made a cold drink a small luxury.",
        km: "ឪពុកខ្ញុំញ៉ាំអ្វីដែលមាន។ ចំណីតាមផ្លូវរបស់គាត់មាន នំពុម (នំដូនតីខ្មែរ), នំកាឆាយ, នំគ្រក់, នំបញ្ចុក, ស្ករទាញ និងការ៉េមផ្លែឈើ។ ការ៉េមដើមមួយមានតម្លៃប្រហែល ១០០ រៀល។\n\nអ្នកលក់លក់តាមរទេះក្នុងពេលវេលាមិនកំណត់ ភាគច្រើនពេលថ្ងៃ។ ដោយសារជាសម័យក្រោយសង្គ្រាម ទំនិញមិនសូវមាន — ហាងច្រើនមិនមាន ហើយមនុស្សញ៉ាំអ្វីដែលរកបាន។\n\nចំណែកភេសជ្ជៈ មានដបកូកា និងប៉េបស៊ី ប៉ុន្តែពេញនិយមគឺ ទឹកកកដាក់សេរ៉ូ, ទឹកសេរ៉ូ, ទឹកអំពៅ និងទឹកត្រជាក់។ តាមពិត ទឹកកកនៅកម្រខ្លាំងណាស់ ដែលធ្វើឱ្យភេសជ្ជៈត្រជាក់ក្លាយជាភាពប្រណីតតូចមួយ។",
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
        en: "Dating today starts through many routes — random events, classmates, Instagram, dating apps and even video games.\n\nIt is complicated because social media defines a long set of stages, like the three-month talking stage and similar unwritten rules. People hesitate to confess their feelings because they never believe the timing is right.\n\nSome use a new partner as a rebound to heal, which is messy. Cheating existed before too, but now it also counts when you are not officially dating — when you are caught in an undefined stage whose boundaries neither person has set.",
        km: "ការណាត់ជួបសព្វថ្ងៃចាប់ផ្តើមតាមវិធីច្រើន — ជួបដោយចៃដន្យ មិត្តរួមថ្នាក់ Instagram កម្មវិធីណាត់ជួប និងសូម្បីហ្គេមវីដេអូ។\n\nវាស្មុគស្មាញ ព្រោះបណ្តាញសង្គមកំណត់ដំណាក់កាលជាច្រើន ដូចជាច្បាប់ \"talking stage\" ៣ ខែ និងវិធានមិនសរសេរផ្សេងទៀត។ មនុស្សស្ទាក់ស្ទើរក្នុងការសារភាពចិត្ត ព្រោះពួកគេគិតថាពេលវេលាមិនដែលត្រឹមត្រូវ។\n\nអ្នកខ្លះប្រើដៃគូថ្មីជា rebound ដើម្បីព្យាបាលចិត្ត ដែលវាច្របូកច្របល់ណាស់។ ការក្បត់ចិត្តមានតាំងពីមុនដែរ ប៉ុន្តែឥឡូវត្រូវបានរាប់បញ្ចូលទៀត ទោះបីអ្នកមិនទាន់កំពុងណាត់ជួបផ្លូវការ — ពេលអ្នកជាប់នៅក្នុងដំណាក់កាលមិនច្បាស់លាស់ ដែលគ្មានភាគីណាមួយកំណត់ព្រំដែន។",
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
        en: "My father courted my mother by flirting and calling her on a cheap mobile phone, and he asked for her house address so he could drive over and see her. Folded paper notes and shared bicycle rides were part of the era too.\n\nMarriages back then were usually arranged, but my father and uncle were an exception — they were allowed to choose their own wives. My father met my mother at Kirirom, and they married quickly, within eight or nine months.\n\nSaying \"I love you\" carried real weight for my father; he would devote his heart to that person before he ever said it.",
        km: "ឪពុកខ្ញុំស្រលាញ់ម្តាយខ្ញុំដោយលេងសើចផ្អែម និងទូរស័ព្ទរកគាត់តាមទូរស័ព្ទចល័តថោកៗ ហើយគាត់បានសួរអាសយដ្ឋានផ្ទះរបស់គាត់ ដើម្បីបើកបរទៅជួប។ សំបុត្រក្រដាសបត់ និងការជិះកង់ជូនគ្នាក៏ជាផ្នែកនៃសម័យនោះដែរ។\n\nការរៀបការសម័យនោះភាគច្រើនជាការរៀបចំចាត់ចែង ប៉ុន្តែឪពុក និងពូរបស់ខ្ញុំជាករណីលើកលែង — ពួកគាត់អាចជ្រើសរើសប្រពន្ធដោយខ្លួនឯង។ ឪពុកខ្ញុំជួបម្តាយខ្ញុំនៅគិរីរម្យ ហើយពួកគាត់រៀបការយ៉ាងលឿន ក្នុងរយៈពេល ៨–៩ ខែ។\n\nការនិយាយថា \"ខ្ញុំស្រឡាញ់អ្នក\" មានអត្ថន័យខ្លាំងណាស់សម្រាប់ឪពុកខ្ញុំ — គាត់ត្រូវយកចិត្តទុកដាក់ចំពោះមនុស្សនោះពេញលេញ មុនពេលនិយាយ។",
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

