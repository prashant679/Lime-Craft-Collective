import { getCliClient } from "sanity/cli";

async function main() {
  const client = getCliClient({ apiVersion: "2026-08-04" });
  const result = await client.fetch(`*[_type == "service"]{ _id, name }`);
  console.log("Services fetched:", result);
}

main().catch(console.error);
