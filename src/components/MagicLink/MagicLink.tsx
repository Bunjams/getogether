import { PageLoader } from "components/Design/Loader/Loader";
import { useToast } from "hooks/useNotification";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "store/api/onboarding";
import { BackendError } from "types/utils/backendError";

const MagicLink = () => {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const { alert } = useToast();
  const [verifyOtp] = useVerifyOtpMutation();

  const onVerifyOtp = async ({ hash }: { hash: string }) => {
    try {
      const { data } = await verifyOtp({ magicLinkHash: hash }).unwrap();
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
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (hash) {
      onVerifyOtp({ hash: hash.replace("#", "") });
    }
  }, [hash]);

  return <PageLoader />;
};

export default MagicLink;
