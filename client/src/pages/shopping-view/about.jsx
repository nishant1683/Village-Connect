import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Users, ShieldAlert, Sparkles } from "lucide-react";
import accImg from "../../assets/account.jpg";

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="About Village-Connect"
          className="h-full w-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 bg-gradient-to-r from-emerald-950/80 to-transparent">
          <div className="max-w-2xl">
            <span className="px-3 py-1 text-xs font-bold text-emerald-200 bg-emerald-900/50 rounded-full border border-emerald-700/50">
              Our Journey
            </span>
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-3">
              Empowering Rural Economies
            </h1>
            <p className="mt-3 text-base text-emerald-100/90 leading-relaxed">
              We connect local farmers and village creators directly to you, promoting sustainable commerce, fair wages, and organic products.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Core Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
              Bridging the Gap Between Rural Creators and Modern Markets
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Village-Connect was built on a simple yet powerful vision: to provide rural communities with a voice, a digital storefront, and fair financial rewards. By bypassing intermediaries, we ensure that local agricultural workers, artisans, and small business owners receive the direct proceeds of their labour.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Every vegetable harvested, oil pressed, and artifact manufactured tells a story of tradition, purity, and heritage. We bring these stories and products straight to your doorstep.
            </p>
            <div className="pt-2">
              <Button asChild className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl px-6 py-2.5 shadow-md shadow-emerald-900/10">
                <Link to="/shop/listing" className="flex items-center gap-2">
                  Explore Fresh Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 w-fit rounded-xl">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">100% Organic & Local</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Sourced straight from local farms and organic agricultural cooperatives practicing natural farming methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 w-fit rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Community First</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  More than 70% of product revenues go back directly to support rural development initiatives and primary producers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 w-fit rounded-xl">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">No Middlemen</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Direct pricing models eliminate markup inflation, offering buyers the best prices and sellers maximum profit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-700 w-fit rounded-xl">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Preserving Heritage</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Supporting indigenous crafts and traditional grain variants that are otherwise being lost to mass industrialization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-emerald-300">500+</h3>
              <p className="text-xs uppercase tracking-wider text-emerald-100/70 font-semibold">Active Farmers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-emerald-300">12,000+</h3>
              <p className="text-xs uppercase tracking-wider text-emerald-100/70 font-semibold">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-emerald-300">30+</h3>
              <p className="text-xs uppercase tracking-wider text-emerald-100/70 font-semibold">Villages Supported</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-emerald-300">100k+</h3>
              <p className="text-xs uppercase tracking-wider text-emerald-100/70 font-semibold">Orders Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
