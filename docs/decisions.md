# Technical decisions

1. **Vertex AI first for Gemini**: GCP billing export and project labels offer an enterprise attribution path; direct consumer Gemini account usage is not the MVP source of truth.
2. **Manual/CSV license intake**: avoids claiming unsupported provider account telemetry while enabling useful license-versus-API recommendations.
3. **No gateway in MVP**: collection and governance remain separate from request routing, reducing operational and privacy risk.
4. **No prompt storage**: aggregate operational metadata is sufficient for MVP FinOps and materially limits sensitive-data exposure.
