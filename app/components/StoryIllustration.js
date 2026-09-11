import { useId } from "react";

const captions = {
  modern: ["SMART KEYS & CITY STREETS", "ALARMS, CLASS CHATS & BREAKFAST", "PLAY, STREAM & CREATE", "BOBA & DOORSTEP DELIVERY", "STORIES, HEARTS & TYPING DOTS"],
  heritage: ["PEDALS & CYCLO RIDES", "WATER JARS & WOOD-FIRED MORNINGS", "SEY, CASSETTES & OPEN AIR", "CHIVE CAKES & CART BELLS", "PAPER NOTES & RIDES HOME"],
};

export function illustrationCaption(era, story) {
  return captions[era]?.[Number(story) - 1] ?? "CAMBODIAN EVERYDAY LIFE";
}

function Line({ d, ...props }) {
  return <path d={d} pathLength="1" {...props} />;
}

function Wheel({ x, y, r = 30, spokes = false }) {
  return <g><circle cx={x} cy={y} r={r} fill="var(--scene-dark)" strokeWidth="4" /><circle cx={x} cy={y} r={r - 7} opacity=".5" /><circle cx={x} cy={y} r="4" fill="currentColor" />{spokes && <Line d={`M${x-r+7} ${y}h${2*r-14} M${x} ${y-r+7}v${2*r-14} M${x-16} ${y-16}l32 32 M${x+16} ${y-16}l-32 32`} opacity=".5" />}</g>;
}

function Phone({ x, y, rotate = 0, children }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate} 43 70)`}><rect width="86" height="140" rx="13" fill="var(--scene-dark)" strokeWidth="2.5" /><rect x="7" y="9" width="72" height="119" rx="8" fill="var(--scene-fill)" /><Line d="M32 7h22 M34 133h18" strokeWidth="3" />{children}</g>;
}

function Heart({ x, y, scale = 1 }) {
  return <Line transform={`translate(${x} ${y}) scale(${scale})`} d="M0 7C-15-7-28 12 0 29C28 12 15-7 0 7Z" fill="var(--scene-pop)" stroke="var(--scene-pop)" />;
}

function ModernCommute() {
  return <>
    <g opacity=".25"><Line d="M53 217V94h47v123 M109 211V65h58v142 M361 214V86h39v128 M414 217V124h33v93 M62 110h27 M62 129h27 M120 84h34 M120 103h34 M372 101h16 M372 120h16" /><Line d="M39 260h76m29 0h75m29 0h75m29 0h75" strokeWidth="3" /></g>
    <Wheel x={156} y={224} /><Wheel x={336} y={224} />
    <Line d="M121 207Q142 174 184 181L224 188L249 166L267 130L287 137L273 185L312 195Q333 188 352 206L338 215L292 216L274 231H200L178 207Z" fill="var(--scene-fill)" strokeWidth="2.5" />
    <Line d="M179 178h55q13 0 13 10h-74q-13-8 6-10Z" fill="var(--scene-dark)" strokeWidth="3" />
    <Line d="M266 131l-8-25h29 M278 107l18-13 M288 138l14 4-5 12-14-3 M134 195h20 M205 213h50 M318 195l18 29" strokeWidth="3" />
    <rect x="243" y="79" width="22" height="33" rx="4" fill="var(--scene-dark)" transform="rotate(-12 254 95)" /><Line d="M249 96l5-7 5 5" stroke="var(--scene-pop)" />
    <Line d="M166 153v-20q0-24 25-24t25 24v20Z" fill="var(--scene-pop)" /><Line d="M179 112v26h36 M176 154h36" stroke="var(--scene-dark)" />
    <g transform="translate(333 45)"><Line d="M0 23C0-8 42-8 42 23q0 17-21 37Q0 40 0 23Z" fill="var(--scene-fill)" /><circle cx="21" cy="21" r="7" /></g>
  </>;
}

function HeritageCommute() {
  return <>
    <g opacity=".3"><Line d="M40 248q200-35 416 0 M56 126q10 50 3 105 M57 131Q27 107 22 133 M57 131q18-33 44-12 M57 131q29-5 42 16" /><circle cx="401" cy="79" r="25" /></g>
    <Wheel x={126} y={224} r={34} spokes /><Wheel x={288} y={224} r={36} spokes /><Wheel x={370} y={216} r={28} spokes />
    <Line d="M126 224l49-69 43 69h-92l31-48h61l-43 48 M218 224l-8-87h-19 M159 153h34" strokeWidth="3" />
    <Line d="M219 219l38-71h96l17 68 M255 151l-5 44h68l27-42 M250 195l38 29 M317 195l-29 29" fill="var(--scene-fill)" strokeWidth="2.5" />
    <Line d="M260 151V96 M349 153V96 M242 96q57-58 123 0Z" fill="var(--scene-pop)" /><Line d="M254 88q49-33 100 0 M271 151v26h50l12-26" />
    <circle cx="188" cy="104" r="13" fill="var(--scene-pop)" /><Line d="M178 120l-16 33 32 20 17 33 M181 126l24 18 26-8 M168 157l-20 35 24 17" strokeWidth="9" /><Line d="M172 94q17-19 29 5h-32" fill="var(--scene-dark)" />
    <Line d="M58 268h50m38-7h30m168 8h60 M395 246l15-4m-6 17h17" opacity=".4" />
  </>;
}

function ModernMorning() {
  return <>
    <rect x="294" y="45" width="113" height="124" rx="3" opacity=".35" /><Line d="M350 45v124 M294 107h113" opacity=".35" /><circle cx="374" cy="80" r="18" fill="var(--scene-pop)" stroke="none" />
    <Line d="M66 237h371 M92 237v28 M412 237v28" strokeWidth="3" />
    <Phone x={103} y={75} rotate={-8}><text x="43" y="44" textAnchor="middle" fill="currentColor" stroke="none" fontSize="21" fontFamily="monospace">07:00</text><Line d="M23 61h40" /><rect x="16" y="76" width="54" height="31" rx="5" fill="var(--scene-dark)" /><Line d="M22 88l17-6-6 14-4-6Z M43 87h19m-19 8h13" /></Phone>
    <Line d="M252 211q-21-18-16-57l5-18h53l5 18q5 40-14 57Z M299 148q41-4 22 38l-22 4 M242 136h51 M255 126h25" fill="var(--scene-fill)" strokeWidth="2.5" /><Line d="M237 164l-20-13 6 34 15 4 M247 218h48" strokeWidth="3" />
    <Line d="M335 206h69l-11 29h-47Z" fill="var(--scene-pop)" /><Line d="M345 197q-7-9 0-18m16 18q-7-9 0-18 M379 207l18-31 M387 210l21-28" />
    <g transform="translate(193 51)"><rect width="76" height="42" rx="7" fill="var(--scene-dark)" /><Line d="M12 13l20-5-7 20-6-10Z M41 14h24 M41 24h16" /><circle cx="72" cy="1" r="6" fill="var(--scene-pop)" /></g>
  </>;
}

function HeritageMorning() {
  return <>
    <circle cx="102" cy="88" r="29" fill="var(--scene-pop)" opacity=".6" /><Line d="M36 131q72-22 149 0 M34 147h119 M47 157h99" opacity=".3" />
    <circle cx="215" cy="91" r="13" fill="var(--scene-pop)" /><Line d="M207 109l-10 60 30 2-3-61Z" fill="var(--scene-fill)" /><Line d="M204 171l-15 67 M222 171l22 66 M207 117l-26 24 M223 117l30 21" strokeWidth="7" />
    <Line d="M131 119q79-26 153 0 M140 116v69 M275 117v68" strokeWidth="2.5" /><Line d="M122 186h37l-5 37h-27Z M257 186h37l-5 37h-27Z" fill="var(--scene-fill)" /><Line d="M131 196h20 M266 196h20" opacity=".5" />
    <Line d="M328 150q-30 43-8 83h55q22-39-8-83Z" fill="var(--scene-fill)" strokeWidth="2" /><ellipse cx="347" cy="150" rx="20" ry="6" fill="var(--scene-dark)" /><Line d="M321 183q26 10 52 0 M320 214q28 9 56 0" opacity=".5" />
    <Line d="M391 218h54l10 31h-74Z" fill="var(--scene-pop)" /><Line d="M393 198h48l-5 20h-38Z M389 196h56 M412 190h9" fill="var(--scene-dark)" /><Line d="M407 244q-9-9 4-18 0 7 8 9 7-10 8-9 8 15-3 18Z" fill="var(--scene-dark)" /><Line d="M405 184q-10-14 0-26m16 23q-9-13 0-23 M48 249h310" opacity=".5" />
  </>;
}

function ModernLeisure() {
  return <>
    <circle cx="259" cy="138" r="99" opacity=".15" />
    <Line d="M159 87h192v130H159Z" fill="var(--scene-dark)" strokeWidth="2.5" /><Line d="M168 97h174v107H168Z" fill="var(--scene-fill)" /><Line d="M159 217l-27 25h245l-26-25Z" fill="var(--scene-fill)" /><Line d="M229 232h53 M184 122h66m-66 12h42 M192 150l-10 9 10 9m34-18 10 9-10 9m-14-24-9 29" strokeWidth="2" /><rect x="265" y="115" width="62" height="72" rx="5" fill="var(--scene-dark)" /><Line d="M287 136l23 14-23 14Z" fill="var(--scene-pop)" stroke="none" />
    <g transform="translate(71 157) rotate(-12)"><rect width="136" height="72" rx="14" fill="var(--scene-dark)" strokeWidth="2.5" /><rect x="30" y="8" width="76" height="56" rx="4" fill="var(--scene-fill)" /><Line d="M42 53l20-28 18 17 16-23" stroke="var(--scene-pop)" /><Line d="M12 36h13 M18 30v13" strokeWidth="3" /><circle cx="119" cy="31" r="3" /><circle cx="125" cy="42" r="3" /></g>
    <Line d="M345 157v-26q0-35 29-35t29 35v26 M345 129h12v35h-12Z M392 129h12v35h-12Z" strokeWidth="4" fill="var(--scene-fill)" />
    <Line d="M399 203h29l-4 36h-20Z M401 199h27 M418 201l7-23 M71 255h367" /><Line d="M104 77v26q-18 12-20 1t20-7 M104 77l22-5v25q-18 12-20 1t20-7" stroke="var(--scene-pop)" />
  </>;
}

function HeritageLeisure() {
  return <>
    <g opacity=".3"><Line d="M299 132h140l-70-56Z M313 132v64h112v-64 M326 108h86 M345 91h48 M369 76V58 M42 243q186-23 409 0" /></g>
    <circle cx="169" cy="98" r="14" fill="var(--scene-pop)" /><Line d="M158 115l-15 56 37 2 4-51Z" fill="var(--scene-fill)" /><Line d="M155 174l-13 60 M176 174l22 28 36-17 M157 124l-30 27-20-14 M184 127l25 24" strokeWidth="7" />
    <circle cx="293" cy="112" r="13" fill="var(--scene-pop)" /><Line d="M281 129l-8 53h35l-5-53Z" fill="var(--scene-fill)" /><Line d="M281 183l-19 50 M301 183l18 49 M278 136l-28 17 M305 137l22 21 18-16" strokeWidth="7" />
    <g transform="translate(234 130) rotate(18)"><ellipse cy="20" rx="8" ry="4" fill="var(--scene-pop)" /><Line d="M-5 19l-8-24 10 15 3-21 4 21 9-14-9 23" stroke="var(--scene-pop)" /></g>
    <rect x="56" y="194" width="73" height="48" rx="5" fill="var(--scene-dark)" /><circle cx="80" cy="218" r="16" /><circle cx="80" cy="218" r="9" opacity=".5" /><Line d="M103 204h18m-18 7h18m-18 7h18 M65 194l-9-42 M72 190v-7h30v7" /><circle cx="111" cy="231" r="4" />
    <rect x="356" y="205" width="62" height="39" rx="4" fill="var(--scene-fill)" /><rect x="365" y="212" width="44" height="14" rx="6" /><circle cx="374" cy="219" r="4" /><circle cx="400" cy="219" r="4" /><Line d="M370 240l5-10h24l5 10" />
  </>;
}

function ModernFood() {
  return <>
    <Phone x={312} y={58} rotate={9}><Line d="M15 33h56 M23 45v47m19-47v47m19-47v47 M15 58h56 M15 78h56" opacity=".3" /><Line d="M25 86V65h28V48" stroke="var(--scene-pop)" strokeWidth="3" /><circle cx="53" cy="48" r="6" fill="var(--scene-pop)" /><rect x="17" y="104" width="52" height="13" rx="5" fill="var(--scene-pop)" /></Phone>
    <Line d="M91 127h74l-9 108h-55Z" fill="var(--scene-fill)" strokeWidth="2.5" /><ellipse cx="128" cy="127" rx="40" ry="9" fill="var(--scene-pop)" /><Line d="M133 160l12-79h13" strokeWidth="5" /><Line d="M100 174h60" />
    {[ [113,211],[130,216],[147,210],[120,197],[139,195] ].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill="var(--scene-dark)" />)}
    <Line d="M193 116l45-21 56 20v95l-56 22-45-21Z" fill="var(--scene-fill)" strokeWidth="2" /><Line d="M193 116l45 19 56-20 M238 135v97 M219 110v-18q17-20 35 0v16" /><circle cx="264" cy="170" r="17" fill="var(--scene-pop)" /><Line d="M255 169l7 7 11-14" stroke="var(--scene-dark)" strokeWidth="3" />
    <Line d="M284 220h101q-10 32-50 32t-51-32Z" fill="var(--scene-dark)" /><ellipse cx="334" cy="220" rx="51" ry="10" fill="var(--scene-fill)" /><Line d="M306 217q8-14 16 0t16 0t16 0 M349 213l35-41 M358 216l39-37 M62 254h374" /><Line d="M66 88h20m-10-10v20 M268 63h14m-7-7v14" stroke="var(--scene-pop)" />
  </>;
}

function HeritageFood() {
  return <>
    <Line d="M108 99h271l-18-39H128Z" fill="var(--scene-fill)" strokeWidth="2" />
    {[130,174,218,262,306,350].map((x) => <Line key={x} d={`M${x} 61l-5 37h22l-4-37Z`} fill="var(--scene-pop)" stroke="none" opacity=".7" />)}
    <Line d="M117 99v16q11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0 11 12 22 0V99 M135 121v58 M352 121v58" />
    <Wheel x={167} y={239} r={25} spokes /><Wheel x={326} y={239} r={25} spokes />
    <Line d="M122 180h244v52H122Z" fill="var(--scene-fill)" strokeWidth="2.5" /><Line d="M114 179h260 M141 193h206 M141 220h206 M366 184h31l11 23" strokeWidth="2" />
    <ellipse cx="188" cy="172" rx="47" ry="9" fill="var(--scene-dark)" />
    {[157,177,197,217].map((x,i) => <g key={x}><ellipse cx={x} cy={166-i%2*6} rx="11" ry="6" fill="var(--scene-pop)" /><Line d={`M${x-4} ${164-i%2*6}l5 3`} stroke="var(--scene-dark)" /></g>)}
    <Line d="M265 151h60l-7 26h-46Z M260 150q35-32 70 0Z M288 130h14" fill="var(--scene-dark)" /><Line d="M280 121q-8-10 0-21m18 21q-8-10 0-21" opacity=".6" />
    <Line d="M387 131q-14 0-14 21l-6 7h39l-6-7q0-21-13-21Z M383 165h9 M387 130v-10" fill="var(--scene-pop)" /><Line d="M413 137l8-6m-7 20h10 M66 267h375" opacity=".5" />
  </>;
}

function ModernRomance() {
  return <>
    <circle cx="250" cy="153" r="100" opacity=".15" />
    <Phone x={105} y={90} rotate={-12}><circle cx="43" cy="46" r="23" stroke="var(--scene-pop)" strokeWidth="3" /><circle cx="43" cy="41" r="8" fill="var(--scene-pop)" /><Line d="M29 61q2-22 28 0" fill="var(--scene-pop)" /><Line d="M18 87h48m-48 11h34" /><Heart x={61} y={106} scale={.35} /></Phone>
    <Phone x={303} y={89} rotate={12}><rect x="15" y="29" width="54" height="29" rx="7" fill="var(--scene-pop)" /><Line d="M24 40h32m-32 8h22" stroke="var(--scene-dark)" /><rect x="23" y="70" width="46" height="25" rx="7" fill="var(--scene-dark)" />{[34,46,58].map(x => <circle key={x} cx={x} cy="83" r="2" fill="currentColor" />)}<Line d="M33 111h35" opacity=".5" /></Phone>
    <Line d="M195 153q56-58 110 0 M200 199q53 38 102-2" strokeDasharray="4 8" opacity=".6" />
    <Heart x={250} y={86} scale={1.7} /><Heart x={80} y={65} scale={.5} /><Heart x={419} y={183} scale={.65} />
    <g transform="translate(218 181)"><rect width="65" height="35" rx="14" fill="var(--scene-fill)" /><Line d="M17 34l-3 12 17-12" fill="var(--scene-fill)" />{[19,32,45].map(x => <circle key={x} cx={x} cy="17" r="3" fill="currentColor" />)}</g>
    <Line d="M94 264h309" opacity=".3" />
  </>;
}

function HeritageRomance() {
  return <>
    <Line d="M383 243q-10-76 6-135 M386 150l-32-26 M386 172l30-28" strokeWidth="5" /><Line d="M321 110q-22-29 10-48 5-37 40-28 30-27 51 7 41-2 38 33 29 30-6 48-10 29-42 6-30 25-52 0-26 11-39-18Z" fill="var(--scene-fill)" /><Line d="M342 83q29-16 47 10 M402 57q-9 20 8 35 M418 112l18-21" opacity=".4" />
    <g transform="translate(88 52) rotate(-9 80 45)"><rect width="150" height="90" rx="3" fill="var(--scene-fill)" strokeWidth="2" /><Line d="M0 0l75 53L150 0 M0 90l55-49 M150 90l-55-49" /><Heart x={75} y={37} scale={.65} /></g>
    <Wheel x={163} y={229} r={31} spokes /><Wheel x={310} y={229} r={31} spokes />
    <Line d="M163 229l39-60 41 60h-80l26-43h101l20 43 M243 229l-11-75 M218 153h31 M289 184l-10-40h20 M180 165h38 M180 159h35" strokeWidth="3" /><Line d="M135 190h47 M143 191l-6 17 M177 191l8 17" strokeWidth="2" />
    <Line d="M60 266h380 M339 246l10-15 8 15m37 0 10-17 8 17" opacity=".4" /><Heart x={271} y={88} scale={.65} />
  </>;
}

const scenes = {
  modern: [ModernCommute, ModernMorning, ModernLeisure, ModernFood, ModernRomance],
  heritage: [HeritageCommute, HeritageMorning, HeritageLeisure, HeritageFood, HeritageRomance],
};

export default function StoryIllustration({ era = "modern", story = "01" }) {
  const id = useId().replace(/:/g, "");
  const past = era === "heritage";
  const Scene = scenes[era]?.[Number(story) - 1];
  if (!Scene) return null;
  return (
    <svg className="architecture story-illustration" viewBox="0 0 500 300" fill="none" role="img" aria-labelledby={`${id}-title`} style={{ "--scene-dark": past ? "#30231c" : "#102e32", "--scene-fill": past ? "#78543b" : "#235b60", "--scene-pop": past ? "#e7b779" : "#c8dc96", color: past ? "#e2b686" : "#9de2d7" }}>
      <title id={`${id}-title`}>{illustrationCaption(era, story)} — {past ? "1980s–90s" : "2020s"} Cambodia</title>
      <defs><radialGradient id={`${id}-glow`}><stop stopColor={past ? "#e7b779" : "#82ddce"} stopOpacity=".13" /><stop offset="1" stopColor={past ? "#e7b779" : "#82ddce"} stopOpacity="0" /></radialGradient></defs>
      <ellipse cx="250" cy="157" rx="224" ry="138" fill={`url(#${id}-glow)`} />
      <ellipse cx="250" cy="260" rx="172" ry="12" fill="var(--scene-dark)" opacity=".5" />
      <g className="architecture-lines" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><Scene /></g>
    </svg>
  );
}
