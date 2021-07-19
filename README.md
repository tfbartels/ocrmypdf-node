## About The Project
OCRMYPDF-NODE is a script to convert files PDFs images into PDFs searchables.

### Built With
This project was built with Node, Docker and use OCRMYPDF to convert PDFs images into PDFs searchables.

## Getting Started

### Prerequisites
* Docker

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/tfbartels/ocrmypdf-node.git
   ```
2. Create the directories **pdfs/input** and **pdfs/output** in the root.

## Usage
1. Put the files to convert in **pdfs/input**

2. Run the docker container
   ```bash
   docker-compose up  
   ```
3. Get into a container
   ```bash
   docker exec -it ocrmypdf-node bash
   ```
4. Start the convertion
   ```bash
   npm start
   ```
5. Get the converted files in **pdfs/output**
