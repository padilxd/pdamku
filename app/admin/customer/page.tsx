'use server'
import { GetCustomerApi } from "@/services/customer";
import FormCustomer from "./formcustomer";
import DropCustomerButton from "./dropCustomer";
import { GetService } from "@/services/service";

const CustomerPage = async () => {
    const response = await GetCustomerApi();
    const serviceList = await GetService();

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
            
            <h1 className="text-3xl font-bold mb-2">Customer Page</h1>
            <p className="text-gray-400 mb-6">Welcome to the customer page!</p>

            <FormCustomer 
                label="Tambah Customer" 
                className="mb-6 bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-lg shadow"
                serviceList={serviceList.data}
            />

            <div className="overflow-x-auto bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
                
                <table className="min-w-full text-sm">
                    
                    <thead>
                        <tr className="bg-gray-800 text-gray-300">
                            <th className="p-3 text-left">Customer Number</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Service Name</th>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {response.data && response.data.map((customer) => (
                            <tr 
                                key={customer.id} 
                                className="border-t border-gray-700 hover:bg-gray-800/60 transition"
                            >
                                <td className="p-3">{customer.customer_number}</td>
                                <td className="p-3">{customer.name}</td>
                                <td className="p-3">{customer.phone}</td>
                                <td className="p-3">{customer.address}</td>
                                <td className="p-3">{customer.service.name}</td>
                                <td className="p-3">{customer.user.username}</td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <FormCustomer 
                                            label="Edit" 
                                            id={customer.id} 
                                            formData={customer} 
                                            className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-white"
                                            serviceList={serviceList.data || undefined} 
                                        />
                                        <DropCustomerButton customerId={customer.id}/> 
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default CustomerPage