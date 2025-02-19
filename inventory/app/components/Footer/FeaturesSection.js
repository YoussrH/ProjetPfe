import { FaShippingFast, FaUndo, FaGift, FaPhoneAlt } from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";
export default function FeaturesSection() {
  return (
    <div className="flex justify-center my-28">
      <img src="/roue-left.svg " className=" -mt-16"/>

      <div className="flex  gap-20 h-40 max-w-5xlxl items-center justify-between bg-slate-50 bg-opacity-35 shadow-lg rounded-lg p-6 border">
        <div className="flex flex-col font-serif items-center text-center space-y-2">
          <img src="/skydiving.png" className="w-16"/>
          <p className="text-sm font-light">Livraison offerte à partir de </p>
          <p className="text-sm font-light">110DT d'achat</p>
        </div>

        <div className="flex flex-col -mt-4 font-serif items-center text-center space-y-2">
          <GiHummingbird className="w-14 h-14 " />
          <p className="text-sm font-light">Retours faciles et gratuits </p>
        </div>
        <div className="flex -mt-3 flex-col font-serif items-center text-center space-y-2">
        <img src="/gift-box.png" className="w-12"/>
        <p className="text-sm font-light">Emballage soigné</p>
        </div>
        <div className="flex flex-col font-serif items-center mt-4 text-center space-y-2">
        <img src="/costumer-service.png" className="w-12"/>
        <p className="text-sm font-light">Service client </p>
          <p className="text-sm font-light">22 222 222</p>
        </div>
      </div>
      <img src="/roue-right 1.svg" className="-mt-16"/>
    </div>
  );
}
