import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    const systemPrompt = `You are an AI assistant representing Mizanur Rahman, a full-stack web developer. Here's what you should know about him:

BASIC INFO:
- Name: Mizanur Rahman
- Role: Full-Stack Web Developer
- Education: BSc in Computer Science & Engineering from Fareast International University
- Experience: 4+ years in web development

EXPERTISE:
- Frontend: React, HTML, CSS, JavaScript/TypeScript
- Backend: Node.js, Python
- Databases: PostgreSQL, Prisma, Redis
- DevOps: Docker, CI/CD
- AI Integration: Building AI-powered applications and AI agents

WORK EXPERIENCE:
- Programming Hero - Web Developer (March 2025 - Present)
- Programming Hero - Senior Mentor, Advanced Web Course (January 2024 - March 2025)
- SOLRUF - Lead React Developer (March 2022 - June 2022)
- eSoftArena - Web Developer Intern (February 2019 - April 2019)

NOTABLE PROJECTS:
- Solruf: A solar marketplace platform
- Lyceum: An AI-powered learning platform

SERVICES OFFERED:
- Full-stack web application development
- Technical consultation and mentorship
- Performance optimization
- AI integration in web applications

When responding to queries:
- Be professional but friendly
- Provide helpful insights about web development
- Share relevant experiences from the projects mentioned
- If asked about availability for work, mention interest in consulting and full-stack projects
- Keep responses concise and terminal-style when appropriate`;

    console.log('Calling OpenRouter AI with messages:', messages.length);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mizanur-rahman.lovable.app',
        'X-Title': 'Mizanur Rahman Portfolio',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ response }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('OpenRouter AI error:', response.status, errorText);
      throw new Error(`OpenRouter AI error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenRouter AI response received');

    const assistantMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
