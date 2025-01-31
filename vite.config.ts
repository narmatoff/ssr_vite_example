import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
  ],
    // build: {
    //     outDir: 'dist',
    //     rollupOptions: {
    //         input: {
    //             server: 'src/entry-server.ts',
    //             client: 'src/entry-client.ts'
    //         }
    //     }
    // }
})
