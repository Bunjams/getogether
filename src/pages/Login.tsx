import { Divider } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import GoogleSSO from "components/GoogleSSO/GoogleSSO";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import { ErrorMessage, Form, Formik } from "formik";
import { loginEmailValidation } from "FormSchema/emailValidation";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInSignUpSide from "static/Image/SignInSignUpSide.jpg";
import { useSignInMutation } from "store/api/onboarding";
import { BackendError } from "types/utils/backendError";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

const Login = () => {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const { alert } = useToast();
  localStorage.removeItem("authUser");
  const location = useLocation();
  const { email } = location.state || {};

  const onSingIn = async ({ email }: { email: string }) => {
    try {
      await signIn({ email }).unwrap();
      navigate("/otp", { replace: true, state: { email } });
    } catch (e) {
      alert({ message: (e as BackendError).data.error.message });
      if ((e as BackendError).data.error.code === "user_not_found") {
        navigate("/signup", { replace: true, state: { email } });
      }
    }
  };

  return (
    <AnimatedPage>
      <OnboardingLayout>
        <OnboardingLayout.Header />
        <OnboardingLayout.Content>
          <div className="md:mx-44 md:w-96 w-4/5">
            <h2 className="text-h2 pb-3">Sign In to Your Account</h2>
            <Formik
              initialValues={{ email: email || "" }}
              onSubmit={onSingIn}
              validationSchema={loginEmailValidation}
              validateOnChange
            >
              {({
                isSubmitting,
                submitForm,
                handleChange,
                isValid,
                values: { email },
              }) => {
                return (
                  <Form className="flex gap-4 flex-col">
                    <Input
                      label="Email address"
                      required
                      placeholder="johndoe@email.com"
                      size="large"
                      name="email"
                      onChange={handleChange}
                      value={email}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-footnote"
                    />
                    <Button
                      size="large"
                      type="primary"
                      onClick={submitForm}
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                    >
                      Continue
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Divider className="my-6">or</Divider>
            <div className="w-full justify-center items-center flex flex-col gap-4">
              <GoogleSSO />
              <span className="text-body-regular">
                Don't have an account yet?
                <Button type="link" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </span>
            </div>
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

export default Login;
