import classNames from "classnames";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Label from "components/Design/Label/Label";
import OnboardingLayout from "components/Onboarding/OnboardingLayout";
import { Form, Formik, useFormikContext } from "formik";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { LoaderCircle } from "lucide-react";
import { Suspense, lazy, memo } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileSetup from "static/Image/UserProfileSetup.jpg";
import { useUpdateRoleMutation } from "store/api/userProfile";
import { BackendError } from "types/utils/backendError";

const OnbordingSideImage = lazy(
  () => import("components/Onboarding/OnbordingSideImage")
);

const MemoImg = memo(OnbordingSideImage);

type FieldType = {
  persona: "HOST" | "VENDOR" | "GUEST";
};

const PersonaCard = ({ personaType }: { personaType: "HOST" | "VENDOR" }) => {
  const { values, setFieldValue } = useFormikContext<FieldType>();
  const { persona } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldValue("persona", name);
  };

  return (
    <label
      className={classNames(
        "border-solid bg-whitebase rounded-lg px-8 py-5 cursor-pointer border-2",
        {
          "border-neutral-100": personaType !== persona,
          "border-red-200": personaType === persona,
        }
      )}
      htmlFor={personaType}
    >
      <h4 className="text-h4 text-neutral-900">Organize an event</h4>
      <p className="text-body-regular text-neutral-500">
        Host events, invite guests and keep everything on track
      </p>
      <Input
        type="radio"
        className="hidden"
        name={personaType}
        id={personaType}
        onChange={handleChange}
        checked={personaType === persona}
      />
    </label>
  );
};

const Persona = () => {
  useDocumentTitle("Persona");
  const navigate = useNavigate();
  const [updateRole] = useUpdateRoleMutation();
  const { alert } = useToast();

  const onRoleUpdate = async ({ persona }: FieldType) => {
    try {
      const user = await updateRole({ role: persona }).unwrap();
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/", { replace: true });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <OnboardingLayout>
      <OnboardingLayout.Header />
      <OnboardingLayout.Content>
        <div className="md:mx-44 md:w-96 w-4/5 flex gap-4 flex-col">
          <span>
            <h2 className="text-h2 m-0">How will you use Getogether?</h2>
            <Label>
              We'll streamline your onboarding experience accordingly.
            </Label>
          </span>
          <Formik initialValues={{ persona: "HOST" }} onSubmit={onRoleUpdate}>
            {({ isSubmitting, submitForm }) => {
              return (
                <Form className="all:unset flex gap-4 flex-col">
                  <PersonaCard personaType="HOST" />
                  <PersonaCard personaType="VENDOR" />

                  <Button
                    size="large"
                    type="primary"
                    onClick={submitForm}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Continue
                  </Button>
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
            img={UserProfileSetup}
            fallbackimg="LFS|B1ngp{tPuOU_ajobipiwjXjX"
          />
        </Suspense>
      </OnboardingLayout.Content>
    </OnboardingLayout>
  );
};

export default Persona;
