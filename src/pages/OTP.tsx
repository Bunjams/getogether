import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import Label from "components/Design/Label/Label";
import OTPInput from "components/Design/OTPInput/OTPInput";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import { Form, Formik } from "formik";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocation, useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.jpg";
import {
  useResendOTPMutation,
  useVerifyOtpMutation,
} from "store/api/onboarding";
import { BackendError } from "types/utils/backendError";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const Timer = ({ setShowTimer }: { setShowTimer: () => void }) => {
  function updateShowTimer() {
    setShowTimer();
    return {
      shouldRepeat: false,
      delay: 1,
    };
  }
  return (
    <span className="t-mr-1">
      <CountdownCircleTimer
        isPlaying
        duration={20}
        colors={["#871B0C", "#F7B801", "#BA6527", "#0C874C"]}
        colorsTime={[7, 5, 2, 0]}
        strokeWidth={2}
        size={25}
        onComplete={updateShowTimer}
      >
        {({ remainingTime }) => (
          <span className="text-footnote">{remainingTime}</span>
        )}
      </CountdownCircleTimer>
    </span>
  );
};

const OTP = () => {
  useDocumentTitle("OTP Verification");
  const navigate = useNavigate();
  const { alert, success } = useToast();
  const [showTimer, setShowTimer] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOTP] = useResendOTPMutation();
  const location = useLocation();
  const { email } = location.state || {};

  const onVerifyOtp = async ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }) => {
    try {
      const { data } = await verifyOtp({ email, otp }).unwrap();
      localStorage.setItem("authUser", JSON.stringify(data));

      if (!data.mobile) {
        navigate("/profile-setup", { replace: true, state: { email: null } });
        return;
      }
      if (!data.role) {
        navigate("/persona", { replace: true, state: { email: null } });
        return;
      }
      navigate("/", { replace: true, state: { email: null } });
    } catch (e) {
      alert({ message: (e as BackendError).data.error.message });
    }
  };

  const onResendOtp = async () => {
    setShowTimer(true);
    try {
      await resendOTP({ email });
      success({ message: "OTP sent successfully" });
    } catch (e) {
      alert({ message: (e as BackendError).data.error.message });
    }
  };

  return (
    <AnimatedPage>
      <OnboardingLayout>
        <OnboardingLayout.Header />
        <OnboardingLayout.Content>
          <div className="md:mx-44 md:w-96 w-4/5">
            <h2 className="text-h2 pb-3">Verification Required</h2>
            <Formik
              initialValues={{ email: email, otp: "" }}
              onSubmit={onVerifyOtp}
              validateOnChange
              validateOnBlur
            >
              {({
                isSubmitting,
                submitForm,
                values: { otp },
                setFieldValue,
              }) => {
                return (
                  <Form className="flex gap-4 flex-col">
                    <span className="flex flex-col gap-1">
                      <Label>Enter OTP</Label>
                      <OTPInput
                        formatter={(str) => str.replace(/[^0-9]/g, "")}
                        onChange={(o) => setFieldValue("otp", o)}
                        length={6}
                        inputMode="numeric"
                        name="otp"
                        autoFocus
                      />
                    </span>
                    <Button
                      size="large"
                      type="primary"
                      onClick={submitForm}
                      loading={isSubmitting}
                      disabled={isSubmitting || otp.length < 6}
                    >
                      Continue
                    </Button>
                    <span className="text-body-regular flex gap-1 items-center">
                      Didn't receive an OTP?
                      {showTimer ? (
                        <Timer setShowTimer={() => setShowTimer(false)} />
                      ) : (
                        <Button type="link" onClick={onResendOtp} size="small">
                          Resend
                        </Button>
                      )}
                    </span>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <Suspense
            fallback={
              <LoaderCircle
                strokeWidth={2}
                className="animate-spin text-red-700"
              />
            }
          >
            <MemoImg
              img={SignInSignUpSide}
              fallbackimg="LZSy%9tko#jGo}cEaLjuuPV[i^j?"
            />
          </Suspense>
        </OnboardingLayout.Content>
      </OnboardingLayout>
    </AnimatedPage>
  );
};

export default OTP;
