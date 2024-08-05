import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = process.env.VITE_REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase