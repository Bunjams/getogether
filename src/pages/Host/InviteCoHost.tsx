import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import { ErrorMessage, Form, Formik } from "formik";
import { coHostInviteValidation } from "FormSchema/coHostInvite";
import { useToast } from "hooks/useNotification";
import { useParams } from "react-router-dom";
import { useInviteCoHostMutation } from "store/api/event";
import { BackendError } from "types/utils/backendError";
import { ModalProps } from "types/utils/modal";

const InviteCoHost = ({ close, isOpen }: ModalProps) => {
  const { alert, success } = useToast();
  const [inviteCoHost] = useInviteCoHostMutation();
  const { eventId = "" } = useParams<{ eventId: string }>();

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
      close();
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={close}>
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
        }) => (
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Invite Co-host</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex gap-4 w-full flex-col">
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
              </Form>
            </Modal.Body>
            <Modal.FooterButtonGroup>
              <Button size="large" disabled={isSubmitting} onClick={close}>
                Cancel
              </Button>
              <Button
                size="large"
                type="primary"
                disabled={isSubmitting || !isValid}
                onClick={submitForm}
                loading={isSubmitting}
                typeof="submit"
              >
                Send
              </Button>
            </Modal.FooterButtonGroup>
          </Modal.Content>
        )}
      </Formik>
    </Modal.Root>
  );
};

export default InviteCoHost;
