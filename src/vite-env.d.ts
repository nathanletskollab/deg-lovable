/// <reference types="vite/client" />

// vite-imagetools: ?format=webp&as=url returns a plain URL string
declare module '*?format=webp&as=url' {
  const src: string
  export default src
}
