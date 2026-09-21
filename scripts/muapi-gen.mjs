// One-off asset generator for the landing page artwork.
// Usage: node scripts/muapi-gen.mjs <jobsFile.json>
import fs from 'node:fs/promises';
import path from 'node:path';

const KEY = (await fs.readFile('.env', 'utf8')).match(/^MUAPI_API=(.+)$/m)[1].trim();
const BASE = 'https://api.muapi.ai/api/v1';
const OUT = 'assets-gen';

const post = (endpoint, body) =>
  fetch(`${BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());

const poll = async (id) => {
  for (let i = 0; i < 120; i++) {
    const r = await fetch(`${BASE}/predictions/${id}/result`, { headers: { 'x-api-key': KEY } }).then((r) => r.json());
    if (r.status === 'completed' || r.status === 'failed' || r.error) return r;
    await new Promise((s) => setTimeout(s, 3000));
  }
  throw new Error('timeout');
};

const jobs = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
await fs.mkdir(OUT, { recursive: true });

const started = [];
for (const job of jobs) {
  const res = await post(job.endpoint ?? 'seedream-5.0-pro', {
    prompt: job.prompt,
    aspect_ratio: job.aspect_ratio,
    resolution: job.resolution ?? '2K',
  });
  const id = res.request_id ?? res.id;
  console.log(`submitted ${job.name} -> ${id} ${id ? '' : JSON.stringify(res)}`);
  if (id) started.push({ ...job, id });
}

let spent = 0;
for (const job of started) {
  const r = await poll(job.id);
  const url = r.outputs?.[0];
  spent += r.cost?.amount_usd ?? 0;
  if (!url) {
    console.log(`FAILED ${job.name}: ${JSON.stringify(r).slice(0, 300)}`);
    continue;
  }
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  const file = path.join(OUT, `${job.name}.png`);
  await fs.writeFile(file, buf);
  console.log(`saved ${file} (${(buf.length / 1024 / 1024).toFixed(1)} MB) $${(r.cost?.amount_usd ?? 0).toFixed(3)}`);
}
console.log(`total $${spent.toFixed(3)}`);
