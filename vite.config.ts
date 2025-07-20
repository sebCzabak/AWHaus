import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '/AWHaus/', 
  }
})