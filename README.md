# 🧠 Memory Game - Modern Edition

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

Un juego de memoria minimalista y de alto rendimiento centrado en una experiencia de usuario fluida. Construido con las últimas tecnologías de desarrollo web para demostrar el manejo de estado global, animaciones 3D y persistencia de datos.

---

## 🎮 Demo
> **Proximamente...**

---

## ✨ Características

* **🃏 Cartas con Efecto 3D:** Animaciones realistas de volteado usando `Framer Motion` y propiedades de perspectiva CSS.
* **🧩 Dificultad Adaptativa:** Elige entre niveles Fácil (8), Medio (16) o Difícil (24) cartas.
* **⏱️ Sistema de Juego Controlado:** El tiempo no empieza a correr hasta que el jugador hace clic en "Start".
* **💾 Persistencia de Récord:** Guarda automáticamente tu mejor tiempo (Best Score) en `localStorage`.
* **🎊 Celebración Final:** Efectos de confeti dinámicos al completar exitosamente todas las parejas.
* **📱 Diseño Responsive:** Optimizado para una experiencia fluida tanto en dispositivos móviles como en escritorio.

---

## 🛠️ Stack Tecnológico

* **Core:** [React 18](https://reactjs.org/) con [Vite](https://vitejs.dev/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (Arquitectura atómica y estable)
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)
* **Efectos:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📂 Organización de Carpetas

El proyecto sigue una estructura basada en **Features** para facilitar la escalabilidad:

```text
src/
├── features/game/
│   ├── components/    # Board, Card, ScoreBoard
│   ├── types/         # Interfaces de TypeScript
│   └── utils/         # Lógica de barajado (Shuffle) y generación
├── store/             # Cerebro del juego (Zustand)
├── hooks/             # useTimer, useWindowSize
└── App.tsx            # Punto de entrada y lógica de victoria

```

---

## 🚀 Instalación Local

1. **Clona el repositorio**
```bash
git clone [https://github.com/DavidCortesA/memory-game.git](https://github.com/DavidCortesA/memory-game.git)
cd memory-game

```


2. **Instala las dependencias**
```bash
npm install

```


3. **Inicia el modo desarrollo**
```bash
npm run dev

```



---

## 📈 Próximas Mejoras (Roadmap)

* [ ] 🔊 Implementar efectos de sonido (click, match, victory).
* [ ] 🎨 Selector de temas (Dark mode / Colores personalizados).
* [ ] 👥 Modo multijugador local por turnos.
* [ ] 🖼️ Opción para usar imágenes reales mediante una API (ej. Unsplash).

---

## 👤 Autor

Desarrollado por **David Cortez** - ¡Siéntete libre de contactarme para feedback o sugerencias!