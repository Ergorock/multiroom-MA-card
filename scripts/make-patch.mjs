// Calcule le correctif ligne à ligne entre la version déployée et le nouveau build :
//   node scripts/make-patch.mjs [ancien] [nouveau]  → écrit .deploy/patch.json
// Le correctif s'applique dans la page Home Assistant (voir README, « Mise à jour de la ressource »),
// qui vérifie les sommes CRC32 avant et après pour ne jamais enregistrer un fichier altéré.
import { readFileSync, writeFileSync } from "node:fs";

const [oldPath = ".deploy/deployed.js", newPath = "dist/multiroom-card.js"] = process.argv.slice(2);
const oldText = readFileSync(oldPath, "utf8");
const newText = readFileSync(newPath, "utf8");

function crc32(text) {
  let c = ~0;
  for (const byte of Buffer.from(text, "utf8")) {
    c ^= byte;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c >>> 0).toString(16);
}

const a = oldText.split("\n");
const b = newText.split("\n");

// Préfixe et suffixe communs, puis plus longue sous-séquence commune sur le milieu.
let start = 0;
while (start < a.length && start < b.length && a[start] === b[start]) start++;
let endA = a.length;
let endB = b.length;
while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
  endA--;
  endB--;
}
const midA = a.slice(start, endA);
const midB = b.slice(start, endB);
const n = midA.length;
const m = midB.length;
const lcs = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
for (let i = n - 1; i >= 0; i--) {
  for (let j = m - 1; j >= 0; j--) {
    lcs[i][j] = midA[i] === midB[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  }
}

// Opérations : ["k", n] garde n lignes, ["d", n] en supprime n, ["i", [...]] insère des lignes.
const ops = [];
const push = (type, value) => {
  const last = ops[ops.length - 1];
  if (last && last[0] === type) {
    if (type === "i") last[1].push(value);
    else last[1] += value;
  } else ops.push(type === "i" ? ["i", [value]] : [type, value]);
};
if (start) ops.push(["k", start]);
let i = 0;
let j = 0;
while (i < n || j < m) {
  if (i < n && j < m && midA[i] === midB[j]) {
    push("k", 1);
    i++;
    j++;
  } else if (j < m && (i === n || lcs[i][j + 1] >= lcs[i + 1][j])) {
    push("i", midB[j++]);
  } else {
    push("d", 1);
    i++;
  }
}
if (a.length - endA) push("k", a.length - endA);

const patch = { from: crc32(oldText), to: crc32(newText), ops };
writeFileSync(".deploy/patch.json", JSON.stringify(patch));
const inserted = ops.filter((o) => o[0] === "i").reduce((s, o) => s + o[1].length, 0);
console.log(`${patch.from} → ${patch.to} : ${ops.length} opérations, ${inserted} lignes insérées, ${JSON.stringify(patch).length} octets`);
