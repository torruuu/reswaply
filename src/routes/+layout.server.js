export function load({ cookies }) {
    const user = cookies.get('user');
    let authenticated = false;
    
    if (user !== undefined) {
        authenticated = true;
    }
    
    return { authenticated }
}