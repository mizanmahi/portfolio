# Mizanur Rahman - AI Powered Portfolio

A professional portfolio and demo project for Mizanur Rahman — a Full-Stack Web Developer with 4+ years of experience building modern web applications and AI integrations. This repository contains the website source code and an integrated AI "proxy agent" that can respond on Mizanur's behalf using the profile data included in this project.

## About Mizanur

- Name: Mizanur Rahman
- Role: Full-Stack Web Developer
- Education: BSc in Computer Science & Engineering — Fareast International University
- Experience: 4+ years in web development

Core expertise: React, TypeScript, HTML/CSS, Node.js, Python, PostgreSQL, Prisma, Redis, Docker, CI/CD, and AI integrations.

Work experience highlights:
- Programming Hero — Web Developer (March 2025 - Present)
- Programming Hero — Senior Mentor, Advanced Web Course (Jan 2024 - Mar 2025)
- SOLRUF — Lead React Developer (Mar 2022 - Jun 2022)
- eSoftArena — Web Developer Intern (Feb 2019 - Apr 2019)

Notable projects: Solruf (solar marketplace), Lyceum (AI-powered learning platform).

## Project Overview

This repo hosts Mizanur's personal portfolio site and a serverless chat function that powers an AI agent which can act as a proxy for Mizanur in conversation. The agent is pre-seeded with the developer's profile and project information so it can answer questions about skills, experience, services offered, and portfolio work in a consistent, professional voice.

Key points about the AI proxy agent:
- Implementation: An edge function lives at `supabase/functions/chat/index.ts` and forwards chat messages to an AI provider (configured via an environment variable).
- Input/Output: The function expects a JSON body like { "messages": [ { "role": "user|assistant|system", "content": "..." }, ... ] } and returns a JSON object containing { "message": "..." } on success.
- Auth & secrets: The function requires a `LOVABLE_API_KEY` environment variable (or equivalent API key) to call the AI gateway.
- Purpose & scope: The agent is intended for portfolio/demo purposes, it helps answer typical questions about Mizanur's background, skills, and availability. It is not a replacement for contractual or legal communications and should not be used to authorize actions or handle sensitive data.

## Features

- Responsive portfolio UI built with React + Tailwind CSS.
- Modular component library (shadcn-ui primitives) for consistent UI.
- Integrated AI chat proxy that can speak in the voice of the developer, seeded with profile data and project summaries.
- Supabase functions folder contains the chat function (Deno-based) used to contact the AI gateway.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- UI: shadcn-ui components
- Backend / Edge Functions: Supabase Edge Functions (Deno)
- AI: Lovable AI gateway (configured via `LOVABLE_API_KEY`) - replaceable by other providers with compatible API usage

## Getting Started (local development)

Prerequisites
- Node.js and npm (or your preferred package manager). See project `package.json` for scripts.

Install and run the frontend:

```bash
git clone <your-repo-url>
cd mizanur-retroverse
npm install
npm run dev
```

The site will be served by Vite (default: http://localhost:5173). Adjust as necessary based on the output from the dev server.

Running the chat function

- The chat function lives at `supabase/functions/chat/index.ts`. It is a Deno-based edge function that expects an environment variable named `LOVABLE_API_KEY`.
- To test the function locally or after deployment, send a POST request with a JSON payload `{ "messages": [...] }` to the function endpoint. Example (replace <FUNCTION_URL> with your deployed function URL):

```bash
curl -X POST <FUNCTION_URL> \
	-H "Content-Type: application/json" \
	-d '{ "messages": [{ "role": "user", "content": "Tell me about Mizanur's expertise" }] }'
```

Response:

```json
{ "message": "...assistant reply..." }
```

Environment variables
- `LOVABLE_API_KEY` — required to call the AI gateway. Keep this secret and do not commit it to source control.

Deployment
- Deploy the frontend (Vite) using your preferred static-hosting or server platform (Vercel, Netlify, Cloudflare Pages, etc.).
- Deploy the edge function to Supabase Edge Functions (or an equivalent Deno-compatible serverless platform) and set `LOVABLE_API_KEY` in the runtime environment.

## Security & Privacy

The included AI agent is seeded with Mizanur's professional data so it can respond with accurate and consistent information. Treat the agent as a demo assistant — avoid sending secrets, credentials, or personally identifiable information to the agent. Review and rotate API keys regularly.

## Contributing

Contributions are welcome. Open an issue or submit a pull request for fixes, improvements, or documentation updates.

## Contact

For business inquiries, consulting, or mentorship requests, use the contact form on the live portfolio site or open an issue on this repository.

---

This README was updated to reflect the portfolio and AI agent integration. For implementation details, see `supabase/functions/chat/index.ts`.
