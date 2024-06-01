import Button from "components/Design/Button/Button";
import Input from "components/Design/Input/Input";
import Modal from "components/Design/Modal/Modal";
import { Form, Formik } from "formik";
import { ModalProps } from "types/utils/modal";

const AddExpenseModal = ({ close, isOpen }: ModalProps) => {
  const onSubmit = async (values: { budget: string }) => {
    alert(JSON.stringify(values, null, 2));
    close();
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={close} modal={false}>
      <Formik
        initialValues={{
          budget: "",
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, isValid, handleChange }) => (
          <Modal.Content useCustomOverlay>
            <Modal.Header>
              <Modal.Title>Add Budget</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Form className="flex flex-col gap-3">
                <Input
                  required
                  name="budget"
                  size="large"
                  label="Budget"
                  placeholder="Input your budget"
                  onChange={handleChange}
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
                Save
              </Button>
            </Modal.FooterButtonGroup>
          </Modal.Content>
        )}
      </Formik>
    </Modal.Root>
  );
};

export default AddExpenseModal;
