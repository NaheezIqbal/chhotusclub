import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import WhatsAppButton from "../common/whatsapp-button";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      {/* footer */}
      <ShoppingFooter />
      {/* WhatsApp Chat Button */}
      <WhatsAppButton />
    </div>
  );
}

export default ShoppingLayout;
