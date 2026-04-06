import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import authRoutes from './routes/auth'
import meRoutes from './routes/me'
import productsRoutes from './routes/products'
import recipesRoutes from './routes/recipes'
import syncRoutes from './routes/sync'
import type {AppContext} from './types'

const app = new Hono<AppContext>()

app.use('*', logger())
app.use(
  '*',
  cors({
    origin: ['http://localhost:4200', 'https://www.lasagnacost.com/'],
    allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
    credentials: true,
  }),
)

app.get('/', (c) => c.json({status: 'ok', service: 'lasagna-api'}))

app.route('/auth', authRoutes)
app.route('/me', meRoutes)
app.route('/products', productsRoutes)
app.route('/recipes', recipesRoutes)
app.route('/sync', syncRoutes)

app.notFound((c) => c.json({error: 'Not found'}, 404))
app.onError((err, c) => {
  console.error(err)
  return c.json({error: 'Internal server error'}, 500)
})

export default app