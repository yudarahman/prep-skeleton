import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getTokenAD } from '@/services/azure';
import { Loading } from '@/components/Loading';

/**
 * - this page assume that the user has been authenticated by azure and not authenticated by backend
 * - if first time login, there will be a code that azure sent in the url params
 * - if already login, the code wont be seen in the url params and it might exist in localstorage or cache
 *
 * In this page:
 * 1. wait msalInstance to return the token from azure
 * 2. if the token azure has been acquired, get token from backend
 * 3. store token and profile picture azure from backend
 * 4. redirect to '/'
 **/

const LoadingComponent = () => {
  return (    
    <div className="flex flex-col gap-4 h-screen items-center justify-center bg-white">
      <Loading />
    </div>
  );
};

const ErrorComponent = () => (
  <div className="mt-52 flex flex-col items-center font-semibold">
    <h1>Azure Authentication Failed</h1>
    <Link to="/" replace>
      Go to Home
    </Link>
  </div>
);

const AuthenticatedAzure = () => {
  // const navigate = useNavigate();
  // TODO: integrate with backend to fetch token
  //
  // const dispatch = useAppDispatch();
  // const [fetchTokenAzure] = useFetchTokenMutation();
  // const [downloadProfilePicture] = useLazyDownloadProfilePictureQuery();
  // const { tokenAzure, token } = useAppSelector((state) => state.auth);
  const { accounts } = useMsal();

  // 1. wait msalInstance to return the token from azure
  useEffect(() => {
    const setTokenAD = async () => {
      // const token = accounts[0].idToken; // v2
      const token = await getTokenAD(); // v1
      if (token) {
        // dispatch(setTokenAzure(token));
      }
    };
    setTokenAD();
  }, [accounts]);

  // 2. if the token azure has been acquired, get token from backend
  // useEffect(() => {
  //   const init = async () => {
  //     if (!token) {
  //       if (tokenAzure) {
  //         fetchTokenAzure()
  //           .unwrap()
  //           .then((res) => {
  //             //3. store token backend
  //             dispatch(setUserLogin(res));
  //           })
  //           .catch(() => {
  //             navigate('/auth');
  //           });
  //       }
  //     } else {
  //       // 4. redirect to '/'
  //       navigate('/');
  //     }
  //   };
  //   init();
  // }, [
  //   tokenAzure,
  //   token,
  //   navigate,
  //   fetchTokenAzure,
  //   downloadProfilePicture,
  //   dispatch
  // ]);
  return <LoadingComponent />;
};

const AzureLoginRedirect = () => {
  // 1. wait msalInstance to return the token from azure
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      loadingComponent={LoadingComponent}
      errorComponent={ErrorComponent}
    >
      <AuthenticatedAzure />
    </MsalAuthenticationTemplate>
  );
};

export default AzureLoginRedirect;