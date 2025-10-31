# Imagen base
FROM python:3.11

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código
COPY . .

# Exponer el puerto del servicio Python
EXPOSE 5000

# Comando de inicio
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
