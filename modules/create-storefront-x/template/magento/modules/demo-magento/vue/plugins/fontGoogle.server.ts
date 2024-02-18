import type { App } from 'vue'

export const after = async (app: App, ctx?: any) => {
  ctx.out.fontGoogle = (html: string) =>
    html.replace(
      '<meta http-equiv="X-UA-Compatible" content="ie=edge" />',
      `<meta http-equiv="X-UA-Compatible" content="ie=edge" />\n
      <link rel="preconnect" href="https://fonts.googleapis.com">\n
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap&subset=latin-ext" rel="stylesheet">`,
    )
}
