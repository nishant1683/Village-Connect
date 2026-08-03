import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import accImg from "../../assets/account.jpg";

function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulating message submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        variant: "success",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Contact Village-Connect"
          className="h-full w-full object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 bg-gradient-to-r from-emerald-950/80 to-transparent">
          <div className="max-w-xl">
            <span className="px-3 py-1 text-xs font-bold text-emerald-200 bg-emerald-900/50 rounded-full border border-emerald-700/50">
              Get in Touch
            </span>
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-3">
              Contact Our Team
            </h1>
            <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
              Have questions about our products, farmers, or delivery? Reach out to us. We are here to support you.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-emerald-950 text-white p-8 rounded-2xl shadow-md space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Contact Info</h3>
                <p className="text-emerald-100/70 text-sm">
                  Reach out via email, phone, or visit our primary development hub.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-emerald-900">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-emerald-900/60 rounded-xl text-emerald-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Our Location</h4>
                    <p className="text-sm mt-0.5 text-emerald-100/80 leading-relaxed">
                      Village-Connect Hub, Sector 5,<br />
                      Rural Development Block, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-emerald-900/60 rounded-xl text-emerald-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Email Us</h4>
                    <p className="text-sm mt-0.5 text-emerald-100/80">
                      support@villageconnect.org
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-emerald-900/60 rounded-xl text-emerald-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Call Support</h4>
                    <p className="text-sm mt-0.5 text-emerald-100/80">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-emerald-900/60 rounded-xl text-emerald-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Working Hours</h4>
                    <p className="text-sm mt-0.5 text-emerald-100/80">
                      Mon - Sat: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Answer Card */}
            <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-700" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-500 leading-relaxed">
                Looking for shipping details, delivery schedules, or return policies? Please check your account orders page or contact our live agent via email.
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <Card className="border-slate-100 shadow-sm rounded-2xl bg-white">
              <CardHeader className="border-b border-slate-50 pb-4">
                <CardTitle className="text-lg font-bold text-slate-800">Send Us a Message</CardTitle>
                <CardDescription>
                  Have a suggestion or request? Write to us and we'll reply within 24 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Full Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="rounded-xl border-slate-200 focus:border-emerald-700 focus:ring-emerald-700"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="rounded-xl border-slate-200 focus:border-emerald-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Product inquiry, delivery issues, etc."
                      className="rounded-xl border-slate-200 focus:border-emerald-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message details here..."
                      rows={5}
                      className="rounded-xl border-slate-200 focus:border-emerald-700 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 h-auto rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Sending message..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
