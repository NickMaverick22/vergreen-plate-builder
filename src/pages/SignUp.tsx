import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const SignUp = () => {
  const { signUp } = useAuth()
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
      await signUp(form.email, form.password)
      navigate('/dashboard')
    } catch {
      // handled in context toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-vergreen-50 to-emerald-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl neumorphic space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-vergreen-800 text-center">Create Account</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="bg-vergreen-50 border-vergreen-200 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="bg-vergreen-50 border-vergreen-200 rounded-xl" />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-xl">
          {loading ? 'Creating...' : 'Sign Up'}
        </Button>
        <p className="text-center text-sm">Already have an account? <Link to="/login" className="text-vergreen-700">Log in</Link></p>
      </form>
    </div>
  )
}

export default SignUp
