export function load({ cookies }) {
    const user = cookies.get('user');
    let registrado = false;
    
    if (user !== undefined) {
        registrado = true;
    }
    
    return { registrado }
}