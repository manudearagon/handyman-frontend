# Handyman Frontend

Web de Handyman, el marketplace que conecta a particulares y consorcios de Córdoba con gasistas, electricistas, técnicos de aire acondicionado y otros oficios.

## Stack

- Next.js 16 (App Router) con React 19 y TypeScript
- Tailwind CSS 4
- Consume la API de [handyman-backend](https://github.com/manudearagon/handyman-backend)

## Cómo correrlo

Requisitos: Node 22 y el backend corriendo en `http://localhost:8080`.

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

## Cómo funciona la sesión

Los formularios de registro e ingreso usan Server Actions: el servidor de Next.js llama al backend y guarda el JWT en una cookie `httpOnly`, así el navegador nunca ve el token. `src/proxy.ts` redirige a `/ingresar` a quien entra a `/cuenta` sin sesión.

## Ingreso con Google

El botón "Continuar con Google" aparece en `/registro` e `/ingresar` cuando está definido `NEXT_PUBLIC_GOOGLE_CLIENT_ID`. Google devuelve un ID token que una Server Action manda a `POST /api/auth/google` en el backend, que lo valida y devuelve el mismo JWT que el login con contraseña. El origen de la web (por ejemplo `http://localhost:3000`) tiene que estar en los "Orígenes de JavaScript autorizados" del cliente en Google Cloud.

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio con los rubros disponibles |
| `/registro` | Crear cuenta de cliente o profesional (`?tipo=profesional` preselecciona profesional) |
| `/ingresar` | Iniciar sesión |
| `/cuenta` | Datos del usuario y cierre de sesión |
