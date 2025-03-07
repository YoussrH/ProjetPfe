import { GiHummingbird } from "react-icons/gi";

export default function FeaturesSection() {
  return (
    <div className="relative flex flex-col bottom-0 items-center my-16 px-4">
      {/* Left Decorative Image */}
      <img 
        src="/roue-left.svg" 
        className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 w-44 opacity-60" 
      />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-20 h-auto max-w-5xl w-full items-center justify-between bg-slate-50 bg-opacity-35 shadow-lg rounded-lg p-6 border relative z-10">
        {/* Livraison */}
        <div className="flex flex-col font-serif items-center text-center space-y-2">
          <img src="/skydiving.png" className="w-12 md:w-16" />
          <p className="text-sm font-light">Livraison offerte à partir de</p>
          <p className="text-sm font-light">110DT d'achat</p>
        </div>

        {/* Retours */}
        <div className="flex flex-col font-serif items-center text-center space-y-2">
          <GiHummingbird className="w-12 md:w-14 h-12 md:h-14" />
          <p className="text-sm font-light">Retours faciles et gratuits</p>
        </div>

        {/* Emballage */}
        <div className="flex flex-col font-serif items-center text-center space-y-2">
          <img src="/gift-box.png" className="w-10 md:w-12" />
          <p className="text-sm font-light">Emballage soigné</p>
        </div>

        {/* Service Client */}
        <div className="flex flex-col font-serif items-center text-center space-y-2">
          <img src="/costumer-service.png" className="w-10 md:w-12" />
          <p className="text-sm font-light">Service client</p>
          <p className="text-sm font-light">22 222 222</p>
        </div>
      </div>

      {/* Right Decorative Image */}
      <img 
        src="/roue-right-1.svg" 
        className="hidden md:block absolute right-14 top-1/2 transform -translate-y-1/2 w-44 opacity-60" 
      />
    </div>
  );
}
