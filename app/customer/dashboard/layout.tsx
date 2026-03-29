import CustomerSidebar from "@/components/customersidebar"

export const metadata = {
   title: 'Dashboard',
   description: 'Praktikum SMK Telkom Malang',
}


type PropsLayout = {
   children: React.ReactNode
}


const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>
       <CustomerSidebar >
               {children}
                </CustomerSidebar>

        </div>
   )
}


export default RootLayout