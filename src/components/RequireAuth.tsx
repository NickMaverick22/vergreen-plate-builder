import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" replace />
}

export default RequireAuth
