│   app.js
│   server.js
│   strukture-folder+file.md
│
├───infrastrucuture
│   ├───cache
│   │       cache.service.js
│   │
│   ├───config
│   │       database.js
│   │
│   ├───database
│   │       schema.sql
│   │
│   ├───logs
│   │       .gitkeep
│   │       app-2026-02-08.log
│   │
│   ├───middleware
│   │       auth.middleware.js
│   │       rateLimiter.middleware.js
│   │       role.middleware.js
│   │       validation.middleware.js
│   │
│   ├───routes
│   │       index.js
│   │
│   └───utils
│           logger.js
│           response.js
│
└───modules
    ├───admin
    │       admin.controller.js
    │       admin.routes.js
    │
    ├───auth
    │       auth.controller.js
    │       auth.routes.js
    │       auth.service.js
    │       auth.validation.js
    │
    ├───public
    │       public.controller.js
    │       public.routes.js
    │
    └───users
            user.controller.js
            user.routes.js
            user.service.js
            user.validation.js