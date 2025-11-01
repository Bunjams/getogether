import { GoogleLogin } from "@react-oauth/google";
import Loader from "components/Design/Loader/Loader";
import { useToast } from "hooks/useNotification";
import { useTokenDecode } from "hooks/useTokenDecode";
import { useNavigate } from "react-router-dom";
import { useGoogleAuthMutation } from "store/api/onboarding";
import { BackendError } from "types/utils/backendError";

type GoogleUser = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

const GoogleSSO = () => {
  const { getDecodedHeader } = useTokenDecode();
  const navigate = useNavigate();
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();
  const { alert } = useToast();

  const onGoogleSSO = async ({
    email,
    family_name,
    given_name,
    name,
    picture,
  }: GoogleUser) => {
    try {
      const { data } = await googleAuth({
        email,
        family_name,
        given_name,
        name,
        picture,
      }).unwrap();
      localStorage.setItem("authUser", JSON.stringify(data));
      if (!data.mobile) {
        navigate("/profile-setup", { replace: true });
        return;
      }
      if (!data.role) {
        navigate("/persona", { replace: true });
        return;
      }
      navigate("/", { replace: true });
    } catch (e) {
      alert({ message: (e as BackendError).data.error.message });
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <GoogleLogin
      theme="outline"
      locale="en"
      size="large"
      onSuccess={(credentialResponse) => {
        const user = getDecodedHeader({
          token: credentialResponse.credential,
        }) as GoogleUser;
        onGoogleSSO(user);
      }}
      onError={() => {
        console.log("Login Faied");
      }}
      useOneTap
    />
  );
};

export default GoogleSSO;
