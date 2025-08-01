export async function loadFonts() {
    const WebFont = await import('webfontloader')
    WebFont.load({
        google: {
            families: ['Roboto:100,300,400,500,700,900'],
        },
    })
}