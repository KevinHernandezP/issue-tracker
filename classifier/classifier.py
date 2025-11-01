# classifier.py
def classify_text(text: str):
    tags = []
    text = text.lower()
    if any(word in text for word in ["auth", "login", "token", "password"]):
        tags.append("security")
    if any(word in text for word in ["ui", "button", "screen", "frontend"]):
        tags.append("frontend")
    if any(word in text for word in ["database", "sql", "backend", "server"]):
        tags.append("backend")
    if any(word in text for word in ["performance", "slow", "optimize"]):
        tags.append("performance")
    if not tags:
        tags.append("general")
    return tags
