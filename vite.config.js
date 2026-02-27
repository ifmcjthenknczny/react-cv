import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

function cvDataPlugin() {
  let root = process.cwd();
  let outDir = 'build';
  return {
    name: 'cv-data',
    configResolved(config) {
      root = config.root;
      outDir = config.build?.outDir ?? 'build';
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/data.json' || req.url === '/data.example.json') {
          const file = req.url === '/data.json'
            ? (fs.existsSync(path.join(root, 'data.json')) ? 'data.json' : 'data.example.json')
            : 'data.example.json';
          const filePath = path.join(root, file);
          try {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (e) {
            next(e);
          }
        } else {
          next();
        }
      });
    },
    closeBundle() {
      const out = path.join(root, outDir);
      const dataPath = path.join(root, 'data.json');
      const examplePath = path.join(root, 'data.example.json');
      const destData = path.join(out, 'data.json');
      const destExample = path.join(out, 'data.example.json');
      if (!fs.existsSync(examplePath)) return;
      fs.copyFileSync(examplePath, destExample);
      fs.copyFileSync(fs.existsSync(dataPath) ? dataPath : examplePath, destData);
    }
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    resolve: {
      alias: {
        '@helpers': path.resolve(process.cwd(), 'src/helpers'),
      },
    },
    build: {
      outDir: 'build',
      target: 'esnext'
    },
    plugins: [react(), eslint(), dynamicImport(), cvDataPlugin()],
    esbuild: {
        target: 'esnext'
    },
  };
});