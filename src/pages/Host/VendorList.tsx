import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import InviteModal from "components/HostVendor/InviteModal";
import VendorTable from "components/HostVendor/VendorTable";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useModal } from "hooks/useModal";
import { useParams } from "react-router-dom";
import VendorListEmpty from "static/Image/VendorListEmpty.png";
import { useGetInvitedVendorsQuery } from "store/api/hostVendor";

const VendorList = () => {
  useDocumentTitle("Vendors");
  const { eventId = "" } = useParams<{ eventId: string }>();
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useGetInvitedVendorsQuery({ eventId }, { skip: !eventId });

  const { close, isOpen, open } = useModal();
  const isEmpty = data.length === 0;

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <EmptyScreen
            img={VendorListEmpty}
            title="Add Vendors"
            subtitle="Track vendors and their services"
            actionText="Invite"
            onClick={open}
          />
        </Async.Empty>
        <Async.Success>
          <PageLayout
            header={
              <Header
                right={
                  <Button type="primary" size="middle" onClick={open}>
                    Add vendor
                  </Button>
                }
                title="Vendors"
              />
            }
          >
            <VendorTable />
          </PageLayout>
        </Async.Success>
      </Async.Root>
      <InviteModal isOpen={isOpen} close={close} />
    </AnimatedPage>
  );
};

export default VendorList;
