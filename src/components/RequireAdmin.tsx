import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const RequireAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return user.role === 'admin' ? children : <Navigate to="/dashboard" replace />
}

export default RequireAdmin
