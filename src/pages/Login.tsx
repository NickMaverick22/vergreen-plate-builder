import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const Login = () => {
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard')
    } catch {
      // handled in context
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-vergreen-50 to-emerald-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl neumorphic space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-vergreen-800 text-center">Log In</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="bg-vergreen-50 border-vergreen-200 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="bg-vergreen-50 border-vergreen-200 rounded-xl" />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-xl">
          {loading ? 'Signing in...' : 'Login'}
        </Button>
        <p className="text-center text-sm">No account? <Link to="/signup" className="text-vergreen-700">Sign up</Link></p>
      </form>
    </div>
  )
}

export default Login
