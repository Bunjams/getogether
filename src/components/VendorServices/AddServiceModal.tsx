import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import Select from "components/Design/Select/Select";
import { Form, Formik, useFormikContext } from "formik";
import { addVendorServiceSchema } from "FormSchema/addVendorServiceSchema";
import { useToast } from "hooks/useNotification";
import {
  useAddServiceMutation,
  useGetServiceCategoriesQuery,
} from "store/api/vendorService";
import { BackendError } from "types/utils/backendError";
import { ModalProps } from "types/utils/modal";

type FormValues = {
  service_name: string;
  service_category: string;
};

const Categories = () => {
  const { data = [], isLoading } = useGetServiceCategoriesQuery();
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const options = data.map((name) => ({
    label: name,
    value: name,
  }));

  const handleChange = (v: string) => {
    setFieldValue("service_category", v);
  };

  return (
    <Select
      disabled={isLoading}
      loading={isLoading}
      required
      showSearch
      allowClear
      size="large"
      name="service_category"
      label="Catergory"
      placeholder="Select"
      options={options}
      onChange={handleChange}
    />
  );
};

const AddServiceModal = ({ close, isOpen }: ModalProps) => {
  const { alert, success } = useToast();
  const [addService] = useAddServiceMutation();

  const onSubmit = async ({ service_category, service_name }: FormValues) => {
    try {
      await addService({
        service_name,
        service_category,
      }).unwrap();
      success({ message: "Service added" });
      close();
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={close} modal={false}>
      <Formik
        initialValues={{
          service_name: "",
          service_category: "",
        }}
        onSubmit={onSubmit}
        validateOnChange
        validationSchema={addVendorServiceSchema}
      >
        {({ submitForm, isSubmitting, isValid, handleChange }) => (
          <Modal.Content useCustomOverlay>
            <Modal.Header>
              <Modal.Title>Add Services</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-3">
                <Input
                  required
                  name="service_name"
                  size="large"
                  label="Service"
                  placeholder="Input your service"
                  onChange={handleChange}
                />{" "}
                <Categories />
                {/* <Input
                  required
                  name="pricing_range"
                  size="large"
                  label="Pricing range"
                  placeholder="Input your pricing range"
                  onChange={handleChange}
                /> */}
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
                Add
              </Button>
            </Modal.FooterButtonGroup>
          </Modal.Content>
        )}
      </Formik>
    </Modal.Root>
  );
};

export default AddServiceModal;
