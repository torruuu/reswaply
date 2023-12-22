export function load({ cookies }) {
    const user = cookies.get('user');
    let registrado;
    
    if (user !== undefined && user !== '') {
        registrado = true;
    } else {
        registrado = false;
    }
    return { registrado }
}