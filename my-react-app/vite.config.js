import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/linha_do_tempo_clube_de_livro/' : '/'
}))