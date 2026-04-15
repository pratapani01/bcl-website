# 🏏 Bharatiya Cricket League (BCL) – Official Website

A premium, multi-page React website for BCL Season 1.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navbar with mobile menu
│   ├── Footer.jsx          # Footer with social links
│   ├── HeroSlider.jsx      # Auto-playing hero slider
│   ├── Timeline.jsx        # Registration process timeline
│   ├── TeamCard.jsx        # Reusable team card
│   └── ScrollToTop.jsx     # Auto scroll on route change
├── pages/
│   ├── Home.jsx            # Full homepage with all sections
│   ├── Teams.jsx           # All teams grid
│   ├── TeamDetail.jsx      # Dynamic team detail page
│   ├── About.jsx           # About BCL page
│   └── Contact.jsx         # Contact + WhatsApp form
├── data/
│   └── teams.js            # All 10 team data
└── assets/                 # Place your images here
```

---

## 🖼️ Adding Images

Place images in the `public/assets/` folder (create it if it doesn't exist):

```
public/
└── assets/
    ├── logo.png             # BCL Logo
    ├── img-hero1.jpg        # Hero slide 1
    ├── img-hero2.jpg        # Hero slide 2
    ├── img1.jpg – img8.jpg  # Gallery images
    ├── team1.png            # Delhi Dynamos
    ├── team2.png            # Mumbai Strikers
    ├── team3.png            # Bengaluru Blasters
    ├── team4.png            # Chennai Challengers
    ├── team5.png            # Kolkata Kings
    ├── team6.png            # Hyderabad Hawks
    ├── team7.png            # Jaipur Royals
    ├── team8.png            # Lucknow Lions
    ├── team9.png            # Pune Panthers
    └── team10.png           # Ahmedabad Avengers
```

> ✅ All image placeholders are handled gracefully — the site works perfectly even without images.

---

## ⚙️ Customization

### Update Google Form Link
Search for `GOOGLE_FORM_URL` in:
- `src/components/Navbar.jsx`
- `src/components/HeroSlider.jsx`
- `src/pages/Home.jsx`
- `src/pages/TeamDetail.jsx`
- `src/pages/About.jsx`

Replace `'https://forms.google.com'` with your actual Google Form URL.

### Update WhatsApp Number
Search for `WA_NUMBER` or `9250324379` and replace with your number.

### Update Team Data
Edit `src/data/teams.js` to update team names, cities, descriptions, and colors.

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/teams` | All Teams |
| `/team/:teamName` | Team Detail |
| `/about` | About BCL |
| `/contact` | Contact |

---

## 🎨 Design

- **Font**: Poppins (Google Fonts)
- **Primary**: `#1B3A6B` (BCL Blue)
- **Accent**: `#C9A227` (BCL Gold)
- **Red**: `#E63946`
- **Theme**: White, clean, professional sports

---

## 👨‍💻 Designed By

**Animesh Pratap Singh**  
Instagram: [@animesh_pratap_singh](https://instagram.com/animesh_pratap_singh)

---

© All Rights Reserved by Team BCL
