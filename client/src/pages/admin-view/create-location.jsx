import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function CreateLocation() {
  const [locationData, setLocationData] = useState({
    name: "",
    address: "",
    description: "",
  });
  const { toast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Dispatch create-location action
    toast({
      title: "Location feature coming soon!",
      description: `Location "${locationData.name}" noted.`,
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Location</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Location Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={locationData.name}
            onChange={handleChange}
            placeholder="Enter location name"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={locationData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={locationData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Location
        </Button>
      </form>
    </div>
  );
}

export default CreateLocation;
