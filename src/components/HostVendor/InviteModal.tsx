import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import Select from "components/Design/Select/Select";
import { Form, Formik } from "formik";
import { useGetServicesListQuery } from "store/api/vender";
import { ModalProps } from "types/utils/modal";

const InviteModal = ({ isOpen, close }: ModalProps) => {
  const { data: services = [], isLoading } = useGetServicesListQuery();

  const onSubmit = async (values: {
    name: string;
    email: string;
    service: string[];
  }) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    close();
  };

  const options = services.map(({ uuid, name }) => ({
    label: name,
    value: uuid.concat(",").concat(name),
  }));

  return (
    <Modal.Root open={isOpen} onOpenChange={close} modal={false}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          service: [],
        }}
        onSubmit={onSubmit}
      >
        {({
          submitForm,
          isSubmitting,
          isValid,
          handleChange,
          setFieldValue,
        }) => (
          <Modal.Content useCustomOverlay>
            <Modal.Header>
              <Modal.Title>Invite Vendors</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-3">
                <Input
                  required
                  name="name"
                  size="large"
                  label="Name"
                  placeholder="Input vendor name"
                  onChange={handleChange}
                />
                <Input
                  required
                  name="email"
                  size="large"
                  label="Email"
                  placeholder="Input vendor email"
                  onChange={handleChange}
                />
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
                  onChange={(v) => {
                    setFieldValue("service", [...v]);
                  }}
                  options={options}
                  mode="multiple"
                />
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
