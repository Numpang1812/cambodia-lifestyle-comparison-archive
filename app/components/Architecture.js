import { useId } from "react";

// Original vector buildings. Each path is traced when the era reconstructs.
export default function Architecture({ era, variant = 0, hero = false }) {
  const id = useId().replace(/:/g, "");
  const past = era === "heritage";
  const line = (d, props = {}) => <path d={d} pathLength="1" {...props} />;
  return (
    <svg className={`architecture ${hero ? "architecture-hero" : ""}`} viewBox="0 0 500 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-glass`} x1="150" y1="50" x2="350" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#88d8d0" stopOpacity=".35" /><stop offset="1" stopColor="#153c43" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="200" y1="100" x2="260" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#966142" /><stop offset="1" stopColor="#3e2920" />
        </linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor={past ? "#e9ae6c" : "#75d9ca"} stopOpacity=".16" /><stop offset="1" stopColor={past ? "#e9ae6c" : "#75d9ca"} stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="260" cy="173" rx="230" ry="127" fill={`url(#${id}-halo)`} />
      <g className="architecture-ground" stroke="currentColor" strokeOpacity=".2">
        {line("M30 270H470 M85 280H435 M130 289H370")}
        {line("M250 255L90 298 M250 255L410 298 M250 255V298")}
      </g>
      {past ? (
        <g className="architecture-lines" stroke="#dca976" strokeWidth="1.2" strokeLinejoin="round">
          <g opacity=".45">
            {line("M69 260Q83 180 76 132 M77 142Q52 113 28 147 M77 142Q87 109 114 128 M77 142Q47 126 35 119 M77 142Q97 135 123 159 M77 142Q80 119 69 108")}
            {line("M426 266Q414 204 426 159 M425 168Q398 147 377 166 M425 168Q442 139 469 158 M425 168Q451 164 478 189 M425 168Q422 146 436 135")}
          </g>
          {line("M153 186V267H165V190 M314 181V258H325V179 M356 167V245H365V167", { fill: "#4d3223" })}
          {/* Continuous gable and raised side wall meet the roof's underside. */}
          {line("M148 151L231 83L312 147V220L148 228Z", { fill: `url(#${id}-wood)` })}
          {line("M312 132L368 126V204L312 220Z", { fill: "#4c3327" })}
          {line("M168 136L294 135 M180 126L282 125 M192 116L270 115 M204 106L258 105 M216 96L246 95", { strokeOpacity: .3 })}
          {line("M124 140L231 47L333 131L312 147L231 83L150 151Z", { fill: "#775139" })}
          {line("M231 47L288 38L388 125L333 131Z", { fill: "#4a3329" })}
          {line("M119 139L231 41L336 130 M231 41L287 32L392 122 M231 41V27 M287 32V20", { strokeWidth: 2.5 })}
          {line("M163 129L230 69L296 123 M188 108H270 M205 93H252", { strokeOpacity: .6 })}
          {Array.from({ length: 9 }, (_, i) => <path key={i} pathLength="1" d={`M150 ${151 + i * 8}L310 ${143 + i * 8} M314 ${143 + i * 8}L366 ${158 + i * 5.5}`} strokeOpacity=".3" />)}
          {line("M174 160L208 158V195L174 197Z M259 156L292 154V191L259 193Z", { fill: "#261f1a" })}
          {line("M180 163V193 M186 163V193 M192 162V192 M198 162V192 M265 159V189 M271 158V188 M277 158V188 M283 158V188", { strokeOpacity: .55 })}
          {line("M222 174L248 172V222L222 223Z", { fill: "#291e18" })}
          {line("M140 228L315 220L378 202 M140 233L315 226L378 207", { strokeWidth: 3 })}
          {line("M224 226L202 278 M246 225L229 278 M220 237H242 M216 247H239 M212 257H236 M208 267H232", { strokeWidth: 2 })}
          {line("M157 244L308 236 M167 264L308 233", { strokeOpacity: .4 })}
          {variant % 2 === 1 && line("M337 218V243 M326 243H349 M337 219Q318 204 325 197Q340 193 337 219 M337 219Q358 202 351 197Q334 192 337 219", { stroke: "#adbd80" })}
        </g>
      ) : (
        <g className="architecture-lines" stroke="#9ce6dc" strokeWidth="1.1" strokeLinejoin="round">
          <g opacity=".22">
            {line("M48 265V185H81V265 M89 265V150H125V265 M384 262V171H417V262 M426 262V205H451V262")}
            {line("M57 195H71 M57 209H71 M57 223H71 M99 162H115 M99 177H115 M99 192H115 M396 183H407 M396 199H407 M396 215H407")}
          </g>
          {line(`M${176 + variant * 3} 242V${73 - variant * 5}L259 38L305 65V243Z`, { fill: `url(#${id}-glass)` })}
          {line("M259 38V240 M259 38V23 M252 24H267", { strokeWidth: 1.8 })}
          {line("M187 83L248 58 M187 102L248 77 M187 121L248 96 M187 140L248 115 M187 159L248 134 M187 178L248 153 M187 197L248 172 M187 216L248 191", { strokeOpacity: .55 })}
          {line("M203 74V230 M223 66V230 M277 52V228 M292 59V228", { strokeOpacity: .45 })}
          {line("M262 76L300 96 M262 99L300 117 M262 122L300 138 M262 145L300 159 M262 168L300 180", { strokeOpacity: .4 })}
          {line("M291 248V127L343 108L374 126V246Z", { fill: `url(#${id}-glass)` })}
          {line("M343 108V246 M301 141L333 129 M301 155L333 144 M301 169L333 159 M301 183L333 174 M301 197L333 189 M301 211L333 204 M301 225L333 219", { strokeOpacity: .6 })}
          {line("M123 251V190L188 167L228 188V252Z", { fill: "#173d40" })}
          {line("M117 189L188 162L235 185L228 194L188 174L123 198Z", { fill: "#4b7d77" })}
          {line("M188 174V251 M135 209L175 195V235L135 246Z", { fill: "#7fe1cc", fillOpacity: .13 })}
          {line("M148 205V242 M162 200V238 M133 222L177 208 M200 204V240 M214 209V244", { strokeOpacity: .5 })}
          {line("M114 253L187 269L387 249 M114 259L187 275L387 255 M187 269V275", { strokeWidth: 1.8 })}
          {line("M234 92L246 87 M234 111L246 106 M305 184L331 176 M305 212L331 204", { stroke: "#e1efb0", strokeWidth: 2.5 })}
          {line("M105 246V225 M98 224H112 M398 245V217 M391 216H405", { strokeWidth: 2 })}
        </g>
      )}
      <g fill="currentColor" opacity=".6"><circle cx="40" cy="270" r="2" /><circle cx="460" cy="270" r="2" /></g>
    </svg>
  );
}
