FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_CACHE_DIR=/tmp/pip-cache

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/requirements.txt

RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r /tmp/requirements.txt \
 && rm -rf /tmp/requirements.txt $PIP_CACHE_DIR

COPY . .

RUN find . -type d -name '__pycache__' -exec rm -r {} + 2>/dev/null || true \
 && find . -type f -name '*.pyc' -delete \
 && find . -type f -name '*.pyo' -delete

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
