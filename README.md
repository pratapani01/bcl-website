# 🏏 Uttar Pradesh Women Cricket League (UPWCL) – Official Website

A premium, multi-page React website for Uttar Pradesh Women Cricket League (UPWCL) Season 1 — a women-only cricket league.

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
│   ├── About.jsx           # About UPWCL page
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
    ├── logo.png             # UPWCL Logo
    ├── img-hero1.jpg        # Hero slide 1
    ├── img-hero2.jpg        # Hero slide 2
    ├── img1.jpg – img8.jpg  # Gallery images
    ├── team1.png            # Lucknow Nawabs
    ├── team2.png            # Kanpur Strikers
    ├── team3.png            # Varanasi Warriors
    ├── team4.png            # Agra Aces
    ├── team5.png            # Prayagraj Panthers
    ├── team6.png            # Meerut Mavericks
    ├── team7.png            # Gorakhpur Gladiators
    ├── team8.png            # Bareilly Blazers
    ├── team9.png            # Jhansi Queens
    └── team10.png           # Ghaziabad Giants
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
Search for `WA_NUMBER` or `9889370894` and replace with your number.

### Update Team Data
Edit `src/data/teams.js` to update team names, cities, descriptions, and colors.

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/teams` | All Teams |
| `/team/:teamName` | Team Detail |
| `/about` | About UPWCL |
| `/contact` | Contact |

---

## 🎨 Design

- **Font**: Poppins (Google Fonts)
- **Primary**: `#1B3A6B` (UPWCL Blue)
- **Accent**: `#C9A227` (UPWCL Gold)
- **Red**: `#E63946`
- **Theme**: White, clean, professional sports

---

## 👨‍💻 Designed By

**Animesh Pratap Singh**  
Instagram: [@animesh_pratap_singh](https://instagram.com/animesh_pratap_singh)

---

© All Rights Reserved by Team UPWCL
