import GetMeApi from "@/services/getMe";
import { DropService, GetService } from "@/services/service";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormAddService from "./formAdd";
import DropServiceButton from "./dropService";

const ServicesPage = async () => {
    const { data } = await GetService();

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
            
            <div className="max-w-4xl mx-auto">
                
                <h1 className="text-3xl font-bold mb-2">Services Page</h1>
                <p className="text-gray-400 mb-6">Welcome to the admin Dashboard</p>

                <FormAddService 
                    label="Add New Service" 
                    className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                />

                <div className="space-y-4">
                    {data && data.map((service) => (
                        <div 
                            key={service.id} 
                            className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 p-5 rounded-2xl shadow-xl"
                        >
                            
                            <h2 className="text-xl font-semibold mb-2">
                                {service.name}
                            </h2>

                            <div className="text-gray-400 text-sm space-y-1 mb-3">
                                <p>Min Usage: {service.min_usage}</p>
                                <p>Max Usage: {service.max_usage}</p>
                                <p>Price: ${service.price}</p>
                            </div>

                            <div className="flex gap-2">
                                <FormAddService 
                                    id={service.id} 
                                    label="Edit Service" 
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg"
                                />
                                <DropServiceButton serviceId={service.id} />
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ServicesPage