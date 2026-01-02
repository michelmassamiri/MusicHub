# MusicHub

Web application which provides a user interface to manage users playlists from YouTube API, Spotify API and Deezer API.

## Tech Stack

### Frontend
- **Framework**: Angular 18.2
- **UI Library**: Angular Material 18.2
- **Styling**: Bootstrap 5.3
- **Notifications**: ngx-toastr 19.0
- **Authentication**: @auth0/angular-jwt 5.2

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4.21
- **Database**: MongoDB with Mongoose 8.10
- **Authentication**: JWT (jsonwebtoken 9.0, express-jwt 8.5)
- **OAuth**: Google Auth Library 9.15
- **File Upload**: Multer 2.0

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB
- Google OAuth credentials

### Backend Setup
```bash
cd Back
npm install
npm start
```
The backend server will run on http://localhost:3000

### Frontend Setup
```bash
cd Front/Front
npm install
ng serve
```
The frontend will run on http://localhost:4200

## Features
- Google OAuth authentication
- YouTube playlist import
- Create, edit, and delete custom playlists
- Add and manage songs within playlists
- File upload for playlist thumbnails
