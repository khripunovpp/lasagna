import {Hono} from 'hono'
import {createClient} from '@supabase/supabase-js'
import {requireAuth} from '../middleware/auth'
import {createUserClient, createServiceClient} from '../lib/supabase'
import type {AppContext} from '../types'

const auth = new Hono<AppContext>()

auth.post('/register', async (c) => {
  const body = await c.req.json<{ email: string; password: string; username?: string }>()

  if (!body.email || !body.password) {
    return c.json({error: 'email and password are required'}, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  const {data, error} = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {username: body.username ?? body.email.split('@')[0]},
    },
  })

  if (error) return c.json({error: error.message}, 400)

  return c.json({
    message: 'User created'
  }, 201)
})

auth.post('/login', async (c) => {
  const body = await c.req.json<{ email: string; password: string }>()

  if (!body.email || !body.password) {
    return c.json({error: 'email and password are required'}, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  const {data, error} = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) return c.json({error: error.message}, 401)

  return c.json({
    session: {
      access_token: data.session?.access_token,
      expires_at: data.session?.expires_at,
      expires_in: data.session?.expires_in,
      refresh_token: data.session?.refresh_token,
      token_type: data.session?.token_type,
    },
    user: {
      email: data.session?.user?.email,
      id: data.session?.user?.id,
      username: data.session?.user?.user_metadata?.username,
    }
  })
})

auth.post('/refresh', async (c) => {
  const body = await c.req.json<{ refresh_token: string }>()

  if (!body.refresh_token) {
    return c.json({error: 'refresh_token is required'}, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  const {data, error} = await supabase.auth.refreshSession({
    refresh_token: body.refresh_token,
  })

  if (error) return c.json({error: error.message}, 401)

  return c.json({user: data.user, session: data.session})
})

auth.post('/logout', requireAuth, async (c) => {
  const token = c.get('token')
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    global: {headers: {Authorization: `Bearer ${token}`}},
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  const {error} = await supabase.auth.signOut()
  if (error) return c.json({error: error.message}, 400)

  return c.json({message: 'Logged out successfully'})
})


auth.post('/forgot-password', async (c) => {
  const body = await c.req.json<{ email: string }>()

  if (!body.email) {
    return c.json({error: 'email is required'}, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  // Не возвращаем ошибку если email не найден — защита от email enumeration
  const {error} = await supabase.auth.resetPasswordForEmail(body.email, {
    redirectTo: `${c.env.APP_URL}/settings?tab=account`,
  });

  if (error) {
    console.error('[forgot-password] error sending reset email:', error)
  }

  // Логируем ссылку для локальной разработки
  const admin = createServiceClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY)
  const {data: linkData} = await admin.auth.admin.generateLink({
    type: 'recovery',
    email: body.email,
    options: {redirectTo: `${c.env.APP_URL}/settings?tab=account`},
  });

  if (linkData?.properties?.action_link) {
    console.log('[forgot-password] reset link:', linkData.properties.action_link)
  }

  return c.json({ok: true})
})

auth.post('/reset-password', async (c) => {
  const body = await c.req.json<{ accessToken: string; refreshToken?: string; password: string; passwordConfirmation: string }>()

  if (!body.accessToken || !body.password) {
    return c.json({error: 'accessToken and password are required'}, 400)
  }

  if (body.password !== body.passwordConfirmation) {
    return c.json({error: 'Passwords do not match'}, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })

  // Устанавливаем сессию через оба токена из implicit flow
  const {error: sessionError} = await supabase.auth.setSession({
    access_token: body.accessToken,
    refresh_token: body.refreshToken ?? '',
  })

  if (sessionError) return c.json({error: sessionError.message}, 400)

  const {error: updateError} = await supabase.auth.updateUser({
    password: body.password,
  })

  if (updateError) return c.json({error: updateError.message}, 400)

  return c.json({ok: true})
})

export default auth