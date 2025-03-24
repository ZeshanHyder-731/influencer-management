# Influencer Management Web Application

## Description
This is a simple Influencer Management Web Application built using React and TypeScript for the frontend and Node.js with TypeScript for the backend. The application allows users to create influencers with multiple social media accounts and view a list of influencers with filtering options.

## Features
- Create a new influencer with first name, last name, and multiple social media accounts (Instagram/TikTok).
- Prevent duplicate social media accounts for the same platform per influencer.
- List all influencers with their details.
- Filter influencers by name via API.

## Technologies Used
- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **API Handling:** Axios
- **Styling:** Tailwind CSS

## Installation & Setup

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (>= 16.x)
- npm or yarn

### Steps to Run the Application

#### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd influencer-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```
4. The backend API will be running at:
   ```
   http://localhost:5000/
   ```

#### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd influencer-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
4. The frontend will be running at:
   ```
   http://localhost:5174
   ```

## Usage
1. Navigate to `http://localhost:5174`.
2. Create new influencers by providing their first name, last name, and social media accounts.
3. View the list of influencers and use the search feature to filter by name.

## Error Handling & Validation
- First name and last name are limited to 50 characters.
- Prevents duplicate social media accounts of the same type for an influencer.
- Handles API errors and displays relevant messages.