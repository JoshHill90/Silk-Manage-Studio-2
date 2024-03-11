
// Check if session cookie exists and retrieve it
export const getSessionToken = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            return cookie.split('=')[1];
        }
    }
    return null;
}


// Function to check session cookie and show appropriate modal
export const cookieCheck = () => {
    
    const  tokenVal = getSessionToken();
    if (tokenVal !== null) {
        return true;

    } else {
		return false;
    }
}