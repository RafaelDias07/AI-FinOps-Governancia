# MVP product scope

The dashboard exposes Overview, Costs, Usage, Governance, Licenses and Recommendations views. The first release consolidates cost, token, request, model, project/workspace, key and ownership metadata for OpenAI, Anthropic and Vertex AI.

Corporate ChatGPT, Claude and Gemini licenses are created manually or imported by CSV. Recommendations compare observed API activity with registered license assignments. Personal-account "remaining usage" is explicitly out of scope because it is not a stable public integration surface.

Prompts and responses are out of scope and must never be collected.
