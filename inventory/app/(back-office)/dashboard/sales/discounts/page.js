"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import ShadCN UI Button
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // ShadCN Popover
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"; // Calendar component

export function DatePickerDemo() {
  const [date, setDate] = useState(null); // Removed TypeScript type annotation

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(" font-sans w-[280px] justify-start text-left font-normal", !date && " font-sans text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4 font-sans" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 font-sans">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

const DiscountManagementPage = () => {
  const [discountType, setDiscountType] = useState("category");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState(null); // Removed TypeScript type annotation
  const [endDate, setEndDate] = useState(null); // Removed TypeScript type annotation

  const handleSubmit = () => {
    const discountData = {
      discountType,
      discountPercentage,
      startDate,
      endDate,
    };
    console.log("Applying discount: ", discountData);
    // You will send this data to the backend to apply the discount to the products
    // Example: 
    // fetch('/api/apply-discount', { method: 'POST', body: JSON.stringify(discountData) });
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-xl font-semibold mb-6">Gestion des Remises</h1>

      <div className="p-6  rounded-md">
        <div className="mb-4">
          <label className="block font-medium mb-2">Type de remise</label>
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
          >
            <option value="category">Catégorie</option>
            <option value="brand">Marque</option>
            <option value="genre">Genre</option>
            {/* Add more options as necessary */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Pourcentage de remise</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter percentage"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Date de début</label>
          <DatePickerDemo />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Date de fin</label>
          <DatePickerDemo />
        </div>

        <Button onClick={handleSubmit} variant="primary" className="w-full mt-4">
          Appliquer la remise
        </Button>
      </div>
    </div>
  );
};

export default DiscountManagementPage;
