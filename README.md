# Digitz Books API

## Overview
The Digitz Books API is a RESTful API designed to provide access to various Quran-related resources. It allows users to retrieve Quran models, scrape websites to get meaning of specific words, and get details about specific Suras and the entire Quran.

## Features
- Create files for the API.
- Retrieve the Quran model. This includes all the verses with their metadata.
- Get the Quran index with details about each Sura.
- Access Quran text with Tashkeel.
- Fetch words details of specific Suras. This will be used to get the position of the word in the sura as well as the position of the word in the entire Quran.
- Find meaning of a word in the Quran by scraping a website.

## API Endpoints

### 1. Create Files
- **POST** `/services/create`
  - **Summary**: Create files
  - **Description**: Creates files for the API.
  - **Responses**:
    - `201`: Files created successfully.
    - `500`: Error during file creation.

### 2. Get Quran Model
- **GET** `/api/quran-model`
  - **Summary**: Get Quran model
  - **Responses**:
    - `200`: Successful response.

### 3. Get Quran Index
- **GET** `/api/quran-index`
  - **Summary**: Get Quran index
  - **Responses**:
    - `200`: Successful response.

### 4. Get Quran with Tashkeel
- **GET** `/api/with-tashkeel`
  - **Summary**: Get Quran with Tashkeel
  - **Responses**:
    - `200`: Successful response.

### 5. Get Sura Details
- **GET** `/api/view/sura-details/{fileName}`
  - **Summary**: Get details of a specific Sura
  - **Parameters**:
    - `fileName` (path, required): Name of the Sura file.
  - **Responses**:
    - `200`: Successful response.

### 6. Scrape a Word
- **GET** `/api/scrape/{word}`
  - **Summary**: Scrape a website that contains the meaning of a word from the Quran
  - **Parameters**:
    - `word` (path, required): Word to get meaning of.
  - **Responses**:
    - `200`: Successful response.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kaisbitar/digitz-book-express.git
   cd digitz-books-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Access the API documentation at:
   ```
   http://localhost:3000/api-docs/
   ```

## Technologies Used
- Node.js
- Express.js
- Swagger for API documentation

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
