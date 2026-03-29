import GetMeApi from "@/services/getMecustomer";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  let nama = "";
  let role = "";

  const response = await GetMeApi();

  if (!response.status) {
    redirect("/customer/login");
  } else {
    nama = response?.data?.name || "";
    role = response?.data?.user?.role || "";
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
      
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Customer Dashboard
        </h1>

        <p className="text-gray-400 mb-4">
          Welcome to the Customer Dashboard
        </p>

        {/* card utama */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl">
          
          <div className="mb-4 font-semibold text-indigo-400">
            Sir
          </div>

          <div className="space-y-3">
            
            <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-500 transition">
              <div className="text-sm text-gray-400">Nama anda Poke</div>
              <div className="text-lg font-semibold text-white">{nama}</div>
            </div>

            <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <div className="text-sm text-gray-400">All Role</div>
              nocounter
              <div className="text-lg font-semibold text-white capitalize">{role}</div>
            </div>

            <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-pink-500 transition">
              kicaw
              <div></div>
              Ir
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPage;