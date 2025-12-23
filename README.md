# 🧠 Memory Game - Ultra Edition

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

Una experiencia de juego de memoria premium, diseñada con un enfoque en la interactividad, el diseño visual moderno y el rendimiento técnico.

---

## 🌟 Características Principales

### 🎮 Modos de Juego
* **🌐 Modo Online:** Conexión en tiempo real con la API de **Unsplash** para generar cartas con fotografías profesionales de alta calidad.
* **📴 Modo Offline:** Uso de iconos vectoriales dinámicos (**Lucide-React**) para una experiencia rápida y sin consumo de datos.

### 🌗 Experiencia Visual
* **🌓 Dark Mode Nativo:** Transiciones de color fluidas (Fade) gestionadas con Framer Motion y Zustand.
* **🃏 Animaciones 3D:** Cartas con física de resorte (`spring`) y efecto de profundidad real.
* **✨ Efectos Especiales:** Sistema de partículas (Confeti) al alcanzar la victoria.

### 📊 Gestión de Récords
* **🏆 Leaderboard TOP 10:** Ranking dinámico que registra día, hora, movimientos y tiempo.
* **🥇 Sistema de Podio:** Reconocimiento visual con trofeos (Oro, Plata, Bronce) para los mejores tiempos.
* **💾 Persistencia:** Todos tus récords y preferencias de tema se guardan automáticamente en `localStorage`.

### 🔊 Audio Inmersivo
* **🎵 Feedback Sonoro:** Efectos de sonido específicos para clics, aciertos (match), errores, reinicio y victoria.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 18 + Vite.
* **Estado Global:** Zustand (Gestión atómica de la lógica del juego).
* **Estilos:** Tailwind CSS (Arquitectura utilitaria y responsive).
* **Animaciones:** Framer Motion (Transiciones de estado y 3D transforms).
* **API:** Unsplash API (Para imágenes dinámicas).

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/sounds/     # Biblioteca de efectos de audio
├── features/game/     # Componentes (Board, Card, ScoreBoard, Leaderboard)
├── store/             # Zustand Store (Cerebro del juego)
├── hooks/             # Custom hooks (useTimer, etc.)
├── utils/             # Generador de cartas, barajado y utilidades de audio
└── types/             # Definiciones de TypeScript para el dominio del juego

```

---

## 🚀 Instalación

1. **Clonar:** `git clone https://github.com/DavidCortesA/memory-game.git`
2. **Dependencias:** `npm install`
3. **Variables de Entorno:** Crea un `.env` con tu `VITE_UNSPLASH_ACCESS_KEY`.
4. **Ejecutar:** `npm run dev`

---

## 📝 Nota Final

Este proyecto ha sido desarrollado como una pieza de portafolio que demuestra el manejo avanzado de estado, integración de APIs externas, persistencia de datos y pulido de UI/UX.

**¡Gracias por jugar y feedback bienvenido!** 🚀
