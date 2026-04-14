// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
//     .split(',')
//     .map(origin => origin.trim())
//     .filter(Boolean);

//   app.enableCors({
//     origin: [
//       'https://radiosekai.vercel.app/'
//       'https://radiosekai-pgcz51ykj-mahoutsukai22s-projects.vercel.app',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   const port = process.env.PORT || 3000;

//   await app.listen(port);

//   console.log(`🚀 Server running on port ${port}`);
//   console.log(`🌐 Allowed CORS:`, corsOrigins);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read allowed origins from environment
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      // Allow exact matches
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel preview deployments
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      // Block everything else
      return callback(new Error(`Not allowed by CORS: ${origin}`), false);
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 Allowed CORS origins:`, corsOrigins);
}

bootstrap();
