import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allowed origins from env + fallback
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  const allowedOrigins = [
    ...corsOrigins,
    'https://radiosekai.vercel.app', // your actual frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // Localhost
      if (
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1')
      ) {
        return callback(null, true);
      }

      // Production domain
      if (origin === 'https://radiosekai.vercel.app') {
        return callback(null, true);
      }

      // Vercel previews (ONLY your project)
      if (origin.endsWith('-mahoutsukai22s-projects.vercel.app')) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`), false);
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 Allowed CORS origins:`, allowedOrigins);
}

bootstrap();
