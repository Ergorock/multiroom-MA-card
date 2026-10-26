// À exécuter dans la console d'une page Home Assistant (compte administrateur), après avoir
// remplacé PATCH par le contenu de .deploy/patch.json et RID par l'identifiant de la ressource.
// Applique le correctif à la ressource inline, en vérifiant les CRC32 avant et après.
const PATCH = /* contenu de .deploy/patch.json */ null;
const RID = "7ec9c1c53174428fadf22c8bf01685ad";

const crc = (text) => {
  let c = ~0;
  for (const x of new TextEncoder().encode(text)) {
    c ^= x;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c >>> 0).toString(16);
};

const hass = document.querySelector("home-assistant").hass;
const res = (await hass.callWS({ type: "lovelace/resources" })).find((r) => r.id === RID);
const prefix = res.url.slice(0, res.url.indexOf(",") + 1);
const oldText = await fetch(res.url).then((r) => r.text());
if (crc(oldText) !== PATCH.from) throw new Error(`Version déployée inattendue : ${crc(oldText)}`);

const old = oldText.split("\n");
const out = [];
let p = 0;
for (const [op, v] of PATCH.ops) {
  if (op === "k") {
    out.push(...old.slice(p, p + v));
    p += v;
  } else if (op === "d") p += v;
  else out.push(...v);
}
const newText = out.join("\n");
if (crc(newText) !== PATCH.to) throw new Error(`Correctif incohérent : ${crc(newText)}`);

const bytes = new TextEncoder().encode(newText);
let bin = "";
for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
await hass.callWS({ type: "lovelace/resources/update", resource_id: RID, res_type: "module", url: prefix + btoa(bin) });
console.log(`Ressource mise à jour : ${PATCH.from} → ${PATCH.to}`);
