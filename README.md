# Filamu2.0

Live preview of the app is available at: [Filamu2.0](https://ihope.dev/)

Filamu2.0 by [ihope.dev](https://ihope.dev/) is a modern UI movie streaming system built with cutting-edge technologies to deliver a seamless and interactive user experience. This platform integrates advanced features to ensure fast loading times, reliable state management, and a sleek, user-friendly design.

---

## 🚀 Features

- **Next.js**: Leverages server-side rendering (SSR) and static site generation (SSG) for optimal performance and SEO.
- **Clerk**: Seamless user authentication and management.
- **Commit-lint**: Enforces consistent and readable Git commit messages.
- **Tailwind CSS**: Provides a modern, responsive, and customizable design.
- **TypeScript**: Ensures type safety and robust development practices.
- **TMDB API**: Fetches a vast collection of movie data, including trending, top-rated, and upcoming movies.
- **TanStack Query**: Efficient server state management with caching and synchronization.
- **Zustand**: Simple and lightweight state management for client-side data. (For future use)

---

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/ImeldaHope/filamu2.0.git
cd Filamu2.0
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and include the following:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_API_URL=your_clerk_api_url
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_sign_up_url
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```

Please replace the placeholders with your actual credentials.

---

## 🚴 Usage

### Development

To run the app in development mode:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production

Build the app for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 📚 Project Structure

```bash
Filamu2.0/
├── components/    # Reusable UI components
├── pages/         # Application pages (Next.js routing)
├── styles/        # Global and modular styles
├── utils/         # Utility functions and helpers
├── hooks/         # Custom React hooks
├── store/         # Zustand store for state management
├── public/        # Static assets
└── package.json   # Project dependencies and scripts
```

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "feat: add your feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data API.
- [Clerk](https://clerk.dev/) for authentication solutions.
- [Tailwind CSS](https://tailwindcss.com/) for elegant styling.
- [Next.js](https://nextjs.org/) for its robust framework.

---

## 📧 Contact

For inquiries or support, contact me at [Imelda Hope](imelda.hope@ihope.dev).
