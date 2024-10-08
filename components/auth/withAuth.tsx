import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {fetchRoles}  from '@/utils/api';
import {adminPermissions} from '@/utils/constants'
import { RootState } from '@/redux/rootReducer';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props:any) => {
    const router = useRouter();
    const [permissions, setPermissions] = useState([])
    const {user} = useSelector((state:any) => state.auth);

    useEffect(()=> {
      const fetchRolesApi = async () => {
        try {
          const res = await fetchRoles();

          if (!res || res?.error) {
            toast.error(res?.error)
          }

          setPermissions(res?.roles[0]?.permissions)

        } catch (error:any) {
          console.log(error);
        }
      }

      fetchRolesApi();
    },[])

    useEffect(() => {
      const hasAllAdminPermissions = Object.values(adminPermissions).every((permission:any) => user?.permissions?.includes(permission));

      if (!permissions.length && !hasAllAdminPermissions) {
        router.push('/login');
      }
    }, [permissions, router, user]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withAuth;
