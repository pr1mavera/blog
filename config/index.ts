const development = {
    baseUrl: '/api/v1',
    port: '3000'
}

const production = {
    baseUrl: '/api/v1',
    port: '80'
}

export const server = process.env.NODE_ENV == 'production' ? production : development;