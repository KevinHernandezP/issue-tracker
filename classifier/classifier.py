# classifier.py
def classify_text(text: str):
    text = text.lower()
    tags = []

    rules = {
        "security": ["auth", "login", "token", "password"],
        "frontend": ["ui", "button", "screen", "frontend"],
        "backend": ["database", "sql", "backend", "server"],
        "performance": ["performance", "slow", "optimize"],
    }

    for tag, keywords in rules.items():
        if any(word in text for word in keywords):
            tags.append(tag)

    if not tags:
        tags.append("general")

    return tags
