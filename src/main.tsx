import './styles/globals.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'

export const createRoot = ViteReactSSG({ routes })
