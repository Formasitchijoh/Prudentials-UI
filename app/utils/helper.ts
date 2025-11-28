export const morphType = (className:string, domain:string) =>{
    const name = className.slice(0,1).toUpperCase() + className.slice(1)    
    return `App\\Domains\\${domain}\\Models\\${name}`
}