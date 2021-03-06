FROM python:3.6-alpine

ENV PYTHONBUFFERED=1

WORKDIR /usr/src

COPY requirements.txt .

RUN apk update && apk add --no-cache --virtual .build-deps \
  ca-certificates gcc postgresql-dev linux-headers musl-dev \
  libffi-dev jpeg-dev zlib-dev \
  && pip install -r requirements.txt \
  && find /usr/local \
  \( -type d -a -name test -o -name tests \) \
  -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
  -exec rm -rf '{}' + \
  && runDeps="$( \
  scanelf --needed --nobanner --recursive /usr/local \
  | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
  | sort -u \
  | xargs -r apk info --installed \
  | sort -u \
  )" \
  && apk add --virtual .rundeps $runDeps \
  && apk del .build-deps

COPY . .

EXPOSE 8000

WORKDIR /usr/src/app

ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:8000 --workers=3 \
  --capture-output --error-logfile -"

RUN chmod 511 ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD gunicorn app.wsgi:application
