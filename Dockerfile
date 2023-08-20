FROM python:3.10.8-alpine

RUN apk add --update --no-cache python3-dev

COPY requirements_dev.txt requirements.txt manage.py __init__.py /backend/
COPY backend /form_builder/backend
COPY frontend /form_builder/frontend

WORKDIR /form_builder

RUN apk add bash

RUN pip install --upgrade pip
RUN pip install -r backend/requirements_dev.txt

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH "/"

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

CMD ["python", "backend/manage.py", "runserver"]
