import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const githubPagesBase = '/wpsaidemo/'
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isGithubPagesBuild ? githubPagesBase : '/',
  plugins: [react(), tailwindcss()],
})
