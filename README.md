# Toddler Animal World 🐘🦁🐶

An interactive web application designed to teach toddlers about animals through engaging gameplay, animations, and animal sounds.

## Features

- **Animal Grid**: Browse and interact with various animals
- **Peek-a-Boo Quiz**: Fun quiz game for toddlers to learn animal names
- **Floating Bubbles**: Interactive bubble animations
- **Animal Sounds**: Each animal has its own distinctive sound
- **Three Animal Box**: 3D interactive animal display
- **Colorful UI**: Toddler-friendly interface with Tailwind CSS

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Three.js** - 3D graphics (via react-three-fiber)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rishi-kumar-verma/toddler-animal-world.git
cd toddler-animal-world
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Deploy to Vercel

Pushes to the `main` branch are deployed automatically through GitHub Actions. Add these repository secrets in GitHub under **Settings > Secrets and variables > Actions**:

- `VERCEL_TOKEN` - a Vercel access token
- `VERCEL_ORG_ID` - the organization or account ID from the linked Vercel project
- `VERCEL_PROJECT_ID` - the project ID from the linked Vercel project

The workflow builds the app with `npm run build` before deploying. Failed builds are not deployed.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── AnimalGrid.tsx
│   ├── FloatingBubbles.tsx
│   ├── Navbar.tsx
│   ├── PeekABooQuiz.tsx
│   └── ThreeAnimalBox.tsx
├── data/               # Data files
│   └── animals.ts
├── audio/              # Audio utilities
│   └── animalSounds.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
public/
└── sounds/             # Animal sound files
```

## Animals Included

The app features sounds for:
- 🐻 Bear
- 🐱 Cat
- 🐄 Cow
- 🐶 Dog
- 🐬 Dolphin
- 🦆 Duck
- 🐘 Elephant
- 🐸 Frog
- 🐴 Horse
- 🦁 Lion
- 🐵 Monkey
- 🦉 Owl
- 🐷 Pig
- 🐓 Rooster
- 🐑 Sheep

## Browser Support

Works best on modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT

## Author

Rishi Kumar Verma

## Contributing

Feel free to submit issues and pull requests!
