import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import { ErrorMessage, Form, Formik } from "formik";
import { coHostInviteValidation } from "FormSchema/coHostInvite";
import { motion } from "framer-motion";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateEventImg from "static/Image/CreateEventStep3.png";
import { useInviteCoHostMutation } from "store/api/hostEvent";
import { BackendError } from "types/utils/backendError";

const EventConsole = () => {
  const { alert, success } = useToast();
  const navigate = useNavigate();
  const [inviteCoHost] = useInviteCoHostMutation();
  const location = useLocation();
  const { eventId } = location.state || {};

  const eventLink = `/host/${eventId}/home`;

  const onCreateEvent = async ({
    eventId,
    email,
    name,
  }: {
    name: string;
    email: string;
    eventId: string;
  }) => {
    try {
      await inviteCoHost({
        email,
        name,
        eventId,
      }).unwrap();
      success({ message: "Co-host invited" });
      navigate(eventLink, { state: { eventId: null } });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <section className="h-max self-start grid grid-flow-row w-full md:pb-3 md:py-10 md:pl-20 md:pr-32 p-10 gap-12 md:col-span-2 col-span-3">
      <div className="flex justify-between items-center">
        <button
          className="all:unset flex text-h4 gap-2.5 items-center cursor-pointer h-max"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Go Back
        </button>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          eventId,
        }}
        onSubmit={onCreateEvent}
        validationSchema={coHostInviteValidation}
        validateOnChange
      >
        {({
          isSubmitting,
          submitForm,
          handleChange,
          errors: { email, name },
          isValid,
        }) => {
          return (
            <Form className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-neutral-900">
                  Invite Co-hosts.
                  <span className="text-h5-regular text-neutral-400">
                    {" "}
                    (Optional)
                  </span>
                </h3>
                <p className="text-body-regular text-neutral-800">
                  Invite others to co-host this event with you.
                </p>
              </div>
              <div className="flex w-full flex-col">
                <div className="flex gap-4 w-full flex-col">
                  <div>
                    <Input
                      name="name"
                      onChange={handleChange}
                      status={name ? "error" : undefined}
                      placeholder="Enter co-host name"
                      label="Name"
                      required
                      size="large"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-footnote"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      onChange={handleChange}
                      status={email ? "error" : undefined}
                      placeholder="Enter co-host email"
                      label="Email Address"
                      required
                      size="large"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-footnote"
                    />
                  </div>
                </div>
              </div>
              <div className="self-end flex gap-2">
                <Button
                  size="large"
                  type="text"
                  disabled={isSubmitting}
                  onClick={() =>
                    navigate(eventLink, { state: { eventId: null } })
                  }
                  typeof="submit"
                >
                  Skip for now
                </Button>
                <Button
                  size="large"
                  type="primary"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                  loading={isSubmitting}
                  typeof="submit"
                >
                  Invite
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

const InviteCoHosts = () => {
  useDocumentTitle("Invite Co-hosts");
  const sectionVariants = {
    hidden: { opacity: 0, x: -400 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
      className="grid grid-flow-col w-full justify-between h-screen grid-cols-3 overflow-auto relative"
    >
      <EventConsole />
      <motion.aside className="bg-red-200 h-screen items-center px-9 md:flex hidden md:col-span-1 sticky top-0">
        <img
          src={CreateEventImg}
          alt="placeholder"
          className="h-auto w-[450px]"
        />
      </motion.aside>
    </AnimatedPage>
  );
};

export default InviteCoHosts;
