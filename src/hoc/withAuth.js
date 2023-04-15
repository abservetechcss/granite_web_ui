import { useAuth } from '../contexts/auth';
export const withAuth = (Component) => {
  const Wrapper = (props) => {
    const {user} = useAuth();
    
    return (
      <Component
        user={user}
        {...props}
        />
    );
  };
  
  return Wrapper;
};