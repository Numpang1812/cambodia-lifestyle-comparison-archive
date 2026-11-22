import { useId } from "react";
import { VALID_TOPICS } from "../lib/contribute-validation";

const captions = {
  modern: {
    en: [
      "SMART KEYS & CITY STREETS",
      "ALARMS, CLASS CHATS & BREAKFAST",
      "PLAY, STREAM & CREATE",
      "BOBA & DOORSTEP DELIVERY",
      "STORIES, HEARTS & TYPING DOTS",
      "WATER FESTIVAL & RIVER LIGHTS",
      "SHOPHOUSES & BALCONIES",
      "TRACTOR IN THE RICE FIELD",
      "CHECKED KRAMA AT THE SHOP",
      "MICROPHONE & STAGE SPEAKERS",
    ],
    km: [
      "សោស្មាតឃី និងដងវិថីក្រុង",
      "ម៉ោងរោទិ៍ គ្រុបតេឡេក្រាម និងអាហារពេលព្រឹក",
      "លេងហ្គេម មើលវីដេអូ និងធ្វើការងារឌីជីថល",
      "តែគុជ និងសេវាដឹកដល់កន្លែង",
      "ស្ទូរី បេះដូង និងសារជជែក",
      "ពិធីបុណ្យអុំទូក និងភ្លើងលម្អតាមដងទន្លេ",
      "ផ្ទះល្វែង និងយ៉រខាងមុខ",
      "ត្រាក់ទ័រនៅក្នុងវាលស្រែ",
      "ក្រមាក្រឡានៅក្នុងហាង",
      "មីក្រូហ្វូន និងធុងបាសលើឆាក",
    ],
  },
  heritage: {
    en: [
      "PEDALS & CYCLO RIDES",
      "WATER JARS & WOOD-FIRED MORNINGS",
      "SEY, CASSETTES & OPEN AIR",
      "CHIVE CAKES & CART BELLS",
      "PAPER NOTES & RIDES HOME",
      "RACING BOAT & PADDLES",
      "STILT HOUSE & WOODEN STAIRS",
      "SICKLE & RICE STALKS",
      "KRAMA ON THE LOOM",
      "RONEAT & MALLETS",
    ],
    km: [
      "ការធាក់កង់ និងជិះស៊ីក្លូ",
      "ពាងទឹក និងចង្ក្រានអុសពេលព្រឹក",
      "ការទាត់សី កាសែតចម្រៀង និងទីវាល",
      "នំកាឆាយ និងកណ្តឹងរទេះលក់ដូរ",
      "សំបុត្រក្រដាស និងការជូនទៅផ្ទះ",
      "ទូកង និងច្រវា",
      "ផ្ទះឈើលើសសរ និងជណ្តើរ",
      "កណ្ដៀវ និងដើមស្រូវ",
      "ក្រមានៅលើកីតម្បាញ",
      "រនាត និងអន្លូង",
    ],
  },
};

export function getTopicStoryIndex(topicOrCard, fallbackStory = 1, era) {
  const artworkIndex = VALID_TOPICS.indexOf(topicOrCard?.imageConfig?.artworkByEra?.[era]);
  if (artworkIndex !== -1) return artworkIndex + 1;
  let text = "";
  if (typeof topicOrCard === "object" && topicOrCard !== null) {
    const t = topicOrCard.topic;
    if (typeof t === "object" && t !== null) {
      text = `${t.en || ""} ${t.km || ""}`;
    } else if (Array.isArray(t)) {
      text = t.join(" ");
    } else if (typeof t === "string") {
      text = t;
    } else {
      text = `${topicOrCard.en || ""} ${topicOrCard.km || ""}`;
    }
    text = text.toLowerCase();
  } else if (typeof topicOrCard === "string") {
    text = topicOrCard.toLowerCase();
  }

  const selected = VALID_TOPICS.findIndex((label) => text.includes(label.toLowerCase()));
  if (selected !== -1) return selected + 1;
  const slug = topicOrCard?.slug || topicOrCard?.imageConfig?.folder || "";
  text = `${text} ${slug.toLowerCase()}`;
  if (
    text.includes("commute") ||
    text.includes("mobility") ||
    text.includes("ធ្វើដំណើរ") ||
    text.includes("មធ្យោបាយ")
  ) {
    return 1;
  }
  if (
    text.includes("morning") ||
    text.includes("routine") ||
    text.includes("school prep") ||
    text.includes("ពេលព្រឹក") ||
    text.includes("រៀន")
  ) {
    return 2;
  }
  if (
    text.includes("free time") ||
    text.includes("free-time") ||
    text.includes("entertainment") ||
    text.includes("side hustle") ||
    text.includes("ពេលទំនេរ") ||
    text.includes("កម្សាន្ត")
  ) {
    return 3;
  }
  if (
    text.includes("street food") ||
    text.includes("street-food") ||
    text.includes("food") ||
    text.includes("cost of living") ||
    text.includes("ម្ហូប") ||
    text.includes("ជីវភាព")
  ) {
    return 4;
  }
  if (
    text.includes("romance") ||
    text.includes("date") ||
    text.includes("dating") ||
    text.includes("ស្នេហា") ||
    text.includes("ណាត់ជួប")
  ) {
    return 5;
  }

  const fallback = parseInt(fallbackStory, 10);
  if (fallback >= 1) return ((fallback - 1) % VALID_TOPICS.length) + 1;
  return 1;
}

export function illustrationCaption(era, story, lang = "en", topic = null, design) {
  let actualStory = story;
  let actualTopic = topic;
  if (typeof story === "object" && story !== null) {
    actualTopic = story;
    actualStory = story.rawNum || story.num;
  }
  const l = lang === "km" ? "km" : "en";
  const list = captions[era]?.[l] || captions[era]?.en;
  const index = getTopicStoryIndex(actualTopic, actualStory, era);
  const selectedDesign = design ?? actualTopic?.imageConfig?.designByEra?.[era];
  const print = alternatePrints[selectedDesign]?.[era]?.[index - 1];
  if (print) return print[l === "km" ? 1 : 0];
  return (
    list?.[index - 1] ?? (l === "km" ? "ជីវិតប្រចាំថ្ងៃរបស់កម្ពុជា" : "CAMBODIAN EVERYDAY LIFE")
  );
}

function Line({ d, ...props }) {
  return <path d={d} pathLength="1" {...props} />;
}

function Wheel({ x, y, r = 30, spokes = false }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="var(--scene-dark)" strokeWidth="4" />
      <circle cx={x} cy={y} r={r - 7} opacity=".5" />
      <circle cx={x} cy={y} r="4" fill="currentColor" />
      {spokes && (
        <Line
          d={`M${x - r + 7} ${y}h${2 * r - 14} M${x} ${y - r + 7}v${2 * r - 14} M${x - 16} ${y - 16}l32 32 M${x + 16} ${y - 16}l-32 32`}
          opacity=".5"
        />
      )}
    </g>
  );
}

function Phone({ x, y, rotate = 0, children }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 43 70)`}>
      <rect width="86" height="140" rx="13" fill="var(--scene-dark)" strokeWidth="2.5" />
      <rect x="7" y="9" width="72" height="119" rx="8" fill="var(--scene-fill)" />
      <Line d="M32 7h22 M34 133h18" strokeWidth="3" />
      {children}
    </g>
  );
}

function Heart({ x, y, scale = 1 }) {
  return (
    <Line
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0 7C-15-7-28 12 0 29C28 12 15-7 0 7Z"
      fill="var(--scene-pop)"
      stroke="var(--scene-pop)"
    />
  );
}

function ModernCommute() {
  return (
    <>
      <g opacity=".25">
        <Line d="M53 217V94h47v123 M109 211V65h58v142 M361 214V86h39v128 M414 217V124h33v93 M62 110h27 M62 129h27 M120 84h34 M120 103h34 M372 101h16 M372 120h16" />
        <Line d="M39 260h76m29 0h75m29 0h75m29 0h75" strokeWidth="3" />
      </g>
      <Wheel x={156} y={224} />
      <Wheel x={336} y={224} />
      <Line
        d="M121 207Q142 174 184 181L224 188L249 166L267 130L287 137L273 185L312 195Q333 188 352 206L338 215L292 216L274 231H200L178 207Z"
        fill="var(--scene-fill)"
        strokeWidth="2.5"
      />
      <Line d="M179 178h55q13 0 13 10h-74q-13-8 6-10Z" fill="var(--scene-dark)" strokeWidth="3" />
      <Line
        d="M266 131l-8-25h29 M278 107l18-13 M288 138l14 4-5 12-14-3 M134 195h20 M205 213h50 M318 195l18 29"
        strokeWidth="3"
      />
      <rect
        x="243"
        y="79"
        width="22"
        height="33"
        rx="4"
        fill="var(--scene-dark)"
        transform="rotate(-12 254 95)"
      />
      <Line d="M249 96l5-7 5 5" stroke="var(--scene-pop)" />
      <Line d="M166 153v-20q0-24 25-24t25 24v20Z" fill="var(--scene-pop)" />
      <Line d="M179 112v26h36 M176 154h36" stroke="var(--scene-dark)" />
      <g transform="translate(333 45)">
        <Line d="M0 23C0-8 42-8 42 23q0 17-21 37Q0 40 0 23Z" fill="var(--scene-fill)" />
        <circle cx="21" cy="21" r="7" />
      </g>
    </>
  );
}

function HeritageCommute() {
  return (
    <>
      <g opacity=".3">
        <Line d="M40 248q200-35 416 0 M56 126q10 50 3 105 M57 131Q27 107 22 133 M57 131q18-33 44-12 M57 131q29-5 42 16" />
        <circle cx="401" cy="79" r="25" />
      </g>
      <Wheel x={126} y={224} r={34} spokes />
      <Wheel x={288} y={224} r={36} spokes />
      <Wheel x={370} y={216} r={28} spokes />
      <Line
        d="M126 224l49-69 43 69h-92l31-48h61l-43 48 M218 224l-8-87h-19 M159 153h34"
        strokeWidth="3"
      />
      <Line
        d="M219 219l38-71h96l17 68 M255 151l-5 44h68l27-42 M250 195l38 29 M317 195l-29 29"
        fill="var(--scene-fill)"
        strokeWidth="2.5"
      />
      <Line d="M260 151V96 M349 153V96 M242 96q57-58 123 0Z" fill="var(--scene-pop)" />
      <Line d="M254 88q49-33 100 0 M271 151v26h50l12-26" />
      <circle cx="188" cy="104" r="13" fill="var(--scene-pop)" />
      <Line
        d="M178 120l-16 33 32 20 17 33 M181 126l24 18 26-8 M168 157l-20 35 24 17"
        strokeWidth="9"
      />
      <Line d="M172 94q17-19 29 5h-32" fill="var(--scene-dark)" />
      <Line d="M58 268h50m38-7h30m168 8h60 M395 246l15-4m-6 17h17" opacity=".4" />
    </>
  );
}

function ModernMorning() {
  return (
    <>
      <rect x="294" y="45" width="113" height="124" rx="3" opacity=".35" />
      <Line d="M350 45v124 M294 107h113" opacity=".35" />
      <circle cx="374" cy="80" r="18" fill="var(--scene-pop)" stroke="none" />
      <Line d="M66 237h371 M92 237v28 M412 237v28" strokeWidth="3" />
      <Phone x={103} y={75} rotate={-8}>
        <text
          x="43"
          y="44"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="21"
          fontFamily="monospace"
        >
          07:00
        </text>
        <Line d="M23 61h40" />
        <rect x="16" y="76" width="54" height="31" rx="5" fill="var(--scene-dark)" />
        <Line d="M22 88l17-6-6 14-4-6Z M43 87h19m-19 8h13" />
      </Phone>
      <Line
        d="M252 211q-21-18-16-57l5-18h53l5 18q5 40-14 57Z M299 148q41-4 22 38l-22 4 M242 136h51 M255 126h25"
        fill="var(--scene-fill)"
        strokeWidth="2.5"
      />
      <Line d="M237 164l-20-13 6 34 15 4 M247 218h48" strokeWidth="3" />
      <Line d="M335 206h69l-11 29h-47Z" fill="var(--scene-pop)" />
      <Line d="M345 197q-7-9 0-18m16 18q-7-9 0-18 M379 207l18-31 M387 210l21-28" />
      <g transform="translate(193 51)">
        <rect width="76" height="42" rx="7" fill="var(--scene-dark)" />
        <Line d="M12 13l20-5-7 20-6-10Z M41 14h24 M41 24h16" />
        <circle cx="72" cy="1" r="6" fill="var(--scene-pop)" />
      </g>
    </>
  );
}

function HeritageMorning() {
  return (
    <>
      <circle cx="102" cy="88" r="29" fill="var(--scene-pop)" opacity=".6" />
      <Line d="M36 131q72-22 149 0 M34 147h119 M47 157h99" opacity=".3" />
      <circle cx="215" cy="91" r="13" fill="var(--scene-pop)" />
      <Line d="M207 109l-10 60 30 2-3-61Z" fill="var(--scene-fill)" />
      <Line d="M204 171l-15 67 M222 171l22 66 M207 117l-26 24 M223 117l30 21" strokeWidth="7" />
      <Line d="M131 119q79-26 153 0 M140 116v69 M275 117v68" strokeWidth="2.5" />
      <Line d="M122 186h37l-5 37h-27Z M257 186h37l-5 37h-27Z" fill="var(--scene-fill)" />
      <Line d="M131 196h20 M266 196h20" opacity=".5" />
      <Line d="M328 150q-30 43-8 83h55q22-39-8-83Z" fill="var(--scene-fill)" strokeWidth="2" />
      <ellipse cx="347" cy="150" rx="20" ry="6" fill="var(--scene-dark)" />
      <Line d="M321 183q26 10 52 0 M320 214q28 9 56 0" opacity=".5" />
      <Line d="M391 218h54l10 31h-74Z" fill="var(--scene-pop)" />
      <Line d="M393 198h48l-5 20h-38Z M389 196h56 M412 190h9" fill="var(--scene-dark)" />
      <Line d="M407 244q-9-9 4-18 0 7 8 9 7-10 8-9 8 15-3 18Z" fill="var(--scene-dark)" />
      <Line d="M405 184q-10-14 0-26m16 23q-9-13 0-23 M48 249h310" opacity=".5" />
    </>
  );
}

function ModernLeisure() {
  return (
    <>
      <circle cx="259" cy="138" r="99" opacity=".15" />
      <Line d="M159 87h192v130H159Z" fill="var(--scene-dark)" strokeWidth="2.5" />
      <Line d="M168 97h174v107H168Z" fill="var(--scene-fill)" />
      <Line d="M159 217l-27 25h245l-26-25Z" fill="var(--scene-fill)" />
      <Line
        d="M229 232h53 M184 122h66m-66 12h42 M192 150l-10 9 10 9m34-18 10 9-10 9m-14-24-9 29"
        strokeWidth="2"
      />
      <rect x="265" y="115" width="62" height="72" rx="5" fill="var(--scene-dark)" />
      <Line d="M287 136l23 14-23 14Z" fill="var(--scene-pop)" stroke="none" />
      <g transform="translate(71 157) rotate(-12)">
        <rect width="136" height="72" rx="14" fill="var(--scene-dark)" strokeWidth="2.5" />
        <rect x="30" y="8" width="76" height="56" rx="4" fill="var(--scene-fill)" />
        <Line d="M42 53l20-28 18 17 16-23" stroke="var(--scene-pop)" />
        <Line d="M12 36h13 M18 30v13" strokeWidth="3" />
        <circle cx="119" cy="31" r="3" />
        <circle cx="125" cy="42" r="3" />
      </g>
      <Line
        d="M345 157v-26q0-35 29-35t29 35v26 M345 129h12v35h-12Z M392 129h12v35h-12Z"
        strokeWidth="4"
        fill="var(--scene-fill)"
      />
      <Line d="M399 203h29l-4 36h-20Z M401 199h27 M418 201l7-23 M71 255h367" />
      <Line
        d="M104 77v26q-18 12-20 1t20-7 M104 77l22-5v25q-18 12-20 1t20-7"
        stroke="var(--scene-pop)"
      />
    </>
  );
}

function HeritageLeisure() {
  return (
    <>
      <g opacity=".3">
        <Line d="M299 132h140l-70-56Z M313 132v64h112v-64 M326 108h86 M345 91h48 M369 76V58 M42 243q186-23 409 0" />
      </g>
      <circle cx="169" cy="98" r="14" fill="var(--scene-pop)" />
      <Line d="M158 115l-15 56 37 2 4-51Z" fill="var(--scene-fill)" />
      <Line
        d="M155 174l-13 60 M176 174l22 28 36-17 M157 124l-30 27-20-14 M184 127l25 24"
        strokeWidth="7"
      />
      <circle cx="293" cy="112" r="13" fill="var(--scene-pop)" />
      <Line d="M281 129l-8 53h35l-5-53Z" fill="var(--scene-fill)" />
      <Line
        d="M281 183l-19 50 M301 183l18 49 M278 136l-28 17 M305 137l22 21 18-16"
        strokeWidth="7"
      />
      <g transform="translate(234 130) rotate(18)">
        <ellipse cy="20" rx="8" ry="4" fill="var(--scene-pop)" />
        <Line d="M-5 19l-8-24 10 15 3-21 4 21 9-14-9 23" stroke="var(--scene-pop)" />
      </g>
      <rect x="56" y="194" width="73" height="48" rx="5" fill="var(--scene-dark)" />
      <circle cx="80" cy="218" r="16" />
      <circle cx="80" cy="218" r="9" opacity=".5" />
      <Line d="M103 204h18m-18 7h18m-18 7h18 M65 194l-9-42 M72 190v-7h30v7" />
      <circle cx="111" cy="231" r="4" />
      <rect x="356" y="205" width="62" height="39" rx="4" fill="var(--scene-fill)" />
      <rect x="365" y="212" width="44" height="14" rx="6" />
      <circle cx="374" cy="219" r="4" />
      <circle cx="400" cy="219" r="4" />
      <Line d="M370 240l5-10h24l5 10" />
    </>
  );
}

function ModernFood() {
  return (
    <>
      <Phone x={312} y={58} rotate={9}>
        <Line d="M15 33h56 M23 45v47m19-47v47m19-47v47 M15 58h56 M15 78h56" opacity=".3" />
        <Line d="M25 86V65h28V48" stroke="var(--scene-pop)" strokeWidth="3" />
        <circle cx="53" cy="48" r="6" fill="var(--scene-pop)" />
        <rect x="17" y="104" width="52" height="13" rx="5" fill="var(--scene-pop)" />
      </Phone>
      <Line d="M91 127h74l-9 108h-55Z" fill="var(--scene-fill)" strokeWidth="2.5" />
      <ellipse cx="128" cy="127" rx="40" ry="9" fill="var(--scene-pop)" />
      <Line d="M133 160l12-79h13" strokeWidth="5" />
      <Line d="M100 174h60" />
      {[
        [113, 211],
        [130, 216],
        [147, 210],
        [120, 197],
        [139, 195],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="5" fill="var(--scene-dark)" />
      ))}
      <Line d="M193 116l45-21 56 20v95l-56 22-45-21Z" fill="var(--scene-fill)" strokeWidth="2" />
      <Line d="M193 116l45 19 56-20 M238 135v97 M219 110v-18q17-20 35 0v16" />
      <circle cx="264" cy="170" r="17" fill="var(--scene-pop)" />
      <Line d="M255 169l7 7 11-14" stroke="var(--scene-dark)" strokeWidth="3" />
      <Line d="M284 220h101q-10 32-50 32t-51-32Z" fill="var(--scene-dark)" />
      <ellipse cx="334" cy="220" rx="51" ry="10" fill="var(--scene-fill)" />
      <Line d="M306 217q8-14 16 0t16 0t16 0 M349 213l35-41 M358 216l39-37 M62 254h374" />
      <Line d="M66 88h20m-10-10v20 M268 63h14m-7-7v14" stroke="var(--scene-pop)" />
    </>
  );
}

function HeritageFood() {
  return (
    <>
      <Line d="M108 99h271l-18-39H128Z" fill="var(--scene-fill)" strokeWidth="2" />
      {[130, 174, 218, 262, 306, 350].map((x) => (
        <Line
          key={x}
          d={`M${x} 61l-5 37h22l-4-37Z`}
          fill="var(--scene-pop)"
          stroke="none"
          opacity=".7"
        />
      ))}
      <Line d="M117 99v16q11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0V99 M135 121v58 M352 121v58" />
      <Wheel x={167} y={239} r={25} spokes />
      <Wheel x={326} y={239} r={25} spokes />
      <Line d="M122 180h244v52H122Z" fill="var(--scene-fill)" strokeWidth="2.5" />
      <Line d="M114 179h260 M141 193h206 M141 220h206 M366 184h31l11 23" strokeWidth="2" />
      <ellipse cx="188" cy="172" rx="47" ry="9" fill="var(--scene-dark)" />
      {[157, 177, 197, 217].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={166 - (i % 2) * 6} rx="11" ry="6" fill="var(--scene-pop)" />
          <Line d={`M${x - 4} ${164 - (i % 2) * 6}l5 3`} stroke="var(--scene-dark)" />
        </g>
      ))}
      <Line d="M265 151h60l-7 26h-46Z M260 150q35-32 70 0Z M288 130h14" fill="var(--scene-dark)" />
      <Line d="M280 121q-8-10 0-21m18 21q-8-10 0-21" opacity=".6" />
      <Line
        d="M387 131q-14 0-14 21l-6 7h39l-6-7q0-21-13-21Z M383 165h9 M387 130v-10"
        fill="var(--scene-pop)"
      />
      <Line d="M413 137l8-6m-7 20h10 M66 267h375" opacity=".5" />
    </>
  );
}

function ModernRomance() {
  return (
    <>
      <circle cx="250" cy="153" r="100" opacity=".15" />
      <Phone x={105} y={90} rotate={-12}>
        <circle cx="43" cy="46" r="23" stroke="var(--scene-pop)" strokeWidth="3" />
        <circle cx="43" cy="41" r="8" fill="var(--scene-pop)" />
        <Line d="M29 61q2-22 28 0" fill="var(--scene-pop)" />
        <Line d="M18 87h48m-48 11h34" />
        <Heart x={61} y={106} scale={0.35} />
      </Phone>
      <Phone x={303} y={89} rotate={12}>
        <rect x="15" y="29" width="54" height="29" rx="7" fill="var(--scene-pop)" />
        <Line d="M24 40h32m-32 8h22" stroke="var(--scene-dark)" />
        <rect x="23" y="70" width="46" height="25" rx="7" fill="var(--scene-dark)" />
        {[34, 46, 58].map((x) => (
          <circle key={x} cx={x} cy="83" r="2" fill="currentColor" />
        ))}
        <Line d="M33 111h35" opacity=".5" />
      </Phone>
      <Line d="M195 153q56-58 110 0 M200 199q53 38 102-2" strokeDasharray="4 8" opacity=".6" />
      <Heart x={250} y={86} scale={1.7} />
      <Heart x={80} y={65} scale={0.5} />
      <Heart x={419} y={183} scale={0.65} />
      <g transform="translate(218 181)">
        <rect width="65" height="35" rx="14" fill="var(--scene-fill)" />
        <Line d="M17 34l-3 12 17-12" fill="var(--scene-fill)" />
        {[19, 32, 45].map((x) => (
          <circle key={x} cx={x} cy="17" r="3" fill="currentColor" />
        ))}
      </g>
      <Line d="M94 264h309" opacity=".3" />
    </>
  );
}

function HeritageRomance() {
  return (
    <>
      <Line d="M383 243q-10-76 6-135 M386 150l-32-26 M386 172l30-28" strokeWidth="5" />
      <Line
        d="M321 110q-22-29 10-48 5-37 40-28 30-27 51 7 41-2 38 33 29 30-6 48-10 29-42 6-30 25-52 0-26 11-39-18Z"
        fill="var(--scene-fill)"
      />
      <Line d="M342 83q29-16 47 10 M402 57q-9 20 8 35 M418 112l18-21" opacity=".4" />
      <g transform="translate(88 52) rotate(-9 80 45)">
        <rect width="150" height="90" rx="3" fill="var(--scene-fill)" strokeWidth="2" />
        <Line d="M0 0l75 53L150 0 M0 90l55-49 M150 90l-55-49" />
        <Heart x={75} y={37} scale={0.65} />
      </g>
      <Wheel x={163} y={229} r={31} spokes />
      <Wheel x={310} y={229} r={31} spokes />
      <Line
        d="M163 229l39-60 41 60h-80l26-43h101l20 43 M243 229l-11-75 M218 153h31 M289 184l-10-40h20 M180 165h38 M180 159h35"
        strokeWidth="3"
      />
      <Line d="M135 190h47 M143 191l-6 17 M177 191l8 17" strokeWidth="2" />
      <Line d="M60 266h380 M339 246l10-15 8 15m37 0 10-17 8 17" opacity=".4" />
      <Heart x={271} y={88} scale={0.65} />
    </>
  );
}

function Festival({ past }) {
  return (
    <>
      {past ? (
        <Line d="M90 110V63l50 15-50 14 M378 118V69l44 14-44 14" fill="var(--scene-pop)" />
      ) : (
        <g>
          <Line d="M60 65q180 72 380 0" />
          {[90, 150, 210, 270, 330, 390].map((x, i) => (
            <ellipse
              key={x}
              cx={x}
              cy={[84, 98, 107, 108, 101, 88][i]}
              rx="8"
              ry="12"
              fill="var(--scene-pop)"
            />
          ))}
        </g>
      )}
      <Line
        d="M61 165q150 70 375-20-20 56-91 71H157q-62 0-96-51Z"
        fill="var(--scene-fill)"
        strokeWidth="3"
      />
      {[154, 206, 258, 310].map((x) => (
        <g key={x} transform={`translate(${x} 169)`}>
          <circle cy="-13" r="9" fill="var(--scene-pop)" />
          <Line
            d="M-6 0l-7 22h29L6 0Z M6 4l16 6 8-14 M37-16L5 51l-7 6 1-10 28-50"
            fill="var(--scene-fill)"
          />
        </g>
      ))}
      <Line d="M76 232q38 9 76 0t76 0t76 0t76 0 M164 248q38 9 76 0t76 0" opacity=".55" />
    </>
  );
}

function Neighborhood({ past }) {
  return past ? (
    <>
      <Line d="M113 144l112-86 119 86Z" fill="var(--scene-pop)" />
      <Line d="M134 144h188v61H134Z" fill="var(--scene-fill)" />
      <Line
        d="M151 206v45m72-45v45m80-45v45 M173 158h33v29h-33Z M253 205v-49h32v49 M116 204h223 M289 206l-26 45m47-45-26 45 M282 220h20m-27 13h20"
        strokeWidth="3"
      />
      <Line d="M78 253h292 M140 133l86-63 90 63" />
    </>
  ) : (
    <>
      {[89, 199, 309].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i === 1 ? 55 : 76})`}>
          <rect width="102" height={i === 1 ? 190 : 169} fill="var(--scene-fill)" />
          <Line d="M-4 0h110v8H-4Z M14 25h32v49H14Z M56 25h32v49H56Z" fill="var(--scene-dark)" />
          <Line d="M6 63h90v17H6Z M20 64v15m16-15v15m16-15v15m16-15v15m16-15v15" />
          <Line d="M8 106h86l7 17H1Z" fill="var(--scene-pop)" />
          <Line d="M18 127v38m65-38v38 M24 136h53m-53 9h53m-53 9h53" />
        </g>
      ))}
      <Line d="M67 248h367" strokeWidth="3" />
    </>
  );
}

function Farming({ past }) {
  return (
    <>
      <circle cx="380" cy="79" r="22" fill="var(--scene-pop)" />
      <Line d="M54 202q157-32 389 0 M58 234q141-42 380-19 M115 253q113-42 313-27" opacity=".45" />
      {past ? (
        <>
          {[125, 158, 191].map((x) => (
            <g key={x} transform={`translate(${x} 217)`}>
              <Line
                d="M0 0q12-74-5-130 M1-43l-25-33m28 10 17-28 M-4-122q-23 1-29 31 21-6 29-31Z M-1-103q19-13 21-33-20 9-21 33Z"
                fill="var(--scene-pop)"
              />
            </g>
          ))}
          <Line d="M288 180q54-30 24-106 70 72-10 123Z" fill="var(--scene-pop)" />
          <Line d="M298 187l-53 56-13-12 53-55Z" fill="var(--scene-fill)" />
        </>
      ) : (
        <>
          <Line d="M135 174l16-65h73l8 51h93l14 40H135Z" fill="var(--scene-fill)" strokeWidth="3" />
          <Line d="M157 151l9-32h45l4 32Z" fill="var(--scene-dark)" />
          <Line d="M142 105h94 M292 158v-35h9v35 M303 173h19m-17 8h19" strokeWidth="3" />
          <Wheel x={168} y={203} r={37} spokes />
          <Wheel x={315} y={206} r={23} />
        </>
      )}
    </>
  );
}

function Weaving({ past }) {
  return (
    <>
      {past ? (
        <Line
          d="M105 249V67h245v182 M95 68h266 M117 93h220 M118 113h218 M103 224h250 M145 225l-18 24m188-24 16 24"
          strokeWidth="6"
        />
      ) : (
        <Line
          d="M107 245V83h285v162 M91 247h34m247 0h38 M163 108l43-20q10-3 9-12t-12-3 M206 88l47 20Z"
          strokeWidth="3"
        />
      )}
      <Line d="M153 108h122l-6 114H147Z" fill="var(--scene-fill)" strokeWidth="3" />
      <g transform="skewX(-3)">
        {[171, 194, 217, 240, 263].map((x) => (
          <Line key={x} d={`M${x} 110v110m4-110v110m0 3v9`} stroke="var(--scene-pop)" />
        ))}
        {[122, 145, 168, 191, 214].map((y) => (
          <Line key={y} d={`M159 ${y}h120m-120 4h120`} stroke="var(--scene-pop)" />
        ))}
      </g>
      {past ? (
        <Line d="M293 174l23-36 7 11-24 34Z" fill="var(--scene-pop)" />
      ) : (
        <Line d="M322 85v29l-13 15v31h34v-31l-21-15 M318 142h17" fill="var(--scene-fill)" />
      )}
    </>
  );
}

function Music({ past }) {
  return past ? (
    <>
      <Line
        d="M80 142q168 85 339-1-12 80-163 83T80 142Z"
        fill="var(--scene-fill)"
        strokeWidth="3"
      />
      <Line d="M231 225h40l8 18h-56Z M206 247h91" fill="var(--scene-pop)" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect
          key={i}
          x={90 + i * 21}
          y={129 + Math.sin((i * Math.PI) / 14) * 39}
          width="17"
          height="23"
          rx="3"
          fill="var(--scene-pop)"
        />
      ))}
      <Line d="M181 84l115 62 M292 82l-103 66" strokeWidth="4" />
      <circle cx="179" cy="83" r="10" fill="var(--scene-pop)" />
      <circle cx="294" cy="81" r="10" fill="var(--scene-pop)" />
    </>
  ) : (
    <>
      {[99, 330].map((x) => (
        <g key={x} transform={`translate(${x} 106)`}>
          <rect width="73" height="125" rx="6" fill="var(--scene-fill)" />
          <circle cx="36" cy="35" r="13" />
          <circle cx="36" cy="86" r="26" />
          <circle cx="36" cy="86" r="9" fill="var(--scene-pop)" />
        </g>
      ))}
      <Line d="M246 125v105l-27 16m27-16 28 16 M243 126l35-46" strokeWidth="4" />
      <rect
        x="263"
        y="57"
        width="25"
        height="48"
        rx="12"
        transform="rotate(35 275 81)"
        fill="var(--scene-pop)"
      />
      <Line d="M82 249h336 M211 81l-10-14m37 4-3-15m71 45 17-4" />
    </>
  );
}

const scenes = {
  modern: [
    ModernCommute,
    ModernMorning,
    ModernLeisure,
    ModernFood,
    ModernRomance,
    Festival,
    Neighborhood,
    Farming,
    Weaving,
    Music,
  ],
  heritage: [
    HeritageCommute,
    HeritageMorning,
    HeritageLeisure,
    HeritageFood,
    HeritageRomance,
    Festival,
    Neighborhood,
    Farming,
    Weaving,
    Music,
  ],
};

const secondPrints = {
  heritage: [
    [
      "River ferry",
      "សាឡាងឆ្លងទន្លេ",
      "M75 169h350l-55 55H128Z M145 163v-46h206v46Z M119 112l34-34h194l33 34Z",
      "M181 120v39m45-39v39m45-39v39m45-39v39 M119 185h267 M87 238q32 14 64 0t64 0t64 0t64 0t64 0",
    ],
    [
      "Slate and chalk",
      "ក្តារឆ្នួន និងដីស",
      "M104 66h244v155H104Z M337 221l52-49 8 9-52 49Z",
      "M116 78h220v131H116Z M143 106l12-12v34m-10 0h23 M190 103h28m-14-14v28 M242 104l12-10v34m-10 0h23 M144 164h127m-127 16h92",
    ],
    [
      "Paper kite",
      "ខ្លែងក្រដាស",
      "M149 113l98-65 72 91-104 59Z",
      "M247 48l-32 150m-66-85 170 26 M215 198q-43 50 21 42t88 8 M247 237l10-11 8 17-18-6 5 12",
    ],
    [
      "Charcoal grill",
      "ចង្ក្រានធ្យូង",
      "M117 154h267l-23 53H139Z M153 207h13l-13 35h-13Z M335 207h13l13 35h-13Z",
      "M140 148l40-50m21 50 40-50m21 50 40-50m21 50 40-50 M151 132l16-20m44 20 16-20m45 20 16-20m45 20 16-20 M179 166h140",
    ],
    [
      "Portrait locket",
      "បន្តោងដាក់រូបថត",
      "M247 169a50 60 0 1 1-100 0 50 60 0 1 1 100 0Z M355 169a50 60 0 1 1-100 0 50 60 0 1 1 100 0Z",
      "M148 51q20 44 49 58 31-22 48-58 M175 190q23-41 46 0 M212 155a15 15 0 1 1-30 0 15 15 0 1 1 30 0Z M278 173l19 18 32-43",
    ],
    [
      "Wrapped rice cakes",
      "នំអន្សម",
      "M98 168l116-83 49 55-116 83Z M233 164l110-71 43 60-110 71Z",
      "M121 151l48 55m-22-72 48 55m-20-75 48 55 M255 150l42 59m-18-75 43 60m-18-76 43 59",
    ],
    [
      "Courtyard water jar",
      "ពាងទឹកក្នុងទីធ្លា",
      "M167 113q-68 73-9 118h124q55-49-9-118Z M158 105q63-21 125 0l-9 12H167Z M331 211v-71h14v71Z",
      "M148 169q69 28 143 0 M152 194q67 26 136 0 M338 145q-30-54-65-48 20 30 65 48Zm0 0q9-65 50-73-3 46-50 73Z",
    ],
    [
      "Bamboo fish trap",
      "ទ្រូចាប់ត្រី",
      "M106 173q103-112 231-53l60 39-61 36q-137 38-230-22Z",
      "M107 172q123-65 229-52m-229 52q126-28 250-24m-250 24q130 11 250 0 M166 137q-17 30 0 63m50-87q-20 43 0 95m52-101q-18 49 0 98m55-90q-18 42 0 83",
    ],
    [
      "Spindle and thread",
      "ត្រល់ និងអំបោះ",
      "M135 188l157-109 8 11-158 110Z M175 140q15-21 64 31-17 23-64-31Z M306 178h60v49h-60Z",
      "M188 142l21 23m-12-26 22 22 M304 188h62m-62 9h62m-62 9h62 M304 216q-41 34-71 3t-79-11",
    ],
    [
      "Hand drum",
      "ស្គរដៃ",
      "M161 105q75-29 151 0l-18 45q-49 32-14 74-48 24-94-1 35-46-11-74Z",
      "M161 105q76 38 151 0 M174 124l26 34 12-28 20 33 20-33 14 27 31-36 M202 195q31 13 64 0 M182 67l-17-14m149 15 19-18",
    ],
  ],
  modern: [
    [
      "City bus",
      "រថយន្តក្រុង",
      "M100 105q0-27 29-27h222q31 0 42 39l14 52v36H100Z",
      "M123 96h69v47h-69Zm81 0h66v47h-66Zm80 0h55v93h-55Zm69 1h12l17 46h-29Z M178 206a19 19 0 1 1-38 0 19 19 0 1 1 38 0Zm191 0a19 19 0 1 1-38 0 19 19 0 1 1 38 0Z",
    ],
    [
      "School backpack",
      "កាបូបស្ពាយទៅរៀន",
      "M157 217v-87q0-45 45-45h64q46 0 46 46v86q0 14-16 14H173q-16 0-16-14Z",
      "M209 83v-8q0-26 26-26t26 26v8 M181 151h108v58H181Z M181 163h108m-16 0v12 M176 128q59-34 116 0",
    ],
    [
      "Creator camera",
      "កាមេរ៉ាថតវីដេអូ",
      "M122 103h68l13-21h65l13 21h74v91H122Z",
      "M280 148a35 35 0 1 1-70 0 35 35 0 1 1 70 0Zm-10 0a25 25 0 1 1-50 0 25 25 0 1 1 50 0Z M137 119h37 M240 195v41m0-39-56 46m56-46 58 46",
    ],
    [
      "Takeaway noodle bowl",
      "គុយទាវខ្ចប់",
      "M126 153h234q-14 70-93 77h-50q-72-10-91-77Z",
      "M126 153q116-42 234 0 M154 147q13-24 26-2t26-2t26-3 M260 148l96-83m-81 84 99-74 M152 180q88 29 181 0",
    ],
    [
      "Coffee date",
      "ណាត់ជួបផឹកកាហ្វេ",
      "M106 133h116v39q-3 43-58 43t-58-43Z M269 115h89v47q-3 35-44 35t-45-35Z",
      "M222 140q49-6 25 29l-25 7 M358 122q44-7 22 28l-22 8 M94 222h147m15-19h116 M233 94q-35-18-25-32 12-10 23 5 15-21 26-8 12 13-24 35Z",
    ],
    [
      "Festival lanterns",
      "គោមពិធីបុណ្យ",
      "M107 117q12-43 62-43t62 43v21q-10 43-62 43t-62-43Z M277 146q7-34 48-34t48 34v15q-8 33-48 33t-48-33Z",
      "M73 47q170 56 347-8 M169 67v8m0 107v42m-7-21-6 21m20-21 6 21 M325 59v53m0 82v37 M107 124h124m46 29h96 M169 76q-39 56 0 104 38-50 0-104Z",
    ],
    [
      "Balcony garden",
      "សួនលើយ៉រ",
      "M124 163h86l-12 60h-61Z M263 173h97l-16 50h-66Z",
      "M168 162v-57q-48-4-54-42 49-3 54 42Zm0 32q53-6 65-55-58 10-65 55Z M310 171v-48q-44-3-52-40 51 3 52 40Zm0 29q48-4 61-43-58 8-61 43Z M88 232h323",
    ],
    [
      "Motor fishing boat",
      "ទូកនេសាទម៉ាស៊ីន",
      "M76 169h285l54-26-44 65H119Z M135 160v-46h110v46Z M122 110l18-16h114l17 16Z",
      "M150 122h35v27h-35Zm48 0h32v27h-32Z M111 176l-25-40H66v27l32 19 M290 160l38-75 52 56m-52-56 3 62 M101 226q29 12 58 0t58 0t58 0t58 0t58 0",
    ],
    [
      "Sewing machine",
      "ម៉ាស៊ីនដេរ",
      "M119 209h263v24H119Z M149 184v-77q0-21 26-21h149q28 0 28 27v94h-69v-67h-87v44Z",
      "M173 185v17m-13 0h27 M209 109h53 M304 158h26m-26 10h26 M332 116a10 10 0 1 1-20 0 10 10 0 1 1 20 0Z M303 85V65h18v20",
    ],
    [
      "Mixing desk",
      "តុលាយសំឡេង",
      "M114 93h265l22 126H90Z",
      "M139 114h60v28h-60Zm73 0h60v28h-60Zm72 0h67v28h-67Z M145 155v44m40-44v44m40-44v44m40-44v44m40-44v44m40-44v44 M135 168h20m20 14h20m20-20h20m20 23h20m20-10h20m20-11h20",
    ],
  ],
};

const alternatePrints = {
  2: secondPrints,
  3: {
    heritage: [
      [
        "Ox cart wheel",
        "កង់រទេះគោ",
        "M267 160a75 75 0 1 1-150 0 75 75 0 1 1 150 0Z M210 121l169-51 4 9-166 57Z",
        "M192 91v138m-69-69h138m-117-49 97 98m-96 0 96-98 M203 160a11 11 0 1 1-22 0 11 11 0 1 1 22 0Z",
      ],
      [
        "Stacked lunch pail",
        "ស្រាក់បាយ",
        "M165 118q85-29 170 0v93q-82 34-170 0Z",
        "M165 118q83 34 170 0 M166 150q83 32 168 0m-168 30q83 32 168 0 M183 113V90q0-38 36-38h62q35 0 35 38v23 M247 128v88",
      ],
      [
        "Carved spinning top",
        "កូនខ្លែងវិល",
        "M166 137q82-46 166 0-14 46-78 84l-8 15-8-16q-56-34-72-83Z M236 112V82h25v30Z",
        "M169 139q79 35 159 0 M183 164q65 25 131 0 M221 200q28 6 58-3 M91 229q41 24 100 13m126-10 47-9",
      ],
      [
        "Stone mortar and pestle",
        "ត្បាល់ថ្ម និងអង្រែ",
        "M125 151q87-38 181 0l-20 51q-62 37-132 0Z M220 145l79-84q11-9 20 1t0 19l-78 72Z",
        "M127 152q82 36 176 0 M164 216h112l12 13H153Z M308 200q30-42 67-37-8 32-67 37Z",
      ],
      [
        "Folded love letter",
        "សំបុត្រស្នេហា",
        "M152 69l178 23-22 145-178-24Z",
        "M170 101l114 15m-117 5 101 13m-102 8 62 8 M247 173q-23-25-34-8-9 15 29 42 44-16 39-33-6-17-34-1Z",
      ],
      [
        "Offering tray",
        "ថាសតង្វាយ",
        "M112 173q137 29 276 0-18 43-119 46l11 16h-60l12-16q-93-7-120-46Z",
        "M173 163q-28-54 8-69 41 11 21 64 M243 173q-56-19-48-56 28 1 48 37-17-53 3-80 24 23 12 76 17-30 46-31-2 36-61 54Z M316 166l7-72m8 72 12-68",
      ],
      [
        "Woven sleeping mat",
        "កន្ទេល",
        "M125 199l125-111 133 39-129 112Z M114 196q-11-23 6-36l111-94q13-9 25 7t-1 26l-119 105q-11 8-22-8Z",
        "M126 186l117-99 M168 182l117 34m-99-51 119 34m-99-51 117 34 M169 206l107-96m-77 105 108-96m-78 105 108-96",
      ],
      [
        "Cast net",
        "សំណាញ់បង់ត្រី",
        "M244 77q-34 81-135 136 128 36 280-5-95-52-145-131Z",
        "M245 83l-81 137m83-137-31 142m33-141 22 141m-20-141 75 134 M200 152q44 14 98-1m-137 36q86 30 176-3 M244 78q8-31 42-25t34-19",
      ],
      [
        "Tailor’s shears",
        "កន្ត្រៃកាត់ក្រណាត់",
        "M223 165L357 74l-96 106Z M230 184l142 22-128-49Z",
        "M222 168q-67-75-89-41-22 39 71 52l32-4 M219 186q-87-1-75 35 18 34 81-31 M248 174a6 6 0 1 1-12 0 6 6 0 1 1 12 0Z",
      ],
      [
        "Bamboo flute",
        "ខ្លុយឫស្សី",
        "M109 190l262-108 8 20-262 108Z",
        "M135 181l8 18m193-101 7 18 M177 173l5-2m22-10 5-2m23-9 5-2m22-10 5-2m23-10 5-2 M297 76V51l27-6v24m-27 7q-16-4-15 6t15-6m27-7q-15-4-15 6t15-6",
      ],
    ],
    modern: [
      [
        "Transit route map",
        "ផែនទីខ្សែរថយន្តក្រុង",
        "M100 92l94-22 106 23 100-23v140l-100 23-106-23-94 23Z",
        "M194 72v137m106-115v137 M125 187l49-45 59 18 40-38 58 11 41-36 M169 141h10m50 19h10m34-38h7m51 11h7",
      ],
      [
        "Digital alarm clock",
        "នាឡិការោទ៍ឌីជីថល",
        "M123 109q0-17 17-17h220q17 0 17 17v80q0 17-17 17H140q-17 0-17-17Z M147 207h30v10h-30Zm177 0h29v10h-29Z",
        "M159 122h32v53h-32Z M205 122h32l-22 53 M251 139h4m-4 20h4 M272 122h32v53h-32Zm48 0h32v53h-32Z",
      ],
      [
        "Game controller",
        "ឧបករណ៍បញ្ជាហ្គេម",
        "M166 108q-30 6-46 85-9 49 23 42l56-43h102l56 43q32 7 23-42-16-79-46-85-26-11-57 3h-54q-31-14-57-3Z",
        "M154 147h42m-21-21v42 M314 146h5m15-14h5m-5 28h5m15-14h5 M223 160h16m23 0h16 M249 109q-7-43 34-51",
      ],
      [
        "Iced coffee bag",
        "កាហ្វេទឹកកកក្នុងថង់",
        "M170 115q27-15 42-32h70q20 25 44 32l-7 108q-70 18-141 0Z",
        "M172 138q64 18 151-2 M214 113l65-66h15l-66 70 M196 153l29 5-5 27-29-6Zm67 16 25-10 10 23-26 10Z M183 214q63 12 132 0",
      ],
      [
        "Cinema tickets",
        "សំបុត្រកុន",
        "M111 132l177-67 37 85-177 68Z M202 161l142-34 25 70-145 39Z",
        "M157 116l30 71m-19-39 67-25m-62 38 51-19 M321 139l19 60 M242 173l42-10m-37 24 42-11",
      ],
      [
        "Festival fireworks",
        "កាំជ្រួចពិធីបុណ្យ",
        "M90 221l55-25 42 15 59-32 57 22 51-25 56 44Z",
        "M190 148v-30m0-29V50m-16 49-35-26m49 39-53 8m69-24 30-29m-29 44 39 10 M321 148v-23m0-20V74m-12 37-26-17m25 31-34 10m59-25 22-20m-17 32 31 7",
      ],
      [
        "Apartment keys",
        "សោផ្ទះល្វែង",
        "M186 92a34 34 0 1 1 34 42l-55 86-28-17 12-20 12 6 8-13-11-7 31-49Z M270 102h58v61h-18v53h-20v-53h-20Z",
        "M203 95a12 12 0 1 1 24 0 12 12 0 1 1-24 0Z M219 91q33-52 82 18 M281 118h35m-16 49v37",
      ],
      [
        "Irrigation pump",
        "ម៉ាស៊ីនបូមទឹក",
        "M122 183v-46h38v26h37v-41h82v74h-87v-13Z M281 134h65v56h-65Z M170 199h191v17H170Z",
        "M211 141h50m-50 12h50m-50 12h50 M294 144v36m13-36v36m13-36v36 M124 136q-22-31-44 10m45-2q-22-15-43 17 M222 120V92h34v28",
      ],
      [
        "Clothing pattern",
        "ពុម្ពកាត់អាវ",
        "M145 110l56-37q43 32 86 0l60 37-28 49-30-18v88H201v-88l-28 18Z",
        "M209 77q35 57 70 0 M211 212h67 M222 97v94m42-96v95 M116 194l55 31-9 16-55-31Z M125 202l-4 8m17-1-4 8m17-1-4 7",
      ],
      [
        "Studio headphones",
        "កាសស្ទូឌីយោ",
        "M141 171v-18a109 103 0 0 1 218 0v18h-17v-18a92 85 0 0 0-184 0v18Z M132 156h46v63h-46Zm190 0h46v63h-46Z",
        "M144 169v36m22-36v36m169-36v36m20-36v36 M346 220q0 30-41 24l-30-4 M217 160v27m15-44v57m16-82v99m16-77v63m16-45v27",
      ],
    ],
  },
};

export default function StoryIllustration({
  era = "modern",
  story = "01",
  topic = null,
  lang = "en",
  design,
}) {
  const targetTopic = topic || (typeof story === "object" ? story : null);
  const targetStory = typeof story === "object" ? story.rawNum || story.num || "01" : story;
  const id = useId().replace(/:/g, "");
  const past = era === "heritage";
  const index = getTopicStoryIndex(targetTopic, targetStory, era);
  const Scene = scenes[era]?.[index - 1] || scenes[era]?.[0];
  const selectedDesign = design ?? targetTopic?.imageConfig?.designByEra?.[era] ?? 1;
  const print = alternatePrints[selectedDesign]?.[era]?.[index - 1];
  if (!Scene) return null;
  const isKm = lang === "km";
  const eraText = past ? (isKm ? "ទសវត្សរ៍ ៨០–៩០" : "1980s–90s") : isKm ? "ទសវត្សរ៍ ២០២០" : "2020s";
  const countryText = isKm ? "កម្ពុជា" : "Cambodia";
  return (
    <svg
      className="architecture story-illustration"
      viewBox="0 0 500 300"
      fill="none"
      role="img"
      aria-labelledby={`${id}-title`}
      style={{
        "--scene-dark": past ? "#30231c" : "#102e32",
        "--scene-fill": past ? "#78543b" : "#235b60",
        "--scene-pop": past ? "#e7b779" : "#c8dc96",
        color: past ? "#e2b686" : "#9de2d7",
      }}
    >
      <title
        id={`${id}-title`}
      >{`${illustrationCaption(era, targetStory, lang, targetTopic, selectedDesign)} — ${eraText} ${countryText}`}</title>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor={past ? "#e7b779" : "#82ddce"} stopOpacity=".13" />
          <stop offset="1" stopColor={past ? "#e7b779" : "#82ddce"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="157" rx="224" ry="138" fill={`url(#${id}-glow)`} />
      <ellipse cx="250" cy="260" rx="172" ry="12" fill="var(--scene-dark)" opacity=".5" />
      <g
        className="architecture-lines"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {print ? (
          <g strokeWidth="3">
            <circle cx="250" cy="148" r="103" fill="var(--scene-pop)" stroke="none" opacity=".12" />
            <Line d={print[2]} fill="var(--scene-fill)" />
            <Line d={print[3]} stroke="var(--scene-pop)" />
          </g>
        ) : (
          <Scene past={past} />
        )}
      </g>
    </svg>
  );
}
