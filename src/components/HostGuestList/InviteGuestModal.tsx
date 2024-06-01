import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import Select from "components/Design/Select/Select";
import { Form, Formik, useFormikContext } from "formik";
import { hostGuestInviteSchema } from "FormSchema/hostGuestInviteSchema";
import { motion } from "framer-motion";
import { useToast } from "hooks/useNotification";
import { Plus, Trash2 } from "lucide-react";
import randomBytes from "randombytes";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "store/api/hostEvent";
import { useInviteGuestMutation } from "store/api/hostguest";
import { BackendError } from "types/utils/backendError";
import { ModalProps } from "types/utils/modal";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type Invite = {
  noSubevents: boolean;
  rsvp_invites: {
    name: string;
    email: string;
    sub_event_ids: string[];
    message: string;
    id: string;
  }[];
};

const GuestCard = ({ title, index }: { title: string; index: number }) => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data, isLoading } = useGetEventByIdQuery(
    { eventId },
    { skip: !eventId }
  );

  const { values, setFieldValue, handleChange } = useFormikContext<Invite>();
  const { rsvp_invites } = values;

  const onRemove = () => {
    if (rsvp_invites.length === 1) {
      return;
    }
    setFieldValue(
      "rsvp_invites",
      rsvp_invites.filter((_, i) => i !== index)
    );
  };

  const { subevents = [], multi_event: noSubevents } = data || {};

  const options = subevents?.map(({ name, uuid }) => ({
    label: name,
    value: uuid.concat(",").concat(name),
  }));

  const onChange = (v: string[]) => {
    const service = v.map((s) => {
      const [uuid] = s.split(",");
      return uuid;
    });
    setFieldValue("rsvp_invites.${index}.sub_event_ids", service);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      transition={{ duration: 0.3 }}
      className="rounded p-4 border-neutral-100 border border-solid flex flex-col gap-2.5"
    >
      <h5 className="text-h5-medium text-neutral-900 flex justify-between">
        {title}

        {rsvp_invites.length > 1 && (
          <button
            className="all:unset cursor-pointer text-red-600"
            onClick={onRemove}
          >
            <Trash2 size={20} color="currentColor" />
          </button>
        )}
      </h5>
      <Input
        required
        name={`rsvp_invites.${index}.name`}
        size="large"
        label="Name"
        placeholder="Input guest name"
        onChange={handleChange}
      />
      <Input
        required
        name={`rsvp_invites.${index}.email`}
        size="large"
        type="email"
        label="Email"
        placeholder="Input guest email"
        onChange={handleChange}
      />
      {!noSubevents && (
        <Select
          required
          name={`rsvp_invites.${index}.sub_event_ids`}
          size="large"
          label="Event"
          placeholder="Select event"
          disabled={isLoading}
          loading={isLoading}
          showSearch
          allowClear
          onChange={onChange}
          options={options}
          mode="multiple"
        />
      )}
    </motion.div>
  );
};

const InviteForm = () => {
  const { values, setFieldValue } = useFormikContext<Invite>();
  const { rsvp_invites } = values;

  const onAddMore = () => {
    setFieldValue("rsvp_invites", [
      ...rsvp_invites,
      {
        eventName: "",
        venue: "",
        startDate: "",
        endDate: "",
        message: "",
        id: randomBytes(10).toString("hex"),
      },
    ]);
  };

  return (
    <>
      {rsvp_invites.map(({ id }, i) => {
        return <GuestCard key={id} title={`Guest ${i + 1}`} index={i} />;
      })}
      <div className="mr-auto">
        <Button onClick={onAddMore} className="flex items-center gap-1">
          <Plus size={14} color="currentColor" /> Add guest
        </Button>
      </div>
    </>
  );
};

const InviteGuest = ({ isOpen, close }: ModalProps) => {
  const { alert, success } = useToast();
  const { eventId = "" } = useParams<{ eventId: string }>();
  const [inviteGuest] = useInviteGuestMutation();

  const { data } = useGetEventByIdQuery({ eventId }, { skip: !eventId });
  const { multi_event: noSubevents } = data || {};

  const onSubmit = async ({ rsvp_invites }: Pick<Invite, "rsvp_invites">) => {
    try {
      const { rsvp_sent_failed_list } = await inviteGuest({
        eventId,
        rsvp_invites,
      }).unwrap();
      success({ message: "Guest invitation sent" });
      close();
      rsvp_sent_failed_list.forEach(({ email, error }) => {
        alert({ message: `${email}: ${error}` });
      });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={close} modal={false}>
      <Formik
        initialValues={{
          noSubevents,
          rsvp_invites: [
            {
              name: "",
              email: "",
              sub_event_ids: [],
              message: "",
              id: randomBytes(10).toString("hex"),
            },
          ],
        }}
        onSubmit={onSubmit}
        validateOnChange
        validationSchema={hostGuestInviteSchema}
      >
        {({ submitForm, isSubmitting, isValid, values: { rsvp_invites } }) => (
          <Modal.Content useCustomOverlay>
            <Modal.Header>
              <Modal.Title>Invite Guest</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-3">
                <InviteForm />
              </Form>
            </Modal.Body>
            <Modal.FooterButtonGroup>
              <Button onClick={close} size="middle" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                onClick={submitForm}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                size="middle"
                type="primary"
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

export default InviteGuest;
