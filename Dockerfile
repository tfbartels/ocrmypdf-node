FROM node:14.17.3-buster-slim

#definicao do usuario
USER root

#definindo diretÃ³rio de trabalho padrÃ£o
WORKDIR /usr/app

RUN apt update && \
    apt install && \
    apt install ocrmypdf -y && \
    apt install tesseract-ocr-por
