import Button from "components/Design/Button/Button";
import Label from "components/Design/Label/Label";
import OTPInput from "components/Design/OTPInput/OTPInput";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import { Form, Formik } from "formik";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.jpg";
import { useVerifyOtpMutation } from "store/api/onboarding";
import { BackendError } from "types/utils/backendError";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const OTP = () => {
  useDocumentTitle("OTP Verification");
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const email = localStorage.getItem("email") || "";
  const { alert } = useToast();

  const onVerifyOtp = async ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }) => {
    try {
      const { data } = await verifyOtp({ email, otp }).unwrap();
      localStorage.removeItem("email");
      localStorage.setItem("authUser", JSON.stringify(data));

      // FIXME: check with some other key
      if (data.first_name) {
        navigate("/persona", { replace: true });
        return;
      }
      if (data.role) {
        navigate("/", { replace: true });
        return;
      }
      navigate("/profile-setup", { replace: true });
    } catch (e) {
      alert({ message: (e as BackendError).data.error.message });
    }
  };

  return (
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
            {({ isSubmitting, submitForm, values: { otp }, setFieldValue }) => {
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
                  <span className="text-body-regular">
                    Didn't receive an OTP?
                    <Button type="link">Resend</Button>
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
  );
};

export default OTP;
