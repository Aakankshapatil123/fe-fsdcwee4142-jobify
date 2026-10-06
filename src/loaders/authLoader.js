// import { redirect } from 'react-router';
// import { clearUser, setUser } from '../redux/authSlice';
// import store from '../redux/store';
// import { getMe } from '../services/authServices';

// const authLoader = async () => {
//     try {
//         const response = await getMe();
//         store.dispatch(setUser(response.user));
//         return response;
//     } catch (error) {
//         console.error('Auth loader error:', error);
//         store.dispatch(clearUser());
//         return redirect('/login');
//     }
// }

// export default authLoader;



import { clearUser, setUser } from '../redux/authSlice';
import store from '../redux/store';
import { getMe } from '../services/authServices';

const authLoader = async () => {
    try {
        const response = await getMe();
        
        
        if (response && response.user) {
            store.dispatch(setUser(response.user));
        } else if (response && response.data?.user) {
            store.dispatch(setUser(response.data.user));
        }
        
        return response;
    } catch (error) {
        console.log('Guest session active (User not logged in)');
        
        store.dispatch(clearUser());
        return { user: null }; 
    }
}

export default authLoader;
