import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

export default function UserDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="relative h-[240px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center brightness-95"
          alt="Account Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:left-12">
          <h1 className="text-3xl font-bold text-white tracking-wide">My Account</h1>
          <p className="text-emerald-100/80 text-sm mt-1">Manage your orders and billing details</p>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col rounded-xl border border-emerald-900/5 bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="bg-emerald-900/5 p-1 rounded-lg">
              <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 px-6 py-2 rounded-md font-semibold text-sm">
                Orders
              </TabsTrigger>
              <TabsTrigger value="address" className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 px-6 py-2 rounded-md font-semibold text-sm">
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-6">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="mt-6">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
