import Button from "components/Design/Button/Button";
import Checkbox from "components/Design/Checkbox/Checkbox";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import Select from "components/Design/Select/Select";
import { Form, Formik, useFormikContext } from "formik";
import { hostVendorInviteSchema } from "FormSchema/hostVendorInviteSchema";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "hooks/useNotification";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAvailableVendorsQuery,
  useGetServicesListQuery,
  useInviteVendorMutation,
} from "store/api/hostVendor";
import { BackendError } from "types/utils/backendError";
import { ModalProps } from "types/utils/modal";

const sectionVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

const NewVendorForm = () => {
  const { handleChange, setFieldValue } = useFormikContext();

  useEffect(() => {
    return () => {
      setFieldValue("email", "");
    };
  }, []);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      <Input
        required
        name="name"
        size="large"
        label="Name"
        placeholder="Input vendor name"
        onChange={handleChange}
      />
    </motion.span>
  );
};

const ExistingVendorForm = () => {
  const { data: availableVendors = [], isLoading } =
    useGetAvailableVendorsQuery();

  const { setFieldValue } = useFormikContext();

  const options = availableVendors.map(({ name, uuid }) => ({
    label: name,
    value: uuid.concat(",").concat(name),
  }));

  const onChange = (v: string) => {
    const [uuid, name] = v.split(",");
    setFieldValue("name", name);
    const vendor = availableVendors.find((v) => v.uuid === uuid);
    setFieldValue("email", vendor?.email);
  };
  useEffect(() => {
    return () => {
      setFieldValue("email", "");
    };
  }, []);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      <Select
        disabled={isLoading}
        loading={isLoading}
        required
        showSearch
        allowClear
        size="large"
        name="name"
        label="Name"
        placeholder="Select vendor name"
        onChange={onChange}
        options={options}
      />
    </motion.span>
  );
};

const ServiceSelect = () => {
  const { setFieldValue } = useFormikContext();
  const { data: services = [], isLoading } = useGetServicesListQuery();

  const options = services.map(({ uuid, name }) => ({
    label: name,
    value: uuid.concat(",").concat(name),
  }));

  const onChange = (v: string[]) => {
    const service = v.map((s) => {
      const [uuid] = s.split(",");
      return uuid;
    });
    setFieldValue("service", service);
  };

  return (
    <Select
      disabled={isLoading}
      loading={isLoading}
      required
      showSearch
      allowClear
      name="service"
      size="large"
      label="Service"
      placeholder="Select services"
      onChange={onChange}
      options={options}
      mode="multiple"
    />
  );
};

const InviteModal = ({ isOpen, close }: ModalProps) => {
  const { alert, success } = useToast();
  const { eventId = "" } = useParams<{ eventId: string }>();
  const [inviteVendor] = useInviteVendorMutation();

  const onSubmit = async ({
    email,
    name,
    service,
  }: {
    name: string;
    email: string;
    service: string[];
  }) => {
    try {
      await inviteVendor({
        email,
        name,
        eventId,
        serviceIds: service,
      }).unwrap();
      success({ message: "Vendor invitation sent" });
      close();
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={close} modal={false}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          service: [],
          isExisting: false,
        }}
        onSubmit={onSubmit}
        validateOnChange
        validationSchema={hostVendorInviteSchema}
      >
        {({
          submitForm,
          isSubmitting,
          isValid,
          handleChange,
          values: { isExisting, email },
        }) => (
          <Modal.Content useCustomOverlay>
            <Modal.Header>
              <Modal.Title>Invite Vendors</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-3">
                <Checkbox name="isExisting" onChange={handleChange}>
                  Select from platform's existing vendors.
                </Checkbox>
                <AnimatePresence>
                  {isExisting ? <ExistingVendorForm /> : <NewVendorForm />}
                </AnimatePresence>
                <Input
                  required
                  name="email"
                  size="large"
                  label="Email"
                  placeholder="Input vendor email"
                  onChange={handleChange}
                  value={email}
                />
                <ServiceSelect />
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

export default InviteModal;
