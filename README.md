# 🏍️ Bikers Hub

**Bikers Hub** is a location-based web application designed to help motorcycle riders find nearby garages, view service details, and read reviews — all in one place.

## 🚀 Features

- 📍 Find nearby garages using Google Maps
- 🛠️ View garage details (name, location, open hours, contact, and image)
- 🔍 Search for garages by area
- ✍️ User authentication (Biker & Garage Owner roles)
- 📸 Add garages with image uploads (Cloudinary)
- ⭐ View and leave garage reviews *(optional/coming soon)*

## 🛠️ Tech Stack

- **Frontend:** React JS, Vite, Tailwind CSS
- **Backend:** Firebase (Auth & Firestore), Cloudinary (Image Uploads)
- **APIs:** Google Maps API

## 🧑‍💻 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/snethndun/Bikers-hub.git
   cd bikers-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase and Google Maps API in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_GOOGLE_MAPS_API_KEY=your_key
   ```

4. Run the app:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/
├── pages/
├── firebase/
├── hooks/
├── assets/
└── App.jsx
```

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

This project is licensed under the MIT License.
