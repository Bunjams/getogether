import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import InviteModal from "components/HostVendor/InviteModal";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useModal } from "hooks/useModal";
import { useParams } from "react-router-dom";
import VendorListEmpty from "static/Image/VendorListEmpty.png";

const VendorList = () => {
  useDocumentTitle("Vendors");
  const { eventId = "" } = useParams<{ eventId: string }>();

  const { close, isOpen, open } = useModal();

  const { isEmpty, isLoading, isSuccess } = {
    isEmpty: true,
    isLoading: false,
    isSuccess: true,
  };

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <section className="flex w-full flex-col gap-2 h-full justify-center items-center">
            <img
              src={VendorListEmpty}
              className="rounded-3xl overflow-hidden w-72 h-56"
              loading="lazy"
            />
            <h4 className="text-h4 font-semibold text-neutral-900">
              Add Vendors
            </h4>
            <p className="text-body-regular text-neutral-900">
              Track vendors and their services
            </p>
            <Button type="primary" size="middle" onClick={open}>
              Invite
            </Button>
          </section>
        </Async.Empty>
        <Async.Success>
          <PageLayout
            header={
              <Header
                right={
                  <Button type="primary" size="middle">
                    Invite
                  </Button>
                }
                title="Guest List"
              />
            }
          >
            <></>
          </PageLayout>
        </Async.Success>
      </Async.Root>
      <InviteModal isOpen={isOpen} close={close} />
    </AnimatedPage>
  );
};

export default VendorList;
