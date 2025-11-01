import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import Header from "components/Design/Header/Header";
import PageLayout from "components/Design/PageLayout/PageLayout";
import AddServiceModal from "components/VendorServices/AddServiceModal";
import VendorServicesCards from "components/VendorServices/VendorServicesCards";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useModal } from "hooks/useModal";
import VendorServicesEmpty from "static/Image/VendorServicesEmpty.png";
import { useGetCurrentVendorAllServiceQuery } from "store/api/vendorService";

const Services = () => {
  useDocumentTitle("Services");

  const { data, isSuccess, isLoading } = useGetCurrentVendorAllServiceQuery();

  const { services = [] } = data || {};
  const isEmpty = services.length === 0;
  const { close, isOpen, open } = useModal();

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={isEmpty} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <EmptyScreen
            img={VendorServicesEmpty}
            title="List your services"
            subtitle="Add your services and pricing"
            onClick={open}
            actionText="Add Service"
          />
        </Async.Empty>
        <Async.Success>
          <PageLayout
            header={
              <Header
                title="Welcome"
                right={
                  <Button type="primary" size="middle" onClick={open}>
                    Add Service
                  </Button>
                }
              />
            }
          >
            <VendorServicesCards />
          </PageLayout>
        </Async.Success>
      </Async.Root>
      <AddServiceModal isOpen={isOpen} close={close} />
    </AnimatedPage>
  );
};

export default Services;
