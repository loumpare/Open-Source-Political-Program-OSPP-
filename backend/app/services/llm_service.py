import anthropic
import redis.asyncio as aioredis
import hashlib
import json
import os

_client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
_redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")


def _cache_key(prompt: str) -> str:
    return "llm:" + hashlib.sha256(prompt.encode()).hexdigest()


async def agent_decision(agent_profile: dict, proposition: dict) -> dict:
    """Ask Claude to simulate an agent's vote on a proposition."""
    prompt = (
        f"Tu es un citoyen français avec ce profil: {json.dumps(agent_profile, ensure_ascii=False)}.\n"
        f"Voici une proposition politique: {json.dumps(proposition, ensure_ascii=False)}.\n"
        "Réponds UNIQUEMENT avec un JSON: {\"vote\": 1 ou -1, \"raison\": \"une phrase\"}"
    )

    key = _cache_key(prompt)
    r = aioredis.from_url(_redis_url)
    cached = await r.get(key)
    if cached:
        await r.aclose()
        return json.loads(cached)

    message = _client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=128,
        system="Tu simules le comportement électoral d'un citoyen français. Réponds uniquement en JSON valide.",
        messages=[{"role": "user", "content": prompt}],
    )
    result = json.loads(message.content[0].text)
    await r.set(key, json.dumps(result), ex=86400)  # cache 24h
    await r.aclose()
    return result
