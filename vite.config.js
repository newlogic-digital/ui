import { defineConfig } from 'vite'
import core from '@newlogic-digital/core'

export default defineConfig({
    plugins: [
        core({
            juice: {
                postcss: {
                    globalData: {
                        files: ['./src/emails/styles/main/Base/config.css']
                    }
                }
            }
        })
    ],
    build: {
        target: ['edge111', 'firefox111', 'chrome111', 'safari16'],
        rollupOptions: {
            output: {
                manualChunks: {
                    swup: ['swup'],
                    stimulus: ['@hotwired/stimulus']
                }
            }
        }
    }
})
